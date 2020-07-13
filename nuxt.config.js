require('dotenv').config();

export default {
	mode: 'universal',
	/*
	 ** Headers of the page
	 */
	head: {
		title: 'Human First Digital Agency | theFactor.e',
		htmlAttrs: {
			lang: 'nl',
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{
				name: 'description',
				content:
					'Wij maken menselijke technologie voor digitale mensen. Door te weten wat technisch mogelijk is én wat mensen bezighoudt. Samenwerken?',
			},
			{
				name: 'og:description',
				content:
					'Wij maken menselijke technologie voor digitale mensen. Door te weten wat technisch mogelijk is én wat mensen bezighoudt. Samenwerken?',
			},
			{ name: 'language', content: 'nl' },
			{ property: 'og:site_name', content: 'theFactor.e' },
		],
		link: [
			{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
			{ rel: 'dns-prefetch', href: 'https://cloud.typenetwork.com' },
			{ rel: 'dns-prefetch', href: 'https://thefactore.prismic.io' },
			{ rel: 'dns-prefetch', href: 'https://images.prismic.io' },
			{
				rel: 'stylesheet',
				type: 'text/css',
				href: 'https://cloud.typenetwork.com/projects/4051/fontface.css/',
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
		'@/plugins/aos.client.js',
		'@/plugins/directives.client.js',
		'@/plugins/breakpoint.client.js',
		'@/plugins/metaHead.js',
		'@/plugins/scroll.client.js',
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
		[
			'@nuxtjs/device',
			{
				defaultUserAgent:
					'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36',
			},
		],
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
					type: 'sector',
					path: '/services/sectoren/:uid',
				},
				{
					type: 'expertise',
					path: '/services/expertise/:uid',
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
					grid: true,
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
