import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

// Need to use the same config from src/lib/firebase.ts
const firebaseConfig = {
  apiKey: "AIzaSyC4CVilXF6XVkXaCt39nILdR1D4xu9PMA0",
  authDomain: "bihardarshan-26916.firebaseapp.com",
  projectId: "bihardarshan-26916",
  storageBucket: "bihardarshan-26916.firebasestorage.app",
  messagingSenderId: "500023080659",
  appId: "1:500023080659:web:e8d1a8dfe8449ce0144626"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const seedCommunities = [
  {
    name: "Bihari Foodies",
    description: "A community for all the food lovers out there! Share your favorite Litti Chokha recipes, street food finds, and traditional Bihari delicacies.",
    bannerImage: "https://bihardarshan-26916.web.app/images/culture/litti-chokha.png",
    iconImage: "",
    createdBy: "dummy_admin",
    creatorName: "Admin",
    status: "approved",
    memberCount: 142,
  },
  {
    name: "History & Heritage",
    description: "Discuss the rich history of Bihar, from the Mauryan Empire to the ancient universities of Nalanda and Vikramshila.",
    bannerImage: "https://bihardarshan-26916.web.app/images/nalanda.png",
    iconImage: "",
    createdBy: "dummy_admin",
    creatorName: "Admin",
    status: "approved",
    memberCount: 89,
  },
  {
    name: "Festivals of Bihar",
    description: "Everything about Chhath Puja, Sonepur Mela, and all the vibrant festivals celebrated across our beautiful state.",
    bannerImage: "https://bihardarshan-26916.web.app/images/culture/chhath-puja.png",
    iconImage: "",
    createdBy: "dummy_admin",
    creatorName: "Admin",
    status: "approved",
    memberCount: 256,
  }
];

const seedPosts = [
  {
    title: "Best place for Litti Chokha in Patna?",
    body: "I'm visiting Patna next week and I want to try the most authentic Litti Chokha. Any recommendations for street vendors or restaurants?",
    authorName: "Rohan Kumar",
    communityIndex: 0,
    likes: 24,
    dislikes: 1,
    shares: 3,
  },
  {
    title: "My grandmother's Thekua recipe!",
    body: "Just wanted to share how my family has been making Thekua for Chhath Puja for generations. The secret is the exact ratio of jaggery to wheat flour and using pure ghee.",
    authorName: "Priya Singh",
    communityIndex: 0,
    likes: 56,
    dislikes: 0,
    shares: 12,
  },
  {
    title: "Fascinating facts about Nalanda University",
    body: "Did you know that Nalanda University at its peak accommodated over 10,000 students and 2,000 teachers? It had a library so vast that it took months to burn when destroyed.",
    authorName: "HistoryBuff99",
    communityIndex: 1,
    likes: 112,
    dislikes: 2,
    shares: 45,
  },
  {
    title: "Preparing for Chhath Puja this year",
    body: "The Ghats are being cleaned up early this year. Can't wait for the festivities to begin!",
    authorName: "Amit Verma",
    communityIndex: 2,
    likes: 88,
    dislikes: 0,
    shares: 15,
  }
];

async function seedData() {
  try {
    console.log("Seeding communities...");
    const commIds = [];
    
    for (const comm of seedCommunities) {
      const docRef = await addDoc(collection(db, "communityGroups"), {
        ...comm,
        createdAt: serverTimestamp()
      });
      commIds.push({ id: docRef.id, name: comm.name });
      console.log(`Added community: ${comm.name}`);
    }

    console.log("Seeding posts...");
    for (const post of seedPosts) {
      const commRef = commIds[post.communityIndex];
      await addDoc(collection(db, "communityPosts"), {
        communityId: commRef.id,
        communityName: commRef.name,
        title: post.title,
        body: post.body,
        imageUrl: "",
        authorId: "dummy_user",
        authorName: post.authorName,
        authorPhoto: "",
        likes: post.likes,
        dislikes: post.dislikes,
        shares: post.shares,
        likedBy: [],
        dislikedBy: [],
        createdAt: serverTimestamp()
      });
      console.log(`Added post: ${post.title}`);
    }
    
    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
