import type { ModeId, Question } from '../data/questions';

type Rng = () => number;

// Jawaban yang bisa terlihat benar pada gambar yang sama; tidak dipakai sebagai pengecoh satu sama lain.
const confusable = [
  ['Buku belajar', 'Meja belajar', 'Belajar bersama', 'Kitab pelajaran'],
  ['Al-Qur’an', 'Membaca Al-Qur’an', 'Rehal'],
  ['Sajadah', 'Salat', 'Ruang salat'],
  ['Masjid', 'Ruang salat'],
  ['Peci', 'Sarung'],
];
const sameGroup = (a: string, b: string) => confusable.some((group) => group.includes(a) && group.includes(b));

export const shuffle = <T>(items: readonly T[], rng: Rng = Math.random): T[] => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

// Pengecoh: jawaban dan gambar berbeda, tidak membingungkan, topik yang sama didahulukan.
export const pickDistractors = (question: Question, pool: readonly Question[], count: number, rng: Rng = Math.random): Question[] => {
  const answers = new Set<string>([question.answer]);
  const images = new Set<string>([question.image]);
  const valid = shuffle(pool, rng).filter((item) => {
    if (answers.has(item.answer) || images.has(item.image) || sameGroup(item.answer, question.answer)) return false;
    answers.add(item.answer);
    images.add(item.image);
    return true;
  });
  const sameTopic = valid.filter((item) => item.topic === question.topic);
  const otherTopic = valid.filter((item) => item.topic !== question.topic);
  return [...sameTopic, ...otherTopic].slice(0, count);
};

// Kartu unik (jawaban + gambar) muncul lebih dulu; duplikat baru dipakai setelah semuanya terpakai.
const orderCards = (cards: readonly Question[], rng: Rng) => {
  const seen = new Set<string>();
  const first: Question[] = [];
  const rest: Question[] = [];
  for (const card of shuffle(cards, rng)) {
    const key = `${card.answer}|${card.image}`;
    (seen.has(key) ? rest : first).push(card);
    seen.add(key);
  }
  return [...first, ...rest];
};

const modeAt = (mode: ModeId, index: number) => (mode === 'mixed' ? (['guess', 'match', 'type'] as const)[index % 3] : mode);

export const buildDeck = (available: readonly Question[], count: number, mode: ModeId, pool: readonly Question[], rng: Rng = Math.random): Question[] => {
  if (available.length === 0) return [];
  const sequence: Question[] = [];
  while (sequence.length < count) sequence.push(...orderCards(available, rng));
  return sequence.slice(0, count).map((card, index) => {
    const cardMode = modeAt(mode, index);
    const base = { ...card, id: `${card.id}-${index}`, mode: cardMode };
    if (cardMode === 'guess') return { ...base, picks: shuffle([card, ...pickDistractors(card, pool, 2, rng)], rng) };
    if (cardMode === 'type') return { ...base, names: shuffle([card.answer, ...pickDistractors(card, pool, 2, rng).map((item) => item.answer)], rng) };
    const [decoy] = pickDistractors(card, pool, 1, rng);
    return { ...base, board: shuffle(decoy ? [card, card, decoy, decoy] : [card, card], rng) };
  });
};
