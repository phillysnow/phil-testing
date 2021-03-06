<template>
	<section class="follow-up">
		<div class="follow-up-content">
			<article
				v-if="data.primary.title && data.primary.title.length && data.primary.title[0].text"
				class="follow-up-article"
			>
				<h2 v-if="name">{{ number ? `${number}.` : '' }} {{ name }}</h2>
				<h3>{{ $prismic.asText(data.primary.title) }}</h3>

				<ul class="follow-up-text-group">
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

				<ul class="follow-up-group">
					<template v-for="(item, index) in data.items">
						<li v-if="item.link && (item.link.url || item.link.id)" :key="index">
							<prismic-link :field="item.link"> {{ item.label }} » </prismic-link>
						</li>
					</template>
				</ul>
			</article>
			<div>
				<FigureImage
					v-if="data.primary.image && data.primary.image.url"
					class="follow-up-image"
					:image="data.primary.image"
				/>
			</div>
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
export default class FollowUp extends Vue {
	@Prop() data;
	@Prop() number;
	@Prop() name;
}
</script>
<style lang="scss">
.follow-up-content {
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	padding-top: 60vh;
	position: relative;
}

.follow-up-article {
	@include stripes();

	position: relative;
	padding: $spacing;
	background-color: $white;

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: -26rem;
		left: 0;
		width: 100%;
		height: 26rem;
		background: linear-gradient(0deg, white 20%, rgba($white, 0) 100%);
	}

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

.follow-up-image {
	height: 70vh;
	width: 100%;
	position: absolute;
	top: 0;
	left: 0;
	z-index: -1;

	&::after {
		content: '';
		display: block;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 25rem;
		height: 25rem;
		background-color: $green;
		border-radius: 50%;
		opacity: 0.2;
		z-index: 1;

		@supports (mix-blend-mode: multiply) {
			opacity: 1;
			mix-blend-mode: multiply;
		}
	}

	&::before {
		content: '';
		display: block;
		position: absolute;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 26rem;
		z-index: 2;
		background: linear-gradient(0deg, rgba(255, 255, 255, 1) 40%, rgba(255, 255, 255, 0) 100%);
	}

	img {
		filter: grayscale(100%);
	}

	.opinion &,
	.expertise & {
		opacity: 0.9;
		z-index: -1;

		&::after {
			display: none;
		}
	}
}

.follow-up {
	margin-top: $spacing * 4;

	&--big-image {
		padding-right: $spacing;

		.follow-up-content {
			max-width: 100%;
		}
	}
}

ul.follow-up-text-group {
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

ul.follow-up-group {
	padding-top: $spacing * 2;

	a {
		display: block;
		background-color: $white;
		padding: $spacing * 1.5 $spacing * 2;
		color: $grey;
		font-weight: bold;
	}

	li {
		border-top: 1px solid $light-grey;

		&:first-child {
			border-top: none;
		}

		&:nth-child(odd) {
			a {
				color: $pink;
			}
		}
	}
}

@media all and (min-width: $m) {
	.follow-up-article {
		padding: 0;
		padding-right: $spacing * 2;
		background: transparent;

		&::before {
			content: none;
		}
	}

	.follow-up {
		@include stripes();
	}

	.follow-up-content {
		display: grid;
		grid-template: 1fr / 40rem auto;
		position: relative;
		justify-content: initial;
		padding: $spacing * 6;

		.opinion &,
		.expertise & {
			padding-right: 0;
			padding-bottom: 0;
		}
	}

	.follow-up-image {
		position: -webkit-sticky; /* Safari */
		position: sticky;
		top: 0;
		height: 100%;
		max-height: 100vh;
		width: 100%;
		z-index: 1;

		&::before {
			content: none;
		}

		&::after {
			width: 45rem;
			height: 45rem;
		}

		.opinion &,
		.expertise & {
			text-align: right;
			max-height: none;

			picture {
				text-align: right;
			}

			img {
				max-width: 1200px;
				margin: 0 0 0 auto;
			}

			&::after {
				display: none;
			}
		}
	}
}
</style>
