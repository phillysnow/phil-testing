require('dotenv').config();

export default {
	server: {
		host: '0.0.0.0',
	},
	target: 'server',
	ssr: true,
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'theFactor.e | Human First Digital Agency',
		htmlAttrs: {
			lang: 'nl',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ name: 'google-site-verification', content: 'hTeXiYaJ5zJ-If6IbPk-xzLCqNuUPQTGRwsCMIesCWo' },
			{ name: 'language', content: 'nl' },
			{ property: 'og:site_name', content: 'theFactor.e' },
		],
		link: [
			{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
			{ rel: 'dns-prefetch', href: 'https://thefactore.prismic.io' },
			{ rel: 'dns-prefetch', href: 'https://images.prismic.io' },
			{ rel: 'preload', href: 'https://cloud.typenetwork.com/projects/4051/fontface.css/', as: 'style' },
			{
				rel: 'stylesheet',
				type: 'text/css',
				media: 'print',
				href: 'https://cloud.typenetwork.com/projects/4051/fontface.css/',
				onload: "media='all'",
			},
		],
	},
	/*
	 ** Customize the progress-bar color
	 */
	loading: { color: '#ea40f7' },
	/*
	 ** Global CSS / SCSS
	 */
	css: ['@/scss/style.scss'],
	/*
	 ** Plugins to load before mounting the App
	 */
	plugins: [
		'@/plugins/type.js',
		'@/plugins/subtitlePrepend.js',
		'@/plugins/aos.client.js',
		'@/plugins/directives.client.js',
		'@/plugins/breakpoint.client.js',
		'@/plugins/metaHead.js',
		'@/plugins/scroll.client.js',
		'@/plugins/prismicLink.client.js',
	],
	/*
	 ** Nuxt.js dev-modules
	 */
	buildModules: [
		// Doc: https://github.com/nuxt-community/stylelint-module
		'@nuxtjs/stylelint-module',
		// Doc: https://github.com/nuxt-community/eslint-module
		'@nuxtjs/eslint-module',
		'@nuxtjs/gtm',
	],
	gtm: {
		id: 'GTM-57QMNHF',
		pageTracking: true,
		pageViewEventName: 'virtualPageView',
	},
	/*
	 ** Nuxt.js modules
	 */
	modules: [
		// Doc: https://axios.nuxtjs.org/usage
		'@nuxtjs/axios',
		'@nuxtjs/style-resources',
		'@/prismic/static',
		'@/prismic/crawler',
		'@nuxtjs/prismic',
	],
	prismic: {
		// https://tfe-new-resolver-test.cdn.prismic.io/api/v2
		// https://thefactore.prismic.io/api/v2
		endpoint: 'https://thefactore.prismic.io/api/v2',
		linkResolver: '@/prismic/link-resolver.js',
		htmlSerializer: '@/prismic/html-serializer',
		apiOptions: {
			routes: [
				{
					type: 'default',
					path: '/:uid',
				},
				{
					type: 'case',
					path: '/cases/:uid',
				},
				{
					type: 'opinie',
					path: '/opinies/:uid',
				},
				{
					type: 'nieuws',
					path: '/actueel/nieuws/:uid',
				},
				{
					type: 'event',
					path: '/actueel/events/:uid',
				},
				{
					type: 'at_work',
					path: '/actueel/at-work/:uid',
				},
				{
					type: 'sector',
					path: '/services/sectoren/:uid',
				},
				{
					type: 'expertise',
					path: '/services/expertises/:uid',
				},
				{
					type: 'expertise_dci',
					path: '/services/expertises/data-en-customer-intelligence/:uid',
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
	render: {
		bundleRenderer: {
			shouldPreload: (file, type) => {
				return ['script', 'style', 'font'].includes(type);
			},
		},
	},
	/*
	 ** Build configuration
	 */
	build: {
		quiet: false,
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
		postcss: {
			preset: {
				autoprefixer: {
					grid: false,
				},
			},
		},
	},
	vue: {
		config: {
			productionTip: false,
		},
	},
	generate: {
		fallback: '404.html',
	},
};
