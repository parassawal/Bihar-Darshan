import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  writeBatch,
} from "firebase/firestore";
import Navbar from "../components/layout/Navbar";
import {
  Plus,
  Trash2,
  Edit3,
  Save,
  X,
  Database,
  MapPin,
  Map,
  Users,
  Image,
  Palette,
  ShieldCheck,
  ShoppingBag,
  MessageSquare,
} from "lucide-react";



// ── Collection schemas ──────────────────────────────────────────
interface CollectionConfig {
  name: string;
  label: string;
  icon: React.ReactNode;
  fields: { key: string; label: string; type: "text" | "textarea" | "select" | "checkbox"; options?: string[] }[];
}

const collections: CollectionConfig[] = [
  {
    name: "places",
    label: "Popular Places",
    icon: <MapPin size={18} />,
    fields: [
      { key: "name", label: "Place Name", type: "text" },
      { key: "district", label: "District", type: "text" },
      { key: "image", label: "Image URL", type: "text" },
    ],
  },
  {
    name: "districts",
    label: "Districts",
    icon: <Map size={18} />,
    fields: [
      { key: "name", label: "District Name", type: "text" },
      { key: "image", label: "Image URL", type: "text" },
    ],
  },
  {
    name: "shops",
    label: "Shop Verifications",
    icon: <ShoppingBag size={18} />,
    fields: [
      { key: "name", label: "Shop Name", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "contactInfo", label: "Contact Info", type: "text" },
      { key: "imageUrl", label: "Image URL", type: "text" },
      { key: "ownerId", label: "Owner UID", type: "text" },
      { key: "status", label: "Verification Status", type: "select", options: ["pending", "approved", "rejected"] },
    ],
  },
  {
    name: "communities",
    label: "Communities",
    icon: <Users size={18} />,
    fields: [
      { key: "name", label: "Community Name", type: "text" },
      { key: "subtitle", label: "Subtitle", type: "text" },
      { key: "image", label: "Image URL", type: "text" },
    ],
  },
  {
    name: "gallery",
    label: "Gallery",
    icon: <Image size={18} />,
    fields: [
      { key: "image", label: "Image URL", type: "text" },
      { key: "isVideo", label: "Is Video?", type: "checkbox" },
    ],
  },
  {
    name: "culture",
    label: "Culture",
    icon: <Palette size={18} />,
    fields: [
      { key: "title", label: "Title", type: "text" },
      { key: "type", label: "Type", type: "select", options: ["Festival", "Food", "Art"] },
      { key: "district", label: "District", type: "text" },
      { key: "image", label: "Image URL", type: "text" },
      { key: "description", label: "Short Description", type: "textarea" },
      { key: "longDescription", label: "Long Description", type: "textarea" },
      { key: "featured", label: "Featured?", type: "checkbox" },
    ],
  },
  {
    name: "admins",
    label: "Admins",
    icon: <ShieldCheck size={18} />,
    fields: [
      { key: "email", label: "Admin Email", type: "text" },
    ],
  },
  {
    name: "marketplace",
    label: "Marketplace",
    icon: <ShoppingBag size={18} />,
    fields: [
      { key: "title", label: "Product Name", type: "text" },
      { key: "title_hi", label: "Product Name (Hindi)", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "description_hi", label: "Description (Hindi)", type: "textarea" },
      { key: "category", label: "Category", type: "text" },
      { key: "price", label: "Price (₹)", type: "text" },
      { key: "seller", label: "Seller Name", type: "text" },
      { key: "imageUrl", label: "Image URL", type: "text" },
    ],
  },
  {
    name: "communityGroups",
    label: "Community Groups",
    icon: <Users size={18} />,
    fields: [
      { key: "name", label: "Community Name", type: "text" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "creatorName", label: "Creator", type: "text" },
      { key: "status", label: "Approval Status", type: "select", options: ["pending", "approved", "rejected"] },
      { key: "memberCount", label: "Members", type: "text" },
      { key: "iconImage", label: "Icon URL", type: "text" },
      { key: "bannerImage", label: "Banner URL", type: "text" },
    ],
  },
  {
    name: "communityPosts",
    label: "Community Posts",
    icon: <MessageSquare size={18} />,
    fields: [
      { key: "title", label: "Post Title", type: "text" },
      { key: "body", label: "Post Body", type: "textarea" },
      { key: "communityName", label: "Community", type: "text" },
      { key: "authorName", label: "Author", type: "text" },
      { key: "likes", label: "Likes", type: "text" },
      { key: "dislikes", label: "Dislikes", type: "text" },
      { key: "imageUrl", label: "Image URL", type: "text" },
    ],
  },
];

// ── Seed data ──────────────────────────────────────────────────
const seedData: Record<string, Record<string, unknown>[]> = {
  places: [
    { name: "Bodh Gaya", district: "Gaya District", image: "/images/bodh-gaya.png" },
    { name: "Nalanda", district: "Nalanda District", image: "/images/nalanda.png" },
    { name: "Rajgir", district: "Nalanda District", image: "/images/rajgir.png" },
    { name: "Vaishali", district: "Vaishali District", image: "/images/vaishali.png" },
    { name: "Patna Sahib", district: "Patna District", image: "/images/patna-sahib.png" },
    { name: "Pawapuri", district: "Nalanda District", image: "/images/pawapuri.png" },
  ],
  districts: [
    { name: "Nalanda", image: "/images/nalanda.png" },
    { name: "Patna", image: "/images/patna-district.png" },
    { name: "Gaya", image: "/images/gaya-district.png" },
    { name: "Bhagalpur", image: "/images/bhagalpur-district.png" },
    { name: "Muzaffarpur", image: "/images/muzaffarpur-district.png" },
    { name: "Darbhanga", image: "/images/darbhanga-district.png" },
  ],
  communities: [
    { name: "Bhumihar Community", subtitle: "Traditions of the Land", image: "/images/bodh-gaya.png" },
    { name: "Yadav Community", subtitle: "Strength in Heritage", image: "/images/nalanda.png" },
    { name: "Kayastha Community", subtitle: "Scholars & Writers", image: "/images/rajgir.png" },
    { name: "Mishra Community", subtitle: "Pillars of Knowledge", image: "/images/vaishali.png" },
    { name: "Rajput Community", subtitle: "Legacy of Valor", image: "/images/patna-sahib.png" },
    { name: "Paswan Community", subtitle: "Voices of Change", image: "/images/pawapuri.png" },
  ],
  gallery: [
    { image: "/images/bihar-heritage.png", isVideo: false },
    { image: "/images/bihar-mountains.png", isVideo: false },
    { image: "/images/bihar-food.png", isVideo: false },
    { image: "/images/bihar-temple.png", isVideo: true },
    { image: "/images/bihar-monument.png", isVideo: false },
    { image: "/images/bihar-folk-dance.png", isVideo: true },
  ],
  culture: [
    { title: "Chhath Puja", type: "Festival", district: "Patna", image: "/images/culture/chhath-puja.png", description: "The most significant festival of Bihar dedicated to the Sun God.", longDescription: "A four-day ancient Vedic festival dedicated to Lord Surya and Chhathi Maiya. Devotees offer prayers to the setting and rising sun while standing in rivers and ponds.", featured: true },
    { title: "Litti Chokha", type: "Food", district: "Gaya", image: "/images/culture/litti-chokha.png", description: "The iconic traditional dish of Bihar loved across the country.", longDescription: "Roasted wheat balls stuffed with sattu and served with mashed vegetables flavored with mustard oil.", featured: true },
    { title: "Sonepur Mela", type: "Festival", district: "Sonepur", image: "/images/culture/sonepur-mela.png", description: "One of Asia's largest and most historic fairs held annually.", longDescription: "A centuries-old fair attracting traders, pilgrims, tourists, and cultural enthusiasts from across India.", featured: false },
    { title: "Shahi Lychee", type: "Food", district: "Muzaffarpur", image: "/images/culture/shahi-lychee.png", description: "Juicy and aromatic lychee with GI tag recognition.", longDescription: "Muzaffarpur's Shahi Lychee is famous for its sweetness, fragrance, and superior quality.", featured: false },
    { title: "Buddha Jayanti", type: "Festival", district: "Bodh Gaya", image: "/images/culture/buddha-jayanti.png", description: "Celebration of the birth, enlightenment, and teachings of Buddha.", longDescription: "Observed with prayers, cultural events, and ceremonies at the sacred Mahabodhi Temple.", featured: false },
    { title: "Sama Chakeva", type: "Festival", district: "Mithila", image: "/images/culture/sama-chakeva.png", description: "Traditional Mithila festival celebrating sibling bonds.", longDescription: "Women and girls celebrate with clay idols, songs, and rituals symbolizing affection between brothers and sisters.", featured: false },
    { title: "Jitiya Festival", type: "Festival", district: "Patna", image: "/images/culture/jitiya-festival.png", description: "Sacred fasting festival observed by mothers.", longDescription: "Women observe rigorous fasting and prayers for the health and prosperity of their children.", featured: false },
    { title: "Rajgir Mahotsav", type: "Festival", district: "Nalanda", image: "/images/culture/rajgir-mahotsav.png", description: "A grand cultural festival showcasing Bihar's heritage.", longDescription: "Features folk music, dance performances, handicrafts, and local cuisine in the historic city of Rajgir.", featured: false },
    { title: "Vaishali Mahotsav", type: "Festival", district: "Vaishali", image: "/images/culture/vaishali-mahotsav.png", description: "Celebration of Bihar's ancient republican heritage.", longDescription: "Held to commemorate the birth anniversary of Lord Mahavira with cultural programs and exhibitions.", featured: false },
    { title: "Thekua", type: "Food", district: "Patna", image: "/images/culture/thekua.png", description: "Traditional sweet delicacy associated with Chhath Puja.", longDescription: "Prepared using wheat flour, jaggery, and ghee, Thekua is an essential offering during Chhath celebrations.", featured: false },
    { title: "Makhana Kheer", type: "Food", district: "Darbhanga", image: "/images/culture/makhana-kheer.png", description: "Creamy dessert made from Bihar's famous fox nuts.", longDescription: "A delicious and nutritious dessert prepared using milk, sugar, and roasted makhana.", featured: false },
    { title: "Silao Khaja", type: "Food", district: "Nalanda", image: "/images/culture/silao-khaja.png", description: "Layered crispy sweet famous across Bihar.", longDescription: "A GI-tagged sweet from Silao known for its flaky texture and rich taste.", featured: false },
    { title: "Tilkut", type: "Food", district: "Bhagalpur", image: "/images/culture/tilkut.png", description: "Popular winter sweet made from sesame seeds and jaggery.", longDescription: "A traditional delicacy especially enjoyed during Makar Sankranti.", featured: false },
    { title: "Sattu Paratha", type: "Food", district: "Gaya", image: "/images/culture/sattu-paratha.png", description: "Nutritious stuffed flatbread of Bihar.", longDescription: "Prepared using roasted gram flour and spices, served with curd and pickles.", featured: false },
    { title: "Khurma", type: "Food", district: "Patna", image: "/images/culture/khurma.png", description: "Crunchy sweet snack enjoyed during festivals.", longDescription: "Made from flour, sugar, and ghee, Khurma is a beloved traditional sweet.", featured: false },
  ],
  marketplace: [
    {
      title: "Handpainted Madhubani Saree",
      title_hi: "हाथ से रंगी हुई मधुबनी साड़ी",
      description: "Authentic pure silk saree handpainted by artisans in Mithila.",
      description_hi: "मिथिला के कारीगरों द्वारा हाथ से रंगी गई प्रामाणिक शुद्ध रेशम की साड़ी।",
      category: "Textiles",
      price: 8500,
      seller: "Mithila Arts Collective",
      imageUrl: "/images/culture.jpg"
    },
    {
      title: "Bhagalpuri Silk Scarf",
      title_hi: "भागलपुरी रेशम का स्कार्फ",
      description: "Premium Tussar silk scarf woven in Bhagalpur.",
      description_hi: "भागलपुर में बुना गया प्रीमियम टसर सिल्क स्कार्फ।",
      category: "Textiles",
      price: 1200,
      seller: "Bhagalpur Weavers",
      imageUrl: "/images/culture.jpg"
    },
    {
      title: "Sikki Grass Basket",
      description: "Traditional golden grass woven basket from North Bihar.",
      category: "Handicrafts",
      price: 450,
      seller: "Rural Crafts Hub",
      imageUrl: "/images/culture.jpg"
    },
    {
      title: "Tikuli Art Wall Decor",
      description: "Intricate glass painting art piece from Patna.",
      category: "Art",
      price: 2100,
      seller: "Patna Artisans",
      imageUrl: "/images/culture.jpg"
    }
  ],
};

// ── Admin Component ────────────────────────────────────────────
const Admin = () => {
  const { currentUser, loading, isAdmin } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("places");
  const [items, setItems] = useState<Record<string, unknown>[]>([]);
  const [fetching, setFetching] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [seeding, setSeeding] = useState(false);
  const [seedDone, setSeedDone] = useState(false);

  // Auth guard
  useEffect(() => {
    if (!loading && (!currentUser || !isAdmin)) {
      navigate("/");
    }
  }, [currentUser, loading, isAdmin, navigate]);

  // Fetch data for active tab
  useEffect(() => {
    fetchItems();
  }, [activeTab]);

  const fetchItems = async () => {
    setFetching(true);
    try {
      const snapshot = await getDocs(collection(db, activeTab));
      const list: Record<string, unknown>[] = [];
      snapshot.forEach((d) => list.push({ id: d.id, ...d.data() }));
      setItems(list);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setFetching(false);
    }
  };

  const activeConfig = collections.find((c) => c.name === activeTab)!;

  // ── Form helpers ────────────────────────────
  const openAddForm = () => {
    const defaults: Record<string, unknown> = {};
    activeConfig.fields.forEach((f) => {
      defaults[f.key] = f.type === "checkbox" ? false : "";
    });
    setFormData(defaults);
    setEditingId(null);
    setShowForm(true);
  };

  const openEditForm = (item: Record<string, unknown>) => {
    setFormData({ ...item });
    setEditingId(item.id as string);
    setShowForm(true);
  };

  const handleSave = async () => {
    try {
      const payload = { ...formData };
      delete payload.id;

      if (editingId) {
        await updateDoc(doc(db, activeTab, editingId), payload);
      } else {
        await addDoc(collection(db, activeTab), payload);
      }
      setShowForm(false);
      fetchItems();
    } catch (err) {
      console.error("Save error:", err);
      alert("Failed to save. Check console for details.");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteDoc(doc(db, activeTab, id));
      fetchItems();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  // ── Seed handler ────────────────────────────
  const handleSeed = async () => {
    if (!confirm("This will populate the database with initial data for ALL collections. Proceed?")) return;
    setSeeding(true);
    try {
      for (const [collName, dataArr] of Object.entries(seedData)) {
        const batch = writeBatch(db);
        const colRef = collection(db, collName);
        for (const item of dataArr) {
          const newDocRef = doc(colRef);
          batch.set(newDocRef, item);
        }
        await batch.commit();
      }
      setSeedDone(true);
      fetchItems();
    } catch (err) {
      console.error("Seed error:", err);
      alert("Seeding failed. Check console for details.");
    } finally {
      setSeeding(false);
    }
  };

  if (loading || !currentUser || !isAdmin) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <Navbar />

      <div className="pt-28 pb-20 max-w-7xl mx-auto px-6 sm:px-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck size={28} className="text-gold" />
              <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">Admin Dashboard</h1>
            </div>
            <p className="text-white/50 text-sm">Manage all site content from one place.</p>
          </div>
          <button
            onClick={handleSeed}
            disabled={seeding || seedDone}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Database size={16} />
            {seedDone ? "Data Seeded ✓" : seeding ? "Seeding..." : "Seed Initial Data"}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8 border-b border-white/10 pb-4">
          {collections.map((col) => (
            <button
              key={col.name}
              onClick={() => { setActiveTab(col.name); setShowForm(false); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === col.name
                  ? "bg-gold text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              }`}
            >
              {col.icon}
              {col.label}
              <span className={`ml-1 text-xs px-1.5 py-0.5 rounded-md ${
                activeTab === col.name ? "bg-black/20 text-black" : "bg-white/10 text-white/50"
              }`}>
                {activeTab === col.name ? items.length : ""}
              </span>
            </button>
          ))}
        </div>

        {/* Action Bar */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">{activeConfig.label}</h2>
          <button
            onClick={openAddForm}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold hover:bg-gold-dark text-black text-sm font-bold uppercase tracking-wider transition-all"
          >
            <Plus size={16} />
            Add New
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div className="mb-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-bold">{editingId ? "Edit Item" : "Add New Item"}</h3>
              <button onClick={() => setShowForm(false)} className="text-white/50 hover:text-white">
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeConfig.fields.map((field) => (
                <div key={field.key} className={field.type === "textarea" ? "md:col-span-2" : ""}>
                  <label className="block text-xs font-bold uppercase tracking-wider text-white/60 mb-2">
                    {field.label}
                  </label>
                  {field.type === "checkbox" ? (
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formData[field.key]}
                        onChange={(e) => setFormData({ ...formData, [field.key]: e.target.checked })}
                        className="w-5 h-5 rounded accent-[#b8860b]"
                      />
                      <span className="text-sm text-white/80">{field.label}</span>
                    </label>
                  ) : field.type === "select" ? (
                    <select
                      value={(formData[field.key] as string) || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-gold"
                    >
                      <option value="">Select...</option>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={(formData[field.key] as string) || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold resize-none"
                    />
                  ) : (
                    <input
                      type="text"
                      value={(formData[field.key] as string) || ""}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold"
                    />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-end mt-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gold hover:bg-gold-dark text-black text-sm font-bold uppercase tracking-wider transition-all"
              >
                <Save size={16} />
                {editingId ? "Update" : "Save"}
              </button>
            </div>
          </div>
        )}

        {/* Data Table */}
        {fetching ? (
          <div className="py-20 flex justify-center">
            <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
          </div>
        ) : items.length === 0 ? (
          <div className="py-20 text-center">
            <Database size={48} className="mx-auto text-white/20 mb-4" />
            <p className="text-white/50 text-lg font-medium">No items yet.</p>
            <p className="text-white/30 text-sm mt-1">Click "Seed Initial Data" above or "Add New" to get started.</p>
          </div>
        ) : (
          <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/10">
                    {activeConfig.fields.slice(0, 6).map((field) => (
                      <th key={field.key} className="text-left px-5 py-4 text-xs font-bold uppercase tracking-wider text-white/50">
                        {field.label}
                      </th>
                    ))}
                    <th className="text-right px-5 py-4 text-xs font-bold uppercase tracking-wider text-white/50">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item) => (
                    <tr key={item.id as string} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                      {activeConfig.fields.slice(0, 6).map((field) => (
                        <td key={field.key} className="px-5 py-4 text-white/80 max-w-[200px] truncate">
                          {field.type === "checkbox"
                            ? (item[field.key] ? "✅ Yes" : "❌ No")
                            : field.key === "image"
                            ? (
                              <div className="flex items-center gap-2">
                                <img src={item[field.key] as string} alt="" className="w-8 h-8 rounded-md object-cover bg-black/40" />
                                <span className="truncate text-xs text-white/50">{(item[field.key] as string || "").slice(0, 30)}</span>
                              </div>
                            )
                            : String(item[field.key] ?? "")}
                        </td>
                      ))}
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEditForm(item)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-blue-500/20 text-white/70 hover:text-blue-400 transition-colors"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(item.id as string)}
                            className="p-2 rounded-lg bg-white/10 hover:bg-red-500/20 text-white/70 hover:text-red-400 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
