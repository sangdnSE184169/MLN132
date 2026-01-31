import { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

const AspectMedia = ({ aspect }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="aspect-image"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.img
        src={aspect.image}
        alt={aspect.title}
        loading="lazy"
        initial={{ scale: 1.1 }}
        animate={{
          scale: isHovered ? 1.15 : 1,
          opacity: isHovered && aspect.video ? 0 : 1
        }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />

      {aspect.video && isHovered && (
        <motion.iframe
          className="aspect-video"
          src={`${aspect.video}?autoplay=1&mute=1`}
          title={aspect.title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <motion.span
        className="aspect-type"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {aspect.type}
      </motion.span>

      {aspect.video && !isHovered && (
        <motion.div
          className="video-indicator"
          animate={{
            boxShadow: ["0 0 0 0 rgba(212, 163, 115, 0.4)", "0 0 0 10px rgba(212, 163, 115, 0)", "0 0 0 0 rgba(212, 163, 115, 0)"]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>▶</span> Di chuột để xem video
        </motion.div>
      )}
    </div>
  );
};

const AspectCard = ({ aspect, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={`aspect-card ${index % 2 === 0 ? 'left' : 'right'}`}
      initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60, y: 30 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        delay: 0.1
      }}
    >
      <AspectMedia aspect={aspect} />
      <motion.div
        className="aspect-content"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <motion.span
          className="aspect-number"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 0.08 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          0{index + 1}
        </motion.span>
        <motion.h3
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          {aspect.title}
        </motion.h3>
        <motion.h4
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {aspect.subtitle}
        </motion.h4>
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          {aspect.description}
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const LocationDetail = ({ location, onClose }) => {
  if (!location) return null;

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.4 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, delay: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 100, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.98,
      transition: { duration: 0.3 }
    }
  };

  const heroContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.4
      }
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        className="detail-overlay"
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={onClose}
      >
        <motion.div
          className="detail-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Hero Section */}
          <div className="detail-hero">
            <motion.div
              className="hero-bg-image"
              style={{ backgroundImage: `url(${location.heroImage})` }}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            />
            <div className="hero-gradient" />

            <motion.button
              className="close-btn"
              onClick={onClose}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              whileHover={{
                scale: 1.1,
                rotate: 90,
                backgroundColor: "white",
                color: "black"
              }}
              whileTap={{ scale: 0.95 }}
            >
              ✕
            </motion.button>

            <motion.div
              className="hero-content"
              variants={heroContentVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.h1 variants={heroItemVariants}>
                {location.name}
              </motion.h1>
              <motion.div
                className="hero-line"
                initial={{ width: 0 }}
                animate={{ width: 100 }}
                transition={{ delay: 0.8, duration: 0.6 }}
              />
              <motion.p variants={heroItemVariants}>
                {location.intro}
              </motion.p>
            </motion.div>
          </div>

          {/* Cultural Aspects */}
          <div className="aspects-container">
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              Khám Phá Văn Hóa
              <motion.span
                className="title-decoration"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
            </motion.h2>

            {location.culturalAspects.map((aspect, index) => (
              <AspectCard key={aspect.id} aspect={aspect} index={index} />
            ))}
          </div>

          {/* Footer */}
          <motion.div
            className="detail-footer"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <motion.button
              className="back-btn"
              onClick={onClose}
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 30px rgba(212, 163, 115, 0.2)"
              }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="btn-arrow">←</span> Quay lại danh sách
            </motion.button>
          </motion.div>
        </motion.div>

        <style>{`
          .detail-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.95);
            z-index: 1000;
            overflow-y: auto;
            overflow-x: hidden;
            backdrop-filter: blur(10px);
          }

          .detail-container {
            min-height: 100vh;
            background: var(--color-bg);
          }

          .detail-hero {
            height: 85vh;
            position: relative;
            display: flex;
            align-items: flex-end;
            overflow: hidden;
          }

          .hero-bg-image {
            position: absolute;
            inset: 0;
            background-size: cover;
            background-position: center;
          }

          .hero-gradient {
            position: absolute;
            inset: 0;
            background: linear-gradient(
              to bottom,
              transparent 0%,
              rgba(15, 16, 18, 0.3) 30%,
              rgba(15, 16, 18, 0.8) 70%,
              rgba(15, 16, 18, 1) 100%
            );
          }

          .close-btn {
            position: fixed;
            top: 2rem;
            right: 2rem;
            width: 56px;
            height: 56px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.4);
            border: 1px solid rgba(255, 255, 255, 0.15);
            color: white;
            font-size: 1.3rem;
            cursor: pointer;
            z-index: 100;
            backdrop-filter: blur(10px);
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          }

          .hero-content {
            position: relative;
            z-index: 1;
            padding: 4rem;
            max-width: 800px;
          }

          .hero-content h1 {
            font-size: 5.5rem;
            margin-bottom: 1.5rem;
            background: linear-gradient(135deg, #fff 0%, var(--color-accent) 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1.1;
          }

          .hero-line {
            height: 3px;
            background: linear-gradient(90deg, var(--color-accent), transparent);
            margin-bottom: 1.5rem;
          }

          .hero-content p {
            font-size: 1.4rem;
            color: rgba(255, 255, 255, 0.85);
            line-height: 1.9;
          }

          .aspects-container {
            padding: 8rem 4rem;
            max-width: 1400px;
            margin: 0 auto;
          }

          .section-title {
            text-align: center;
            font-size: 2.8rem;
            color: white;
            margin-bottom: 6rem;
            position: relative;
          }

          .title-decoration {
            position: absolute;
            bottom: -1.5rem;
            left: 50%;
            transform: translateX(-50%);
            width: 120px;
            height: 2px;
            background: linear-gradient(90deg, transparent, var(--color-accent), transparent);
            display: block;
          }

          .aspect-card {
            display: flex;
            gap: 5rem;
            margin-bottom: 8rem;
            align-items: center;
          }

          .aspect-card.right {
            flex-direction: row-reverse;
          }

          .aspect-image {
            flex: 1;
            position: relative;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 30px 60px rgba(0, 0, 0, 0.5);
            aspect-ratio: 16/10;
            background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
          }

          .aspect-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            position: absolute;
            top: 0;
            left: 0;
          }

          .aspect-video {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .aspect-type {
            position: absolute;
            top: 1.2rem;
            left: 1.2rem;
            background: var(--color-accent);
            color: #111;
            padding: 0.5rem 1.2rem;
            border-radius: 25px;
            font-size: 0.7rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            z-index: 10;
          }

          .video-indicator {
            position: absolute;
            bottom: 1.2rem;
            right: 1.2rem;
            background: rgba(0, 0, 0, 0.75);
            color: white;
            padding: 0.6rem 1.2rem;
            border-radius: 25px;
            font-size: 0.75rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
            backdrop-filter: blur(10px);
            z-index: 10;
            border: 1px solid rgba(212, 163, 115, 0.3);
          }

          .video-indicator span {
            color: var(--color-accent);
          }

          .aspect-content {
            flex: 1;
            position: relative;
          }

          .aspect-number {
            font-size: 6rem;
            font-weight: 700;
            color: white;
            font-family: var(--font-serif);
            line-height: 1;
            display: block;
            position: absolute;
            top: -2rem;
            left: -0.5rem;
            pointer-events: none;
          }

          .aspect-content h3 {
            font-size: 2.2rem;
            color: white;
            margin-bottom: 0.6rem;
          }

          .aspect-content h4 {
            font-size: 1.15rem;
            color: var(--color-accent);
            font-weight: 400;
            font-style: italic;
            margin-bottom: 1.5rem;
          }

          .aspect-content p {
            font-size: 1.05rem;
            color: #999;
            line-height: 2;
          }

          .detail-footer {
            padding: 5rem;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
            background: linear-gradient(to top, rgba(0,0,0,0.3), transparent);
          }

          .back-btn {
            background: transparent;
            border: 1px solid var(--color-accent);
            color: var(--color-accent);
            padding: 1.2rem 3rem;
            font-size: 1rem;
            cursor: pointer;
            border-radius: 6px;
            transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
          }

          .back-btn:hover {
            background: var(--color-accent);
            color: #111;
          }

          .btn-arrow {
            transition: transform 0.3s ease;
          }

          .back-btn:hover .btn-arrow {
            transform: translateX(-5px);
          }

          @media (max-width: 900px) {
            .hero-content h1 {
              font-size: 3.5rem;
            }

            .hero-content {
              padding: 2rem;
            }

            .aspects-container {
              padding: 4rem 2rem;
            }

            .aspect-card,
            .aspect-card.right {
              flex-direction: column;
              gap: 2.5rem;
            }

            .aspect-content h3 {
              font-size: 1.7rem;
            }

            .aspect-number {
              font-size: 4rem;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default LocationDetail;
