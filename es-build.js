const esbuild = require('esbuild');

(async () => {
  const globby = (await import('globby')).globby;
  const entryPoints = await globby(['src/**/*.ts', '!src/**/*.spec.ts']);

  esbuild
    .build({
      entryPoints: entryPoints,
      outdir: 'dist',
      bundle: false,
      platform: 'node',
      target: 'es6',
      format: 'cjs',
      tsconfig: 'tsconfig.json'
    })
    .catch(() => process.exit(1));
})();
