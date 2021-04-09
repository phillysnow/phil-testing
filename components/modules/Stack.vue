<template>
	<section class="stack" :class="[darkify(data.primary), { 'stack--dark': stackLight }]">
		<article v-if="data.primary">
			<h2 v-if="data.primary.subtitle">{{ data.primary.subtitle }}</h2>
			<h3 v-if="data.primary.title">{{ $prismic.asText(data.primary.title) }}</h3>
			<prismic-rich-text v-if="data.primary.text" :field="data.primary.text" />
		</article>
		<ul v-if="data.items" ref="stackGroup" class="stack-group">
			<li v-for="(item, index) in data.items" :key="index" ref="stackGroupItems" class="stack-item">
				<component
					:is="item.link && item.label ? 'prismic-link' : 'div'"
					:field="item.link && item.link.uid ? item.link : false"
				>
					<article>
						<p v-if="item.type">{{ `${item.type}/` }}</p>
						<h4 v-if="item.title">{{ $prismic.asText(item.title) }}</h4>
						<prismic-rich-text v-if="item.text" :field="item.text" />
						<span v-if="item.link && item.label" class="link-label">{{ item.label }} »</span>
					</article>
				</component>
			</li>
		</ul>
		<div v-if="data.primary.video && data.primary.video.url">
			<div class="stack-video">
				<video
					ref="video"
					class="stack-image"
					:src="data.primary.video.url"
					autoplay="true"
					muted="muted"
					loop="true"
				></video>
			</div>
		</div>
		<div v-else-if="data.primary && data.primary.image && data.primary.image.url">
			<FigureImage ref="imageFigure" class="stack-image" :image="data.primary.image" />
		</div>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import Kinet from 'kinet';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Stack extends Vue {
	@Prop() data;
	stackActive = false;
	index = 0;
	imageEl = undefined;

	stackLight = false;
	intersectionVideoY = 0;
	observerVideo = undefined;

	Animationfriction = new Kinet({
		acceleration: 0.04,
		friction: 0.3,
		names: ['x'],
	});

	scroll = () => this.scrollAnimate();

	darkify(primary) {
		if (primary) {
			return primary.image.url || (primary.video && primary.video.url) ? 'dark' : '';
		}
	}

	mounted() {
		const imageFigure = this.$refs.imageFigure ? this.$refs.imageFigure.$el : null;

		if (imageFigure) {
			window.addEventListener('scroll', this.scroll, { passive: true });

			this.imageEl = imageFigure.querySelector('img');
			this.Animationfriction.on('tick', (i) => {
				this.imageEl.style.transform = `translate3d(${i.x.current}px, 0, 0) `;
			});
		}

		if (this.data.primary.video && this.data.primary.video.url && this.$refs.stackGroup) {
			const observer = new IntersectionObserver(this.handleIntersectionStackItems, { threshold: 0.5 });
			observer.observe(this.$refs.stackGroup);
			this.observerVideo = observer;
		}
	}

	beforeDestroy() {
		this.Animationfriction.off();
		window.removeEventListener('scroll', this.scroll, { passive: true });

		if (this.data.primary.video && this.data.primary.video.url && this.$refs.stackGroup) {
			this.observerVideo.disconnect();
		}
	}

	scrollAnimate() {
		const offsetStack = this.$el.getBoundingClientRect().top + window.scrollY;
		if (window.scrollY < offsetStack) return;

		this.index = -window.scrollY + offsetStack;

		return this.Animationfriction.animate('x', this.index);
	}

	handleIntersectionStackItems(entries, observer) {
		const currentY = entries[0].boundingClientRect.y;
		const scrollDown = currentY < this.intersectionVideoY;

		if (entries[0].isIntersecting) {
			this.stackLight = true;
		} else {
			this.stackLight = scrollDown;
		}

		this.intersectionVideoY = entries[0].boundingClientRect.y;
	}
}
</script>

<style lang="scss">
figure.stack-image {
	position: sticky;
	top: 0;
	width: 100%;
	height: 100vh;

	img {
		width: 6000px;
		max-width: unset;
		object-position: 0 center;
		will-change: transform;
	}
}

.stack-video {
	position: sticky;
	top: 0;
	width: 100%;
	height: 100vh;

	&::before {
		content: '';
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background-color: $background-dark;
		opacity: 0.8;
		transition: opacity 1s ease-in-out;
	}

	video {
		z-index: -1;
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
}

.stack-item {
	transform-origin: center top;
	padding: $spacing * 2 0;

	article {
		padding: $spacing $spacing;
		padding-bottom: $spacing * 2.5;
		box-shadow: 0 4rem 4rem -2rem rgba($black, 0.25);
		background-color: $white;

		> p {
			font-size: $font;
			font-family: $font-highlight;
			margin-top: $spacing * 1.5;
		}

		p {
			color: $color;
		}

		h4 {
			font-size: $font-xl;
			line-height: 1.1;
			margin: $spacing 0;
		}

		.link-label {
			font-size: $font;
			color: $pink;
			font-family: $font-highlight;
			display: inline-block;
			margin-top: $spacing;
		}
	}
}

.stack {
	position: relative;

	@include section-padding();
	@include stripes();

	> div {
		height: 100%;
		width: 100%;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}

	> article {
		margin: 0 auto;
		max-width: 80rem;

		h2 {
			color: $pink;
			font-size: $font;
			font-family: $font-highlight;
		}

		h3 {
			font-size: $font-xxl;
			margin-top: 0;
		}
	}

	&--dark {
		.stack-video {
			&::before {
				opacity: 0.9;
			}
		}
	}

	&.dark {
		color: $white;
		background-image: unset;

		p {
			color: $white;
		}

		h3,
		h4 {
			color: $white;
		}

		> article {
			display: flex;
			flex-direction: column;
			justify-content: center;
			color: $white;
			padding-top: $spacing * 3;
			padding-bottom: $spacing;
		}

		figure.stack-image {
			background-color: #3a3c3d;
		}

		.stack-item {
			article {
				background-color: $background-dark;
			}

			.link-label {
				color: $green;
			}
		}
	}
}

@media all and (min-width: $m) {
	.stack {
		@include section-padding('m');

		> article {
			padding-bottom: $spacing * 4;
		}
	}

	.stack-item {
		article {
			padding: $spacing * 2 $spacing * 4;
			padding-bottom: $spacing * 3.5;
		}
	}
}

@media all and (min-width: $l) {
	.stack {
		@include section-padding('l');

		> article {
			padding-bottom: $spacing * 4;
		}
	}
}

@media all and (min-width: $desktop) {
	.stack-item {
		article {
			padding: $spacing * 3 8% $spacing * 4.5;
		}
	}
}
</style>
