const pkg = require('./package');

module.exports = {
  mode: 'spa',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
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
    '~/plugins/socket.js',
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    'nuxt-leaflet',
    '@nuxtjs/axios',
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
        icons: [],
      },
    ],
  },
};
