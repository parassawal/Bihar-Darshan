import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { CultureItem } from './cultureData';
import type { GalleryItem } from './galleryData';

interface ContributionContextValue {
  cultureSubmissions: CultureItem[];
  gallerySubmissions: GalleryItem[];
  addCultureSubmission: (submission: Omit<CultureItem, 'id' | 'featured'>) => void;
  addGallerySubmission: (submission: Omit<GalleryItem, 'id' | 'likes' | 'views' | 'comments' | 'uploadDate'>) => void;
}

const ContributionContext = createContext<ContributionContextValue>({
  cultureSubmissions: [],
  gallerySubmissions: [],
  addCultureSubmission: () => {},
  addGallerySubmission: () => {},
});

export const ContributionProvider = ({ children }: { children: React.ReactNode }) => {
  const [cultureSubmissions, setCultureSubmissions] = useState<CultureItem[]>([]);
  const [gallerySubmissions, setGallerySubmissions] = useState<GalleryItem[]>([]);

  // Load submissions from localStorage on mount
  useEffect(() => {
    try {
      const storedCulture = localStorage.getItem('bihar_culture_submissions');
      if (storedCulture) {
        setCultureSubmissions(JSON.parse(storedCulture));
      }
      const storedGallery = localStorage.getItem('bihar_gallery_submissions');
      if (storedGallery) {
        setGallerySubmissions(JSON.parse(storedGallery));
      }
    } catch (error) {
      console.error('Failed to load contributions from localStorage:', error);
    }
  }, []);

  // Save to localStorage when submissions change
  const addCultureSubmission = useCallback((submission: Omit<CultureItem, 'id' | 'featured'>) => {
    setCultureSubmissions((prev) => {
      const newItem: CultureItem = {
        ...submission,
        id: Date.now(),
        featured: false,
      };
      const updated = [newItem, ...prev];
      localStorage.setItem('bihar_culture_submissions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const addGallerySubmission = useCallback((submission: Omit<GalleryItem, 'id' | 'likes' | 'views' | 'comments' | 'uploadDate'>) => {
    setGallerySubmissions((prev) => {
      const newItem: GalleryItem = {
        ...submission,
        id: Date.now(),
        likes: Math.floor(Math.random() * 50) + 10,
        views: Math.floor(Math.random() * 200) + 100,
        comments: Math.floor(Math.random() * 10),
        uploadDate: new Date().toISOString().split('T')[0],
      };
      const updated = [newItem, ...prev];
      localStorage.setItem('bihar_gallery_submissions', JSON.stringify(updated));
      return updated;
    });
  }, []);

  return (
    <ContributionContext.Provider
      value={{
        cultureSubmissions,
        gallerySubmissions,
        addCultureSubmission,
        addGallerySubmission,
      }}
    >
      {children}
    </ContributionContext.Provider>
  );
};

export const useContributions = () => useContext(ContributionContext);
