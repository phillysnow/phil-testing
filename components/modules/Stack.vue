<template>
	<section class="stack" :class="darkify(data.primary)">
		<article v-if="data.primary">
			<h2 v-if="data.primary.subtitle">{{ data.primary.subtitle }}</h2>
			<h3 v-if="data.primary.title">{{ $prismic.asText(data.primary.title) }}</h3>
			<prismic-rich-text v-if="data.primary.text" :field="data.primary.text" />
		</article>
		<ul v-if="data.items" ref="stackGroup" class="stack-group">
			<li v-for="(item, index) in data.items" :key="index" class="stack-item">
				<article>
					<p v-if="item.type">{{ `${item.type}/` }}</p>
					<h4 v-if="item.title">{{ $prismic.asText(item.title) }}</h4>
					<prismic-rich-text v-if="item.text" :field="item.text" />
					<prismic-link v-if="item.link" :field="item.link"> {{ item.label }} » </prismic-link>
				</article>
			</li>
		</ul>
		<div v-if="data.primary">
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
	observer = undefined;
	stackActive = false;
	index = 0;
	imageEl = undefined;
	options = {
		threshold: 0.5,
	};

	Animationfriction = new Kinet({
		acceleration: 0.04,
		friction: 0.3,
		names: ['x'],
	});

	scroll = (e) => this.scrollAnimate(e);

	darkify(primary) {
		if (primary) {
			return primary.image.url ? 'dark' : '';
		}
	}

	mounted() {
		const imageFigure = this.$refs.imageFigure ? this.$refs.imageFigure.$el : null;

		if (imageFigure) {
			this.imageEl = imageFigure.querySelector('img');

			const observer = new IntersectionObserver(this.handleIntersection, this.options);

			observer.observe(this.$el);
			this.observer = observer;

			this.Animationfriction.on('tick', (i) => {
				this.imageEl.style.transform = `translateX(${i.x.current}px)`;
			});
		}
	}

	beforeDestroy() {
		if (this.stackActive) {
			this.Animationfriction.off();
			this.observer.disconnect();
			window.removeEventListener('wheel', this.scroll, { passive: true });
		}
	}

	scrollAnimate(e) {
		e = window.event || e;
		this.index -= e.deltaY;

		// TODO: needs propper offset
		const offset = window.innerWidth < this.imageEl.naturalWidth ? this.imageEl.naturalWidth : window.innerWidth;

		if (this.index >= 0) this.index = 0;
		if (this.index <= -offset) this.index = -offset;
		return this.Animationfriction.animate('x', this.index);
	}

	handleIntersection(entries, observer) {
		for (const entry of entries) {
			if (entry.isIntersecting) {
				if (!this.stackActive) window.addEventListener('wheel', this.scroll, { passive: true });
				this.stackActive = true;
			}
		}
	}
}
</script>

<style lang="scss">
.stack-image {
	position: sticky;
	top: 0;
	width: 100%;
	height: 100vh;

	img {
		width: 3000px;
		max-width: unset;
		object-fit: 0 center;
		will-change: object-position;
	}
}

.stack-item {
	transform-origin: center top;
	padding: $spacing * 2 0;

	article {
		padding: $spacing * 2;
		box-shadow: 0 4rem 4rem -2rem rgba($black, 0.25);
		background-color: $white;

		> p {
			font-size: $font;
			font-family: $font-highlight;
			margin-top: $spacing * 1.5;
		}

		h4 {
			font-size: $font-xl;
			line-height: 1.1;
			margin: $spacing 0;
		}

		a {
			font-size: $font;
			color: $pink;
			font-family: $font-highlight;
			display: inline-block;
			margin-top: $spacing;
			text-decoration: none;
		}
	}
}

.stack {
	position: relative;
	padding: $spacing * 2 $spacing $spacing;

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

	&.dark {
		color: $white;
		background-image: unset;

		h3,
		h4 {
			color: $white;
		}

		.stack-item {
			article {
				background-color: $background-dark;
			}

			a {
				color: $green;
			}
		}
	}
}

@media all and (min-width: $m) {
	.stack {
		padding: $spacing * 6 $spacing * 6 $spacing;

		> article {
			padding-bottom: $spacing * 4;
		}
	}
}
</style>
