import os
import sys
import time
import urllib.request
import urllib.parse
from concurrent.futures import ThreadPoolExecutor, as_completed

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "Hinh_Anh_Prompts_ChatGPT")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PROMPTS_DATA = [
    {
        "id": 1,
        "name": "01_ad_saas_hero_1x1.png",
        "prompt": "A clean, modern advertisement design for a SaaS/AI product, square 1:1 format for Facebook/Instagram feed. Show a laptop or dashboard mockup displaying an AI analytics interface, floating UI cards with charts and data points, soft gradient background in Royal Blue and Electric Cyan, plenty of negative space at the top for bold headline text, minimal and premium tech aesthetic, high contrast, professional advertising photography style, no readable text in the image.",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 2,
        "name": "02_ad_before_after_1x1.png",
        "prompt": "A performance-marketing style advertisement, split-screen or before/after comparison layout, left side muted grayscale representing before AI, right side vibrant and organized representing after AI automation, abstract icons of charts, checkmarks, and time-saving symbols, clean flat design, Royal Blue and Emerald Green accent color, square 1:1 format, space reserved for a bold stat headline, no readable text.",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 3,
        "name": "03_ad_human_testimonial_1x1.png",
        "prompt": "A friendly, approachable advertisement featuring a professional Vietnamese Asian business person using a laptop in a bright modern office, smiling naturally, soft natural lighting, AI interface holographic overlay subtly visible above the laptop screen, warm and trustworthy mood, square 1:1 format, empty space on one side for a quote or headline, commercial photography style, no readable text.",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 4,
        "name": "04_ad_stories_urgency_9x16.png",
        "prompt": "A vertical 9:16 mobile-first advertisement for Instagram/Facebook Stories, bold and punchy design promoting a limited-time AI course or tool, dynamic diagonal composition, abstract AI network lines and particles, high-energy Royal Blue gradient background, large empty zone in the center-bottom for headline and CTA button mockup, mobile app advertising aesthetic, no readable text.",
        "width": 768,
        "height": 1365
    },
    {
        "id": 5,
        "name": "05_ad_ai_feature_spotlight_1x1.png",
        "prompt": "A tech product advertisement showcasing an AI feature, abstract glowing neural network or circuit pattern merging into a simple app icon, dark navy background with Royal Blue neon accent lines, futuristic but clean SaaS branding style, square format, top third left empty for headline text, no readable text.",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 6,
        "name": "06_lp_hero_section_1440x900.png",
        "prompt": "A modern SaaS landing page hero section design, desktop web layout 1440x900px, left side contains empty space reserved for a bold headline and subheadline plus a CTA button mockup, right side shows a clean product dashboard/app mockup floating with soft shadow, minimal white or light background with Royal Blue accent, generous whitespace, modern SaaS website aesthetic similar to Linear or Notion, no readable text in the image.",
        "width": 1440,
        "height": 900
    },
    {
        "id": 7,
        "name": "07_lp_feature_section_grid.png",
        "prompt": "A landing page features section design, desktop web layout, three-column grid layout each with a simple line icon, empty space for a short feature title and description under each icon, subtle divider lines, light background with Royal Blue accent icons, clean modern SaaS website style, generous padding, no readable text.",
        "width": 1440,
        "height": 900
    },
    {
        "id": 8,
        "name": "08_lp_signup_cta_block.png",
        "prompt": "A landing page bottom call-to-action section design, desktop web layout, centered composition, bold colored background block in Royal Blue, empty space in the center for a headline and a prominent CTA button mockup, subtle abstract geometric shapes or gradient in the background, high-conversion SaaS landing page aesthetic, no readable text.",
        "width": 1440,
        "height": 900
    }
]

def fetch_single_image(item):
    p_id = item["id"]
    filename = item["name"]
    prompt = item["prompt"]
    w = item["width"]
    h = item["height"]
    
    encoded_prompt = urllib.parse.quote(prompt)
    
    # Try different models if needed: flux, turbo
    urls = [
        f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={w}&height={h}&nologo=true&model=flux",
        f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={w}&height={h}&nologo=true&model=turbo",
        f"https://image.pollinations.ai/prompt/{encoded_prompt}?width={w}&height={h}&nologo=true"
    ]
    
    dest_folder_path = os.path.join(OUTPUT_DIR, filename)
    dest_root_path = os.path.join(BASE_DIR, filename)
    
    print(f"[Start #{p_id}] {filename}...")
    for url in urls:
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'})
            with urllib.request.urlopen(req, timeout=45) as response:
                data = response.read()
                if len(data) > 2000:
                    with open(dest_folder_path, "wb") as f:
                        f.write(data)
                    with open(dest_root_path, "wb") as f:
                        f.write(data)
                    print(f"[Done #{p_id}] {filename} ({len(data)} bytes)")
                    return True
        except Exception as e:
            print(f"[Retry #{p_id}] Error: {e}")
            time.sleep(1)
            
    return False

def main():
    print("=== TẢI ĐỒNG THỜI 8 ẢNH BẰNG THREADPOOL ===")
    with ThreadPoolExecutor(max_workers=4) as executor:
        futures = [executor.submit(fetch_single_image, item) for item in PROMPTS_DATA]
        for f in as_completed(futures):
            pass
    print("=== TẤT CẢ LUỒNG ĐÃ KẾT THÚC ===")

if __name__ == "__main__":
    main()
