<template>
	<section
		data-aos="slide-up"
		data-aos-anchor-placement="center-center"
		class="upnext"
		:class="{ 'upnext--big': !data.id, safari }"
		@click="gtmPush()"
	>
		<template v-if="sliderItems && sliderItems.length && sliderItems[0].highlight && sliderItems[0].highlight.id">
			<Slider :data="sliderItems" local="true" class="slider--upnext" />
			<p class="next">Up next</p>
		</template>
		<prismic-link v-else-if="data.id" class="upnext-content" :field="data">
			<p v-if="data.type">{{ `${text} ${$type(data.type)}` }}</p>
			<h3 v-if="data.data.page_title">{{ $prismic.asText(data.data.page_title) }}</h3>
			<p v-if="data.data.page_subtitle">{{ data.data.page_subtitle }}</p>
			<p class="next">Up next</p>
		</prismic-link>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { Slider } from '@/components/modules';

@Component({
	components: {
		Slider,
	},
})
export default class UpNext extends Vue {
	@Prop() data;
	@Prop() text;
	@Prop() sliderItems;
	safari = false;

	gtmPush() {
		this.$gtm.push({
			event: 'tfe-event',
			'tfe-data': {
				category: 'Interaction',
				action: this.sliderItems && this.sliderItems.length ? 'Up Next Slider' : 'Up Next',
				label: this.data.id ? this.$prismic.linkResolver(this.data) : undefined,
			},
		});
	}

	mounted() {
		const isSafariBrowser = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

		if (isSafariBrowser) this.safari = true;
	}
}
</script>

<style lang="scss">
.upnext-content {
	display: block;
	color: $color;
	padding: $spacing * 2 $spacing 20vw;

	p {
		font-size: $font-l;
		font-family: $font-highlight;
		margin-top: $spacing * 1.5;
	}

	h3 {
		@include break-long-word;

		font-size: $font-title * 0.5;
		line-height: 1.1;
		letter-spacing: 0.03em;
		max-width: 90rem;
		margin-top: $spacing;
	}
}

.upnext {
	position: relative;
	background-color: $green;

	.next {
		font-family: $font-highlight;
		color: darken($green, 10%);
		display: block;
		position: absolute;
		width: 104vw;
		line-height: 1;
		font-size: 20.9vw;
		word-break: keep-all;
		bottom: 0;
		left: -1rem;

		&::before {
			content: '';
			display: block;
			position: absolute;
			bottom: -1vw;
			left: 0;
			z-index: -1;
			width: 100%;
			height: 4.1vw;
			background-color: $background-dark;
		}
	}

	&.safari {
		.next {
			font-size: 20.6vw;
		}
	}
}

.upnext[data-aos='slide-up'] {
	overflow: hidden;

	.next {
		transform: translate3d(0, 1em, 0);
		opacity: 0;
		transition: 0.6s ease transform, 0.4s opacity;
	}

	&.aos-animate {
		.next {
			opacity: 1;
			transform: translate3d(0, 2px, 0);
		}
	}
}

@media all and (min-width: $s) {
	.upnext-content {
		padding: $spacing * 2 $spacing * 2 20vw;
	}
}

@media all and (min-width: $m + 1) {
	.upnext-content {
		padding: $spacing * 4 $spacing * 6 20vw;

		h3 {
			font-size: $font-title;
		}

		.next {
			left: -3rem;
		}
	}
}

@media all and (min-width: $l) {
	.upnext {
		.next {
			bottom: 6vw;

			&::before {
				bottom: -7vw;
				height: 10.1vw;
			}
		}

		&.safari {
			.next {
				z-index: 4;
			}
		}
	}

	.upnext-content {
		padding: $spacing * 4 $spacing * 6 26vw;
	}
}
</style>
