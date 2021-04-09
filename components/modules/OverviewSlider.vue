<template>
	<div class="overview-slider">
		<Slider
			v-if="currentPageItems && currentPageItems.length"
			:data="currentPageItems"
			local="false"
			class="slider--full"
			:hint="slide"
		/>

		<div v-if="pages.length > 1" class="pagination">
			<nuxt-link
				aria-label="Vorige pagina"
				class="navigation-link"
				:class="[pageIndex < 2 ? 'disabled' : '']"
				:to="changePage(pageIndex - 1)"
			>
				<svg>
					<use xlink:href="#chevron" />
				</svg>
			</nuxt-link>
			<span class="current-page">{{ `${pageIndex} / ${pages.length}` }}</span
			><nuxt-link
				aria-label="Volgende pagina"
				class="navigation-link"
				:class="[pageIndex === pages.length ? 'disabled' : '']"
				:to="changePage(pageIndex + 1)"
			>
				<svg>
					<use xlink:href="#chevron" />
				</svg>
			</nuxt-link>
		</div>
	</div>
</template>

<script>
import { Component, Vue, Prop, Watch } from 'nuxt-property-decorator';
import Slider from './Slider';

@Component({
	components: {
		Slider,
	},
})
export default class OverviewSlider extends Vue {
	@Prop() items;
	@Prop() firstItem;
	@Prop() slide;

	visableItems = [];
	pages = [];
	pageIndex = 1;

	get currentPageItems() {
		return this.pages[this.pageIndex - 1];
	}

	mounted() {
		this.visableItems = this.items.filter((item) => item.data.visable === true);
		if (this.firstItem) this.visableItems = [this.firstItem, ...this.visableItems];
		this.pages = this.itemsToPages();
	}

	itemsToPages() {
		const results = [];
		while (this.visableItems.length) {
			results.push(this.visableItems.splice(0, 14));
		}
		return results;
	}

	changePage(value) {
		return {
			query: {
				...this.$route.query,
				page: Math.max(Math.min(value, this.pages.length), 1),
			},
		};
	}

	@Watch('$route', { immediate: true, deep: true }) // TODO: Maybe make it more specific for the page param
	onUrlChange(newVal) {
		this.pageIndex = Number(newVal.query.page) || 1;
	}
}
</script>
<style lang="scss" scoped>
.overview-slider {
	height: 100%;
	position: relative;

	&::before {
		content: '';
		display: block;
		position: absolute;
		top: 0;
		left: 0;
		width: 70rem;
		height: 100%;
		background-color: $green;
	}
}

.pagination {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 3.3rem;
	left: 2.6rem;
	background-color: $background-light-dark;
	color: $white;
	height: 34px;
	border-radius: 17px;
	z-index: 1;

	.current-page {
		display: inline-block;
		position: relative;
		font-size: 1.2rem;
		line-height: 1.5;
		font-family: $font-highlight-light;
	}

	.navigation-link {
		position: relative;
		font-size: $font-xl;
		padding: 0 10px;
		color: $white;
		width: 34px;
		height: 34px;

		svg {
			display: block;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			width: 20px;
			height: 20px;
			stroke: $white;
		}

		&:hover {
			svg {
				stroke: $pink;
			}
		}

		&.disabled {
			svg {
				stroke: $color;
			}
		}

		&:first-child {
			transform-origin: center center;
			transform: rotate(180deg);

			svg {
				margin-top: 1px;
			}
		}
	}
}

@media all and (min-width: $m) {
	.pagination {
		bottom: 7.5rem;
		left: 4.8rem;
	}

	@media all and (max-height: 820px) {
		.pagination {
			bottom: 4.2rem;
		}
	}
}

@media all and (min-width: $xl) {
	.pagination {
		bottom: 9.3rem;
	}

	@media all and (max-height: 820px) {
		.pagination {
			bottom: 4.2rem;
		}
	}
}
</style>
