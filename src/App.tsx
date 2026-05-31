import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Home from './pages/Home';
import Work from './pages/Work';
import LoadingPage from './pages/Loading';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: isLoading ? 0 : 1, y: isLoading ? 6 : 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/works" element={<Work />} />
        </Routes>
      </motion.div>

      <AnimatePresence>
        {isLoading && (
          <LoadingPage onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
