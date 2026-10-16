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

const extraArt: Record<string, ReactNode> = {
  calendar: <><rect x="23" y="22" width="74" height="80" rx="9" fill="#fff" stroke="#567f8f" strokeWidth="4"/><path d="M23 43h74" stroke="#d96652" strokeWidth="18"/><path d="M42 15v17M78 15v17" stroke="#334c55" strokeWidth="5" strokeLinecap="round"/><text x="60" y="78" textAnchor="middle" fontSize="25" fontWeight="800" fill="#253d48">22</text><text x="60" y="94" textAnchor="middle" fontSize="9" fontWeight="800" fill="#327458">OKT</text></>,
  search: <><circle cx="51" cy="49" r="27" fill="#dcecf0" stroke="#477f91" strokeWidth="7"/><path d="m71 70 27 28" stroke="#9a6a43" strokeWidth="11" strokeLinecap="round"/><circle cx="51" cy="49" r="15" fill="#fff" opacity=".7"/></>,
  steps: <><path d="M17 95h28V73h27V51h30V29h9v75H17z" fill="#3d82a8" stroke="#245b78" strokeWidth="3" strokeLinejoin="round"/><circle cx="31" cy="87" r="7" fill="#fff"/><circle cx="59" cy="65" r="7" fill="#fff"/><circle cx="87" cy="43" r="7" fill="#fff"/></>,
  pair: <><rect x="19" y="28" width="36" height="62" rx="7" fill="#e2f0f2" stroke="#457e91" strokeWidth="4"/><rect x="65" y="28" width="36" height="62" rx="7" fill="#f6e6c6" stroke="#b27a44" strokeWidth="4"/><path d="M27 43h20m-20 9h20M73 43h20m-20 9h20" stroke="#647c83" strokeWidth="3" strokeLinecap="round"/><path d="m52 101 8 8 8-8" fill="none" stroke="#327458" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/></>,
  helping: <><circle cx="38" cy="37" r="14" fill="#efb38e"/><circle cx="82" cy="37" r="14" fill="#df9e79"/><path d="M20 91V69q18-18 36 0v22zm44 0V69q18-18 36 0v22z" fill="#3f83a3"/><path d="m45 63 13 14m13-14L58 77" stroke="#efb38e" strokeWidth="7" strokeLinecap="round"/><rect x="49" y="70" width="19" height="15" rx="2" fill="#b9784c"/></>,
  'steps-hands': <><path d="M27 31V18h31v13M35 18V12" fill="none" stroke="#547f8b" strokeWidth="5" strokeLinecap="round"/><path d="M57 32q0 8 8 13v7" fill="none" stroke="#547f8b" strokeWidth="4" strokeLinecap="round"/><path d="M62 55c-5 7 5 8 0 15m12-17c-5 7 5 8 0 15" fill="none" stroke="#58a9c1" strokeWidth="4" strokeLinecap="round"/><path d="M34 77q10-10 20 0l8 11q-2 7-8 3l-9-8m17-5q10-8 16 1l8 11q-3 7-9 2l-8-7" fill="#f0b28c" stroke="#cf8e6c" strokeWidth="2" strokeLinejoin="round"/><circle cx="91" cy="32" r="6" fill="#f2c14e"/><circle cx="101" cy="47" r="4" fill="#f2c14e"/></>,
  'steps-place': <><path d="M25 77 70 32" stroke="#9b6a3f" strokeWidth="7" strokeLinecap="round"/><path d="M66 28 91 52M62 38 83 59" stroke="#d3a64e" strokeWidth="4" strokeLinecap="round"/><path d="M24 84h69" stroke="#b8844f" strokeWidth="5" strokeLinecap="round"/><path d="m82 77 6 6 13-15" fill="none" stroke="#33845f" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/><path d="m34 34 3 7 7 3-7 3-3 7-3-7-7-3 7-3z" fill="#edc455"/></>,
  kelas: <><path d="M17 48 60 24l43 24v54H17z" fill="#eed6a3" stroke="#9b7549" strokeWidth="3"/><path d="M12 49 60 20l48 29" fill="none" stroke="#bd624b" strokeWidth="7" strokeLinejoin="round"/><rect x="28" y="58" width="20" height="18" rx="2" fill="#8bbcc8"/><rect x="72" y="58" width="20" height="18" rx="2" fill="#8bbcc8"/><path d="M51 102V79q9-15 18 0v23" fill="#80593d"/></>,
  perpustakaan: <><rect x="19" y="29" width="82" height="68" rx="3" fill="#b98554" stroke="#805839" strokeWidth="4"/><path d="M18 61h84M18 84h84" stroke="#805839" strokeWidth="4"/><rect x="27" y="38" width="13" height="22" fill="#c95b4d"/><rect x="43" y="34" width="15" height="26" fill="#43876c"/><rect x="63" y="39" width="14" height="21" fill="#477f9a"/><rect x="81" y="35" width="13" height="25" fill="#d6a84e"/><rect x="31" y="67" width="17" height="17" fill="#477f9a"/><rect x="53" y="65" width="14" height="19" fill="#d6a84e"/><rect x="73" y="68" width="19" height="16" fill="#c95b4d"/><path d="M27 97v8m66-8v8" stroke="#805839" strokeWidth="5"/></>,
  pasar: <><path d="M20 45h80v57H20z" fill="#f0d6a4" stroke="#986d43" strokeWidth="3"/><path d="M15 45 25 25h70l10 20" fill="#d76c52" stroke="#986d43" strokeWidth="3"/><path d="M15 45h90" stroke="#fff4dc" strokeWidth="7" strokeDasharray="14 9"/><rect x="31" y="59" width="25" height="20" fill="#8ab8bf"/><path d="M68 102V76q8-10 16 0v26" fill="#91613f"/></>,
  stasiun: <><path d="M18 53h84v43H18z" fill="#e9dfc8" stroke="#7a8581" strokeWidth="3"/><path d="M13 54 60 25l47 29" fill="#3e7893" stroke="#355b6b" strokeWidth="3"/><rect x="28" y="63" width="22" height="18" fill="#91c4d0"/><rect x="70" y="63" width="22" height="18" fill="#91c4d0"/><path d="M43 96V82q8-12 16 0v14m7-43V32m0 0h16" fill="none" stroke="#9c7049" strokeWidth="4"/></>,
  pelabuhan: <><path d="M17 80h86l-13 18H34z" fill="#9c6644" stroke="#71472f" strokeWidth="3"/><path d="M60 30v50M61 35l28 21H61" fill="#fff2d7" stroke="#446f83" strokeWidth="3" strokeLinejoin="round"/><path d="M15 104q12-7 24 0t24 0 24 0 24 0" fill="none" stroke="#56a3ba" strokeWidth="4" strokeLinecap="round"/></>,
  bola: <><circle cx="60" cy="60" r="39" fill="#fff" stroke="#344650" strokeWidth="4"/><path d="m60 39 15 11-6 18H51l-6-18z" fill="#26343a"/><path d="m60 21 10 8-5 10m29 1-9 10m1 31-16-12m-28 12L48 68M31 40l14 10m-8 35 14-17" fill="none" stroke="#26343a" strokeWidth="4" strokeLinecap="round"/></>,
  sendok: <><path d="M57 61 42 96" stroke="#8c979a" strokeWidth="9" strokeLinecap="round"/><ellipse cx="65" cy="42" rx="17" ry="25" transform="rotate(24 65 42)" fill="#dbe2e1" stroke="#657982" strokeWidth="4"/><ellipse cx="63" cy="38" rx="7" ry="12" transform="rotate(24 63 38)" fill="#fff"/></>,
  sepatu: <><path d="M25 73q17-4 28-35l18 7q3 19 22 26 12 4 12 17v9H22v-9q0-10 3-15z" fill="#4a829b" stroke="#2a5162" strokeWidth="4" strokeLinejoin="round"/><path d="M54 52 74 63m-27-3 21 12m-42 15h79" stroke="#fff6df" strokeWidth="4" strokeLinecap="round"/><path d="M61 44 70 51" stroke="#d6a84e" strokeWidth="3"/></>,
  hijab: <><path d="M60 18q-31 1-33 38l-9 47h84l-9-47q-2-37-33-38z" fill="#d8959c"/><ellipse cx="60" cy="50" rx="17" ry="21" fill="#efb38e"/><path d="M43 49q2-26 17-26t17 26l-8-7H51z" fill="#493733"/><path d="M36 74q24 23 48 0" fill="none" stroke="#f5c8c6" strokeWidth="3"/></>,
  baju: <><path d="m41 25-18 12L12 61l18 9 8-12v39h44V58l8 12 18-9-11-24L79 25 60 38z" fill="#4385aa" stroke="#2e617b" strokeWidth="3" strokeLinejoin="round"/><path d="M60 38v58M48 29l12 9 12-9" fill="none" stroke="#e9f0e8" strokeWidth="3"/></>,
};


const stepAsset: Record<string, string> = {
  'Ambil buku': 'buku', 'Baca buku': 'kitab', 'Simpan di rak': 'b06',
  'Basahi tangan': 'steps-hands', 'Pakai sabun dan gosok': 'steps-hands', 'Keringkan tangan': 'steps-hands',
  'Ambil sajadah': 'sajadah', 'Cari tempat bersih': 'steps-place', 'Gelar sajadah': 'sajadah',
  'Lihat sampah': 'b03', 'Ambil sampah dengan aman': 'steps-place', 'Buang sampah': 'b03',
  'Pilih buku': 'buku', 'Kembalikan buku': 'b06',
  'Dekati teman dengan sopan': 'b01', 'Tanya bantuan yang diperlukan': 'b04', 'Bantu jika teman setuju': 'b01',
};

export function StepIllustration({step, size=44}: {step:string; size?:number}) {
  const asset=stepAsset[step] || 'buku';
  return <span className="step-picture"><Pic name={asset} size={size} alt={step}/></span>;
}

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
  return art[k] || extraArt[k] || emoji[k] || behaviorArt[k] ? k : '';
};

export function Pic({ name, size = 112, alt }: { name: string; size?: number; alt?: string }) {
  const k = name.toLowerCase();
  if (art[k]) return <RealisticPic name={k} size={size} alt={alt} />;
  const key = k.replace(/^odd-.*/, 'search');
  if (behaviorArt[k]) return <svg role="img" aria-label={alt || ({b01:'Anak membantu teman membawa buku',b02:'Merapikan alat belajar di atas meja',b03:'Membuang sampah ke tempat sampah',b04:'Mendengarkan teman berbicara',b05:'Anak-anak menunggu giliran dalam antrean',b06:'Buku tersusun rapi di rak'}[k])} viewBox="0 0 120 120" width={size} height={size} focusable="false"><rect x="4" y="4" width="112" height="112" rx="18" fill="#f4ecdb"/><ellipse cx="60" cy="103" rx="35" ry="5" fill="#203d42" opacity=".14"/>{behaviorArt[k]}</svg>;
  if (extraArt[k]) return <svg role="img" aria-label={alt || name} viewBox="0 0 120 120" width={size} height={size} focusable="false"><rect x="4" y="4" width="112" height="112" rx="18" fill="#f4ecdb"/><ellipse cx="60" cy="103" rx="35" ry="5" fill="#203d42" opacity=".14"/>{extraArt[k]}</svg>;
  const e = emoji[k] || emoji[key];
  if (e) return <span role="img" aria-label={name} style={{ fontSize: size * 0.72, lineHeight: 1, display: 'inline-block', width: size, height: size, textAlign: 'center' }}>{e}</span>;
  return null;
}
