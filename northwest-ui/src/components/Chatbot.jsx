import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const API_URL = 'https://api.groq.com/openai/v1/chat/completions';

const SYSTEM_CONTEXT = `Bạn là một hướng dẫn viên du lịch AI thân thiện và nhiệt tình, chuyên về vùng Tây Bắc Việt Nam. 
Bạn có kiến thức sâu rộng về:
- Mù Cang Chải: Ruộng bậc thang nổi tiếng, mùa lúa chín (tháng 9-10)
- Sapa: Đỉnh Fansipan, bản Cát Cát, chợ tình
- Mai Châu: Bản Lác, văn hóa người Thái, nhà sàn truyền thống
- Y Tý: Ruộng bậc thang, săn mây, văn hóa Hà Nhì
- Điện Biên: Chiến thắng Điện Biên Phủ, di tích lịch sử, văn hóa Thái

Hãy trả lời ngắn gọn, thân thiện và hữu ích bằng tiếng Việt. Nếu được hỏi về các địa điểm khác ngoài Tây Bắc, hãy khéo léo gợi ý họ khám phá Tây Bắc.`;

function Chatbot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Xin chào! 👋 Mình là hướng dẫn viên AI của Tây Bắc. Bạn muốn khám phá địa điểm nào?'
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input.trim() };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            // Build messages array for OpenAI-compatible API
            const apiMessages = [
                { role: 'system', content: SYSTEM_CONTEXT },
                ...messages.map(msg => ({
                    role: msg.role,
                    content: msg.content
                })),
                { role: 'user', content: userMessage.content }
            ];

            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: 'openai/gpt-oss-120b',
                    messages: apiMessages,
                    temperature: 0.7,
                    max_tokens: 500,
                })
            });

            const data = await response.json();

            if (data.choices && data.choices[0]?.message?.content) {
                const assistantMessage = {
                    role: 'assistant',
                    content: data.choices[0].message.content
                };
                setMessages(prev => [...prev, assistantMessage]);
            } else {
                console.error('API Response:', data);
                throw new Error('Invalid response');
            }
        } catch (error) {
            console.error('Chatbot error:', error);
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: 'Xin lỗi, mình gặp chút trục trặc. Bạn thử hỏi lại nhé! 😊'
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    };

    return (
        <>
            {/* Floating Button */}
            <motion.button
                className="chatbot-toggle"
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                animate={{ rotate: isOpen ? 45 : 0 }}
            >
                {isOpen ? '✕' : '💬'}
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="chatbot-window"
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {/* Header */}
                        <div className="chatbot-header">
                            <div className="chatbot-avatar">🏔️</div>
                            <div className="chatbot-info">
                                <h4>Hướng dẫn viên Tây Bắc</h4>
                                <span className="chatbot-status">
                                    <span className="status-dot"></span>
                                    Online
                                </span>
                            </div>
                        </div>

                        {/* Messages */}
                        <div className="chatbot-messages">
                            {messages.map((msg, index) => (
                                <motion.div
                                    key={index}
                                    className={`chat-message ${msg.role}`}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    {msg.role === 'assistant' && (
                                        <div className="message-avatar">🏔️</div>
                                    )}
                                    <div className="message-bubble">
                                        {msg.content}
                                    </div>
                                </motion.div>
                            ))}

                            {isLoading && (
                                <motion.div
                                    className="chat-message assistant"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                >
                                    <div className="message-avatar">🏔️</div>
                                    <div className="message-bubble typing">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </motion.div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="chatbot-input-container">
                            <input
                                ref={inputRef}
                                type="text"
                                className="chatbot-input"
                                placeholder="Hỏi về Tây Bắc..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyPress={handleKeyPress}
                                disabled={isLoading}
                            />
                            <motion.button
                                className="chatbot-send"
                                onClick={sendMessage}
                                disabled={!input.trim() || isLoading}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                ➤
                            </motion.button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style>{`
        .chatbot-toggle {
          position: fixed;
          bottom: 24px;
          right: 24px;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a373 0%, #bc8c5f 100%);
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          box-shadow: 0 4px 20px rgba(212, 163, 115, 0.4);
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .chatbot-toggle:hover {
          box-shadow: 0 6px 30px rgba(212, 163, 115, 0.6);
        }

        .chatbot-window {
          position: fixed;
          bottom: 100px;
          right: 24px;
          width: 380px;
          height: 520px;
          background: linear-gradient(180deg, #1e1e24 0%, #16161a 100%);
          border-radius: 20px;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          z-index: 999;
          border: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chatbot-header {
          padding: 16px 20px;
          background: linear-gradient(135deg, rgba(212, 163, 115, 0.15) 0%, rgba(212, 163, 115, 0.05) 100%);
          display: flex;
          align-items: center;
          gap: 12px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chatbot-avatar {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a373 0%, #bc8c5f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
        }

        .chatbot-info h4 {
          font-family: 'Playfair Display', serif;
          font-size: 1rem;
          color: #f0f0f0;
          margin: 0;
        }

        .chatbot-status {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.6);
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #4ade80;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        .chatbot-messages {
          flex: 1;
          overflow-y: auto;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .chat-message {
          display: flex;
          gap: 8px;
          max-width: 85%;
        }

        .chat-message.user {
          align-self: flex-end;
          flex-direction: row-reverse;
        }

        .chat-message.assistant {
          align-self: flex-start;
        }

        .message-avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #d4a373 0%, #bc8c5f 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 14px;
          flex-shrink: 0;
        }

        .message-bubble {
          padding: 12px 16px;
          border-radius: 18px;
          font-size: 0.9rem;
          line-height: 1.5;
        }

        .chat-message.assistant .message-bubble {
          background: rgba(255, 255, 255, 0.08);
          color: #f0f0f0;
          border-bottom-left-radius: 4px;
        }

        .chat-message.user .message-bubble {
          background: linear-gradient(135deg, #d4a373 0%, #bc8c5f 100%);
          color: white;
          border-bottom-right-radius: 4px;
        }

        .message-bubble.typing {
          display: flex;
          gap: 4px;
          padding: 16px 20px;
        }

        .message-bubble.typing span {
          width: 8px;
          height: 8px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          animation: typing 1.4s infinite;
        }

        .message-bubble.typing span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .message-bubble.typing span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes typing {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-6px); }
        }

        .chatbot-input-container {
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          display: flex;
          gap: 12px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
        }

        .chatbot-input {
          flex: 1;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 12px 16px;
          color: #f0f0f0;
          font-size: 0.9rem;
          outline: none;
          transition: all 0.2s ease;
        }

        .chatbot-input:focus {
          border-color: rgba(212, 163, 115, 0.5);
          background: rgba(255, 255, 255, 0.1);
        }

        .chatbot-input::placeholder {
          color: rgba(255, 255, 255, 0.4);
        }

        .chatbot-send {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: linear-gradient(135deg, #d4a373 0%, #bc8c5f 100%);
          border: none;
          color: white;
          font-size: 18px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .chatbot-send:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        @media (max-width: 480px) {
          .chatbot-window {
            width: calc(100% - 32px);
            right: 16px;
            bottom: 90px;
            height: 450px;
          }

          .chatbot-toggle {
            right: 16px;
            bottom: 16px;
            width: 54px;
            height: 54px;
          }
        }
      `}</style>
        </>
    );
}

export default Chatbot;
