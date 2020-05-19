<template>
	<section class="intro">
		<div class="intro-content">
			<FigureImage v-if="data.intro_image" classes="intro-image" :image="data.intro_image" />
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
export default class Intro extends Vue {
	@Prop() data;
}
</script>

<style lang="scss">
.intro-content {
	display: flex;
	justify-content: center;
	align-items: center;
	padding: $spacing * 7 $spacing * 6 $spacing * 4;
	position: relative;
}
</style>
