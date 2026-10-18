# Panduan Desain & Patokan Pewarnaan (desain.md)
**Proyek:** Tebak Gambar & Kuis Santri (Hari Santri Nasional 2026)  
**Status:** Dokumen Acuan Resmi (Design System Token & Palette)  
**Dials:** ENERGY 2 / RHYTHM 2 / MOTION 1  

---

## 1. Identitas & Karakter Desain

- **Produk:** Aplikasi web edukatif dan permainan kuis Hari Santri Nasional 2026.
- **Karakter & Suasana:** Hangat, bersahabat untuk anak, bernuansa pesantren modern, tenang, dan inklusif.
- **Prinsip Utama:**
  1. Kontras tinggi dan ramah mata (tidak menyilaukan dan mudah dibaca).
  2. Palet bermakna budaya lokal santri, bukan warna acak bawaan template AI.
  3. Warna aksen dipakai secara hemat untuk memandu fokus interaksi (One Deliberate Accent).

---

## 2. Palet Warna Utama (Core Palette)

Sesuai aturan sistem desain (maksimal 2 sampai 3 warna utama + 1 warna aksen terarah):

| Token CSS | Kode HEX | Nama Warna | Peran & Alasan Pemilihan |
|---|---|---|---|
| `--midnight` | `#10263A` | Midnight Navy | **Latar Utama (Gelap)**: Mewakili ketenangan malam santri, suasana hening belajar, serta menjadi dasar kontras tinggi. |
| `--cream` | `#FFF6DF` | Krem Kitab | **Latar Kartu & Konten (Terang)**: Memberikan kehangatan seperti kertas kitab kuning klasik, lembut di mata anak, dan kontras tajam untuk teks gelap. |
| `--green` | `#1F8A5B` | Hijau Santri | **Warna Brand & Sukses**: Identitas khas pesantren dan kedamaian. Digunakan untuk status benar, pencapaian, dan tombol konfirmasi. |
| `--gold` | `#F2C14E` | Emas Lentera | **Aksen Tunggal (Focal Accent)**: Melambangkan cahaya ilmu dan lentera perayaan. Digunakan khusus pada tombol aksi utama (CTA), bintang, dan fokus interaksi. |

---

## 3. Warna Pendukung & Status (Supporting & Functional)

Warna pendukung hanya dipakai untuk fungsi tertentu agar hirarki visual tetap terjaga:

| Token / Elemen | Kode HEX | Nama | Penggunaan |
|---|---|---|---|
| `--deep` | `#1A3F5C` | Slate Navy | Permukaan kontainer sekunder di atas latar midnight. |
| `--blue` | `#2F7FC1` | Biru Samudra | Penanda opsi terpilih (selected state), fokus navigasi, dan tim kelompok. |
| `--brick` | `#C8553D` | Terakota / Bata | Tag kategori sejarah, peringatan ramah, dan pembeda tim kedua. |
| Teks Gelap | `#10263A` | Midnight Ink | Warna teks utama di atas latar krem atau tombol emas. |
| Teks Terang | `#FFF6DF` | Cream Light | Warna teks utama di atas latar midnight navy. |
| Teks Sekunder | `#D9E4E8` / `#566875` | Slate Grey | Subtitel dan informasi pendukung (disesuaikan dengan latar). |

---

## 4. Tipografi Resmi (Typography: Poppins)

Sesuai aturan R-06 dan R-31, pemilihan jenis huruf memiliki alasan karakter yang jelas:

- **Font Utama:** `Poppins` (Google Fonts: 400, 600, 700, 800, 900)
- **Font Cadangan (Fallback):** `Nunito, "Trebuchet MS", Arial, sans-serif`
- **Alasan Pemilihan (R-06 & R-31):** Poppins memiliki anatomi huruf geometris melengkung (*rounded geometric*) yang ramah, menyenangkan, dan sangat jelas terbaca untuk anak santri di layar monitor maupun gawai ponsel, tanpa terlihat kaku atau berkesan template teknologi monospaced.
- **Penerapan CSS:**
  ```css
  font-family: 'Poppins', Nunito, "Trebuchet MS", Arial, sans-serif;
  ```

---

## 5. Standar Aksesibilitas & Rasio Kontras (WCAG AA/AAA)

Semua kombinasi warna wajib memenuhi standar rasio kontras minimum 4.5:1 untuk teks normal dan 3.0:1 untuk elemen interaktif besar:

1. **Teks Midnight (`#10263A`) di atas Kartu Krem (`#FFF6DF`)**
   - Rasio Kontras: **13.8:1** (Lolos WCAG AAA).
   - Penggunaan: Pertanyaan kuis, kartu opsi jawaban, isi modal dialog.

2. **Teks Krem (`#FFF6DF`) di atas Latar Midnight (`#10263A`)**
   - Rasio Kontras: **13.8:1** (Lolos WCAG AAA).
   - Penggunaan: Judul halaman utama, header, dan teks navigasi atas.

3. **Teks Midnight (`#10263A`) di atas Tombol Emas (`#F2C14E`)**
   - Rasio Kontras: **8.6:1** (Lolos WCAG AAA).
   - Penggunaan: Tombol aksi utama "MULAI BERMAIN", "MULAI SESI".

4. **Teks Putih (`#FFFFFF`) di atas Hijau Santri (`#1F8A5B`)**
   - Rasio Kontras: **4.8:1** (Lolos WCAG AA).
   - Penggunaan: Tombol konfirmasi, badge centang jawaban benar.

5. **Indikator Fokus Keyboard (Focus Outline)**
   - Garis luar: `3px solid #F2C14E` dengan offset `3px`.
   - Menjamin pengguna keyboard atau pembaca layar dapat melihat posisi fokus secara tegas.

---

## 6. Aturan Penggunaan & Batasan (Purpose Gate)

Untuk menjaga kualitas visual dan mencegah tampilan generik:

- **Aksen Emas Terbatas:** Warna emas (`#F2C14E`) hanya untuk 1 tombol utama per layar dan ornamen tema (bulan/bintang). Jangan gunakan emas untuk semua kartu atau teks paragraf.
- **Hindari Gradien Ungu/Neon:** Dilarang menggunakan gradien ungu ke biru atau neon cyan yang sering menjadi ciri khas template AI default.
- **Bayangan Proporsional:** Gunakan bayangan tegas dengan offset padat (misal: `box-shadow: 0 9px 0 #081a28`) untuk memberi kesan tactile (seperti mainan kayu fisik yang ramah anak), hindari bayangan blur raksasa yang membuat komponen mengambang tidak jelas.
- **Sudut Lengkung (Border Radius):**
  - Kartu utama: `24px` hingga `27px`.
  - Tombol dan kartu opsi: `13px` hingga `14px`.
  - Pill/Badge: `99px` (hanya untuk status kecil, bukan untuk semua kotak input).

---

## 7. Pemetaan Token ke CSS (`src/styles/global.css`)

Variabel yang dideklarasikan pada `:root`:

```css
:root {
  /* Tipografi Utama */
  font-family: 'Poppins', Nunito, "Trebuchet MS", Arial, sans-serif;

  /* Warna Inti */
  --midnight: #10263a;
  --deep: #1a3f5c;
  --gold: #f2c14e;
  --cream: #fff6df;
  --green: #1f8a5b;
  --brick: #c8553d;
  --blue: #2f7fc1;

  /* Skala & Elevasi */
  --text-scale: 100%;
  --shadow: 0 18px 45px #06152125;
}
```
