import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './components/layout/AnimatedRoutes';
import { AuthProvider } from './contexts/AuthContext';
import TranslationEngine from './components/common/TranslationEngine';

function App() {
  return (
    <AuthProvider>
      <Router>
        <TranslationEngine />
        <AnimatedRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
