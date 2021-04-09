<template>
	<section id="locations" class="locations" :class="{ dark }">
		<div>
			<article v-if="data.primary">
				<h2 v-if="data.primary.subtitle">{{ data.primary.subtitle }}</h2>
				<h3 v-if="data.primary.title">{{ $prismic.asText(data.primary.title) }}</h3>
			</article>
			<ul v-if="data.items" class="locations-group">
				<li v-for="(item, index) in data.items" :key="index" class="locations-item">
					<h4 v-if="item.location || item.type">
						<span>{{ item.location }}</span
						>, {{ item.type || 'bezoekadres' }}
					</h4>
					<FigureImage :image="item.image" />
					<p v-if="item.street">{{ item.street }}</p>
					<p v-if="item.postcode && item.location">{{ item.postcode }} {{ item.location }}</p>
					<a v-if="item.telephone" :href="`tel:${item.telephone}`">{{ item.telephone }}</a>
					<prismic-link v-if="item.route" class="link" :field="item.route">Route <span>›</span></prismic-link>
				</li>
			</ul>
		</div>
	</section>
</template>
<script>
import { Component, Vue, Prop, State } from 'nuxt-property-decorator';
import { FigureImage } from '@/components/elements';

@Component({
	components: {
		FigureImage,
	},
})
export default class Locations extends Vue {
	@Prop() data;
	@State dark;
}
</script>

<style lang="scss" scoped>
.locations-group {
	display: grid;
	grid-template: 1fr / 1fr;
	gap: $spacing * 1.5;
}

.locations-item {
	h4 {
		font-size: $font;
		font-family: $font-highlight-light;
		padding-bottom: $spacing;

		> span {
			font-family: $font-highlight;
		}
	}

	a {
		display: block;
	}

	.link {
		font-family: $font-highlight;

		> span {
			display: inline-block;
			color: $pink;
			font-size: 2em;
			line-height: 1em;
			transform: translateY(0.16em);
		}
	}

	figure {
		height: auto;
		padding-bottom: $spacing;
		max-width: 35rem;
	}
}

.locations {
	@include section-padding();

	> div {
		display: grid;
		grid-template: auto 1fr / 100%;
	}

	article {
		padding-bottom: $spacing * 2;

		h2 {
			color: $pink;
			font-family: $font-highlight;
			font-size: $font;
		}

		h3 {
			font-size: $font-xxl;
			margin-top: 0.5em;
		}
	}

	&.dark {
		p,
		h1,
		a,
		h3,
		h4 {
			color: $white;
		}
	}
}

@media all and (min-width: $s) {
	.locations-group {
		grid-template: 1fr / repeat(2, 1fr);
	}
}

@media all and (min-width: $m) {
	.locations {
		@include section-padding('m');

		article {
			padding-bottom: 0;
			padding-right: $spacing * 2;
		}
	}
}

@media all and (min-width: $l) {
	.locations {
		@include section-padding('l');

		> div {
			display: grid;
			grid-template: 1fr / 40rem auto;
		}
	}
}
</style>
