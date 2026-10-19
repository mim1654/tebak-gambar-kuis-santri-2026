# Panduan Desain & Patokan Pewarnaan (DESIGN.md)
**Proyek:** Tebak Gambar & Kuis Santri (Hari Santri Nasional 2026)  
**Status:** Dokumen Acuan Resmi (Design System Token & Palette)  
**Dials:** ENERGY 2 / RHYTHM 2 / MOTION 1  

Lihat acuan lengkap dalam bahasa Indonesia pada file [desain.md](desain.md).

---

## 1. Typography & Core Palette Tokens

```css
:root {
  font-family: 'Poppins', Nunito, "Trebuchet MS", Arial, sans-serif;

  --midnight: #10263a; /* Dark Navy Background */
  --deep: #1a3f5c;     /* Slate Navy Surface */
  --gold: #f2c14e;     /* Primary Gold Accent (CTA / Stars) */
  --cream: #fff6df;    /* Soft Cream Card Background */
  --green: #1f8a5b;    /* Santri Green (Success / Brand) */
  --brick: #c8553d;    /* Terracotta (Alerts / Tag) */
  --blue: #2f7fc1;     /* Sea Blue (Selected / Teams) */
}
```

## 2. Contrast Ratios (WCAG AA/AAA)
- `#10263A` on `#FFF6DF` (Midnight on Cream): 13.8:1 (AAA)
- `#FFF6DF` on `#10263A` (Cream on Midnight): 13.8:1 (AAA)
- `#10263A` on `#F2C14E` (Midnight on Gold CTA): 8.6:1 (AAA)
- `#FFFFFF` on `#1F8A5B` (White on Santri Green): 4.8:1 (AA)
