<template>
	<transition name="appear" appear>
		<div class="slider" :class="{ active: hover }">
			<ul ref="group" class="slider-group">
				<li
					ref="items"
					v-for="(slide, index) in slides"
					:key="index"
					class="slider-item"
					:data-id="index"
				>
					<transition :name="transitionName(index)">
						<prismic-link v-if="inViewById[index]" :field="slide" itemprop="url" :key="index">
							<p>{{ type(slide.type) }}</p>
							<h2>{{ $prismic.asText(slide.data.title) }}</h2>
							<p>{{ $prismic.asText(slide.data.subtitle) }}</p>
							<!-- <FigureImage
								v-if="slide.data.page_image"
								classes="slider-image"
								:image="slide.data.page_image"
							/>-->
						</prismic-link>
					</transition>
				</li>
			</ul>
		</div>
	</transition>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';
import Kinet from 'kinet';

@Component({
	components: {
		FigureImage,
	},
})
export default class Slider extends Vue {
	@Prop() data;
	@Prop({ default: false }) local;
	@Prop({ default: 0 }) start;

	slides = [];
	inViewById = {};
	hover = false;
	track = undefined;
	observer = undefined;
	index = 0;
	sliderAnimation = new Kinet({
		acceleration: 0.04,
		friction: 0.3,
		names: ['x'],
	});
	slideGroup = null;
	margin = 0;
	maxWidth = 0;
	scroll = (e) => this.slideListAnimate(e);

	beforeMount() {
		for (let index = 0; index < this.data.length; index++) {
			const element = this.data[index];
			this.slides[index] = element.highlight;
		}
	}

	mounted() {
		this.track = this.local ? this.$el : window;
		this.slideGroup = this.$refs.group;
		this.margin = window.screen.availWidth * 0.4;
		this.maxWidth = -this.slideGroup.scrollWidth + this.margin * 1.5;

		let observer = new IntersectionObserver(this.handleIntersection);

		for (let el of this.$refs.items) {
			observer.observe(el);
		}
		this.observer = observer;

		this.slideList();
	}

	beforeDestroy() {
		this.observer.disconnect();
		this.track.removeEventListener('wheel', this.scroll, { passive: false });
	}

	cloneInViewById() {
		let inViewById = {};
		for (let [id, inView] of Object.entries(this.inViewById)) {
			if (inView) {
				inViewById[id] = true;
			}
		}
		return inViewById;
	}

	handleIntersection(entries, observer) {
		let inViewById = this.cloneInViewById();

		for (let entry of entries) {
			let id = entry.target.dataset.id;

			if (entry.isIntersecting) {
				inViewById[id] = entry.isIntersecting;
			} else if (inViewById[id]) {
				// Leaving view.
				inViewById[id] = false;
			}
		}

		this.inViewById = inViewById;
	}

	type(value) {
		const type = value.split('_');
		
		return type[0] ? `${type[0]}/` : 'Oeps I broke it';
	}

	transitionName(i) {
		const inViewById = this.cloneInViewById();
		const IDArray = Object.keys(inViewById);
		const index = IDArray.length - 1;

		if (i < IDArray[index]) {
			return 'before';
		} else {
			return 'after';
		}
	}

	slideList() {
		this.sliderAnimation.on('tick', (i) => {
			this.slideGroup.style.transform = `translateX(${i.x.current}px)`;
			this.hover = true;

			if (i.x.current === i.x.target) this.hover = false;
		});

		this.track.addEventListener('wheel', this.scroll, { passive: false });
	}

	slideListAnimate(e) {
		e.preventDefault();
		e = window.event || e;

		this.index -= e.deltaY;

		if (this.index >= this.margin && e.deltaY < 0) this.index = this.margin;
		if (!(this.maxWidth <= this.index) && e.deltaY > 0) this.index = this.maxWidth;

		return this.sliderAnimation.animate('x', this.index);
	}
}
</script>

<style scoped lang="scss">
.slider-group {
	display: grid;
	grid-gap: $spacing * 2;
	grid-template-rows: 1fr;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	width: 100%;
	height: 55rem;
	margin: 20rem auto;
	will-change: transform;
}

.slider-item {
	width: 50rem;
	height: 100%;
	user-select: none;
	padding: $spacing;
	transition: 0.5s transform;
	will-change: transform;

	a {
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		z-index: 0;
		width: 100%;
		height: 100%;
		text-decoration: none;
		background-color: $green;
		border-radius: 0.3rem;
		box-shadow: 0 5rem 8rem -2rem rgba($black, 0.1);
		overflow: hidden;
	}

	h2 {
		color: $white;
		font-size: $font-title;
		line-height: 1.2;
		text-align: center;
	}
}

.slider-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
}

.slider {
	transition: 0.5s opacity;
	overflow: hidden;

	&:not(.active) {
		.slider-item {
			&:hover {
				transform: scale(1.1);
			}
		}
	}
}

// slide-item animation
.before-enter-active {
	animation: slide-in-from-left 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.after-enter-active {
	animation: slide-in-from-right 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

@keyframes slide-in-from-left {
	0% {
		transform-origin: bottom;
		transform: translate(-20rem, 3rem) rotateZ(-8deg);
	}

	100% {
		transform: translate(0);
	}
}

@keyframes slide-in-from-right {
	0% {
		transform-origin: top;
		transform: translate(20rem, -3rem) rotateZ(8deg);
	}

	100% {
		transform: translate(0);
	}
}

// page appear animation
.appear-enter-active {
	.before-enter-active,
	.after-enter-active {
		animation: none;
	}
}
</style>
