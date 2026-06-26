import { useState, useEffect } from "react";
import { db } from "../lib/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

interface UseCollectionOptions {
  orderByField?: string;
  orderDirection?: "asc" | "desc";
}

function useCollection<T = Record<string, unknown>>(
  collectionName: string,
  options?: UseCollectionOptions
) {
  const [data, setData] = useState<(T & { id: string })[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q;
        if (options?.orderByField) {
          q = query(
            collection(db, collectionName),
            orderBy(options.orderByField, options.orderDirection || "asc")
          );
        } else {
          q = query(collection(db, collectionName));
        }

        const snapshot = await getDocs(q);
        const items: (T & { id: string })[] = [];
        snapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() } as T & { id: string });
        });
        setData(items);
      } catch (err) {
        console.error(`Error fetching ${collectionName}:`, err);
        setError(`Failed to load ${collectionName}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName, options?.orderByField, options?.orderDirection]);

  return { data, loading, error };
}

export default useCollection;
