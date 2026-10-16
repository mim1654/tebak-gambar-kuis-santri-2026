const labels: Record<string, string> = {
  peci: 'Peci hitam', sarung: 'Sarung bermotif kotak', sajadah: 'Sajadah hijau',
  masjid: 'Masjid dengan kubah dan menara', bedug: 'Bedug kayu dengan pemukul',
  kitab: 'Kitab terbuka', tasbih: 'Tasbih', lentera: 'Lentera dengan cahaya',
  mukena: 'Mukena putih', bendera: 'Bendera merah putih', pensil: 'Pensil', buku: 'Buku'
};
const tiles: Record<string, [number, number]> = {
  peci:[0,0], sarung:[1,0], sajadah:[2,0], masjid:[3,0],
  bedug:[0,1], kitab:[1,1], tasbih:[2,1], lentera:[3,1],
  mukena:[0,2], bendera:[1,2], pensil:[2,2], buku:[3,2]
};
export function RealisticPic({name,size=112,alt}:{name:string;size?:number;alt?:string}) {
  const key=name.toLowerCase();
  const [col,row]=tiles[key] || tiles.kitab;
  return <span role="img" aria-label={alt ?? labels[key] ?? key} className="atlas-illustration"
    style={{
      width:size, height:size, backgroundImage:`url("${import.meta.env.BASE_URL}assets/quiz-objects-3d.png")`,
      backgroundSize:'400% 400%', backgroundPosition:`${col*100/3}% ${row*100/3}%`
    }} />;
}
