import esbuild from 'esbuild';
import { globby } from 'globby';

(async () => {
  const entryPoints = await globby(['src/**/*.ts', '!src/**/*.spec.ts']);

  esbuild
    .build({
      entryPoints: entryPoints,
      outdir: 'dist',
      bundle: false,
      platform: 'node',
      target: 'es6',
      format: 'esm',
      tsconfig: 'tsconfig.json'
    })
    .catch(() => process.exit(1));
})();
