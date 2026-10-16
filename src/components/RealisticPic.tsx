import { useId, type ReactNode } from 'react';

const labels: Record<string, string> = {
  peci: 'Peci hitam', sarung: 'Sarung bermotif kotak', sajadah: 'Sajadah hijau',
  masjid: 'Masjid dengan kubah dan menara', pesantren: 'Bangunan pesantren',
  bedug: 'Bedug kayu dengan pemukul', kitab: 'Kitab terbuka', tasbih: 'Tasbih',
  lentera: 'Lentera dengan cahaya', mukena: 'Mukena putih', bendera: 'Bendera merah putih',
  pensil: 'Pensil', buku: 'Buku'
};

export function RealisticPic({ name, size = 112, alt }: { name: string; size?: number; alt?: string }) {
  const id = useId().replace(/:/g, '');
  const label = labels[name] ?? name;
  const bg = `bg-${id}`;
  const cloth = `cloth-${id}`;
  const wood = `wood-${id}`;
  const gold = `gold-${id}`;
  const ink = `ink-${id}`;
  const shadow = `shadow-${id}`;
  const clothFill = `url(#${cloth})`;
  const woodFill = `url(#${wood})`;
  const goldFill = `url(#${gold})`;
  const inkFill = `url(#${ink})`;

  let object: ReactNode;
  switch (name) {
    case 'peci':
      object = <><path d="M26 64c0-24 15-42 34-42s34 18 34 42v18H26z" fill={inkFill}/><path d="M26 64c11 8 23 12 34 12s23-4 34-12v13c-17 12-51 12-68 0z" fill="#05090d"/><path d="M33 58c4-17 13-27 27-29" fill="none" stroke="#73808a" strokeWidth="3" strokeLinecap="round" opacity=".52"/><path d="M31 72c16 8 42 8 58 0" fill="none" stroke="#38434d" strokeWidth="2"/></>;
      break;
    case 'sarung':
      object = <><path d="M30 26q30 5 60 0l5 66q-35 15-70 0z" fill={clothFill}/><path d="M32 40h58M31 54h60M31 68h61M32 82h59" stroke="#d9e7e8" strokeWidth="3" opacity=".82"/><path d="M44 28v66M58 29v66M73 29v65M87 28v63" stroke="#1f4661" strokeWidth="2" opacity=".62"/><path d="M30 27q30 8 60 0" fill="none" stroke="#e5f0ed" strokeWidth="3"/><path d="M34 92q26 8 57 0" fill="none" stroke="#17374c" strokeWidth="4"/></>;
      break;
    case 'sajadah':
      object = <><path d="M28 20h64v78l-6 9H34l-6-9z" fill={clothFill}/><path d="M35 27h50v67H35z" fill="none" stroke="#e9c574" strokeWidth="2.5"/><path d="M42 89V53q18-30 36 0v36" fill="#15573f" stroke="#e9c574" strokeWidth="2"/><path d="M45 51q15-25 30 0M41 94h38" fill="none" stroke="#f5d98c" strokeWidth="2"/><path d="M32 102l-5 7m13-7-2 8m13-8v8m13-8 2 8m12-8 5 7m4-7 6 6" stroke="#d6b45e" strokeWidth="2" strokeLinecap="round"/></>;
      break;
    case 'masjid':
      object = <>
        <path d="M21 58h78v41H21z" fill="#e9ddc5" stroke="#947b58" strokeWidth="2"/>
        <path d="M25 61h70v5H25z" fill="#c5a97a"/>
        <path d="M39 57q21-46 42 0z" fill={clothFill} stroke="#1d5a4d" strokeWidth="1.5"/>
        <path d="M47 46q13-30 26 0m-22 7q9-22 18 0" fill="none" stroke="#a8c4a5" strokeWidth="1.5" opacity=".65"/>
        <path d="M59 13v-5m0 0 5 5h-5" fill="none" stroke="#b88c3d" strokeWidth="2.5"/>
        <path d="M54 99V78q6-14 12 0v21z" fill="#244c60" stroke="#d9cba9" strokeWidth="2"/>
        <path d="M12 41h12v58H12zm84 0h12v58H96z" fill="#f0e7d5" stroke="#947b58" strokeWidth="2"/>
        <path d="M10 41l8-17 8 17m68 0 8-17 8 17" fill={goldFill} stroke="#947b58" strokeWidth="1.5"/>
        <path d="M14 51h8m76 0h8" stroke="#b89152" strokeWidth="2"/>
        <path d="M15 61h6m76 0h6m-88 26h6m76 0h6" stroke="#7fa6ad" strokeWidth="3" strokeLinecap="round"/>
        <path d="M31 73v12m58-12v12" stroke="#c8b38e" strokeWidth="1.5"/>
        <path d="M29 98V84q5-10 10 0v14m42 0V84q5-10 10 0v14" fill="#527a7c" stroke="#b79d6d" strokeWidth="1.5"/>
        <path d="M23 58h74" stroke="#d2b577" strokeWidth="2"/>
      </>;
      break;
    case 'pesantren':
      object = <><path d="M20 48 60 22l40 26v50H20z" fill="#dfc28d" stroke="#a8834e" strokeWidth="2"/><path d="M15 49 60 17l45 32-5 5-40-27-40 27z" fill={clothFill}/><path d="M30 60h15v18H30zm45 0h15v18H75z" fill="#a5cad2" stroke="#f7efd9" strokeWidth="3"/><path d="M52 98V72q8-12 16 0v26" fill={woodFill}/><path d="M26 53v-5m68 5v-5" stroke="#f5ebd5" strokeWidth="2"/><path d="M57 97h6" stroke="#e2c482" strokeWidth="2"/></>;
      break;
    case 'bedug':
      object = <><path d="M32 39q28-13 56 0v42q-28 15-56 0z" fill={woodFill}/><ellipse cx="32" cy="60" rx="10" ry="22" fill="#d6b17a" stroke="#77512e" strokeWidth="2"/><ellipse cx="32" cy="60" rx="5" ry="15" fill="#ead6ae"/><path d="M36 41 53 82m18-46-8 51m18-48L69 82" stroke="#594029" strokeWidth="2" opacity=".6"/><path d="M28 85 20 99m65-14 9 14M48 85l-4 14m28-14 4 14" stroke="#79532e" strokeWidth="5" strokeLinecap="round"/><path d="m88 23 20 14m-18-14 7-8" stroke="#8a6138" strokeWidth="4" strokeLinecap="round"/></>;
      break;
    case 'kitab':
      object = <><path d="M19 34q20-7 41 2v61q-20-9-41-2z" fill="#a75a3e" stroke="#70402f" strokeWidth="2"/><path d="M101 34q-20-7-41 2v61q20-9 41-2z" fill="#f1e4c8" stroke="#bca984" strokeWidth="2"/><path d="M60 36v62" stroke="#6d432f" strokeWidth="3"/><path d="M25 46q14-3 27 2m-27 8q14-3 27 2m-27 8q14-3 27 2m27-12q12-5 23-2m-23 9q12-5 23-2m-23 9q12-5 23-2" fill="none" stroke="#e6d1a7" strokeWidth="2" strokeLinecap="round"/><path d="M20 92q21-6 40 3 19-9 40-3" fill="none" stroke="#d6c39f" strokeWidth="2"/></>;
      break;
    case 'tasbih':
      object = <><ellipse cx="59" cy="56" rx="31" ry="37" fill="none" stroke="#80623d" strokeWidth="2"/>{Array.from({length:18},(_,i)=>{const a=(i/18)*Math.PI*2;return <circle key={i} cx={59+Math.cos(a)*31} cy={56+Math.sin(a)*37} r="5.3" fill={i%3===0?goldFill:clothFill} stroke="#254c40" strokeWidth="1.2"/>})}<path d="M59 93v9m-5 0h10m-9-4 4 10 4-10" fill="none" stroke="#b58a39" strokeWidth="2" strokeLinecap="round"/></>;
      break;
    case 'lentera':
      object = <><path d="M50 22q0-13 10-13t10 13m-19 0h18" fill="none" stroke="#765536" strokeWidth="3" strokeLinecap="round"/><path d="M39 28h42l8 12-7 43H38l-7-43z" fill="#d6a84e" stroke="#765536" strokeWidth="2"/><path d="M38 40h46L78 78H44z" fill="#f6dc98" opacity=".94" stroke="#8d6e3e" strokeWidth="2"/><path d="M60 68q-10-12 0-24 10 12 0 24z" fill="#e98c3d"/><path d="M60 66q-4-7 0-12 5 6 0 12z" fill="#fff3b2"/><path d="M37 84h46l-5 8H42z" fill="#775536"/></>;
      break;
    case 'mukena':
      object = <><path d="M60 18q-20 0-22 24L21 54l9 45h60l9-45-17-12q-2-24-22-24z" fill="#f2eee5" stroke="#bdb6a8" strokeWidth="2"/><ellipse cx="60" cy="43" rx="14" ry="17" fill="#d8a27d"/><path d="M45 42q15-26 30 0-15-9-30 0z" fill="#faf8f2"/><path d="M34 61q26 13 52 0M31 92h58" fill="none" stroke="#ded8cb" strokeWidth="2"/><path d="M48 56q12 6 24 0" fill="none" stroke="#d5cfc3" strokeWidth="1.5"/></>;
      break;
    case 'bendera':
      object = <><path d="M28 16v88" stroke="#775536" strokeWidth="5" strokeLinecap="round"/><path d="M32 20q32-8 68 0v29H32z" fill="#c94038"/><path d="M32 49h68v29q-36-8-68 0z" fill="#fff" stroke="#ddd" strokeWidth="1"/><path d="M35 22q28-6 62 0" fill="none" stroke="#f18170" strokeWidth="2" opacity=".7"/></>;
      break;
    case 'pensil':
      object = <><g transform="rotate(-35 60 60)"><rect x="48" y="19" width="24" height="67" rx="3" fill={goldFill}/><path d="M48 28h24" stroke="#c94c43" strokeWidth="10"/><path d="M48 82h24l-12 22z" fill="#d2aa72"/><path d="m56 96 4 8 4-8" fill="#343b3d"/><path d="M53 32v47m14-47v47" stroke="#efcf75" strokeWidth="1.5"/></g></>;
      break;
    case 'buku':
      object = <><path d="M29 18h58q7 0 7 7v78H36q-7 0-7-7z" fill={clothFill} stroke="#244b5f" strokeWidth="2"/><path d="M37 18v85" stroke="#183b4d" strokeWidth="7"/><rect x="49" y="31" width="34" height="26" rx="3" fill="#e7d6ad"/><path d="M52 69h31M52 78h26M52 87h29" stroke="#e8f0ed" strokeWidth="2.5" strokeLinecap="round"/><path d="M55 36h22m-22 6h16" stroke="#627783" strokeWidth="2"/></>;
      break;
    default:
      return null;
  }

  return <svg role="img" aria-label={alt ?? label} viewBox="0 0 120 120" width={size} height={size} focusable="false">
    <defs>
      <linearGradient id={cloth} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#5e9f90"/><stop offset=".52" stopColor="#317365"/><stop offset="1" stopColor="#174f49"/></linearGradient>
      <linearGradient id={wood} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c78b51"/><stop offset=".5" stopColor="#98623b"/><stop offset="1" stopColor="#65432f"/></linearGradient>
      <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#f5d77e"/><stop offset="1" stopColor="#bd8c37"/></linearGradient>
      <linearGradient id={ink} x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3c4850"/><stop offset=".45" stopColor="#161d22"/><stop offset="1" stopColor="#080c10"/></linearGradient>
      <filter id={shadow} x="-25%" y="-25%" width="150%" height="170%"><feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#182d33" floodOpacity=".24"/></filter>
      <radialGradient id={bg}><stop stopColor="#fffdf7"/><stop offset="1" stopColor="#f3ead7"/></radialGradient>
    </defs>
    <rect x="3" y="3" width="114" height="114" rx="18" fill={`url(#${bg})`}/>
    <ellipse cx="60" cy="104" rx="35" ry="6" fill="#263b40" opacity=".14"/>
    <g filter={`url(#${shadow})`} strokeLinejoin="round" strokeLinecap="round">{object}</g>
  </svg>;
}
