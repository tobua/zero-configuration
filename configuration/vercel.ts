const singlePageApplicationRedirect = {
  rewrites: [{ source: '/(.*)', destination: '/index.html' }],
}

export const templates = {
  spa: singlePageApplicationRedirect,
  // biome-ignore lint/style/useNamingConvention: Alias, as often spelled uppercase.
  SPA: singlePageApplicationRedirect,
  'single-page-application': singlePageApplicationRedirect,
  // Alternative to the above, does the same thing.
  'spa-routes': {
    routes: [{ handle: 'filesystem' }, { src: '/(.*)', dest: '/index.html' }],
  },
  'github-silent': {
    github: {
      silent: true,
    },
  },
}

export const extension = (path: string) => ({ extends: path })

export function createFile(configuration: object) {
  return { name: 'vercel.json', contents: JSON.stringify(configuration, null, 2), showInCi: true }
}
