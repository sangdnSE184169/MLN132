import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const LocationDeck = ({ locations, onExplore, availableDetails = [] }) => {
  return (
    <div className="deck-container">
      <motion.h2
        className="deck-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        Điểm Đến Tiêu Biểu
      </motion.h2>

      {locations.map((location, index) => (
        <LocationCard
          key={location.id}
          location={location}
          index={index}
          onExplore={onExplore}
          hasDetails={availableDetails.includes(location.id)}
        />
      ))}

      <style>{`
        .deck-container {
          padding: 8rem 0;
          background: var(--color-bg);
        }

        .deck-title {
          text-align: center;
          font-size: 3rem;
          color: white;
          margin-bottom: 6rem;
          position: relative;
        }

        .deck-title::after {
          content: '';
          position: absolute;
          bottom: -1rem;
          left: 50%;
          transform: translateX(-50%);
          width: 80px;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
        }
      `}</style>
    </div>
  );
};

const LocationCard = ({ location, index, onExplore, hasDetails }) => {
  const isEven = index % 2 === 0;
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const handleExploreClick = () => {
    if (onExplore && hasDetails) {
      onExplore(location.id);
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      x: isEven ? -80 : 80,
      y: 50
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: 0.9,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const imageVariants = {
    hidden: { scale: 1.2, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`location-card ${isEven ? 'even' : 'odd'}`}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div
        className="card-image-wrap"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.4 }}
      >
        <div className="image-placeholder">
          <motion.img
            src={location.image}
            alt={location.name}
            variants={imageVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6 }}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://placehold.co/800x600/1e1e24/FFF?text=${encodeURIComponent(location.name)}`;
            }}
          />
          <div className="image-overlay" />
        </div>
        <motion.div
          className="location-badge"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {location.province}
        </motion.div>
      </motion.div>

      <motion.div
        className="card-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.span
          className="location-number"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 0.1, scale: 1 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          0{index + 1}
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {location.name}
        </motion.h2>

        <motion.div
          className="separator"
          initial={{ width: 0 }}
          animate={isInView ? { width: 60 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {location.description}
        </motion.p>

        <motion.button
          className={`explore-btn ${hasDetails ? 'active' : ''}`}
          onClick={handleExploreClick}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          whileHover={hasDetails ? {
            scale: 1.05,
            boxShadow: "0 10px 30px rgba(212, 163, 115, 0.3)"
          } : {}}
          whileTap={hasDetails ? { scale: 0.98 } : {}}
        >
          {hasDetails ? 'Khám phá văn hóa' : 'Sắp ra mắt'}
          {hasDetails && <span className="btn-arrow">→</span>}
        </motion.button>
      </motion.div>

      <style>{`
        .location-card {
          display: flex;
          align-items: center;
          gap: 6rem;
          max-width: 1200px;
          margin: 0 auto 14rem auto;
          padding: 0 2rem;
        }

        .location-card.odd {
          flex-direction: row-reverse;
        }

        .card-image-wrap {
          flex: 1;
          position: relative;
        }

        .image-placeholder {
          width: 100%;
          aspect-ratio: 4/3;
          background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          overflow: hidden;
          border-radius: 12px;
          box-shadow: 0 25px 50px rgba(0,0,0,0.4);
          position: relative;
        }
        
        .image-placeholder img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(15, 16, 18, 0.4) 0%,
            transparent 50%
          );
          pointer-events: none;
        }

        .location-badge {
          position: absolute;
          top: 1.5rem;
          left: 1.5rem;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          color: var(--color-accent);
          padding: 0.5rem 1.2rem;
          border-radius: 30px;
          font-size: 0.8rem;
          font-weight: 500;
          letter-spacing: 1px;
          text-transform: uppercase;
          border: 1px solid rgba(212, 163, 115, 0.2);
        }

        .card-content {
          flex: 0.9;
          position: relative;
        }

        .location-number {
          font-size: 8rem;
          font-weight: 700;
          color: white;
          font-family: var(--font-serif);
          line-height: 1;
          position: absolute;
          top: -3rem;
          left: -1rem;
          opacity: 0.1;
          pointer-events: none;
        }

        .card-content h2 {
          font-size: 3.5rem;
          margin-bottom: 1.5rem;
          color: white;
          position: relative;
        }

        .separator {
          height: 2px;
          background: linear-gradient(90deg, var(--color-accent), transparent);
          margin-bottom: 1.5rem;
        }

        .card-content p {
          font-size: 1.1rem;
          color: #999;
          margin-bottom: 2.5rem;
          line-height: 1.9;
        }

        .explore-btn {
          background: transparent;
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.4);
          padding: 1rem 2.5rem;
          font-family: var(--font-sans);
          font-size: 0.9rem;
          letter-spacing: 1px;
          cursor: not-allowed;
          transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }

        .explore-btn.active {
          border-color: var(--color-accent);
          color: var(--color-accent);
          cursor: pointer;
          background: rgba(212, 163, 115, 0.05);
        }

        .explore-btn.active:hover {
          background: var(--color-accent);
          color: #111;
        }

        .btn-arrow {
          transition: transform 0.3s ease;
        }

        .explore-btn.active:hover .btn-arrow {
          transform: translateX(5px);
        }

        @media (max-width: 900px) {
          .location-card, .location-card.odd {
            flex-direction: column;
            gap: 3rem;
            margin-bottom: 8rem;
          }

          .card-content {
            text-align: center;
          }

          .separator {
            margin: 1.5rem auto;
          }

          .location-number {
            left: 50%;
            transform: translateX(-50%);
          }

          .card-content h2 {
            font-size: 2.5rem;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default LocationDeck;
