import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db, storage } from "../lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { ArrowLeft, UploadCloud, Edit3, Image as ImageIcon, X } from "lucide-react";
import Navbar from "../components/layout/Navbar";

const ShareStory = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  if (loading || !currentUser) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    setSubmitting(true);

    try {
      let imageUrl = "";
      
      // 1. Upload image if exists
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;
        const storageRef = ref(storage, `stories/${currentUser.uid}/${fileName}`);
        
        const snapshot = await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // 2. Save document to Firestore
      await addDoc(collection(db, "stories"), {
        title,
        content,
        imageUrl,
        authorId: currentUser.uid,
        authorName: currentUser.displayName || currentUser.email?.split('@')[0] || "Anonymous",
        likes: 0,
        createdAt: serverTimestamp()
      });

      navigate("/profile");
    } catch (error) {
      console.error("Error adding document: ", error);
      alert("Failed to publish story. Please ensure Firestore and Storage are enabled in your Firebase console.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 relative overflow-hidden font-sans">
      <Navbar />
      {/* Background Decor */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 sm:px-10 relative z-10">
        
        <div className="mb-8">
          <Link 
            to="/profile" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-xs font-bold uppercase tracking-wider mb-6"
          >
            <ArrowLeft size={16} />
            Back to Profile
          </Link>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-4">
            Share Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold to-yellow-200">Story</span>
          </h1>
          <p className="text-lg text-white/60">
            Inspire others by sharing your travel experiences, cultural discoveries, and beautiful moments in Bihar.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl">
          
          {/* Image Upload Area */}
          <div className="mb-8">
            <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
              Cover Photo
            </label>
            {imagePreview ? (
              <div className="relative rounded-2xl overflow-hidden aspect-video border border-white/10 group">
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button 
                    type="button"
                    onClick={() => {
                      setImagePreview(null);
                      setImageFile(null);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            ) : (
              <label className="border-2 border-dashed border-white/20 rounded-2xl p-10 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-gold transition-colors cursor-pointer group block">
                <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud size={28} className="text-gold" />
                </div>
                <p className="text-sm font-semibold text-white/80 mb-1">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-white/50">
                  SVG, PNG, JPG or GIF (max. 5MB)
                </p>
              </label>
            )}
          </div>

          <div className="space-y-6">
            {/* Title Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                Story Title
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Edit3 className="h-5 w-5 text-white/40" />
                </div>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="block w-full pl-12 pr-4 py-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-medium"
                  placeholder="E.g., A mesmerizing sunset at Bodh Gaya..."
                />
              </div>
            </div>

            {/* Content Textarea */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                Your Experience
              </label>
              <div className="relative">
                <textarea
                  required
                  rows={8}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="block w-full p-4 bg-black/40 border border-white/10 rounded-xl text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all font-medium resize-none"
                  placeholder="Tell us about your journey, the people you met, the food you ate..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex justify-end">
              <button
                type="submit"
                disabled={submitting}
                className="flex items-center gap-2 py-4 px-8 border border-transparent rounded-xl shadow-lg text-sm font-bold text-black bg-gold hover:bg-gold-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black focus:ring-gold transition-all disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider"
              >
                {submitting ? "Publishing..." : "Publish Story"}
                {!submitting && <ImageIcon size={18} />}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default ShareStory;
