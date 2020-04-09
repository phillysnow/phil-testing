<template functional>
	<figure :class="props.classes">
		<picture>
			<source
				v-if="props.image.max"
				type="image/webp"
				:media="`(min-width: ${props.image.max.dimensions.width}px)`"
				:srcset="props.image.max.url"
			/>
			<source
				v-if="props.image.xl"
				type="image/webp"
				:media="`(min-width: ${props.image.xl.dimensions.width}px)`"
				:srcset="props.image.xl.url"
			/>
			<source
				v-if="props.image.l"
				type="image/webp"
				:media="`(min-width: ${props.image.l.dimensions.width}px)`"
				:srcset="props.image.l.url"
			/>
			<source
				v-if="props.image.m"
				type="image/webp"
				:media="`(min-width: ${props.image.m.dimensions.width}px)`"
				:srcset="props.image.m.url"
			/>
			<img
				v-if="props.image"
				:src="props.image.url"
				:width="props.image.dimensions.width"
				:height="props.image.dimensions.height"
				:alt="props.image.alt"
			/>
		</picture>
	</figure>
</template>

<style scoped lang="scss">
figure {
	background-color: aquamarine;
}

img {
	width: 100%;
	object-fit: cover;
}
</style>