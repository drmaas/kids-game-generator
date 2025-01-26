import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/client/**/*.{ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
