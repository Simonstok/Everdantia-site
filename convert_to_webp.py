import os
from PIL import Image

# Directory containing images to convert
input_dir = r"public/images"

# Walk through all files in the directory
for root, dirs, files in os.walk(input_dir):
    for file in files:
        if file.lower().endswith(('.jpg', '.jpeg', '.png')):
            img_path = os.path.join(root, file)
            webp_path = os.path.splitext(img_path)[0] + '.webp'
            try:
                img = Image.open(img_path)
                img.save(webp_path, 'webp', quality=85)
                print(f"Converted: {img_path} -> {webp_path}")
            except Exception as e:
                print(f"Failed to convert {img_path}: {e}")
