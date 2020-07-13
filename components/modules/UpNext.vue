<template>
	<section data-aos="slide-up" data-aos-anchor-placement="bottom-bottom" class="upnext">
		<prismic-link v-if="data" class="upnext-content" :field="data">
			<p v-if="data.type">{{ `${text} ${$type(data.type)}` }}</p>
			<h3 v-if="data.data.page_title">{{ $prismic.asText(data.data.page_title) }}</h3>
			<p v-if="data.data.page_subtitle">{{ data.data.page_subtitle }}</p>
		</prismic-link>
		<h3>Up next</h3>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class UpNext extends Vue {
	@Prop() data;
	@Prop() text;
}
</script>

<style lang="scss">
.upnext {
	position: relative;
	background-color: $green;

	> h3 {
		font-family: $font-highlight;
		color: darken($green, 10%);
		display: block;
		position: absolute;
		width: 104vw;
		line-height: 1;
		font-size: 20vw;
		word-break: keep-all;
		bottom: 0;
		left: -3rem;
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 3.1vw;
		background-color: $background-dark;
	}
}

.upnext-content {
	display: block;
	text-decoration: none;
	color: $color;
	padding: $spacing * 2 $spacing 20vw;

	p {
		font-size: $font-l;
		font-family: $font-highlight;
		margin-top: $spacing * 1.5;
	}

	h3 {
		font-size: $font-title * 0.7;
		line-height: 1.1;
		letter-spacing: 0.03em;
		max-width: 90rem;
		margin-top: $spacing;
	}
}

[data-aos='slide-up'] {
	overflow: hidden;

	> h3 {
		transform: translateY(1em);
		opacity: 0;
		transition: 0.8s ease transform, 0.8s opacity;
	}

	&.aos-animate {
		> h3 {
			opacity: 1;
			transform: translateY(0);
		}
	}
}

@media all and (min-width: $m) {
	.upnext-content {
		padding: $spacing * 4 $spacing * 6 20vw;

		h3 {
			font-size: $font-title;
		}
	}
}
</style>
