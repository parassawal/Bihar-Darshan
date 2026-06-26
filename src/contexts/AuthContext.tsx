import { createContext, useContext, useState, useEffect, type ReactNode } from "react";
import { type User, onAuthStateChanged, signOut } from "firebase/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../lib/firebase";

interface ShopData {
  id: string;
  name: string;
  description: string;
  status: string;
  contactInfo: string;
  imageUrl: string;
  heroImage?: string;
}

interface AuthContextType {
  currentUser: User | null;
  loading: boolean;
  isAdmin: boolean;
  ownedShop: ShopData | null;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  currentUser: null,
  loading: true,
  isAdmin: false,
  ownedShop: null,
  logout: async () => {},
});

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [ownedShop, setOwnedShop] = useState<ShopData | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user?.email) {
        if (user.email === "bihardarshanofficial@gmail.com") {
          setIsAdmin(true);
        } else {
          try {
            const q = query(collection(db, "admins"), where("email", "==", user.email));
            const snap = await getDocs(q);
            setIsAdmin(!snap.empty);
          } catch (error) {
            console.error("Error checking admin status:", error);
            setIsAdmin(false);
          }
        }
        
        try {
          const shopQ = query(
            collection(db, "shops"),
            where("ownerId", "==", user.uid),
            where("status", "==", "approved")
          );
          const shopSnap = await getDocs(shopQ);
          if (!shopSnap.empty) {
            const shopDoc = shopSnap.docs[0];
            setOwnedShop({ id: shopDoc.id, ...shopDoc.data() } as ShopData);
          } else {
            setOwnedShop(null);
          }
        } catch (error) {
          console.error("Error fetching owned shop:", error);
          setOwnedShop(null);
        }
        
      } else {
        setIsAdmin(false);
        setOwnedShop(null);
      }
      
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const logout = () => {
    return signOut(auth);
  };

  const value = {
    currentUser,
    loading,
    isAdmin,
    ownedShop,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
