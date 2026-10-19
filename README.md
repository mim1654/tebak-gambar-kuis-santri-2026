# Belajar dan Bermain Bersama Santri

Aplikasi web sederhana untuk mengenal Hari Santri dan kehidupan santri. Konten dirancang untuk digunakan bersama anak usia 6 sampai 18 tahun dengan kebutuhan belajar yang beragam, termasuk pengguna yang lebih nyaman belajar lewat gambar, teks, suara, atau sentuhan.

## Isi aplikasi

- Dua permainan: memilih gambar dari tiga pilihan dan memasangkan dua pasang gambar dengan ketukan.
- Empat topik: perlengkapan santri, tempat ibadah, Al-Qur’an dan belajar, serta kegiatan santri.
- Pengajar memilih topik dan jumlah soal sampai 20.
- Mode bermain sendiri atau dua tim. Dalam mode tim, kedua panel soal dan skor tampil bersamaan pada satu layar.
- Jawaban benar pada percobaan pertama mendapat satu poin. Jawaban salah tidak mengurangi poin dan memberi satu kesempatan mencoba lagi.
- Instruksi tetap terlihat dan dapat dibacakan dengan suara bahasa Indonesia dari browser. Suara dapat dimatikan.
- Tidak ada hitung mundur.

## Menjalankan aplikasi

Gunakan Node.js versi LTS modern, lalu jalankan:

```bash
npm ci
npm run dev
```

Untuk memeriksa build produksi:

```bash
npm test
npm run build
npm run preview
```

GitHub Actions membangun aplikasi untuk GitHub Pages pada alamat proyek ini. Service worker menyimpan halaman yang sudah dibuka dan gambar yang dimuat. Suara narasi bergantung pada dukungan browser dan suara bahasa Indonesia yang tersedia pada perangkat.

## Aset gambar dan identitas

Gambar benda yang tampil berasal dari gambar gabungan yang diberikan pemilik proyek dan dipisahkan menjadi kartu gambar individual. Logo PLP berasal dari pemilik proyek. Logo Hari Santri 2026 berasal dari pengumuman resmi Kementerian Agama; rincian sumber dan atribusi dicatat dalam `CREDITS.md`.

## Catatan penggunaan

Kuis ini adalah alat belajar bersama, bukan penilaian kemampuan. Pengajar dapat membantu membacakan pertanyaan, memberi waktu tambahan, dan menghentikan permainan kapan saja. Suara hanya berjalan setelah pengguna menekan tombol dengar atau memilih jawaban.

Kode aplikasi menggunakan lisensi MIT. Lihat `CREDITS.md` untuk sumber gambar dan identitas.
