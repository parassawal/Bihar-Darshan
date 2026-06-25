import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Culture from './pages/Culture';
import Tourism from './pages/Tourism';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/culture" element={<Culture />} />
        <Route path="/tourism" element={<Tourism />} />
      </Routes>
    </Router>
  );
}

export default App;
