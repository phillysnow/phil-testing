<template>
	<figure v-if="video" class="figure-video" :class="{ playing }" @mouseover="intentionToWatch()">
		<span class="play" @click="toggle">
			<svg v-if="!playing">
				<use xlink:href="#play" />
			</svg>
			<svg v-else>
				<use xlink:href="#pause" />
			</svg>
		</span>
		<video
			ref="video"
			:src="video.url"
			:poster="poster ? poster.url : ''"
			playsinline
			:preload="preload"
			@click="toggle"
		></video>
	</figure>
</template>

<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';

@Component
export default class FigureVideo extends Vue {
	@Prop() video;
	@Prop() poster;
	@Prop() parent;
	preload = 'none';
	playing = false;

	intentionToWatch() {
		console.log('hover');
		this.preload = 'auto';
	}

	toggle() {
		const video = this.$refs.video;

		if (!video.paused) {
			this.playing = false;
			this.$gtm.push({ event: 'figureVideo', playing: this.playing, parent: this.parent });
			return video.pause();
		} else {
			this.playing = true;
			this.$gtm.push({ event: 'figureVideo', playing: this.playing, parent: this.parent });
			return video.play();
		}
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
		transition: 0.2s ease-in-out transform, 0.2s 0.2s ease-in-out opacity;
		z-index: 1;
	}
}

.figure-video {
	width: 100%;
	height: 100%;
	position: relative;
	overflow: hidden;

	&:hover {
		.play svg {
			transform: scale(1.2);
		}
	}

	video {
		height: 100%;
		width: 100%;
		transition: 0.5s ease opacity;
	}

	&.playing {
		video {
			opacity: 1;
		}

		.play svg {
			opacity: 0;
		}

		&:hover {
			.play svg {
				opacity: 1;
				transition: 0.2s ease-in-out transform, 0.2s ease-in-out opacity;
			}
		}
	}
}

@media all and (min-width: $m) {
	.figure-video {
		video {
			opacity: 0.8;
		}
	}
}
</style>
