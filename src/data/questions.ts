export type ModeId = 'guess' | 'good' | 'match' | 'odd' | 'order' | 'history';
export type Question = { id:string; mode:ModeId; category:string; prompt:string; correct:string; options:string[]; image:string; hint:string; difficulty:1|2|3; feedback:string; alt:string; reviewed:boolean; steps?:string[] };
export const modes: {id:ModeId;title:string;description:string;symbol:string;color:string}[] = [
 {id:'guess',title:'Tebak Gambar',description:'Lihat gambar, lalu pilih namanya.',symbol:'peci',color:'blue'},
 {id:'good',title:'Kuis Perilaku Baik',description:'Pilih tindakan yang baik.',symbol:'helping',color:'green'},
 {id:'match',title:'Pasangkan Gambar',description:'Temukan dua gambar yang sama.',symbol:'pair',color:'gold'},
 {id:'odd',title:'Temukan yang Berbeda',description:'Cari gambar yang tidak sama.',symbol:'search',color:'brick'},
 {id:'order',title:'Urutkan 3 Langkah',description:'Susun langkah dari awal sampai akhir.',symbol:'steps',color:'blue'},
 {id:'history',title:'Mengenal Hari Santri',description:'Kenali Hari Santri dan pesantren.',symbol:'lantern',color:'green'}
];
const make = (mode:ModeId, id:string, prompt:string, correct:string, options:string[], image:string, hint:string, difficulty:1|2|3=1, alt=prompt, steps?:string[]):Question => ({id,mode,category:mode==='good'?'Perilaku baik':mode==='history'?'Hari Santri':'Perlengkapan dan lingkungan santri',prompt,correct,options,image,hint,difficulty,feedback:'Hebat, kamu sudah berusaha!',alt,reviewed:mode!=='history',steps});
export const questions: Question[] = [
 make('guess','g01','Benda apa yang dipakai di kepala ini?','Peci',['Peci','Sarung','Sajadah','Bedug'],'peci','Biasanya berwarna hitam dan dipakai di kepala.'),
 make('guess','g02','Apa nama kain yang dipakai seperti rok ini?','Sarung',['Kitab','Sarung','Tasbih','Lentera'],'sarung','Kain ini sering dipakai saat beribadah.'),
 make('guess','g03','Apa nama alas untuk salat?','Sajadah',['Sajadah','Peci','Bedug','Bendera'],'sajadah','Alas ini digelar sebelum salat.'),
 make('guess','g04','Bangunan untuk beribadah ini bernama apa?','Masjid',['Pesantren','Masjid','Kelas','Perpustakaan'],'masjid','Ada tempat untuk salat di dalamnya.'),
 make('guess','g05','Benda yang dipukul dan berbunyi ini apa?','Bedug',['Lentera','Kitab','Bedug','Tasbih'],'bedug','Benda ini dapat menghasilkan bunyi besar.'),
 make('guess','g06','Benda untuk membaca dan belajar ini apa?','Kitab',['Sarung','Peci','Kitab','Mukena'],'kitab','Halaman-halamannya berisi tulisan.'),
 make('good','b01','Teman membawa banyak buku. Apa yang bisa kita lakukan?','Membantu teman',['Membantu teman','Mendorong teman','Menyembunyikan buku','Pergi menjauh'],'helping','Pilih tindakan yang membuat teman terbantu.'),
 make('good','b02','Selesai belajar, apa yang sebaiknya kita lakukan?','Merapikan alat belajar',['Meninggalkan semuanya','Merapikan alat belajar','Membuang buku','Mengacak meja'],'tidy','Kembalikan barang ke tempatnya.'),
 make('good','b03','Melihat sampah di lantai, apa yang baik dilakukan?','Membuang sampah pada tempatnya',['Menendang sampah','Membuang sampah pada tempatnya','Membiarkannya','Menyebar sampah'],'clean','Jaga tempat belajar tetap bersih.'),
 make('good','b04','Saat teman berbicara, kita sebaiknya…','Mendengarkan',['Berteriak','Mendengarkan','Memotong pembicaraan','Menertawakan'],'listening','Beri kesempatan teman menyampaikan pesan.'),
 make('good','b05','Saat mengantre, kita sebaiknya…','Menunggu giliran',['Menyerobot','Mendorong','Menunggu giliran','Berlari ke depan'],'queue','Semua orang mendapat giliran.'),
 make('good','b06','Bagaimana menjaga buku dengan baik?','Menaruh buku dengan rapi',['Mencoret sembarang','Merobek halaman','Menaruh buku dengan rapi','Melempar buku'],'bookcare','Simpan buku agar tetap baik.'),
 make('match','m01','Pilih dua kartu dengan gambar yang sama.','Peci',['Peci','Peci','Sarung','Sajadah'],'peci','Cari gambar peci yang sama.'),
 make('match','m02','Temukan pasangan gambar masjid.','Masjid',['Masjid','Bedug','Masjid','Kitab'],'masjid','Dua gambar harus sama.'),
 make('match','m03','Pasangkan gambar sajadah yang sama.','Sajadah',['Sarung','Sajadah','Lentera','Sajadah'],'sajadah','Perhatikan bentuk alasnya.'),
 make('match','m04','Temukan pasangan gambar lentera.','Lentera',['Lentera','Peci','Tasbih','Lentera'],'lentera','Lentera memiliki bagian yang bercahaya.'),
 make('match','m05','Pasangkan gambar kitab yang sama.','Kitab',['Kitab','Mukena','Kitab','Bedug'],'kitab','Cari dua buku yang serupa.'),
 make('match','m06','Temukan pasangan gambar bedug.','Bedug',['Sarung','Bedug','Bedug','Bendera'],'bedug','Bentuknya seperti tabung besar.'),
 make('odd','o01','Tiga gambar sama, satu berbeda. Pilih yang berbeda.','Sarung',['Peci','Peci','Sarung','Peci'],'odd-peci','Tiga benda dipakai di kepala, satu berupa kain.'),
 make('odd','o02','Mana yang berbeda dari tiga buku?','Bedug',['Kitab','Kitab','Bedug','Kitab'],'odd-book','Satu benda bukan untuk dibaca.'),
 make('odd','o03','Cari benda yang bukan perlengkapan salat.','Bedug',['Sajadah','Mukena','Bedug','Peci'],'odd-prayer','Pikirkan fungsi setiap benda.'),
 make('odd','o04','Mana yang bukan sumber cahaya?','Sajadah',['Lentera','Lentera','Sajadah','Lentera'],'odd-light','Satu benda adalah alas, bukan lampu.'),
 make('odd','o05','Pilih yang berbeda dari tiga bangunan masjid.','Tasbih',['Masjid','Masjid','Tasbih','Masjid'],'odd-mosque','Satu benda bisa dipegang dan dihitung.'),
 make('odd','o06','Mana yang bukan alat belajar?','Sarung',['Kitab','Pensil','Buku','Sarung'],'odd-study','Tiga benda membantu kegiatan belajar.'),
 make('order','r01','Urutkan langkah merapikan buku.','Simpan di rak',['Ambil buku','Baca buku','Simpan di rak'],'steps-book','Pikirkan apa yang dilakukan setelah selesai membaca.',1,'Tiga langkah merapikan buku',['Ambil buku','Baca buku','Simpan di rak']),
 make('order','r02','Urutkan langkah mencuci tangan.','Keringkan tangan',['Basahi tangan','Pakai sabun dan gosok','Keringkan tangan'],'steps-hands','Tangan dibasahi sebelum diberi sabun.',1,'Tiga langkah mencuci tangan',['Basahi tangan','Pakai sabun dan gosok','Keringkan tangan']),
 make('order','r03','Urutkan langkah menyiapkan sajadah.','Gelar sajadah',['Ambil sajadah','Cari tempat bersih','Gelar sajadah'],'steps-prayer','Cari tempat yang bersih sebelum menggelar sajadah.',1,'Tiga langkah menyiapkan sajadah',['Ambil sajadah','Cari tempat bersih','Gelar sajadah']),
 make('order','r04','Urutkan langkah menjaga kebersihan kelas.','Buang sampah',['Lihat sampah','Ambil sampah dengan aman','Buang sampah'],'steps-clean','Sampah dibuang setelah diambil dengan aman.',2,'Tiga langkah menjaga kebersihan',['Lihat sampah','Ambil sampah dengan aman','Buang sampah']),
 make('order','r05','Urutkan langkah meminjam buku.','Kembalikan buku',['Pilih buku','Baca buku','Kembalikan buku'],'steps-library','Buku dikembalikan setelah selesai digunakan.',1,'Tiga langkah menggunakan buku',['Pilih buku','Baca buku','Kembalikan buku']),
 make('order','r06','Urutkan langkah membantu teman.','Tanya bantuan yang diperlukan',['Dekati teman dengan sopan','Tanya bantuan yang diperlukan','Bantu jika teman setuju'],'steps-help','Mulailah dengan sopan dan tanyakan kebutuhannya.',2,'Tiga langkah membantu teman',['Dekati teman dengan sopan','Tanya bantuan yang diperlukan','Bantu jika teman setuju']),
 make('history','h01','Hari Santri Nasional diperingati setiap tanggal berapa?','22 Oktober',['22 Oktober','17 Agustus','1 Juni','10 November'],'calendar','Tanggal ini ada pada bulan Oktober.',1,'Kalender dengan tanggal 22 Oktober'),
 make('history','h02','Di mana santri biasanya belajar dan tinggal?','Pesantren',['Pasar','Pesantren','Stasiun','Pelabuhan'],'pesantren','Tempat belajar agama dan kehidupan bersama.',1,'Ilustrasi pesantren'),
 make('history','h03','Apa yang dapat kita lakukan bersama teman?','Belajar dan saling membantu',['Belajar dan saling membantu','Mengejek teman','Merusak barang','Berebut terus'],'helping','Pilih kegiatan yang membangun kebersamaan.',1,'Anak-anak saling membantu'),
 make('history','h04','Apa yang digunakan untuk membaca dan belajar?','Kitab atau buku',['Bola','Kitab atau buku','Sendok','Sepatu'],'kitab','Benda ini memiliki halaman untuk dibaca.',1,'Kitab atau buku'),
 make('history','h05','Hari Santri mengajak kita menghargai…','Semangat belajar dan kebaikan',['Semangat belajar dan kebaikan','Mengejek orang lain','Bertengkar','Membuang sampah'],'lantern','Pilih nilai yang baik untuk dilakukan setiap hari.',2,'Lentera dan suasana pesantren'),
 make('history','h06','Apa yang bisa membuat lingkungan belajar nyaman?','Menjaga kebersihan bersama',['Menjaga kebersihan bersama','Membuang sampah sembarangan','Berteriak terus','Merusak buku'],'clean','Kita bisa merawat lingkungan bersama-sama.',1,'Anak menjaga kebersihan')
];
export const getModeQuestions = (mode:ModeId) => questions.filter(q=>q.mode===mode);
