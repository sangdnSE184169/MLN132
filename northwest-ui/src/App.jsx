import { useState } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import Hero from './components/Hero';
import LocationDeck from './components/LocationDeck';
import LocationDetail from './components/LocationDetail';
import HeroStorySection from './components/HeroStorySection';
import StoryReader from './components/StoryReader';
import Chatbot from './components/Chatbot';
import locations from './data/locations';
import muCangChaiDetails from './data/muCangChaiDetails';
import sapaDetails from './data/sapaDetails';
import maiChauDetails from './data/maiChauDetails';
import yTyDetails from './data/yTyDetails';
import dienBienDetails from './data/dienBienDetails';
import './index.css';

// Map location IDs to their detail data
const locationDetailsMap = {
  1: muCangChaiDetails,
  2: sapaDetails,
  3: maiChauDetails,
  4: yTyDetails,
  5: dienBienDetails,
};

function App() {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showStory, setShowStory] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const handleExplore = (locationId) => {
    const details = locationDetailsMap[locationId];
    if (details) {
      setSelectedLocation(details);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleCloseDetail = () => {
    setSelectedLocation(null);
    document.body.style.overflow = 'auto';
  };

  const handleOpenStory = () => {
    setShowStory(true);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseStory = () => {
    setShowStory(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <div className="app-container">
      <motion.div
        className="progress-bar"
        style={{ scaleX }}
      />

      <Hero />

      <main>
        <LocationDeck
          locations={locations}
          onExplore={handleExplore}
          availableDetails={Object.keys(locationDetailsMap).map(Number)}
        />
      </main>

      {/* Hero Story Section - After locations */}
      <HeroStorySection onOpenStory={handleOpenStory} />

      <footer>
        <p>© 2026 Tây Bắc Việt Nam. Inspired by Google Arts & Culture.</p>
      </footer>

      {selectedLocation && (
        <LocationDetail
          location={selectedLocation}
          onClose={handleCloseDetail}
        />
      )}

      {/* Story Reader Modal */}
      {showStory && (
        <StoryReader onClose={handleCloseStory} />
      )}

      {/* AI Chatbot */}
      <Chatbot />

      <style>{`
        .progress-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 4px;
          background: var(--color-accent);
          transform-origin: 0%;
          z-index: 100;
        }
        
        footer {
          text-align: center;
          padding: 4rem 2rem;
          opacity: 0.6;
          font-size: 0.9rem;
        }
      `}</style>
    </div>
  );
}

export default App;

