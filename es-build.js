import { build } from 'esbuild';

build({
  entryPoints: ['src/**/*.ts'],
  outdir: 'dist',
  bundle: false,
  platform: 'node',
  target: 'es6',
  format: 'esm',
  tsconfig: 'tsconfig.json'
});
