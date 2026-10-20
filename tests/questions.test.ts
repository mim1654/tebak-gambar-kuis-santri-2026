import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { matchingItems, modes, questions, topics } from '../src/data/questions';

describe('bank soal belajar santri', () => {
  it('memiliki bank 50 soal dengan ID dan prompt yang unik', () => {
    expect(questions).toHaveLength(50);
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
    expect(new Set(questions.map((question) => question.prompt)).size).toBe(questions.length);
  });

  it('menyediakan tiga permainan dan pilihan gabungan', () => {
    expect(modes.map((mode) => mode.id)).toEqual(['guess', 'match', 'type', 'mixed']);
    expect(matchingItems.length).toBeGreaterThanOrEqual(4);
  });

  it('memuat topik santri saja dan setiap soal memiliki petunjuk serta aset', () => {
    expect(topics.map((topic) => topic.id)).toEqual(['perlengkapan', 'tempat', 'belajar', 'kegiatan']);
    for (const question of questions) {
      expect(question.prompt.length).toBeGreaterThan(0);
      expect(question.answer.length).toBeGreaterThan(0);
      expect(question.hint.length).toBeGreaterThan(0);
      expect(existsSync(resolve(process.cwd(), 'public/images', question.image.includes('2026') ? 'brand' : 'quiz', question.image))).toBe(true);
    }
    expect(questions.some((question) => /cuci tangan|mencuci tangan/i.test(question.prompt))).toBe(false);
    expect(questions.some((question) => /mana yang bisa dibaca|benda apa.*dibaca/i.test(question.prompt))).toBe(false);
  });
});
