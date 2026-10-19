export type ModeId = 'guess' | 'match' | 'mixed';
export type TopicId = 'perlengkapan' | 'tempat' | 'belajar' | 'kegiatan';
export type Question = {
  id: string;
  mode: ModeId;
  topic: TopicId;
  prompt: string;
  answer: string;
  image: string;
  choices: string[];
  alt: string;
  hint: string;
};

export const modes: { id: ModeId; title: string; description: string }[] = [
  { id: 'guess', title: 'Pilih gambar yang benar', description: 'Dengar atau baca pertanyaan, lalu pilih satu dari tiga gambar.' },
  { id: 'match', title: 'Pasangkan dua gambar', description: 'Ketuk satu gambar, lalu ketuk gambar yang sama.' },
  { id: 'mixed', title: 'Gabungan dua permainan', description: 'Pilih gambar dan pasangkan gambar bergantian dalam satu sesi.' },
];

export const topics: { id: TopicId; title: string }[] = [
  { id: 'perlengkapan', title: 'Perlengkapan santri' },
  { id: 'tempat', title: 'Tempat ibadah' },
  { id: 'belajar', title: 'Al-Qur’an dan belajar' },
  { id: 'kegiatan', title: 'Kegiatan santri' },
];

const make = (id: string, topic: TopicId, answer: string, image: string, choices: string[], prompt: string, hint: string, alt = answer): Question => ({ id, mode: 'guess', topic, answer, image, choices, prompt, hint, alt });

export const questions: Question[] = [
  make('q01','perlengkapan','Peci','peci.png',['Peci','Sajadah','Tasbih'],'Benda apa yang dipakai di kepala?','Bentuknya seperti topi kecil.','Peci hitam'),
  make('q02','perlengkapan','Sarung','sarung.png',['Sarung','Peci','Kitab'],'Apa nama kain yang dipakai seperti rok?','Kain ini dililitkan di pinggang.','Sarung bermotif'),
  make('q03','perlengkapan','Sajadah','sajadah.png',['Sajadah','Tasbih','Bedug'],'Apa nama alas untuk salat?','Alas ini digelar di lantai.','Sajadah untuk salat'),
  make('q04','perlengkapan','Tasbih','tasbih.png',['Tasbih','Peci','Buku'],'Benda apa yang memiliki butiran untuk dihitung?','Butirannya dirangkai dengan tali.','Tasbih berbutir'),
  make('q05','perlengkapan','Mukena','mukena.png',['Mukena','Sarung','Peci'],'Apa nama pakaian salat untuk perempuan?','Pakaian ini menutup kepala dan tubuh.','Mukena putih'),
  make('q06','perlengkapan','Buku','buku.png',['Buku','Bedug','Lentera'],'Benda apa yang memiliki halaman untuk dibaca?','Halaman-halamannya berisi tulisan.','Buku belajar'),
  make('q07','tempat','Masjid','masjid.png',['Masjid','Kelas','Rumah'],'Bangunan apa yang digunakan untuk salat berjemaah?','Bangunan ini memiliki ruang salat.','Masjid dengan kubah dan menara'),
  make('q08','tempat','Ruang salat','prayer-space.png',['Ruang salat','Perpustakaan','Kantin'],'Di mana santri dapat salat di pesantren?','Tempat ini bersih dan tenang.','Ruang salat dengan sajadah'),
  make('q09','belajar','Al-Qur’an','quran.png',['Al-Qur’an','Bola','Tasbih'],'Kitab suci umat Islam bernama apa?','Kitab ini dibaca untuk belajar dan beribadah.','Al-Qur’an di atas rehal'),
  make('q10','belajar','Rehal','quran.png',['Rehal','Peci','Bedug'],'Apa nama penyangga untuk meletakkan Al-Qur’an?','Bentuknya dapat dilipat seperti huruf X.','Al-Qur’an di atas rehal kayu'),
  make('q11','belajar','Pensil','pensil.png',['Pensil','Sarung','Mukena'],'Alat apa yang digunakan untuk menulis?','Ujungnya dapat digunakan untuk membuat tulisan.','Pensil kayu'),
  make('q12','belajar','Meja belajar','books-desk.png',['Meja belajar','Masjid','Bedug'],'Di mana buku dapat diletakkan saat belajar?','Buku dan alat tulis dapat diletakkan di atasnya.','Buku di atas meja belajar'),
  make('q13','kegiatan','Membaca Al-Qur’an','quran.png',['Membaca Al-Qur’an','Bermain bola','Tidur'],'Kegiatan apa yang dilakukan santri dengan Al-Qur’an?','Santri membuka halaman dan membaca.','Santri belajar membaca Al-Qur’an'),
  make('q14','kegiatan','Salat','sajadah.png',['Salat','Menulis','Makan'],'Kegiatan ibadah apa yang dilakukan di atas sajadah?','Kegiatan ini dilakukan dengan gerakan ibadah.','Sajadah sebagai alas salat'),
  make('q15','kegiatan','Belajar bersama','books-desk.png',['Belajar bersama','Berlomba lari','Memasak'],'Apa yang dapat dilakukan santri bersama di kelas?','Santri membaca dan belajar bersama guru.','Buku tersusun di meja belajar'),
  make('q16','kegiatan','Hari Santri','hari-santri-2026.png',['Hari Santri','Hari Kemerdekaan','Hari Kartini'],'Hari apa yang diperingati pada 22 Oktober?','Namanya berkaitan dengan para santri.','Logo resmi Hari Santri 2026'),
  make('q17','perlengkapan','Bedug','bedug.png',['Bedug','Pensil','Kitab'],'Benda apa yang dipukul dan berbunyi di masjid?','Bentuknya besar dan seperti tabung.','Bedug masjid'),
  make('q18','perlengkapan','Bendera','bendera.png',['Bendera','Sajadah','Tasbih'],'Benda apa yang dikibarkan saat peringatan?','Benda ini memiliki warna merah dan putih.','Bendera Indonesia merah putih'),
  make('q19','perlengkapan','Lentera','lentera.png',['Lentera','Buku','Sarung'],'Benda apa yang digunakan untuk menerangi?','Benda ini menghasilkan cahaya.','Lentera'),
  make('q20','belajar','Kitab','buku.png',['Kitab','Bedug','Peci'],'Apa nama buku yang dipelajari santri?','Benda ini berisi halaman dan tulisan.','Kitab untuk belajar'),
];

export const matchingItems = questions.filter((q) => ['q01','q02','q03','q04','q05','q06','q07','q09','q11','q17','q18','q19'].includes(q.id));
