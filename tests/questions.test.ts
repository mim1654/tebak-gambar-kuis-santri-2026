import { describe, expect, it } from 'vitest';
import { modes, questions, getModeQuestions } from '../src/data/questions';
describe('bank soal Kuis Santri',()=>{
 it('memiliki minimal 36 soal dengan ID unik',()=>{expect(questions.length).toBeGreaterThanOrEqual(36);expect(new Set(questions.map(q=>q.id)).size).toBe(questions.length);});
 it('setiap mode memiliki setidaknya enam soal',()=>{for(const mode of modes)expect(getModeQuestions(mode.id).length).toBeGreaterThanOrEqual(6);});
 it('semua soal memiliki jawaban dan petunjuk',()=>{for(const q of questions){expect(q.correct.length).toBeGreaterThan(0);expect(q.hint.length).toBeGreaterThan(0);expect(q.options.length).toBeGreaterThanOrEqual(2);}});
 it('urutan tiga langkah berisi tiga langkah',()=>{for(const q of getModeQuestions('order'))expect(q.steps).toHaveLength(3);});
});
