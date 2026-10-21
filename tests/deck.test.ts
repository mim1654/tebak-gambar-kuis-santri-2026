import { describe, expect, it } from 'vitest';
import { questions } from '../src/data/questions';
import { buildDeck } from '../src/lib/deck';

describe('penyusunan deck soal', () => {
  it('mengacak posisi gambar yang benar dan pilihannya berbeda', () => {
    const positions = new Set<number>();
    for (let trial = 0; trial < 60; trial += 1) {
      for (const card of buildDeck(questions, 20, 'guess', questions)) {
        const picks = card.picks ?? [];
        expect(picks).toHaveLength(3);
        expect(new Set(picks.map((item) => item.answer)).size).toBe(3);
        expect(new Set(picks.map((item) => item.image)).size).toBe(3);
        positions.add(picks.findIndex((item) => item.answer === card.answer));
      }
    }
    expect(positions).toEqual(new Set([0, 1, 2]));
  });

  it('pilihan nama memuat jawaban benar dan tidak memakai gambar yang sama', () => {
    for (const card of buildDeck(questions, 50, 'type', questions)) {
      const names = card.names ?? [];
      expect(names).toHaveLength(3);
      expect(new Set(names).size).toBe(3);
      expect(names).toContain(card.answer);
      const sameImage = questions.filter((item) => item.image === card.image).map((item) => item.answer);
      expect(names.filter((name) => name !== card.answer && sameImage.includes(name))).toEqual([]);
    }
  });

  it('papan pasangan berisi dua pasang gambar berbeda', () => {
    for (const card of buildDeck(questions, 20, 'match', questions)) {
      const board = card.board ?? [];
      expect(board).toHaveLength(4);
      expect(new Set(board.map((item) => item.image)).size).toBe(2);
    }
  });

  it('urutan soal berbeda antar-deck dan tidak mengulang kartu sebelum semuanya terpakai', () => {
    const a = buildDeck(questions, 20, 'guess', questions).map((card) => card.answer);
    const b = buildDeck(questions, 20, 'guess', questions).map((card) => card.answer);
    expect(new Set(a).size).toBe(20);
    expect(a).not.toEqual(b);
  });

  it('mode gabungan bergantian pilih gambar, pasangkan, dan pilih nama', () => {
    expect(buildDeck(questions, 6, 'mixed', questions).map((card) => card.mode)).toEqual(['guess', 'match', 'type', 'guess', 'match', 'type']);
  });
});
