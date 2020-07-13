<template>
	<figure v-if="video" class="figure-video">
		<span v-if="!playing" class="play" @click="toggle">
			<svg>
				<use xlink:href="#play" />
			</svg>
		</span>
		<video ref="video" :src="video.url" :poster="poster ? poster.url : ''" playsinline @click="toggle"></video>
	</figure>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class FigureImage extends Vue {
	@Prop() video;
	@Prop() poster;
	playing = false;

	toggle() {
		const video = this.$refs.video;

		if (!video.paused) {
			this.playing = false;
			return video.pause();
		}
		this.playing = true;
		return video.play();
	}
}
</script>

<style lang="scss">
.play {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
	left: 0;

	svg {
		fill: $white;
		width: $spacing * 3;
		height: $spacing * 3;
		transition: 0.2s ease-in-out transform;
	}
}

.figure-video {
	width: 100%;
	height: 100%;
	position: relative;
	background-color: $black;

	&:hover {
		.play svg {
			transform: scale(1.2);
		}
	}

	video {
		height: 100%;
		width: 100%;
	}
}
</style>
