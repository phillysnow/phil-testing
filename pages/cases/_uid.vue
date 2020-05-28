<template>
	<main class="case-post">
		<Hero v-if="hero.title.length > 0" :data="hero" />
		<Intro v-if="intro.image" :data="intro" />
		<Emphatize v-if="emphatize.title.length > 0" :data="emphatize" />
		<LiveQuote v-if="livequote.title.length > 0" :data="livequote" />
		<Harmonize v-if="harmonize.title.length > 0" :data="harmonize" />
		<Nurture v-if="nurture.title.length > 0" :data="nurture" />
		<UpNext v-if="upnext.type" :data="upnext" />
	</main>
</template>

<script>
import { Component, Vue } from 'nuxt-property-decorator';
import { Hero, Intro, Emphatize, Harmonize, LiveQuote, Nurture, UpNext } from '@/components/modules';

@Component({
	components: {
		Hero,
		Intro,
		Emphatize,
		Harmonize,
		LiveQuote,
		Nurture,
		UpNext,
	},
})
export default class CasePost extends Vue {
	async asyncData({ $prismic, params, error }) {
		try {
			const doc = await $prismic.api.getByUID('case_post', params.uid, {
				fetchLinks: ['case_post.title', 'case_post.subtitle'],
			});

			const data = {
				hero: {
					//title required
					type: doc.type,
					title: doc.data.title,
					subtitle: doc.data.subtitle,
					image: doc.data.page_image,
					description: doc.data.description,
				},
				intro: {
					//title image
					image: doc.data.intro_image,
				},
				emphatize: {
					//title required
					title: doc.data.emphatize_title,
					list: doc.data.emphatize_list,
				},
				livequote: {
					//title required
					title: doc.data.livequote_title,
					video: doc.data.livequote_video,
				},
				harmonize: {
					//title required
					title: doc.data.harmonize_title,
					list: doc.data.harmonize_list,
				},
				nurture: {
					//title required
					title: doc.data.nurture_title,
					image: doc.data.nurture_image,
					headline: doc.data.nurture_headline,
					text: doc.data.nurture_text,
					list: doc.data.nurture_list,
				},
				upnext: {
					//type required
					...doc.data.upnext,
				},
			};

			console.log(data);

			return data;
		} catch (e) {
			error({ statusCode: 404, message: 'Page not found' });
		}
	}
}
</script>
<style lang="scss" scoped>
.case-post {
	height: 100%;
}
</style>
