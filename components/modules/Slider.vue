<template>
	<section class="slider" :class="{ active: hover }">
		<ul ref="group" class="slider-group">
			<li
				v-for="(slide, index) in slides"
				ref="items"
				:key="index"
				class="slider-item"
				:class="{ dark: darken(slide.type) }"
				:data-id="index"
			>
				<transition :name="transitionName(index)">
					<prismic-link v-if="inViewById[index] && slide.data" :key="index" :field="slide" itemprop="url">
						<article>
							<p v-if="slide.type">{{ $type(slide.type) }}</p>
							<h3 v-if="slide.data.page_title">{{ $prismic.asText(slide.data.page_title) }}</h3>
							<p v-if="slide.data.page_subtitle">
								{{ `${slide.type === 'opinie' ? '_' : ''}${slide.data.page_subtitle}` }}
							</p>
						</article>
						<FigureImage v-if="slide.data.page_image" class="slider-image" :image="slide.data.page_image" />
					</prismic-link>
				</transition>
			</li>
		</ul>
	</section>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import Kinet from 'kinet';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Slider extends Vue {
	@Prop() data;
	@Prop() hint;
	@Prop({ default: false }) local;
	@Prop({ default: 0 }) start;

	slides = [];
	inViewById = {};
	hover = false;
	track = undefined;
	observer = undefined;
	mounted = true;
	index = 0;
	slideGroup = null;
	margin = 0;
	maxWidth = 0;
	touchstartX = 0;
	touchendX = 0;
	sliderAnimation = new Kinet({
		acceleration: 0.04,
		friction: 0.3,
		names: ['x'],
	});

	scroll = (e) => this.slideListAnimate(e);
	touchStart = (e) => this.swipeStart(e);
	touchEnd = (e) => this.swipeEnd(e);

	// lifecycles
	beforeMount() {
		if (this.data) {
			for (let index = 0; index < this.data.length; index++) {
				const element = this.data[index];
				this.slides[index] = element.highlight;
			}
		}
	}

	mounted() {
		if (this.data) {
			this.track = this.local ? this.$el : window;
			this.slideGroup = this.$refs.group;
			this.margin = window.screen.availWidth * 0.4;
			this.maxWidth = -this.slideGroup.scrollWidth + this.margin * 1.5;

			const observer = new IntersectionObserver(this.handleIntersection);

			for (const el of this.$refs.items) {
				observer.observe(el);
			}
			this.observer = observer;

			this.slideList();

			setTimeout(() => {
				this.mounted = false;
			}, 300);
		}
	}

	beforeDestroy() {
		this.sliderAnimation.off();
		this.observer.disconnect();
		this.track.removeEventListener('wheel', this.scroll, { passive: false });
		this.track.addEventListener('touchstart', this.touchStart, { passive: false });
		this.track.addEventListener('touchend', this.touchEnd, { passive: false });
	}

	cloneInViewById() {
		const inViewById = {};
		for (const [id, inView] of Object.entries(this.inViewById)) {
			if (inView) {
				inViewById[id] = true;
			}
		}
		return inViewById;
	}

	handleIntersection(entries, observer) {
		const inViewById = this.cloneInViewById();

		for (const entry of entries) {
			const id = entry.target.dataset.id;

			if (entry.isIntersecting) {
				inViewById[id] = entry.isIntersecting;
			} else if (inViewById[id]) {
				// Leaving view.
				inViewById[id] = false;
			}
		}

		this.inViewById = inViewById;
	}

	transitionName(i) {
		const inViewById = this.cloneInViewById();
		const IDArray = Object.keys(inViewById);
		const index = IDArray.length - 1;

		if (this.mounted) return 'intro';

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

		this.track.addEventListener('touchstart', this.touchStart, { passive: false });
		this.track.addEventListener('touchend', this.touchEnd, { passive: false });
	}

	swipeStart(e) {
		this.touchstartX = e.changedTouches[0].screenX;
	}

	swipeEnd(e) {
		this.touchendX = e.changedTouches[0].screenX;
		this.swipeListAnimate();
	}

	slideListAnimate(e) {
		e.preventDefault();
		e = window.event || e;

		this.index -= e.deltaY;

		if (this.index >= this.margin && e.deltaY < 0) this.index = this.margin;
		if (!(this.maxWidth <= this.index) && e.deltaY > 0) this.index = this.maxWidth;

		return this.sliderAnimation.animate('x', this.index);
	}

	swipeListAnimate() {
		this.index -= (this.touchstartX - this.touchendX) * 2;

		if (this.index >= this.margin && this.index > 0) this.index = this.margin;
		if (!(this.maxWidth <= this.index) && this.index < 0) this.index = this.maxWidth;

		return this.sliderAnimation.animate('x', this.index);
	}

	@Watch('hint')
	slideRight() {
		this.index -= 600;

		if (!(this.maxWidth <= this.index) && this.index < 0) this.index = this.maxWidth;

		this.sliderAnimation.animate('x', this.index);
	}

	darken(type) {
		if (type === 'services') return true;
		if (type === 'contact') return true;
		if (type === 'over_ons') return true;
		if (type === 'expertise') return true;
		if (type === 'sectore') return true;
		return false;
	}
}
</script>

<style scoped lang="scss">
.slider-group {
	display: grid;
	gap: $spacing * 2;
	grid-template: 50rem / repeat(25, 1fr);
	width: 100%;
	margin: 0 auto 16rem;
	will-change: transform;
}

.slider-item {
	width: 44rem;
	height: 100%;
	user-select: none;
	padding: $spacing;

	a {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;
		z-index: 0;
		padding: $spacing * 2;
		width: 100%;
		height: 100%;
		text-decoration: none;
		background-color: $white;
		color: $color;
		box-shadow: 0 5rem 8rem -2rem rgba($black, 0.1);
		overflow: hidden;
		transition: 0.5s background-color, 0.8s box-shadow;
	}

	h3 {
		color: $color-head;
		line-height: 1.4;
	}

	p {
		margin: $spacing 0;
		font-family: $font-highlight;
		letter-spacing: 0.05em;
	}

	&.dark {
		a {
			background-color: $background-dark;
			color: $white;
		}

		h3 {
			color: $white;
		}
	}
}

.slider-image {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: -1;
	opacity: 0.5;
}

.slider {
	transition: 0.5s opacity;
	overflow: hidden;

	&:not(.active) {
		.slider-item {
			&:hover {
				a {
					background-color: $green;
					box-shadow: 0 8rem 4rem -2rem rgba($black, 0.25);
				}

				&.dark a {
					background-color: $pink;
				}
			}
		}
	}

	&--full {
		display: flex;
		align-items: center;
		height: 100%;
	}
}

@media all and (min-width: $m) {
	.slider-group {
		grid-template: 55rem / repeat(25, 1fr);
	}

	.slider-item {
		width: 50rem;
	}
}

// slide-item animation
.before-enter-active {
	animation: slide-in-from-left 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.after-enter-active {
	animation: slide-in-from-right 1.8s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.intro-enter-active {
	animation: intro 0.6s ease-in-out;
}

@keyframes slide-in-from-left {
	0% {
		transform: translate(-20rem, 3rem) rotateZ(-8deg);
	}

	100% {
		transform: translate(0);
	}
}

@keyframes slide-in-from-right {
	0% {
		transform: translate(20rem, -3rem) rotateZ(8deg);
	}

	100% {
		transform: translate(0);
	}
}

@keyframes intro {
	0% {
		transform: translateX(40rem) rotateZ(2deg);
		opacity: 0;
	}

	30% {
		opacity: 1;
	}

	100% {
		transform: translateX(0);
	}
}
</style>
