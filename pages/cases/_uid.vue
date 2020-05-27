<template>
	<main class="case-post">
		<Hero :data="hero" />
		<Intro :data="intro" />
		<Emphatize :data="emphatize" />
		<LiveQuote :data="livequote" />
		<Harmonize :data="harmonize" />
		<Nurture :data="nurture" />
		<UpNext :data="upnext" />
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

			return {
				hero: {
					type: doc.type,
					title: doc.data.title,
					subtitle: doc.data.subtitle,
					page_image: doc.data.page_image,
					description: doc.data.description,
				},
				intro: {
					intro_image: doc.data.intro_image,
				},
				emphatize: {
					emphatize_title: doc.data.emphatize_title,
					emphatize_list: doc.data.emphatize_list,
				},
				livequote: {
					livequote_title: doc.data.livequote_title,
					livequote_video: doc.data.livequote_video,
				},
				harmonize: {
					harmonize_title: doc.data.harmonize_title,
					harmonize_list: doc.data.harmonize_list,
				},
				nurture: {
					nurture_title: doc.data.nurture_title,
					nurture_image: doc.data.nurture_image,
					nurture_headline: doc.data.nurture_headline,
					nurture_text: doc.data.nurture_text,
					nurture_list: doc.data.nurture_list,
				},
				upnext: {
					...doc.data.upnext,
					title: doc.data.upnext.data.title,
					subtitle: doc.data.upnext.data.subtitle,
				},
			};
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
