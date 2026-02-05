
import { motion } from 'framer-motion';
import { useState } from 'react';
import './Credits.css';
import geminiProof from '../assets/gemini-proof.jpg';

const Credits = ({ onClose }) => {
    const [isZoomed, setIsZoomed] = useState(false);

    return (
        <motion.div
            className="credits-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
        >
            <button className="credits-close-btn" onClick={onClose}>
                Close
            </button>

            <div className="credits-content">
                <div className="credits-scroll-container">


                    {/* Team Members */}
                    <div className="credits-section">
                        <div className="credits-role">Developed By</div>
                        <div className="credits-name">Nguyễn Đức Thắng</div>
                        <div className="credits-role">SE183829</div>
                    </div>

                    <div className="credits-section">
                        <div className="credits-name">Đặng Ngọc Sáng</div>
                        <div className="credits-role">SE184169</div>
                    </div>

                    {/* Tech Stack */}
                    <div className="credits-section">
                        <div className="credits-role">Powered By</div>
                        <div className="credits-tech-list">
                            <div className="tech-item">
                                <div
                                    className="tech-link-container"
                                    onClick={() => setIsZoomed(true)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <img
                                        src={geminiProof}
                                        alt="Gemini Chat Proof"
                                        className="tech-proof-img"
                                    />
                                    <span className="tech-label">Gemini</span>
                                </div>
                                <span className="tech-desc"> • Image Generation</span>
                            </div>
                            {/* GPT Removed */}
                            <div className="tech-item">
                                <span>Antigravity</span> • AI Coding Assistant
                            </div>
                        </div>
                    </div>

                    {/* Special Thanks / Conclusion */}
                    <div className="credits-section">
                        <div className="credits-logo">NorthernUI</div>
                        <div className="credits-role">Thank you for visiting</div>
                    </div>
                </div>
            </div>

            {/* Image Zoom Modal */}
            {isZoomed && (
                <div
                    className="image-zoom-overlay"
                    onClick={() => setIsZoomed(false)}
                >
                    <img
                        src={geminiProof}
                        alt="Gemini Chat Proof Zoomed"
                        className="image-zoom-content"
                    />
                </div>
            )}
        </motion.div>
    );
};

export default Credits;
