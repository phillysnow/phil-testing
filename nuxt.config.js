require('dotenv').config();

export default {
	mode: 'universal',
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'TheFactor.e',
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: process.env.npm_package_description || '' },
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#3edb58' },
	/*
	 ** Global CSS / SCSS
	 */
	css: ['@/scss/style.scss'],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
		'@nuxtjs/gtm',
	],
	gtm: {
		id: 'GTM-XXXXXX',
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		'@nuxtjs/prismic',
	],
	prismic: {
		endpoint: process.env.endpoint || 'https://tfe-test.cdn.prismic.io/api/v2',
		linkResolver: '@/prismic/link-resolver.js',
		apiOptions: {
			routes: [
				{
					type: 'default',
					path: '/:uid',
				},
				{
					type: 'case_post',
					path: '/cases/:uid',
				},
				{
					type: 'opinion_post',
					path: '/opinies/:uid',
				},
				{
					type: 'news_post',
					path: '/actueel/:uid',
				},
				{
					type: 'event_post',
					path: '/actueel/:uid',
				},
			],
		},
	},
	/*
	 ** Style resources module configuration
	 ** See https://github.com/nuxt-community/style-resources-module/
	 */
	styleResources: {
		scss: ['@/scss/_variables.scss', '@/scss/_mixins.scss'],
	},
	/*
	 ** Axios module configuration
	 ** See https://axios.nuxtjs.org/options
	 */
	axios: {},
	/*
	 ** Build configuration
	 */
	build: {
		/*
		 ** You can extend webpack config here
		 */
		extend(config, ctx) {},
		babel: {
			plugins: [
				['@babel/plugin-proposal-decorators', { legacy: true }],
				['@babel/plugin-proposal-class-properties', { loose: true }],
			],
		},
	},
};
