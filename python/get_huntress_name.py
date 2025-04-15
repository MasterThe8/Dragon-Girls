import json

def get_names_from_json(file_path):
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            data = json.load(f)
        
        names = [item['name'] for item in data if 'name' in item]
        return names
    
    except FileNotFoundError:
        print("File tidak ditemukan.")
    except json.JSONDecodeError:
        print("Format JSON tidak valid.")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")

# Ganti dengan path ke file JSON kamu
file_path = "assets/data/waifu.json"
names = get_names_from_json(file_path)

if names:
    print("Nama-nama yang ditemukan:")
    for name in names:
        print(f"- {name}")
