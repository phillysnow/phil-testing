<template>
	<div ref="wrapper" class="overview">
		<div ref="listWrapper" class="list-wrapper">
			<h1 v-if="pageTitle && pageTitle.length > 0 && pageTitle[0].text">
				{{ $prismic.asText(pageTitle) }}
			</h1>
			<ul v-if="items" ref="list" :class="length(items)">
				<li v-for="(item, index) in items" :key="index">
					<prismic-link v-if="item" :field="item" itemprop="url">
						<FigureImage v-if="item.data.page_image.url" :image="item.data.page_image" />
						<article>
							<h3 v-if="item.data.page_title">{{ $prismic.asText(item.data.page_title) }}</h3>
							<p v-if="item.data.page_subtitle">{{ `${append || ''}${item.data.page_subtitle}` }}</p>
						</article>
					</prismic-link>
				</li>
			</ul>
		</div>
	</div>
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
export default class Case extends Vue {
	@Prop() items;
	@Prop() pageTitle;
	@Prop() append;

	animation = new Kinet({
		acceleration: 0.04,
		friction: 0.4,
		names: ['x', 'y'],
	});

	length(items) {
		const number = items.length;

		if (number <= 5) return 's';
		if (number <= 10) return 'm';
		if (number <= 15) return 'l';
		if (number <= 20) return 'xl';
		if (number <= 25) return 'xxl';
	}

	mouseMove = (e) => this.listAnimate(e);
	breakpointChange = () => this.breakpointChangeHandle();

	mounted() {
		document.addEventListener('breakpointChange', this.breakpointChange, { passive: true });
		this.breakpointChangeHandle();
	}

	beforeDestroy() {
		this.animation.off();

		document.removeEventListener('breakpointChange', this.breakpointChange, { passive: true });
		if (window.breakPoint !== 's' && window.breakPoint !== 'm') {
			window.removeEventListener('mousemove', this.mouseMove, { passive: true });
		}
	}

	listAnimate(event) {
		const multiplier = 2;
		const x = -(event.clientX - window.innerWidth / 2) * multiplier;
		const y = -(event.clientY - window.innerHeight / 2) * multiplier * 1.1;

		this.animation.animate('x', x);
		this.animation.animate('y', y);
	}

	breakpointChangeHandle() {
		if (window.breakPoint !== 's' && window.breakPoint !== 'm') {
			window.addEventListener('mousemove', this.mouseMove, { passive: true });

			if (this.$refs.list) {
				this.animation.on('tick', (i) => {
					this.$refs.listWrapper.style.transform = `translate3d(${i.x.current}px, ${i.y.current}px, 0)`;
				});
			}
		} else {
			window.removeEventListener('mousemove', this.mouseMove, { passive: true });
			window.setTimeout(() => {
				this.$refs.listWrapper.style.transform = '';
			}, 1);
		}
	}
}
</script>
<style lang="scss" scoped>
h1 {
	margin-bottom: 2rem;
}

.overview {
	padding: $spacing * 5 $spacing $spacing;
}

ul {
	list-style: none;
	padding: 0;
	margin: 0 0 $spacing * 7;
}

li {
	width: 100%;
	height: 42rem;
	position: relative;
	z-index: 0;
	box-shadow: 0 5rem 8rem -2rem rgba($black, 0.1);
	transition: 0.5s;
	will-change: transform;

	a {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;
		z-index: 0;
		padding: 4.8rem;
		width: 100%;
		height: 100%;
		text-decoration: none;
		background-color: #fff;
		color: #000;
		box-shadow: 0 5rem 8rem -2rem rgba(0, 0, 0, 0.1);
		overflow: hidden;
		transition: 0.5s background-color, 0.8s box-shadow;
	}

	h3 {
		color: $color-head;
		line-height: 1.4;
	}

	p {
		color: $color-head;
		margin: $spacing 0;
		text-transform: capitalize;
		font-family: $font-highlight;
		letter-spacing: 0.05em;
	}

	figure {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		z-index: -1;
		opacity: 0.5;
	}

	article {
		opacity: 1;
		transition: 0.3s opacity;
	}

	&:hover {
		a {
			background-color: $green;
			box-shadow: 0 8rem 4rem -2rem rgba($black, 0.25);
		}

		article {
			opacity: 1;
		}
	}
}

@media all and (min-width: $m) {
	ul {
		display: grid;
		grid-template: repeat(8, 1fr) / repeat(2, 41rem);
		gap: $spacing * 1.5;
	}

	li {
		margin: 0;
		max-width: none;
	}
}

@media all and (min-width: $l) {
	ul {
		margin-bottom: 0;

		&.s {
			grid-template: repeat(8, 1fr) / repeat(2, 42rem);
		}

		&.m {
			grid-template: repeat(8, 1fr) / repeat(4, 42rem);
		}

		&.l {
			grid-template: repeat(8, 1fr) / repeat(5, 42rem);
		}

		&.xl {
			grid-template: repeat(8, 1fr) / repeat(6, 42rem);
		}

		&.xxl {
			grid-template: repeat(8, 1fr) / repeat(7, 42rem);
		}
	}

	.overview {
		padding: 0;
		width: 100%;
		height: 100%;
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}
</style>
