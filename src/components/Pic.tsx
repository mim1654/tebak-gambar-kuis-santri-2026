import type { ReactNode } from 'react';
import { RealisticPic } from './RealisticPic';

const art: Record<string, { label: string; draw: ReactNode }> = {
  peci: { label: 'Peci hitam', draw: <>
    <path d="M24 78 Q22 40 60 36 Q98 40 96 78 Q96 90 60 90 Q24 90 24 78Z" fill="url(#gDark)" />
    <path d="M22 76 Q60 98 98 76 L98 88 Q60 108 22 88Z" fill="#0b1117" />
    <path d="M34 52 Q60 42 86 52" stroke="#fff" strokeOpacity=".15" strokeWidth="4" fill="none" strokeLinecap="round" />
  </> },
  sarung: { label: 'Sarung kotak-kotak', draw: <>
    <path d="M32 18 H88 L96 98 Q60 108 24 98Z" fill="url(#gBlue)" />
    {[0, 1, 2, 3, 4].map(i => <path key={`h${i}`} d={`M${28 + i * 0} ${34 + i * 16} H${94}`} stroke="#fff" strokeOpacity=".55" strokeWidth="3" />)}
    {[0, 1, 2, 3, 4].map(i => <path key={`v${i}`} d={`M${38 + i * 12} 18 V104`} stroke="#fff" strokeOpacity=".4" strokeWidth="3" />)}
    <path d="M32 18 H88" stroke="#17212b" strokeWidth="6" strokeLinecap="round" />
  </> },
  sajadah: { label: 'Sajadah', draw: <>
    <rect x="30" y="10" width="60" height="96" rx="6" fill="url(#gGreen)" />
    <rect x="36" y="16" width="48" height="84" rx="4" fill="none" stroke="#f2c14e" strokeWidth="3" />
    <path d="M44 100 V58 Q60 30 76 58 V100Z" fill="#0f5a3a" stroke="#f2c14e" strokeWidth="2.5" />
    <circle cx="60" cy="64" r="6" fill="#f2c14e" />
    {[0, 1, 2, 3, 4, 5].map(i => <path key={i} d={`M${33 + i * 10} 10 v-6 M${33 + i * 10} 106 v6`} stroke="#f2c14e" strokeWidth="2" />)}
  </> },
  masjid: { label: 'Masjid', draw: <>
    <rect x="18" y="62" width="84" height="44" fill="#fff6df" stroke="#d3a75d" strokeWidth="2" />
    <path d="M32 62 Q60 14 88 62Z" fill="url(#gGreen)" />
    <path d="M60 14 V4" stroke="#e0a526" strokeWidth="3" />
    <circle cx="60" cy="4" r="3" fill="#f2c14e" />
    <path d="M50 106 V84 Q60 70 70 84 V106Z" fill="#1a3f5c" />
    <rect x="8" y="34" width="12" height="72" fill="#fff6df" stroke="#d3a75d" strokeWidth="2" />
    <path d="M8 34 L14 18 L20 34Z" fill="url(#gGold)" />
    <rect x="100" y="34" width="12" height="72" fill="#fff6df" stroke="#d3a75d" strokeWidth="2" />
    <path d="M100 34 L106 18 L112 34Z" fill="url(#gGold)" />
  </> },
  pesantren: { label: 'Pesantren', draw: <>
    <rect x="14" y="52" width="92" height="54" fill="#f1d9a3" stroke="#c9a15a" strokeWidth="2" />
    <path d="M8 54 L60 24 L112 54Z" fill="url(#gRed)" />
    {[0, 1, 2].map(i => <rect key={i} x={24 + i * 28} y="64" width="18" height="22" rx="2" fill="#5aa6e6" stroke="#245f94" strokeWidth="2" />)}
    <rect x="50" y="86" width="20" height="20" fill="#7a4d22" />
    <path d="M60 24 V12 L72 17 L60 22" fill="#1f8a5b" />
  </> },
  bedug: { label: 'Bedug', draw: <>
    <rect x="22" y="36" width="76" height="52" rx="10" fill="url(#gBrown)" />
    <ellipse cx="22" cy="62" rx="9" ry="26" fill="#e9c98d" stroke="#7a4d22" strokeWidth="3" />
    <path d="M30 40 L46 86 M52 36 L58 88 M82 36 L72 88" stroke="#4a2c10" strokeOpacity=".5" strokeWidth="3" />
    <path d="M30 88 L22 104 M90 88 L98 104" stroke="#4a2c10" strokeWidth="6" strokeLinecap="round" />
    <path d="M92 20 L108 8" stroke="#c58a4d" strokeWidth="5" strokeLinecap="round" />
  </> },
  kitab: { label: 'Kitab', draw: <>
    <path d="M20 26 H64 V100 H24 Q20 100 20 96Z" fill="url(#gBrown)" />
    <path d="M100 26 H60 V100 H96 Q100 100 100 96Z" fill="url(#gGold)" />
    <path d="M60 26 V100" stroke="#4a2c10" strokeWidth="3" />
    {[0, 1, 2, 3, 4].map(i => <path key={i} d={`M68 ${40 + i * 11} H92`} stroke="#8a5a1a" strokeWidth="2.5" strokeLinecap="round" />)}
    {[0, 1, 2].map(i => <path key={`l${i}`} d={`M28 ${42 + i * 14} H54`} stroke="#f2c14e" strokeWidth="3" strokeLinecap="round" />)}
  </> },
  tasbih: { label: 'Tasbih', draw: <>
    {Array.from({ length: 14 }).map((_, i) => { const a = (i / 14) * Math.PI * 2; return <circle key={i} cx={60 + Math.cos(a) * 34} cy={54 + Math.sin(a) * 34} r="7" fill="url(#gGreen)" stroke="#0f5a3a" strokeWidth="1.5" />; })}
    <path d="M60 88 V104" stroke="#f2c14e" strokeWidth="4" strokeLinecap="round" />
    <circle cx="60" cy="90" r="8" fill="url(#gGold)" stroke="#b9831a" strokeWidth="1.5" />
    <path d="M54 104 H66" stroke="#f2c14e" strokeWidth="6" strokeLinecap="round" />
  </> },
  lentera: { label: 'Lentera', draw: <>
    <path d="M60 6 Q50 6 50 14 M50 14 H70" stroke="#7a4d22" strokeWidth="3" fill="none" strokeLinecap="round" />
    <rect x="38" y="16" width="44" height="10" rx="3" fill="url(#gBrown)" />
    <path d="M42 26 H78 L88 82 H32Z" fill="#ffe9a8" fillOpacity=".55" stroke="#b9831a" strokeWidth="3" />
    <path d="M60 70 Q48 56 60 38 Q72 56 60 70Z" fill="url(#gRed)" />
    <path d="M60 68 Q54 58 60 48 Q66 58 60 68Z" fill="#ffd25a" />
    <rect x="30" y="82" width="60" height="12" rx="4" fill="url(#gBrown)" />
  </> },
  mukena: { label: 'Mukena', draw: <>
    <path d="M60 14 Q92 14 92 52 Q92 70 98 100 H22 Q28 70 28 52 Q28 14 60 14Z" fill="#f4efe4" stroke="#cfc6ae" strokeWidth="2.5" />
    <ellipse cx="60" cy="48" rx="18" ry="20" fill="#e8b08a" />
    <path d="M42 46 Q60 22 78 46 Q60 36 42 46Z" fill="#f4efe4" />
    <circle cx="53" cy="50" r="2" fill="#10263a" /><circle cx="67" cy="50" r="2" fill="#10263a" />
    <path d="M55 58 Q60 62 65 58" stroke="#9e5141" strokeWidth="2" fill="none" strokeLinecap="round" />
  </> },
  bendera: { label: 'Bendera merah putih', draw: <>
    <rect x="22" y="12" width="6" height="96" rx="3" fill="#7a4d22" />
    <path d="M28 18 Q50 10 70 18 T104 18 V46 Q86 54 70 46 T28 46Z" fill="#d93a2b" />
    <path d="M28 46 Q50 38 70 46 T104 46 V74 Q86 82 70 74 T28 74Z" fill="#fff" stroke="#e5e5e5" strokeWidth="1.5" />
  </> },
  pensil: { label: 'Pensil', draw: <>
    <g transform="rotate(-35 60 60)">
      <rect x="46" y="10" width="28" height="68" fill="url(#gGold)" />
      <rect x="46" y="10" width="28" height="12" fill="#e2745b" />
      <path d="M46 78 L60 106 L74 78Z" fill="#f1d9a3" />
      <path d="M55 96 L60 106 L65 96Z" fill="#17212b" />
      <path d="M54 22 V78 M66 22 V78" stroke="#b9831a" strokeOpacity=".5" strokeWidth="2" />
    </g>
  </> },
  buku: { label: 'Buku', draw: <>
    <rect x="24" y="22" width="72" height="82" rx="5" fill="url(#gBlue)" />
    <rect x="24" y="22" width="12" height="82" rx="3" fill="#1a3f5c" />
    <rect x="46" y="36" width="40" height="26" rx="3" fill="#fff6df" />
    <path d="M50 74 H84 M50 84 H74" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
  </> },
};

const emoji: Record<string, string> = {
  // perilaku baik
  // urutan
  'steps-book': '📚', 'steps-hands': '🧼', 'steps-prayer': '🕌', 'steps-clean': '🧽', 'steps-library': '🏫', 'steps-help': '🤝',
  // lain-lain
  calendar: '📅', search: '🔍', steps: '🪜', pair: '🃏', helping: '🤝',
  kelas: '🏫', perpustakaan: '📚', pasar: '🛒', stasiun: '🚉', pelabuhan: '⚓',
  bola: '⚽', sendok: '🥄', sepatu: '👟', hijab: '🧕', baju: '👕',
};

const stepEmoji: Record<string, string> = {
  'Ambil buku': '📖', 'Baca buku': '👀', 'Simpan di rak': '🗄️',
  'Basahi tangan': '🚰', 'Pakai sabun dan gosok': '🧼', 'Keringkan tangan': '🧻',
  'Ambil sajadah': '🕌', 'Cari tempat bersih': '✨', 'Gelar sajadah': '🟩',
  'Lihat sampah': '👀', 'Ambil sampah dengan aman': '🧤', 'Buang sampah': '🗑️',
  'Pilih buku': '📚', 'Kembalikan buku': '↩️',
  'Dekati teman dengan sopan': '🚶', 'Tanya bantuan yang diperlukan': '🗣️', 'Bantu jika teman setuju': '🤝',
};

export const emojiForStep = (s: string) => stepEmoji[s] ?? '🔹';

const behaviorArt: Record<string, ReactNode> = {
  b01: <><circle cx="36" cy="36" r="12" fill="#e9b18e"/><path d="M22 55q14-10 28 0l5 38H18z" fill="#3d84b8"/><circle cx="83" cy="36" r="12" fill="#d99b73"/><path d="M69 55q14-10 28 0l5 38H65z" fill="#30936e"/><path d="M47 64l23 8" stroke="#e9b18e" strokeWidth="8" strokeLinecap="round"/><rect x="45" y="68" width="28" height="19" rx="2" fill="#b56e49" stroke="#71452f" strokeWidth="2"/><path d="M59 69v17" stroke="#f2dfb4" strokeWidth="2"/></>,
  b02: <><rect x="20" y="66" width="80" height="29" rx="5" fill="#c58d52"/><path d="M29 65V91M91 65V91" stroke="#805a39" strokeWidth="4"/><rect x="30" y="43" width="28" height="21" rx="2" fill="#e8d8b7" stroke="#997d51" strokeWidth="2"/><path d="M35 49h17m-17 5h17" stroke="#8a795c" strokeWidth="2"/><rect x="64" y="49" width="25" height="15" rx="2" fill="#4587ad"/><path d="M69 54h15m-15 5h12" stroke="#e9f2ee" strokeWidth="2"/></>,
  b03: <><path d="M20 35h38l-4 57H24z" fill="#4b8fa4" stroke="#276276" strokeWidth="3"/><path d="M17 33h44M29 27h21" stroke="#276276" strokeWidth="4" strokeLinecap="round"/><path d="M73 31l12 7-7 11-12-7zm15 27 12 6-7 12-12-6z" fill="#d99c58" stroke="#9c6b36" strokeWidth="2"/><path d="M75 74q9 6 14 0" fill="none" stroke="#3b805f" strokeWidth="4" strokeLinecap="round"/></>,
  b04: <><circle cx="48" cy="44" r="18" fill="#e8b08a"/><path d="M30 41q2-22 20-22 19 0 20 22L61 35H36z" fill="#17212b"/><path d="M29 68q19-14 38 0l7 34H22z" fill="#3b82b5"/><circle cx="43" cy="45" r="2" fill="#10263a"/><circle cx="54" cy="45" r="2" fill="#10263a"/><path d="M77 22h25q7 0 7 7v19q0 7-7 7H89l-8 8v-8h-4q-7 0-7-7V29q0-7 7-7z" fill="#fff6df" stroke="#c9aa68" strokeWidth="2"/><circle cx="84" cy="38" r="2" fill="#826d4c"/><circle cx="92" cy="38" r="2" fill="#826d4c"/><circle cx="100" cy="38" r="2" fill="#826d4c"/></>,
  b05: <><path d="M17 90h86" stroke="#d2b36b" strokeWidth="3" strokeDasharray="5 5"/><g><circle cx="31" cy="35" r="11" fill="#e8b08a"/><path d="M18 52q13-9 26 0l4 37H15z" fill="#347eae"/><circle cx="62" cy="35" r="11" fill="#d99b73"/><path d="M49 52q13-9 26 0l4 37H46z" fill="#26835d"/><circle cx="91" cy="35" r="11" fill="#e8b08a"/><path d="M78 52q13-9 26 0l4 37H75z" fill="#c7764c"/></g></>,
  b06: <><rect x="21" y="24" width="78" height="75" rx="4" fill="#c48d54" stroke="#805b37" strokeWidth="3"/><path d="M20 57h80M20 82h80" stroke="#805b37" strokeWidth="4"/><path d="M29 31h11v23H29zm15-3h12v26H44zm18 5h12v21H62zm18-2h13v23H80zM28 62h12v17H28zm17 2h13v15H45zm18-3h11v18H63zm17 2h13v16H80zm-51 23h12v11H29zm17-3h13v14H46zm18 1h13v13H64z" fill="#477f9a" stroke="#315a70" strokeWidth="1.5"/></>
};

export const picKey = (label: string) => {
  const k = label.trim().toLowerCase().replace(/^kitab atau buku$/, 'kitab');
  return art[k] || emoji[k] || behaviorArt[k] ? k : '';
};

export function Pic({ name, size = 112 }: { name: string; size?: number }) {
  const k = name.toLowerCase();
  if (art[k]) return <RealisticPic name={k} size={size} />;
  const key = k.replace(/^odd-.*/, 'search');
  if (behaviorArt[k]) return <svg role="img" aria-label={{b01:'Anak membantu teman membawa buku',b02:'Merapikan alat belajar di atas meja',b03:'Membuang sampah ke tempat sampah',b04:'Mendengarkan teman berbicara',b05:'Anak-anak menunggu giliran dalam antrean',b06:'Buku tersusun rapi di rak'}[k]} viewBox="0 0 120 120" width={size} height={size} focusable="false"><rect x="4" y="4" width="112" height="112" rx="18" fill="#f4ecdb"/><ellipse cx="60" cy="103" rx="35" ry="5" fill="#203d42" opacity=".14"/>{behaviorArt[k]}</svg>;
  const e = emoji[k] || emoji[key];
  if (e) return <span role="img" aria-label={name} style={{ fontSize: size * 0.72, lineHeight: 1, display: 'inline-block', width: size, height: size, textAlign: 'center' }}>{e}</span>;
  return null;
}
