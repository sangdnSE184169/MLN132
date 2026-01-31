import { motion } from 'framer-motion';

function HeroStorySection({ onOpenStory }) {
    return (
        <section className="hero-story-section">
            <motion.div
                className="story-intro"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="story-badge">Câu chuyện lịch sử</div>

                <h2>Vừ A Dính</h2>
                <h3>Người thiếu niên anh hùng</h3>

                <p className="story-description">
                    Khám phá câu chuyện về người anh hùng nhỏ tuổi của dân tộc Mông,
                    đã anh dũng hy sinh trong cuộc kháng chiến chống Pháp tại vùng núi Tây Bắc.
                </p>

                <motion.div
                    className="story-image-container"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <img
                        src="/story-assets/Gemini_Generated_Image_94oer394oer394oe.png"
                        alt="Vừ A Dính"
                    />
                    <div className="image-overlay">
                        <span>1934 - 1949</span>
                    </div>
                </motion.div>

                <motion.button
                    className="read-story-btn"
                    onClick={onOpenStory}
                    whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(200, 0, 0, 0.3)" }}
                    whileTap={{ scale: 0.98 }}
                >
                    <span className="btn-icon">📖</span>
                    Đọc câu chuyện
                </motion.button>

                <p className="story-tagline">
                    "Khí phách trung kiên bất khuất trước quân thù vẫn mãi như ngọn đuốc rực sáng giữa núi rừng Tây Bắc"
                </p>
            </motion.div>

            <style>{`
        .hero-story-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 6rem 2rem;
          background: linear-gradient(180deg, 
            var(--color-bg) 0%, 
            #1a1a1a 50%,
            #0a0a0a 100%
          );
          position: relative;
          overflow: hidden;
        }

        .hero-story-section::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('/story-assets/Gemini_Generated_Image_kk04qmkk04qmkk04.png') center/cover;
          opacity: 0.05;
          pointer-events: none;
        }

        .story-intro {
          text-align: center;
          max-width: 700px;
          position: relative;
          z-index: 1;
        }

        .story-badge {
          display: inline-block;
          background: rgba(200, 0, 0, 0.15);
          color: #c00;
          padding: 0.5rem 1.5rem;
          border-radius: 50px;
          font-size: 0.85rem;
          font-weight: 600;
          letter-spacing: 2px;
          text-transform: uppercase;
          margin-bottom: 2rem;
          border: 1px solid rgba(200, 0, 0, 0.3);
        }

        .story-intro h2 {
          font-size: clamp(3rem, 8vw, 5rem);
          font-weight: 700;
          color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: 4px;
          text-transform: uppercase;
        }

        .story-intro h3 {
          font-size: clamp(1.2rem, 3vw, 1.8rem);
          font-weight: 300;
          color: rgba(255, 255, 255, 0.6);
          margin-bottom: 2rem;
          font-style: italic;
        }

        .story-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 3rem;
        }

        .story-image-container {
          position: relative;
          width: 280px;
          height: 280px;
          margin: 0 auto 3rem;
          border-radius: 50%;
          overflow: hidden;
          border: 4px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
        }

        .story-image-container img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          filter: grayscale(30%);
          transition: filter 0.3s ease;
        }

        .story-image-container:hover img {
          filter: grayscale(0%);
        }

        .image-overlay {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 1rem;
          background: linear-gradient(transparent, rgba(0,0,0,0.8));
          color: rgba(255, 255, 255, 0.8);
          font-size: 0.9rem;
          letter-spacing: 2px;
        }

        .read-story-btn {
          display: inline-flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1.2rem 3rem;
          font-size: 1.1rem;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #c00 0%, #900 100%);
          border: none;
          border-radius: 50px;
          cursor: pointer;
          letter-spacing: 1px;
          text-transform: uppercase;
          transition: all 0.3s ease;
          margin-bottom: 3rem;
        }

        .btn-icon {
          font-size: 1.3rem;
        }

        .story-tagline {
          font-size: 1rem;
          font-style: italic;
          color: rgba(255, 255, 255, 0.5);
          line-height: 1.8;
          max-width: 500px;
          margin: 0 auto;
        }

        @media (max-width: 768px) {
          .hero-story-section {
            padding: 4rem 1.5rem;
          }

          .story-image-container {
            width: 200px;
            height: 200px;
          }

          .read-story-btn {
            padding: 1rem 2rem;
            font-size: 1rem;
          }
        }
      `}</style>
        </section>
    );
}

export default HeroStorySection;
