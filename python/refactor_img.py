import os
import json

WAIFU_JSON_PATH = "assets/data/waifu.json"
IMG_BASE_PATH = "assets/img"
OUTPUT_PATH = "assets/data/waifu.json"

# Load data waifu
with open(WAIFU_JSON_PATH, "r", encoding="utf-8") as f:
    waifus = json.load(f)

for waifu in waifus:
    folder_path = waifu.get("img", "")
    full_folder = os.path.join(folder_path)

    # Validasi folder
    if os.path.isdir(full_folder):
        # Ambil semua gambar di dalam folder
        image_files = [
            file for file in os.listdir(full_folder)
            if file.lower().endswith((".png", ".gif"))
        ]
        waifu["images"] = image_files
    else:
        waifu["images"] = []

    # Hapus field img lama (opsional)
    del waifu["img"]

# Simpan hasilnya
with open(OUTPUT_PATH, "w", encoding="utf-8") as f:
    json.dump(waifus, f, indent=2, ensure_ascii=False)

print(f"✅ File berhasil disimpan ke: {OUTPUT_PATH}")
