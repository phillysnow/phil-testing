<template>
	<div class="overview">
		<ul v-if="currentPageItems.length">
			<li
				v-for="(item, index) in currentPageItems"
				:key="index"
				class="overview-item"
				:class="{
					'overview-item--image': item.type === 'opinie',
					'overview-item--image full-slide': item.type === 'case',
				}"
			>
				<prismic-link v-if="item" :field="item" itemprop="url">
					<FigureImage
						v-if="item.type === 'opinie' || (item.type === 'case' && item.data.page_image.url)"
						:image="item.data.page_image"
					/>
					<article>
						<p v-if="item.type">{{ $type(item.type) }}</p>
						<h3 v-if="item.data.page_title">{{ $prismic.asText(item.data.page_title) }}</h3>
						<p v-if="item.data.page_subtitle" :class="{ small: item.type === 'nieuws' }">
							<svg v-if="item.type === 'event'"><use xlink:href="#calendar" /></svg>
							{{ $subtitlePrepend(item.type, item.data.page_subtitle) }}
						</p>
					</article>
				</prismic-link>
			</li>
		</ul>
		<ul v-else class="fallback">
			<li class="overview-item overview-item--loading">
				<span></span>
				<span></span>
			</li>
			<li class="overview-item overview-item--loading">
				<span></span>
				<span></span>
			</li>
			<li class="overview-item overview-item--loading">
				<span></span>
				<span></span>
			</li>
			<li class="overview-item overview-item--loading">
				<span></span>
				<span></span>
			</li>
		</ul>

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
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Overview extends Vue {
	@Prop() items;
	@Prop() pageTitle;

	visableItems = [];
	currentPageItems = [];
	pages = [];
	pageIndex = 1;

	mounted() {
		this.visableItems = this.items.filter((item) => item.data.visable === true);
		this.pages = this.itemsToPages();
		this.currentPageItems = this.pages[this.pageIndex - 1];
	}

	filterVisableItems(item) {
		return item.data.visable === true;
	}

	itemsToPages() {
		const results = [];
		while (this.visableItems.length) {
			results.push(this.visableItems.splice(0, 16));
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

	@Watch('pageIndex') // TODO: Remove this watcher because of performance
	onPageIndexChange() {
		this.currentPageItems = this.pages[this.pageIndex - 1];
	}
}
</script>
<style lang="scss">
.overview {
	padding: $spacing * 5 $spacing $spacing;
	margin: 0 auto;
	max-width: $max-widht * 1.009;

	ul {
		list-style: none;
		padding: 0;
		margin: 0 0 $spacing * 7;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
		width: 100%;
		height: 100%;
	}
}

.overview-item {
	width: 40rem;
	height: 40rem;
	position: relative;
	z-index: 0;
	box-shadow: 0 5rem 4rem -2rem rgba($black, 0.2);
	margin-bottom: $spacing * 2;

	a {
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
		position: relative;
		z-index: 0;
		padding: $spacing * 1.5;
		width: 100%;
		height: 100%;
		background-color: $white;
		color: $color;
		overflow: hidden;
		transition: background-color 0.4s;
	}

	h3 {
		color: $color-head;
		line-height: 1.4;
	}

	p {
		color: $color-head;
		margin-top: $spacing;
		text-transform: capitalize;
		font-family: $font-highlight;
		letter-spacing: 0.05em;

		&.small {
			font-family: $font-highlight-light;
		}

		svg {
			fill: currentColor;
			width: 1em;
			height: 1em;
			margin-right: 0.5em;
			transform: translateY(-0.1em);
		}
	}

	&:hover {
		a {
			background-color: $green;
		}
	}

	&--loading {
		position: relative;
		background-color: $loading-down;
		animation: loader 0.8s infinite alternate;

		> span {
			position: absolute;
			background-color: darken($loading-up, 3%);
			width: 80%;
			height: 3rem;
			left: 4rem;
			bottom: 6rem;

			&:nth-child(2) {
				width: 60%;
				bottom: 12rem;
			}
		}

		@keyframes loader {
			to {
				background-color: $loading-up;
			}
		}
	}

	&--image {
		figure {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			z-index: -1;
			background-color: $white;
			transition: background-color 0.4s;
		}

		img {
			transform: translateX(23%);
			opacity: 0.4;
			mix-blend-mode: multiply;
			transition: transform 0.4s 0.1s, opacity 0.4s;
			filter: grayscale(100%);
		}

		figure + article {
			h3,
			p {
				transition: transform 0.4s 0.1s, opacity 0.4s 0.1s;
			}

			p {
				&:first-of-type {
					margin-top: 0;
				}

				&:last-of-type {
					transition: color 0.4s 0.1s;
				}
			}
		}

		&.full-slide {
			a {
				padding: 0;
			}

			h3 {
				font-size: $font-l;
			}

			article {
				padding: $spacing * 1.5;
			}

			figure + article {
				h3,
				p {
					transition: color 0.4s 0.1s;
				}
			}

			figure {
				position: relative;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				z-index: -1;
				background-color: $white;
				transition: background-color 0.4s;
			}

			img {
				transform: translate3d(0, 0, 0);
				opacity: 1;
				filter: grayscale(0);
			}
		}

		&:hover {
			figure + article {
				h3,
				p {
					transform: translate3d(-4rem, 0, 0);
					opacity: 0;
					transition: transform 0.4s, opacity 0.4s;
				}

				p:last-of-type {
					transform: translate3d(0, 0, 0);
					opacity: 1;
					color: $white;
					transition: color 0.4s 0.1s;
				}
			}

			figure {
				background-color: $green;
				transition: background-color 0.4s 0.2s;
			}

			img {
				transform: translate3d(0, 0, 0);
				opacity: 0.9;
				transition: transform 0.4s, opacity 0.4s;
			}

			&.full-slide {
				figure {
					background-color: $white;
					transition: background-color 0s;
				}

				figure + article {
					h3,
					p {
						transform: translate3d(0, 0, 0);
						opacity: 1;
						color: $white;
						transition: color 0.4s 0.1s;
					}
				}
			}
		}
	}
}

.pagination {
	display: flex;
	align-items: center;
	position: fixed;
	bottom: 33px;
	left: 2.6rem;
	background-color: $background-light-dark;
	color: $white;
	height: 34px;
	border-radius: 17px;

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

@media all and (min-width: $s) {
	.overview-item {
		margin-right: $spacing * 2;
	}
}

@media all and (min-width: $m) {
	.overview-item {
		&:nth-child(even) {
			margin-right: 0;
		}

		a {
			padding: $spacing * 2;
		}

		&--image {
			&.full-slide {
				a {
					padding: $spacing * 2;
				}

				article {
					padding: 0;
				}

				figure + article {
					h3,
					p {
						transition: transform 0.4s 0.1s, opacity 0.4s 0.1s;
					}
				}

				figure {
					position: absolute;

					&::before {
						content: '';
						display: block;
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						height: 0;
						background-image: linear-gradient(0deg, rgba(0, 0, 0, 0.5) 0%, rgba(255, 255, 255, 0) 100%);
						z-index: 2;
						transition: height 0.4s;
					}
				}

				img {
					transform: translate3d(100%, 0, 0);
					opacity: 0;
				}
			}

			&:hover {
				&.full-slide {
					figure {
						background-color: $white;

						&::before {
							height: 20rem;
							transition: height 0.4s 0.3s;
						}
					}

					figure + article {
						h3,
						p {
							transform: translate3d(-4rem, 0, 0);
							opacity: 0;
							transition: transform 0.4s, opacity 0.4s;
						}
					}

					img {
						opacity: 1;
						transform: translate3d(0, 0, 0);
					}
				}
			}
		}
	}

	.pagination {
		bottom: 75px;
		left: 4.8rem;
	}
}

@media all and (min-width: $l) {
	.overview {
		padding: 0 $spacing * 2 $spacing;
	}

	.overview-item {
		width: 50rem;
		height: 50rem;
	}

	.pagination {
		bottom: 93px;
	}
}

@media all and (min-width: $xl) {
	.overview-item {
		width: 52rem;
		height: 52rem;
	}
}

@media all and (min-width: $desktop) {
	.overview-item {
		width: 55rem;
		height: 55rem;
	}
}
</style>
