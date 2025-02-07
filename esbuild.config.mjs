#!/usr/bin/env node

import { build } from 'esbuild';
import process from 'node:process';

build({
  entryPoints: ['src/server/index.ts'],
  bundle: true,
  outdir: 'dist/server',
  platform: 'node',
  format: 'esm',
  target: 'node14',
  treeShaking: true,
  packages: 'external',
}).catch(() => process.exit(1));
