import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';

// Story data - all scenes
const storyData = {
    part1: {
        title: "Phần 1",
        subtitle: "Cậu bé canh gác và con lợn của đồn trưởng",
        scenes: [
            {
                id: 1,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_qtv6fkqtv6fkqtv6.png",
                content: [
                    "Gió núi Pú Nhung thổi ràn rạt qua những tán cây. Năm ấy Vừ A Dính chưa đầy 13 tuổi nhưng đã rắn rỏi như cây lim, cây sến giữa rừng."
                ]
            },
            {
                id: 2,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_bw33dgbw33dgbw33.png",
                content: [
                    "Hôm đó, Dính đang đứng gác trên mỏm đá cao thì nghe tiếng động lạ. Không phải từ phía Tuần Giáo, mà là từ hướng rừng Bản Chăn. Những bóng áo lính Pháp thấp thoáng sau màn lá."
                ]
            },
            {
                id: 3,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_yqibo9yqibo9yqib.png",
                content: [
                    "Dính nheo mắt, nhận ra ngay nguy hiểm. Cậu bé lao vụt về bản, vừa chạy vừa hét lớn, tiếng vang vọng cả núi rừng:",
                    { type: "shout", text: "\"Có Tây! Có thằng Tây! Bà con ơi, chạy nhanh lên!\"" }
                ]
            },
            {
                id: 4,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_fzx24vfzx24vfzx2.png",
                content: [
                    "Dân bản nháo nhào thu dọn đồ đạc chạy vào rừng. Dính không chạy ngay, cậu tạt qua nhà xem mẹ và các em đã an toàn chưa."
                ]
            },
            {
                id: 5,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_vd9qb3vd9qb3vd9q.png",
                content: [
                    "Nhưng không kịp nữa, một toán lính Pháp ùa tới, súng lăm lăm trên tay. Chúng vây lấy cậu bé nhỏ thó."
                ]
            },
            {
                id: 6,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_jvrd74jvrd74jvrd.png",
                content: [
                    "Tên chỉ huy hất hàm, ra lệnh cho lính bắt Dính đi theo làm phu. Hắn chỉ vào cái rọ lợn to tướng đang để bên đường:",
                    { type: "dialogue", speaker: "right", text: "\"Mày! Cõng cái này về đồn cho tao!\"" }
                ]
            },
            {
                id: 7,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_a6gsbpa6gsbpa6gs.png",
                content: [
                    "Dính cắn răng, ghé vai cõng con lợn nặng trịch. Mồ hôi vã ra như tắm, nhưng đôi mắt cậu bé cứ đảo liên hồi tìm cách thoát."
                ]
            },
            {
                id: 8,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_ngeigngeigngeign.png",
                content: [
                    "Đến một con dốc đứng cạnh bờ suối, Dính nảy ra một ý. Cậu giả vờ trượt chân.",
                    { type: "shout", text: "\"Á!\"" },
                    "Cả người cả rọ lợn lăn lông lốc xuống dốc. Rầm! Dính va vào một cây gỗ chặn ngang, còn cái rọ lợn bung ra, con lợn éc lên một tiếng rồi chạy biến vào rừng sâu."
                ]
            },
            {
                id: 9,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_vd9qb3vd9qb3vd9q.png",
                content: [
                    "Tên đồn trưởng Pháp mặt đỏ gay, chạy xuống túm lấy cổ áo Dính, gầm lên:",
                    { type: "dialogue", speaker: "right", text: "\"Thằng nhãi! Mày cố tình thả lợn của tao à?\"" },
                    { type: "dialogue", speaker: "left", text: "\"Tao trượt chân!\"" },
                    "Dính ngước mặt lên, trả lời cộc lốc.",
                    { type: "dialogue", speaker: "right", text: "\"Mất lợn thì mạng mày phải thế! Nhốt nó lại! Sáng mai bắn bỏ!\"" }
                ]
            },
            {
                id: 10,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_52dnmy52dnmy52dn.png",
                content: [
                    "Đêm đó, Dính nằm cạnh ông già Vừ Xa.",
                    { type: "dialogue", speaker: "left", text: "\"Anh à, nằm chờ chết thì uổng lắm. Anh em mình dỡ mái trốn đi.\"" },
                    { type: "dialogue", speaker: "right", text: "\"Liệu có được không? Lính gác nhiều lắm.\"" },
                    { type: "dialogue", speaker: "left", text: "\"Được anh ạ. Trời tối đen thế này, chúng nó lại chủ quan.\"" }
                ]
            },
            {
                id: 11,
                image: "/story-assets/Chap 1/Gemini_Generated_Image_v6h0kvv6h0kvv6h0.png",
                content: [
                    "Và đêm ấy, hai bóng người nhỏ bé lặng lẽ dỡ mái tranh, trườn qua hệ thống canh gác dày đặc, biến mất vào màn đêm của rừng núi tự do."
                ]
            }
        ]
    },
    part2: {
        title: "Phần 2",
        subtitle: "Chiến sĩ liên lạc nhỏ tuổi",
        scenes: [
            {
                id: 12,
                image: "/story-assets/chap2-part2/dinh_courier_running_1769877341937.png",
                content: [
                    "Năm 13 tuổi, Vừ A Dính đã thoát ly gia đình trở thành đội viên liên lạc của đội vũ trang huyện Tuần Giáo.",
                    "Đội vũ trang của Dính hoạt động trên một địa bàn rất rộng, từ châu Điện Biên ra châu Tuần Giáo rồi ngược lên châu Tủa Chùa.",
                    "Nhiệm vụ chính của Dính là làm giao liên. Lần nào nhận nhiệm vụ đi liên lạc, Dính cũng mưu trí bảo đảm an toàn và về trước thời gian quy định."
                ]
            },
            {
                id: 13,
                image: "/story-assets/chap2-part2/dinh_studying_firelight_1769876788490.png",
                content: [
                    "Cuộc sống kháng chiến gian khổ nhưng Vừ A Dính rất lạc quan yêu đời. Dính rất ham học và học khá.",
                    "Lúc nào trong ngực áo của Dính cũng nhét cuốn sách để tranh thủ học. Dính đã học đọc và viết chữ thông thạo.",
                    "Khuôn mặt tròn, đôi mắt tinh nhanh, chân tay thoăn thoắt là hình ảnh chiến sĩ nhỏ Vừ A Dính hằn sâu trong mắt các chiến sĩ của đội vũ trang Tuần Giáo."
                ]
            },
            {
                id: 14,
                image: "/story-assets/chap2-part2/dinh_banana_water_1769876818534.png",
                content: [
                    "Địch tăng cường lùng sục tìm diệt đội vũ trang nên đơn vị luôn phải di chuyển để giữ bí mật.",
                    "Đơn vị thường ở trên các triền núi cao xa nguồn nước. Cuộc sống vô cùng gian khổ, hàng tháng trời không một hạt muối, không một hạt gạo.",
                    "Đơn vị của Dính đã có sáng kiến chặt ngang thân cây chuối rồi khoét ruột để lấy nước. Dính được giao phụ trách việc này và làm rất khéo léo.",
                    { type: "dialogue", speaker: "left", text: "\"Từ nhỏ em trèo núi đi nhanh đã quen chân rồi!\"" },
                    "Dính cười hồn nhiên khi các anh hỏi tại sao cậu luồn rừng giỏi thế."
                ]
            },
            {
                id: 15,
                image: "/story-assets/chap2-part2/dinh_spying_fortress_1769876862361.png",
                content: [
                    "Được tin mẹ và cả nhà bị địch bắt giam tại đồn Bản Chăn, Dính buồn và thương mẹ lắm.",
                    "Biết tin đơn vị chuẩn bị đánh đồn Bản Chăn, Dính đã đề nghị được xuống núi điều tra nắm tình hình địch và nhân tiện tìm hiểu tin tức về mẹ.",
                    "Dính như con sóc lao xuống núi gặp du kích Bản Chăn, bí mật dẫn ra mỏm núi gần đồn để quan sát.",
                    "Mai phục suốt hai ngày đêm, Dính vẫn không thấy những người bị giam ra khỏi trại."
                ]
            },
            {
                id: 16,
                image: "/story-assets/chap2-part2/dinh_mother_prison_1769876898832.png",
                content: [
                    "Sáng sớm ngày thứ ba, Dính đã bí mật làm ống bương đựng nước rồi nấp sau một tảng đá sát bên mép suối.",
                    "Khi đám người bị bắt giam được lính đồn dẫn ra suối lấy nước, Dính đã nhanh chóng trà trộn vào mà địch không hề phát hiện ra.",
                    "Đêm ấy, Dính đã được nằm cạnh mẹ và các em. Mẹ đã cung cấp nhiều tin tức quan trọng cho Dính về đồn Bản Chăn.",
                    { type: "dialogue", speaker: "left", text: "\"Mẹ và các em đừng khai báo chỗ ở của cơ sở cách mạng!\"" },
                    "Dính còn động viên và căn dặn mẹ như vậy trước khi chia tay."
                ]
            },
            {
                id: 17,
                image: "/story-assets/Gemini_Generated_Image_94oer394oer394oe.png",
                content: [
                    "Trở về đơn vị, Dính đã báo cáo tỉ mỉ và vẽ lại sơ đồ từng vị trí bố phòng của địch.",
                    "Các anh chỉ huy thấy nguy hiểm đã không cho Dính vào trong đồn địch nữa mà chỉ liên lạc với mẹ ở bên ngoài.",
                    "Và lần gặp sau đó của mẹ và Dính bên bờ suối là lần gặp cuối cùng.",
                    { type: "dramatic", text: "Mẹ Sùng Thị Plây của Dính đã bị giặc bắn ngay sau buổi gặp, báo tin cho Dính trở về trại giam cùng với 22 người khác." }
                ]
            }
        ]
    },
    part3: {
        title: "Phần 3",
        subtitle: "Hy sinh hóa bất tử",
        scenes: [
            {
                id: 18,
                image: "/story-assets/chap2-part2/dinh_misty_ambush_1769876939316.png",
                content: [
                    "Tháng 6 năm 1949, giặc Pháp huy động tổng lực quân lính từ các đồn trong khu vực để vây ráp hòng tiêu diệt đội vũ trang Tuần Giáo.",
                    "Gần 1.000 quân đổ về căn cứ Pú Nhung từ nhiều ngả đường."
                ]
            },
            {
                id: 19,
                image: "/story-assets/chap2-part2/dinh_captured_scene_1769877239597.png",
                content: [
                    "Hôm ấy trời mù sương, chỉ cách nhau vài bước chân mà không nhìn thấy nhau.",
                    "Dính vừa bí mật gặp mẹ trở về, sau lưng còn đeo trong bọc cả trăm viên đạn mà mẹ mới trao cho.",
                    "Vì trời giăng sương mù mịt nên rất khó quan sát, Dính bất ngờ rơi vào ổ phục kích của giặc mà không hay biết."
                ]
            },
            {
                id: 20,
                image: "/story-assets/Gemini_Generated_Image_kk04qmkk04qmkk04.png",
                content: [
                    "Thằng đội Tây biết đây là một liên lạc cho du kích, y mừng ra mặt rồi hỏi Dính:",
                    { type: "dialogue", speaker: "right", text: "\"Các ông Tỉnh ở đâu?\"" },
                    { type: "dialogue", speaker: "left", text: "\"Không biết.\"" },
                    "Dính bình tĩnh trả lời.",
                    { type: "dialogue", speaker: "right", text: "\"Cái bao đạn này mày mang về cho ông Tỉnh bắn chúng tao mà mày không biết à? Nói đi! Không tao bắn vỡ đầu mày bây giờ!\"" },
                    { type: "dialogue", speaker: "left", text: "\"Không biết.\"" },
                    "Dính vẫn trả lời."
                ]
            },
            {
                id: 21,
                image: "/story-assets/chap2-part2/dinh_night_tree_1769877306112.png",
                content: [
                    "Tên đội Tây không giữ được bình tĩnh, xông vào đánh Dính túi bụi. Lũ giặc thay nhau đánh đập dã man Dính đến tận trưa.",
                    { type: "highlight", text: "Đánh chán thì địch lại hỏi, Dính vẫn chỉ trả lời hai từ \"không biết\"." },
                    "Một tên lính ác ôn đã cầm báng súng đánh gãy một bên ống chân của Dính.",
                    { type: "dramatic", text: "Mặt tím bầm, môi sưng vù, chân bị gãy vô cùng đau đớn nhưng Dính cắn răng, nước mắt giàn giụa, miệng không hé một lời nào." },
                    "Đêm ấy, giặc trói Dính dưới một gốc đào giữa sương khuya lạnh buốt."
                ]
            },
            {
                id: 22,
                image: "/story-assets/Gemini_Generated_Image_94oer394oer394oe.png",
                content: [
                    "Hôm sau rồi đêm sau nữa, giặc tiếp tục tra tấn và bỏ đói, bỏ khát Dính giữa rừng.",
                    "Sự gan dạ của Vừ A Dính đã làm run sợ nhiều tên lính ngụy.",
                    "Sáng ngày thứ ba, tên đội Tây đến trước mặt Dính dụ dỗ:",
                    { type: "dialogue", speaker: "right", text: "\"Tao sẽ cho băng thuốc chữa chân gãy cho mày, cho mày ăn uống tử tế và thưởng nhiều tiền nữa. Nói đi, ông Tỉnh ở đâu?\"" },
                    { type: "dramatic", text: "Dính vẫn trơ như đá, không hé răng nửa lời. Thằng đội Tây gầm lên khi không khuất phục được một thằng bé, hắn hầm hầm bỏ đi." }
                ]
            },
            {
                id: 23,
                image: "/story-assets/chap2-part2/dinh_leading_soldiers_1769877108830.png",
                content: [
                    "Những người Thái, người Mông, người Xá bị địch bắt đi ngang qua nhìn thấy cảnh tượng của Dính ai cũng rớm nước mắt.",
                    "Gặp người quen, Dính vội nhắn bằng tiếng Mông:",
                    { type: "dialogue", speaker: "left", text: "\"Cái túi tài liệu tôi giấu trong rừng, nhắn các anh ra lấy về.\"" },
                    "Biết mình khó qua khỏi bàn tay tàn ác của kẻ thù, sáng hôm sau Dính vờ gật đầu:",
                    { type: "dialogue", speaker: "left", text: "\"Biết, biết...\"" },
                    { type: "dialogue", speaker: "left", text: "\"Làm cáng cho tao!\"" },
                    "Dính nói với tên đội Tây. Ròng rã một ngày trời, Dính bắt bọn giặc khiêng mình đi hết ngọn núi này sang khu rừng khác nhưng vẫn chưa chịu chỉ vị trí đóng quân của bộ đội.",
                    { type: "dramatic", text: "Loanh quanh đến chiều tối, Dính lại dẫn chúng trở về nơi xuất phát ban đầu." }
                ]
            },
            {
                id: 24,
                image: "/story-assets/chap2-part2/dinh_heroic_sacrifice_1769877137645.png",
                content: [
                    "Vừ A Dính ngước nhìn bầu trời với núi rừng quê hương, mỉm cười.",
                    { type: "dramatic", text: "Biết bị lừa, thằng đội Tây gầm lên, nó xả cả một băng đạn vào ngực Vừ A Dính. Sau đó nó sai treo xác cậu lên cây đào cổ thụ." },
                    { type: "highlight", text: "Hôm ấy là chiều tối ngày 15 tháng 6 năm 1949, Vừ A Dính đã anh dũng hy sinh bên gốc cây đào cổ thụ ở Khe Trúc gần đồn Bản Chăn khi chưa tròn 15 tuổi." }
                ]
            },
            {
                id: 25,
                image: "/story-assets/chap2-part2/dinh_memorial_1769877179326.png",
                content: [
                    "Ngay cái đêm Vừ A Dính hy sinh, chứng kiến cái chết hiên ngang anh dũng, hơn 10 tên lính ngụy đã bỏ trốn khỏi hàng ngũ của địch.",
                    "Bên bếp lửa hồng trong các gia đình người Mông, người Xá, người Thái khắp vùng Tây Bắc, người ta tự hào kể cho con cháu nghe về tấm gương hy sinh bất khuất của cậu bé người Mông ở Pú Nhung.",
                    { type: "highlight", text: "Năm 1952, Chính phủ đã truy tặng Huân chương Quân công hạng Ba cho Vừ A Dính." },
                    "Tháng 3 năm 1999, Ban Bí thư Trung ương Đoàn đã ra quyết định thành lập Quỹ học bổng Vừ A Dính dành cho học sinh, sinh viên dân tộc thiểu số cả nước.",
                    { type: "dramatic", text: "Ngày mùng 8 tháng 11 năm 2000, Chủ tịch nước Cộng hòa Xã hội Chủ nghĩa Việt Nam đã truy tặng danh hiệu Anh hùng Lực lượng vũ trang nhân dân cho Vừ A Dính." }
                ]
            }
        ]
    }
};

// Floating particles component
const FloatingParticles = () => {
    const particles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        delay: Math.random() * 5,
        duration: Math.random() * 10 + 15
    }));

    return (
        <div className="particles-container">
            {particles.map((p) => (
                <motion.div
                    key={p.id}
                    className="particle"
                    style={{
                        width: p.size,
                        height: p.size,
                        left: `${p.x}%`,
                    }}
                    animate={{
                        y: [0, -800],
                        opacity: [0, 1, 0],
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
};

function StoryReader({ onClose }) {
    const containerRef = useRef(null);
    const [currentScene, setCurrentScene] = useState(0);
    const totalScenes = 25;

    const { scrollYProgress } = useScroll({ container: containerRef });
    const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTo(0, 0);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        const sceneId = entry.target.getAttribute('data-scene');
                        if (sceneId) setCurrentScene(parseInt(sceneId));
                    }
                });
            },
            { threshold: 0.2, rootMargin: '-100px' }
        );

        const chapters = document.querySelectorAll('.story-chapter');
        chapters.forEach((chapter) => observer.observe(chapter));

        return () => observer.disconnect();
    }, []);

    const renderContent = (item, index) => {
        if (typeof item === 'string') {
            return (
                <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                    {item}
                </motion.p>
            );
        }

        switch (item.type) {
            case 'shout':
                return (
                    <motion.p
                        key={index}
                        className="shout"
                        initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, type: "spring" }}
                    >
                        {item.text}
                    </motion.p>
                );
            case 'dialogue':
                return (
                    <motion.p
                        key={index}
                        className={`dialogue ${item.speaker}`}
                        initial={{ opacity: 0, x: item.speaker === 'left' ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: index * 0.05 }}
                    >
                        {item.text}
                    </motion.p>
                );
            case 'dramatic':
                return (
                    <motion.div
                        key={index}
                        className="dramatic-block"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <p>{item.text}</p>
                    </motion.div>
                );
            case 'highlight':
                return (
                    <motion.p
                        key={index}
                        className="highlight-text"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        {item.text}
                    </motion.p>
                );
            default:
                return <p key={index}>{item.text}</p>;
        }
    };

    const renderPart = (part, partKey) => (
        <div key={partKey} className="story-part">
            <motion.div
                className="part-divider"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="part-bg-image"
                    initial={{ scale: 1.2 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                />
                <motion.span
                    className="part-badge"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    {part.title}
                </motion.span>
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    {part.subtitle}
                </motion.h2>
                <motion.div
                    className="part-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                />
            </motion.div>

            {part.scenes.map((scene, sceneIndex) => (
                <section
                    key={scene.id}
                    className="story-chapter"
                    data-scene={scene.id}
                >
                    <motion.div
                        className="chapter-image"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="image-frame">
                            <img src={scene.image} alt={`Scene ${scene.id}`} loading="lazy" />
                            <div className="image-overlay-gradient" />
                        </div>
                        <span className="scene-number">{String(scene.id).padStart(2, '0')}</span>
                    </motion.div>
                    <div className="chapter-content">
                        {scene.content.map((item, index) => renderContent(item, index))}
                    </div>
                </section>
            ))}
        </div>
    );

    return (
        <AnimatePresence>
            <motion.div
                className="story-reader-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
            >
                {/* Reading Progress Bar */}
                <motion.div className="reading-progress" style={{ scaleX }} />

                {/* Scene Counter */}
                <div className="scene-counter">
                    <span className="current">{String(currentScene).padStart(2, '0')}</span>
                    <span className="divider">/</span>
                    <span className="total">{totalScenes}</span>
                </div>

                <motion.div
                    className="story-reader-container"
                    ref={containerRef}
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                    {/* Back Button */}
                    <motion.button
                        className="back-button"
                        onClick={onClose}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                        whileHover={{ scale: 1.05, x: -5 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="back-arrow">←</span>
                        <span className="back-text">Trở về Tây Bắc</span>
                    </motion.button>

                    {/* Hero Section */}
                    <header className="story-hero">
                        <div className="hero-bg">
                            <img src="/story-assets/Gemini_Generated_Image_94oer394oer394oe.png" alt="" />
                            <div className="hero-overlay" />
                        </div>
                        <FloatingParticles />

                        <motion.div
                            className="hero-content"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, delay: 0.3 }}
                        >
                            <motion.div
                                className="hero-badge"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            >
                                Câu chuyện lịch sử
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 0.7 }}
                            >
                                <span className="title-main">Vừ A Dính</span>
                            </motion.h1>

                            <motion.div
                                className="title-line"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                            />

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.8, delay: 1.2 }}
                            >
                                Người thiếu niên anh hùng
                            </motion.h2>

                            <motion.p
                                className="hero-dates"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.8, delay: 1.4 }}
                            >
                                1934 — 1949
                            </motion.p>
                        </motion.div>

                        <motion.div
                            className="scroll-indicator"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.6 }}
                        >
                            <div className="mouse">
                                <div className="wheel" />
                            </div>
                            <span>Cuộn để khám phá</span>
                        </motion.div>
                    </header>

                    {/* Story Content */}
                    <main className="story-main">
                        {renderPart(storyData.part1, 'part1')}
                        {renderPart(storyData.part2, 'part2')}
                        {renderPart(storyData.part3, 'part3')}
                    </main>

                    {/* End Screen */}
                    <footer className="story-end">
                        <FloatingParticles />
                        <motion.div
                            className="end-content"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1 }}
                        >
                            <motion.div
                                className="memorial-image"
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <img src="/story-assets/Gemini_Generated_Image_kk04qmkk04qmkk04.png" alt="Vừ A Dính" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                            >
                                Vừ A Dính
                            </motion.h2>

                            <motion.p
                                className="dates"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                            >
                                1934 — 1949
                            </motion.p>

                            <motion.blockquote
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.6 }}
                            >
                                "Cuộc đời người chiến sĩ liên lạc nhỏ tuổi của đội vũ trang Tuần Giáo đã khép lại
                                nhưng khí phách trung kiên bất khuất của Vừ A Dính trước quân thù vẫn mãi như
                                ngọn đuốc rực sáng giữa núi rừng Tây Bắc."
                            </motion.blockquote>

                            <motion.p
                                className="tribute"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                            >
                                ★ Anh hùng Lực lượng vũ trang nhân dân ★
                            </motion.p>

                            <motion.button
                                className="return-button"
                                onClick={onClose}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 60px rgba(200, 0, 0, 0.4)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span>←</span> Trở về khám phá Tây Bắc
                            </motion.button>
                        </motion.div>
                    </footer>
                </motion.div>

                <style>{`
          .story-reader-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: #000;
            z-index: 1000;
            overflow: hidden;
          }

          /* Reading Progress */
          .reading-progress {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #c00, #ff4444);
            transform-origin: 0%;
            z-index: 1002;
            box-shadow: 0 0 20px rgba(200, 0, 0, 0.5);
          }

          /* Scene Counter */
          .scene-counter {
            position: fixed;
            top: 20px;
            right: 20px;
            z-index: 1001;
            display: flex;
            align-items: baseline;
            gap: 4px;
            font-family: 'Oswald', sans-serif;
            color: rgba(255, 255, 255, 0.8);
            background: rgba(0, 0, 0, 0.6);
            padding: 0.5rem 1rem;
            border-radius: 50px;
            backdrop-filter: blur(10px);
          }

          .scene-counter .current {
            font-size: 1.5rem;
            font-weight: 600;
            color: #fff;
          }

          .scene-counter .divider {
            font-size: 1rem;
            opacity: 0.5;
          }

          .scene-counter .total {
            font-size: 1rem;
            opacity: 0.7;
          }

          .story-reader-container {
            width: 100%;
            height: 100%;
            overflow-y: auto;
            overflow-x: hidden;
            scroll-behavior: smooth;
          }

          /* Particles */
          .particles-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            overflow: hidden;
            pointer-events: none;
          }

          .particle {
            position: absolute;
            bottom: -20px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
          }

          /* Back Button */
          .back-button {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 1001;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            padding: 0.75rem 1.5rem;
            background: rgba(0, 0, 0, 0.7);
            color: #fff;
            border: 1px solid rgba(255, 255, 255, 0.1);
            border-radius: 50px;
            font-size: 0.9rem;
            font-weight: 500;
            cursor: pointer;
            backdrop-filter: blur(20px);
            transition: all 0.3s ease;
          }

          .back-button:hover {
            background: rgba(200, 0, 0, 0.9);
            border-color: transparent;
          }

          .back-arrow {
            font-size: 1.4rem;
            transition: transform 0.3s;
          }

          .back-button:hover .back-arrow {
            transform: translateX(-5px);
          }

          /* Story Hero - ENHANCED */
          .story-hero {
            position: relative;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            overflow: hidden;
          }

          .hero-bg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
          }

          .hero-bg img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(100%);
            opacity: 0.15;
            transform: scale(1.1);
            animation: slow-zoom 30s ease-in-out infinite alternate;
          }

          @keyframes slow-zoom {
            0% { transform: scale(1.1) translate(0, 0); }
            100% { transform: scale(1.2) translate(-2%, -2%); }
          }

          .hero-overlay {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(
              180deg,
              rgba(0, 0, 0, 0.3) 0%,
              rgba(0, 0, 0, 0.7) 50%,
              rgba(0, 0, 0, 0.95) 100%
            );
          }

          .hero-content {
            position: relative;
            z-index: 1;
            text-align: center;
            padding: 2rem;
          }

          .hero-badge {
            display: inline-block;
            background: linear-gradient(135deg, rgba(200, 0, 0, 0.2), rgba(200, 0, 0, 0.1));
            color: #ff6666;
            padding: 0.6rem 2rem;
            border-radius: 50px;
            font-size: 0.8rem;
            font-weight: 600;
            letter-spacing: 3px;
            text-transform: uppercase;
            margin-bottom: 2rem;
            border: 1px solid rgba(200, 0, 0, 0.3);
          }

          .story-hero h1 {
            margin-bottom: 1.5rem;
          }

          .title-main {
            display: block;
            font-family: 'Oswald', sans-serif;
            font-size: clamp(4rem, 12vw, 8rem);
            font-weight: 700;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 8px;
            line-height: 1;
            text-shadow: 0 0 60px rgba(255, 255, 255, 0.2);
          }

          .title-line {
            width: 150px;
            height: 3px;
            background: linear-gradient(90deg, transparent, #c00, transparent);
            margin: 1.5rem auto;
            transform-origin: center;
          }

          .story-hero h2 {
            font-family: 'Merriweather', serif;
            font-size: clamp(1rem, 3vw, 1.5rem);
            font-weight: 300;
            font-style: italic;
            color: rgba(255, 255, 255, 0.6);
            letter-spacing: 4px;
            text-transform: uppercase;
          }

          .hero-dates {
            margin-top: 2rem;
            font-family: 'Oswald', sans-serif;
            font-size: 1.2rem;
            color: rgba(255, 255, 255, 0.4);
            letter-spacing: 6px;
          }

          /* Scroll Indicator */
          .scroll-indicator {
            position: absolute;
            bottom: 40px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            color: rgba(255, 255, 255, 0.4);
            font-size: 0.8rem;
            letter-spacing: 2px;
            text-transform: uppercase;
          }

          .mouse {
            width: 26px;
            height: 40px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-radius: 20px;
            position: relative;
          }

          .wheel {
            width: 4px;
            height: 8px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 2px;
            position: absolute;
            top: 8px;
            left: 50%;
            transform: translateX(-50%);
            animation: scroll-wheel 1.5s ease-in-out infinite;
          }

          @keyframes scroll-wheel {
            0% { opacity: 1; transform: translateX(-50%) translateY(0); }
            100% { opacity: 0; transform: translateX(-50%) translateY(15px); }
          }

          /* Story Main */
          .story-main {
            background: linear-gradient(180deg, #000 0%, #0a0a0a 10%, #f5f5f0 15%);
          }

          .story-part {
            padding: 0 2rem;
          }

          /* Part Divider - ENHANCED */
          .part-divider {
            position: relative;
            min-height: 70vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            text-align: center;
            background: #0a0a0a;
            margin: 0 -2rem;
            padding: 6rem 2rem;
            overflow: hidden;
          }

          .part-bg-image {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: url('/story-assets/Gemini_Generated_Image_kk04qmkk04qmkk04.png') center/cover;
            opacity: 0.05;
          }

          .part-badge {
            display: inline-block;
            background: rgba(200, 0, 0, 0.2);
            color: #ff6666;
            padding: 0.5rem 2rem;
            border-radius: 50px;
            font-family: 'Oswald', sans-serif;
            font-size: 1rem;
            font-weight: 600;
            letter-spacing: 4px;
            text-transform: uppercase;
            margin-bottom: 2rem;
            border: 1px solid rgba(200, 0, 0, 0.3);
          }

          .part-divider h2 {
            position: relative;
            font-family: 'Merriweather', serif;
            font-size: clamp(1.8rem, 5vw, 3rem);
            font-weight: 400;
            font-style: italic;
            color: #fff;
            letter-spacing: 2px;
            max-width: 600px;
          }

          .part-line {
            width: 100px;
            height: 2px;
            background: linear-gradient(90deg, transparent, #c00, transparent);
            margin-top: 2rem;
            transform-origin: center;
          }

          /* Story Chapter - ENHANCED */
          .story-chapter {
            display: flex;
            flex-direction: column;
            max-width: 900px;
            margin: 0 auto 8rem;
            opacity: 0;
            transform: translateY(50px);
            transition: all 1s cubic-bezier(0.22, 1, 0.36, 1);
          }

          .story-chapter.visible {
            opacity: 1;
            transform: translateY(0);
          }

          .chapter-image {
            position: relative;
            margin-bottom: 3rem;
          }

          .image-frame {
            position: relative;
            width: 100%;
            aspect-ratio: 16/9;
            overflow: hidden;
            border-radius: 8px;
            box-shadow: 0 30px 80px rgba(0, 0, 0, 0.3);
          }

          .image-frame img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 8s ease-out;
          }

          .story-chapter:hover .image-frame img {
            transform: scale(1.05);
          }

          .image-overlay-gradient {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            height: 40%;
            background: linear-gradient(transparent, rgba(0, 0, 0, 0.4));
            pointer-events: none;
          }

          .scene-number {
            position: absolute;
            bottom: -20px;
            right: 20px;
            font-family: 'Oswald', sans-serif;
            font-size: 5rem;
            font-weight: 700;
            color: rgba(0, 0, 0, 0.08);
            line-height: 1;
            pointer-events: none;
          }

          .chapter-content {
            max-width: 650px;
            margin: 0 auto;
            padding: 0 1.5rem;
          }

          .chapter-content p {
            font-family: 'Merriweather', serif;
            font-size: 1.15rem;
            line-height: 2;
            color: #333;
            margin-bottom: 1.5rem;
          }

          /* Dialogue - ENHANCED */
          .chapter-content .dialogue {
            position: relative;
            background: #fff;
            padding: 1.25rem 1.75rem;
            border: 2px solid #222;
            border-radius: 24px;
            max-width: 80%;
            margin: 2rem 0 2.5rem;
            box-shadow: 8px 8px 0 rgba(0, 0, 0, 0.1);
            font-style: normal;
            clear: both;
            transition: transform 0.3s, box-shadow 0.3s;
          }

          .chapter-content .dialogue:hover {
            transform: translateY(-2px);
            box-shadow: 10px 12px 0 rgba(0, 0, 0, 0.12);
          }

          .chapter-content .dialogue.left {
            float: left;
            margin-right: auto;
            border-bottom-left-radius: 4px;
            background: linear-gradient(135deg, #fff, #fafafa);
          }

          .chapter-content .dialogue.right {
            float: right;
            margin-left: auto;
            background: linear-gradient(135deg, #f5f5f5, #eee);
            border-bottom-right-radius: 4px;
          }

          .chapter-content .dialogue + p:not(.dialogue) {
            clear: both;
            padding-top: 1.5rem;
          }

          /* Shout - ENHANCED */
          .chapter-content .shout {
            font-family: 'Oswald', sans-serif;
            font-weight: 700;
            font-size: 1.5rem;
            color: #c00;
            background: linear-gradient(135deg, #fff, #fff5f5);
            border: 3px solid #c00;
            border-radius: 24px;
            padding: 1.25rem 2rem;
            margin: 2.5rem auto;
            max-width: 85%;
            text-align: center;
            box-shadow: 8px 8px 0 rgba(200, 0, 0, 0.15);
            animation: subtle-shake 0.5s ease-in-out infinite;
          }

          @keyframes subtle-shake {
            0%, 100% { transform: rotate(-0.5deg); }
            50% { transform: rotate(0.5deg); }
          }

          /* Dramatic Block - ENHANCED */
          .dramatic-block {
            background: linear-gradient(135deg, rgba(200, 0, 0, 0.08), rgba(200, 0, 0, 0.02));
            border-left: 4px solid #c00;
            padding: 1.5rem 2rem;
            margin: 2rem 0;
            border-radius: 0 12px 12px 0;
            box-shadow: 0 4px 20px rgba(200, 0, 0, 0.1);
          }

          .dramatic-block p {
            font-weight: 500;
            color: #1a1a1a;
            margin: 0;
          }

          /* Highlight Text - ENHANCED */
          .highlight-text {
            background: linear-gradient(120deg, rgba(200, 0, 0, 0.1) 0%, rgba(200, 0, 0, 0.05) 100%);
            padding: 0.75rem 1.25rem;
            border-radius: 8px;
            font-weight: 500;
            border-left: 3px solid #c00;
          }

          /* Story End - ENHANCED */
          .story-end {
            position: relative;
            min-height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background: linear-gradient(180deg, #f5f5f0 0%, #0a0a0a 30%, #000 100%);
            color: #fff;
            text-align: center;
            padding: 6rem 2rem;
            overflow: hidden;
          }

          .end-content {
            position: relative;
            z-index: 1;
            max-width: 700px;
          }

          .memorial-image {
            width: 180px;
            height: 180px;
            margin: 0 auto 3rem;
            border-radius: 50%;
            overflow: hidden;
            border: 4px solid rgba(255, 255, 255, 0.1);
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          }

          .memorial-image img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            filter: grayscale(30%);
          }

          .end-content h2 {
            font-family: 'Oswald', sans-serif;
            font-size: clamp(2.5rem, 8vw, 4rem);
            letter-spacing: 6px;
            text-transform: uppercase;
            margin-bottom: 0.5rem;
            text-shadow: 0 0 40px rgba(255, 255, 255, 0.2);
          }

          .end-content .dates {
            font-size: 1.3rem;
            color: rgba(255, 255, 255, 0.5);
            font-family: 'Oswald', sans-serif;
            letter-spacing: 6px;
            margin-bottom: 3rem;
          }

          .end-content blockquote {
            font-family: 'Merriweather', serif;
            font-size: 1.15rem;
            font-style: italic;
            line-height: 2;
            color: rgba(255, 255, 255, 0.7);
            border-left: 3px solid #c00;
            padding-left: 2rem;
            margin: 0 0 3rem;
            text-align: left;
          }

          .end-content .tribute {
            font-size: 1.1rem;
            color: #c00;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            letter-spacing: 4px;
            margin-bottom: 3rem;
          }

          .return-button {
            display: inline-flex;
            align-items: center;
            gap: 0.75rem;
            padding: 1.25rem 3rem;
            background: linear-gradient(135deg, #c00 0%, #900 100%);
            color: #fff;
            border: none;
            border-radius: 50px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            text-transform: uppercase;
            letter-spacing: 2px;
            transition: all 0.3s;
          }

          .return-button span {
            font-size: 1.3rem;
            transition: transform 0.3s;
          }

          .return-button:hover span {
            transform: translateX(-5px);
          }

          /* Responsive */
          @media (max-width: 768px) {
            .back-button {
              top: 10px;
              left: 10px;
              padding: 0.6rem 1rem;
            }

            .back-text {
              display: none;
            }

            .scene-counter {
              top: 10px;
              right: 10px;
            }

            .title-main {
              letter-spacing: 4px;
            }

            .story-chapter {
              margin-bottom: 5rem;
            }

            .image-frame {
              border-radius: 4px;
            }

            .scene-number {
              font-size: 3rem;
            }

            .chapter-content p {
              font-size: 1.05rem;
            }

            .part-divider {
              min-height: 50vh;
              padding: 4rem 2rem;
            }

            .memorial-image {
              width: 140px;
              height: 140px;
            }
          }
        `}</style>
            </motion.div>
        </AnimatePresence>
    );
}

export default StoryReader;
