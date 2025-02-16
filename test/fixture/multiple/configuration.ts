export const typescript = [
  {
    extends: 'recommended',
  },
  {
    folder: 'test',
    extends: 'plugin',
  },
  {
    folder: 'demo/web',
    extends: 'web',
  },
  {
    folder: 'api',
    compilerOptions: {
      target: 'ESNext',
    },
  },
  {
    extends: '../tsconfig.json',
    folder: 'demo/mobile',
    compilerOptions: {
      moduleResolution: 'bundler',
    },
  },
]
