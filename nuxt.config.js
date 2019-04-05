module.exports = {
  mode: 'spa',

  head: {
    title: 'e-Chauffeur',
    htmlAttrs: {
      lang: 'fr',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' },
    ],
  },

  loading: { color: '#fff' },

  css: [
    { src: '~assets/css/main.scss', lang: 'scss' },
  ],

  env: {
    apiUrl: process.env.API_URL,
  },

  plugins: [
    '~/api',
    '~/plugins/socket.js',
    '~/plugins/markdown.js',
    '~/plugins/validator.js',
  ],

  modules: [
    'nuxt-leaflet',
    [
      '@fabnumdef/e-chauffeur_lib-vue',
      {
        components: {},
      },
    ],
    ['qonfucius-nuxt-bulma', { css: false, postcss: false }],
    'qonfucius-nuxt-fontawesome',
  ],

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: ['faFlag', 'faMapMarkerAlt', 'faDotCircle', 'faChevronRight'],
      },
    ],
  },

  toast: {
    position: 'bottom-right',
    duration: 15000,
  },

  manifest: {
    name: 'e-Chauffeur',
    short_name: 'e-Chauffeur',
    description: 'Application utilisateur',
    lang: 'fr',
  },
};
