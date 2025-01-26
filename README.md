# 📝 My Notes App
Selamat datang di My Notes App! 🎉 <br>
Aplikasi ini membantu Anda mencatat ide, daftar tugas, atau apa pun yang penting dengan mudah dan efisien. Dengan fitur arsip, Anda dapat mengelola catatan aktif dan arsip Anda dengan lebih terorganisir.

## 🌟 Fitur Utama
**1. Add New Note**
- Tambahkan catatan baru menggunakan form sederhana.
- Form memerlukan:
  - __Title__ (maksimal 50 karakter).
  - __Content__ (tidak boleh kosong).
- Validasi Real-Time:
  - Pastikan __Title__ dan __Content__ diisi.
  - Jika melanggar aturan, pengguna akan diberi tahu.
- Tombol __Save Note__ untuk menyimpan catatan baru.

**2. Show Active & Archived Notes**
- __Active Notes__: Menampilkan daftar catatan yang sedang aktif.
- __Archived Notes__: Menampilkan daftar catatan yang telah diarsipkan.
- Tombol __"Show Active Notes"__ atau __"Show Archived Notes"__ berganti secara dinamis untuk mengubah daftar yang ditampilkan.
  
**3. Card Note** <br>
Setiap catatan yang ditampilkan (baik aktif maupun arsip) memiliki:
- __Informasi__:
  - Judul (Title).
  - Isi (Content).
  - Tanggal dibuat (Created At).
- __Tombol Utama__:
  - Update: Untuk mengubah judul dan isi catatan.
  - Delete: Untuk menghapus catatan.
  - Archive/Unarchive: Tombol dinamis untuk mengarsipkan atau mengembalikan catatan ke daftar aktif.
    
## 🚀 Teknologi yang Digunakan
- __Notes API Dicoding__: Aplikasi menggunakan endpoint https://notes-api.dicoding.dev/v2 untuk menyimpan, mengambil, mengedit, dan menghapus data catatan.
- __Webpack__: Untuk membundel file proyek.
- __Prettier__: Untuk memastikan format kode tetap konsisten dan rapi.
- __GSAP__: Untuk menambahkan animasi halus dan menarik pada interaksi di aplikasi.
- __SweetAlert2__: Untuk menampilkan notifikasi error atau feedback pengguna yang elegan.

__Selamat mencoba My Notes App! 💡__
