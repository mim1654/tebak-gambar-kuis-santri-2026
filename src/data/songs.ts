export type Song = {
  id: string;
  title: string;
  description: string;
  youtubeId: string;
  file: string;
};

export const songs: Song[] = [
  {
    id: 'syubbanul-wathon',
    title: 'Mars Syubbanul Wathon',
    description: 'Lagu cinta tanah air yang sering dinyanyikan di lingkungan pesantren.',
    youtubeId: 'q-jLfOBVxrw',
    file: 'yalal-wathon.mp4',
  },
  {
    id: 'hari-santri',
    title: 'Hari Santri 22 Oktober 45',
    description: 'Lagu untuk menyambut peringatan Hari Santri setiap 22 Oktober.',
    youtubeId: 'mMaE4Ll7VMo',
    file: 'hari-santri.mp4',
  },
];
