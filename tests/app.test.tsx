import { act, createElement } from 'react';
import { createRoot, type Root } from 'react-dom/client';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../src/App';
import { questions } from '../src/data/questions';

let root: Root;
let host: HTMLDivElement;
const click = (element: Element | null) => {
  if (!(element instanceof HTMLElement)) throw new Error('Elemen yang akan ditekan tidak ditemukan.');
  act(() => element.click());
};
const buttonByText = (text: string) => [...document.querySelectorAll('button')].find((button) => button.textContent?.includes(text)) ?? null;
const startAtSetup = () => click(buttonByText('Mulai bermain'));
const pickCount = (value: string) => {
  const select = document.querySelector('select');
  if (!(select instanceof HTMLSelectElement)) throw new Error('Pilihan jumlah soal tidak ditemukan.');
  act(() => { select.value = value; select.dispatchEvent(new Event('change', { bubbles: true })); });
};

beforeEach(() => {
  (globalThis as typeof globalThis & { IS_REACT_ACT_ENVIRONMENT?: boolean }).IS_REACT_ACT_ENVIRONMENT = true;
  vi.stubGlobal('SpeechSynthesisUtterance', class { lang = ''; rate = 1; pitch = 1; constructor(readonly text: string) { void text; } });
  vi.stubGlobal('speechSynthesis', { cancel: vi.fn(), speak: vi.fn() });
  host = document.createElement('div');
  document.body.append(host);
  root = createRoot(host);
  act(() => root.render(createElement(App)));
});

afterEach(() => {
  act(() => root.unmount());
  host.remove();
  vi.unstubAllGlobals();
});

describe('alur aplikasi santri', () => {
  it('membuka materi, menayangkan slide PPT, lalu menyiapkan kuis', () => {
    click(buttonByText('Suara aktif'));
    expect(buttonByText('Suara mati')).not.toBeNull();
    click(buttonByText('Suara mati'));
    click(buttonByText('Lihat materi'));
    expect(document.body.textContent).toContain('Materi singkat tentang santri');
    expect(document.body.textContent).toContain('Tempat ibadah');
    click(buttonByText('Tampilkan PPT'));
    const slideFrame = document.querySelector('iframe[title="Tayangan slide Hari Santri Nasional"]');
    expect(slideFrame).not.toBeNull();
    expect(slideFrame?.getAttribute('src')).toContain('/materi/PPT_Hari_Santri_Nasional.pdf');
    expect(document.querySelector('a[download="PPT_Hari_Santri_Nasional.pptx"]')).not.toBeNull();
    click(buttonByText('Tutup presentasi'));
    expect(document.querySelector('iframe[title="Tayangan slide Hari Santri Nasional"]')).toBeNull();
    expect(document.body.textContent).not.toMatch(/cuci tangan|mencuci tangan/i);
    click(buttonByText('Dengarkan materi'));
    expect(vi.mocked(window.speechSynthesis.speak)).toHaveBeenCalled();
    click(buttonByText('Kembali ke beranda'));
    click(buttonByText('Mulai bermain'));
    expect(document.body.textContent).toContain('Siapkan permainan');
    expect(document.querySelectorAll('.choice')).toHaveLength(4);
    expect(document.querySelectorAll('.topic-option')).toHaveLength(4);
  });

  it('memberi satu kesempatan ulang dan tidak memberi poin untuk jawaban kedua', () => {
    startAtSetup();
    pickCount('1');
    click(buttonByText('Mulai bermain'));
    const prompt = document.querySelector('.team-panel .prompt-row p')?.textContent ?? '';
    const question = questions.find((item) => item.prompt === prompt);
    expect(question).toBeDefined();
    const cards = [...document.querySelectorAll('.answer-card')];
    click(cards.find((card) => card.textContent?.trim() !== question?.answer) ?? null);
    expect(document.body.textContent).toContain('Belum tepat. Kamu boleh mencoba sekali lagi.');
    const correctCard = [...document.querySelectorAll('.answer-card')].find((card) => card.textContent?.trim() === question?.answer);
    click(correctCard ?? null);
    expect(document.body.textContent).toContain('Jawaban benar. Kamu sudah mencoba');
    expect(document.querySelector('.team-heading strong')?.textContent).toBe('0 poin');
    click(buttonByText('Soal berikutnya'));
    expect(document.body.textContent).toContain('Skor kamu');
    expect(document.body.textContent).toContain('0');
  });

  it('menampilkan dua papan pasangan dan skor dua tim pada saat bersamaan', () => {
    startAtSetup();
    click(buttonByText('Pasangkan dua gambar'));
    pickCount('1');
    const teamCheckbox = document.querySelector('.team-option input');
    if (!(teamCheckbox instanceof HTMLInputElement)) throw new Error('Pilihan dua tim tidak ditemukan.');
    click(teamCheckbox);
    click(buttonByText('Mulai dua tim'));
    expect(document.querySelectorAll('.team-panel')).toHaveLength(2);
    expect(document.querySelectorAll('.team-panel .match-card')).toHaveLength(8);

    for (let teamIndex = 0; teamIndex < 2; teamIndex += 1) {
      const panel = document.querySelectorAll('.team-panel')[teamIndex];
      for (let pair = 0; pair < 2; pair += 1) {
        const cards = [...panel.querySelectorAll('.match-card:not(.is-matched)')];
        const first = cards[0];
        const label = first?.getAttribute('aria-label');
        const partner = cards.find((card, index) => index > 0 && card.getAttribute('aria-label') === label);
        click(first ?? null);
        click(partner ?? null);
      }
      expect(panel.textContent).toContain('Benar! Dapat 1 poin.');
      expect(panel.querySelector('.team-heading strong')?.textContent).toBe('1 poin');
      click(panel.querySelector('.answer-state button'));
    }
    expect(document.body.textContent).toContain('Terima kasih sudah bermain bersama.');
    expect(document.body.textContent).toContain('Tim 1');
    expect(document.body.textContent).toContain('Tim 2');
    expect(document.body.textContent).toContain('Skor kedua tim sama.');
  });

  it('menjaga giliran tim terpisah, memperlihatkan jawaban setelah dua kesalahan, lalu menentukan pemenang', () => {
    startAtSetup();
    const teamCheckbox = document.querySelector('.team-option input');
    if (!(teamCheckbox instanceof HTMLInputElement)) throw new Error('Pilihan dua tim tidak ditemukan.');
    click(teamCheckbox);
    pickCount('1');
    click(buttonByText('Mulai dua tim'));
    const firstPanel = document.querySelectorAll('.team-panel')[0];
    const firstPrompt = firstPanel.querySelector('.prompt-row p')?.textContent ?? '';
    const firstQuestion = questions.find((item) => item.prompt === firstPrompt);
    const firstCorrect = [...firstPanel.querySelectorAll('.answer-card')].find((card) => card.textContent?.trim() === firstQuestion?.answer);
    click(firstCorrect ?? null);
    click(firstPanel.querySelector('.answer-state button'));
    expect(document.querySelectorAll('.team-panel')[1].textContent).not.toContain('Selesai.');

    const secondPanel = document.querySelectorAll('.team-panel')[1];
    const secondPrompt = secondPanel.querySelector('.prompt-row p')?.textContent ?? '';
    const secondQuestion = questions.find((item) => item.prompt === secondPrompt);
    const chooseWrong = () => click([...secondPanel.querySelectorAll('.answer-card')].find((card) => card.textContent?.trim() !== secondQuestion?.answer) ?? null);
    chooseWrong();
    chooseWrong();
    expect(secondPanel.textContent).toContain(`Jawabannya: ${secondQuestion?.answer}`);
    expect(secondPanel.querySelector('.team-heading strong')?.textContent).toBe('0 poin');
    click(secondPanel.querySelector('.answer-state button'));
    expect(document.body.textContent).toContain('Tim 1 mendapat poin lebih banyak.');
  });

  it('menggabungkan kedua jenis permainan dalam satu sesi', () => {
    startAtSetup();
    click(buttonByText('Gabungan permainan'));
    pickCount('2');
    click(buttonByText('Mulai bermain'));
    expect(document.body.textContent).toContain('Permainan gabungan');
    expect(document.querySelectorAll('.answer-card')).toHaveLength(3);
    const firstPrompt = document.querySelector('.team-panel .prompt-row p')?.textContent ?? '';
    const firstQuestion = questions.find((item) => item.prompt === firstPrompt);
    click([...document.querySelectorAll('.answer-card')].find((card) => card.textContent?.trim() === firstQuestion?.answer) ?? null);
    click(buttonByText('Soal berikutnya'));
    expect(document.querySelectorAll('.match-card')).toHaveLength(4);
  });

  it('membatasi pilihan sampai 50 soal dan menerima jawaban yang diketik', () => {
    startAtSetup();
    click(buttonByText('Ketik nama gambar'));
    expect(document.querySelectorAll('select option')).toHaveLength(50);
    pickCount('1');
    click(buttonByText('Mulai bermain'));
    const image = document.querySelector('.typing-answer .picture');
    const question = questions.find((item) => item.alt === image?.getAttribute('alt'));
    const input = document.querySelector('.typing-answer input');
    if (!(input instanceof HTMLInputElement) || !question) throw new Error('Soal ketik tidak tampil.');
    act(() => { const setter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set; setter?.call(input, question.answer); input.dispatchEvent(new Event('input', { bubbles: true })); });
    click(buttonByText('Cek jawaban'));
    expect(document.body.textContent).toContain('Benar! Dapat 1 poin.');
  });
});
