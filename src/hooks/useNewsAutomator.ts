import { useEffect, useRef } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  query, 
  where, 
  getDocs, 
  addDoc, 
  doc,
  setDoc,
  serverTimestamp 
} from 'firebase/firestore';

const THENEWSAPI_KEY = "37uhWNwF5gP8tFSa6k5giAcGBXVhxJTkUqTcqqzJ";
const API_URL = `https://api.thenewsapi.com/v1/news/all?api_token=${THENEWSAPI_KEY}&search=Bihar&language=en`;
const SYNC_INTERVAL_MS = 4 * 60 * 60 * 1000; // 4 hours

export const useNewsAutomator = (currentUser: any) => {
  const hasRun = useRef(false);

  useEffect(() => {
    // Only run if user is logged in (to satisfy Firestore rules)
    if (!currentUser) return;
    
    if (hasRun.current) return;
    hasRun.current = true;

    const runAutomator = async () => {
      try {
        // 1. Check sync timestamp in localStorage to avoid Firestore rule issues
        const lastSyncTime = parseInt(localStorage.getItem('newsSyncTimestamp') || '0', 10);
        const now = Date.now();
        
        if (now - lastSyncTime < SYNC_INTERVAL_MS) {
          console.log("News automator: Skip sync, recently synced.");
          return;
        }

        // 2. Fetch news via TheNewsAPI
        const res = await fetch(API_URL);
        const data = await res.json();
        
        if (!data.data || data.data.length === 0) {
          console.error("News automator: Failed to fetch TheNewsAPI news.");
          return;
        }
        
        const items = data.data.slice(0, 10); // Top 10 news

        // 3. Ensure 'Bihar News' community exists
        const cQuery = query(collection(db, "communityGroups"), where("name", "==", "Bihar News"));
        const cSnap = await getDocs(cQuery);
        let communityId = "";
        
        if (cSnap.empty) {
          const newComm = await addDoc(collection(db, "communityGroups"), {
            name: "Bihar News",
            description: "Automated real-time news updates for the state of Bihar.",
            iconImage: "https://images.unsplash.com/photo-1495020689067-958852a7765e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            bannerImage: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
            createdBy: "system",
            creatorName: "Bihar Darshan Admin",
            status: "approved",
            memberCount: 1,
            members: [],
            createdAt: serverTimestamp(),
          });
          communityId = newComm.id;
        } else {
          communityId = cSnap.docs[0].id;
        }

        // 4. Create posts
        let newPostsCount = 0;
        for (const item of items) {
          // Check if post already exists by title
          const pQuery = query(collection(db, "communityPosts"), where("title", "==", item.title));
          const pSnap = await getDocs(pQuery);
          
          if (pSnap.empty) {
            // Clean up snippet
            const rawText = item.snippet || item.description || "";
            const cleanBody = rawText.replace(/<[^>]+>/g, ' ').trim();
            
            await addDoc(collection(db, "communityPosts"), {
              communityId,
              communityName: "Bihar News",
              title: item.title,
              body: cleanBody,
              imageUrl: item.image_url || "",
              authorId: "system",
              authorName: item.source || "Bihar Darshan Admin",
              authorPhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Admin",
              likes: 0,
              dislikes: 0,
              shares: 0,
              likedBy: [],
              dislikedBy: [],
              createdAt: serverTimestamp(),
            });
            newPostsCount++;
          } else {
            // Update existing post
            const existingDoc = pSnap.docs[0];
            const rawText = item.snippet || item.description || "";
            const cleanBody = rawText.replace(/<[^>]+>/g, ' ').trim();
            await setDoc(doc(db, "communityPosts", existingDoc.id), { 
              body: cleanBody,
              imageUrl: item.image_url || "",
              authorName: item.source || "Bihar Darshan Admin"
            }, { merge: true });
          }
        }
        
        // 5. Update sync timestamp in localStorage
        localStorage.setItem('newsSyncTimestamp', now.toString());
        console.log(`News automator: Synced ${newPostsCount} new articles.`);

      } catch (err) {
        console.error("News automator error:", err);
      }
    };

    runAutomator();
  }, []);
};
