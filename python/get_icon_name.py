import os

def list_files_in_folder(folder_path):
    try:
        # Menampilkan hanya file (bukan folder)
        files = [f for f in os.listdir(folder_path) if os.path.isfile(os.path.join(folder_path, f))]
        
        if not files:
            print("Tidak ada file di folder tersebut.")
        else:
            print("Daftar file:")
            for file in files:
                print(f"- {file}")
    except FileNotFoundError:
        print("Folder tidak ditemukan.")
    except Exception as e:
        print(f"Terjadi kesalahan: {e}")

# Ganti dengan path folder yang ingin kamu cek
folder = "assets\icon"
list_files_in_folder(folder)
