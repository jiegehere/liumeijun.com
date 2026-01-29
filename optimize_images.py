from PIL import Image
import os

def optimize_image(input_path, max_size_kb=300):
    img = Image.open(input_path)
    quality = 95
    output_path = input_path
    
    while quality > 10:
        img.save(output_path, optimize=True, quality=quality)
        size_kb = os.path.getsize(output_path) / 1024
        
        if size_kb <= max_size_kb:
            print(f"✓ {os.path.basename(input_path)}: {size_kb:.1f}KB (质量: {quality})")
            return
        
        quality -= 5
    
    print(f"⚠ {os.path.basename(input_path)}: {size_kb:.1f}KB (已达到最低质量)")

def main():
    upload_dir = 'uploads'
    if not os.path.exists(upload_dir):
        print(f"目录 {upload_dir} 不存在")
        return
    
    for file in os.listdir(upload_dir):
        if file.lower().endswith(('.jpg', '.jpeg', '.png', '.webp')):
            optimize_image(os.path.join(upload_dir, file), max_size_kb=200)

if __name__ == '__main__':
    main()
