import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const Hero = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  };

  const glowVariants = {
    animate: {
      textShadow: [
        "0 0 20px rgba(212, 163, 115, 0)",
        "0 0 40px rgba(212, 163, 115, 0.3)",
        "0 0 20px rgba(212, 163, 115, 0)"
      ],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <section className="hero-section" ref={ref}>
      <motion.div
        className="hero-bg"
        style={{ y, scale }}
      />
      <div className="hero-overlay" />
      <motion.div className="hero-pattern" style={{ opacity }} />

      <motion.div
        className="hero-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{ opacity }}
      >
        <motion.div
          className="ethnic-pattern"
          variants={itemVariants}
          whileHover={{
            scale: 1.2,
            rotate: 180,
            transition: { duration: 0.5 }
          }}
        >
          ❋
        </motion.div>

        <motion.span className="subtitle" variants={itemVariants}>
          Hành trình qua miền di sản
        </motion.span>

        <motion.h1
          variants={itemVariants}
          animate="animate"
          whileHover={{ scale: 1.02 }}
        >
          <motion.span variants={glowVariants} animate="animate">
            Tây Bắc
          </motion.span>
        </motion.h1>

        <motion.h2 variants={itemVariants}>
          Bản Sắc & Văn Hóa
        </motion.h2>

        <motion.p variants={itemVariants}>
          Nơi núi rừng hùng vĩ giao hòa cùng bản sắc độc đáo của các dân tộc H'Mông, Thái, Dao, Tày...
        </motion.p>

        <motion.div
          className="scroll-hint"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            Cuộn để khám phá
          </motion.span>
          <motion.div
            className="mouse"
            whileHover={{ scale: 1.1 }}
          >
            <div className="wheel" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Floating particles */}
      <div className="particles">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="particle"
            initial={{
              x: Math.random() * 100 + "%",
              y: "100%",
              opacity: 0
            }}
            animate={{
              y: "-100%",
              opacity: [0, 0.6, 0]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear"
            }}
            style={{
              left: `${10 + i * 15}%`
            }}
          />
        ))}
      </div>

      <style>{`
        .hero-section {
          height: 100vh;
          width: 100%;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          text-align: center;
          overflow: hidden;
        }

        .hero-bg {
          position: absolute;
          inset: -10%;
          background-image: url('https://images.unsplash.com/photo-1570366583862-f91883984fde?q=80&w=2070&auto=format&fit=crop'); 
          background-size: cover;
          background-position: center;
          z-index: 0;
        }

        .hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to bottom,
            rgba(15, 16, 18, 0.2) 0%,
            rgba(15, 16, 18, 0.4) 40%,
            rgba(15, 16, 18, 0.95) 100%
          );
          z-index: 1;
        }

        .hero-pattern {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4a373' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          z-index: 1;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 900px;
          padding: 2rem;
        }

        .ethnic-pattern {
          font-size: 3rem;
          color: var(--color-accent);
          margin-bottom: 1.5rem;
          display: inline-block;
          cursor: pointer;
          filter: drop-shadow(0 0 10px rgba(212, 163, 115, 0.3));
        }

        h1 {
          font-size: 8rem;
          margin: 0;
          letter-spacing: -4px;
          line-height: 0.9;
          font-weight: 700;
          background: linear-gradient(135deg, #fff 0%, #d4a373 50%, #fff 100%);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s ease infinite;
        }

        @keyframes shimmer {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        h2 {
          font-size: 2.8rem;
          font-weight: 400;
          color: var(--color-accent);
          margin: 0.5rem 0 2rem;
          font-style: italic;
          opacity: 0.9;
        }

        .subtitle {
          text-transform: uppercase;
          letter-spacing: 8px;
          font-size: 0.85rem;
          color: rgba(255,255,255,0.6);
          display: block;
          margin-bottom: 1rem;
        }

        p {
          font-size: 1.25rem;
          opacity: 0.8;
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.9;
        }

        .scroll-hint {
          position: absolute;
          bottom: 3rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .scroll-hint span {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 3px;
          opacity: 0.5;
        }

        .mouse {
          width: 26px;
          height: 42px;
          border: 2px solid rgba(255,255,255,0.3);
          border-radius: 20px;
          display: flex;
          justify-content: center;
          padding-top: 8px;
          transition: border-color 0.3s ease;
        }

        .mouse:hover {
          border-color: var(--color-accent);
        }

        .wheel {
          width: 4px;
          height: 8px;
          background: var(--color-accent);
          border-radius: 2px;
          animation: scroll 2s cubic-bezier(0.65, 0, 0.35, 1) infinite;
        }

        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(15px); opacity: 0; }
        }

        .particles {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: var(--color-accent);
          border-radius: 50%;
          filter: blur(1px);
        }

        @media (max-width: 768px) {
          h1 { font-size: 4.5rem; letter-spacing: -2px; }
          h2 { font-size: 1.6rem; }
          .ethnic-pattern { font-size: 2rem; }
          .subtitle { letter-spacing: 4px; font-size: 0.75rem; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
