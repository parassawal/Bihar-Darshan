import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import {
  Users,
  Plus,
  X,
  Sparkles,
  ArrowRight,
  Clock,
  Search,
  Image as ImageIcon,
  Loader2,
} from "lucide-react";

interface CommunityGroup {
  id: string;
  name: string;
  description: string;
  bannerImage: string;
  iconImage: string;
  createdBy: string;
  creatorName: string;
  status: string;
  memberCount: number;
  createdAt: unknown;
}

const Community = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [communities, setCommunities] = useState<CommunityGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Create form state
  const [formName, setFormName] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formIcon, setFormIcon] = useState<File | null>(null);
  const [formBanner, setFormBanner] = useState<File | null>(null);
  const [iconPreview, setIconPreview] = useState("");
  const [bannerPreview, setBannerPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    setLoading(true);
    try {
      const q = query(
        collection(db, "communityGroups"),
        where("status", "==", "approved"),
        orderBy("createdAt", "desc")
      );
      const snap = await getDocs(q);
      const list: CommunityGroup[] = [];
      snap.forEach((d) => list.push({ id: d.id, ...d.data() } as CommunityGroup));
      setCommunities(list);
    } catch (err) {
      console.error("Error fetching communities:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormIcon(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormBanner(file);
      setBannerPreview(URL.createObjectURL(file));
    }
  };

  const handleCreate = async () => {
    if (!currentUser || !formName.trim() || !formDesc.trim()) return;
    setSubmitting(true);
    try {
      let iconUrl = "";
      let bannerUrl = "";

      if (formIcon) {
        const iconRef = ref(storage, `community-icons/${Date.now()}_${formIcon.name}`);
        await uploadBytes(iconRef, formIcon);
        iconUrl = await getDownloadURL(iconRef);
      }
      if (formBanner) {
        const bannerRef = ref(storage, `community-banners/${Date.now()}_${formBanner.name}`);
        await uploadBytes(bannerRef, formBanner);
        bannerUrl = await getDownloadURL(bannerRef);
      }

      await addDoc(collection(db, "communityGroups"), {
        name: formName.trim(),
        description: formDesc.trim(),
        iconImage: iconUrl,
        bannerImage: bannerUrl,
        createdBy: currentUser.uid,
        creatorName: currentUser.displayName || "Anonymous",
        status: "pending",
        memberCount: 1,
        createdAt: serverTimestamp(),
      });

      setSubmitSuccess(true);
      setTimeout(() => {
        setShowCreateModal(false);
        setSubmitSuccess(false);
        setFormName("");
        setFormDesc("");
        setFormIcon(null);
        setFormBanner(null);
        setIconPreview("");
        setBannerPreview("");
      }, 2000);
    } catch (err) {
      console.error("Error creating community:", err);
      alert("Failed to create community. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const filtered = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-28 pb-16 overflow-hidden bg-brand-dark text-white">
        <div className="absolute inset-0 bg-gradient-to-b from-gold/5 via-transparent to-transparent" />
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-amber-500/5 rounded-full blur-[100px]" />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold/10 border border-gold/20 text-gold text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              Bihar's Digital Town Square
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4">
              <span className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent">
                Communities
              </span>
            </h1>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Join topic-based communities, share posts, and connect with people who love Bihar.
              Anyone can create a community — once approved, it goes live!
            </p>
          </motion.div>

          {/* Search + Create */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row items-center gap-4 max-w-2xl mx-auto mb-16"
          >
            <div className="relative flex-1 w-full">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-200 rounded-2xl text-brand-dark placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold/50 focus:border-gold/30 transition-all"
              />
            </div>
            <button
              onClick={() => {
                if (!currentUser) {
                  navigate("/login");
                  return;
                }
                setShowCreateModal(true);
              }}
              className="flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-gold hover:bg-gold-dark text-black font-bold text-sm uppercase tracking-wider transition-all shrink-0 shadow-lg shadow-gold/20"
            >
              <Plus size={18} />
              Create Community
            </button>
          </motion.div>

          {/* Community Grid */}
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gold border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Users size={56} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-400 text-lg font-medium">
                {searchTerm ? "No communities match your search." : "No communities yet. Be the first to create one!"}
              </p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((community, i) => (
                <motion.div
                  key={community.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  onClick={() => navigate(`/community/${community.id}`)}
                  className="group cursor-pointer bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden hover:border-gold/30 hover:bg-white/[0.06] transition-all duration-300 hover:shadow-xl hover:shadow-gold/5"
                >
                  {/* Banner */}
                  <div className="relative h-32 bg-gradient-to-br from-gold/20 via-amber-900/20 to-orange-900/20 overflow-hidden">
                    {community.bannerImage ? (
                      <img
                        src={community.bannerImage}
                        alt=""
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gold/15 via-amber-800/20 to-orange-900/15" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
                  </div>

                  {/* Content */}
                  <div className="relative px-5 pb-5 -mt-6">
                    {/* Icon */}
                    <div className="w-14 h-14 rounded-xl bg-white border-2 border-gray-100 overflow-hidden mb-3 shadow-lg">
                      {community.iconImage ? (
                        <img src={community.iconImage} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-gold/30 to-amber-700/30 flex items-center justify-center">
                          <span className="text-xl font-bold text-gold">{community.name[0]}</span>
                        </div>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-brand-dark group-hover:text-brand-gold transition-colors duration-300 mb-1">
                      {community.name}
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2 mb-4 leading-relaxed">
                      {community.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 text-gray-400 text-xs font-medium">
                        <Users size={14} />
                        {community.memberCount} {community.memberCount === 1 ? "member" : "members"}
                      </div>
                      <div className="flex items-center gap-1 text-gold/60 text-xs font-semibold group-hover:text-gold transition-colors">
                        Enter <ArrowRight size={14} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Create Community Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[300] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setShowCreateModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100">
                <h2 className="text-xl font-bold text-brand-dark">Create a Community</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="p-2 rounded-xl hover:bg-gray-100 text-gray-500 hover:text-brand-dark transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {submitSuccess ? (
                <div className="px-6 py-16 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  >
                    <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
                      <Clock size={36} className="text-emerald-400" />
                    </div>
                  </motion.div>
                  <h3 className="text-lg font-bold text-brand-dark mb-2">Community Submitted!</h3>
                  <p className="text-gray-500 text-sm">
                    Your community is awaiting admin approval. You'll see it appear once it's approved.
                  </p>
                </div>
              ) : (
                <div className="px-6 py-6 space-y-5 max-h-[70vh] overflow-y-auto">
                  {/* Community Name */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Community Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g., Bihar History Enthusiasts"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="What is this community about?"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gold/50 resize-none transition-all"
                    />
                  </div>

                  {/* Icon Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Community Icon
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-gold/30 transition-colors">
                      {iconPreview ? (
                        <img src={iconPreview} alt="" className="w-10 h-10 rounded-lg object-cover" />
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                          <ImageIcon size={18} className="text-gray-400" />
                        </div>
                      )}
                      <span className="text-sm text-gray-400">
                        {formIcon ? formIcon.name : "Upload an icon (optional)"}
                      </span>
                      <input type="file" accept="image/*" onChange={handleIconChange} className="hidden" />
                    </label>
                  </div>

                  {/* Banner Upload */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Banner Image
                    </label>
                    <label className="block cursor-pointer">
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="" className="w-full h-32 object-cover rounded-xl border border-gray-200" />
                      ) : (
                        <div className="w-full h-32 bg-white border border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 hover:border-gold/30 transition-colors">
                          <ImageIcon size={24} className="text-brand-dark/20" />
                          <span className="text-xs text-gray-400">Upload a banner (optional)</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleBannerChange} className="hidden" />
                    </label>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                    <p className="text-amber-400/80 text-xs leading-relaxed">
                      <strong>Note:</strong> Your community will be reviewed by an admin before it goes live. This usually takes a few hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              {!submitSuccess && (
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-2.5 rounded-xl text-brand-dark/60 hover:text-brand-dark text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={submitting || !formName.trim() || !formDesc.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gold hover:bg-gold-dark text-black text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <Plus size={16} />
                        Submit for Approval
                      </>
                    )}
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default Community;
