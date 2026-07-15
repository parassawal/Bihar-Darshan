import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ArticlesProvider } from './data/ArticlesContext.tsx'
import { ContributionProvider } from './data/ContributionContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ArticlesProvider>
      <ContributionProvider>
        <App />
      </ContributionProvider>
    </ArticlesProvider>
  </StrictMode>,
)
