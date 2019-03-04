module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
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

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    { src: '~assets/css/main.scss', lang: 'scss' },
  ],

  env: {
    apiUrl: process.env.API_URL,
  },

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/api',
    '~/plugins/axios.js',
    '~/plugins/socket.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-leaflet',
    '@nuxtjs/axios',
    '@nuxtjs/toast',
    '@nuxtjs/pwa',
    ['qonfucius-nuxt-bulma', { css: false, postcss: false }],
    'qonfucius-nuxt-fontawesome',
  ],

  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: ['faFlag', 'faMapMarkerAlt', 'faDotCircle'],
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
