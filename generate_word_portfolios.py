import os
import sys
import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import parse_xml
from docx.oxml.ns import nsdecls

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def set_cell_background(cell, fill_hex):
    tcPr = cell._tc.get_or_add_tcPr()
    shd = parse_xml(f'<w:shd {nsdecls("w")} w:fill="{fill_hex}"/>')
    tcPr.append(shd)

def set_cell_margins(cell, top=100, bottom=100, left=120, right=120):
    tcPr = cell._tc.get_or_add_tcPr()
    tcMar = parse_xml(f'<w:tcMar {nsdecls("w")}><w:top w:w="{top}" w:type="dxa"/><w:bottom w:w="{bottom}" w:type="dxa"/><w:left w:w="{left}" w:type="dxa"/><w:right w:w="{right}" w:type="dxa"/></w:tcMar>')
    tcPr.append(tcMar)

def add_heading_styled(doc, text, level=1):
    h = doc.add_heading(level=level)
    run = h.add_run(text)
    if level == 1:
        h.paragraph_format.space_before = Pt(16)
        h.paragraph_format.space_after = Pt(6)
        run.font.name = 'Arial'
        run.font.size = Pt(13.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(29, 78, 216) # Royal Blue
    elif level == 2:
        h.paragraph_format.space_before = Pt(12)
        h.paragraph_format.space_after = Pt(4)
        run.font.name = 'Arial'
        run.font.size = Pt(11.5)
        run.font.bold = True
        run.font.color.rgb = RGBColor(15, 23, 42) # Slate Dark
    elif level == 3:
        h.paragraph_format.space_before = Pt(8)
        h.paragraph_format.space_after = Pt(2)
        run.font.name = 'Arial'
        run.font.size = Pt(10)
        run.font.bold = True
        run.font.color.rgb = RGBColor(37, 99, 235)
    return h

def add_image_safe(doc, img_path, width=Inches(4.5), caption=None):
    full_path = os.path.join(BASE_DIR, img_path) if not os.path.isabs(img_path) else img_path
    if os.path.exists(full_path):
        try:
            p = doc.add_paragraph()
            p.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p.paragraph_format.space_before = Pt(4)
            p.paragraph_format.space_after = Pt(2)
            run = p.add_run()
            run.add_picture(full_path, width=width)
            if caption:
                cp = doc.add_paragraph()
                cp.alignment = WD_ALIGN_PARAGRAPH.CENTER
                cp.paragraph_format.space_after = Pt(8)
                crun = cp.add_run(caption)
                crun.font.size = Pt(8.5)
                crun.font.italic = True
                crun.font.color.rgb = RGBColor(100, 116, 139)
        except Exception as e:
            print(f"Error adding picture {img_path}: {e}")

def add_two_images_grid(doc, img1_path, cap1, img2_path, cap2, width=Inches(3.1)):
    p1 = os.path.join(BASE_DIR, img1_path) if not os.path.isabs(img1_path) else img1_path
    p2 = os.path.join(BASE_DIR, img2_path) if not os.path.isabs(img2_path) else img2_path
    
    if os.path.exists(p1) and os.path.exists(p2):
        try:
            table = doc.add_table(rows=2, cols=2)
            table.alignment = WD_TABLE_ALIGNMENT.CENTER
            
            # Row 0: Images
            c00 = table.cell(0, 0)
            c01 = table.cell(0, 1)
            c00.width = Inches(3.3)
            c01.width = Inches(3.3)
            set_cell_margins(c00, top=40, bottom=40, left=40, right=40)
            set_cell_margins(c01, top=40, bottom=40, left=40, right=40)
            
            p_img1 = c00.paragraphs[0]
            p_img1.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img1.add_run().add_picture(p1, width=width)
            
            p_img2 = c01.paragraphs[0]
            p_img2.alignment = WD_ALIGN_PARAGRAPH.CENTER
            p_img2.add_run().add_picture(p2, width=width)
            
            # Row 1: Captions
            c10 = table.cell(1, 0)
            c11 = table.cell(1, 1)
            c10.width = Inches(3.3)
            c11.width = Inches(3.3)
            set_cell_margins(c10, top=20, bottom=60, left=40, right=40)
            set_cell_margins(c11, top=20, bottom=60, left=40, right=40)
            
            p_cap1 = c10.paragraphs[0]
            p_cap1.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r1 = p_cap1.add_run(cap1)
            r1.font.size = Pt(8.5)
            r1.font.italic = True
            r1.font.color.rgb = RGBColor(100, 116, 139)
            
            p_cap2 = c11.paragraphs[0]
            p_cap2.alignment = WD_ALIGN_PARAGRAPH.CENTER
            r2 = p_cap2.add_run(cap2)
            r2.font.size = Pt(8.5)
            r2.font.italic = True
            r2.font.color.rgb = RGBColor(100, 116, 139)
            
            doc.add_paragraph().paragraph_format.space_after = Pt(4)
        except Exception as e:
            print(f"Error creating grid: {e}")

def safe_save_doc(doc, target_filename):
    target_path = os.path.join(BASE_DIR, target_filename)
    try:
        doc.save(target_path)
        print(f"[SUCCESS] Saved directly to: {target_filename}")
        return
    except PermissionError:
        pass
    
    # Try alternative candidate filenames
    base_name, ext = os.path.splitext(target_filename)
    candidates = [
        f"{base_name}_Final{ext}",
        f"{base_name}_New{ext}",
        f"{base_name}_v2{ext}",
        f"{base_name}_Updated{ext}"
    ]
    for cand in candidates:
        cand_path = os.path.join(BASE_DIR, cand)
        try:
            doc.save(cand_path)
            print(f"[WARNING] {target_filename} is open in Word. Saved to: {cand}")
            return
        except PermissionError:
            continue
    print(f"[ERROR] Could not save {target_filename} due to Word lock on all candidate names.")

# ==============================================================================
# 1. VIETNAMESE WORD DOCUMENT GENERATOR
# ==============================================================================
def generate_vietnamese_portfolio_with_images():
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(0.7)
        section.bottom_margin = Inches(0.7)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Title Block
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_after = Pt(2)
    run_name = title_p.add_run("NGUYỄN TUẤN ĐẠT")
    run_name.font.name = 'Arial'
    run_name.font.size = Pt(22)
    run_name.font.bold = True
    run_name.font.color.rgb = RGBColor(15, 23, 42)

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_after = Pt(8)
    run_sub = sub_p.add_run("SENIOR CREATIVE DESIGNER & VISUAL MARKETING LEAD")
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(11)
    run_sub.font.bold = True
    run_sub.font.color.rgb = RGBColor(37, 99, 235)

    contact_p = doc.add_paragraph()
    contact_p.paragraph_format.space_after = Pt(12)
    c_run = contact_p.add_run("📍 TP. Hồ Chí Minh  |  📞 0936 680 206  |  ✉️ nguyentuandat.tuandat@gmail.com  |  🌐 Zalo: zalo.me/0936680206")
    c_run.font.size = Pt(9.5)
    c_run.font.color.rgb = RGBColor(71, 85, 105)

    # Divider Table
    div_table = doc.add_table(rows=1, cols=1)
    div_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    div_cell = div_table.cell(0, 0)
    set_cell_background(div_cell, "2563eb")
    div_cell.width = Inches(6.9)
    div_cell.paragraphs[0].paragraph_format.space_before = Pt(1)
    div_cell.paragraphs[0].paragraph_format.space_after = Pt(1)

    # 1. TỔNG QUAN NĂNG LỰC
    add_heading_styled(doc, "1. TÓM TẮT NĂNG LỰC & ĐỊNH VỊ CHUYÊN MÔN", level=1)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.2
    run = p.add_run(
        "Hơn 10 năm kinh nghiệm thực chiến trong lĩnh vực Visual Design, Ad Creative hiệu suất cao, Thiết kế Website WordPress chuẩn SEO và Phát triển Giao diện Web3 / DApp bằng Vite code hiện đại. "
        "Thế mạnh chuyên sâu về các sản phẩm SaaS, AI Technology và Thương mại điện tử (eCommerce) phục vụ thị trường quốc tế (US, UK, AU...).\n\n"
        "Cam kết năng suất cao: Tự chủ sản xuất 30 - 40 Ad Creatives/tháng (tùy mức độ phức tạp của sản phẩm, đa định dạng Feed, Stories, Reels, Carousels) và hoàn thiện trọn gói Product Landing Page / Website trong 2 - 3 ngày. "
        "Làm chủ Adobe Photoshop, Canva, CapCut, WordPress, Vite Code kết hợp sức mạnh vượt trội của các công cụ AI (ChatGPT, Gemini, Flow) và không ngừng mở rộng nghiên cứu Premiere Pro, Illustrator, Figma giúp tối ưu hóa quy trình thiết kế và tăng tốc độ sản xuất x5 lần."
    )
    run.font.size = Pt(9.5)

    # 2. KHU VỰC THIẾT KẾ AD CREATIVE (NHÓM 1)
    add_heading_styled(doc, "2. NHÓM 1: AD CREATIVE (FACEBOOK / INSTAGRAM FEED & STORIES)", level=1)

    # 1. Ad SaaS Hero
    add_heading_styled(doc, "1. Ad Sản Phẩm SaaS/AI — Bố Cục Hero Mạnh (Tỉ Lệ 1:1)", level=2)
    add_two_images_grid(doc, 
                        "01_ad_saas_hero_1x1.png", "Ad 1: Concept Hero SaaS & Glassmorphic Dashboard (1:1)",
                        "Gemini_Generated_Image_4hxhb14hxhb14hxh.png", "Ad 1B: AI Data Intelligence & Analytics Visual",
                        width=Inches(3.1))

    # 2. Ad Before / After
    add_heading_styled(doc, "2. Ad Kiểu Trước/Sau Hoặc Số Liệu (Tỉ Lệ 1:1 Before/After)", level=2)
    add_two_images_grid(doc,
                        "02_ad_before_after_1x1.png", "Ad 2: Before/After & 5x Automation Speed Comparison (1:1)",
                        "ChatGPT Image 11_48_42 24 thg 4, 2026.png", "Ad 2B: Real-world Productivity Benchmarking",
                        width=Inches(3.1))

    # 3. Ad Testimonial
    add_heading_styled(doc, "3. Ad Có Yếu Tố Con Người / Testimonial & Trust (Tỉ Lệ 1:1)", level=2)
    add_two_images_grid(doc,
                        "03_ad_human_testimonial_1x1.png", "Ad 3: Trust Testimonial & 5-Star Social Proof Mockup",
                        "644157104_122126366757126154_1000207496340268619_n.jpg", "Ad 3B: Executive Profile & Business Leadership Presentation",
                        width=Inches(3.1))

    # 4. Ad Stories / Reels
    add_heading_styled(doc, "4. Ad Stories/Reels Dọc — Cảm Giác Khẩn Cấp (Tỉ Lệ 9:16)", level=2)
    add_two_images_grid(doc,
                        "04_ad_stories_urgency_9x16.png", "Ad 4: Mobile Vertical Stories & Urgency Badge (9:16)",
                        "z7789441773455_5d4b7f7271d14bc3462522ae2b126331.jpg", "Ad 4B: Vertical Limited-Time CTA Swipe-Up Layout",
                        width=Inches(3.1))

    # 5. Ad Feature Spotlight
    add_heading_styled(doc, "5. Ad Giới Thiệu Tính Năng AI Cụ Thể (Tỉ Lệ 1:1)", level=2)
    add_two_images_grid(doc,
                        "05_ad_ai_feature_spotlight_1x1.png", "Ad 5: Core Neural Network & AI Synaptic Grid (1:1)",
                        "Gemini_Generated_Image_hvxbb4hvxbb4hvxb.png", "Ad 5B: AI Feature Spotlight & Visual Branding",
                        width=Inches(3.1))

    # 3. NHÓM 2: LANDING PAGE (HERO / FEATURE / CTA)
    add_heading_styled(doc, "3. NHÓM 2: THIẾT KẾ PRODUCT LANDING PAGE (HERO / FEATURE / CTA)", level=1)

    # 6. Hero Section
    add_heading_styled(doc, "6. Hero Section — Desktop Web Layout (1440x900px)", level=2)
    add_image_safe(doc, "06_lp_hero_section_1440x900.png", width=Inches(5.8), caption="Landing Page 6: Hero Section Desktop Layout (1440x900px)")

    # 7. Feature Section
    add_heading_styled(doc, "7. Feature Introduction Section — Grid 3 Cột Hiện Đại", level=2)
    add_image_safe(doc, "07_lp_feature_section_grid.png", width=Inches(5.8), caption="Landing Page 7: 3-Column Feature Matrix & Tech Specifications")

    # 8. Sign-up CTA Section
    add_heading_styled(doc, "8. Sign-up CTA Section — Khối Kích Thích Chuyển Đổi Cuối Trang", level=2)
    add_image_safe(doc, "08_lp_signup_cta_block.png", width=Inches(5.8), caption="Landing Page 8: Bottom Sign-up CTA Block (Centered High-Conversion)")

    # 4. CÁC ẤN PHẨM THIẾT KẾ THỰC TẾ (HEALTH, B2B, EVENTS)
    add_heading_styled(doc, "4. BỘ SƯU TẬP ẤN PHẨM THỰC CHIẾN ĐÃ THỰC HIỆN", level=1)

    # Galant Health Series
    add_heading_styled(doc, "A. Chiến Dịch Truyền Thông Sức Khỏe Galant Clinic (30+ Ấn Phẩm)", level=2)
    add_two_images_grid(doc,
                        "Thiết kế truyền thông sức khỏa sinh sản/Galant-01.jpg", "Galant Health #01: Infographic Y Tế & Chăm Sóc Sức Khỏe",
                        "Thiết kế truyền thông sức khỏa sinh sản/Galant-05.jpg", "Galant Health #05: Bố Cục Chuyên Đề & Nhận Diện Y Khoa",
                        width=Inches(3.1))

    # Event Banners & Posters
    add_heading_styled(doc, "B. Key Visual & Banner Sự Kiện Doanh Nghiệp (15 Năm & Cờ Vua)", level=2)
    add_two_images_grid(doc,
                        "banner kỷ niệm 15 năm thành lập công ty  final.jpg", "Event Banner: Key Visual Lễ Kỷ Niệm 15 Năm Thành Lập",
                        "POSTER TÀI TRỢ CHƯƠNG TRÌNH CỜ VUA 2 copy.jpg", "Poster Truyền Thông: Chương Trình Tài Trợ Phát Triển Trí Tuệ Cờ Vua",
                        width=Inches(3.1))

    # B2B Brand Identity & Sales Materials
    add_heading_styled(doc, "C. Hệ Thống Nhận Diện B2B & Tài Liệu Bán Hàng (Tân Viễn Đông / Composite)", level=2)
    add_two_images_grid(doc,
                        "AK HÀN QUỐC.png", "B2B Branding: Nhãn Mác & Bao Bì Sản Phẩm Nhựa AK Hàn Quốc",
                        "SHCP.png", "B2B Catalogue: Tài Liệu Vật Liệu Composite & Sợi Thủy Tinh SHCP",
                        width=Inches(3.1))

    # eCommerce Beauty & Cosmetics (MEEA, Bbia, Weilaiya)
    add_heading_styled(doc, "D. Thiết Kế Ad Creative Mỹ Phẩm & Chăm Sóc Sắc Đẹp (MEEA, Bbia, Weilaiya)", level=2)
    add_two_images_grid(doc,
                        "ad_meea_trendy_cream.jpg", "MEEA Premium: Kem Dưỡng Trendy - Ủ Dịch Chiết Lên Men (Tím Trendy)",
                        "ad_bbia_velvet_tint.jpg", "Guardian Official / Bbia: Son Kem Lì Last Velvet Tint #01 Đỏ Gạch",
                        width=Inches(3.1))
    add_two_images_grid(doc,
                        "ad_weilaiya_shower_gel.jpg", "Guardian Official / Weilaiya: Sữa Tắm Nước Hoa Tinh Chất Hoa Hồng 450ML",
                        "ad_kalpen_inox304_uuviet.jpg", "Kalpen Đức: Nồi Inox 304 An Toàn Sức Khỏe Tiêu Chuẩn Châu Âu - Phân Phối Ưu Việt",
                        width=Inches(3.1))

    # Exterior Paint & Materials (Nano APO)
    add_heading_styled(doc, "E. Poster & Key Visual Sơn Cao Cấp (Nano APO Diamond Nano)", level=2)
    add_image_safe(doc, "ad_nanoapo_paint_uuviet.jpg", width=Inches(4.5), caption="Nano APO Paint of England: Sơn Siêu Bóng Ngoại Thất Diamond Nano - Phân Phối Chính Hãng Ưu Việt")

    # 5. DANH SÁCH 30+ LIVE WEBSITES
    add_heading_styled(doc, "5. DANH MỤC 30+ WEBSITE & LANDING PAGE ĐANG CHẠY LIVE", level=1)
    
    web_sites = [
        ("Làm Chủ Công Nghệ AI Hub", "https://lamchucongnghe.lovable.app/"),
        ("Tái Thiết Sự Nghiệp Cùng AI", "https://taithietsunghiepcungai.lovable.app/"),
        ("Biến Mọi Thứ Thành Tiền", "https://bienmoithuthanhtien.lovable.app/"),
        ("Master Sale AI Automation", "https://mastersaleai.lovable.app"),
        ("Ứng Dụng ChatGPT Image 2", "https://ungdungchatgptimage2.lovable.app"),
        ("Xây Dựng Thương Hiệu Cá Nhân Bằng AI", "https://xaydungthuonghieucanhanbangai.lovable.app"),
        ("Nguyễn Tuấn Đạt Portfolio Official", "https://nguyentuandat.lovable.app"),
        ("Đạt AI Marketing Agency Hub", "https://dataimarketing.lovable.app/"),
        ("Tạo Nhiều Email Marketing System", "https://taonhieuemail.lovable.app"),
        ("Khóa Học Affiliate Marketing", "https://khoahocaffiliate.lovable.app/"),
        ("KOL AI System Intro", "https://gioithieukolaisystem.lovable.app"),
        ("KOL AI Studio Production", "https://kolaistudio.lovable.app"),
        ("Workshop KOL AI System", "https://workshopkolaisystem.lovable.app"),
        ("Làm Việc Cùng Đạt AI (Consulting)", "https://lamvieccungdatai.lovable.app"),
        ("Khóa Học Làm Ebook Chuyên Nghiệp", "https://khoahocsamebook.lovable.app/"),
        ("Dịch Vụ Thiết Kế Landing Page (CRO)", "https://dichvuthietkelandingpage.lovable.app"),
        ("Ebook Claude Toàn Tập (130 Trang)", "https://gioithieuebookclaudetoantap.lovable.app/"),
        ("Ebook Biến Kiến Thức Thành Tiền", "https://bienkienthucthanhtien.lovable.app/"),
        ("Hệ Thống Đóng Tàu Tân Viễn Đông", "https://tanviendong.vn"),
        ("Tân Viễn Đông Composite B2B Portal", "https://tanviendong.net"),
        ("Kiên Phi Composite B2B", "https://kienphi.com.vn"),
        ("Kiên Trung Long Composite", "https://kientrunglong.com.vn"),
        ("Hệ Thống Y Tế Galant Clinic", "https://galantclinic.com"),
        ("Trang Y Khoa Điều Trị HIV", "https://dieutrihiv.com"),
        ("Doanh Nghiệp Xã Hội G3VN", "https://g3vn.com"),
        ("Viễn Thông Tia Sáng IoT Solutions", "https://vienthongtiasang.com"),
        ("CTCP Công Nghệ ROBO E-commerce", "https://robo.vn"),
        ("Học Viện Kỹ Năng & Tư Duy UPOWER", "https://upower.vn")
    ]
    for n, u in web_sites:
        wp = doc.add_paragraph()
        wp.paragraph_format.space_after = Pt(2)
        wp.paragraph_format.left_indent = Inches(0.2)
        rn = wp.add_run(f"• {n}: ")
        rn.font.size = Pt(9)
        rn.font.bold = True
        ru = wp.add_run(u)
        ru.font.size = Pt(9)
        ru.font.color.rgb = RGBColor(37, 99, 235)

    safe_save_doc(doc, "Portfolio_NguyenTuanDat_SeniorGraphicDesigner_VI.docx")

# ==============================================================================
# 2. ENGLISH WORD DOCUMENT GENERATOR
# ==============================================================================
def generate_english_portfolio_with_images():
    doc = docx.Document()
    
    for section in doc.sections:
        section.top_margin = Inches(0.7)
        section.bottom_margin = Inches(0.7)
        section.left_margin = Inches(0.8)
        section.right_margin = Inches(0.8)

    # Title Block
    title_p = doc.add_paragraph()
    title_p.paragraph_format.space_after = Pt(2)
    run_name = title_p.add_run("NGUYEN TUAN DAT")
    run_name.font.name = 'Arial'
    run_name.font.size = Pt(22)
    run_name.font.bold = True
    run_name.font.color.rgb = RGBColor(15, 23, 42)

    sub_p = doc.add_paragraph()
    sub_p.paragraph_format.space_after = Pt(8)
    run_sub = sub_p.add_run("SENIOR CREATIVE DESIGNER & VISUAL MARKETING LEAD")
    run_sub.font.name = 'Arial'
    run_sub.font.size = Pt(11)
    run_sub.font.bold = True
    run_sub.font.color.rgb = RGBColor(37, 99, 235)

    contact_p = doc.add_paragraph()
    contact_p.paragraph_format.space_after = Pt(12)
    c_run = contact_p.add_run("📍 Ho Chi Minh City, VN  |  📞 (+84) 936 680 206  |  ✉️ nguyentuandat.tuandat@gmail.com  |  🌐 Zalo: zalo.me/0936680206")
    c_run.font.size = Pt(9.5)
    c_run.font.color.rgb = RGBColor(71, 85, 105)

    # Divider Table
    div_table = doc.add_table(rows=1, cols=1)
    div_table.alignment = WD_TABLE_ALIGNMENT.CENTER
    div_cell = div_table.cell(0, 0)
    set_cell_background(div_cell, "2563eb")
    div_cell.width = Inches(6.9)
    div_cell.paragraphs[0].paragraph_format.space_before = Pt(1)
    div_cell.paragraphs[0].paragraph_format.space_after = Pt(1)

    # 1. EXECUTIVE SUMMARY
    add_heading_styled(doc, "1. EXECUTIVE SUMMARY & VALUE PROPOSITION", level=1)
    p = doc.add_paragraph()
    p.paragraph_format.space_after = Pt(6)
    p.paragraph_format.line_spacing = 1.2
    run = p.add_run(
        "Accomplished Senior Creative Designer & Visual Marketing Strategist with over 10 years of expertise in High-Converting Ad Creative Production, SEO-Optimized WordPress Website Design, and Modern Web3 / DApp Interface Development using Vite code. "
        "Specialized in SaaS, AI Technology, and eCommerce products targeted at English-speaking global markets (US, UK, AU...).\n\n"
        "Production Capacity: Autonomously produces 30 - 40 Ad Creatives/month (depending on product complexity, across Feeds, Stories, Reels, Carousels) and delivers End-to-End Websites & Product Landing Pages within a 2 - 3 day turnaround. "
        "Expert in Adobe Photoshop, Canva, CapCut, WordPress, Vite Code, and advanced Generative AI tools (ChatGPT, Gemini, Flow) with continuous mastery of Premiere Pro, Illustrator, and Figma to achieve 5x design velocity and high-impact visual performance."
    )
    run.font.size = Pt(9.5)

    # 2. GROUP 1: AD CREATIVES
    add_heading_styled(doc, "2. GROUP 1: AD CREATIVES (FACEBOOK / INSTAGRAM FEED & STORIES)", level=1)

    # 1. SaaS Hero Ad
    add_heading_styled(doc, "1. SaaS / AI Product Hero Ad (1:1 Square Feed)", level=2)
    add_two_images_grid(doc, 
                        "01_ad_saas_hero_1x1.png", "Ad 1: SaaS Analytics & Glassmorphic Dashboard Mockup (1:1)",
                        "Gemini_Generated_Image_4hxhb14hxhb14hxh.png", "Ad 1B: AI Data Intelligence & Tech Visualization",
                        width=Inches(3.1))

    # 2. Before/After Comparison
    add_heading_styled(doc, "2. Before/After & Data Performance Comparison (1:1)", level=2)
    add_two_images_grid(doc,
                        "02_ad_before_after_1x1.png", "Ad 2: Before/After & Workflow Automation Comparison (1:1)",
                        "ChatGPT Image 11_48_42 24 thg 4, 2026.png", "Ad 2B: Real-world Productivity & Time Savings Concept",
                        width=Inches(3.1))

    # 3. Testimonial Ad
    add_heading_styled(doc, "3. Human Testimonial & Social Proof Ad (1:1)", level=2)
    add_two_images_grid(doc,
                        "03_ad_human_testimonial_1x1.png", "Ad 3: Trust Testimonial & 5-Star Social Proof Mockup",
                        "644157104_122126366757126154_1000207496340268619_n.jpg", "Ad 3B: Executive Leadership Profile",
                        width=Inches(3.1))

    # 4. Vertical Stories/Reels
    add_heading_styled(doc, "4. Vertical Stories/Reels & Urgency Promotion (9:16)", level=2)
    add_two_images_grid(doc,
                        "04_ad_stories_urgency_9x16.png", "Ad 4: Mobile Vertical Stories & Urgency Badge (9:16)",
                        "z7789441773455_5d4b7f7271d14bc3462522ae2b126331.jpg", "Ad 4B: Vertical Promo & Limited-Time CTA Layout",
                        width=Inches(3.1))

    # 5. Feature Spotlight
    add_heading_styled(doc, "5. Specific AI Feature Spotlight Ad (1:1)", level=2)
    add_two_images_grid(doc,
                        "05_ad_ai_feature_spotlight_1x1.png", "Ad 5: Core Neural Network & AI Feature Spotlight (1:1)",
                        "Gemini_Generated_Image_hvxbb4hvxbb4hvxb.png", "Ad 5B: 3D Tech Visual & Branding",
                        width=Inches(3.1))

    # 3. GROUP 2: PRODUCT LANDING PAGE
    add_heading_styled(doc, "3. GROUP 2: PRODUCT LANDING PAGE CRO FRAMEWORK", level=1)

    # 6. Hero Section
    add_heading_styled(doc, "6. Hero Section — Desktop Web Layout (1440x900px)", level=2)
    add_image_safe(doc, "06_lp_hero_section_1440x900.png", width=Inches(5.8), caption="Landing Page 6: Hero Section Desktop Layout (1440x900px)")

    # 7. Feature Section
    add_heading_styled(doc, "7. Feature Introduction Section — 3-Column Modern Grid", level=2)
    add_image_safe(doc, "07_lp_feature_section_grid.png", width=Inches(5.8), caption="Landing Page 7: Feature Section 3-Column Grid & UI Icons")

    # 8. Sign-up CTA Section
    add_heading_styled(doc, "8. Sign-up CTA Section — High-Conversion Bottom Block", level=2)
    add_image_safe(doc, "08_lp_signup_cta_block.png", width=Inches(5.8), caption="Landing Page 8: Bottom Sign-up CTA Block (Centered High-Conversion)")

    # 4. REAL-WORLD PRODUCTION CAMPAIGNS
    add_heading_styled(doc, "4. FEATURED REAL-WORLD DESIGN DELIVERABLES", level=1)

    # Galant Health
    add_heading_styled(doc, "A. Healthcare Public Communication Campaign (Galant Clinic - 30+ Deliverables)", level=2)
    add_two_images_grid(doc,
                        "Thiết kế truyền thông sức khỏa sinh sản/Galant-01.jpg", "Galant Campaign #01: Public Health & Medical Infographics",
                        "Thiết kế truyền thông sức khỏa sinh sản/Galant-05.jpg", "Galant Campaign #05: Healthcare Brand Typography & Social Post",
                        width=Inches(3.1))

    # Event Banners & Posters
    add_heading_styled(doc, "B. Corporate Key Visuals & Event Branding (15th Anniversary & Chess Championship)", level=2)
    add_two_images_grid(doc,
                        "banner kỷ niệm 15 năm thành lập công ty  final.jpg", "Event Banner: 15th Anniversary Corporate Key Visual",
                        "POSTER TÀI TRỢ CHƯƠNG TRÌNH CỜ VUA 2 copy.jpg", "Promotional Poster: Intellectual Chess Championship Sponsorship",
                        width=Inches(3.1))

    # B2B Packaging & Catalogues
    add_heading_styled(doc, "C. B2B Corporate Identity & Industrial Catalogues (Tan Vien Dong & AK Resin)", level=2)
    add_two_images_grid(doc,
                        "AK HÀN QUỐC.png", "B2B Product Packaging: AK Korea Industrial Resin Line",
                        "SHCP.png", "B2B Sales Catalogue: Composite Materials & Fiberglass Specs",
                        width=Inches(3.1))

    # eCommerce Beauty & Cosmetics (MEEA, Bbia, Weilaiya)
    add_heading_styled(doc, "D. eCommerce Beauty & Cosmetics Ad Creatives (MEEA, Bbia, Weilaiya)", level=2)
    add_two_images_grid(doc,
                        "ad_meea_trendy_cream.jpg", "MEEA Premium: Trendy Fermented Body Cream Campaign (Trendy Violet)",
                        "ad_bbia_velvet_tint.jpg", "Guardian Official / Bbia: Last Velvet Tint #01 Brick Red Lip Ad",
                        width=Inches(3.1))
    add_two_images_grid(doc,
                        "ad_weilaiya_shower_gel.jpg", "Guardian Official / Weilaiya: Rose Essence Perfume Repair Shower Gel 450ML",
                        "ad_kalpen_inox304_uuviet.jpg", "Kalpen Germany: INOX 304 Premium Cookware - Distributed by Uu Viet",
                        width=Inches(3.1))

    # Exterior Paint & Consumer Posters (Nano APO)
    add_heading_styled(doc, "E. Premium Exterior Coating Commercial Poster (Nano APO Diamond Nano)", level=2)
    add_image_safe(doc, "ad_nanoapo_paint_uuviet.jpg", width=Inches(4.5), caption="Nano APO Paint of England: Diamond Nano Super Gloss Exterior Paint Poster")

    # 5. 30+ LIVE WEB APPS
    add_heading_styled(doc, "5. 30+ LIVE WEB APPLICATIONS & LANDING PAGES DIRECTORY", level=1)
    web_sites = [
        ("Mastering Technology AI Hub", "https://lamchucongnghe.lovable.app/"),
        ("Career Reinvention With AI", "https://taithietsunghiepcungai.lovable.app/"),
        ("Monetize Everything Landing", "https://bienmoithuthanhtien.lovable.app/"),
        ("Master Sale AI Automation", "https://mastersaleai.lovable.app"),
        ("ChatGPT Image 2 Architecture", "https://ungdungchatgptimage2.lovable.app"),
        ("AI Personal Branding Accelerator", "https://xaydungthuonghieucanhanbangai.lovable.app"),
        ("Nguyen Tuan Dat Official Portfolio", "https://nguyentuandat.lovable.app"),
        ("Dat AI Marketing Agency Hub", "https://dataimarketing.lovable.app/"),
        ("Bulk Email Marketing Automation", "https://taonhieuemail.lovable.app"),
        ("Affiliate Marketing Masterclass", "https://khoahocaffiliate.lovable.app/"),
        ("KOL AI System Architecture", "https://gioithieukolaisystem.lovable.app"),
        ("KOL AI Studio Production", "https://kolaistudio.lovable.app"),
        ("Workshop KOL AI System", "https://workshopkolaisystem.lovable.app"),
        ("Work With Dat AI (Consulting)", "https://lamvieccungdatai.lovable.app"),
        ("Professional Ebook Creation Course", "https://khoahocsamebook.lovable.app/"),
        ("Landing Page Design Service (CRO)", "https://dichvuthietkelandingpage.lovable.app"),
        ("Claude AI Complete Guide Ebook", "https://gioithieuebookclaudetoantap.lovable.app/"),
        ("Monetize Your Knowledge Ebook", "https://bienkienthucthanhtien.lovable.app/"),
        ("Tan Vien Dong Shipyard Corporate Portal", "https://tanviendong.vn"),
        ("Tan Vien Dong Composite B2B Portal", "https://tanviendong.net"),
        ("Kien Phi Composite Materials", "https://kienphi.com.vn"),
        ("Kien Trung Long Composite Materials", "https://kientrunglong.com.vn"),
        ("Galant Medical Clinic Network", "https://galantclinic.com"),
        ("HIV Specialized Medical Portal", "https://dieutrihiv.com"),
        ("G3VN Social Enterprise", "https://g3vn.com"),
        ("Tia Sang Telecom IoT Solutions", "https://vienthongtiasang.com"),
        ("ROBO Technology E-commerce", "https://robo.vn"),
        ("UPOWER Academy Platform", "https://upower.vn")
    ]
    for n, u in web_sites:
        wp = doc.add_paragraph()
        wp.paragraph_format.space_after = Pt(2)
        wp.paragraph_format.left_indent = Inches(0.2)
        rn = wp.add_run(f"• {n}: ")
        rn.font.size = Pt(9)
        rn.font.bold = True
        ru = wp.add_run(u)
        ru.font.size = Pt(9)
        ru.font.color.rgb = RGBColor(37, 99, 235)

    safe_save_doc(doc, "Portfolio_NguyenTuanDat_SeniorGraphicDesigner_EN.docx")

if __name__ == "__main__":
    generate_vietnamese_portfolio_with_images()
    generate_english_portfolio_with_images()
