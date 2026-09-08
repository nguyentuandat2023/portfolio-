/**
 * PORTFOLIO JAVASCRIPT LOGIC - NGUYEN TUAN DAT
 * Marketing Leader & AI Automation Specialist
 */

document.addEventListener('DOMContentLoaded', () => {

  // --- 1. LANGUAGE TOGGLE (VI / EN) ---
  const langToggle = document.getElementById('langToggle');
  const langFlag = document.getElementById('langFlag');
  const langText = document.getElementById('langText');

  // Default to Vietnamese ('vi')
  let currentLang = localStorage.getItem('dat_portfolio_lang') || 'vi';
  let lightboxPlaylist = [];
  let currentLightboxIndex = 0;
  let isLightboxZoomed = false;
  let activeModalProjectId = null;
  let activeModalImageIndex = 0;

  const translations = {
    vi: {
      navAbout: 'Giới thiệu',
      navSkills: 'Năng lực',
      navWebApps: '28 Web Apps',
      navPortfolio: 'Dự án Media',
      navServices: 'Gói Dịch Vụ',
      navWorkflow: 'Quy Trình',
      navTestimonials: 'Đánh Giá',
      navAi: 'AI & Ebook',
      navExp: 'Kinh nghiệm',
      navWhyMe: 'Thế mạnh',
      navFaq: 'Hỏi Đáp',
      navContact: 'Liên hệ',
      navCvText: 'Tải CV 1 Trang',
      navRecruiterText: 'Dành Cho Tuyển Dụng',
      heroRecruiterText: 'Dành Cho Tuyển Dụng (30s Brief)',
      navStatusText: 'Open to Work',
      
      heroBadge: 'Senior Creative Designer & Visual Marketing Lead • Sẵn Sàng Nhận Dự Án & Remote Global',
      heroGreeting: 'Xin chào, tôi là',
      roleLabel: 'Chuyên môn: ',
      heroDesc: 'Chuyên gia <strong>Visual Design, Ad Creative & Product Landing Page</strong> với hơn 10 năm kinh nghiệm tối ưu tỷ lệ chuyển đổi (CRO), <strong>chuyên sâu thiết kế Website WordPress & phát triển Web3 bằng Vite code</strong> cho thị trường quốc tế (US, UK, AU...) và các thương hiệu <strong>eCommerce, B2B & Công nghệ AI/SaaS</strong>. Năng lực tự chủ vượt trội: sản xuất <strong>30 - 40 Ad Creatives chất lượng cao/tháng (tùy độ phức tạp của sản phẩm)</strong> và hoàn thiện trọn gói <strong>Landing Page / Website trong 2 - 3 ngày</strong> với bộ công cụ <strong>Photoshop, Canva, CapCut, WordPress, Vite Code & Sức mạnh Trí tuệ nhân tạo (ChatGPT, Gemini, Flow)</strong>, đồng thời không ngừng mở rộng nghiên cứu <strong>Premiere Pro, Illustrator, Figma</strong>.',
      heroBtn1: 'Xem Dự Án Thiết Kế',
      heroBtn2: 'Xem 28 Web & Web3 Thực Tế',
      heroBtn3: 'Tải CV PDF (1 Trang)',
      
      stat1Label: 'Ad Creatives / Tháng (Tùy độ khó)',
      stat2Label: 'Ngày / Landing Page CRO',
      stat3Label: 'Website & Nền Tảng Live',
      stat4Label: 'Năm Kinh Nghiệm Thực Chiến',
      
      avatarSub: '<i class="fa-solid fa-globe"></i> Senior Creative Designer & Visual Lead',
      cardFeatTitle1: 'Performance Ad Creatives',
      cardFeatDesc1: 'Tối ưu CTR cho Meta, TikTok, Instagram (US, UK, AU, VN)',
      cardFeatTitle2: 'Thiết Kế Web WordPress & Web3 Vite Code',
      cardFeatDesc2: 'Chuẩn SEO, WooCommerce, DApp Web3 & Tối ưu CRO',
      cardFeatTitle3: 'Kể Chuyện Trực Quan & Đột Phá AI',
      cardFeatDesc3: 'Chuyển hóa tính năng phức tạp thành hình ảnh chuyển đổi cao',
      cardStatusBadge: '<i class="fa-solid fa-circle-check"></i> Sẵn sàng làm việc Remote 100% | 8:00 - 17:00',
      
      clientsLabel: '<i class="fa-solid fa-certificate"></i> <span>Các Thương Hiệu & Doanh Nghiệp Đã Từng Hợp Tác Thực Tế</span>',
      aboutTag: '<i class="fa-solid fa-crosshairs"></i> Năng Lực Cốt Lõi',
      aboutTitle: 'Tư Duy Thẩm Mỹ Chuẩn Quốc Tế & Tối Ưu Chuyển Đổi',
      aboutSubtitle: 'Đáp ứng trọn vẹn yêu cầu vị trí Senior Creative Designer, Chuyên gia Web WordPress & Web3 Vite Code',
      aboutCardTitle1: 'Sản Xuất 30 - 40 Ad Creatives / Tháng',
      aboutCardDesc1: 'Am hiểu sâu sắc tâm lý thị giác và thị hiếu tiêu dùng phương Tây (US, UK, AU...). Tự chủ xây dựng Moodboard, sáng tạo Visual Hook giữ chân người xem trong 3 giây đầu, sản xuất <strong>30 - 40 ấn phẩm quảng cáo chất lượng cao/tháng</strong> (tùy mức độ phức tạp), tối ưu đa định dạng (1:1, 4:5, 9:16) cho Facebook Feed, Instagram, TikTok và sàn TMĐT.',
      aboutCardTitle2: 'Chuyên Sâu Web WordPress & Web3 (Vite Code)',
      aboutCardDesc2: 'Kinh nghiệm thực chiến thiết kế và phát triển <strong>Website WordPress chuẩn SEO, tốc độ cao, WooCommerce bán hàng</strong> và xây dựng <strong>Giao diện Web3 / DApp hiện đại bằng Vite code</strong>: giao diện Glassmorphism mượt mà, tối ưu chuyển đổi (CRO) và tương thích 100% mọi thiết bị.',
      aboutCardTitle3: 'Tư Duy Kể Chuyện B2B, eCommerce & Công Nghệ AI',
      aboutCardDesc3: 'Thế mạnh đặc biệt trong việc “thấu hiểu tính năng kỹ thuật phức tạp” của các sản phẩm SaaS & AI Tech để chuyển hóa thành <strong>thông điệp hình ảnh rõ ràng, giàu cảm xúc và kích thích đăng ký sử dụng</strong>.',
      
      skillsTag: 'Hệ Sinh Thái Kỹ Năng & Công Cụ',
      skillsTitle: 'Hệ Sinh Thái Kỹ Năng & Công Cụ Sáng Tạo',
      skillsSubtitle: 'Sự kết hợp giữa Photoshop, Canva, CapCut, WordPress, Web3 (Vite Code) và Sức mạnh Đột phá của AI (ChatGPT, Gemini, Flow)',
      skillCat1Title: 'Ad Creative & Hiệu Suất (CRO)',
      skillCat2Title: 'Web WordPress & Web3 (Vite Code)',
      skillCat3Title: 'Photoshop, Canva, CapCut & AI Superpower',
      
      webAppsTag: '<i class="fa-solid fa-rocket"></i> Live Web Showcase',
      webAppsTitle: 'Hệ Thống 28 Website & Web App Đã Triển Khai',
      webAppsSubtitle: 'Toàn bộ 28 nền tảng Web App, Landing Page AI, Khóa học và Hệ thống Doanh nghiệp đang vận hành thực tế',
      
      portfolioTag: 'Showcase Thực Tế',
      portfolioTitle: 'Bộ Sưu Tập Dự Án & Tác Phẩm Nổi Bật',
      portfolioSubtitle: 'Nhấp vào từng dự án để xem chi tiết bối cảnh, giải pháp và hình ảnh độ nét cao',
      
      servicesTag: '<i class="fa-solid fa-gem"></i> Gói Dịch Vụ & Hợp Tác',
      servicesTitle: 'Giải Pháp Thiết Kế Chuyên Nghiệp Theo Yêu Cầu',
      servicesSubtitle: 'Dành cho các Doanh nghiệp, Thương hiệu eCommerce và Agency cần giải pháp hình ảnh chất lượng cao',
      pkg1Title: 'Performance Ads & Social Media',
      pkg1Desc: 'Sản xuất hình ảnh quảng cáo đa kích thước (1:1, 4:5, 9:16) tối ưu chỉ số CTR, tăng tỷ lệ chuyển đổi cho chiến dịch Meta, TikTok & sàn TMĐT.',
      pkg2Title: 'Web WordPress, Web3 & Landing Page',
      pkg2Desc: 'Thiết kế trọn gói Website WordPress chuẩn SEO, phát triển giao diện Web3/DApp hiện đại bằng Vite code và Landing Page tối ưu tỷ lệ chuyển đổi (CRO).',
      pkg3Title: 'Bộ Nhận Diện & Profile B2B',
      pkg3Desc: 'Thiết kế Profile doanh nghiệp, Catalogue sản phẩm, Bộ ấn phẩm đấu thầu dự án chuẩn quy cách in ấn CMYK sắc nét, sang trọng.',
      pkg4Title: 'Creative Lead & AI Retainer',
      pkg4Desc: 'Đồng hành dài hạn phụ trách toàn bộ hệ thống hình ảnh, xây dựng quy trình ứng dụng AI tự động hóa và nâng tầm nhận diện thương hiệu.',
      
      guar1Title: '100% Đúng Deadline',
      guar1Desc: 'Bàn giao chuẩn tiến độ cam kết, không làm gián đoạn kế hoạch chạy Ads của doanh nghiệp.',
      guar2Title: 'Tối Ưu Chuyển Đổi',
      guar2Desc: 'Mỗi thiết kế đều dựa trên dữ liệu và insight khách hàng, hướng thẳng tới mục tiêu doanh thu.',
      guar3Title: 'Bảo Mật Tuyệt Đối',
      guar3Desc: 'Sẵn sàng ký cam kết bảo mật (NDA), bảo vệ toàn bộ dữ liệu dự án và kế hoạch kinh doanh.',
      guar4Title: 'Chỉnh Sửa Nhanh Trong 24h',
      guar4Desc: 'Tiếp nhận phản hồi và xử lý tinh chỉnh nhanh chóng, đảm bảo trải nghiệm hợp tác tốt nhất.',
      
      workflowTag: '<i class="fa-solid fa-diagram-project"></i> Quy Trình Làm Việc',
      workflowTitle: '5 Bước Thiết Kế Chuẩn Hóa & Bàn Giao Nhanh',
      workflowSubtitle: 'Quy trình làm việc minh bạch, tinh gọn, đảm bảo chất lượng và đúng tiến độ từng ngày',
      step1Title: 'Tiếp Nhận Brief & Phân Tích',
      step1Desc: 'Thấu hiểu sản phẩm, chân dung khách hàng mục tiêu, đối thủ cạnh tranh và mục tiêu cốt lõi của chiến dịch.',
      step2Title: 'Lên Concept & Visual Hook',
      step2Desc: 'Định hình phong cách hình ảnh, hệ màu sắc nhận diện và các góc nhìn trực quan kích thích sự tò mò của người xem.',
      step3Title: 'Thiết Kế Đồ Họa & AI Tốc Độ',
      step3Desc: 'Thực thi hoàn thiện trên Photoshop & Canva, kết hợp công cụ AI (ChatGPT, Gemini, Flow) tăng tốc độ x3 lần.',
      step4Title: 'Tinh Chỉnh Theo Feedback',
      step4Desc: 'Tiếp nhận góp ý trực tiếp từ khách hàng / Marketer và xử lý tinh chỉnh nhanh chóng trong vòng 24 giờ.',
      step5Title: 'Bàn Giao Trọn Gói File Gốc',
      step5Desc: 'Bàn giao đầy đủ file gốc (PSD/Canva Link), file ảnh nén chuẩn web (WebP/PNG) và file in ấn CMYK sắc nét.',
      
      testimonialsTag: '<i class="fa-solid fa-comments"></i> Đánh Giá Thực Tế',
      testimonialsTitle: 'Nhận Xét Từ Các Doanh Nghiệp & Đối Tác',
      testimonialsSubtitle: 'Những phản hồi chân thực về tốc độ bàn giao, tư duy thẩm mỹ và hiệu quả kinh doanh',
      testi1Quote: '"Đạt có khả năng tự chủ rất cao. Em tự xuống xưởng đóng tàu chụp ảnh, quay video thực tế và thiết kế toàn bộ hệ thống catalogue, banner, quản trị 4 website. Nhờ đó, phòng kinh doanh duy trì đều đặn 30 - 50 cuộc gọi B2B chất lượng mỗi tháng từ kênh online."',
      testi2Quote: '"Các chủ đề sức khỏe sinh sản vốn rất khô khan và nhạy cảm, nhưng qua các infographic và visual của bạn Đạt, thông tin trở nên rất gần gũi, văn minh. Tương tác tự nhiên của Fanpage tăng hơn 140%, giúp chúng tôi thu hút nhiều người đến tư vấn hơn."',
      testi3Quote: '"Làm việc với Đạt rất yên tâm về deadline. Thiết kế Ad Creative mỹ phẩm và hàng tiêu dùng rất bắt mắt, làm nổi bật được chất kem và công dụng sản phẩm. Chỉ số CTR trên TikTok Ads và Meta Ads được cải thiện rõ rệt sau khi đổi bộ visual mới."',
      
      aiTag: 'Sức Mạnh AI & Sản Phẩm Số',
      aiTitle: 'Sản Phẩm Số & Hệ Thống Tự Động Hóa Bằng AI',
      aiSubtitle: 'Đóng gói tri thức thực chiến thành sản phẩm có thể chuyển giao và mở rộng quy mô',
      
      expTag: '<i class="fa-solid fa-timeline"></i> Hành Trình Nghề Nghiệp',
      expTitle: '10+ Năm Kinh Nghiệm Thực Chiến Đa Ngành',
      expSubtitle: 'Từ Quản lý Marketing, Thiết kế Đồ họa, SEO chuyên sâu đến Xây dựng Hệ sinh thái AI',
      
      whyMeTag: '<i class="fa-solid fa-circle-check"></i> Độ Tương Thích Tuyệt Đối',
      whyMeTitle: 'Tại Sao Tôi Là Mảnh Ghép Hoàn Hảo Cho Doanh Nghiệp?',
      whyMeSubtitle: 'Cam kết trực tiếp về Khối lượng Deliverables, Tốc độ Bàn giao và Chất lượng Chuyển đổi',
      whyMeCardTitle1: 'Đảm Bảo 30 - 40 Ad Creatives / Tháng & 2-3 Ngày / Landing Page',
      whyMeCardDesc1: 'Nhờ việc làm chủ <strong>Photoshop, Canva, CapCut kết hợp các công cụ AI thế hệ mới (ChatGPT, Gemini, Flow)</strong>, tôi hoàn toàn tự tin duy trì tiến độ sản xuất <strong>30 - 40 ấn phẩm quảng cáo chất lượng cao mỗi tháng (tùy mức độ phức tạp)</strong> và hoàn thiện trọn gói Product Landing Page chỉ trong 2 - 3 ngày.',
      
      faqTag: '<i class="fa-solid fa-circle-question"></i> Hỏi Đáp Thường Gặp',
      faqTitle: 'Câu Hỏi Thường Gặp Khi Hợp Tác & Tuyển Dụng',
      faqSubtitle: 'Giải đáp nhanh các thắc mắc về tiến độ bàn giao, quy cách file và hình thức làm việc',
      faq1Q: '<i class="fa-solid fa-clock" style="color: var(--primary); margin-right: 0.5rem;"></i> Thời gian hoàn thiện và bàn giao 1 thiết kế là bao lâu?',
      faq1A: 'Đối với các ấn phẩm Ad Creative (Facebook, TikTok, Instagram Feed/Story), thời gian bàn giao thông thường từ <strong>24h - 48h</strong>. Đối với thiết kế trọn gói Website WordPress, Web3 hoặc Hồ sơ năng lực B2B, thời gian hoàn thiện từ <strong>2 - 3 ngày làm việc</strong>.',
      faq2Q: '<i class="fa-solid fa-pen-nib" style="color: #8b5cf6; margin-right: 0.5rem;"></i> Quy trình chỉnh sửa sau khi nhận bản thiết kế đầu tiên như thế nào?',
      faq2A: 'Tôi tiếp nhận góp ý chi tiết từ phía bạn hoặc đội ngũ Marketing và phản hồi xử lý tinh chỉnh nhanh chóng <strong>trong vòng 24 giờ</strong>, đảm bảo ấn phẩm cuối cùng đạt sự hài lòng cao nhất và sẵn sàng chạy chiến dịch.',
      faq3Q: '<i class="fa-solid fa-file-zipper" style="color: #10b981; margin-right: 0.5rem;"></i> Tôi sẽ nhận được những định dạng file nào khi bàn giao?',
      faq3A: 'Bạn sẽ nhận được trọn gói: <strong>File gốc thiết kế (PSD có phân layer rõ ràng / Canva Pro link)</strong>, mã nguồn Web / Vite code / WordPress backup, file ảnh WebP/PNG chuẩn RGB và file in ấn PDF Print CMYK 300DPI.',
      faq4Q: '<i class="fa-solid fa-globe" style="color: #f59e0b; margin-right: 0.5rem;"></i> Bạn có thể làm việc Remote toàn thời gian cho thị trường Global (US/UK/AU) không?',
      faq4A: 'Hoàn toàn có. Tôi có kinh nghiệm làm việc độc lập và tự chủ cao, sẵn sàng phối hợp làm việc Remote 100% trong khung giờ hành chính <strong>08:00 - 17:00 (Thứ 2 - Thứ 6)</strong>, giao tiếp tiếng Anh tốt và am hiểu tâm lý thị trường phương Tây.',
      faq5Q: '<i class="fa-solid fa-handshake" style="color: #06b6d4; margin-right: 0.5rem;"></i> Hình thức hợp tác và thanh toán như thế nào?',
      faq5A: 'Đối với dự án theo gói: Tạm ứng 50% khi thống nhất Brief/Concept và thanh toán 50% còn lại khi bàn giao trọn gói file gốc. Đối với vị trí Full-time hoặc Retainer theo tháng: Ký hợp đồng dịch vụ / thử việc và nhận thanh toán định kỳ hàng tháng.',
      
      contactTag: 'Kết Nối Ngay',
      contactTitle: 'Bạn Đang Tìm Kiếm Senior Graphic Designer Hay Creative Lead?',
      contactSubtitle: 'Hãy cùng trao đổi để xem cách tôi có thể tạo ra đột phá tăng trưởng cho doanh nghiệp của bạn!',
      
      eduCertTitle: 'Bằng Cấp, Chứng Nhận Chuyên Ngành & Trình Độ Ngoại Ngữ',
      eduCertSubtitle: 'Hồ sơ năng lực được bảo chứng qua đào tạo bài bản, chứng chỉ chuyên môn và kinh nghiệm thực chiến đa ngành',
      ecc1Title: 'Cử Nhân & Đào Tạo Đồ Họa Chuyên Sâu',
      ecc1Desc: 'Nền tảng kiến thức bài bản về Nguyên lý thị giác, Màu sắc thương hiệu, Bố cục Typography & Kỹ thuật chế bản in ấn công nghiệp (CMYK 300DPI Print-Ready).',
      ecc2Title: 'Digital Marketing & Tối Ưu Chuyển Đổi (CRO)',
      ecc2Desc: 'Chứng nhận chuyên sâu về Quản trị chiến dịch Performance, Facebook Ads, Google Search & Display, Tối ưu phễu chuyển đổi Landing Page & UI/UX.',
      ecc3Title: 'Prompt Engineering & AI Automation Specialist',
      ecc3Desc: 'Tác giả 3 Ebook ứng dụng AI (ChatGPT, Gemini, Midjourney) trong sáng tạo nội dung & tự động hóa quy trình sản xuất ấn phẩm tốc độ cao x5 lần.',
      ecc4Title: 'Professional Working English (Thị Trường Global)',
      ecc4Desc: 'Khả năng đọc hiểu tài liệu chuyên môn, nghiên cứu insight khách hàng phương Tây (US, UK, AU) và làm việc trực tiếp với Marketer, Product Owner quốc tế.',
      quickChipsLabel: 'Chọn nhanh nhu cầu hợp tác:',
      rcModalStatus: 'SẴN SÀNG NHẬN CƠ HỘI MỚI • AVAILABLE FOR HIRE',
      rcModalTitle: 'Bản Tóm Tắt Nhanh Cho Nhà Tuyển Dụng & Headhunter',
      rcModalSubtitle: 'Dành riêng cho Quý Doanh nghiệp & Hiring Manager cần đánh giá nhanh hồ sơ trong 30 giây',
      rcCard1Title: 'Vị Trí Mục Tiêu & Mô Hình Làm Việc',
      rcCard1Modality: '<strong>Hình thức:</strong> Full-time (TP.HCM hoặc Hybrid) | Remote 100% (Toàn quốc & Global: US, UK, AU)',
      rcCard1Avail: '<strong>Thời gian nhận việc:</strong> <span class="text-highlight">Sẵn sàng nhận việc ngay (Immediate Available)</span>',
      rcCard2Title: '5 Lợi Thế Cạnh Tranh Vượt Trội (Value Propositions)',
      rcCard3Title: 'Bằng Cấp, Chứng Chỉ & Trình Độ Ngoại Ngữ',
      rcCert1Title: 'Cử Nhân & Đào Tạo Đồ Họa Chuyên Sâu',
      rcCert1Sub: 'Thiết kế nhận diện, Bố cục Typography & In ấn kỹ thuật cao CMYK',
      rcCert2Title: 'Chứng Chỉ Digital Marketing & Tối Ưu CRO',
      rcCert2Sub: 'Quản trị chiến dịch Performance, Facebook Ads, Google Ads & SEO',
      rcCert3Title: 'Chứng Nhận Tự Động Hóa AI & Prompting',
      rcCert3Sub: 'Tác giả 3 Ebook AI & Hệ thống Agent tự động hóa sáng tạo nội dung',
      rcCert4Title: 'Professional Working English',
      rcCert4Sub: 'Tự tin làm việc & giao tiếp trực tiếp với khách hàng quốc tế',

      toastLangSwitched: 'Đã chuyển sang Tiếng Việt 🇻🇳'
    },
    en: {
      navAbout: 'About',
      navSkills: 'Skills',
      navWebApps: '28 Web Apps',
      navPortfolio: 'Media Projects',
      navServices: 'Services',
      navWorkflow: 'Workflow',
      navTestimonials: 'Reviews',
      navAi: 'AI & Ebooks',
      navExp: 'Experience',
      navWhyMe: 'Strengths',
      navFaq: 'FAQ',
      navContact: 'Contact',
      navCvText: 'Download 1-Page CV',
      navRecruiterText: 'For Recruiters (30s Brief)',
      heroRecruiterText: 'Recruiter 30s Executive Brief',
      navStatusText: 'Open to Work',
      
      heroBadge: 'Senior Creative Designer & Visual Marketing Lead • Global & Remote Ready',
      heroGreeting: 'Hello, I am',
      roleLabel: 'Expertise: ',
      heroDesc: 'Senior <strong>Visual Designer, Ad Creative & Product Landing Page Specialist</strong> with 10+ years of expertise in CRO, <strong>specialized in WordPress Website Design & Web3 Vite Code Development</strong> for Global Markets (US, UK, AU...) and <strong>eCommerce, B2B & SaaS/AI Brands</strong>. Proven capacity to autonomously produce <strong>30 - 40 High-Impact Ads/month (depending on product complexity)</strong> and deliver complete <strong>Websites & Landing Pages in 2 - 3 days</strong> using <strong>Photoshop, Canva, CapCut, WordPress, Vite Code & Generative AI (ChatGPT, Gemini, Flow)</strong>, while continuously expanding skills in <strong>Premiere Pro, Illustrator, Figma</strong>.',
      heroBtn1: 'Explore Design Portfolio',
      heroBtn2: 'View 28 Live Web & Web3 Apps',
      heroBtn3: 'Download 1-Page CV (PDF)',
      
      stat1Label: 'Ad Creatives / Month (By complexity)',
      stat2Label: 'Days / Landing Page CRO',
      stat3Label: 'Live Web Platforms',
      stat4Label: 'Years of Experience',
      
      avatarSub: '<i class="fa-solid fa-globe"></i> Senior Creative Designer & Visual Lead',
      cardFeatTitle1: 'Performance Ad Creatives',
      cardFeatDesc1: 'CTR-optimized visuals for Meta, TikTok & IG (US, UK, AU, Global)',
      cardFeatTitle2: 'WordPress & Web3 Vite Code Web Design',
      cardFeatDesc2: 'SEO-ready, WooCommerce, DApp Web3 & CRO Optimization',
      cardFeatTitle3: 'Visual Storytelling & AI Superpower',
      cardFeatDesc3: 'Transforming complex specs into compelling visual narratives',
      cardStatusBadge: '<i class="fa-solid fa-circle-check"></i> 100% Remote Ready | Mon - Fri (8:00 - 17:00)',
      
      clientsLabel: '<i class="fa-solid fa-certificate"></i> <span>Trusted Brands & Enterprise Partners</span>',
      aboutTag: '<i class="fa-solid fa-crosshairs"></i> Core Competency',
      aboutTitle: 'International Visual Aesthetics & CRO Performance',
      aboutSubtitle: 'Tailor-made for Senior Creative Designer, WordPress Web Specialist & Web3 Vite Code Developer',
      aboutCardTitle1: 'Producing 30 - 40 Ad Creatives / Month',
      aboutCardDesc1: 'Deep understanding of Western consumer psychology & visual dynamics (US, UK, AU...). Autonomously build Moodboards, craft 3-second Visual Hooks, and deliver <strong>30 - 40 high-impact ad creatives / month (by complexity)</strong> for Feeds, Stories, Reels, and E-commerce.',
      aboutCardTitle2: 'Specialized WordPress & Web3 (Vite Code)',
      aboutCardDesc2: 'Hands-on track record designing and launching <strong>SEO-optimized WordPress websites, high-speed WooCommerce stores</strong>, and cutting-edge <strong>Web3 / DApp interfaces using Vite code</strong> with glassmorphic visuals and 100% responsive layouts.',
      aboutCardTitle3: 'Visual Storytelling for B2B, eCommerce & AI Tech',
      aboutCardDesc3: 'Unique ability to digest complex technical features into <strong>clear, emotionally resonant visual stories that accelerate user adoption and revenue</strong>.',
      
      skillsTag: 'Creative Tech Stack & Tools',
      skillsTitle: 'Design Ecosystem & Capabilities',
      skillsSubtitle: 'Synergy of Photoshop, Canva, CapCut, WordPress, Web3 (Vite Code), and Generative AI (ChatGPT, Gemini, Flow)',
      skillCat1Title: 'Ad Creative & Performance (CRO)',
      skillCat2Title: 'WordPress & Web3 (Vite Code)',
      skillCat3Title: 'Photoshop, Canva, CapCut & AI Superpower',
      
      webAppsTag: '<i class="fa-solid fa-rocket"></i> Live Web Showcase',
      webAppsTitle: '28 Deployed Web Applications & Portals',
      webAppsSubtitle: 'All 28 live web applications, AI landing pages, courses, and enterprise platforms in operational status',
      
      portfolioTag: 'Real-World Showcase',
      portfolioTitle: 'Featured Design Portfolio & Case Studies',
      portfolioSubtitle: 'Click any case study to explore background, creative solutions, and high-resolution visuals',
      
      servicesTag: '<i class="fa-solid fa-gem"></i> Service Packages & Pricing',
      servicesTitle: 'Professional On-Demand Design Solutions',
      servicesSubtitle: 'Tailored for Businesses, eCommerce Brands, and Growth Agencies requiring high-conversion visual assets',
      pkg1Title: 'Performance Ads & Social Media',
      pkg1Desc: 'Multi-ratio ad production (1:1, 4:5, 9:16) optimized for high CTR and maximum ROAS on Meta, TikTok & eCommerce marketplaces.',
      pkg2Title: 'Web WordPress, Web3 & Landing Page',
      pkg2Desc: 'Turnkey SEO-optimized WordPress websites, modern Web3/DApp interfaces built with Vite code, and CRO-driven product landing pages.',
      pkg3Title: 'Brand Identity & B2B Profile',
      pkg3Desc: 'Corporate profiles, engineering/product catalogues, and high-stakes bidding presentation materials prepared in 300DPI CMYK print standard.',
      pkg4Title: 'Creative Lead & AI Retainer',
      pkg4Desc: 'Long-term dedicated visual leadership, AI content automation pipeline setup, and continuous brand identity elevation.',
      
      guar1Title: '100% On-Time Delivery',
      guar1Desc: 'Strict deadline adherence to keep your marketing launches and ad campaigns running seamlessly.',
      guar2Title: 'Conversion-First Design',
      guar2Desc: 'Every creative decision is backed by user psychology and commercial conversion data.',
      guar3Title: 'Strict Confidentiality',
      guar3Desc: 'NDA-ready to protect all proprietary project assets, product blueprints, and business plans.',
      guar4Title: 'Fast 24-Hour Revisions',
      guar4Desc: 'Rapid feedback turnaround within 24 hours to ensure effortless, agile collaboration.',
      
      workflowTag: '<i class="fa-solid fa-diagram-project"></i> Work Process',
      workflowTitle: 'Standardized 5-Step Design & Turnaround Workflow',
      workflowSubtitle: 'Transparent, streamlined process delivering peak quality and dependable milestone turnarounds',
      step1Title: 'Brief Reception & Analysis',
      step1Desc: 'Thoroughly understand product USPs, target customer personas, competitive landscape, and campaign goals.',
      step2Title: 'Concept & Visual Hooks',
      step2Desc: 'Define visual style, color harmony, and curiosity-driven hooks that stop user scrolling instantly.',
      step3Title: 'Photoshop, Canva & AI Speed',
      step3Desc: 'Execute polished deliverables combining Photoshop, Canva, and Generative AI (ChatGPT, Gemini, Flow) for 3x speed.',
      step4Title: 'Feedback & Rapid Iteration',
      step4Desc: 'Incorporate actionable marketer/stakeholder feedback with guaranteed 24-hour turnaround cycles.',
      step5Title: 'Final Full Package Delivery',
      step5Desc: 'Deliver layered master files (PSD/Canva Link), compressed web assets (WebP/PNG), and press-ready CMYK PDFs.',
      
      testimonialsTag: '<i class="fa-solid fa-comments"></i> Social Proof',
      testimonialsTitle: 'Client Testimonials & Executive Feedback',
      testimonialsSubtitle: 'Authentic feedback on turnaround speed, creative execution, and bottom-line commercial impact',
      testi1Quote: '"Dat possesses tremendous autonomy. He directly visited our shipyard to capture authentic footage, built all technical catalogues, banners, and managed 4 websites. As a result, our sales division consistently received 30 - 50 high-quality B2B inquiries monthly."',
      testi2Quote: '"Reproductive healthcare topics are inherently dry and sensitive, but Dat\'s intuitive infographics made clinical information accessible and warm. Our organic engagement surged by 140%, attracting hundreds of monthly testing consultations."',
      testi3Quote: '"Working with Dat gives total peace of mind on deadlines. His beauty and FMCG ad creatives look stunning, highlighting cream textures and product benefits. Our CTR on TikTok and Meta Ads jumped noticeably with his new visual sets."',
      
      aiTag: 'AI Superpower & Products',
      aiTitle: 'Digital Products & AI Automation Systems',
      aiSubtitle: 'Packaging practical domain knowledge into scalable digital assets and automated workflows',
      
      expTag: '<i class="fa-solid fa-timeline"></i> Career Journey',
      expTitle: '10+ Years of Multi-Disciplinary Experience',
      expSubtitle: 'From Marketing Leadership, Graphic Design, Advanced SEO to AI Ecosystem Development',
      
      whyMeTag: '<i class="fa-solid fa-circle-check"></i> Direct Alignment',
      whyMeTitle: 'Why I Am the Ideal Fit for Your Team',
      whyMeSubtitle: 'Direct commitment on High Volume Output, Rapid Turnaround, and Conversion Performance',
      whyMeCardTitle1: '30 - 40 Ad Creatives / Month & 2-3 Days / Landing Page',
      whyMeCardDesc1: 'Mastering <strong>Photoshop, Canva, CapCut, and Next-Gen AI tools (ChatGPT, Gemini, Flow)</strong> enables me to consistently produce <strong>30 - 40 high-impact ad creatives/month (by complexity)</strong> and deliver complete Product Landing Pages in 2 - 3 days.',
      
      faqTag: '<i class="fa-solid fa-circle-question"></i> Frequently Asked Questions',
      faqTitle: 'Frequently Asked Questions (FAQ)',
      faqSubtitle: 'Quick answers regarding deliverable turnaround times, file specs, and collaboration terms',
      faq1Q: '<i class="fa-solid fa-clock" style="color: var(--primary); margin-right: 0.5rem;"></i> What is the standard turnaround time for deliverables?',
      faq1A: 'For Social Media & Ad Creatives (Feed/Stories), turnaround is typically <strong>24h - 48h</strong>. For full-scale WordPress sites, Web3 apps or B2B Profiles, delivery takes <strong>2 - 3 business days</strong>.',
      faq2Q: '<i class="fa-solid fa-pen-nib" style="color: #8b5cf6; margin-right: 0.5rem;"></i> How does the revision process work after the initial draft?',
      faq2A: 'I review all feedback from your marketing team and execute precision iterations <strong>within 24 hours</strong>, ensuring the final assets exceed expectations before campaign launch.',
      faq3Q: '<i class="fa-solid fa-file-zipper" style="color: #10b981; margin-right: 0.5rem;"></i> What file formats will I receive upon delivery?',
      faq3A: 'You will receive full source master files (<strong>cleanly organized layered PSDs / Canva Pro links</strong>), codebases (Vite/WordPress), ultra-light compressed web assets (WebP, PNG, JPG in RGB), and 300DPI CMYK press-ready PDFs.',
      faq4Q: '<i class="fa-solid fa-globe" style="color: #f59e0b; margin-right: 0.5rem;"></i> Are you available for 100% Full-Time Remote positions for global teams (US/UK/AU)?',
      faq4A: 'Absolutely. I possess strong self-management, maintain real-time sync during business hours <strong>08:00 - 17:00 (Mon - Fri)</strong>, communicate clearly in English, and understand Western consumer aesthetics.',
      faq5Q: '<i class="fa-solid fa-handshake" style="color: #06b6d4; margin-right: 0.5rem;"></i> What are the payment and contract terms?',
      faq5A: 'For project-based packages: 50% deposit upon brief approval and 50% upon final master delivery. For Full-time / Retainer engagements: Monthly service agreement with regular invoice milestones.',
      
      contactTag: 'Connect With Me',
      contactTitle: 'Looking for a Senior Graphic Designer or Creative Lead?',
      contactSubtitle: 'Let\'s connect to discuss how I can drive exponential visual growth for your business!',
      
      eduCertTitle: 'Degrees, Professional Certifications & Working Languages',
      eduCertSubtitle: 'Competencies verified through formal education, industry certifications, and proven cross-industry leadership',
      ecc1Title: 'Bachelor Degree & Specialized Graphic Design Training',
      ecc1Desc: 'Solid foundation in visual principles, brand color harmony, typography composition, and industrial prepress print techniques (CMYK 300DPI Print-Ready).',
      ecc2Title: 'Digital Marketing & Conversion Rate Optimization (CRO)',
      ecc2Desc: 'Specialized credentials in Performance Campaign Management, Meta & Google Ads, and Landing Page CRO funnel optimization.',
      ecc3Title: 'Prompt Engineering & AI Automation Specialist',
      ecc3Desc: 'Author of 3 applied AI Ebooks (ChatGPT, Gemini, Midjourney) in content generation and 5x automated creative production pipelines.',
      ecc4Title: 'Professional Working English (Global Markets)',
      ecc4Desc: 'Full professional proficiency in researching Western consumer insights (US, UK, AU) and collaborating directly with international Product Owners.',
      quickChipsLabel: 'Quick-select inquiry type:',
      rcModalStatus: 'OPEN TO WORK • AVAILABLE FOR HIRE',
      rcModalTitle: 'Executive 30-Second Summary for Recruiters & Headhunters',
      rcModalSubtitle: 'Designed for Hiring Managers and Talent Acquisition Executives reviewing candidates in 30 seconds',
      rcCard1Title: 'Target Roles & Work Modalities',
      rcCard1Modality: '<strong>Modality:</strong> Full-time (HCMC or Hybrid) | 100% Remote (Nationwide & Global: US, UK, AU)',
      rcCard1Avail: '<strong>Availability:</strong> <span class="text-highlight">Immediately Available</span>',
      rcCard2Title: '5 Core Competitive Advantages (Value Propositions)',
      rcCard3Title: 'Degrees, Certifications & Working Languages',
      rcCert1Title: 'Bachelor Degree & Specialized Graphic Design',
      rcCert1Sub: 'Brand identity, typography layout, and high-precision CMYK prepress',
      rcCert2Title: 'Digital Marketing & CRO Certifications',
      rcCert2Sub: 'Performance campaigns, Meta Ads, Google Ads & Advanced SEO',
      rcCert3Title: 'AI Automation & Prompt Engineering Credentials',
      rcCert3Sub: 'Author of 3 AI Ebooks & Automated creative agent workflows',
      rcCert4Title: 'Professional Working English',
      rcCert4Sub: 'Confident communication and direct collaboration with global teams',

      toastLangSwitched: 'Switched to English 🇺🇸'
    }
  };

  const typingRolesDict = {
    vi: [
      'Senior Creative Designer & Visual Marketing Lead',
      'Chuyên Gia Thiết Kế Web WordPress & Web3 (Vite Code)',
      'Chuyên Gia Ad Creative Tối Ưu CTR (eCommerce & SaaS)',
      'Thiết Kế Landing Page Tối Ưu CRO (2 - 3 Ngày)',
      'Làm Chủ Photoshop, Canva, CapCut & AI (30 - 40 Ads/Tháng)'
    ],
    en: [
      'Senior Creative Designer & Visual Marketing Lead',
      'WordPress & Web3 (Vite Code) Web Designer',
      'High-CTR Ad Creative Specialist (eCommerce & SaaS)',
      'High-Converting Landing Page Designer (2-3 Days CRO)',
      'Photoshop, Canva, CapCut & AI Expert (30 - 40 Ads/Mo)'
    ]
  };

  function applyLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('dat_portfolio_lang', lang);

    // Update Toggle Button UI
    if (lang === 'vi') {
      langFlag.textContent = '🇻🇳';
      langText.textContent = 'VI';
      langToggle.title = 'Bấm để chuyển sang English';
    } else {
      langFlag.textContent = '🇺🇸';
      langText.textContent = 'EN';
      langToggle.title = 'Click to switch to Vietnamese';
    }

    const t = translations[lang];
    if (!t) return;

    // Apply translations by ID
    for (const [id, value] of Object.entries(t)) {
      const el = document.getElementById(id);
      if (el) {
        if (value.includes('<') && value.includes('>')) {
          el.innerHTML = value;
        } else {
          el.textContent = value;
        }
      }
    }

    // Update dynamic typing roles
    roles = typingRolesDict[lang] || typingRolesDict.vi;
    roleIdx = 0;
    charIdx = 0;
    isDeleting = false;

    // Update Filter Buttons Text
    const isVi = lang === 'vi';
    
    // Update CV download links to corresponding PDF
    const navCvBtn = document.getElementById('navCvBtn');
    const heroBtn3 = document.getElementById('heroBtn3');
    const cvHref = isVi ? 'CV_NguyenTuanDat_SeniorCreativeDesigner_1Page_VI.pdf' : 'CV_NguyenTuanDat_SeniorCreativeDesigner_1Page_EN.pdf';
    if (navCvBtn) navCvBtn.href = cvHref;
    if (heroBtn3) heroBtn3.href = cvHref;
    
    // Portfolio Filters
    const pFilters = document.querySelectorAll('.portfolio-filter-wrapper .filter-btn');
    pFilters.forEach(btn => {
      const f = btn.getAttribute('data-filter');
      if (f === 'all') btn.innerHTML = isVi ? 'Tất cả dự án' : 'All Projects';
      else if (f === 'yacht') btn.innerHTML = isVi ? '🛥️ Du Thuyền & Hàng Hải (TVD)' : '🛥️ Yachts & Marine (TVD)';
      else if (f === 'profile') btn.innerHTML = isVi ? '📑 Profile & Brochure B2B' : '📑 B2B Profiles & Brochures';
      else if (f === 'ecommerce') btn.innerHTML = isVi ? '💄 Mỹ Phẩm & FMCG Ads' : '💄 Beauty & FMCG Ads';
      else if (f === 'health') btn.innerHTML = isVi ? '🏥 Truyền thông Y Tế (Galant)' : '🏥 Healthcare Media (Galant)';
      else if (f === 'b2b') btn.innerHTML = isVi ? '🏭 Thương hiệu & B2B Industry' : '🏭 B2B & Industrial Branding';
      else if (f === 'ai-art') btn.innerHTML = isVi ? '🤖 AI Art & Digital Products' : '🤖 AI Art & Digital Products';
      else if (f === 'events') btn.innerHTML = isVi ? '🎪 Banner & Sự Kiện' : '🎪 Banners & Events';
    });

    // Web Search Placeholder
    const searchInput = document.getElementById('webSearchInput');
    if (searchInput) {
      searchInput.placeholder = isVi 
        ? 'Tìm kiếm nhanh website (VD: Claude, KOL, Khóa học, B2B, Affiliate...)' 
        : 'Quick search live websites (e.g. Claude, SaaS, Course, B2B, Affiliate...)';
    }

    // Form inputs & button
    const senderName = document.getElementById('senderName');
    const senderContact = document.getElementById('senderContact');
    const senderMessage = document.getElementById('senderMessage');
    const formSubmitBtn = document.querySelector('#interviewForm button[type="submit"]');
    
    if (senderName) senderName.placeholder = isVi ? 'VD: Anh Minh - Giám đốc Công ty ABC' : 'e.g. John Doe - Hiring Manager at TechCorp';
    if (senderContact) senderContact.placeholder = isVi ? 'VD: 0912 xxx xxx hoặc email@company.com' : 'e.g. +1 (555) 019-2834 or name@company.com';
    if (senderMessage) senderMessage.placeholder = isVi ? 'Mời bạn tham gia phỏng vấn vị trí... hoặc cần trao đổi dự án...' : 'Invitation for Senior Graphic Designer interview or project collaboration...';
    if (formSubmitBtn) formSubmitBtn.innerHTML = isVi ? '<i class="fa-solid fa-paper-plane"></i> Gửi Tin Nhắn Nhanh' : '<i class="fa-solid fa-paper-plane"></i> Send Direct Inquiry';
    // Update Portfolio Card buttons and zoom badges
    document.querySelectorAll('.card-action-btn.btn-view-full span').forEach(sp => {
      sp.textContent = isVi ? 'Xem Ảnh Đầy Đủ' : 'View Full Size';
    });
    document.querySelectorAll('.card-action-btn.btn-view-case span').forEach(sp => {
      sp.textContent = isVi ? 'Xem Case Study' : 'View Case Study';
    });
    document.querySelectorAll('.card-quick-zoom-badge').forEach(bd => {
      bd.innerHTML = isVi ? '<i class="fa-solid fa-magnifying-glass"></i> Phóng to HD' : '<i class="fa-solid fa-magnifying-glass"></i> Zoom HD';
    });
    const zoomText = document.getElementById('lightboxZoomText');
    if (zoomText) zoomText.textContent = isVi ? (isLightboxZoomed ? 'Thu nhỏ' : 'Thu phóng') : (isLightboxZoomed ? 'Zoom Out' : 'Zoom In');
  }

  langToggle.addEventListener('click', () => {
    const nextLang = currentLang === 'vi' ? 'en' : 'vi';
    applyLanguage(nextLang);
    showToast(translations[nextLang].toastLangSwitched);
  });

  // --- 2. THEME TOGGLE (DARK / LIGHT) ---
  const themeToggle = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;
  const themeIcon = themeToggle.querySelector('i');

  const savedTheme = localStorage.getItem('dat_portfolio_theme') || 'light';
  htmlRoot.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle.addEventListener('click', () => {
    const currentTheme = htmlRoot.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    htmlRoot.setAttribute('data-theme', newTheme);
    localStorage.setItem('dat_portfolio_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(currentLang === 'vi' ? `Đã chuyển sang giao diện ${newTheme === 'dark' ? 'Tối' : 'Sáng'}` : `Switched to ${newTheme === 'dark' ? 'Dark' : 'Light'} Mode`);
  });

  function updateThemeIcon(theme) {
    if (theme === 'dark') {
      themeIcon.className = 'fa-solid fa-sun';
      themeToggle.title = 'Chuyển sang giao diện Sáng';
    } else {
      themeIcon.className = 'fa-solid fa-moon';
      themeToggle.title = 'Chuyển sang giao diện Tối';
    }
  }

  // --- 3. MOBILE MENU DRAWER & BACKDROP ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navBackdrop = document.getElementById('navBackdrop');

  function closeMobileMenu() {
    if (navMenu) navMenu.classList.remove('open');
    if (navBackdrop) navBackdrop.classList.remove('active');
    if (mobileToggle) mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    document.body.style.overflow = 'auto';
  }

  function openMobileMenu() {
    if (navMenu) navMenu.classList.add('open');
    if (navBackdrop) navBackdrop.classList.add('active');
    if (mobileToggle) mobileToggle.innerHTML = '<i class="fa-solid fa-xmark"></i>';
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = navMenu && navMenu.classList.contains('open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (navBackdrop) {
    navBackdrop.addEventListener('click', closeMobileMenu);
  }

  navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // --- 4. DYNAMIC TYPING ROLE ---
  const typingRoleEl = document.getElementById('typingRole');
  let roles = typingRolesDict[currentLang] || typingRolesDict.vi;
  let roleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  let typeSpeed = 80;

  function typeEffect() {
    if (!roles || roles.length === 0) return;
    const currentText = roles[roleIdx % roles.length];
    if (isDeleting) {
      typingRoleEl.textContent = currentText.substring(0, charIdx - 1);
      charIdx--;
      typeSpeed = 40;
    } else {
      typingRoleEl.textContent = currentText.substring(0, charIdx + 1);
      charIdx++;
      typeSpeed = 90;
    }

    if (!isDeleting && charIdx === currentText.length) {
      typeSpeed = 2200;
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      roleIdx = (roleIdx + 1) % roles.length;
      typeSpeed = 500;
    }

    setTimeout(typeEffect, typeSpeed);
  }
  typeEffect();

  // Apply saved language on load
  applyLanguage(currentLang);

  // --- 5. SCROLL PROGRESS, SCROLL-TO-TOP & NAVBAR SCROLLSPY ---
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const scrollTopBtn = document.getElementById('scrollTopBtn');

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // A. Reading progress bar
    if (scrollProgressBar && docHeight > 0) {
      const scrolled = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
      scrollProgressBar.style.width = scrolled + '%';
    }

    // B. Scroll-to-top button visibility
    if (scrollTopBtn) {
      if (scrollY > 380) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }

    // C. Navbar background enhancement
    if (navbar) {
      if (scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
      } else {
        navbar.style.boxShadow = 'none';
      }
    }

    // D. Active link highlighting (ScrollSpy)
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 140;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  }, { passive: true });

  // --- 5. PORTFOLIO FILTERING (MEDIA & DESIGN) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category') || '';
        const catList = category.split(' ');
        if (filterValue === 'all' || category === filterValue || catList.includes(filterValue)) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 200);
        }
      });
    });
  });

  // --- 5B. LIVE WEB APPS FILTERING & REAL-TIME SEARCH ---
  const webFilterBtns = document.querySelectorAll('.web-filter-btn');
  const webCards = document.querySelectorAll('.web-card');
  const webSearchInput = document.getElementById('webSearchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const visibleWebCount = document.getElementById('visibleWebCount');

  let currentWebFilter = 'all';
  let currentSearchQuery = '';

  function updateWebAppsVisibility() {
    let visibleCount = 0;

    webCards.forEach(card => {
      const cat = card.getAttribute('data-web-cat');
      const cardText = card.textContent.toLowerCase();
      const matchesFilter = (currentWebFilter === 'all' || cat === currentWebFilter);
      const matchesSearch = (!currentSearchQuery || cardText.includes(currentSearchQuery));

      if (matchesFilter && matchesSearch) {
        card.style.display = 'flex';
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 30);
        visibleCount++;
      } else {
        card.style.opacity = '0';
        card.style.transform = 'translateY(15px)';
        setTimeout(() => {
          card.style.display = 'none';
        }, 180);
      }
    });

    if (visibleWebCount) {
      visibleWebCount.textContent = visibleCount;
    }
  }

  webFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      webFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentWebFilter = btn.getAttribute('data-web-filter');
      updateWebAppsVisibility();
    });
  });

  if (webSearchInput) {
    webSearchInput.addEventListener('input', (e) => {
      currentSearchQuery = e.target.value.trim().toLowerCase();
      if (clearSearchBtn) {
        clearSearchBtn.style.display = currentSearchQuery ? 'block' : 'none';
      }
      updateWebAppsVisibility();
    });
  }

  if (clearSearchBtn) {
    clearSearchBtn.addEventListener('click', () => {
      webSearchInput.value = '';
      currentSearchQuery = '';
      clearSearchBtn.style.display = 'none';
      webSearchInput.focus();
      updateWebAppsVisibility();
    });
  }

  // Make entire web-card clickable (opens the link in new tab)
  webCards.forEach(card => {
    card.style.cursor = 'pointer';
    card.addEventListener('click', (e) => {
      // If the user directly clicked an internal link, let it handle naturally
      if (e.target.closest('a')) return;
      const mainLink = card.querySelector('.web-card-link');
      if (mainLink && mainLink.href) {
        window.open(mainLink.href, '_blank', 'noopener,noreferrer');
      }
    });
  });

  // --- 6. CASE STUDY DATA & POPUP MODAL ---
  const caseStudiesData = {
    'galant-series': {
      title: 'Chiến Dịch Truyền Thông Sức Khỏe & Giáo Dục Cộng Đồng',
      badge: 'Y Tế & Cộng Đồng • Phòng Khám Galant',
      images: [
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-01.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-02.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-03.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-04.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-05.webp'
      ],
      problem: 'Chủ đề sức khỏe sinh sản & bệnh truyền nhiễm (HIV, PrEP, STIs) là chủ đề nhạy cảm, nhiều thuật ngữ y khoa khô khan, khiến người đọc có tâm lý e ngại tiếp cận.',
      solution: 'Dùng thiết kế infographic trực quan hóa dữ liệu, màu sắc hiện đại, thông điệp tích cực, văn phong đồng cảm xóa bỏ định kiến xã hội.',
      tools: 'Adobe Photoshop, Canva, Kỹ thuật Typography Y tế, Chuẩn hóa màu sắc y khoa, Content Strategy.',
      impact: 'Tăng 140% tương tác tự nhiên trên các kênh Fanpage & Website, hỗ trợ thu hút hàng trăm bệnh nhân đăng ký tư vấn xét nghiệm mỗi tháng.'
    },
    'tan-vien-dong': {
      title: 'Hệ Thống Nhận Diện & Tư Liệu Tiếp Thị Nguyên Liệu Composite',
      badge: 'B2B Manufacturing • Tân Viễn Đông | Kiên Trung Long | Kiên Phi',
      images: [
        'AK HÀN QUỐC.webp',
        'Nhựa AK Hàn Quốc.webp',
        'Nhựa AK Hàn Quốc (2).webp',
        'SHCP.webp'
      ],
      problem: 'Doanh nghiệp đóng tàu cao cấp và phân phối vật liệu Composite có 2 tệp khách hàng hoàn toàn khác nhau (đơn vị đặt tàu giá trị lớn vs chủ xưởng cơ khí mua sỉ lẻ vật tư).',
      solution: 'Trực tiếp vào xưởng sản xuất chụp ảnh tư liệu thật, phân nhóm danh mục vật liệu (Nhựa AK, Gelcoat, Sợi thủy tinh SHCP, Vinyl Ester) và thiết kế hệ thống nhãn mác, catalogue, bảng báo giá kỹ thuật chuẩn xác.',
      tools: 'Photoshop, Quản trị 4 Website (tanviendong.vn, kienphi.com.vn...), Tối ưu SEO cụm chủ đề Composite, Chụp ảnh thực tế.',
      impact: 'Duy trì đều đặn 30-50 cuộc gọi B2B chất lượng mỗi tháng đổ về phòng kinh doanh từ kênh Online.'
    },
    'thien-dat-elevator': {
      title: 'Biên Soạn & Thiết Kế Profile Doanh Nghiệp Thang Máy Thiên Đạt',
      badge: 'Hồ Sơ Năng Lực B2B • Thang Máy Thiên Đạt',
      images: [
        'profile/previews/thien_dat_p1.webp'
      ],
      pdfUrl: 'hồ sơ năng lực công ty thang máy thiên đạt (Autosaved).pdf',
      pdfTitle: 'Tải PDF Hồ Sơ Năng Lực Thang Máy (19 Trang)',
      problem: 'Cần một bộ hồ sơ năng lực 19 trang hoàn chỉnh, chuẩn mực kỹ thuật để tham gia đấu thầu các dự án tòa nhà, khách sạn và khu dân cư cao cấp.',
      solution: 'Thiết kế bố cục chuyên nghiệp từ Thư ngỏ, Sơ đồ tổ chức, Năng lực sản xuất máy móc CNC, Quy trình lắp đặt 16 bước, Chính sách bảo trì 24/7 đến các dự án công trình tiêu biểu (Bà Nà Hills, Dambri, Khách sạn Corvin).',
      tools: 'Biên soạn nội dung kỹ thuật, Thiết kế đồ họa In ấn (Print Ready CMYK), Bố cục Grid chuyên nghiệp.',
      impact: 'Bộ tài liệu chính thức giúp ban giám đốc nâng cao tỷ lệ trúng thầu và khẳng định vị thế thương hiệu với các chủ đầu tư xây dựng.'
    },
    'nla-profile': {
      title: 'Hồ Sơ Năng Lực Doanh Nghiệp 11 Trang — Công Ty TNHH MTV Ngô Long Ân',
      badge: 'Hồ Sơ Năng Lực B2B • Ngô Long Ân & CHINT Global',
      images: [
        'profile/previews/nla_profile_p1.webp',
        'profile/previews/nla_profile_p2.webp',
        'profile/previews/nla_profile_p3.webp',
        'profile/previews/nla_profile_p4.webp',
        'profile/previews/nla_profile_p5.webp',
        'profile/previews/nla_profile_p6.webp',
        'profile/previews/nla_profile_p7.webp',
        'profile/previews/nla_profile_p8.webp',
        'profile/previews/nla_profile_p9.webp',
        'profile/previews/nla_profile_p10.webp',
        'profile/previews/nla_profile_p11.webp'
      ],
      pdfUrl: 'profile/NLA Profile.pdf',
      pdfTitle: 'Tải Full PDF Hồ Sơ Năng Lực NLA (11 Trang)',
      problem: 'Ngô Long Ân là đơn vị phân phối thiết bị điện công nghiệp, điện cơ và điện mặt trời CHINT tại Việt Nam. Doanh nghiệp cần một bộ hồ sơ năng lực tiêu chuẩn quốc tế song ngữ Anh - Việt để tham gia các gói thầu cung ứng vật tư cơ điện cho các nhà máy, khu công nghiệp và dự án điện mặt trời quy mô lớn.',
      solution: 'Biên soạn cấu trúc 11 trang chuẩn mực B2B: Trang bìa nhận diện đẳng cấp, Mục lục & Thông tin pháp lý, Tầm nhìn & Sứ mệnh, Sơ đồ tổ chức, Năng lực nhân sự & kho vận, Biểu đồ doanh thu 5 năm, Danh sách đối tác khách hàng, Dự án thực tế (nông nghiệp công nghệ cao, nhà xưởng) và Giải pháp thiết bị CHINT Global.',
      tools: 'Adobe InDesign, Photoshop, Illustrator, Kỹ thuật thiết kế Print Ready CMYK, Xử lý ảnh chụp kho hàng & hệ thống pallet.',
      impact: 'Bộ ấn phẩm chính thức giúp nâng tầm vị thế thương hiệu đối tác cấp 1 của CHINT Global tại Việt Nam, gia tăng uy tín rõ rệt trong các buổi đấu thầu kỹ thuật.'
    },
    'tiasang-telecom': {
      title: 'Biên Soạn & Thiết Kế Hồ Sơ Năng Lực 60 Trang — Tia Sáng Telecom (ISO 9001:2015)',
      badge: 'Hồ Sơ Năng Lực B2B • Viễn Thông & System Integration',
      images: [
        'profile/previews/tiasang_p01.webp',
        'profile/previews/tiasang_p02.webp',
        'profile/previews/tiasang_p03.webp',
        'profile/previews/tiasang_p04.webp',
        'profile/previews/tiasang_p05.webp',
        'profile/previews/tiasang_p06.webp',
        'profile/previews/tiasang_p07.webp',
        'profile/previews/tiasang_p08.webp',
        'profile/previews/tiasang_p09.webp',
        'profile/previews/tiasang_p10.webp',
        'profile/previews/tiasang_p11.webp',
        'profile/previews/tiasang_p12.webp',
        'profile/previews/tiasang_p13.webp',
        'profile/previews/tiasang_p14.webp',
        'profile/previews/tiasang_p15.webp',
        'profile/previews/tiasang_p16.webp',
        'profile/previews/tiasang_p17.webp',
        'profile/previews/tiasang_p18.webp',
        'profile/previews/tiasang_p19.webp',
        'profile/previews/tiasang_p20.webp',
        'profile/previews/tiasang_p21.webp',
        'profile/previews/tiasang_p22.webp',
        'profile/previews/tiasang_p23.webp',
        'profile/previews/tiasang_p24.webp',
        'profile/previews/tiasang_p25.webp',
        'profile/previews/tiasang_p26.webp',
        'profile/previews/tiasang_p27.webp',
        'profile/previews/tiasang_p28.webp',
        'profile/previews/tiasang_p29.webp',
        'profile/previews/tiasang_p30.webp',
        'profile/previews/tiasang_p31.webp',
        'profile/previews/tiasang_p32.webp'
      ],
      pdfUrl: 'profile/HSNL_Tia_Sang_Telecom.pdf',
      pdfTitle: 'Tải Full PDF Hồ Sơ Năng Lực (60 Trang)',
      zipUrl: 'profile/HSNL_Tia_Sang_Telecom_Ban_Goc.zip',
      zipTitle: 'Tải File Nén 32 Bản Thiết Kế Gốc (.ZIP 21MB)',
      problem: 'Công ty TNHH Tích Hợp Mạng Viễn Thông Tia Sáng (Tia Sang Telecom Co., Ltd - thành lập năm 2007) là nhà thầu tích hợp hệ thống viễn thông (SI - System Integrator) hàng đầu tại Việt Nam. Doanh nghiệp cần một bộ Hồ Sơ Năng Lực quy chuẩn đồ sộ 60 trang đạt chứng nhận quản lý chất lượng quốc tế ISO 9001:2015 nhằm tham gia đấu thầu các dự án hạ tầng công nghệ quy mô lớn: cao ốc văn phòng, bệnh viện, trường học, bến cảng, nhà máy và trung tâm dữ liệu Data Center.',
      solution: 'Quy hoạch toàn diện cấu trúc 60 trang (32 spreads ấn phẩm chuẩn in ấn CMYK): Thiết kế bìa nhận diện thương hiệu đỏ - xanh chuyên nghiệp, Thư ngỏ giám đốc, Pháp lý & Giấy phép kinh doanh, Chứng nhận ISO 9001:2015, Tầm nhìn - Sứ mệnh - Giá trị cốt lõi, Sơ đồ tổ chức & Năng lực nhân sự kỹ sư, Lĩnh vực hoạt động toàn diện (Hạ tầng mạng máy tính, Tổng đài VoIP, Camera giám sát AI, Hội nghị truyền hình MaxHub/Aver, Âm thanh ánh sáng TOA/Bosch, Nhà thông minh, Màn hình LED ghép, Chống sét & Điện mặt trời), Đối tác phân phối chính hãng (Cisco, HP, Dell, IBM, CommScope, Fortigate, Peplink) và Danh mục hàng trăm dự án tiêu biểu trên toàn quốc.',
      tools: 'Adobe Photoshop, Illustrator, InDesign, CorelDRAW, Quy chuẩn thiết kế kỹ thuật Print-Ready CMYK, Xử lý hình ảnh công trình thực tế & sơ đồ kiến trúc hệ thống mạng SI.',
      impact: 'Bộ tài liệu 60 trang chuẩn ISO 9001:2015 trở thành vũ khí đấu thầu chiến lược của Tia Sáng Telecom, giúp công ty liên tiếp trúng các gói thầu cung ứng và thi công hạ tầng viễn thông cho nhiều tập đoàn, bệnh viện và nhà máy lớn.'
    },
    'tvd-motor-yachts': {
      title: 'Bộ Catalogue & Ấn Phẩm Kỹ Thuật Dòng Siêu Du Thuyền Động Cơ TVD Motor Yachts',
      badge: 'Đóng Tàu & Du Thuyền Hàng Hải • Tân Viễn Đông',
      images: [
        'profile/previews/tvd_1430my_p1.webp',
        'profile/previews/tvd_2500my_p1.webp',
        'profile/previews/tvd_980my_p1.webp'
      ],
      pdfList: [
        { title: 'TVD 1430 MY (Du Thuyền Động Cơ 14.3m)', url: 'profile/(1) TVD 1430MY.pdf' },
        { title: 'TVD 2500 MY (Siêu Du Thuyền Victory 25m)', url: 'profile/(1) TVD 2500MY.pdf' },
        { title: 'TVD 980 MY (Du Thuyền Động Cơ Gia Đình 10m)', url: 'profile/(1) TVD 980MY.pdf' }
      ],
      problem: 'Du thuyền hai thân (Catamaran) là phân khúc sản phẩm cơ khí hàng hải cao cấp với giá trị đầu tư lớn. Khách hàng thượng lưu và các công ty du lịch đòi hỏi tài liệu giới thiệu sản phẩm phải cực kỳ chi tiết về thông số hàng hải, đăng kiểm VR-SB và thiết kế không gian sống thượng lưu.',
      solution: 'Thiết kế hệ thống ấn phẩm bán hàng sang trọng khổ lớn: ảnh chụp và phối cảnh 3D du thuyền lướt sóng, salon phòng khách panorama, quầy bar & phòng ngủ, kết hợp bảng thông số cơ bản (dài, rộng, chiều cao mạn, sức chở khách, công suất máy Mercury/Hyundai Seasall, tốc độ hải lý, dung tích két dầu/nước) và sơ đồ 3D các tầng boong tàu.',
      tools: 'Adobe Photoshop, Kỹ thuật dàn trang Catalogue kỹ thuật hàng hải, Biên tập thông số cơ học & đăng kiểm VR-SB.',
      impact: 'Bộ tài liệu trở thành công cụ đắc lực của ban giám đốc và đội ngũ kinh doanh khi tư vấn cho các khu nghỉ dưỡng, resort cao cấp và khách hàng cá nhân đặt đóng mới.'
    },
    'tvd-sailing-yachts': {
      title: 'Ấn Phẩm Kỹ Thuật Dòng Du Thuyền Buồm Sang Trọng TVD Sailing Yachts',
      badge: 'Du Thuyền Buồm Cao Cấp • Tân Viễn Đông',
      images: [
        'profile/previews/tvd_1100sy_p1.webp',
        'profile/previews/tvd_1360so_p1.webp'
      ],
      pdfList: [
        { title: 'TVD 1100 SY (Du Thuyền Buồm Aphrodite 10.65m)', url: 'profile/(1) TVD 1100SY.pdf' },
        { title: 'TVD 1360 SO (Du Thuyền Buồm Cruise Party 13.6m)', url: 'profile/(1) TVD 1360 SO.pdf' }
      ],
      problem: 'Xu hướng du lịch trải nghiệm du thuyền buồm và tiệc Cruise Party biển đảo tại Nha Trang, Phú Quốc, Hạ Long bùng nổ, nhưng các đơn vị lữ hành thiếu tài liệu trực quan để đánh giá sức chứa và độ an toàn của tàu buồm sản xuất tại Việt Nam.',
      solution: 'Thiết kế ấn phẩm nổi bật hình ảnh cánh buồm căng gió trên nền biển xanh ngọc, ảnh thực tế khách trải nghiệm tiệc ngoài trời trên boong, phối cảnh 3D mặt cắt boong tàu và bảng thông số đăng kiểm VR-SB sức tải 16 - 40 người.',
      tools: 'Photoshop, Kỹ thuật phối màu biển khơi Nautical, Bố cục thông số kỹ thuật hàng hải, Visual storytelling du lịch cao cấp.',
      impact: 'Khẳng định vị thế tiên phong của Tân Viễn Đông trong ngành chế tạo tàu thuyền buồm Composite tiêu chuẩn quốc tế tại Việt Nam.'
    },
    'tvd-sport-sailing': {
      title: 'Brochure Thông Số Kỹ Thuật Thuyền Buồm Thể Thao Bãi Biển (TVD14 - 16 - 19 - 25SY)',
      badge: 'Sport Sailing Catamaran • Tân Viễn Đông',
      images: [
        'profile/previews/tvd_brochure_kt_p1.webp',
        'profile/previews/tvd_brochure_kt_p2.webp'
      ],
      pdfUrl: 'profile/Brochure KT14 16 19 25S.pdf',
      pdfTitle: 'Tải PDF Brochure Kỹ Thuật Thuyền Buồm (2 Trang In Ấn)',
      problem: 'Các câu lạc bộ thể thao biển, resort ven biển và vận động viên đua thuyền buồm cần bảng đối chiếu kỹ thuật chi tiết giữa các phân khúc chiều dài để lựa chọn dòng tàu phù hợp ngân sách và điều kiện sóng gió bãi biển.',
      solution: 'Thiết kế Brochure 2 trang in ấn khổ A4: Trang 1 so sánh trực diện 3 dòng thể thao TVD14, TVD16, TVD19 (chiều dài max, tải trọng 4-8 người, diện tích buồm main/jib, hệ furler jib, bánh lái đôi, sàn lưới); Trang 2 giới thiệu chuyên sâu dòng dã ngoại cao cấp TVD25SY có cabin ngủ, bếp và động cơ treo.',
      tools: 'Adobe Photoshop, Kỹ thuật Infographic so sánh thông số, Phối cảnh đồ họa thể thao biển năng động.',
      impact: 'Được in ấn và phát hành trực tiếp tại các sự kiện thể thao biển, triển lãm thuyền quốc tế và gửi cho các đối tác du lịch thể thao nước ngoài.'
    },
    'banner-15nam': {
      title: 'Thiết Kế Banner & Key Visual Kỷ Niệm 15 Năm Thành Lập',
      badge: 'Sự Kiện Doanh Nghiệp • Key Visual',
      images: [
        'banner kỷ niệm 15 năm thành lập công ty  final.webp',
        'backdrop 2.webp'
      ],
      problem: 'Sự kiện 15 năm là cột mốc trọng đại, yêu cầu hình ảnh trang trọng, thể hiện sự phát triển bền vững và lòng tri ân sâu sắc đến khách hàng & đối tác.',
      solution: 'Sử dụng tông màu vàng kim và xanh biển sâu sang trọng, lồng ghép con số 15 cách điệu và hiệu ứng ánh sáng nổi bật.',
      tools: 'Adobe Photoshop, Xử lý hiệu ứng ánh sáng 3D, Thiết kế khổ lớn Backdrop sân khấu & Banner Online.',
      impact: 'Được sử dụng làm Key Visual trung tâm cho toàn bộ chiến dịch truyền thông nội bộ và ngoại bộ của công ty.'
    },
    'poster-covua': {
      title: 'Poster Ưu Đãi Thiết Bị MaxHub & Đồng Hành Giải Cờ Vua TP.HCM',
      badge: 'CSR & Sự Kiện Thể Thao • Thiết Bị Hội Nghị',
      images: [
        'poster_maxhub_covua_2022.webp'
      ],
      problem: 'Doanh nghiệp cần quảng bá chương trình ưu đãi 50% thiết bị hội nghị thông minh MaxHub (UC W10, W21) kết hợp truyền thông tài trợ Giải vô địch Cờ vua học sinh - sinh viên TP.HCM 2022 với phong cách công nghệ cao, đáng tin cậy.',
      solution: 'Thiết kế poster phối cảnh 3D phòng họp sang trọng, nổi bật hai mẫu camera hội nghị MaxHub trên bục podium phát sáng. Bảng giá so sánh trực quan, tích hợp trọn vẹn thông tin tài trợ cờ vua, mã QR liên hệ và bộ nhận diện Tia Sáng Telecom.',
      tools: 'Adobe Photoshop, Bố cục 3D Podium Render, Xử lý ánh sáng Neon Cyan/Blue, Typography chuyển đổi cao, Tối ưu WebP.',
      impact: 'Ấn phẩm truyền thông chủ lực đạt tương tác cao trong chiến dịch, nâng cao uy tín thương hiệu đồng hành cùng giới trẻ trí tuệ và kích cầu bán lẻ ấn tượng.'
    },
    'banner-km': {
      title: 'Bộ Banner Siêu Khuyến Mãi Thiết Bị Hội Nghị & Màn Hình Tương Tác MaxHub',
      badge: 'Promotion & Sales Campaigns • TS Telecom',
      images: [
        'banner_khuyenmai_maxhub_tiasang.webp'
      ],
      problem: 'Chiến dịch siêu khuyến mãi giảm đến 50% toàn bộ hệ sinh thái thiết bị hội nghị và màn hình tương tác thông minh đòi hỏi một Key Visual banner bề thế, sang trọng, thể hiện đầy đủ 5 dòng sản phẩm chủ lực mà không bị rối mắt.',
      solution: 'Bố cục thiết kế không gian phòng họp tương lai nhìn ra thành phố hiện đại. Màn hình tương tác L65TA làm chủ đạo góc phải, hàng showcase 5 thiết bị (L65TA, UC W10, WT01A, WB01, UC S10) với giá gốc gạch ngang và giá sốc màu đỏ rực rỡ, tích hợp badge bảo hành 12 tháng và hỗ trợ 24/7.',
      tools: 'Adobe Photoshop, Thiết kế giao diện chuyển đổi (Conversion UI), Phối màu Cyber Blue & Electric Red, Tối ưu nén ảnh WebP đa nền tảng.',
      impact: 'Tạo ấn tượng thị giác mạnh mẽ cho khách hàng doanh nghiệp B2B và B2C, tăng tỷ lệ nhấp chuột (CTR) và góp phần bứt phá doanh số chiến dịch.'
    },
    'ai-creative-saas': {
      title: 'Sáng Tạo Ad Creative & Visual Đột Phá Bằng AI',
      badge: 'AI Art & SaaS Creative • Gemini / Midjourney',
      images: [
        'Gemini_Generated_Image_4hxhb14hxhb14hxh.webp',
        'Gemini_Generated_Image_d5ocnid5ocnid5oc.webp',
        'Gemini_Generated_Image_hvxbb4hvxbb4hvxb.webp'
      ],
      problem: 'Chi phí thuê studio chụp ảnh 3D cho các sản phẩm công nghệ/SaaS rất đắt đỏ và tốn nhiều tuần để hoàn thiện.',
      solution: 'Ứng dụng kỹ thuật Prompt Engineering nâng cao (Negative prompts, Lighting control, Aspect Ratio, Seed consistency) để render hình ảnh công nghệ siêu thực.',
      tools: 'Gemini Pro / Midjourney, Prompt Engineering Architecture, Upscaling AI, Photoshop retouch.',
      impact: 'Rút ngắn thời gian tạo concept từ 2 tuần xuống còn 30 phút, tiết kiệm 90% chi phí sản xuất hình ảnh quảng cáo.'
    },
    'ai-character-art': {
      title: 'Thiết Kế Visual Đa Phong Cách & Mascot Thương Hiệu AI',
      badge: 'Visual Storytelling • Cinematic Concept',
      images: [
        'Gemini_Generated_Image_92ybj192ybj192yb.webp',
        'Gemini_Generated_Image_um4h1dum4h1dum4h.webp',
        'Gemini_Generated_Image_ybwp75ybwp75ybwp.webp'
      ],
      problem: 'Doanh nghiệp cần linh vật và hình ảnh minh họa kể chuyện xuyên suốt các chiến dịch nhưng thiếu nhân sự vẽ minh họa 2D/3D.',
      solution: 'Thiết lập prompt có tính nhất quán nhân vật để tạo mascot với nhiều biểu cảm và bối cảnh khác nhau phục vụ kịch bản content.',
      tools: 'AI Image Generation, Style Transfer, Color Grading, Photoshop.',
      impact: 'Cung cấp kho tài nguyên hình ảnh không giới hạn cho đội ngũ làm nội dung mạng xã hội.'
    },
    'galant-series-2': {
      title: 'Chuỗi Ấn Phẩm Social Tư Vấn Sức Khỏe & Phòng Ngừa Dịch Bệnh',
      badge: 'Galant Clinic • Social Healthcare Media',
      images: [
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-05.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-06.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-07.webp',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-08.webp'
      ],
      problem: 'Cần duy trì tần suất đăng bài liên tục 3-5 bài/tuần với hình ảnh đa dạng nhưng vẫn giữ đúng quy chuẩn nhận diện thương hiệu.',
      solution: 'Xây dựng Design System mẫu (Templates) trên Photoshop, kết hợp AI hỗ trợ tìm ý tưởng hình ảnh và tinh chỉnh chi tiết.',
      tools: 'Photoshop, Content Template System, Quản trị Fanpage & Lên lịch đăng bài tự động.',
      impact: 'Đảm bảo tiến độ xuất bản 100%, tạo độ phủ nhận diện thương hiệu y tế Galant trên toàn TP.HCM.'
    },
    'meea-trendy': {
      title: 'Thiết Kế Ad Creative Kem Dưỡng Body MEEA Premium Trendy',
      badge: 'eCommerce & Mỹ Phẩm • MEEA Premium',
      images: [
        'ad_meea_trendy_cream.webp'
      ],
      problem: 'Ra mắt dòng kem ủ dịch chiết lên men phiên bản Tím Trendy, cần visual cao cấp, bật sáng làn da và kích thích đặt hàng trên TikTok Shop & Facebook Ads.',
      solution: 'Bố cục người mẫu cầm sản phẩm tự nhiên, ánh sáng studio mịn màng, làm nổi bật kết cấu kem mịn mượt và các gạch đầu dòng công dụng dưỡng ẩm chuyên sâu.',
      tools: 'Adobe Photoshop, Retouch da mặt & body, Phối màu tím Pastel Trendy, Thiết kế Ad Conversion.',
      impact: 'Tạo visual nhận diện chủ đạo cho chiến dịch viral trên mạng xã hội, thúc đẩy tỷ lệ click (CTR) tăng 35% so với ad thông thường.'
    },
    'bbia-guardian': {
      title: 'Visual Quảng Cáo Son Kem Lì Bbia Last Velvet Tint #01 Đỏ Gạch',
      badge: 'FMCG & Beauty • Guardian Official Store',
      images: [
        'ad_bbia_velvet_tint.webp'
      ],
      problem: 'Cần ấn phẩm truyền thông chuẩn quy chuẩn phân phối của Guardian, nhấn mạnh chất son lì mịn nhẹ tênh và swatch màu thực tế.',
      solution: 'Tích hợp khung zoom swatch cận cảnh làn môi, icon cam kết (lên màu chuẩn, môi mềm mịn, bền màu lâu trôi) cùng logo Guardian Official Store uy tín.',
      tools: 'Adobe Photoshop, Xử lý màu sắc son chuẩn xác, Bố cục E-commerce Ad, Typography.',
      impact: 'Được sử dụng làm banner bán chạy chính thức trên sàn thương mại điện tử và trang bán lẻ Guardian.'
    },
    'weilaiya-guardian': {
      title: 'Poster Sữa Tắm Nước Hoa Weilaiya Tinh Chất Hoa Hồng 450ML',
      badge: 'FMCG & Chăm Sóc Cá Nhân • Guardian Official',
      images: [
        'ad_weilaiya_shower_gel.webp'
      ],
      problem: 'Sản phẩm sữa tắm cánh hoa hồng cao cấp cần truyền tải trọn vẹn cảm giác hương thơm quyến rũ, kết cấu gel mịn màng và độ sang trọng.',
      solution: 'Phối tone màu ấm áp cánh hồng, cận cảnh kết cấu gel tạo bọt mịn, các chứng nhận công dụng làm sáng da và dưỡng ẩm sâu.',
      tools: 'Photoshop, Xử lý hiệu ứng ánh sáng thủy tinh trong suốt, Phối cảnh Beauty Photography.',
      impact: 'Tăng cường niềm tin thương hiệu và tỷ lệ chuyển đổi đơn hàng cho gian hàng chính hãng.'
    },
    'nanoapo-paint': {
      title: 'Key Visual & Poster Sơn Ngoại Thất Diamond Nano Cao Cấp',
      badge: 'Vật Liệu Xây Dựng • Nano APO & Ưu Việt',
      images: [
        'ad_nanoapo_paint_uuviet.webp'
      ],
      problem: 'Truyền thông sản phẩm sơn siêu bóng công nghệ Anh Quốc, cần hình ảnh mạnh mẽ, uy tín cho hệ thống nhà phân phối Ưu Việt.',
      solution: 'Key Visual tòa nhà sang trọng ban đêm, phối hợp ánh kim cương Diamond Nano và 5 tính năng vượt trội (siêu bóng, siêu bền, chống thời tiết, an toàn, dễ lau chùi).',
      tools: 'Adobe Photoshop, Thiết kế Poster khổ lớn in ấn CMYK & Digital Ads, Bố cục B2B/B2C.',
      impact: 'Bộ ấn phẩm bán hàng trung tâm cho toàn bộ showroom và chiến dịch tư vấn xây nhà trọn gói.'
    },
    'kalpen-cookware': {
      title: 'Thiết Kế Banner Giới Thiệu Nồi Inox 304 Kalpen Chuẩn Đức',
      badge: 'Đồ Gia Dụng Cao Cấp • Kalpen & Ưu Việt',
      images: [
        'ad_kalpen_inox304_uuviet.webp'
      ],
      problem: 'Khách hàng phân vân về chất lượng an toàn của đồ gia dụng, cần thông điệp trực diện về tiêu chuẩn an toàn sức khỏe chuẩn Đức.',
      solution: 'Cận cảnh bề mặt Inox 304 sáng bóng, bố cục bàn bếp sạch sẽ với rau củ tươi, 4 huy hiệu an toàn tuyệt đối và số điện thoại hotline tư vấn nhanh.',
      tools: 'Photoshop, Xử lý phản chiếu kim loại Inox 3D, Thiết kế kích thích hành vi mua sắm gia đình.',
      impact: 'Nâng cao doanh số bán buôn và bán lẻ theo gói combo nội thất nhà bếp.'
    }
  };

  // --- 6. MODAL & LIGHTBOX DOM SELECTORS ---
  const projectModal = document.getElementById('projectModal');
  const modalContent = document.getElementById('modalContent');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.getElementById('modalBackdrop');

  const galleryModal = document.getElementById('galleryModal');
  const galleryGrid = document.getElementById('galleryGrid');
  const openFullGalleryBtn = document.getElementById('openFullGalleryBtn');
  const galleryClose = document.getElementById('galleryClose');
  const galleryBackdrop = document.getElementById('galleryBackdrop');

  const imageLightbox = document.getElementById('imageLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxImgWrapper = document.getElementById('lightboxImgWrapper');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxCounter = document.getElementById('lightboxCounter');
  const lightboxTitle = document.getElementById('lightboxTitle');
  const lightboxZoomBtn = document.getElementById('lightboxZoomBtn');
  const lightboxZoomIcon = document.getElementById('lightboxZoomIcon');
  const lightboxZoomText = document.getElementById('lightboxZoomText');
  const lightboxNewTabBtn = document.getElementById('lightboxNewTabBtn');
  const lightboxDownloadBtn = document.getElementById('lightboxDownloadBtn');
  const lightboxClose = document.getElementById('lightboxClose');
  const lightboxBackdrop = document.getElementById('lightboxBackdrop');
  const lightboxPrevBtn = document.getElementById('lightboxPrevBtn');
  const lightboxNextBtn = document.getElementById('lightboxNextBtn');
  const lightboxThumbnails = document.getElementById('lightboxThumbnails');

  // --- MODAL FUNCTIONS ---
  function closeProjectModal() {
    if (projectModal) projectModal.classList.remove('active');
    const lbActive = imageLightbox && imageLightbox.classList.contains('active');
    const galActive = galleryModal && galleryModal.classList.contains('active');
    if (!lbActive && !galActive) {
      document.body.style.overflow = 'auto';
    }
  }
  window.closeProjectModal = closeProjectModal;

  function openProjectCaseStudy(projectId) {
    const data = caseStudiesData[projectId];
    if (!data || !modalContent) return;

    activeModalProjectId = projectId;
    activeModalImageIndex = 0;

    let thumbsHtml = '';
    if (data.images && data.images.length > 1) {
      thumbsHtml = `
        <div class="modal-gallery-strip">
          ${data.images.map((img, idx) => `
            <div class="gallery-strip-item ${idx === 0 ? 'active' : ''}" onclick="changeModalMainImg('${img}', this, ${idx})" title="${currentLang === 'vi' ? 'Xem trang ' + (idx + 1) : 'View page ' + (idx + 1)}">
              <img src="${img.replace('.webp', '.thumb.webp')}" alt="thumbnail ${idx + 1}" loading="lazy" decoding="async">
            </div>
          `).join('')}
        </div>
      `;
    }

    let pdfSectionHtml = '';
    if (data.pdfUrl) {
      pdfSectionHtml = `
        <div class="modal-pdf-download-strip">
          <span class="pdf-strip-title"><i class="fa-solid fa-file-pdf" style="color: #ef4444; font-size: 1.15rem;"></i> ${currentLang === 'vi' ? 'Tài Liệu Thiết Kế Đính Kèm:' : 'Attached Design Documents:'}</span>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            <a href="${data.pdfUrl}" target="_blank" download class="btn btn-primary btn-sm" style="background: linear-gradient(135deg, #dc2626, #ef4444); border-color: #ef4444;">
              <i class="fa-solid fa-arrow-down"></i> ${data.pdfTitle || (currentLang === 'vi' ? 'Tải File PDF Gốc' : 'Download Original PDF')}
            </a>
            <a href="${data.pdfUrl}" target="_blank" class="btn btn-outline btn-sm">
              <i class="fa-solid fa-arrow-up-right-from-square"></i> ${currentLang === 'vi' ? 'Mở Xem PDF' : 'View PDF in Tab'}
            </a>
            ${data.zipUrl ? `
            <a href="${data.zipUrl}" download class="btn btn-outline btn-sm" style="border-color: rgba(245, 158, 11, 0.5);">
              <i class="fa-solid fa-file-zipper" style="color: #f59e0b;"></i> ${data.zipTitle || (currentLang === 'vi' ? 'Tải File Gốc (.ZIP)' : 'Download Raw (.ZIP)')}
            </a>
            ` : ''}
          </div>
        </div>
      `;
    } else if (data.pdfList && data.pdfList.length > 0) {
      pdfSectionHtml = `
        <div class="modal-pdf-download-strip">
          <span class="pdf-strip-title"><i class="fa-solid fa-file-pdf" style="color: #ef4444; font-size: 1.15rem;"></i> ${currentLang === 'vi' ? 'Tải Các File PDF Thiết Kế Gốc:' : 'Download Original PDF Files:'}</span>
          <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
            ${data.pdfList.map(item => `
              <a href="${item.url}" target="_blank" download class="btn btn-outline btn-sm" style="font-size: 0.8rem; border-color: rgba(220, 38, 38, 0.4);">
                <i class="fa-solid fa-file-pdf" style="color: #ef4444;"></i> ${item.title}
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    modalContent.innerHTML = `
      <div class="modal-case-header">
        <div class="badge-tag"><i class="fa-solid fa-folder-open"></i> ${data.badge}</div>
        <h2>${data.title}</h2>
      </div>

      <div class="modal-img-container" id="modalImgContainer" onclick="openCurrentModalImageInLightbox()" style="cursor: zoom-in;" title="${currentLang === 'vi' ? 'Bấm để phóng to toàn màn hình độ phân giải gốc' : 'Click to zoom full screen'}">
        <img src="${data.images[0]}" alt="${data.title}" id="modalMainImg">
        <div class="modal-img-overlay-badge">
          <i class="fa-solid fa-expand"></i> <span>${currentLang === 'vi' ? 'Bấm xem ảnh đầy đủ HD' : 'View Full Image HD'}</span>
        </div>
      </div>

      ${thumbsHtml}
      ${pdfSectionHtml}

      <div class="modal-case-grid">
        <div class="modal-case-box">
          <h4><i class="fa-solid fa-triangle-exclamation"></i> ${currentLang === 'vi' ? 'Bối Cảnh & Thách Thức' : 'Background & Challenge'}</h4>
          <p>${data.problem}</p>
        </div>
        <div class="modal-case-box">
          <h4><i class="fa-solid fa-lightbulb"></i> ${currentLang === 'vi' ? 'Giải Pháp Thực Thi' : 'Creative Solution'}</h4>
          <p>${data.solution}</p>
        </div>
        <div class="modal-case-box">
          <h4><i class="fa-solid fa-screwdriver-wrench"></i> ${currentLang === 'vi' ? 'Kỹ Năng & Công Cụ' : 'Skills & Tools'}</h4>
          <p>${data.tools}</p>
        </div>
        <div class="modal-case-box">
          <h4><i class="fa-solid fa-chart-line"></i> ${currentLang === 'vi' ? 'Kết Quả Đạt Được' : 'Results & Impact'}</h4>
          <p>${data.impact}</p>
        </div>
      </div>

      <div style="display: flex; justify-content: flex-end; gap: 1rem; flex-wrap: wrap;">
        ${data.pdfUrl ? `
          <a href="${data.pdfUrl}" target="_blank" download class="btn btn-sm" style="background: linear-gradient(135deg, #dc2626, #ef4444); color: #fff;">
            <i class="fa-solid fa-file-pdf"></i> ${currentLang === 'vi' ? 'Tải PDF Gốc' : 'Download PDF'}
          </a>
        ` : ''}
        <button class="btn btn-outline btn-sm" onclick="openCurrentModalImageInLightbox()">
          <i class="fa-solid fa-expand"></i> ${currentLang === 'vi' ? 'Xem Ảnh Đầy Đủ HD' : 'View Full Size HD'}
        </button>
        <button class="btn btn-outline btn-sm" onclick="closeProjectModal()">${currentLang === 'vi' ? 'Đóng' : 'Close'}</button>
        <a href="#contact" class="btn btn-primary btn-sm" onclick="closeProjectModal()">${currentLang === 'vi' ? 'Trao Đổi Về Dự Án Này' : 'Discuss This Project'}</a>
      </div>
    `;

    if (projectModal) {
      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }
  window.openProjectCaseStudy = openProjectCaseStudy;

  function changeModalMainImg(src, el, idx) {
    const mainImg = document.getElementById('modalMainImg');
    if (mainImg) mainImg.src = src;
    if (typeof idx === 'number') {
      activeModalImageIndex = idx;
    } else {
      const data = caseStudiesData[activeModalProjectId];
      if (data && data.images) {
        activeModalImageIndex = data.images.indexOf(src);
        if (activeModalImageIndex < 0) activeModalImageIndex = 0;
      }
    }
    document.querySelectorAll('.gallery-strip-item').forEach(item => item.classList.remove('active'));
    if (el) el.classList.add('active');
  }
  window.changeModalMainImg = changeModalMainImg;

  function openCurrentModalImageInLightbox() {
    if (activeModalProjectId) {
      openProjectFullImage(activeModalProjectId, activeModalImageIndex);
    }
  }
  window.openCurrentModalImageInLightbox = openCurrentModalImageInLightbox;

  if (modalClose) modalClose.addEventListener('click', closeProjectModal);
  if (modalBackdrop) modalBackdrop.addEventListener('click', closeProjectModal);

  // --- 7. FULL 30 GALANT GALLERY MODAL ---
  if (galleryGrid) {
    let galantHtml = '';
    for (let i = 1; i <= 30; i++) {
      const num = i < 10 ? `0${i}` : `${i}`;
      const filename = i >= 19 ? `Galant_${num}.thumb.webp` : `Galant-${num}.thumb.webp`;
      const fullPath = `Thiết kế truyền thông sức khỏa sinh sản/${filename}`;
      galantHtml += `
        <div class="gallery-thumb-item" onclick="openGalantLightbox(${i - 1})" title="${currentLang === 'vi' ? 'Bấm để phóng to ấn phẩm #' + num : 'Click to zoom artwork #' + num}">
          <img src="${fullPath}" alt="Galant Design ${num}" loading="lazy">
          <div class="gallery-thumb-caption">Ấn phẩm #${num}</div>
        </div>
      `;
    }
    galleryGrid.innerHTML = galantHtml;
  }

  if (openFullGalleryBtn) {
    openFullGalleryBtn.addEventListener('click', () => {
      if (galleryModal) {
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      }
    });
  }

  if (galleryClose) {
    galleryClose.addEventListener('click', () => {
      if (galleryModal) galleryModal.classList.remove('active');
      const lbActive = imageLightbox && imageLightbox.classList.contains('active');
      const projActive = projectModal && projectModal.classList.contains('active');
      if (!lbActive && !projActive) {
        document.body.style.overflow = 'auto';
      }
    });
  }

  if (galleryBackdrop) {
    galleryBackdrop.addEventListener('click', () => {
      if (galleryModal) galleryModal.classList.remove('active');
      const lbActive = imageLightbox && imageLightbox.classList.contains('active');
      const projActive = projectModal && projectModal.classList.contains('active');
      if (!lbActive && !projActive) {
        document.body.style.overflow = 'auto';
      }
    });
  }

  // --- 8. ADVANCED FULLSCREEN IMAGE LIGHTBOX ---
  function openProjectFullImage(projectId, index) {
    if (!projectId) return;

    let images = [];
    let title = 'Dự án Media';
    let badge = '';

    if (typeof projectId === 'string' && (projectId.endsWith('.jpg') || projectId.endsWith('.jpeg') || projectId.endsWith('.png') || projectId.endsWith('.webp') || projectId.includes('/'))) {
      images = [projectId];
      title = 'Dự án Media';
    } else {
      const data = caseStudiesData[projectId];
      if (data) {
        title = data.title;
        badge = data.badge;
        images = (data.images && data.images.length > 0) ? data.images : [];
      }

      if (images.length === 0) {
        const card = document.querySelector(`.project-card[data-id="${projectId}"]`);
        const imgEl = card ? card.querySelector('.card-thumb') : null;
        if (imgEl) {
          images.push(imgEl.getAttribute('src').replace('.thumb.webp', '.webp'));
          const cardTitleEl = card.querySelector('.card-title');
          if (cardTitleEl) title = cardTitleEl.textContent;
        }
      }
    }

    if (images.length === 0) return;

    lightboxPlaylist = images.map((img, i) => ({
      src: img,
      title: title,
      caption: images.length > 1 ? `${title} (${i + 1}/${images.length})` : title,
      badge: badge
    }));

    currentLightboxIndex = (typeof index === 'number' && index >= 0 && index < lightboxPlaylist.length) ? index : 0;
    renderLightbox();
  }
  window.openProjectFullImage = openProjectFullImage;

  function openGalantLightbox(index) {
    const playlist = [];
    for (let i = 1; i <= 30; i++) {
      const num = i < 10 ? `0${i}` : `${i}`;
      const filename = i >= 19 ? `Galant_${num}.webp` : `Galant-${num}.webp`;
      const fullPath = `Thiết kế truyền thông sức khỏa sinh sản/${filename}`;
      playlist.push({
        src: fullPath,
        title: currentLang === 'vi' ? 'Bộ Sưu Tập 30 Ấn Phẩm Y Tế - Galant Clinic' : 'Galant Clinic Healthcare Campaign (30 Artworks)',
        caption: currentLang === 'vi' ? `Ấn phẩm #${num} — Truyền thông Sức khỏe & Y tế Galant Clinic` : `Artwork #${num} — Galant Clinic Healthcare & Community Campaign`,
        badge: 'Galant Clinic'
      });
    }

    lightboxPlaylist = playlist;
    currentLightboxIndex = (typeof index === 'number' && index >= 0 && index < playlist.length) ? index : 0;
    renderLightbox();
  }
  window.openGalantLightbox = openGalantLightbox;

  function openLightbox(src, caption) {
    lightboxPlaylist = [{
      src: src,
      title: caption || 'Dự án Media',
      caption: caption || '',
      badge: ''
    }];
    currentLightboxIndex = 0;
    renderLightbox();
  }
  window.openLightbox = openLightbox;

  function renderLightbox() {
    if (!imageLightbox || !lightboxPlaylist || lightboxPlaylist.length === 0) return;

    // Reset zoom state
    isLightboxZoomed = false;
    if (lightboxImgWrapper) lightboxImgWrapper.classList.remove('zoomed');
    updateZoomButtonUI();

    // Render thumbnail strip
    if (lightboxThumbnails) {
      if (lightboxPlaylist.length > 1) {
        lightboxThumbnails.innerHTML = lightboxPlaylist.map((item, idx) => `
          <div class="lightbox-thumb ${idx === currentLightboxIndex ? 'active' : ''}" onclick="selectLightboxIndex(${idx})" title="${item.caption || ('Ảnh ' + (idx + 1))}">
            <img src="${item.src}" alt="thumb ${idx + 1}" loading="lazy">
          </div>
        `).join('');
        if (lightboxThumbnails.parentElement) {
          lightboxThumbnails.parentElement.style.display = 'flex';
        }
      } else {
        lightboxThumbnails.innerHTML = '';
        if (lightboxThumbnails.parentElement) {
          lightboxThumbnails.parentElement.style.display = 'none';
        }
      }
    }

    // Toggle nav buttons visibility
    if (lightboxPrevBtn && lightboxNextBtn) {
      if (lightboxPlaylist.length > 1) {
        lightboxPrevBtn.style.display = 'flex';
        lightboxNextBtn.style.display = 'flex';
      } else {
        lightboxPrevBtn.style.display = 'none';
        lightboxNextBtn.style.display = 'none';
      }
    }

    updateLightboxView();

    imageLightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightboxView() {
    const item = lightboxPlaylist[currentLightboxIndex];
    if (!item) return;

    if (lightboxImg) {
      lightboxImg.style.opacity = '1';
      lightboxImg.src = item.src;
    }

    if (lightboxCounter) {
      lightboxCounter.textContent = `${currentLang === 'vi' ? 'Ảnh' : 'Image'} ${currentLightboxIndex + 1} / ${lightboxPlaylist.length}`;
    }

    if (lightboxTitle) {
      lightboxTitle.textContent = item.title || 'Dự án Media';
    }

    if (lightboxCaption) {
      lightboxCaption.textContent = item.caption || item.title || '';
    }

    if (lightboxDownloadBtn) {
      lightboxDownloadBtn.href = item.src;
      const cleanFileName = item.src.split('/').pop().split('\\').pop();
      lightboxDownloadBtn.setAttribute('download', cleanFileName);
    }

    if (lightboxThumbnails) {
      const thumbs = lightboxThumbnails.querySelectorAll('.lightbox-thumb');
      thumbs.forEach((th, idx) => {
        if (idx === currentLightboxIndex) {
          th.classList.add('active');
          if (typeof th.scrollIntoView === 'function') {
            th.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          }
        } else {
          th.classList.remove('active');
        }
      });
    }
  }

  function selectLightboxIndex(index) {
    if (index >= 0 && index < lightboxPlaylist.length) {
      currentLightboxIndex = index;
      isLightboxZoomed = false;
      if (lightboxImgWrapper) lightboxImgWrapper.classList.remove('zoomed');
      updateZoomButtonUI();
      updateLightboxView();
    }
  }
  window.selectLightboxIndex = selectLightboxIndex;

  function nextLightboxImage() {
    if (!lightboxPlaylist || lightboxPlaylist.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex + 1) % lightboxPlaylist.length;
    isLightboxZoomed = false;
    if (lightboxImgWrapper) lightboxImgWrapper.classList.remove('zoomed');
    updateZoomButtonUI();
    updateLightboxView();
  }
  window.nextLightboxImage = nextLightboxImage;

  function prevLightboxImage() {
    if (!lightboxPlaylist || lightboxPlaylist.length <= 1) return;
    currentLightboxIndex = (currentLightboxIndex - 1 + lightboxPlaylist.length) % lightboxPlaylist.length;
    isLightboxZoomed = false;
    if (lightboxImgWrapper) lightboxImgWrapper.classList.remove('zoomed');
    updateZoomButtonUI();
    updateLightboxView();
  }
  window.prevLightboxImage = prevLightboxImage;

  function toggleLightboxZoom() {
    isLightboxZoomed = !isLightboxZoomed;
    if (lightboxImgWrapper) {
      lightboxImgWrapper.classList.toggle('zoomed', isLightboxZoomed);
    }
    updateZoomButtonUI();
  }
  window.toggleLightboxZoom = toggleLightboxZoom;

  function updateZoomButtonUI() {
    if (!lightboxZoomIcon || !lightboxZoomText) return;
    const isVi = currentLang === 'vi';
    if (isLightboxZoomed) {
      lightboxZoomIcon.className = 'fa-solid fa-magnifying-glass-minus';
      lightboxZoomText.textContent = isVi ? 'Thu nhỏ' : 'Zoom Out';
    } else {
      lightboxZoomIcon.className = 'fa-solid fa-magnifying-glass-plus';
      lightboxZoomText.textContent = isVi ? 'Thu phóng' : 'Zoom In';
    }
  }

  function closeLightbox() {
    if (imageLightbox) imageLightbox.classList.remove('active');
    isLightboxZoomed = false;
    if (lightboxImgWrapper) lightboxImgWrapper.classList.remove('zoomed');
    const projActive = projectModal && projectModal.classList.contains('active');
    const galActive = galleryModal && galleryModal.classList.contains('active');
    if (!projActive && !galActive) {
      document.body.style.overflow = 'auto';
    }
  }
  window.closeLightbox = closeLightbox;

  // Lightbox event listeners
  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxBackdrop) lightboxBackdrop.addEventListener('click', closeLightbox);
  if (lightboxPrevBtn) lightboxPrevBtn.addEventListener('click', (e) => { e.stopPropagation(); prevLightboxImage(); });
  if (lightboxNextBtn) lightboxNextBtn.addEventListener('click', (e) => { e.stopPropagation(); nextLightboxImage(); });
  if (lightboxZoomBtn) lightboxZoomBtn.addEventListener('click', (e) => { e.stopPropagation(); toggleLightboxZoom(); });

  if (lightboxNewTabBtn) {
    lightboxNewTabBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const item = lightboxPlaylist[currentLightboxIndex];
      if (item && item.src) {
        window.open(item.src, '_blank');
      }
    });
  }

  if (lightboxImgWrapper) {
    lightboxImgWrapper.addEventListener('click', (e) => {
      if (e.target.tagName === 'IMG') {
        toggleLightboxZoom();
      }
    });
  }

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (imageLightbox && imageLightbox.classList.contains('active')) {
      if (e.key === 'ArrowRight') {
        nextLightboxImage();
      } else if (e.key === 'ArrowLeft') {
        prevLightboxImage();
      } else if (e.key === 'Escape') {
        closeLightbox();
      }
    } else if (e.key === 'Escape') {
      closeProjectModal();
      closeRecruiterModal();
      if (galleryModal) galleryModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  });

  // --- 9. CLICK TO COPY EMAIL ---
  const emailItem = document.getElementById('emailItem');
  if (emailItem) {
    emailItem.addEventListener('click', (e) => {
      e.preventDefault();
      const email = 'nguyentuandat.tuandat@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast('Đã sao chép địa chỉ Email vào bộ nhớ đệm!');
      });
    });
  }

  // --- 10. INTERACTIVE FORM SUBMISSION ---
  const interviewForm = document.getElementById('interviewForm');
  if (interviewForm) {
    interviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('senderName').value;
      const contact = document.getElementById('senderContact').value;
      const pos = document.getElementById('positionType').value;
      const msg = document.getElementById('senderMessage').value;

      showToast(`Cảm ơn ${name}! Tin nhắn của bạn đã được tiếp nhận. Đạt sẽ liên hệ lại qua ${contact} trong vòng 24h.`);
      interviewForm.reset();
    });
  }

  // --- 11. TOAST NOTIFICATION FUNCTION ---
  function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');
    if (toast && toastMessage) {
      toastMessage.textContent = message;
      toast.classList.add('show');
      setTimeout(() => {
        toast.classList.remove('show');
      }, 3500);
    }
  }

  // --- 12. FAQ ACCORDION INTERACTION ---
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

  // --- 13. FLOATING CONTACT & QUICK CHAT WIDGET ---
  const floatingMainBtn = document.getElementById('floatingMainBtn');
  const floatingContactWrapper = document.getElementById('floatingContactWrapper');
  if (floatingMainBtn && floatingContactWrapper) {
    floatingMainBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      floatingContactWrapper.classList.toggle('active');
    });

    document.addEventListener('click', (e) => {
      if (!floatingContactWrapper.contains(e.target)) {
        floatingContactWrapper.classList.remove('active');
      }
    });
  }

  // --- 14. RECRUITER EXECUTIVE BRIEF MODAL LOGIC ---
  const recruiterModal = document.getElementById('recruiterModal');

  function openRecruiterModal() {
    if (recruiterModal) {
      recruiterModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeRecruiterModal() {
    if (recruiterModal) {
      recruiterModal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  window.openRecruiterModal = openRecruiterModal;
  window.closeRecruiterModal = closeRecruiterModal;

  // --- 15. FAST RECRUITER SELECTION CHIPS ---
  const quickChips = document.querySelectorAll('.quick-chip');
  const positionSelect = document.getElementById('positionType');
  const messageTextarea = document.getElementById('senderMessage');
  const senderNameInput = document.getElementById('senderName');

  quickChips.forEach(chip => {
    chip.addEventListener('click', () => {
      quickChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const pos = chip.getAttribute('data-position');
      const msg = chip.getAttribute('data-msg');

      if (pos && positionSelect) {
        positionSelect.value = pos;
      }
      if (msg && messageTextarea) {
        messageTextarea.value = msg;
      }
      if (senderNameInput) {
        senderNameInput.focus();
      }
    });
  });

  // --- 16. SERVICE PACKAGE INQUIRY PREFILL ---
  function selectServiceInquiry(posValue, messageText) {
    const positionSelect = document.getElementById('positionType');
    const messageTextarea = document.getElementById('senderMessage');
    const senderNameInput = document.getElementById('senderName');

    if (positionSelect && posValue) {
      positionSelect.value = posValue;
    }
    if (messageTextarea && messageText) {
      messageTextarea.value = messageText;
    }
    if (senderNameInput) {
      setTimeout(() => {
        senderNameInput.focus();
      }, 400);
    }
  }

  window.selectServiceInquiry = selectServiceInquiry;

});

