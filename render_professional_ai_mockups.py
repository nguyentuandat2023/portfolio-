import os
import sys
import math
from PIL import Image, ImageDraw, ImageFont, ImageFilter

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "Hinh_Anh_Prompts_ChatGPT")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Helper to save to both folders
def save_dual(img, filename):
    p1 = os.path.join(OUTPUT_DIR, filename)
    p2 = os.path.join(BASE_DIR, filename)
    img.save(p1, format="PNG", quality=95)
    img.save(p2, format="PNG", quality=95)
    print(f"[SUCCESS] Rendered & Saved: {filename} ({img.size[0]}x{img.size[1]})")

# Helper for gradients
def create_linear_gradient(w, h, c_start, c_end, vertical=True):
    base = Image.new('RGB', (w, h), c_start)
    top = Image.new('RGB', (w, h), c_end)
    mask = Image.new('L', (w, h))
    mask_data = []
    for y in range(h):
        for x in range(w):
            val = int(255 * (y / h if vertical else x / w))
            mask_data.append(val)
    mask.putdata(mask_data)
    base.paste(top, (0, 0), mask)
    return base

# Helper to draw rounded rectangle with border & shadow
def draw_card(draw, box, fill_color, border_color=None, border_width=1, radius=16):
    draw.rounded_rectangle(box, radius=radius, fill=fill_color, outline=border_color, width=border_width)

# ==============================================================================
# 1. 01_ad_saas_hero_1x1.png (1024x1024)
# ==============================================================================
def render_01_saas_hero():
    w, h = 1024, 1024
    img = create_linear_gradient(w, h, (10, 25, 65), (5, 12, 35), vertical=True)
    draw = ImageDraw.Draw(img)

    # Ambient glowing orbs
    overlay = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    ov_draw = ImageDraw.Draw(overlay)
    ov_draw.ellipse([600, 300, 1050, 750], fill=(37, 99, 235, 60))
    ov_draw.ellipse([100, 500, 500, 900], fill=(6, 182, 212, 45))
    overlay = overlay.filter(ImageFilter.GaussianBlur(80))
    img = Image.alpha_composite(img.convert('RGBA'), overlay).convert('RGB')
    draw = ImageDraw.Draw(img)

    # Top Negative space guidance grid (subtle)
    for x in range(0, w, 64):
        draw.line([(x, 0), (x, 350)], fill=(255, 255, 255, 12), width=1)
    for y in range(0, 350, 64):
        draw.line([(0, y), (w, y)], fill=(255, 255, 255, 12), width=1)

    # Floating Laptop / Dashboard Glass Card (Hero UI Mockup)
    card_x0, card_y0, card_x1, card_y1 = 120, 380, 904, 940
    
    # Shadow
    draw.rounded_rectangle([card_x0-6, card_y0+10, card_x1+6, card_y1+20], radius=24, fill=(0, 0, 0))
    # Main Dashboard Window
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=24, fill=(15, 23, 42), outline=(59, 130, 246), width=2)
    
    # Window Header
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y0+50], radius=24, fill=(30, 41, 59))
    draw.rectangle([card_x0, card_y0+25, card_x1, card_y0+50], fill=(30, 41, 59))
    draw.ellipse([card_x0+24, card_y0+18, card_x0+38, card_y0+32], fill=(239, 68, 68))
    draw.ellipse([card_x0+48, card_y0+18, card_x0+62, card_y0+32], fill=(245, 158, 11))
    draw.ellipse([card_x0+72, card_y0+18, card_x0+86, card_y0+32], fill=(16, 185, 129))

    # Dashboard Left Sidebar
    draw.rounded_rectangle([card_x0+20, card_y0+70, card_x0+180, card_y1-20], radius=12, fill=(24, 34, 53))
    for i in range(5):
        draw.rounded_rectangle([card_x0+35, card_y0+100 + i*45, card_x0+165, card_y0+130 + i*45], radius=8, fill=(37, 99, 235) if i==0 else (40, 52, 75))

    # Dashboard Metrics Cards (Top Row)
    for i, col in enumerate([(37, 99, 235), (16, 185, 129), (139, 92, 246)]):
        bx0 = card_x0 + 205 + i*185
        draw.rounded_rectangle([bx0, card_y0+70, bx0+170, card_y0+160], radius=12, fill=(24, 34, 53), outline=(50, 65, 95), width=1)
        draw.rounded_rectangle([bx0+15, card_y0+85, bx0+60, card_y0+95], radius=4, fill=(100, 116, 139))
        draw.rounded_rectangle([bx0+15, card_y0+110, bx0+130, card_y0+135], radius=6, fill=col)

    # Main Chart Visualization
    draw.rounded_rectangle([card_x0+205, card_y0+180, card_x1-20, card_y1-20], radius=14, fill=(20, 28, 45), outline=(40, 56, 85), width=1)
    
    # Draw glowing data curve
    points = [
        (card_x0+240, card_y1-60),
        (card_x0+320, card_y1-120),
        (card_x0+400, card_y1-90),
        (card_x0+480, card_y1-180),
        (card_x0+560, card_y1-140),
        (card_x0+640, card_y1-240),
        (card_x0+720, card_y1-220),
        (card_x0+800, card_y1-310)
    ]
    draw.line(points, fill=(6, 182, 212), width=5, joint="curve")
    for pt in points:
        draw.ellipse([pt[0]-7, pt[1]-7, pt[0]+7, pt[1]+7], fill=(255, 255, 255), outline=(6, 182, 212), width=3)

    # Floating Glass UI Badge
    badge_x0, badge_y0 = 620, 310
    draw.rounded_rectangle([badge_x0, badge_y0, badge_x0+260, badge_y0+80], radius=16, fill=(30, 58, 138), outline=(96, 165, 250), width=2)
    draw.ellipse([badge_x0+20, badge_y0+22, badge_x0+56, badge_y0+58], fill=(16, 185, 129))
    draw.rounded_rectangle([badge_x0+70, badge_y0+25, badge_x0+230, badge_y0+38], radius=4, fill=(255, 255, 255))
    draw.rounded_rectangle([badge_x0+70, badge_y0+46, badge_x0+180, badge_y0+56], radius=4, fill=(147, 197, 253))

    save_dual(img, "01_ad_saas_hero_1x1.png")

# ==============================================================================
# 2. 02_ad_before_after_1x1.png (1024x1024)
# ==============================================================================
def render_02_before_after():
    w, h = 1024, 1024
    img = Image.new('RGB', (w, h), (15, 23, 42))
    
    # Left side (Before - Grayscale / Muted)
    left_img = create_linear_gradient(512, 1024, (45, 55, 72), (26, 32, 44), vertical=True)
    img.paste(left_img, (0, 0))
    
    # Right side (After - Vibrant Royal Blue & Emerald)
    right_img = create_linear_gradient(512, 1024, (30, 58, 138), (6, 78, 59), vertical=True)
    img.paste(right_img, (512, 0))
    
    draw = ImageDraw.Draw(img)
    
    # Split Divider Line with glowing pulse
    draw.line([(512, 0), (512, 1024)], fill=(255, 255, 255), width=4)
    draw.ellipse([482, 512-30, 542, 512+30], fill=(37, 99, 235), outline=(255, 255, 255), width=3)

    # Left Side: Disorganized Tasks / Red Overdue Bars / Grayscale Chaos
    for i in range(5):
        y_pos = 380 + i*100
        draw.rounded_rectangle([60, y_pos, 440, y_pos+65], radius=10, fill=(40, 48, 65), outline=(70, 80, 95), width=1)
        draw.ellipse([80, y_pos+18, 110, y_pos+48], fill=(120, 130, 145))
        draw.rounded_rectangle([130, y_pos+20, 320, y_pos+32], radius=4, fill=(100, 110, 125))
        draw.rounded_rectangle([130, y_pos+40, 240, y_pos+48], radius=4, fill=(70, 80, 95))
        draw.rounded_rectangle([360, y_pos+22, 420, y_pos+44], radius=6, fill=(185, 28, 28)) # Red Delay

    # Right Side: Ultra-Organized Automation / Green Checks / 5x Growth Chart
    for i in range(5):
        y_pos = 380 + i*100
        draw.rounded_rectangle([584, y_pos, 964, y_pos+65], radius=10, fill=(15, 45, 75), outline=(16, 185, 129), width=1)
        draw.ellipse([604, y_pos+18, 634, y_pos+48], fill=(16, 185, 129)) # Green Checkmark Circle
        draw.rounded_rectangle([654, y_pos+20, 840, y_pos+32], radius=4, fill=(255, 255, 255))
        draw.rounded_rectangle([654, y_pos+40, 780, y_pos+48], radius=4, fill=(147, 197, 253))
        draw.rounded_rectangle([874, y_pos+22, 944, y_pos+44], radius=6, fill=(5, 150, 105)) # Done Badge

    # Stat Headline Space at Top
    draw.rounded_rectangle([120, 80, 904, 240], radius=20, fill=(15, 23, 42), outline=(59, 130, 246), width=2)
    # Placeholder decorative bars for bold stat headline
    draw.rounded_rectangle([200, 120, 824, 155], radius=8, fill=(255, 255, 255))
    draw.rounded_rectangle([280, 175, 744, 195], radius=6, fill=(96, 165, 250))

    save_dual(img, "02_ad_before_after_1x1.png")

# ==============================================================================
# 3. 03_ad_human_testimonial_1x1.png (1024x1024)
# ==============================================================================
def render_03_human_testimonial():
    w, h = 1024, 1024
    img = create_linear_gradient(w, h, (241, 245, 249), (226, 232, 240), vertical=True)
    draw = ImageDraw.Draw(img)

    # Modern Office Interior Geometry & Lighting
    draw.rectangle([0, 0, 1024, 400], fill=(235, 240, 248))
    draw.line([(0, 400), (1024, 400)], fill=(203, 213, 225), width=2)
    # Glass Window Lines
    for x in [250, 500, 750]:
        draw.line([(x, 0), (x, 400)], fill=(215, 225, 238), width=3)

    # Professional Avatar / Silhouette Presentation (Right side)
    draw.ellipse([540, 220, 900, 580], fill=(30, 58, 138)) # Profile base
    draw.ellipse([640, 270, 800, 430], fill=(254, 205, 165)) # Face tone
    draw.rounded_rectangle([560, 420, 880, 780], radius=60, fill=(15, 23, 42)) # Suit / Blazer

    # Holographic AI Floating Cards around Laptop
    holo1_box = [520, 580, 920, 880]
    draw.rounded_rectangle(holo1_box, radius=20, fill=(15, 23, 42), outline=(59, 130, 246), width=3)
    # Holographic glowing UI
    draw.rounded_rectangle([550, 620, 720, 635], radius=4, fill=(96, 165, 250))
    draw.rounded_rectangle([550, 655, 880, 760], radius=10, fill=(30, 41, 59))
    draw.line([(570, 740), (640, 690), (710, 720), (780, 670), (850, 690)], fill=(16, 185, 129), width=4)

    # Left Side: Testimonial Quote Bubble & 5 Stars
    card_l = [80, 180, 480, 750]
    draw.rounded_rectangle(card_l, radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    
    # 5 Gold Stars
    for s in range(5):
        draw.rounded_rectangle([120 + s*42, 230, 150 + s*42, 260], radius=6, fill=(245, 158, 11))
    
    # Quote lines (negative space representation)
    draw.rounded_rectangle([120, 310, 440, 335], radius=6, fill=(15, 23, 42))
    draw.rounded_rectangle([120, 355, 420, 375], radius=6, fill=(30, 41, 59))
    draw.rounded_rectangle([120, 395, 390, 415], radius=6, fill=(71, 85, 105))
    draw.rounded_rectangle([120, 435, 430, 455], radius=6, fill=(71, 85, 105))
    
    # Verified Customer Badge
    draw.rounded_rectangle([120, 520, 440, 610], radius=14, fill=(240, 249, 255), outline=(186, 230, 253), width=1)
    draw.ellipse([140, 540, 190, 590], fill=(2, 132, 199))
    draw.rounded_rectangle([210, 545, 380, 560], radius=4, fill=(15, 23, 42))
    draw.rounded_rectangle([210, 570, 330, 582], radius=4, fill=(100, 116, 139))

    save_dual(img, "03_ad_human_testimonial_1x1.png")

# ==============================================================================
# 4. 04_ad_stories_urgency_9x16.png (768x1365)
# ==============================================================================
def render_04_stories_urgency():
    w, h = 768, 1365
    img = create_linear_gradient(w, h, (30, 27, 75), (15, 23, 42), vertical=True)
    draw = ImageDraw.Draw(img)

    # Dynamic Diagonal Neon Streaks
    for i in range(-200, w+600, 140):
        draw.line([(i, 0), (i-350, h)], fill=(79, 70, 229, 40), width=8)
        draw.line([(i+40, 0), (i-310, h)], fill=(236, 72, 153, 30), width=4)

    # Glowing Top Badge: LIMITED TIME / URGENCY
    draw.rounded_rectangle([w//2-180, 100, w//2+180, 160], radius=30, fill=(225, 29, 72), outline=(255, 255, 255), width=2)
    draw.ellipse([w//2-150, 120, w//2-130, 140], fill=(255, 255, 255))
    draw.rounded_rectangle([w//2-110, 122, w//2+140, 138], radius=4, fill=(255, 255, 255))

    # Big Center Visual: 3D Holographic AI Core Orb & Floating Elements
    cx, cy = w//2, 540
    draw.ellipse([cx-180, cy-180, cx+180, cy+180], fill=(49, 46, 129), outline=(99, 102, 241), width=4)
    draw.ellipse([cx-120, cy-120, cx+120, cy+120], fill=(67, 56, 202), outline=(168, 85, 247), width=3)
    draw.ellipse([cx-60, cy-60, cx+60, cy+60], fill=(236, 72, 153))

    # Orbiting Rings
    draw.arc([cx-220, cy-100, cx+220, cy+100], 0, 360, fill=(56, 189, 248), width=4)
    draw.arc([cx-100, cy-220, cx+100, cy+220], 0, 360, fill=(244, 63, 94), width=4)

    # Floating Promo Metric Badges
    b1 = [80, 780, 340, 870]
    draw.rounded_rectangle(b1, radius=16, fill=(15, 23, 42), outline=(59, 130, 246), width=2)
    draw.rounded_rectangle([100, 805, 300, 825], radius=4, fill=(255, 255, 255))
    draw.rounded_rectangle([100, 835, 240, 848], radius=4, fill=(96, 165, 250))

    b2 = [w-340, 780, w-80, 870]
    draw.rounded_rectangle(b2, radius=16, fill=(15, 23, 42), outline=(16, 185, 129), width=2)
    draw.rounded_rectangle([w-320, 805, w-120, 825], radius=4, fill=(255, 255, 255))
    draw.rounded_rectangle([w-320, 835, w-180, 848], radius=4, fill=(52, 211, 153))

    # Large Bottom Empty Zone for Headline & CTA Swipe-up Button
    draw.rounded_rectangle([60, 930, w-60, 1140], radius=24, fill=(24, 34, 53), outline=(99, 102, 241), width=2)
    draw.rounded_rectangle([100, 970, w-100, 1010], radius=8, fill=(255, 255, 255))
    draw.rounded_rectangle([140, 1030, w-140, 1060], radius=6, fill=(147, 197, 253))

    # Floating CTA Swipe-up Button
    draw.rounded_rectangle([w//2-180, 1190, w//2+180, 1270], radius=40, fill=(37, 99, 235), outline=(255, 255, 255), width=2)
    draw.polygon([(w//2, 1215), (w//2-15, 1235), (w//2+15, 1235)], fill=(255, 255, 255))
    draw.rounded_rectangle([w//2-100, 1245, w//2+100, 1255], radius=4, fill=(255, 255, 255))

    save_dual(img, "04_ad_stories_urgency_9x16.png")

# ==============================================================================
# 5. 05_ad_ai_feature_spotlight_1x1.png (1024x1024)
# ==============================================================================
def render_05_ai_feature_spotlight():
    w, h = 1024, 1024
    img = create_linear_gradient(w, h, (10, 15, 30), (5, 8, 20), vertical=True)
    draw = ImageDraw.Draw(img)

    # Neural Network Synaptic Nodes & Connection Mesh
    nodes = [
        (200, 550), (350, 480), (512, 420), (674, 480), (824, 550),
        (260, 680), (410, 620), (512, 580), (614, 620), (764, 680),
        (320, 820), (460, 760), (512, 720), (564, 760), (704, 820),
        (512, 880)
    ]
    
    # Draw synaptic glowing lines
    for i, n1 in enumerate(nodes):
        for j, n2 in enumerate(nodes):
            dist = math.hypot(n1[0]-n2[0], n1[1]-n2[1])
            if dist < 190 and i < j:
                draw.line([n1, n2], fill=(37, 99, 235), width=2)

    # Core AI Chip Icon in Center
    cx, cy = 512, 580
    draw.rounded_rectangle([cx-90, cy-90, cx+90, cy+90], radius=24, fill=(15, 23, 42), outline=(6, 182, 212), width=3)
    draw.rounded_rectangle([cx-60, cy-60, cx+60, cy+60], radius=16, fill=(30, 58, 138), outline=(96, 165, 250), width=2)
    # Chip Pins
    for pin in range(-60, 70, 30):
        draw.line([(cx+pin, cy-90), (cx+pin, cy-110)], fill=(6, 182, 212), width=4)
        draw.line([(cx+pin, cy+90), (cx+pin, cy+110)], fill=(6, 182, 212), width=4)
        draw.line([(cx-90, cy+pin), (cx-110, cy+pin)], fill=(6, 182, 212), width=4)
        draw.line([(cx+90, cy+pin), (cx+110, cy+pin)], fill=(6, 182, 212), width=4)

    # Draw Nodes
    for pt in nodes:
        draw.ellipse([pt[0]-9, pt[1]-9, pt[0]+9, pt[1]+9], fill=(6, 182, 212), outline=(255, 255, 255), width=2)

    # Top 1/3 Negative Space for Headline
    draw.rounded_rectangle([150, 80, 874, 260], radius=20, fill=(15, 23, 42, 200), outline=(37, 99, 235), width=1)
    draw.rounded_rectangle([220, 130, 804, 165], radius=8, fill=(255, 255, 255))
    draw.rounded_rectangle([280, 185, 744, 210], radius=6, fill=(96, 165, 250))

    save_dual(img, "05_ad_ai_feature_spotlight_1x1.png")

# ==============================================================================
# 6. 06_lp_hero_section_1440x900.png (1440x900)
# ==============================================================================
def render_06_lp_hero_section():
    w, h = 1440, 900
    img = Image.new('RGB', (w, h), (248, 250, 252))
    draw = ImageDraw.Draw(img)

    # Top Navigation Bar Mockup
    draw.rectangle([0, 0, w, 80], fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    draw.ellipse([80, 25, 110, 55], fill=(37, 99, 235))
    draw.rounded_rectangle([125, 32, 220, 48], radius=4, fill=(15, 23, 42))
    for i in range(4):
        draw.rounded_rectangle([550 + i*120, 34, 630 + i*120, 46], radius=4, fill=(100, 116, 139))
    draw.rounded_rectangle([w-220, 20, w-80, 60], radius=8, fill=(37, 99, 235))

    # Left Side: Hero Value Proposition & CTA Button
    draw.rounded_rectangle([80, 180, 260, 215], radius=20, fill=(238, 242, 255), outline=(199, 210, 254), width=1)
    draw.rounded_rectangle([95, 193, 245, 203], radius=3, fill=(79, 70, 229))

    # Bold Headline Lines
    draw.rounded_rectangle([80, 250, 640, 310], radius=8, fill=(15, 23, 42))
    draw.rounded_rectangle([80, 330, 580, 390], radius=8, fill=(37, 99, 235))
    
    # Subtitle Lines
    draw.rounded_rectangle([80, 430, 620, 455], radius=6, fill=(71, 85, 105))
    draw.rounded_rectangle([80, 475, 540, 500], radius=6, fill=(100, 116, 139))
    
    # Primary CTA & Secondary CTA Buttons
    draw.rounded_rectangle([80, 560, 280, 625], radius=12, fill=(37, 99, 235))
    draw.rounded_rectangle([305, 560, 500, 625], radius=12, fill=(255, 255, 255), outline=(203, 213, 225), width=2)
    
    # Social Proof Avatar Stack
    for a in range(4):
        draw.ellipse([80 + a*32, 690, 120 + a*32, 730], fill=(45 + a*40, 85, 165), outline=(255, 255, 255), width=2)
    draw.rounded_rectangle([230, 702, 460, 718], radius=4, fill=(71, 85, 105))

    # Right Side: Floating App / Dashboard Mockup (Linear / Notion Aesthetic)
    d_x0, d_y0, d_x1, d_y1 = 700, 160, w-60, 780
    # Soft Drop Shadow
    draw.rounded_rectangle([d_x0-8, d_y0+12, d_x1+8, d_y1+20], radius=24, fill=(203, 213, 225))
    # Main Window
    draw.rounded_rectangle([d_x0, d_y0, d_x1, d_y1], radius=24, fill=(255, 255, 255), outline=(226, 232, 240), width=2)
    # Window Top Bar
    draw.rounded_rectangle([d_x0, d_y0, d_x1, d_y0+45], radius=24, fill=(241, 245, 249))
    draw.rectangle([d_x0, d_y0+25, d_x1, d_y0+45], fill=(241, 245, 249))
    draw.ellipse([d_x0+20, d_y0+15, d_x0+32, d_y0+27], fill=(239, 68, 68))
    draw.ellipse([d_x0+42, d_y0+15, d_x0+54, d_y0+27], fill=(245, 158, 11))
    draw.ellipse([d_x0+64, d_y0+15, d_x0+76, d_y0+27], fill=(16, 185, 129))

    # Inner Dashboard Grid
    draw.rounded_rectangle([d_x0+25, d_y0+65, d_x0+180, d_y1-25], radius=12, fill=(248, 250, 252))
    draw.rounded_rectangle([d_x0+205, d_y0+65, d_x1-25, d_y0+220], radius=14, fill=(238, 242, 255), outline=(199, 210, 254), width=1)
    
    # 2 Big Graph Cards in Dashboard
    draw.rounded_rectangle([d_x0+205, d_y0+245, d_x0+420, d_y1-25], radius=14, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
    draw.rounded_rectangle([d_x0+445, d_y0+245, d_x1-25, d_y1-25], radius=14, fill=(255, 255, 255), outline=(226, 232, 240), width=1)

    save_dual(img, "06_lp_hero_section_1440x900.png")

# ==============================================================================
# 7. 07_lp_feature_section_grid.png (1440x900)
# ==============================================================================
def render_07_lp_feature_section():
    w, h = 1440, 900
    img = Image.new('RGB', (w, h), (255, 255, 255))
    draw = ImageDraw.Draw(img)

    # Section Header
    draw.rounded_rectangle([w//2-100, 80, w//2+100, 115], radius=20, fill=(238, 242, 255))
    draw.rounded_rectangle([w//2-80, 92, w//2+80, 102], radius=3, fill=(79, 70, 229))

    draw.rounded_rectangle([w//2-320, 140, w//2+320, 195], radius=8, fill=(15, 23, 42))
    draw.rounded_rectangle([w//2-220, 215, w//2+220, 240], radius=6, fill=(100, 116, 139))

    # 3-Column Feature Cards
    card_w = 380
    card_gap = 40
    start_x = (w - (3*card_w + 2*card_gap)) // 2

    features = [
        {"color": (37, 99, 235), "icon": "prompt"},
        {"color": (16, 185, 129), "icon": "speed"},
        {"color": (139, 92, 246), "icon": "cro"}
    ]

    for i, feat in enumerate(features):
        cx0 = start_x + i*(card_w + card_gap)
        cy0 = 310
        cx1 = cx0 + card_w
        cy1 = 780
        
        # Card container with subtle border & shadow
        draw.rounded_rectangle([cx0, cy0, cx1, cy1], radius=20, fill=(248, 250, 252), outline=(226, 232, 240), width=1)
        
        # Feature Icon Badge
        draw.rounded_rectangle([cx0+30, cy0+40, cx0+100, cy0+110], radius=18, fill=feat["color"])
        draw.ellipse([cx0+50, cy0+60, cx0+80, cy0+90], fill=(255, 255, 255))
        
        # Feature Title & Description
        draw.rounded_rectangle([cx0+30, cy0+145, cx1-60, cy0+175], radius=6, fill=(15, 23, 42))
        draw.rounded_rectangle([cx0+30, cy0+195, cx1-40, cy0+215], radius=4, fill=(71, 85, 105))
        draw.rounded_rectangle([cx0+30, cy0+230, cx1-70, cy0+250], radius=4, fill=(100, 116, 139))
        draw.rounded_rectangle([cx0+30, cy0+265, cx1-50, cy0+285], radius=4, fill=(100, 116, 139))
        
        # Interactive Feature Preview Box inside Card
        draw.rounded_rectangle([cx0+30, cy0+320, cx1-30, cy1-35], radius=14, fill=(255, 255, 255), outline=(226, 232, 240), width=1)
        draw.line([(cx0+50, cy1-60), (cx0+120, cy1-100), (cx0+190, cy1-75), (cx0+260, cy1-120), (cx1-50, cy1-85)], fill=feat["color"], width=3)

    save_dual(img, "07_lp_feature_section_grid.png")

# ==============================================================================
# 8. 08_lp_signup_cta_block.png (1440x900)
# ==============================================================================
def render_08_lp_signup_cta():
    w, h = 1440, 900
    img = Image.new('RGB', (w, h), (248, 250, 252))
    
    # Giant Centered Gradient CTA Card
    card_x0, card_y0, card_x1, card_y1 = 120, 120, w-120, h-120
    card_img = create_linear_gradient(card_x1-card_x0, card_y1-card_y0, (29, 78, 216), (15, 23, 42), vertical=False)
    img.paste(card_img, (card_x0, card_y0))
    
    draw = ImageDraw.Draw(img)
    
    # Outer Border
    draw.rounded_rectangle([card_x0, card_y0, card_x1, card_y1], radius=32, outline=(96, 165, 250), width=3)
    
    # Decorative Geometric Wave Circles
    cx, cy = w//2, h//2
    draw.ellipse([cx-400, cy-400, cx+400, cy+400], outline=(255, 255, 255, 20), width=2)
    draw.ellipse([cx-260, cy-260, cx+260, cy+260], outline=(255, 255, 255, 30), width=2)
    
    # Top Tag
    draw.rounded_rectangle([w//2-130, card_y0+70, w//2+130, card_y0+110], radius=20, fill=(30, 58, 138), outline=(96, 165, 250), width=1)
    draw.rounded_rectangle([w//2-100, card_y0+85, w//2+100, card_y0+95], radius=3, fill=(255, 255, 255))
    
    # Giant Headline
    draw.rounded_rectangle([w//2-420, card_y0+150, w//2+420, card_y0+220], radius=12, fill=(255, 255, 255))
    draw.rounded_rectangle([w//2-300, card_y0+245, w//2+300, card_y0+300], radius=8, fill=(191, 219, 254))
    
    # Subtitle
    draw.rounded_rectangle([w//2-250, card_y0+330, w//2+250, card_y0+360], radius=6, fill=(147, 197, 253))
    
    # High-Conversion CTA Button & Input Bar
    form_w = 540
    draw.rounded_rectangle([w//2-form_w//2, card_y0+420, w//2+form_w//2, card_y0+500], radius=40, fill=(255, 255, 255))
    # CTA Submit Button Inside
    draw.rounded_rectangle([w//2+form_w//2-200, card_y0+428, w//2+form_w//2-10, card_y0+492], radius=32, fill=(29, 78, 216))
    
    # Trust Badges (Cards, No Credit Card, 14 Days Free)
    for b in range(3):
        bx = w//2 - 240 + b*170
        draw.ellipse([bx, card_y0+540, bx+20, card_y0+560], fill=(52, 211, 153))
        draw.rounded_rectangle([bx+30, card_y0+546, bx+130, card_y0+556], radius=3, fill=(191, 219, 254))

    save_dual(img, "08_lp_signup_cta_block.png")

def main():
    print("=== BẮT ĐẦU TẠO 8 BẢN THIẾT KẾ MOCKUP CHUYÊN NGHIỆP ===")
    render_01_saas_hero()
    render_02_before_after()
    render_03_human_testimonial()
    render_04_stories_urgency()
    render_05_ai_feature_spotlight()
    render_06_lp_hero_section()
    render_07_lp_feature_section()
    render_08_lp_signup_cta()
    print("=== TẤT CẢ 8 HÌNH ẢNH ĐÃ ĐƯỢC TẠO VÀ LƯU VÀO THƯ MỤC THÀNH CÔNG ===")

if __name__ == "__main__":
    main()
