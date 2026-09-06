import os
import sys
import time
import urllib.request
import urllib.parse

if hasattr(sys.stdout, 'reconfigure'):
    sys.stdout.reconfigure(encoding='utf-8')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
OUTPUT_DIR = os.path.join(BASE_DIR, "Hinh_Anh_Prompts_ChatGPT")
os.makedirs(OUTPUT_DIR, exist_ok=True)

PROMPTS_DATA = [
    {
        "id": 1,
        "name": "01_ad_saas_hero_1x1.png",
        "prompt": "A clean modern advertisement design for a SaaS AI product square 1:1 format Facebook feed laptop mockup AI analytics dashboard floating UI cards Royal Blue Cyan soft gradient minimal tech aesthetic high contrast no text",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 2,
        "name": "02_ad_before_after_1x1.png",
        "prompt": "A performance marketing advertisement split screen before after comparison left side grayscale before AI right side vibrant organized after AI automation flat design Royal Blue Emerald Green square 1:1 no text",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 3,
        "name": "03_ad_human_testimonial_1x1.png",
        "prompt": "A friendly approachable advertisement featuring professional Asian business person using laptop in bright modern office smiling natural lighting AI interface holographic overlay square 1:1 commercial photography no text",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 4,
        "name": "04_ad_stories_urgency_9x16.png",
        "prompt": "A vertical 9:16 mobile advertisement for Instagram Stories bold punchy design promoting limited time AI tool dynamic diagonal composition AI network lines Royal Blue gradient mobile app aesthetic no text",
        "width": 768,
        "height": 1365
    },
    {
        "id": 5,
        "name": "05_ad_ai_feature_spotlight_1x1.png",
        "prompt": "A tech product advertisement showcasing AI feature abstract glowing neural network merging into simple app icon dark navy Royal Blue neon accent lines clean SaaS branding square 1:1 no text",
        "width": 1024,
        "height": 1024
    },
    {
        "id": 6,
        "name": "06_lp_hero_section_1440x900.png",
        "prompt": "A modern SaaS landing page hero section design desktop web layout left side headline space right side clean product dashboard app mockup floating soft shadow white background Royal Blue accent generous whitespace no text",
        "width": 1440,
        "height": 900
    },
    {
        "id": 7,
        "name": "07_lp_feature_section_grid.png",
        "prompt": "A landing page features section design desktop web layout three column grid layout line icons light background Royal Blue accent icons clean modern SaaS website style generous padding no text",
        "width": 1440,
        "height": 900
    },
    {
        "id": 8,
        "name": "08_lp_signup_cta_block.png",
        "prompt": "A landing page bottom call to action section design desktop web layout centered composition bold Royal Blue background block CTA button mockup abstract geometric gradient high conversion SaaS landing page no text",
        "width": 1440,
        "height": 900
    }
]

def fetch_all_sequential():
    print("=== BẮT ĐẦU TẢI TUẦN TỰ 8 ẢNH VỚI COOLDOWN ===")
    for item in PROMPTS_DATA:
        p_id = item["id"]
        filename = item["name"]
        prompt = item["prompt"]
        w = item["width"]
        h = item["height"]
        
        dest_folder_path = os.path.join(OUTPUT_DIR, filename)
        dest_root_path = os.path.join(BASE_DIR, filename)
        
        # Check if already downloaded and valid
        if os.path.exists(dest_folder_path) and os.path.getsize(dest_folder_path) > 5000:
            print(f"[#{p_id}/8] Đã có sẵn: {filename} ({os.path.getsize(dest_folder_path)} bytes)")
            continue
            
        encoded = urllib.parse.quote(prompt)
        url = f"https://image.pollinations.ai/prompt/{encoded}?width={w}&height={h}&nologo=true"
        
        print(f"[#{p_id}/8] Đang tạo và tải: {filename}...")
        for attempt in range(4):
            try:
                time.sleep(3)
                req = urllib.request.Request(url, headers={'User-Agent': f'CustomAgent_{p_id}_{attempt}'})
                with urllib.request.urlopen(req, timeout=60) as response:
                    data = response.read()
                    if len(data) > 3000:
                        with open(dest_folder_path, "wb") as f:
                            f.write(data)
                        with open(dest_root_path, "wb") as f:
                            f.write(data)
                        print(f" -> [THÀNH CÔNG #{p_id}] {filename} ({len(data)} bytes)")
                        break
            except Exception as e:
                print(f" -> [Thử lại lần {attempt+1}] {e}")
                time.sleep(4)
        
        time.sleep(2)
        
    print("\n=== HOÀN TẤT TUẦN TỰ ===")

if __name__ == "__main__":
    fetch_all_sequential()
