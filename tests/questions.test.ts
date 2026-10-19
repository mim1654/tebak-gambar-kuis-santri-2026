import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { matchingItems, modes, questions, topics } from '../src/data/questions';

describe('bank soal belajar santri', () => {
  it('memiliki 20 soal dengan ID unik dan batas sesi tidak melebihi 20', () => {
    expect(questions).toHaveLength(20);
    expect(new Set(questions.map((question) => question.id)).size).toBe(questions.length);
  });

  it('hanya menyediakan dua mode permainan yang disepakati', () => {
    expect(modes.map((mode) => mode.id)).toEqual(['guess', 'match']);
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
  });
});
