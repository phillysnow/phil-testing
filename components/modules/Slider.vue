<template>
	<transition name="appear" appear>
		<div class="slider">
			<ul class="slider--group">
				<li ref="items" v-for="i in range" :key="i" class="slider--item" :data-id="i">
					<transition name="fade">
						<div v-if="inViewById[i]" :key="i">{{ i }}</div>
					</transition>
				</li>
			</ul>
		</div>
	</transition>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class Slider extends Vue {
	@Prop() slides;
	inViewById = {};
	observer = undefined;

	mounted() {
		let observer = new IntersectionObserver(this.handleIntersection);
		for (let el of this.$refs.items) {
			observer.observe(el);
		}
		this.observer = observer;
	}

	beforeDestroy() {
		this.observer.disconnect();
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
				// if (this.$refs.items[id]) this.$refs.items[id].classList.add('active');
			} else if (inViewById[id]) {
				// Leaving view.
				inViewById[id] = false;
				// if (this.$refs.items[id]) this.$refs.items[id].classList.remove('active');
			}
		}

		this.inViewById = inViewById;
	}

	// test items generator
	identity = (x) => x;

	Array = {
		from(iterable, transform = identity) {
			let list = [];
			for (let i = 0; i < iterable.length; i++) {
				list.push(transform(iterable[i], i));
			}
			return list;
		},
	};

	get range() {
		return Array.from({ length: 20 }, (_, i) => i + 1);
	}
	// end test items generator
}
</script>

<style scoped lang="scss">
.slider {
	transition: 0.5s opacity;
	overflow: auto hidden;
}

.slider--group {
	display: grid;
	grid-gap: $spacing * 2;
	grid-template-rows: 1fr;
	grid-auto-flow: column;
	grid-auto-columns: 1fr;
	width: 100%;
	height: 55rem;
	margin: 20rem auto;
	scroll-behavior: smooth;
}

.fade-enter-active {
	animation: bounce-in 0.5s ease-out;
}

.appear-enter-active {
	opacity: 0;

	.fade-enter-active {
		animation: none;
	}
}

.slider--item {
	width: 40rem;
	height: 100%;
	user-select: none;
	padding: $spacing;

	div {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 100%;
		height: 100%;
		color: $white;
		font-size: $font-title;
		background-color: $green;
	}
}

@keyframes bounce-in {
	0% {
		transform: translateY(10rem) rotateZ(4deg);
	}

	100% {
		transform: translateY(0) rotateZ(0);
	}
}
</style>
