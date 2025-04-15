import os
import json

# Path konfigurasi
WAIFU_JSON = "assets/data/waifu.json"
ICON_DIR = "assets/icon"

# Ambil daftar nama file icon (tanpa ekstensi)
icon_files = {os.path.splitext(f)[0]: f for f in os.listdir(ICON_DIR) if f.endswith(".png")}

# Normalisasi helper
def normalize(text):
    return text.lower().replace("_", "").replace("-", "").replace(" ", "").replace("&", "").replace(".", "")

# Baca data JSON
with open(WAIFU_JSON, "r", encoding="utf-8") as f:
    waifu_data = json.load(f)

missing_icons = []

# Proses pencocokan dan penambahan field "icon"
for waifu in waifu_data:
    name = waifu.get("name", "")
    parts = name.replace("[", "").replace("]", "").replace("(", "").replace(")", "").split()
    found_icon = None

    for part in parts:
        norm_part = normalize(part)
        for icon_key in icon_files:
            if norm_part in normalize(icon_key):
                found_icon = f"{ICON_DIR}/{icon_files[icon_key]}"
                break
        if found_icon:
            break

    if found_icon:
        waifu["icon"] = found_icon
    else:
        waifu["icon"] = None
        missing_icons.append(name)

# Simpan hasilnya kembali
with open(WAIFU_JSON, "w", encoding="utf-8") as f:
    json.dump(waifu_data, f, indent=2, ensure_ascii=False)

# Tampilkan hasil
print("✅ Penambahan 'icon' selesai.")
if missing_icons:
    print("\n❗ Waifu tanpa icon yang cocok:")
    for name in missing_icons:
        print("-", name)
else:
    print("🎉 Semua waifu memiliki icon.")
