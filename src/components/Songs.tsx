import { useEffect, useState } from 'react';
import { songs, type Song } from '../data/songs';

const fileUrl = (name: string) => `${import.meta.env.BASE_URL}lagu/${name}`;

function SongCard({ song }: { song: Song }) {
  const [view, setView] = useState<'none' | 'file' | 'youtube'>('none');
  const [hasFile, setHasFile] = useState<boolean | null>(null);

  useEffect(() => {
    let alive = true;
    if (typeof fetch !== 'function') {
      setHasFile(false);
      return undefined;
    }
    fetch(fileUrl(song.file), { method: 'HEAD' })
      .then((response) => { if (alive) setHasFile(response.ok && (response.headers.get('content-type') ?? '').startsWith('video')); })
      .catch(() => { if (alive) setHasFile(false); });
    return () => { alive = false; };
  }, [song.file]);

  const youtubeUrl = `https://youtu.be/${song.youtubeId}`;
  return (
    <article className="song-card">
      <h2>{song.title}</h2>
      <p>{song.description}</p>
      <div className="actions">
        <button className="button primary" disabled={!hasFile} aria-pressed={view === 'file'} onClick={() => setView('file')}>Putar video di web</button>
        <button className="button secondary" aria-pressed={view === 'youtube'} onClick={() => setView('youtube')}>Putar dari YouTube</button>
        <a className="button secondary" href={youtubeUrl} target="_blank" rel="noopener noreferrer">Buka di YouTube</a>
      </div>
      <p className="song-note">{hasFile === false ? 'Video di web belum tersedia. ' : ''}YouTube membutuhkan internet.</p>
      {view === 'file' && <video className="song-video" controls playsInline preload="metadata" src={fileUrl(song.file)} aria-label={`Video ${song.title}`} />}
      {view === 'youtube' && <iframe className="song-video" src={`https://www.youtube-nocookie.com/embed/${song.youtubeId}?rel=0&modestbranding=1&playsinline=1`} title={`YouTube: ${song.title}`} allow="accelerometer; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />}
      <p className="song-credit">Sumber: <a href={youtubeUrl} target="_blank" rel="noopener noreferrer">tautan YouTube</a>. Hak cipta lagu dan video milik pencipta dan pengunggahnya; dipakai untuk belajar di sekolah.</p>
    </article>
  );
}

export default function Songs({ onBack }: { onBack: () => void }) {
  return (
    <main className="page-width subpage songs-page">
      <button className="text-button" onClick={onBack}>Kembali ke beranda</button>
      <h1>Lagu santri</h1>
      <p className="intro">Putar video, lalu nyanyikan bersama. Video tidak diputar otomatis.</p>
      <div className="song-list">{songs.map((song) => <SongCard key={song.id} song={song} />)}</div>
    </main>
  );
}
