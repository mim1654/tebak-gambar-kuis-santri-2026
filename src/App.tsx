import { useMemo, useState } from 'react';
import { matchingItems, modes, questions, topics, type ModeId, type Question, type TopicId } from './data/questions';

type Screen = 'home' | 'materials' | 'setup' | 'game' | 'result';
type TeamState = { index: number; score: number; mistakes: number; selected: string[]; matched: string[]; typedAnswer: string; status: 'ready' | 'retry' | 'revealed' | 'done' | 'finished'; deck: Question[] };
const brandImages = new Set(['hari-santri-2026.png', 'plp.png', 'santri-pair.png']);
const pptImages = new Set(['image7.webp','image8.webp','image9.webp','image11.webp','image16.webp','image17.webp','image18.webp','image23.webp']);
const imageUrl = (name: string) => `${import.meta.env.BASE_URL}images/${brandImages.has(name) ? 'brand' : pptImages.has(name) ? 'ppt' : 'quiz'}/${name}`;
const buildTeam = (deck: Question[]): TeamState => ({ index: 0, score: 0, mistakes: 0, selected: [], matched: [], typedAnswer: '', status: 'ready', deck });
const getChoiceSet = (question: Question) => {
  const candidates = questions.filter((item, index, all) => item.answer !== question.answer && item.image !== question.image && all.findIndex((candidate) => candidate.answer === item.answer || candidate.image === item.image) === index);
  const offset = Number(question.id.slice(1).split('-')[0]) % candidates.length;
  return [question, candidates[offset], candidates[(offset + 1) % candidates.length]];
};

function Picture({ question, className = '' }: { question: Question; className?: string }) {
  return <img className={`picture ${className}`} src={imageUrl(question.image)} alt={question.alt} loading="lazy" />;
}

function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [mode, setMode] = useState<ModeId>('guess');
  const [selectedTopics, setSelectedTopics] = useState<TopicId[]>(topics.map((item) => item.id));
  const [count, setCount] = useState(10);
  const [teams, setTeams] = useState(false);
  const [sound, setSound] = useState(true);
  const [audioNotice, setAudioNotice] = useState('');
  const [teamStates, setTeamStates] = useState<TeamState[]>([]);

  const available = useMemo(() => (mode === 'match' ? matchingItems : questions).filter((item) => selectedTopics.includes(item.topic)), [mode, selectedTopics]);
  const actualCount = Math.min(count, 50);

  const say = (text: string) => {
    if (!sound) return;
    if (!('speechSynthesis' in window) || typeof SpeechSynthesisUtterance === 'undefined') {
      setAudioNotice('Suara belum tersedia pada perangkat ini. Minta guru membacakan petunjuk.');
      return;
    }
    try {
      setAudioNotice('');
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'id-ID';
      utterance.rate = 0.9;
      utterance.pitch = 1.08;
      window.speechSynthesis.speak(utterance);
    } catch {
      setAudioNotice('Suara belum tersedia pada perangkat ini. Minta guru membacakan petunjuk.');
    }
  };

  const startGame = () => {
    if (available.length === 0) return;
    const decks = Array.from({ length: teams ? 2 : 1 }, () => Array.from({ length: actualCount }, (_, index) => {
      const question = available[index % available.length];
      return mode === 'mixed' ? { ...question, id: `${question.id}-${index}`, mode: (['guess','match','type'] as const)[index % 3] } : { ...question, id: `${question.id}-${index}`, mode: mode === 'match' ? 'match' as const : mode === 'type' ? 'type' as const : 'guess' as const };
    }));
    setTeamStates(decks.map(buildTeam));
    setScreen('game');
  };

  const nextQuestion = (teamIndex: number) => {
    setTeamStates((old) => old.map((team, index) => index !== teamIndex ? team : team.index + 1 >= team.deck.length
      ? { ...team, status: 'finished', selected: [], matched: [] }
      : { ...team, index: team.index + 1, mistakes: 0, selected: [], matched: [], typedAnswer: '', status: 'ready' }));
  };

  const chooseAnswer = (teamIndex: number, value: string) => {
    const current = teamStates[teamIndex];
    if (!current || current.status === 'done' || current.status === 'revealed') return;
    const question = current.deck[current.index];
    if (value === question.answer) {
      setTeamStates((old) => old.map((team, index) => index !== teamIndex ? team : { ...team, score: team.score + (team.mistakes === 0 ? 1 : 0), status: 'done' }));
      say(['Hore! Kamu berhasil!','Hebat! Jawabanmu benar!','Masya Allah, bagus sekali!'][Math.floor(Math.random() * 3)]);
    } else {
      const mistakes = current.mistakes + 1;
      setTeamStates((old) => old.map((team, index) => index !== teamIndex ? team : { ...team, mistakes, status: mistakes >= 2 ? 'revealed' : 'retry' }));
      say(mistakes >= 2 ? `Jawabannya ${question.answer}. Kita lanjut.` : 'Belum tepat. Coba sekali lagi.');
    }
  };

  const typeAnswer = (teamIndex: number) => {
    const current = teamStates[teamIndex];
    if (!current) return;
    const entered = current.typedAnswer.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('id').replace(/[^a-z0-9]/g, '');
    const answer = current.deck[current.index].answer.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('id').replace(/[^a-z0-9]/g, '');
    const aliases: Record<string, string[]> = { 'bukubelajar':['buku'], 'al-quran':['alquran','quran'], 'kitabpelajaran':['kitab'] };
    if (entered === answer || (aliases[answer] ?? []).includes(entered)) chooseAnswer(teamIndex, current.deck[current.index].answer);
    else chooseAnswer(teamIndex, current.typedAnswer);
  };

  const changeTypedAnswer = (teamIndex: number, value: string) => setTeamStates((old) => old.map((team, index) => index === teamIndex ? { ...team, typedAnswer: value } : team));

  const tapMatch = (teamIndex: number, itemId: string) => {
    const state = teamStates[teamIndex];
    if (!state || state.status === 'done' || state.status === 'revealed' || state.matched.includes(itemId) || state.selected.includes(itemId)) return;
    const selected = [...state.selected, itemId];
    if (selected.length < 2) {
      setTeamStates((old) => old.map((team, index) => index === teamIndex ? { ...team, selected } : team));
      return;
    }
    const [firstId, secondId] = selected;
    const activeQuestion = state.deck[state.index];
    const board = [activeQuestion, ...matchingItems.filter((item) => item.image !== activeQuestion.image).slice(0, 1)];
    const first = board.find((item) => item.id === firstId.split(':')[0]);
    const second = board.find((item) => item.id === secondId.split(':')[0]);
    const correct = Boolean(first && second && first.id === second.id);
    if (correct) {
      const matched = [...state.matched, firstId, secondId];
      const targetPairs = 2;
      if (matched.length >= targetPairs * 2) {
        setTeamStates((old) => old.map((team, index) => index !== teamIndex ? team : { ...team, matched, selected: [], score: team.score + (team.mistakes === 0 ? 1 : 0), status: 'done' }));
        say('Hebat, semua pasangan cocok.');
      } else setTeamStates((old) => old.map((team, index) => index === teamIndex ? { ...team, matched, selected: [] } : team));
    } else {
      const mistakes = state.mistakes + 1;
      setTeamStates((old) => old.map((team, index) => index !== teamIndex ? team : { ...team, selected: [], mistakes, status: mistakes >= 2 ? 'revealed' : 'retry' }));
      say(mistakes >= 2 ? 'Pasangan yang sama terlihat pada kartu bergambar sama. Kita lanjut.' : 'Belum cocok. Pilih pasangan sekali lagi.');
    }
  };

  const allDone = teamStates.length > 0 && teamStates.every((team) => team.status === 'finished');
  const finishOrContinue = (index: number) => {
    const isLastQuestion = teamStates[index].index + 1 >= teamStates[index].deck.length;
    const otherTeamsFinished = teamStates.every((team, teamIndex) => teamIndex === index || team.status === 'finished');
    if (isLastQuestion && otherTeamsFinished) setScreen('result');
    else if (allDone) setScreen('result');
    else nextQuestion(index);
  };
  const goHome = () => { window.speechSynthesis?.cancel(); setAudioNotice(''); setScreen('home'); };

  return <div className="app-shell">
    <header className="topbar">
      <button className="brand" onClick={goHome} aria-label="Kembali ke beranda"><img src={imageUrl('hari-santri-2026.png')} alt="Logo Hari Santri 2026" /><span>Kuis Santri</span></button>
      <div className="identity-logos"><img src={imageUrl('plp.png')} alt="Logo PLP UNIPAR Jember dan SLB C TPA Jember" /></div>
      <button className="sound-toggle" onClick={() => setSound((value) => { const next = !value; if (!next) window.speechSynthesis?.cancel(); return next; })} aria-pressed={sound}>{sound ? 'Suara aktif' : 'Suara mati'}</button>
    </header>

    {screen === 'home' && <main className="home page-width">
      <section className="welcome">
        <div className="welcome-copy"><p className="eyebrow">Belajar Hari Santri</p><h1>Kenali kehidupan santri, satu gambar setiap kali.</h1><p className="intro">Permainan sederhana dengan gambar benda yang jelas, tombol besar, dan petunjuk suara yang lembut. Main bersama guru atau dua tim di satu layar sentuh.</p>
          <div className="actions"><button className="button primary" onClick={() => setScreen('setup')}>Mulai bermain</button><button className="button secondary" onClick={() => setScreen('materials')}>Lihat materi</button></div>
          <p className="short-note">Tidak ada batas waktu. Boleh mendengar, membaca, dan mencoba lagi.</p></div>
      <figure className="hero-photo hero-santri"><img src={imageUrl('santri-pair.png')} alt="Anak santri laki-laki dan perempuan menyapa dengan ramah" /><figcaption>Belajar dan beribadah bersama teman.</figcaption></figure>
      </section>
      <section className="mode-preview" aria-label="Pilihan permainan"><h2>Pilih cara bermain</h2>{modes.map((item, index) => <article key={item.id}><span className="mode-number">0{index + 1}</span><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</section>
    </main>}

    {screen === 'materials' && <main className="page-width subpage"><button className="text-button" onClick={goHome}>Kembali ke beranda</button><h1>Materi singkat tentang santri</h1><p className="intro">Baca bersama. Satu kalimat pendek untuk setiap gambar.</p><div className="materials-list">
      {[
          ['santri-pair.png','Siapa itu santri?','Santri adalah orang yang belajar agama Islam. Santri belajar bersama guru dan teman.'],
        ['image7.webp','Peci putih','Di PPT, peci putih dikenalkan sebagai pakaian santri laki-laki. Peci dipakai di kepala.'],
        ['image9.webp','Baju koko','Baju koko yang bersih dan rapi adalah pakaian santri laki-laki.'],
        ['image8.webp','Sarung','Sarung dipakai di pinggang. Rapikan lipatannya agar nyaman.'],
        ['image11.webp','Mukena','Mukena menutup rambut dan tubuh saat salat.'],
        ['image16.webp','Membaca Al-Qur’an','Santri duduk tenang dan membaca Al-Qur’an. Kita dapat belajar bersama guru.'],
        ['image23.webp','Memakai sarung','Langkah sederhana: masuk ke dalam sarung, tarik ke pinggang, lipat kain ke tengah, lalu gulung bagian atas.'],
        ['image18.webp','Salat berjemaah','Berwudu, berdiri rapi dalam barisan, lalu mengikuti imam.'],
        ['peci.png','Peci dan sarung','Sebagian santri memakai peci dan sarung. Peci dipakai di kepala. Sarung dipakai menutup tubuh bagian bawah.'],
        ['sajadah.png','Sajadah','Sajadah adalah alas untuk salat. Sajadah digelar di tempat yang bersih.'],
        ['mukena.png','Mukena','Mukena adalah pakaian salat yang biasa dipakai perempuan Muslim.'],
        ['masjid.png','Tempat ibadah: masjid','Masjid adalah tempat umat Islam beribadah dan salat bersama. Kita menjaga masjid tetap bersih.'],
        ['quran.png','Al-Qur’an dan rehal','Al-Qur’an adalah kitab suci umat Islam. Rehal membantu menyangga Al-Qur’an saat dibaca.'],
        ['books-desk.png','Belajar bersama','Santri belajar bersama guru dan teman. Kita boleh belajar pelan-pelan dan bertanya.'],
        ['tasbih.png','Zikir','Tasbih memiliki butiran yang dapat dihitung. Sebagian orang memakai tasbih saat berzikir.'],
        ['hari-santri-2026.png','Hari Santri','Hari Santri diperingati setiap tanggal 22 Oktober. Kita menghargai semangat belajar dan kebaikan para santri.'],
      ].map(([image, title, copy]) => <article className="material" key={title}><img src={imageUrl(image)} alt={title} loading="lazy" /><div><h2>{title}</h2><p>{copy}</p><button className="read-button" onClick={() => say(copy)}>Dengarkan materi</button></div></article>)}
    </div></main>}

    {screen === 'setup' && <main className="page-width subpage setup-page"><button className="text-button" onClick={goHome}>Kembali ke beranda</button><h1>Siapkan permainan</h1><p className="intro">Pilih cara bermain, materi, dan jumlah soal. Pengaturan bisa dibacakan.</p><button className="read-button" onClick={() => say('Pilih satu cara bermain, materi, jumlah soal, lalu pilih bermain sendiri atau dua tim.')}>Dengarkan petunjuk</button>
      <section className="setup-section"><h2>1. Cara bermain</h2><div className="choice-row">{modes.map((item) => <button key={item.id} className={`choice ${mode === item.id ? 'chosen' : ''}`} aria-pressed={mode === item.id} onClick={() => setMode(item.id)}><b>{item.title}</b><span>{item.description}</span></button>)}</div></section>
      <section className="setup-section"><h2>2. Pilih materi</h2><div className="topic-list">{topics.map((topic) => <label key={topic.id} className="topic-option"><input type="checkbox" checked={selectedTopics.includes(topic.id)} onChange={(event) => setSelectedTopics((old) => event.target.checked ? [...old, topic.id] : old.filter((id) => id !== topic.id))} /><span>{topic.title}</span></label>)}</div></section>
      <section className="setup-section setup-controls"><label>Jumlah soal <select value={count} onChange={(event) => setCount(Number(event.target.value))}>{Array.from({ length: 50 }, (_, index) => index + 1).map((value) => <option key={value} value={value}>{value} soal</option>)}</select></label><label className="team-option"><input type="checkbox" checked={teams} onChange={(event) => setTeams(event.target.checked)} /><span>Dua tim bermain bersamaan</span></label>{teams && <p className="team-help">Kedua tim mendapat papan soal sendiri. Tim 1 dan Tim 2 dapat menjawab kapan saja; skor mereka dihitung terpisah.</p>}<p className="availability">{available.length === 0 ? 'Pilih setidaknya satu materi untuk mulai bermain.' : `Tersedia ${available.length} kartu soal. Satu sesi maksimal 50 soal.${count > available.length ? ` Kartu akan diacak ulang untuk sesi ${count} soal.` : ''}`}</p></section>
      <button className="button primary start-button" disabled={!selectedTopics.length || !available.length} onClick={startGame}>Mulai {teams ? 'dua tim' : 'bermain'}</button>
    </main>}

    {screen === 'game' && <main className="page-width game-page"><div className="game-heading"><button className="text-button" onClick={() => setScreen('setup')}>Pengaturan permainan</button><h1>{mode === 'mixed' ? 'Permainan gabungan' : mode === 'guess' ? 'Pilih gambar yang benar' : mode === 'type' ? 'Ketik nama gambar' : 'Pasangkan dua gambar'}</h1><p>{teams ? 'Dua tim bermain pada saat yang sama. Gunakan papan Tim 1 dan Tim 2; skor masing-masing terlihat di atas papan.' : mode === 'mixed' ? 'Pilih, pasangkan, dan ketik jawaban secara bergantian.' : 'Tidak ada batas waktu. Boleh mencoba lagi.'}</p></div>
      <div className={`team-grid ${teams ? 'two-teams' : ''}`}>{teamStates.map((state, teamIndex) => { const question = state.deck[state.index]; const activeMode = question.mode; const teamName = teams ? `Tim ${teamIndex + 1}` : 'Giliranmu'; return <section className={`team-panel team-${teamIndex + 1}`} key={teamIndex} aria-label={teamName}>
        <div className="team-heading"><h2>{teamName}<small>Soal {state.index + 1} dari {state.deck.length}</small></h2><strong>{state.score} poin</strong></div>
        {state.status === 'finished' ? <div className="answer-state" role="status"><p className="status-message">Selesai. Skor {state.score} poin.</p>{allDone && <button className="button primary" onClick={() => setScreen('result')}>Lihat hasil</button>}</div> : state.status === 'done' || state.status === 'revealed' ? <div className="answer-state" role="status"><p className="status-message">{state.status === 'done' ? (state.mistakes === 0 ? 'Benar! Dapat 1 poin.' : 'Jawaban benar. Kamu sudah mencoba, soal berikutnya!') : `Jawabannya: ${question.answer}. Kita lanjut.`}</p><button className="button primary" onClick={() => finishOrContinue(teamIndex)}>{allDone ? 'Lihat hasil' : 'Soal berikutnya'}</button></div> : <>
          <div className="current-game-label">{activeMode === 'guess' ? 'Pilih gambar' : activeMode === 'type' ? 'Ketik jawaban' : 'Pasangkan gambar'}</div><div className="prompt-row"><p>{activeMode === 'guess' || activeMode === 'type' ? question.prompt : 'Ketuk gambar pertama, lalu ketuk pasangannya.'}</p><button className="listen-button" onClick={() => say(activeMode === 'guess' || activeMode === 'type' ? question.prompt : 'Ketuk gambar pertama, lalu ketuk gambar yang sama.')}>Dengarkan</button></div>
          {activeMode === 'guess' ? <div className="answer-grid">{getChoiceSet(question).map((item, optionIndex) => <button key={`${item.id}-${optionIndex}`} className="answer-card" onClick={() => chooseAnswer(teamIndex, item.answer)} aria-label={`Pilih gambar ${item.alt}`}><Picture question={item} /><span>{item.answer}</span></button>)}</div> : activeMode === 'type' ? <div className="typing-answer"><Picture question={question} /><label htmlFor={`answer-${teamIndex}`}>Ketik nama gambar</label><div><input id={`answer-${teamIndex}`} value={state.typedAnswer} onChange={(event) => changeTypedAnswer(teamIndex, event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') typeAnswer(teamIndex); }} autoComplete="off" /><button className="button primary" onClick={() => typeAnswer(teamIndex)}>Cek jawaban</button></div></div> : <div className="match-grid">{[question, ...matchingItems.filter((item) => item.image !== question.image).slice(0, 1)].flatMap((item) => [0, 1].map((copy) => <button key={`${item.id}-${copy}`} className={`match-card ${state.selected.includes(`${item.id}:${copy}`) ? 'is-selected' : ''} ${state.matched.includes(`${item.id}:${copy}`) ? 'is-matched' : ''}`} onClick={() => tapMatch(teamIndex, `${item.id}:${copy}`)} aria-label={`Kartu gambar ${item.alt}`}><Picture question={item} /><span>{item.answer}</span></button>))}</div>}
          {state.status === 'retry' && <p className="try-message" role="status">Belum tepat. Kamu boleh mencoba sekali lagi.</p>}
          <p className="score-rule">Jawaban benar pada percobaan pertama mendapat 1 poin. Jawaban salah tidak mengurangi poin.</p>
        </>}
      </section>; })}</div>
    </main>}

    {screen === 'result' && <main className="page-width result-page"><p className="eyebrow">Permainan selesai</p><h1>Terima kasih sudah bermain bersama.</h1><div className={`result-scores ${teams ? 'two-teams' : ''}`}>{teamStates.map((team, index) => <article key={index}><h2>{teams ? `Tim ${index + 1}` : 'Skor kamu'}</h2><strong>{team.score}</strong><span>poin dari {team.deck.length} soal</span></article>)}</div>{teams && teamStates[0].score !== teamStates[1].score && <p className="winner">{teamStates[0].score > teamStates[1].score ? 'Tim 1' : 'Tim 2'} mendapat poin lebih banyak.</p>}{teams && teamStates[0].score === teamStates[1].score && <p className="winner">Skor kedua tim sama.</p>}<div className="actions"><button className="button primary" onClick={() => setScreen('setup')}>Main lagi</button><button className="button secondary" onClick={goHome}>Kembali ke beranda</button></div></main>}

    {audioNotice && <p className="audio-notice" role="status">{audioNotice}</p>}
    <footer className="footer"><span>Belajar pelan-pelan itu boleh.</span><span>Untuk layar sentuh dan belajar bersama.</span></footer>
  </div>;
}

export default App;
