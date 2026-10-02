import os
import glob
from concurrent.futures import ProcessPoolExecutor
from PIL import Image
import time

SRC_DIR = r"D:\hero frames\hero-frames"
DEST_DIR = r"d:\antigravity\real estate dubai website\public\hero-frames"

def process_frame(src_path):
    filename = os.path.basename(src_path)
    # filename is e.g. frames_0001.jpg
    frame_num = filename.split('_')[1].split('.')[0]
    dest_path = os.path.join(DEST_DIR, f"frame_{frame_num}.webp")
    
    if os.path.exists(dest_path) and os.path.getsize(dest_path) > 10000:
        return dest_path
    
    try:
        with Image.open(src_path) as img:
            # 1920 x 1080 (16:9 ratio matches 7680x4320 exactly: 7680/4320 = 16/9 = 1.777778)
            resized = img.resize((1920, 1080), Image.Resampling.LANCZOS)
            resized.save(dest_path, "WEBP", quality=86, method=4)
        return dest_path
    except Exception as e:
        print(f"Error processing {src_path}: {e}")
        return None

def main():
    os.makedirs(DEST_DIR, exist_ok=True)
    files = sorted(glob.glob(os.path.join(SRC_DIR, "frames_*.jpg")))
    print(f"Found {len(files)} frames to optimize in {SRC_DIR}")
    
    start_time = time.time()
    with ProcessPoolExecutor() as executor:
        results = list(executor.map(process_frame, files))
    
    valid_count = len([r for r in results if r is not None])
    print(f"Processed {valid_count} frames in {round(time.time() - start_time, 2)}s into {DEST_DIR}")

if __name__ == "__main__":
    main()
