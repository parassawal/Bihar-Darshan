import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore";

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
  { name: "Bhumihar Community", subtitle: "Traditions of the Land", image: "https://bihardarshan-26916.web.app/images/bodh-gaya.png" },
  { name: "Maithil Community", subtitle: "Art & Intellect", image: "https://bihardarshan-26916.web.app/images/mithila-art.png" },
  { name: "Magahi Community", subtitle: "Heart of Magadh", image: "https://bihardarshan-26916.web.app/images/nalanda.png" },
  { name: "Bhojpuri Community", subtitle: "Vibrant Culture", image: "https://bihardarshan-26916.web.app/images/bhojpuri-dance.png" }
];

async function seedData() {
  try {
    console.log("Seeding home page communities...");
    for (const comm of seedCommunities) {
      await addDoc(collection(db, "communities"), {
        ...comm,
        createdAt: serverTimestamp()
      });
      console.log(`Added community: ${comm.name}`);
    }
    console.log("Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seedData();
