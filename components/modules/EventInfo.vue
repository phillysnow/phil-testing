<template>
	<section class="event-info">
		<div class="event-info-content">
			<div
				v-if="
					data.primary.data ||
					data.primary.time ||
					data.primary.location_name ||
					data.primary.location_address ||
					data.primary.button_link ||
					data.primary.button_label
				"
				class="event-info-header"
			>
				<div class="event-info-header-inner">
					<div v-if="data.primary.date" class="info-group">
						<span class="label">Datum</span>
						<span class="value">{{ data.primary.date }}</span>
					</div>
					<div v-if="data.primary.time" class="info-group">
						<span class="label">Tijd</span>
						<span class="value">{{ data.primary.time }}</span>
					</div>
					<div v-if="data.primary.location_name || data.primary.location_address" class="info-group">
						<span class="label">Locatie</span>
						<span v-if="data.primary.location_name" class="value">{{ data.primary.location_name }}</span>
						<span v-if="data.primary.location_address" class="value value--light">{{
							data.primary.location_address
						}}</span>
					</div>
					<prismic-link v-if="data.primary.button_link" :field="data.primary.button_link">
						<span class="button-label">{{ data.primary.button_label }}</span
						><span class="icon">&rsaquo;</span>
					</prismic-link>
				</div>
			</div>
			<article>
				<FigureImage v-if="data.primary.image && data.primary.image.url" :image="data.primary.image" />
				<prismic-rich-text v-if="data.primary.text" class="rich-text" :field="data.primary.text" />
			</article>
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
export default class EventInfo extends Vue {
	@Prop() data;
}
</script>
<style lang="scss">
.event-info {
	padding: $spacing * 6 $spacing;
	position: relative;
}

.event-info-header {
	a {
		position: relative;
		display: inline-block;
		margin-top: $spacing;
		background-color: $color;
		padding: $spacing * 1 $spacing * 2;
		text-decoration: none;
		font-weight: bold;
		font-family: $font-highlight;
		font-size: $font;
		line-height: 1.5;
		color: $white;
		box-shadow: 0 1rem 4rem -2rem rgba($black, 0.25);
		border: 1px solid $color;
		transition: all 0.3s ease-in-out;

		.icon {
			position: relative;
			display: inline-block;
			color: $pink;
			padding-left: $spacing * 0.75;
			font-size: $font-l;
			transform: translateY(1px);
		}

		&:hover {
			background-color: $white;
			color: $color;
		}
	}
}

.event-info-header-inner {
	position: relative;
	padding: $spacing * 2 0 $spacing * 2;
	margin-bottom: $spacing * 2;

	&::before {
		@include stripes();

		position: absolute;
		content: '';
		display: block;
		height: 100%;
		top: 0;
		right: -$spacing;
		left: -$spacing;
		z-index: -1;
	}
}

.label,
.value {
	font-family: $font-highlight;
	font-size: $font;
	line-height: 2;
	display: block;
}

.label {
	color: $pink;
}

.value {
	position: relative;
	transform: translateY(-2px);

	&--light {
		font-family: $font-highlight-light;
	}
}

.info-group {
	margin-bottom: 2.8rem;
}

@media all and (min-width: $l) {
	.event-info-content {
		display: grid;
		grid-template: 1fr / 35rem auto;
		position: relative;
		gap: 3.8rem;
		padding: $spacing * 6;
	}

	.event-info-header-inner {
		padding: 3rem 4rem 4rem;

		&::before {
			left: 0;
			right: 0;
			height: 100%;
		}
	}

	.event-info-header {
		a {
			padding: 2.2rem 4.6rem;
		}
	}
}

@media all and (min-width: $xl) {
	.event-info-content {
		display: grid;
		grid-template: 1fr / 41rem auto;
	}
}
</style>
