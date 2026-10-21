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
  vi.stubGlobal('scrollTo', vi.fn());
  window.history.replaceState(null, '', '/');
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
    const slideFrame = document.querySelector('img[alt^="Slide 1 dari 11"]');
    expect(slideFrame).not.toBeNull();
    expect(slideFrame?.getAttribute('src')).toContain('/materi/slides/slide-01.jpg');
    click(buttonByText('Berikutnya'));
    expect(document.querySelector('img[alt^="Slide 2 dari 11"]')).not.toBeNull();
    expect(document.querySelector('a[download="PPT_Hari_Santri_Nasional.pptx"]')).not.toBeNull();
    click(buttonByText('Tutup presentasi'));
    expect(document.querySelector('img[alt^="Slide 2 dari 11"]')).toBeNull();
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
    const chooseWrong = () => click([...secondPanel.querySelectorAll<HTMLButtonElement>('.answer-card')].find((card) => !card.disabled && card.textContent?.trim() !== secondQuestion?.answer) ?? null);
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

  it('membatasi pilihan sampai 50 soal dan memakai pilihan nama, bukan ketikan', () => {
    startAtSetup();
    click(buttonByText('Pilih nama gambar'));
    expect(document.querySelectorAll('select option')).toHaveLength(50);
    pickCount('1');
    click(buttonByText('Mulai bermain'));
    expect(document.querySelector('input[type="text"], .name-answer input')).toBeNull();
    const image = document.querySelector('.name-answer .picture');
    const question = questions.find((item) => item.alt === image?.getAttribute('alt'));
    const names = [...document.querySelectorAll<HTMLButtonElement>('.name-button')];
    expect(names).toHaveLength(3);
    expect(document.querySelectorAll('.name-choice .listen-button')).toHaveLength(3);
    click(names.find((button) => button.textContent === question?.answer) ?? null);
    expect(document.body.textContent).toContain('Benar! Dapat 1 poin.');
  });

  it('menonaktifkan pilihan nama yang sudah salah dan menampilkan petunjuk', () => {
    startAtSetup();
    click(buttonByText('Pilih nama gambar'));
    pickCount('1');
    click(buttonByText('Mulai bermain'));
    const image = document.querySelector('.name-answer .picture');
    const question = questions.find((item) => item.alt === image?.getAttribute('alt'));
    const wrong = [...document.querySelectorAll<HTMLButtonElement>('.name-button')].find((button) => button.textContent !== question?.answer);
    click(wrong ?? null);
    expect(wrong?.disabled).toBe(true);
    expect(document.body.textContent).toContain('Petunjuk:');
  });

  it('membuka halaman lagu dan memuat YouTube hanya setelah ditekan', () => {
    click(buttonByText('Lagu santri'));
    expect(document.body.textContent).toContain('Mars Syubbanul Wathon');
    expect(document.body.textContent).toContain('Hari Santri 22 Oktober 45');
    expect(document.querySelector('iframe')).toBeNull();
    const links = [...document.querySelectorAll<HTMLAnchorElement>('a')].filter((link) => link.textContent === 'Buka di YouTube');
    expect(links.map((link) => link.href)).toEqual(['https://youtu.be/q-jLfOBVxrw', 'https://youtu.be/mMaE4Ll7VMo']);
    click(buttonByText('Putar dari YouTube'));
    expect(document.querySelector('iframe')?.getAttribute('src')).toContain('youtube-nocookie.com/embed/q-jLfOBVxrw');
  });

  it('video di web aktif hanya bila filenya ada', async () => {
    vi.stubGlobal('fetch', vi.fn((url: string) => Promise.resolve(url.includes('yalal-wathon') ? { ok: true, headers: { get: () => 'video/mp4' } } : { ok: false, headers: { get: () => 'text/html' } })));
    click(buttonByText('Lagu santri'));
    await act(async () => { await Promise.resolve(); });
    const buttons = [...document.querySelectorAll<HTMLButtonElement>('button')].filter((button) => button.textContent === 'Putar video di web');
    expect(buttons.map((button) => button.disabled)).toEqual([false, true]);
    expect(document.body.textContent).toContain('Video di web belum tersedia.');
    click(buttons[0]);
    expect(document.querySelector('video')?.getAttribute('src')).toContain('lagu/yalal-wathon.mp4');
    vi.unstubAllGlobals();
  });

  const openSlideshow = () => {
    click(buttonByText('Lihat materi'));
    click(buttonByText('Tampilkan PPT'));
    click(buttonByText('Slide layar penuh'));
    const dialog = document.querySelector('[role="dialog"]');
    if (!dialog) throw new Error('Tampilan layar penuh tidak terbuka.');
    return dialog;
  };
  const pointer = (element: Element, type: string, x: number, y: number) => act(() => { element.dispatchEvent(new MouseEvent(type, { bubbles: true, clientX: x, clientY: y })); });
  const swipe = (element: Element, fromX: number, toX: number, dy = 0) => { pointer(element, 'pointerdown', fromX, 100); pointer(element, 'pointerup', toX, 100 + dy); };
  const slideAlt = (scope: ParentNode) => scope.querySelector('img')?.getAttribute('alt') ?? '';

  it('slide layar penuh: tombol, geser, papan ketik, dan menutup', () => {
    const dialog = openSlideshow();
    expect(document.body.style.overflow).toBe('hidden');
    expect(slideAlt(dialog)).toContain('Slide 1 dari 11');
    const bar = [...dialog.querySelectorAll<HTMLButtonElement>('.slide-bar button')];
    expect(bar.find((button) => button.textContent === 'Sebelumnya')?.disabled).toBe(true);
    expect(document.activeElement?.textContent).toBe('Tutup');
    const stage = dialog.querySelector('.slide-stage') as Element;
    swipe(stage, 500, 300);
    expect(slideAlt(dialog)).toContain('Slide 2 dari 11');
    swipe(stage, 300, 500);
    expect(slideAlt(dialog)).toContain('Slide 1 dari 11');
    swipe(stage, 300, 500);
    expect(slideAlt(dialog)).toContain('Slide 1 dari 11');
    swipe(stage, 500, 480);
    swipe(stage, 500, 300, 400);
    expect(slideAlt(dialog)).toContain('Slide 1 dari 11');
    click(bar.find((button) => button.textContent === 'Berikutnya') ?? null);
    act(() => { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' })); });
    expect(slideAlt(dialog)).toContain('Slide 3 dari 11');
    act(() => { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' })); });
    expect(slideAlt(dialog)).toContain('Slide 11 dari 11');
    expect(bar.find((button) => button.textContent === 'Berikutnya')?.disabled).toBe(true);
    act(() => { window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' })); });
    expect(document.querySelector('[role="dialog"]')).toBeNull();
    expect(document.body.style.overflow).not.toBe('hidden');
    expect(document.activeElement?.textContent).toBe('Slide layar penuh');
    expect(document.querySelector('img[alt^="Slide 11 dari 11"]')).not.toBeNull();
  });

  it('slide di halaman materi bisa digeser dan tombol Tutup menutup layar penuh', () => {
    click(buttonByText('Lihat materi'));
    click(buttonByText('Tampilkan PPT'));
    swipe(document.querySelector('.slide-frame') as Element, 400, 200);
    expect(document.querySelector('.presentation-slide')?.getAttribute('alt')).toContain('Slide 2 dari 11');
    click(buttonByText('Slide layar penuh'));
    click([...document.querySelectorAll('button')].find((button) => button.textContent === 'Tutup') ?? null);
    expect(document.querySelector('[role="dialog"]')).toBeNull();
  });

  it('tombol layar penuh aplikasi hanya muncul bila browser mendukung', () => {
    expect(buttonByText('Layar penuh')).toBeNull();
    Object.defineProperty(document, 'fullscreenEnabled', { value: true, configurable: true });
    const request = vi.fn(() => Promise.resolve());
    document.documentElement.requestFullscreen = request;
    click(buttonByText('Suara aktif'));
    click(buttonByText('Layar penuh'));
    expect(request).toHaveBeenCalled();
    Reflect.deleteProperty(document, 'fullscreenEnabled');
    Reflect.deleteProperty(document.documentElement, 'requestFullscreen');
  });

  const setText = (input: HTMLInputElement, value: string) => act(() => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set?.call(input, value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  });
  const startTwoTeams = (first: string, second: string) => {
    startAtSetup();
    click(document.querySelector('.team-option input'));
    const [one, two] = [...document.querySelectorAll<HTMLInputElement>('.team-names input')];
    setText(one, first);
    setText(two, second);
    pickCount('1');
    click(buttonByText('Mulai dua tim'));
    return [...document.querySelectorAll('.team-panel')];
  };

  it('nama tim muncul di papan, skor, dan pemenang', () => {
    const [panelOne, panelTwo] = startTwoTeams('Elang', '  Rajawali ');
    expect(panelOne.querySelector('.team-heading h2')?.textContent).toContain('Elang');
    expect(panelTwo.querySelector('.team-heading h2')?.textContent).toContain('Rajawali');
    const prompt = (panel: Element) => panel.querySelector('.prompt-row p')?.textContent ?? '';
    const answer = (panel: Element) => questions.find((item) => item.prompt === prompt(panel))?.answer;
    click([...panelOne.querySelectorAll('.answer-card')].find((card) => card.textContent?.trim() === answer(panelOne)) ?? null);
    click(panelOne.querySelector('.answer-state button'));
    const wrongAnswer = answer(panelTwo);
    for (let tries = 0; tries < 2; tries += 1) click([...panelTwo.querySelectorAll<HTMLButtonElement>('.answer-card')].find((card) => !card.disabled && card.textContent?.trim() !== wrongAnswer) ?? null);
    click(panelTwo.querySelector('.answer-state button'));
    expect(document.querySelector('.winner')?.textContent).toBe('Elang mendapat poin lebih banyak.');
    expect([...document.querySelectorAll('.result-scores h2')].map((heading) => heading.textContent)).toEqual(['Elang', 'Rajawali']);
  });

  it('nama kosong kembali ke Tim 1 dan Tim 2, nama kembar diberi nomor', () => {
    const [blankOne, blankTwo] = startTwoTeams('   ', '');
    expect(blankOne.querySelector('.team-heading h2')?.textContent).toContain('Tim 1');
    expect(blankTwo.querySelector('.team-heading h2')?.textContent).toContain('Tim 2');
    click(buttonByText('Pengaturan permainan'));
    const [one, two] = [...document.querySelectorAll<HTMLInputElement>('.team-names input')];
    setText(one, 'Singa');
    setText(two, 'singa');
    click(buttonByText('Mulai dua tim'));
    const headings = [...document.querySelectorAll('.team-panel .team-heading h2')].map((heading) => heading.textContent ?? '');
    expect(headings[0]).toContain('Singa (1)');
    expect(headings[1]).toContain('singa (2)');
  });

  it('tombol Back browser kembali ke layar sebelumnya', async () => {
    click(buttonByText('Lihat materi'));
    expect(window.location.hash).toBe('#/materials');
    await act(async () => { window.history.back(); await new Promise((resolve) => setTimeout(resolve, 30)); });
    expect(window.location.hash).toBe('');
    expect(buttonByText('Lihat materi')).not.toBeNull();
    expect(document.body.textContent).not.toContain('Materi singkat tentang santri');
  });

  it('fokus pindah ke teks soal dan skor diumumkan', () => {
    startAtSetup();
    pickCount('2');
    click(buttonByText('Mulai bermain'));
    expect(document.activeElement?.closest('.prompt-row')).not.toBeNull();
    expect(document.querySelector('.team-heading strong')?.getAttribute('aria-live')).toBe('polite');
  });

  it('gambar merek memakai WebP yang ringan', () => {
    expect(document.querySelector('.brand img')?.getAttribute('src')).toMatch(/hari-santri-2026\.webp$/);
    expect(document.querySelector('.hero-santri img')?.getAttribute('src')).toMatch(/santri-pair\.webp$/);
  });
});
