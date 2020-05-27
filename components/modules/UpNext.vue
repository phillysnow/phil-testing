<template>
	<section class="upnext">
		<prismic-link v-if="data" class="upnext-content" :field="data">
			<p>volgende {{ type(data.type) }}</p>
			<h3 v-if="data.title">{{ $prismic.asText(data.title) }}</h3>
			<p v-if="data.subtitle">{{ $prismic.asText(data.subtitle) }}</p>
		</prismic-link>

		<h3>Up next</h3>
	</section>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component({})
export default class UpNext extends Vue {
	@Prop() data;

	type(value) {
		if (!value) return '';
		const type = value.split('_');
		return type[0] ? `${type[0]}/` : '';
	}

	mounted() {
		console.log(this.data);
	}
}
</script>

<style lang="scss">
.upnext {
	position: relative;
	background-color: $green;
	padding: $spacing * 5 $spacing * 6 30vw;

	> h3 {
		font-family: $font-base;
		color: darken($green, 10%);
		display: block;
		position: absolute;
		width: 100vw;
		line-height: 0.54;
		font-size: 26.2vw;
		word-break: keep-all;
		bottom: 0;
		left: 0;
	}
}

.upnext-content {
	display: block;
	text-decoration: none;
	color: $black;

	p {
		font-size: $font-l;
		font-weight: bold;
		margin-top: $spacing * 1.5;
	}

	h3 {
		font-size: $font-title;
		line-height: 1.1;
		letter-spacing: 0.03em;
		max-width: 90rem;
		margin-top: $spacing;
	}
}
</style>
