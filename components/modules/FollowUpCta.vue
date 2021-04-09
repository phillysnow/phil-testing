<template>
	<section class="follow-up-cta">
		<div class="follow-up-cta-content">
			<article
				v-if="data.primary.title && data.primary.title.length && data.primary.title[0].text"
				class="follow-up-cta-article"
			>
				<h2 v-if="name">{{ number ? `${number}.` : '' }} {{ name }}</h2>
				<h3>{{ $prismic.asText(data.primary.title) }}</h3>

				<ul class="follow-up-cta-text-group">
					<template v-for="(item, index) in data.items">
						<li v-if="item.text && item.text.length" :key="index">
							<h4 v-if="item.headline && item.headline.length && item.headline[0].text">
								<span v-if="number">{{ `${number}.${index + 1} ` }}</span
								>{{ $prismic.asText(item.headline) }}
							</h4>
							<prismic-rich-text v-if="item.text" class="rich-text" :field="item.text" />
						</li>
					</template>
				</ul>

				<ul class="follow-up-cta-group">
					<template v-for="(item, index) in data.items">
						<li v-if="item.link && (item.link.url || item.link.id)" :key="index">
							<prismic-link
								:field="item.link"
								:class="{ light: item.contact || item.phone, dark: !item.contact && !item.phone }"
							>
								{{ item.label }}
								<span v-if="item.contact">✎</span>
								<span v-if="item.phone">☏</span>
								<span v-if="!item.contact && !item.phone">➚</span>
							</prismic-link>
						</li>
					</template>
				</ul>
			</article>
			<FigureImage
				v-if="data.primary.image && data.primary.image.url"
				class="follow-up-cta-image"
				:image="data.primary.image"
			/>
		</div>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class FollowUpCta extends Vue {
	@Prop() data;
	@Prop() number;
	@Prop() name;
}
</script>
<style lang="scss">
.follow-up-cta-content {
	position: relative;
	padding: $spacing * 2 0;
}

.follow-up-cta-article {
	padding: $spacing;

	h2 {
		color: $pink;
		font-family: $font-highlight;
		font-size: $font;
	}

	h3 {
		font-size: $font-xxl;
		margin-top: 0;
	}
}

.follow-up-cta-image {
	height: 80rem;
	width: 100%;
	position: absolute;
	bottom: 0;
	right: 0;
	z-index: -1;

	img {
		filter: grayscale(100%);
		transform: scale(1.5) translate(0%, 14rem);
	}
}

.follow-up-cta {
	@include stripes();

	margin-top: $spacing * 3;
}

ul.follow-up-cta-text-group {
	li {
		padding-top: $spacing * 2;
	}

	h4 {
		font-family: $font-highlight;
		font-size: $font;

		> span {
			font-family: $font-highlight;
			color: $pink;
		}
	}

	.rich-text {
		padding-top: $spacing * 0.5;
	}
}

ul.follow-up-cta-group {
	padding-top: $spacing * 26;

	a {
		display: block;
		padding: $spacing $spacing * 3.5 $spacing $spacing * 2;
		font-size: $font * 0.9;
		font-weight: bold;
		position: relative;
		transition: all 0.3s;

		> span {
			position: absolute;
			display: inline-block;
			right: $spacing * 2;
			color: $pink;
			font-size: 2em;
			line-height: 1em;
			padding-left: 0.5em;
			transition: color 0.3s;
		}

		&.light {
			background-color: $white;
			color: $color;
			box-shadow: 0 2rem 4rem -2rem rgba($black, 0.2);
		}

		&.dark {
			background-color: $color;
			color: $white;

			> span {
				transform: translateY(0.16em);
			}
		}

		&:hover {
			background-color: $green;
			color: $color;

			> span {
				color: $color;
			}
		}
	}

	li {
		width: 100%;
		padding-top: $spacing;

		&:first-child {
			padding-top: 0;
		}
	}
}

@media all and (min-width: $m) {
	.follow-up-cta-article {
		padding-top: $spacing * 4;
		padding-right: $spacing * 2;
	}

	.follow-up-cta {
		@include stripes();

		margin-top: $spacing * 4;
	}

	ul.follow-up-cta-group {
		padding-top: $spacing * 2;
	}

	.follow-up-cta-image {
		height: 80vh;
		width: 60%;

		img {
			transform: none;
			object-fit: contain;
			object-position: 0 100%;
		}
	}

	.follow-up-cta-content {
		display: grid;
		grid-template: 1fr / 40rem auto;
		height: 70vh;
		position: relative;
		justify-content: initial;
		padding-left: $spacing * 6;
	}
}
</style>
