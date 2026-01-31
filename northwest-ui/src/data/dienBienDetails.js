// Cultural and historical content for Điện Biên Phủ detail page
const dienBienDetails = {
    id: 5,
    name: "Điện Biên Phủ",
    heroImage: "https://cdn.langsontv.vn/upload/news/3_2024/12_08260016032024.jpg",
    intro: "Nơi hào khí lịch sử vọng vang giữa lòng chảo Mường Thanh, nơi chiến thắng 'lừng lẫy năm châu, chấn động địa cầu' hòa quyện cùng bản sắc ngàn đời của người Thái Đen.",

    culturalAspects: [
        {
            id: 1,
            title: "Chiến thắng 'Chấn động địa cầu'",
            subtitle: "56 ngày đêm rung chuyển thế giới",
            description: "Lịch sử nhân loại khắc ghi ngày 7/5/1954 - khi cờ đỏ sao vàng tung bay trên nóc hầm De Castries. Chiến thắng Điện Biên Phủ không chỉ giải phóng miền Bắc, mà còn gióng lên hồi chuông báo tử cho chủ nghĩa thực dân cũ trên toàn thế giới.",
            image: "https://cdn.nhandan.vn/images/d233c8299c7755bbf317d96e7a85fcf78e100aefad6b5c987e11a5e1795788b93c57d48ed80053c073fc3a733eaff6e5c4edd5bca1ce28f7db2a1458b485e9f8/0_cover-1651866011968.jpeg",
            type: "history"
        },
        {
            id: 2,
            title: "Hố bộc phá nghìn cân trên Đồi A1",
            subtitle: "Tiếng nổ mở cánh cửa chiến thắng",
            description: "Đồi A1 - cứ điểm kiên cố nhất, pháo đài cuối cùng của địch. Khi mọi cách đánh đều bế tắc, quân ta âm thầm đào hầm ngầm suốt 33 ngày đêm, đặt khối bộc phá 1 tấn vào lòng đồi. Chiều 6/5/1954, tiếng nổ vang trời như sấm - hiệu lệnh cho đợt tổng tấn công cuối cùng.",
            image: "https://cdnphoto.dantri.com.vn/WMkobEQfjBcga_XUYpIaG-p0yR4=/zoom/1200_630/2024/04/29/doi-a1-crop-1714402965378.jpeg",
            type: "history"
        },
        {
            id: 3,
            title: "Chiếc khăn Piêu",
            subtitle: "Tình yêu dệt bằng chỉ màu",
            description: "Trên chiếc khăn Piêu, mỗi đường thêu là một lời yêu thương. Cô gái Thái Đen tự tay thêu khăn tặng người thương như gửi gắm cả trái tim. Khăn Piêu không chỉ che mái tóc, mà là vật định tình, là lời hứa thủy chung theo suốt cuộc đời.",
            image: "https://media.vov.vn/sites/default/files/styles/large_watermark/public/2025-03/_khan_pieu_duoc_theu_bang_chi_mau_ruc_ro.jpg",
            type: "tradition"
        },
        {
            id: 4,
            title: "Tục 'Tằng cẩu' (Búi tóc)",
            subtitle: "Dấu hiệu của tình yêu thủy chung",
            description: "Khi cô gái Thái Đen về nhà chồng, mái tóc dài được búi cao lên đỉnh đầu thành 'Tằng cẩu'. Từ giây phút ấy, cả bản làng biết nàng đã có chốn nương thân. Chiếc búi tóc cao vút như lời thề không phai, như ngọn núi đứng vững giữa đời.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxBlxbghWnOT2zpZaHSAzb8Ac7iNfidwRyQA&s",
            type: "tradition"
        },
        {
            id: 5,
            title: "Hệ thống 'Mương - Phai - Lái - Lín'",
            subtitle: "Dòng nước nuôi vựa lúa Tây Bắc",
            description: "Người Thái Điện Biên là bậc thầy thuần phục nước. Hệ thống mương phai dẫn dòng suối nguồn vào cánh đồng Mường Thanh, biến nơi đây thành vựa lúa lớn nhất Tây Bắc. Đó là kiệt tác thủy lợi được truyền qua bao thế hệ, minh chứng cho trí tuệ và lòng yêu đất của người vùng cao.",
            image: "https://redsvn.net/wp-content/uploads/2018/02/Con-nuoc-Tay-Bac-01.jpg",
            type: "heritage"
        },
        {
            id: 6,
            title: "Văn hóa ẩm thực 'Chẩm chéo'",
            subtitle: "Linh hồn của mâm cơm Thái",
            description: "Chẩm chéo - chén nước chấm thần kỳ làm từ mắc khén, ớt nướng, muối, tỏi. Vị tê cay lan trên đầu lưỡi, hương thơm ngất ngây đánh thức mọi giác quan. Không có chẩm chéo, thịt gác bếp mất đi nửa hồn, rau rừng nhạt nhẽo vô vị. Đó là linh hồn của mâm cơm Thái Đen.",
            image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9uvH5pK7eSjhC-9ghL4W__LAfG4yjF-fzTg&s",
            type: "food"
        },
        {
            id: 7,
            title: "Lễ hội Hoa Ban (Xên Bản)",
            subtitle: "Khi hoa ban nở trắng rừng",
            description: "Tháng Ba, hoa ban nở trắng núi đồi như mây trời sa xuống. Người Thái mở hội Xên Bản, dâng lễ tạ ơn thần linh, cầu mong mùa màng tươi tốt. Những điệu xòe say đắm, những câu khắp (hát) tình tứ vang lên - khúc tình ca bất tận của trai gái vùng cao gửi vào đất trời.",
            image: "https://langvanhoavietnam.vn/Files/image/2024/THANG_3/LEXENBAN/IMG_0067.JPG",
            type: "festival"
        }
    ]
};

export default dienBienDetails;
