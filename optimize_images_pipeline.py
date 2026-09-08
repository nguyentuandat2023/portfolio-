import os, sys, glob
from PIL import Image

sys.stdout.reconfigure(encoding='utf-8')

def get_target_files():
    targets = []
    # Root images
    for f in os.listdir('.'):
        if f.lower().endswith(('.png', '.jpg', '.jpeg')) and os.path.isfile(f):
            # Skip generated test files or temporary files
            if not f.startswith(('test_', 'screenshot_', 'temp_')):
                targets.append(os.path.normpath(f))
    
    # Profile previews
    if os.path.exists('profile/previews'):
        for f in os.listdir('profile/previews'):
            if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                targets.append(os.path.normpath(os.path.join('profile/previews', f)))
                
    # Galant health series
    galant_dir = 'Thiết kế truyền thông sức khỏa sinh sản'
    if os.path.exists(galant_dir):
        for f in os.listdir(galant_dir):
            if f.lower().endswith(('.png', '.jpg', '.jpeg')):
                targets.append(os.path.normpath(os.path.join(galant_dir, f)))
                
    return sorted(list(set(targets)))

def resize_keep_ratio(img, max_dim):
    w, h = img.size
    if max(w, h) <= max_dim:
        return img.copy()
    scale = float(max_dim) / max(w, h)
    new_w = max(1, int(w * scale))
    new_h = max(1, int(h * scale))
    return img.resize((new_w, new_h), Image.Resampling.LANCZOS)

def process_all():
    files = get_target_files()
    print(f"Found {len(files)} image files to optimize.")
    
    total_orig_size = sum(os.path.getsize(f) for f in files)
    print(f"Total original size: {total_orig_size / (1024*1024):.2f} MB\n")
    
    total_full_webp_size = 0
    total_thumb_webp_size = 0
    total_in_place_size = 0
    
    for idx, filepath in enumerate(files):
        orig_sz = os.path.getsize(filepath)
        base, ext = os.path.splitext(filepath)
        ext_lower = ext.lower()
        
        try:
            with Image.open(filepath) as img:
                orig_w, orig_h = img.size
                has_alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
                
                # 1. Generate Full HD WebP (Max dimension 1920px)
                full_img = resize_keep_ratio(img, 1920)
                webp_full_path = base + '.webp'
                full_img.save(webp_full_path, 'WEBP', quality=88, method=6)
                full_webp_sz = os.path.getsize(webp_full_path)
                total_full_webp_size += full_webp_sz
                
                # 2. Generate Retina Thumbnail WebP (Max dimension 800px)
                thumb_img = resize_keep_ratio(img, 800)
                webp_thumb_path = base + '.thumb.webp'
                thumb_img.save(webp_thumb_path, 'WEBP', quality=86, method=6)
                thumb_webp_sz = os.path.getsize(webp_thumb_path)
                total_thumb_webp_size += thumb_webp_sz
                
                # 3. Optimize original file in-place (so existing fallback links are fast)
                if ext_lower in ('.jpg', '.jpeg'):
                    # Save optimized progressive JPEG capped at 1920px
                    rgb_img = full_img.convert('RGB')
                    rgb_img.save(filepath, 'JPEG', quality=85, optimize=True, progressive=True)
                elif ext_lower == '.png':
                    if not has_alpha:
                        # Non-transparent photographic PNGs: save with high compression or quantization
                        rgb_img = full_img.convert('RGB')
                        # If huge, quantize to 256 colors with adaptive palette for sharp graphics or save optimized
                        quantized = rgb_img.quantize(colors=256, method=2, dither=Image.Dither.FLOYDSTEINBERG)
                        quantized.save(filepath, 'PNG', optimize=True)
                    else:
                        full_img.save(filepath, 'PNG', optimize=True)
                
                new_orig_sz = os.path.getsize(filepath)
                total_in_place_size += new_orig_sz
                
                saved_pct = (1 - full_webp_sz / orig_sz) * 100
                print(f"[{idx+1:3d}/{len(files)}] {os.path.basename(filepath)}: {orig_sz/1024:.0f}KB -> WebP {full_webp_sz/1024:.0f}KB (-{saved_pct:.1f}%), Thumb {thumb_webp_sz/1024:.0f}KB")
                
        except Exception as e:
            print(f"Error processing {filepath}: {e}")
            total_in_place_size += orig_sz
            
    print("\n" + "="*60)
    print(f"TOTAL SUMMARY:")
    print(f"  Original Files Size:      {total_orig_size / (1024*1024):.2f} MB")
    print(f"  In-Place Optimized Size:  {total_in_place_size / (1024*1024):.2f} MB (-{(1 - total_in_place_size/total_orig_size)*100:.1f}%)")
    print(f"  Full HD WebP Total Size:  {total_full_webp_size / (1024*1024):.2f} MB (-{(1 - total_full_webp_size/total_orig_size)*100:.1f}%)")
    print(f"  Thumbnails Total Size:    {total_thumb_webp_size / (1024*1024):.2f} MB")
    print("="*60)

if __name__ == '__main__':
    process_all()
