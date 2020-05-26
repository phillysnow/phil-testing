<template>
	<div class="embed" :class="{ playing: iframe }" @click="play()">
		<span v-if="!iframe" class="play"
			><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 39">
				<path d="M0 39V0l39 19.5L0 39z" />
			</svg>
		</span>
		<picture>
			<img v-if="!iframe" :src="embed.thumbnail_url" alt="" />
		</picture>
		<div class="iframe" v-if="iframe" v-html="iframe"></div>
	</div>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component()
export default class EmbedYoutube extends Vue {
	@Prop() embed;
	iframe = null;

	play() {
		const html = this.embed.html.replace(/feature=oembed/, 'feature=oembed&autoplay=1&controls=0');

		this.iframe = html;
	}
}
</script>
<style lang="scss">
.play {
	display: flex;
	justify-content: center;
	align-items: center;
	width: $spacing * 3;
	height: $spacing * 3;
	transition: 0.2s ease-in-out transform;

	svg {
		fill: $white;
		width: 100%;
		height: 100%;
		transform: translateX(0.1rem);
	}
}

.embed {
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: rgba($green, 0.5);
	height: 60rem;
	width: 100%;
	cursor: pointer;
	position: relative;
	z-index: 0;

	&:hover {
		.play {
			transform: scale(1.2);
		}
	}

	.iframe {
		width: 100%;
		height: 100%;
	}

	iframe {
		width: 100%;
		height: 100%;
	}

	img {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		object-fit: cover;
		opacity: 0.7;
		z-index: -1;

		@supports (mix-blend-mode: multiply) {
			opacity: 0.5;
			mix-blend-mode: multiply;
		}
	}

	&.playing {
		img {
			opacity: 1;
		}
	}
}
</style>
