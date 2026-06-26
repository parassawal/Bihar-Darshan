import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../lib/firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  query,
  where,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import PostCard from "../components/communities/PostCard";
import type { CommunityGroup, PostData } from "../types/community";
import {
  Plus,
  X,
  Sparkles,
  Clock,
  Search,
  Image as ImageIcon,
  Loader2,
  Flame,
  TrendingUp,
  LayoutGrid,
} from "lucide-react";

type TabType = "new" | "trending" | "top";

const Community = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  
  // Data State
  const [communities, setCommunities] = useState<CommunityGroup[]>([]);
  const [posts, setPosts] = useState<PostData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI State
  const [activeTab, setActiveTab] = useState<TabType>("trending");
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
    fetchData();
  }, []);

  const fetchData = async (showLoading = true) => {
    if (showLoading) setLoading(true);
    try {
      // Fetch communities
      const cQuery = query(collection(db, "communityGroups"), where("status", "==", "approved"));
      const cSnap = await getDocs(cQuery);
      const cList: CommunityGroup[] = [];
      cSnap.forEach((d) => cList.push({ id: d.id, ...d.data() } as CommunityGroup));
      setCommunities(cList);

      // Fetch posts
      const pSnap = await getDocs(collection(db, "communityPosts"));
      const pList: PostData[] = [];
      pSnap.forEach((d) => {
        const data = d.data();
        pList.push({
          id: d.id,
          communityId: data.communityId || "",
          communityName: data.communityName || "",
          title: data.title || "",
          body: data.body || "",
          imageUrl: data.imageUrl || "",
          authorId: data.authorId || "",
          authorName: data.authorName || "Anonymous",
          authorPhoto: data.authorPhoto || "",
          likes: data.likes || 0,
          dislikes: data.dislikes || 0,
          shares: data.shares || 0,
          likedBy: data.likedBy || [],
          dislikedBy: data.dislikedBy || [],
          createdAt: data.createdAt || null,
        });
      });
      setPosts(pList);

    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  // Trending Engine Logic
  const getTrendingScore = (post: PostData) => {
    // Engagement Score = Likes (x2) + Shares (x3) - Dislikes
    const engagement = (post.likes * 2) + (post.shares * 3) - post.dislikes;
    
    // Simple time decay: newer posts get a boost
    const now = Math.floor(Date.now() / 1000);
    const postTime = post.createdAt?.seconds || now;
    const hoursAge = Math.max(1, (now - postTime) / 3600);
    
    // The older it is, the lower the score becomes relative to its engagement
    return engagement / Math.pow(hoursAge, 1.5);
  };

  const sortedPosts = useMemo(() => {
    const list = [...posts];
    if (activeTab === "new") {
      list.sort((a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0));
    } else if (activeTab === "top") {
      list.sort((a, b) => b.likes - a.likes);
    } else if (activeTab === "trending") {
      list.sort((a, b) => getTrendingScore(b) - getTrendingScore(a));
    }
    return list;
  }, [posts, activeTab]);

  const trendingCommunities = useMemo(() => {
    const list = [...communities];
    list.sort((a, b) => b.memberCount - a.memberCount);
    return list.slice(0, 5);
  }, [communities]);

  // Post Actions
  const handleLike = async (post: PostData) => {
    if (!currentUser) { navigate("/login"); return; }
    const alreadyLiked = post.likedBy.includes(currentUser.uid);
    const alreadyDisliked = post.dislikedBy.includes(currentUser.uid);

    // Optimistic Update
    setPosts(currentPosts => currentPosts.map(p => {
      if (p.id === post.id) {
        const newPost = { ...p };
        if (alreadyLiked) {
          newPost.likes -= 1;
          newPost.likedBy = newPost.likedBy.filter(uid => uid !== currentUser.uid);
        } else {
          newPost.likes += 1;
          newPost.likedBy = [...newPost.likedBy, currentUser.uid];
          if (alreadyDisliked) {
            newPost.dislikes -= 1;
            newPost.dislikedBy = newPost.dislikedBy.filter(uid => uid !== currentUser.uid);
          }
        }
        return newPost;
      }
      return p;
    }));

    const postRef = doc(db, "communityPosts", post.id);
    try {
      if (alreadyLiked) {
        await updateDoc(postRef, { likes: post.likes - 1, likedBy: arrayRemove(currentUser.uid) });
      } else {
        const updates: any = { likes: post.likes + 1, likedBy: arrayUnion(currentUser.uid) };
        if (alreadyDisliked) {
          updates.dislikes = post.dislikes - 1;
          updates.dislikedBy = arrayRemove(currentUser.uid);
        }
        await updateDoc(postRef, updates);
      }
      // fetchData(false); // Removed to avoid overriding optimistic update with stale data while writing
    } catch (err) { 
      console.error(err);
      fetchData(false); // Revert on failure
    }
  };

  const handleDislike = async (post: PostData) => {
    if (!currentUser) { navigate("/login"); return; }
    const alreadyDisliked = post.dislikedBy.includes(currentUser.uid);
    const alreadyLiked = post.likedBy.includes(currentUser.uid);

    // Optimistic Update
    setPosts(currentPosts => currentPosts.map(p => {
      if (p.id === post.id) {
        const newPost = { ...p };
        if (alreadyDisliked) {
          newPost.dislikes -= 1;
          newPost.dislikedBy = newPost.dislikedBy.filter(uid => uid !== currentUser.uid);
        } else {
          newPost.dislikes += 1;
          newPost.dislikedBy = [...newPost.dislikedBy, currentUser.uid];
          if (alreadyLiked) {
            newPost.likes -= 1;
            newPost.likedBy = newPost.likedBy.filter(uid => uid !== currentUser.uid);
          }
        }
        return newPost;
      }
      return p;
    }));

    const postRef = doc(db, "communityPosts", post.id);
    try {
      if (alreadyDisliked) {
        await updateDoc(postRef, { dislikes: post.dislikes - 1, dislikedBy: arrayRemove(currentUser.uid) });
      } else {
        const updates: any = { dislikes: post.dislikes + 1, dislikedBy: arrayUnion(currentUser.uid) };
        if (alreadyLiked) {
          updates.likes = post.likes - 1;
          updates.likedBy = arrayRemove(currentUser.uid);
        }
        await updateDoc(postRef, updates);
      }
    } catch (err) { 
      console.error(err); 
      fetchData(false);
    }
  };

  const handleShare = async (post: PostData) => {
    const url = `${window.location.origin}/community/${post.communityId}`;
    const text = `${post.title} — on Bihar Darshan`;
    try {
      if (navigator.share) {
        await navigator.share({ title: post.title, text, url });
      } else {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        alert("Link copied to clipboard!");
      }
      
      // Optimistic update
      setPosts(currentPosts => currentPosts.map(p => 
        p.id === post.id ? { ...p, shares: p.shares + 1 } : p
      ));
      
      await updateDoc(doc(db, "communityPosts", post.id), { shares: post.shares + 1 });
    } catch (err) { console.error(err); }
  };

  // Create Community handlers
  const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setFormIcon(file); setIconPreview(URL.createObjectURL(file)); }
  };

  const handleBannerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) { setFormBanner(file); setBannerPreview(URL.createObjectURL(file)); }
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
      console.error(err);
      alert("Failed to create community.");
    } finally {
      setSubmitting(false);
    }
  };

  const filteredCommunities = communities.filter(
    (c) =>
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-brand-gray text-brand-dark">
      <Navbar />

      {/* Hero Section */}
      <div className="bg-brand-dark pt-32 pb-16 mb-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-brand-gold/15 opacity-50 mix-blend-overlay"></div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-brand-gold/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 sm:px-10 z-10 flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-gold/10 border border-brand-gold/20 text-brand-gold text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} />
              Bihar's Digital Town Square
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-white">
              Communities
            </h1>
            <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
              Discover what's trending, explore topic-based communities, and connect with people who love Bihar.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] gap-8 pb-20">
        
        {/* LEFT SIDEBAR: Navigation / Directory */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <LayoutGrid size={16} />
              All Communities
            </h2>
            
            <div className="relative mb-4">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Filter communities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50"
              />
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-200">
              {filteredCommunities.map((community) => (
                <button
                  key={community.id}
                  onClick={() => navigate(`/community/${community.id}`)}
                  className="w-full flex items-center gap-3 p-2 rounded-xl hover:bg-brand-gold/10 hover:text-brand-gold transition-colors text-left group"
                >
                  <div className="w-8 h-8 rounded-lg bg-gray-100 overflow-hidden shrink-0 border border-gray-200 group-hover:border-brand-gold/30">
                    {community.iconImage ? (
                      <img src={community.iconImage} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-xs font-bold text-gray-500 group-hover:text-brand-gold">
                        {community.name[0]}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-brand-dark truncate group-hover:text-brand-gold transition-colors">
                      {community.name}
                    </p>
                    <p className="text-[10px] text-gray-400 font-medium">
                      {community.memberCount} members
                    </p>
                  </div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                if (!currentUser) { navigate("/login"); return; }
                setShowCreateModal(true);
              }}
              className="w-full mt-4 flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 border-brand-gold/20 text-brand-gold hover:bg-brand-gold hover:text-brand-dark font-bold text-sm transition-all"
            >
              <Plus size={16} /> Create Community
            </button>
          </div>
        </aside>

        {/* MAIN FEED */}
        <main className="space-y-6 min-w-0">
          {/* Feed Tabs */}
          <div className="bg-white rounded-[1.25rem] p-2 shadow-sm border border-gray-100 flex items-center gap-2 overflow-x-auto scrollbar-hide">
            <button
              onClick={() => setActiveTab("trending")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                activeTab === "trending" 
                  ? "bg-brand-gold/15 text-brand-gold shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-brand-dark"
              }`}
            >
              <Flame size={18} className={activeTab === "trending" ? "text-orange-500" : ""} />
              Trending
            </button>
            <button
              onClick={() => setActiveTab("new")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                activeTab === "new" 
                  ? "bg-brand-gold/15 text-brand-gold shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-brand-dark"
              }`}
            >
              <Clock size={18} />
              New
            </button>
            <button
              onClick={() => setActiveTab("top")}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all shrink-0 ${
                activeTab === "top" 
                  ? "bg-brand-gold/15 text-brand-gold shadow-sm" 
                  : "text-gray-500 hover:bg-gray-50 hover:text-brand-dark"
              }`}
            >
              <TrendingUp size={18} />
              Top Posts
            </button>
          </div>

          {/* Posts List */}
          {loading ? (
            <div className="flex justify-center py-20">
              <Loader2 className="w-10 h-10 text-brand-gold animate-spin" />
            </div>
          ) : sortedPosts.length === 0 ? (
            <div className="text-center py-20 bg-white border border-gray-100 rounded-[1.5rem]">
              <p className="text-gray-400 font-medium">No posts found in the network yet.</p>
            </div>
          ) : (
            <div className="space-y-5">
              {sortedPosts.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={post}
                  index={i}
                  currentUser={currentUser}
                  onLike={handleLike}
                  onDislike={handleDislike}
                  onShare={handleShare}
                  showCommunityBadge={true}
                />
              ))}
            </div>
          )}
        </main>

        {/* RIGHT SIDEBAR: Trending Communities */}
        <aside className="hidden lg:block space-y-6">
          <div className="bg-white rounded-[1.5rem] p-6 shadow-sm border border-gray-100 sticky top-24">
            <h2 className="text-sm font-bold uppercase tracking-wider text-gray-500 mb-4 flex items-center gap-2">
              <Flame size={16} className="text-orange-500" />
              Popular Communities
            </h2>
            
            <div className="space-y-4">
              {trendingCommunities.map((community, index) => (
                <div key={community.id} className="flex items-start gap-3">
                  <span className="text-sm font-bold text-gray-300 w-4 mt-1">{index + 1}</span>
                  <div
                    onClick={() => navigate(`/community/${community.id}`)}
                    className="flex-1 cursor-pointer group"
                  >
                    <div className="flex items-center gap-2">
                       <div className="w-6 h-6 rounded-md bg-gray-100 overflow-hidden shrink-0 border border-gray-200">
                        {community.iconImage ? (
                          <img src={community.iconImage} alt="" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-500">
                            {community.name[0]}
                          </div>
                        )}
                      </div>
                      <p className="text-sm font-bold text-brand-dark group-hover:text-brand-gold transition-colors truncate">
                        {community.name}
                      </p>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 pl-8">
                      {community.memberCount} members
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                (document.querySelector('aside input') as HTMLInputElement)?.focus();
              }}
              className="w-full mt-6 py-2.5 rounded-xl bg-gray-50 text-brand-dark font-semibold text-sm hover:bg-gray-100 transition-colors"
            >
              View All
            </button>
          </div>
        </aside>
      </div>

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
              className="w-full max-w-lg bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
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
                <div className="px-6 py-6 space-y-5 overflow-y-auto">
                  {/* Form fields identical to before... */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Community Name *
                    </label>
                    <input
                      type="text"
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="e.g., Bihar History Enthusiasts"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Description *
                    </label>
                    <textarea
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="What is this community about?"
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-dark placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 resize-none transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Community Icon
                    </label>
                    <label className="flex items-center gap-3 px-4 py-3 bg-white border border-gray-200 border-dashed rounded-xl cursor-pointer hover:border-brand-gold/30 transition-colors">
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

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                      Banner Image
                    </label>
                    <label className="block cursor-pointer">
                      {bannerPreview ? (
                        <img src={bannerPreview} alt="" className="w-full h-32 object-cover rounded-xl border border-gray-200" />
                      ) : (
                        <div className="w-full h-32 bg-white border border-gray-200 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 hover:border-brand-gold/30 transition-colors">
                          <ImageIcon size={24} className="text-gray-300" />
                          <span className="text-xs text-gray-400">Upload a banner (optional)</span>
                        </div>
                      )}
                      <input type="file" accept="image/*" onChange={handleBannerChange} className="hidden" />
                    </label>
                  </div>

                  <div className="bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-3">
                    <p className="text-amber-600 text-xs leading-relaxed font-medium">
                      <strong>Note:</strong> Your community will be reviewed by an admin before it goes live. This usually takes a few hours.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              {!submitSuccess && (
                <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-3 shrink-0">
                  <button
                    onClick={() => setShowCreateModal(false)}
                    className="px-5 py-2.5 rounded-xl text-gray-500 hover:text-brand-dark text-sm font-semibold transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleCreate}
                    disabled={submitting || !formName.trim() || !formDesc.trim()}
                    className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-brand-gold hover:bg-brand-gold/90 text-brand-dark text-sm font-bold uppercase tracking-wider transition-all disabled:opacity-40 disabled:cursor-not-allowed"
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
