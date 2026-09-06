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

  // --- 3. MOBILE MENU DRAWER ---
  const mobileToggle = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');
  const navLinks = document.querySelectorAll('.nav-link');

  mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const isOpen = navMenu.classList.contains('open');
    mobileToggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
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

  // --- 4. SCROLL SPY & NAVBAR BLUR ---
  const sections = document.querySelectorAll('section[id]');
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;

    // Navbar background enhancement
    if (scrollY > 50) {
      navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.25)';
    } else {
      navbar.style.boxShadow = 'none';
    }

    // Active link highlighting
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  });

  // --- 5. PORTFOLIO FILTERING (MEDIA & DESIGN) ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
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
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-01.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-02.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-03.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-04.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-05.jpg'
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
        'AK HÀN QUỐC.png',
        'Nhựa AK Hàn Quốc.png',
        'Nhựa AK Hàn Quốc (2).png',
        'SHCP.png'
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
        'Nhựa AK Hàn Quốc (2).png'
      ],
      problem: 'Cần một bộ hồ sơ năng lực 19 trang hoàn chỉnh, chuẩn mực kỹ thuật để tham gia đấu thầu các dự án tòa nhà, khách sạn và khu dân cư cao cấp.',
      solution: 'Thiết kế bố cục chuyên nghiệp từ Thư ngỏ, Sơ đồ tổ chức, Năng lực sản xuất máy móc CNC, Quy trình lắp đặt 16 bước, Chính sách bảo trì 24/7 đến các dự án công trình tiêu biểu (Bà Nà Hills, Dambri, Khách sạn Corvin).',
      tools: 'Biên soạn nội dung kỹ thuật, Thiết kế đồ họa In ấn (Print Ready CMYK), Bố cục Grid chuyên nghiệp.',
      impact: 'Bộ tài liệu chính thức giúp ban giám đốc nâng cao tỷ lệ trúng thầu và khẳng định vị thế thương hiệu với các chủ đầu tư xây dựng.'
    },
    'banner-15nam': {
      title: 'Thiết Kế Banner & Key Visual Kỷ Niệm 15 Năm Thành Lập',
      badge: 'Sự Kiện Doanh Nghiệp • Key Visual',
      images: [
        'banner kỷ niệm 15 năm thành lập công ty  final.jpg',
        'backdrop 2.jpg'
      ],
      problem: 'Sự kiện 15 năm là cột mốc trọng đại, yêu cầu hình ảnh trang trọng, thể hiện sự phát triển bền vững và lòng tri ân sâu sắc đến khách hàng & đối tác.',
      solution: 'Sử dụng tông màu vàng kim và xanh biển sâu sang trọng, lồng ghép con số 15 cách điệu và hiệu ứng ánh sáng nổi bật.',
      tools: 'Adobe Photoshop, Xử lý hiệu ứng ánh sáng 3D, Thiết kế khổ lớn Backdrop sân khấu & Banner Online.',
      impact: 'Được sử dụng làm Key Visual trung tâm cho toàn bộ chiến dịch truyền thông nội bộ và ngoại bộ của công ty.'
    },
    'poster-covua': {
      title: 'Poster Tài Trợ Chương Trình Phát Triển Trí Tuệ Cờ Vua',
      badge: 'CSR & Sự Kiện Thể Thao Trí Tuệ',
      images: [
        'POSTER TÀI TRỢ CHƯƠNG TRÌNH CỜ VUA 2 copy.jpg'
      ],
      problem: 'Truyền tải thông điệp tài trợ giáo dục và tư duy chiến lược cho thế hệ trẻ một cách mạnh mẽ, thu hút phụ huynh và học viên.',
      solution: 'Kết hợp hình ảnh quân cờ Vua và bố cục tương phản sắc nét, làm nổi bật thông điệp "Khơi Dậy Bản Lĩnh Trí Tuệ".',
      tools: 'Photoshop, Bố cục Typography, Thiết kế Poster truyền thông đa phương tiện.',
      impact: 'Tăng cường nhận diện thương hiệu nhà tài trợ và tiếp cận hàng nghìn gia đình trong khuôn khổ giải đấu.'
    },
    'banner-km': {
      title: 'Bộ Banner Khuyến Mãi & Backdrop Sân Khấu Kích Cầu',
      badge: 'Promotion & Sales Campaigns',
      images: [
        'banner khuyến mãi 2 - final .jpg',
        'backdrop 2.jpg'
      ],
      problem: 'Cần chiến dịch kích cầu bán lẻ và bán buôn nhanh chóng trong giai đoạn cao điểm mùa vụ.',
      solution: 'Thiết kế hệ thống banner đa kích thước (Web banner, Feed banner, Poster in ấn) với Call-to-Action rõ ràng, nhấn mạnh ưu đãi đặc biệt.',
      tools: 'Photoshop, Thiết kế chuyển đổi (Conversion-focused design), Phối màu kích thích hành vi mua.',
      impact: 'Góp phần thúc đẩy doanh số bán lẻ tăng 25% trong thời gian diễn ra chương trình khuyến mãi.'
    },
    'ai-creative-saas': {
      title: 'Sáng Tạo Ad Creative & Visual Đột Phá Bằng AI',
      badge: 'AI Art & SaaS Creative • Gemini / Midjourney',
      images: [
        'Gemini_Generated_Image_4hxhb14hxhb14hxh.png',
        'Gemini_Generated_Image_d5ocnid5ocnid5oc.png',
        'Gemini_Generated_Image_hvxbb4hvxbb4hvxb.png'
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
        'Gemini_Generated_Image_92ybj192ybj192yb.png',
        'Gemini_Generated_Image_um4h1dum4h1dum4h.png',
        'Gemini_Generated_Image_ybwp75ybwp75ybwp.png'
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
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-05.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-06.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-07.jpg',
        'Thiết kế truyền thông sức khỏa sinh sản/Galant-08.jpg'
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
        'ad_meea_trendy_cream.jpg'
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
        'ad_bbia_velvet_tint.jpg'
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
        'ad_weilaiya_shower_gel.jpg'
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
        'ad_nanoapo_paint_uuviet.jpg'
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
        'ad_kalpen_inox304_uuviet.jpg'
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
            <div class="gallery-strip-item ${idx === 0 ? 'active' : ''}" onclick="changeModalMainImg('${img}', this, ${idx})" title="${currentLang === 'vi' ? 'Xem ảnh ' + (idx + 1) : 'View image ' + (idx + 1)}">
              <img src="${img}" alt="thumbnail ${idx + 1}">
            </div>
          `).join('')}
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
      const filename = i >= 19 ? `Galant_${num}.jpg` : `Galant-${num}.jpg`;
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
          images.push(imgEl.getAttribute('src'));
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
      const filename = i >= 19 ? `Galant_${num}.jpg` : `Galant-${num}.jpg`;
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

});

