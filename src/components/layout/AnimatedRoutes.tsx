import { Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from '../../pages/Home';
import Culture from '../../pages/Culture';
import Login from '../../pages/Login';
import Profile from '../../pages/Profile';
import ShareStory from '../../pages/ShareStory';
import Admin from '../../pages/Admin';
import Marketplace from '../../pages/Marketplace';
import ShopDashboard from '../../pages/ShopDashboard';
import Storefront from '../../pages/Storefront';
import Tribals from '../../pages/Tribals';
import TribeDetail from '../../pages/TribeDetail';
import Community from '../../pages/Community';
import CommunityFeed from '../../pages/CommunityFeed';

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/culture" element={<PageWrapper><Culture /></PageWrapper>} />
        <Route path="/tribals" element={<PageWrapper><Tribals /></PageWrapper>} />
        <Route path="/tribals/:id" element={<PageWrapper><TribeDetail /></PageWrapper>} />
        <Route path="/community" element={<PageWrapper><Community /></PageWrapper>} />
        <Route path="/community/:id" element={<PageWrapper><CommunityFeed /></PageWrapper>} />
        <Route path="/marketplace" element={<PageWrapper><Marketplace /></PageWrapper>} />
        <Route path="/store/:id" element={<PageWrapper><Storefront /></PageWrapper>} />
        <Route path="/login" element={<PageWrapper><Login /></PageWrapper>} />
        <Route path="/profile" element={<PageWrapper><Profile /></PageWrapper>} />
        <Route path="/share-story" element={<PageWrapper><ShareStory /></PageWrapper>} />
        <Route path="/admin" element={<PageWrapper><Admin /></PageWrapper>} />
        <Route path="/manage-shop" element={<PageWrapper><ShopDashboard /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
