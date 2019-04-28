import pkg from './package'

export default {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: 'Empire Admin',
    titleTemplate: (titleChunk) => {
        // If undefined or blank then we don't need the hyphen
        return titleChunk ? `${titleChunk} - Empire Admin` : 'Empire Admin';
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
 css: [
    '@/assets/scss/empire-admin.scss'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '~/plugins/vue-bar',
    '~/plugins/vue-moment',
    {
        src: './plugins/vue-snotify',
        ssr: false
    },
  ],

  router: {
      linkActiveClass: 'node-active',
      middleware: 'auth-sitemap',
  },
  auth: {
      redirect: {
          login: '/login',
          logout: '/',
          callback: '/login',
          user: '/'
      },
      strategies: {
          local: {
              endpoints: {
                  login: {url: '/api/authenticate', method: 'post', propertyName: 'dataSet.token'},
                  logout: {url: '/api/logout', method: 'get'},
                  user: {url: '/api/me', method: 'get', propertyName: 'dataSet'}
              },
          }
      }
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    ['@nuxtjs/axios',{baseURL: 'http://api.1pxup.com'}],
    '@nuxtjs/pwa',
    // Doc: https://bootstrap-vue.js.org/docs/
    ['bootstrap-vue/nuxt',{ css: false }]
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    analyze: false,
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  },

  env: {
    baseUrl: 'http://api.1pxup.com'
  }
}
