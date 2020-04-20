module.exports = {
  head: {
    title: 'e-Chauffeur',
    link: [
      { rel: 'stylesheet', href: '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,600' },
    ],
  },

  router: {
    middleware: ['auth'],
  },

  css: [
    { src: '~assets/css/main.scss', lang: 'scss' },
  ],

  plugins: [
    { src: '~/plugins/datetime-picker.js', mode: 'client' },
    { src: '~/plugins/ride-map.js', mode: 'client' },
    { src: '~/plugins/socket.js', mode: 'client' },
    '~/plugins/validator.js',
    '~/plugins/multiselect.js',
    '~/plugins/buefy.js',
  ],

  modules: [
    'nuxt-leaflet',
    [
      '@fabnumdef/e-chauffeur_lib-vue',
      {
        api: {
          campuses: 'campuses',
          rides: 'rides',
          forms: 'forms',
          jwt: 'jwt',
          users: 'users',
          pois: 'pois',
          ratings: 'ratings',
        },
        mockAxios: (process.env.MOCK_AXIOS || '').toLowerCase() === 'true',
        accountRoute: 'my-account',
        authPlugins: [
          { src: 'auth-renew', mode: 'client' },
          { src: 'user-expiration', mode: 'client' },
        ],
        prometheus: {
          port: process.env.PROMETHEUS_EXPORTER || 9091,
          host: '0.0.0.0',
        },
      },
    ],
  ],

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faFlag', 'faMapMarkerAlt', 'faDotCircle', 'faChevronRight', 'faCheckCircle', 'faTimesCircle',
          'faSignOutAlt', 'faClock', 'faFlagCheckered', 'faMapPin', 'faPlus', 'faMinus',
        ],
      },
    ],
  },

  manifest: {
    name: 'e-Chauffeur',
    short_name: 'e-Chauffeur',
    description: 'Application utilisateur',
  },
};
