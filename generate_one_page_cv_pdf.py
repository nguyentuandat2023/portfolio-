import os
import sys
from fpdf import FPDF

# Ensure UTF-8 output
if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

class ModernCV(FPDF):
    def __init__(self):
        super().__init__(orientation='P', unit='mm', format='A4')
        self.set_auto_page_break(auto=False)
        self.set_margins(0, 0, 0)
        
        # Load Arial font with Vietnamese support on Windows
        font_dir = r"C:\Windows\Fonts"
        self.add_font("Arial", "", os.path.join(font_dir, "arial.ttf"))
        self.add_font("Arial", "B", os.path.join(font_dir, "arialbd.ttf"))
        self.add_font("Arial", "I", os.path.join(font_dir, "ariali.ttf"))
        self.add_font("Arial", "BI", os.path.join(font_dir, "arialbi.ttf"))

def hex_to_rgb(hex_str):
    hex_str = hex_str.lstrip('#')
    return tuple(int(hex_str[i:i+2], 16) for i in (0, 2, 4))

def create_vietnamese_cv():
    pdf = ModernCV()
    pdf.add_page()
    
    # Colors
    c_dark = (15, 23, 42)       # #0f172a
    c_blue = (29, 78, 216)      # #1d4ed8
    c_light_blue = (239, 246, 255) # #eff6ff
    c_sidebar_bg = (248, 250, 252) # #f8fafc
    c_text = (30, 41, 59)       # #1e293b
    c_muted = (100, 116, 139)   # #64748b
    c_white = (255, 255, 255)
    c_border = (226, 232, 240)  # #e2e8f0
    
    # 1. TOP HEADER (Height: 38mm)
    pdf.set_fill_color(*c_dark)
    pdf.rect(0, 0, 210, 36, 'F')
    
    # Top decorative line
    pdf.set_fill_color(37, 99, 235)
    pdf.rect(0, 36, 210, 1.5, 'F')
    
    # Header Content
    pdf.set_xy(12, 6)
    pdf.set_text_color(*c_white)
    pdf.set_font("Arial", "B", 18)
    pdf.cell(120, 7, "NGUYỄN TUẤN ĐẠT", ln=1)
    
    pdf.set_xy(12, 14)
    pdf.set_font("Arial", "B", 10.5)
    pdf.set_text_color(96, 165, 250) # Light blue
    pdf.cell(120, 5, "SENIOR CREATIVE DESIGNER & VISUAL MARKETING LEAD", ln=1)
    
    pdf.set_xy(12, 20)
    pdf.set_font("Arial", "", 8)
    pdf.set_text_color(203, 213, 225)
    pdf.cell(186, 4.5, "Chuyên sâu: Thiết kế Ad Creative CRO (30-40 Ads/Tháng) • Website WordPress • Web3 (Vite Code) • AI Automation", ln=1)
    
    # Contact Info Bar
    pdf.set_xy(12, 26)
    pdf.set_font("Arial", "B", 7.5)
    pdf.set_text_color(255, 255, 255)
    contact_str = "ĐT/Zalo: 0936 680 206   |   Email: nguyentuandat.tuandat@gmail.com   |   Web: nguyentuandat.lovable.app   |   TP.HCM (Remote 100%)"
    pdf.cell(186, 5, contact_str, ln=1)
    
    # 2. LEFT SIDEBAR BACKGROUND (X: 0 -> 72mm, Y: 37.5 -> 297mm)
    pdf.set_fill_color(*c_sidebar_bg)
    pdf.rect(0, 37.5, 72, 259.5, 'F')
    pdf.set_draw_color(*c_border)
    pdf.line(72, 37.5, 72, 297)
    
    # --- LEFT COLUMN CONTENT (X: 8, Width: 58) ---
    left_x = 8
    left_w = 58
    curr_y = 42
    
    # Section: Core Profile
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "MỤC TIÊU & CAM KẾT", ln=1)
    pdf.set_draw_color(*c_blue)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "", 7.5)
    pdf.set_text_color(*c_text)
    profile_text = (
        "10+ năm kinh nghiệm sáng tạo hình ảnh chuyển đổi (CRO) và xây dựng hệ thống Web. "
        "Cam kết duy trì tiến độ 30 - 40 Ad Creatives/tháng (tùy độ phức tạp), 2-3 ngày/Landing Page "
        "và sẵn sàng làm việc Remote 100% trong khung giờ hành chính (08:00 - 17:00)."
    )
    pdf.multi_cell(left_w, 3.6, profile_text)
    
    # Section: Toolkit & Skills
    curr_y = pdf.get_y() + 4
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "BỘ CÔNG CỤ THỰC CHIẾN", ln=1)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    skills = [
        ("Adobe Photoshop (Retouch, Ad CRO)", "98%"),
        ("Canva Pro (Social Ads, Brand Kit)", "96%"),
        ("CapCut Video (Reels, TikTok, Motion)", "95%"),
        ("Web WordPress & WooCommerce", "98%"),
        ("Web3 Interface & Vite Code", "95%"),
        ("Generative AI (ChatGPT, Gemini, Flow)", "98%"),
        ("SEO Onpage & Content Strategy", "95%"),
    ]
    for s_name, s_lvl in skills:
        pdf.set_xy(left_x, curr_y)
        pdf.set_font("Arial", "B", 7.2)
        pdf.set_text_color(*c_text)
        pdf.cell(left_w - 10, 3.5, s_name)
        pdf.set_font("Arial", "", 7)
        pdf.set_text_color(*c_blue)
        pdf.cell(10, 3.5, s_lvl, align='R', ln=1)
        curr_y += 4
    
    # Continuous Learning Tools
    curr_y += 1
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "BI", 7)
    pdf.set_text_color(*c_muted)
    pdf.multi_cell(left_w, 3.4, "* Đang nghiên cứu & mở rộng: Premiere Pro, Illustrator, Figma & Next-gen AI Tools.")
    
    # Section: Key Metrics
    curr_y = pdf.get_y() + 4
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "CHỈ SỐ NĂNG LỰC", ln=1)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    metrics = [
        ("30 - 40 Ads", "Sản xuất Ad Creatives / Tháng"),
        ("2 - 3 Ngày", "Hoàn thiện 1 Landing Page CRO"),
        ("28 Web Apps", "Nền tảng & Web đang chạy Live"),
        ("10+ Năm", "Kinh nghiệm thực chiến đa ngành"),
        ("+140% Traffic", "Tăng trưởng tương tác tự nhiên")
    ]
    for m_val, m_desc in metrics:
        pdf.set_xy(left_x, curr_y)
        pdf.set_font("Arial", "B", 8)
        pdf.set_text_color(*c_blue)
        pdf.cell(20, 3.8, m_val)
        pdf.set_font("Arial", "", 7)
        pdf.set_text_color(*c_text)
        pdf.cell(left_w - 20, 3.8, m_desc, ln=1)
        curr_y += 4.5
        
    # Section: Education & Authorship
    curr_y = pdf.get_y() + 3
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "HỌC VẤN & XUẤT BẢN", ln=1)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 7.5)
    pdf.set_text_color(*c_text)
    pdf.cell(left_w, 3.5, "Cử Nhân Quản Trị Kinh Doanh", ln=1)
    pdf.set_font("Arial", "", 7)
    pdf.set_text_color(*c_muted)
    pdf.cell(left_w, 3.5, "Đại học Công Nghệ TP.HCM (2010 - 2014)", ln=1)
    
    curr_y += 7.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 7.5)
    pdf.set_text_color(*c_text)
    pdf.cell(left_w, 3.5, "Tác Giả 3 Quyển Sách Về AI:", ln=1)
    pdf.set_font("Arial", "", 7)
    pdf.set_text_color(*c_muted)
    pdf.multi_cell(left_w, 3.4, "• Claude Toàn Tập (130 trang)\n• Claude Cho Người Mới (55 trang)\n• Biến Kiến Thức Thành Tiền (98 trang)")
    
    # Section: Brand Partners
    curr_y = pdf.get_y() + 3
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 8.5)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4, "ĐỐI TÁC TIÊU BIỂU", ln=1)
    pdf.line(left_x, curr_y + 4.5, left_x + left_w, curr_y + 4.5)
    
    curr_y += 5.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "", 6.8)
    pdf.set_text_color(*c_muted)
    pdf.multi_cell(left_w, 3.2, "Guardian, Bbia, MEEA Premium, Weilaiya, Tân Viễn Đông, Galant Clinic, G3VN, Tia Sáng, ROBO, UPOWER.")

    # --- RIGHT COLUMN CONTENT (X: 78, Width: 124) ---
    right_x = 78
    right_w = 124
    curr_ry = 42
    
    # Header: Work Experience
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 10.5)
    pdf.set_text_color(*c_blue)
    pdf.cell(right_w, 5, "KINH NGHIỆM LÀM VIỆC THỰC CHIẾN (10+ NĂM)", ln=1)
    pdf.set_draw_color(*c_blue)
    pdf.line(right_x, curr_ry + 5.5, right_x + right_w, curr_ry + 5.5)
    curr_ry += 7.5
    
    # Job 1
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Phụ Trách Marketing Tổng Thể & Creative Lead")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "27/09/2023 - Hiện tại", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Hệ Thống Tân Viễn Đông | Kiên Trung Long | Kiên Phi (Đóng tàu & Vật liệu Composite)", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job1_bullets = (
        "• Quản lý trực tiếp đội ngũ 3 nhân sự, phân bổ KPI thiết kế, sản xuất nội dung và quản trị 4 website.\n"
        "• Trực tiếp chụp ảnh, quay video quy trình sản xuất cơ khí, thiết kế toàn bộ Catalogue B2B, nhãn mác sản phẩm và Banner quảng cáo kích cầu.\n"
        "• Vận hành hệ thống website: tanviendong.vn, tanviendong.net, kienphi.com.vn, kientrunglong.com.vn.\n"
        "• Kết quả: Đạt đều đặn 30 - 50 cuộc gọi B2B/tháng đổ về từ kênh Online (SEO, Google Ads, Fanpage)."
    )
    pdf.multi_cell(right_w, 3.5, job1_bullets)
    
    # Job 2
    curr_ry = pdf.get_y() + 3
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Phụ Trách Marketing Online & Visual Media")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "10/2022 - 09/2023", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Công Ty Viễn Thông Tia Sáng (Giải pháp Chuyển đổi số & Thiết bị IoT - vienthongtiasang.com)", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job2_bullets = (
        "• Quản trị toàn diện website công ty, tối ưu cấu trúc SEO Onpage và nâng cao tốc độ tải trang.\n"
        "• Sản xuất ấn phẩm đồ họa, infographics kỹ thuật IoT và dựng video giới thiệu giải pháp công nghệ."
    )
    pdf.multi_cell(right_w, 3.5, job2_bullets)
    
    # Job 3
    curr_ry = pdf.get_y() + 3
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Chuyên Viên SEO & Quản Lý Nhóm Thiết Kế Nội Dung")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "12/2021 - 09/2022", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Phòng Khám Galant Clinic & Doanh Nghiệp Xã Hội G3VN (Hệ thống y tế uy tín TP.HCM)", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job3_bullets = (
        "• Quản lý nhóm 3 người, sáng tạo hơn 30+ bộ infographic y khoa và banner tuyên truyền sức khỏe.\n"
        "• Xây dựng và tối ưu cấu trúc dịch vụ cho 3 website: galantclinic.com, dieutrihiv.com, g3vn.com.\n"
        "• Kết quả: Tăng hơn 140% tương tác tự nhiên trên Fanpage, đưa hàng loạt từ khóa y tế lên TOP 1 Google."
    )
    pdf.multi_cell(right_w, 3.5, job3_bullets)
    
    # Job 4
    curr_ry = pdf.get_y() + 3
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Chuyên Viên Đồ Họa, SEO & Quản Trị Website")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "2015 - 2021", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Công ty Logicweb, CTCP Công Nghệ ROBO & Học Viện UPOWER", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job4_bullets = (
        "• Thiết kế lại giao diện thương mại điện tử robo.vn, quản trị hệ thống bài viết và chạy quảng cáo kích cầu.\n"
        "• Quản trị website upower.vn, thiết kế bộ nhận diện sự kiện và tài liệu đào tạo phát triển tư duy."
    )
    pdf.multi_cell(right_w, 3.5, job4_bullets)
    
    # Header: 28 Live Platforms Directory
    curr_ry = pdf.get_y() + 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 10.5)
    pdf.set_text_color(*c_blue)
    pdf.cell(right_w, 5, "DANH MỤC 28 WEBSITE & NỀN TẢNG ĐANG CHẠY THỰC TẾ (LIVE)", ln=1)
    pdf.set_draw_color(*c_blue)
    pdf.line(right_x, curr_ry + 5.5, right_x + right_w, curr_ry + 5.5)
    curr_ry += 7.5
    
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.2)
    pdf.set_text_color(*c_text)
    
    live_apps_summary = (
        "• Nền tảng AI & SaaS: lamchucongnghe.lovable.app • mastersaleai.lovable.app • ungdungchatgptimage2.lovable.app • dataimarketing.lovable.app • taonhieuemail.lovable.app • bienmoithuthanhtien.lovable.app • taithietsunghiepcungai.lovable.app\n"
        "• Khóa học & Đào tạo: gioithieukolaisystem.lovable.app • kolaistudio.lovable.app • workshopkolaisystem.lovable.app • khoahocaffiliate.lovable.app • khoahocsamebook.lovable.app • xaydungthuonghieucanhanbangai.lovable.app\n"
        "• Dịch vụ & Ebook: dichvuthietkelandingpage.lovable.app • gioithieuebookclaudetoantap.lovable.app • bienkienthucthanhtien.lovable.app • lamvieccungdatai.lovable.app • nguyentuandat.lovable.app\n"
        "• Doanh nghiệp B2B: tanviendong.vn • tanviendong.net • kienphi.com.vn • kientrunglong.com.vn • galantclinic.com • dieutrihiv.com • g3vn.com • vienthongtiasang.com • robo.vn • upower.vn"
    )
    pdf.multi_cell(right_w, 3.6, live_apps_summary)
    
    # Save
    out_path = "CV_NguyenTuanDat_SeniorCreativeDesigner_1Page_VI.pdf"
    pdf.output(out_path)
    print(f"[SUCCESS] Generated Vietnamese 1-Page CV: {out_path}")

def create_english_cv():
    pdf = ModernCV()
    pdf.add_page()
    
    # Colors
    c_dark = (15, 23, 42)       # #0f172a
    c_blue = (29, 78, 216)      # #1d4ed8
    c_sidebar_bg = (248, 250, 252) # #f8fafc
    c_text = (30, 41, 59)       # #1e293b
    c_muted = (100, 116, 139)   # #64748b
    c_white = (255, 255, 255)
    c_border = (226, 232, 240)  # #e2e8f0
    
    # 1. TOP HEADER (Height: 38mm)
    pdf.set_fill_color(*c_dark)
    pdf.rect(0, 0, 210, 36, 'F')
    
    # Top decorative line
    pdf.set_fill_color(37, 99, 235)
    pdf.rect(0, 36, 210, 1.5, 'F')
    
    # Header Content
    pdf.set_xy(12, 6)
    pdf.set_text_color(*c_white)
    pdf.set_font("Arial", "B", 18)
    pdf.cell(120, 7, "NGUYEN TUAN DAT", ln=1)
    
    pdf.set_xy(12, 14)
    pdf.set_font("Arial", "B", 10.5)
    pdf.set_text_color(96, 165, 250)
    pdf.cell(120, 5, "SENIOR CREATIVE DESIGNER & VISUAL MARKETING LEAD", ln=1)
    
    pdf.set_xy(12, 20)
    pdf.set_font("Arial", "", 8)
    pdf.set_text_color(203, 213, 225)
    pdf.cell(186, 4.5, "Specialization: CRO Ad Creatives (30-40 Ads/Mo) • WordPress Websites • Web3 (Vite Code) • AI Automation", ln=1)
    
    # Contact Info Bar
    pdf.set_xy(12, 26)
    pdf.set_font("Arial", "B", 7.5)
    pdf.set_text_color(255, 255, 255)
    contact_str = "Phone/WhatsApp/Zalo: (+84) 936 680 206   |   Email: nguyentuandat.tuandat@gmail.com   |   Web: nguyentuandat.lovable.app"
    pdf.cell(186, 5, contact_str, ln=1)
    
    # 2. LEFT SIDEBAR BACKGROUND
    pdf.set_fill_color(*c_sidebar_bg)
    pdf.rect(0, 37.5, 72, 259.5, 'F')
    pdf.set_draw_color(*c_border)
    pdf.line(72, 37.5, 72, 297)
    
    # --- LEFT COLUMN CONTENT ---
    left_x = 8
    left_w = 58
    curr_y = 42
    
    # Section: Executive Summary
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "EXECUTIVE SUMMARY", ln=1)
    pdf.set_draw_color(*c_blue)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "", 7.5)
    pdf.set_text_color(*c_text)
    profile_text = (
        "10+ years of proven expertise in high-conversion Visual Design (CRO) and full-cycle Web development. "
        "Reliably delivering 30 - 40 high-impact Ad Creatives/month (by complexity), 2-3 days per Landing Page, "
        "and 100% Remote-ready for global teams (US, UK, AU)."
    )
    pdf.multi_cell(left_w, 3.6, profile_text)
    
    # Section: Core Toolkit
    curr_y = pdf.get_y() + 4
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "TECHNICAL TOOLKIT", ln=1)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    skills = [
        ("Adobe Photoshop (Retouch, Ad CRO)", "98%"),
        ("Canva Pro (Social Ads, Brand Kit)", "96%"),
        ("CapCut Video (Reels, TikTok, Motion)", "95%"),
        ("Web WordPress & WooCommerce", "98%"),
        ("Web3 Interface & Vite Code", "95%"),
        ("Generative AI (ChatGPT, Gemini, Flow)", "98%"),
        ("SEO Architecture & CRO Strategy", "95%"),
    ]
    for s_name, s_lvl in skills:
        pdf.set_xy(left_x, curr_y)
        pdf.set_font("Arial", "B", 7.2)
        pdf.set_text_color(*c_text)
        pdf.cell(left_w - 10, 3.5, s_name)
        pdf.set_font("Arial", "", 7)
        pdf.set_text_color(*c_blue)
        pdf.cell(10, 3.5, s_lvl, align='R', ln=1)
        curr_y += 4
    
    # Continuous Learning Tools
    curr_y += 1
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "BI", 7)
    pdf.set_text_color(*c_muted)
    pdf.multi_cell(left_w, 3.4, "* Continuously mastering: Premiere Pro, Illustrator, Figma & Next-gen AI Tools.")
    
    # Section: Key Deliverables
    curr_y = pdf.get_y() + 4
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "KEY DELIVERABLES", ln=1)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    metrics = [
        ("30 - 40 Ads", "Monthly Ad Output (by complexity)"),
        ("2 - 3 Days", "Turnaround per CRO Landing Page"),
        ("28 Web Apps", "Live platforms in active production"),
        ("10+ Years", "Cross-industry track record"),
        ("+140% Growth", "Surge in organic audience engagement")
    ]
    for m_val, m_desc in metrics:
        pdf.set_xy(left_x, curr_y)
        pdf.set_font("Arial", "B", 8)
        pdf.set_text_color(*c_blue)
        pdf.cell(20, 3.8, m_val)
        pdf.set_font("Arial", "", 7)
        pdf.set_text_color(*c_text)
        pdf.cell(left_w - 20, 3.8, m_desc, ln=1)
        curr_y += 4.5
        
    # Section: Education & Authorship
    curr_y = pdf.get_y() + 3
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 9)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4.5, "EDUCATION & BOOKS", ln=1)
    pdf.line(left_x, curr_y + 5, left_x + left_w, curr_y + 5)
    
    curr_y += 6.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 7.5)
    pdf.set_text_color(*c_text)
    pdf.cell(left_w, 3.5, "Bachelor of Business Administration", ln=1)
    pdf.set_font("Arial", "", 7)
    pdf.set_text_color(*c_muted)
    pdf.cell(left_w, 3.5, "HUTECH University (2010 - 2014)", ln=1)
    
    curr_y += 7.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 7.5)
    pdf.set_text_color(*c_text)
    pdf.cell(left_w, 3.5, "Author of 3 Published AI Books:", ln=1)
    pdf.set_font("Arial", "", 7)
    pdf.set_text_color(*c_muted)
    pdf.multi_cell(left_w, 3.4, "• Claude AI Complete Mastery (130 p.)\n• Claude for Beginners (55 p.)\n• Monetize Your Knowledge (98 p.)")

    # Section: Partner Brands
    curr_y = pdf.get_y() + 3
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "B", 8.5)
    pdf.set_text_color(*c_blue)
    pdf.cell(left_w, 4, "CLIENT BRANDS", ln=1)
    pdf.line(left_x, curr_y + 4.5, left_x + left_w, curr_y + 4.5)
    
    curr_y += 5.5
    pdf.set_xy(left_x, curr_y)
    pdf.set_font("Arial", "", 6.8)
    pdf.set_text_color(*c_muted)
    pdf.multi_cell(left_w, 3.2, "Guardian, Bbia, MEEA Premium, Weilaiya, Tan Vien Dong, Galant Clinic, G3VN, Tia Sang, ROBO, UPOWER.")

    # --- RIGHT COLUMN CONTENT ---
    right_x = 78
    right_w = 124
    curr_ry = 42
    
    # Header: Work Experience
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 10.5)
    pdf.set_text_color(*c_blue)
    pdf.cell(right_w, 5, "PROFESSIONAL EXPERIENCE (10+ YEARS)", ln=1)
    pdf.set_draw_color(*c_blue)
    pdf.line(right_x, curr_ry + 5.5, right_x + right_w, curr_ry + 5.5)
    curr_ry += 7.5
    
    # Job 1
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Head of Marketing & Creative Lead")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "09/2023 - Present", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Tan Vien Dong Marine System & Composite Material Network", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job1_bullets = (
        "• Supervised 3 in-house creative staff, allocated sprint KPIs, and managed 4 corporate web portals.\n"
        "• Conducted direct shipyard photography/filming, designed full B2B product catalogues, packaging labels, and conversion ad banners.\n"
        "• Maintained 4 live websites: tanviendong.vn, tanviendong.net, kienphi.com.vn, kientrunglong.com.vn.\n"
        "• Impact: Consistently generated 30 - 50 qualified B2B sales leads monthly via digital channels."
    )
    pdf.multi_cell(right_w, 3.5, job1_bullets)
    
    # Job 2
    curr_ry = pdf.get_y() + 3
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Online Marketing & Visual Media Specialist")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "10/2022 - 09/2023", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Tia Sang Telecom (Digital Transformation & IoT Enterprise Solutions - vienthongtiasang.com)", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job2_bullets = (
        "• Maintained corporate website architecture, optimized on-page SEO parameters, and boosted load speeds.\n"
        "• Produced technical IoT infographics, marketing visual assets, and explainer motion clips."
    )
    pdf.multi_cell(right_w, 3.5, job2_bullets)
    
    # Job 3
    curr_ry = pdf.get_y() + 3
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Senior SEO Specialist & Creative Team Lead")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "12/2021 - 09/2022", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Galant Medical Clinic & G3VN Social Enterprise", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job3_bullets = (
        "• Managed 3 creative writers and designers, producing 30+ medical infographic series and campaigns.\n"
        "• Designed and optimized architecture for 3 websites: galantclinic.com, dieutrihiv.com, g3vn.com.\n"
        "• Impact: Increased organic social engagement by 140%, securing Top 1 Google rankings for key terms."
    )
    pdf.multi_cell(right_w, 3.5, job3_bullets)
    
    # Job 4
    curr_ry = pdf.get_y() + 3
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 8.8)
    pdf.set_text_color(*c_dark)
    pdf.cell(85, 4.2, "Graphic Designer, Webmaster & SEO Specialist")
    pdf.set_font("Arial", "B", 7.8)
    pdf.set_text_color(*c_blue)
    pdf.cell(39, 4.2, "2015 - 2021", align='R', ln=1)
    
    curr_ry += 4.2
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "I", 7.8)
    pdf.set_text_color(*c_muted)
    pdf.cell(right_w, 3.8, "Logicweb Co., ROBO Technology Corp & UPOWER Academy", ln=1)
    
    curr_ry += 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.4)
    pdf.set_text_color(*c_text)
    job4_bullets = (
        "• Redesigned e-commerce portal robo.vn, managed content infrastructure, and ran high-ROAS ad campaigns.\n"
        "• Managed upower.vn, developed corporate event branding, training assets, and marketing collateral."
    )
    pdf.multi_cell(right_w, 3.5, job4_bullets)
    
    # Header: 28 Live Platforms Directory
    curr_ry = pdf.get_y() + 4
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "B", 10.5)
    pdf.set_text_color(*c_blue)
    pdf.cell(right_w, 5, "DIRECTORY OF 28 PRODUCTION LIVE PLATFORMS & APPS", ln=1)
    pdf.set_draw_color(*c_blue)
    pdf.line(right_x, curr_ry + 5.5, right_x + right_w, curr_ry + 5.5)
    curr_ry += 7.5
    
    pdf.set_xy(right_x, curr_ry)
    pdf.set_font("Arial", "", 7.2)
    pdf.set_text_color(*c_text)
    
    live_apps_summary = (
        "• AI & SaaS Apps: lamchucongnghe.lovable.app • mastersaleai.lovable.app • ungdungchatgptimage2.lovable.app • dataimarketing.lovable.app • taonhieuemail.lovable.app • bienmoithuthanhtien.lovable.app • taithietsunghiepcungai.lovable.app\n"
        "• Courses & Training: gioithieukolaisystem.lovable.app • kolaistudio.lovable.app • workshopkolaisystem.lovable.app • khoahocaffiliate.lovable.app • khoahocsamebook.lovable.app • xaydungthuonghieucanhanbangai.lovable.app\n"
        "• Services & Ebooks: dichvuthietkelandingpage.lovable.app • gioithieuebookclaudetoantap.lovable.app • bienkienthucthanhtien.lovable.app • lamvieccungdatai.lovable.app • nguyentuandat.lovable.app\n"
        "• B2B Enterprise: tanviendong.vn • tanviendong.net • kienphi.com.vn • kientrunglong.com.vn • galantclinic.com • dieutrihiv.com • g3vn.com • vienthongtiasang.com • robo.vn • upower.vn"
    )
    pdf.multi_cell(right_w, 3.6, live_apps_summary)
    
    # Save
    out_path = "CV_NguyenTuanDat_SeniorCreativeDesigner_1Page_EN.pdf"
    pdf.output(out_path)
    print(f"[SUCCESS] Generated English 1-Page CV: {out_path}")

if __name__ == "__main__":
    create_vietnamese_cv()
    create_english_cv()
