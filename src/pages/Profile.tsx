import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { db } from "../lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { UserCircle, Camera, Edit3, Heart, LogOut } from "lucide-react";
import Navbar from "../components/layout/Navbar";

interface Story {
  id: string;
  title: string;
  imageUrl: string;
  likes: number;
  createdAt: any;
}

const Profile = () => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If we're done loading and no user is found, redirect to login
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading, navigate]);

  const [myStories, setMyStories] = useState<Story[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    const fetchStories = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, "stories"),
          where("authorId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const stories: Story[] = [];
        querySnapshot.forEach((doc) => {
          stories.push({ id: doc.id, ...doc.data() } as Story);
        });
        
        // Client-side sort to avoid needing a complex Firestore Index
        stories.sort((a, b) => {
          const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : 0;
          const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : 0;
          return timeB - timeA;
        });

        setMyStories(stories);
      } catch (error) {
        console.error("Error fetching stories:", error);
      } finally {
        setFetching(false);
      }
    };
    
    if (currentUser) {
      fetchStories();
    }
  }, [currentUser]);

  if (loading || !currentUser) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white pt-28 pb-20 relative overflow-hidden font-sans">
      <Navbar />
      {/* Background Decor */}
      <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-gold/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative z-10">
        
        {/* Profile Header */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
          <div className="relative group">
            {currentUser.photoURL ? (
              <img 
                src={currentUser.photoURL} 
                alt="Profile" 
                className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-gold shadow-lg"
              />
            ) : (
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-white/10 border-4 border-gold shadow-lg flex items-center justify-center">
                <UserCircle size={80} className="text-white/50" />
              </div>
            )}
            <button className="absolute bottom-0 right-0 p-3 bg-gold text-black rounded-full shadow-lg hover:bg-gold-dark transition-transform hover:scale-110">
              <Camera size={20} />
            </button>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-2">
              {currentUser.displayName || "Explorer"}
            </h1>
            <p className="text-lg text-white/60 mb-6 font-medium">
              {currentUser.email}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4">
              <div className="bg-black/40 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-3">
                <span className="text-gold font-bold text-xl">{myStories.length}</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-white/70">Stories</span>
              </div>
              <div className="bg-black/40 border border-white/10 px-6 py-3 rounded-xl flex items-center gap-3">
                <span className="text-red-400 font-bold text-xl">80</span>
                <span className="text-xs uppercase tracking-wider font-semibold text-white/70">Total Likes</span>
              </div>
            </div>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
              <button 
                onClick={() => logout()}
                className="flex items-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-6 py-2.5 rounded-xl transition-all font-semibold text-sm uppercase tracking-wider"
              >
                <LogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* User Stories Gallery */}
        <div className="mb-8 flex items-center justify-between">
          <h2 className="text-3xl font-bold tracking-tight">My Shared Stories</h2>
          <button 
            onClick={() => navigate("/share-story")}
            className="hidden sm:flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/10 px-5 py-2.5 rounded-xl transition-all font-semibold text-sm uppercase tracking-wider"
          >
            <Edit3 size={16} />
            Write New
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fetching ? (
            <div className="col-span-full py-12 flex justify-center">
               <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : myStories.map((story, index) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              key={story.id} 
              className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:-translate-y-2 transition-all duration-300 shadow-xl cursor-pointer"
            >
              <div className="aspect-[4/3] overflow-hidden relative">
                {story.imageUrl ? (
                  <img 
                    src={story.imageUrl} 
                    alt={story.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-black/40 flex items-center justify-center">
                    <Camera size={40} className="text-white/20" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
              </div>
              <div className="absolute bottom-0 left-0 w-full p-6">
                <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-gold transition-colors">
                  {story.title}
                </h3>
                <div className="flex items-center justify-between text-white/70 text-sm font-medium">
                  <span>{story.createdAt?.toDate ? story.createdAt.toDate().toLocaleDateString() : 'Just now'}</span>
                  <div className="flex items-center gap-1.5">
                    <Heart size={16} className="text-red-400 fill-red-400" />
                    <span>{story.likes || 0}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {/* Add New Story Card */}
          <div 
            onClick={() => navigate("/share-story")}
            className="aspect-[4/3] bg-white/5 border-2 border-dashed border-white/20 rounded-2xl flex flex-col items-center justify-center gap-4 hover:border-gold hover:bg-white/10 transition-all duration-300 cursor-pointer group"
          >
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Edit3 size={28} className="text-gold" />
            </div>
            <span className="font-bold uppercase tracking-wider text-sm text-white/70 group-hover:text-white transition-colors">
              Share a new story
            </span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
