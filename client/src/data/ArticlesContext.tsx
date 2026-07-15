import { createContext, useContext, useState, useCallback } from 'react';
import { tribalArticles } from './tribalArticlesData';
import type { TribalArticle } from './tribalArticlesData';

interface ArticlesContextValue {
  articles: TribalArticle[];
  addArticle: (article: TribalArticle) => void;
}

const ArticlesContext = createContext<ArticlesContextValue>({
  articles: tribalArticles,
  addArticle: () => {},
});

export const ArticlesProvider = ({ children }: { children: React.ReactNode }) => {
  const [articles, setArticles] = useState<TribalArticle[]>(tribalArticles);

  const addArticle = useCallback((article: TribalArticle) => {
    setArticles((prev) => [article, ...prev]);
  }, []);

  return (
    <ArticlesContext.Provider value={{ articles, addArticle }}>
      {children}
    </ArticlesContext.Provider>
  );
};

export const useArticles = () => useContext(ArticlesContext);
