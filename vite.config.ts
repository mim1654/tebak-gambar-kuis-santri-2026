import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
export default defineConfig({ plugins: [react()], base: process.env.GITHUB_PAGES === 'true' ? '/tebak-gambar-kuis-santri-2026/' : './', test: { environment: 'jsdom' } });
