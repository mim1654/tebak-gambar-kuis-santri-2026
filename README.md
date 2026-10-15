# Tebak Gambar & Kuis Santri — Hari Santri Nasional 2026

Aplikasi web edukasi statis berbahasa Indonesia untuk kegiatan Hari Santri Nasional pada 22 Oktober 2026. Dibuat dengan React, TypeScript, Vite, SVG lokal, dan penyimpanan pengaturan di browser.

## Fitur

- Enam mode: Tebak Gambar, Kuis Perilaku Baik, Pasangkan Gambar, Temukan yang Berbeda, Urutkan 3 Langkah, dan Mengenal Hari Santri.
- 36 aktivitas lokal yang terbagi menjadi enam mode.
- Pengaturan guru ber-PIN lokal (awal `1234`), mode kelompok, skor opsional, tingkat kesulitan, jumlah soal, percobaan ulang, dan pengaturan aksesibilitas.
- Ekspor/impor pengaturan JSON dengan validasi tipe dasar.
- Mode tenang, kontras tinggi, ukuran teks, text-to-speech bila didukung, fokus keyboard, dan target sentuh besar.
- PWA/service worker untuk menyimpan aset aplikasi inti setelah kunjungan pertama.
- Tidak ada backend, iklan, analitik, akun, atau pengiriman hasil permainan.

## Persyaratan

- Node.js 22 atau versi LTS modern.
- Browser modern (Chrome, Edge, Firefox, Safari versi terkini).
- Koneksi internet untuk instalasi dependensi pertama kali dan kunjungan pertama ke aplikasi yang dipublikasikan.

## Menjalankan di komputer

1. Unduh dan ekstrak ZIP proyek.
2. Pasang Node.js dari situs resmi Node.js jika belum ada.
3. Buka terminal/Command Prompt di folder proyek.
4. Jalankan `npm install`.
5. Jalankan `npm run dev`.
6. Buka alamat lokal yang dicetak terminal (biasanya `http://localhost:5173`).

## Build dan preview

```bash
npm test
npm run build
npm run preview
```

Build menghasilkan folder `dist/`. Untuk memastikan path deployment sesuai, workflow GitHub Actions membangun dengan `GITHUB_PAGES=true` dan base path `/tebak-gambar-kuis-santri-2026/`.

## Publikasi ke GitHub Pages

1. Buat repository GitHub dengan nama **`tebak-gambar-kuis-santri-2026`** (atau sesuaikan `base` di `vite.config.ts` dan path pada workflow bila nama repository berbeda).
2. Unggah seluruh isi folder proyek ke branch `main`, termasuk folder `.github/workflows`.
3. Buka **Settings → Pages** pada repository.
4. Pada **Build and deployment**, pilih **Source: GitHub Actions**.
5. Buka tab **Actions**, tunggu workflow “Build and deploy to GitHub Pages” selesai dengan status hijau.
6. Alamat publik biasanya `https://USERNAME.github.io/tebak-gambar-kuis-santri-2026/`.
7. Jika repository memakai nama `USERNAME.github.io`, ubah base Vite menjadi `/` dan sesuaikan workflow sebelum build.

## Bank soal

Edit `src/data/questions.ts`. Setiap soal memiliki ID unik, mode, kategori, instruksi, jawaban, pilihan, nama aset, petunjuk, tingkat kesulitan, teks alternatif, dan status peninjauan (`reviewed`). Untuk soal mode `order`, isi `steps` dengan tiga langkah dalam urutan yang benar. `correct` juga disimpan untuk referensi soal.

Mode `history` diberi `reviewed: false` karena materi Hari Santri dan representasi budaya/agama perlu ditinjau oleh guru sebelum kegiatan. Periksa kebenaran konten dan kesesuaian dengan peserta didik sebelum dipakai.

## Menambahkan aset

Ilustrasi dibuat secara lokal melalui komponen SVG di `src/components/Artwork.tsx`. Tambahkan bentuk SVG baru di sana dan gunakan nama ilustrasi tersebut pada properti `image` di data soal. Jangan memasukkan URL eksternal jika aplikasi harus tetap mandiri/offline. Untuk aset pihak ketiga, cantumkan sumber, pemilik, lisensi, dan perubahan dalam `CREDITS.md`.

## Pengaturan guru

Klik ikon roda gigi → masukkan PIN awal `1234`. PIN ini hanya mencegah perubahan tidak sengaja dan bukan mekanisme keamanan kuat. Pengaturan disimpan di `localStorage` browser. Gunakan tab **Data & sistem** untuk ekspor/impor JSON atau reset. Impor hanya menerima pengaturan yang dikenali dan tidak menjalankan kode.

## Offline dan PWA

Service worker didaftarkan pada build produksi dan menyimpan aset inti setelah kunjungan awal. Untuk mengetes secara lokal, jalankan `npm run build` lalu `npm run preview`, buka aplikasi saat online, tunggu hingga halaman termuat, kemudian gunakan DevTools → Network → Offline dan muat ulang. Browser dapat menghapus cache, dan pembaruan service worker bisa membutuhkan satu kali kunjungan online. Karena itu, uji pada perangkat yang benar-benar akan digunakan sebelum acara.

## Aksesibilitas dan catatan penggunaan

- Tidak ada batas waktu aktif secara default.
- Pilihan jawaban dapat dioperasikan dengan keyboard dan sentuhan.
- Mode mencocokkan menggunakan pemilihan kartu, bukan drag-and-drop wajib.
- Instruksi audio bersifat tambahan; suara bergantung pada browser/perangkat.
- Guru dapat membacakan instruksi, membantu memilih, dan memberi jeda.
- Skor bukan ukuran tunggal keberhasilan belajar.

## Batasan versi ini

- Gambar adalah ilustrasi SVG vektor bergaya kartun dengan gradasi sederhana, bukan model 3D hasil render.
- Pengaturan timer hanya tersimpan sebagai preferensi; timer tidak diterapkan pada permainan.
- Musik latar tidak disertakan; toggle musik disimpan untuk pengembangan lanjutan, tetapi tidak memutar musik.
- Opsi lanjut otomatis disimpan, tetapi sesi saat ini menggunakan tombol lanjut manual agar peserta didik memiliki waktu respons.
- Pemilihan tim dan pergiliran tersedia; skor pada versi ini berupa skor sesi gabungan, bukan papan skor terpisah untuk masing-masing tim.
- Bank soal mode sejarah ditandai perlu ditinjau oleh guru.

## Lisensi

Kode aplikasi menggunakan lisensi MIT (lihat `LICENSE`). Ilustrasi SVG dalam proyek ini dibuat khusus untuk proyek dan tersedia bersama kode dengan lisensi MIT. Font sistem digunakan agar aplikasi tidak bergantung pada CDN. Lihat `CREDITS.md`.
