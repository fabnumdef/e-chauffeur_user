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
    '~/plugins/socket.js',
    '~/plugins/validator.js',
    '~/plugins/multiselect.js',
  ],

  modules: [
    'nuxt-leaflet',
    [
      '@fabnumdef/e-chauffeur_lib-vue',
      {
        components: {},
        api: {
          campuses: 'campuses',
          rides: 'rides',
          forms: 'forms',
          jwt: 'jwt',
          users: 'users',
        },
        withAuth: true,
        authPlugins: [
          'auth-renew',
        ],
      },
    ],
  ],

  fontAwesome: {
    packs: [
      {
        package: '@fortawesome/free-solid-svg-icons',
        icons: [
          'faFlag', 'faMapMarkerAlt', 'faDotCircle', 'faChevronRight', 'faCheckCircle', 'faTimesCircle',
          'faSignOutAlt',
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
