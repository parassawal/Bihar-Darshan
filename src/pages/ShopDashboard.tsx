import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, where } from "firebase/firestore";
import Navbar from "../components/layout/Navbar";
import { Store, Plus, Trash2, Edit3, Save, X, Tag, LayoutDashboard, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ShopDashboard() {
  const { currentUser, loading, ownedShop } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState<"products" | "settings">("products");
  const [products, setProducts] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  
  // Product Form State
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    title_hi: "",
    description: "",
    description_hi: "",
    price: "",
    category: "",
    imageUrl: "",
  });

  // Settings State
  const [settingsData, setSettingsData] = useState({
    description: "",
    contactInfo: "",
    imageUrl: "",
    heroImage: "",
  });
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    if (!loading && (!currentUser || !ownedShop)) {
      navigate("/");
    }
  }, [currentUser, loading, ownedShop, navigate]);

  useEffect(() => {
    if (ownedShop) {
      setSettingsData({
        description: ownedShop.description || "",
        contactInfo: ownedShop.contactInfo || "",
        imageUrl: ownedShop.imageUrl || "",
        heroImage: ownedShop.heroImage || "",
      });
      fetchProducts();
    }
  }, [ownedShop]);

  const fetchProducts = async () => {
    if (!ownedShop) return;
    setFetching(true);
    try {
      const q = query(
        collection(db, "marketplace"),
        where("shopId", "==", ownedShop.id)
      );
      const snapshot = await getDocs(q);
      const list: any[] = [];
      snapshot.forEach(doc => list.push({ id: doc.id, ...doc.data() }));
      setProducts(list);
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setFetching(false);
    }
  };

  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownedShop) return;
    
    try {
      const payload = {
        ...formData,
        price: Number(formData.price),
        shopId: ownedShop.id,
        seller: ownedShop.name,
      };

      if (editingId) {
        await updateDoc(doc(db, "marketplace", editingId), payload);
      } else {
        await addDoc(collection(db, "marketplace"), payload);
      }
      
      setShowForm(false);
      setEditingId(null);
      setFormData({ title: "", title_hi: "", description: "", description_hi: "", price: "", category: "", imageUrl: "" });
      fetchProducts();
    } catch (err) {
      console.error("Error saving product:", err);
      alert("Failed to save product.");
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteDoc(doc(db, "marketplace", id));
      fetchProducts();
    } catch (err) {
      console.error("Error deleting product:", err);
    }
  };

  const openEditForm = (item: any) => {
    setFormData({
      title: item.title || "",
      title_hi: item.title_hi || "",
      description: item.description || "",
      description_hi: item.description_hi || "",
      price: item.price?.toString() || "",
      category: item.category || "",
      imageUrl: item.imageUrl || ""
    });
    setEditingId(item.id);
    setShowForm(true);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ownedShop) return;
    setSavingSettings(true);
    try {
      await updateDoc(doc(db, "shops", ownedShop.id), {
        description: settingsData.description,
        contactInfo: settingsData.contactInfo,
        imageUrl: settingsData.imageUrl,
        heroImage: settingsData.heroImage,
      });
      alert("Settings saved successfully! Refreshing page to update global state.");
      window.location.reload();
    } catch (err) {
      console.error("Error saving settings:", err);
      alert("Failed to save settings.");
    } finally {
      setSavingSettings(false);
    }
  };

  if (loading || !ownedShop) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black pt-28 pb-20">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        
        {/* Header */}
        <div className="mb-8 bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2 flex items-center gap-3">
              <Store className="text-gold" />
              {ownedShop.name} Dashboard
            </h1>
            <p className="text-white/60">Manage your products and shop details.</p>
          </div>
          <div className="flex bg-black/40 p-1 rounded-xl border border-white/5">
            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "products" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
            >
              <Tag size={16} /> Products
            </button>
            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-bold transition-all ${activeTab === "settings" ? "bg-white/10 text-white" : "text-white/50 hover:text-white"}`}
            >
              <Settings size={16} /> Settings
            </button>
          </div>
        </div>

        {/* Products Tab */}
        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <LayoutDashboard className="text-gold" size={20} />
                Your Products ({products.length})
              </h2>
              <button
                onClick={() => {
                  setFormData({ title: "", title_hi: "", description: "", description_hi: "", price: "", category: "", imageUrl: "" });
                  setEditingId(null);
                  setShowForm(true);
                }}
                className="flex items-center gap-2 px-4 py-2 bg-gold hover:bg-gold-dark text-black font-bold rounded-lg text-sm transition-colors"
              >
                <Plus size={16} /> Add Product
              </button>
            </div>

            {/* Product Form Modal */}
            {showForm && (
              <div className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                <div className="w-full max-w-2xl bg-[#111] border border-white/10 rounded-[2rem] p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-white">{editingId ? "Edit Product" : "Add New Product"}</h3>
                    <button onClick={() => setShowForm(false)} className="text-white/40 hover:text-white transition-colors">
                      <X size={24} />
                    </button>
                  </div>
                  <form onSubmit={handleSaveProduct} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Title (English)</label>
                        <input required type="text" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Title (Hindi - Optional)</label>
                        <input type="text" value={formData.title_hi} onChange={e => setFormData({...formData, title_hi: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Description (English)</label>
                        <textarea required rows={2} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors resize-none" />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Description (Hindi - Optional)</label>
                        <textarea rows={2} value={formData.description_hi} onChange={e => setFormData({...formData, description_hi: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors resize-none" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Price (₹)</label>
                        <input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Category</label>
                        <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors appearance-none">
                          <option value="" className="bg-black">Select Category</option>
                          <option value="Art" className="bg-black">Art</option>
                          <option value="Textiles" className="bg-black">Textiles</option>
                          <option value="Handicrafts" className="bg-black">Handicrafts</option>
                          <option value="Food" className="bg-black">Food</option>
                        </select>
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Image URL</label>
                        <input required type="url" value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} className="w-full bg-white/5 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" />
                      </div>
                    </div>
                    <button type="submit" className="w-full mt-6 bg-gold hover:bg-gold-dark text-black font-bold py-3.5 rounded-xl transition-colors">
                      {editingId ? "Update Product" : "Publish Product"}
                    </button>
                  </form>
                </div>
              </div>
            )}

            {/* Product List */}
            {fetching ? (
              <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" /></div>
            ) : products.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-12 text-center">
                <Tag size={48} className="mx-auto text-white/20 mb-4" />
                <p className="text-white/50 text-lg font-medium">No products listed yet.</p>
                <p className="text-white/30 text-sm mt-1">Add your first product to start selling!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                  <div key={product.id} className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden group">
                    <div className="h-48 relative overflow-hidden">
                      <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white border border-white/10">
                        {product.category}
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-white mb-1">{product.title}</h3>
                      <p className="text-gold font-bold mb-4">₹{product.price}</p>
                      <div className="flex gap-2">
                        <button onClick={() => openEditForm(product)} className="flex-1 flex items-center justify-center gap-2 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-sm font-semibold transition-colors">
                          <Edit3 size={14} /> Edit
                        </button>
                        <button onClick={() => handleDeleteProduct(product.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === "settings" && (
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
            <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
              <Settings className="text-gold" size={20} />
              Shop Settings
            </h2>
            <form onSubmit={handleSaveSettings} className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Shop Description</label>
                <textarea 
                  rows={4} 
                  required
                  value={settingsData.description} 
                  onChange={e => setSettingsData({...settingsData, description: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors resize-none" 
                  placeholder="Describe your business..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Contact Information</label>
                <input 
                  type="text" 
                  required
                  value={settingsData.contactInfo} 
                  onChange={e => setSettingsData({...settingsData, contactInfo: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" 
                  placeholder="Phone, Email, or Address"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Shop Avatar Image URL</label>
                <input 
                  type="url" 
                  required
                  value={settingsData.imageUrl} 
                  onChange={e => setSettingsData({...settingsData, imageUrl: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" 
                  placeholder="https://..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-white/80 mb-1.5 ml-1">Storefront Hero Cover URL (Optional)</label>
                <input 
                  type="url" 
                  value={settingsData.heroImage} 
                  onChange={e => setSettingsData({...settingsData, heroImage: e.target.value})} 
                  className="w-full bg-black/40 border border-white/10 focus:border-gold text-white rounded-xl px-4 py-3 outline-none transition-colors" 
                  placeholder="https://..."
                />
              </div>
              <div className="pt-4 border-t border-white/10">
                <button 
                  type="submit" 
                  disabled={savingSettings}
                  className="flex items-center gap-2 px-6 py-3 bg-gold hover:bg-gold-dark text-black font-bold rounded-xl transition-colors disabled:opacity-50"
                >
                  <Save size={18} />
                  {savingSettings ? "Saving..." : "Save Settings"}
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
