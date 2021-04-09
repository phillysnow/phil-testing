<template>
	<section class="slices">
		<template v-for="(slice, index) in slices">
			<TextList
				v-if="slice.slice_type === 'text'"
				:key="'slice-' + index"
				:data="slice"
				:number="slice.primary.number || ''"
				:name="slice.primary.sub_title"
				:class="{ 'text-list--single': slice.primary.text_layout }"
			/>
			<IntroText v-if="slice.slice_type === 'intro'" :key="'slice-' + index" :data="slice" />
			<FigureModule v-if="slice.slice_type === 'image'" :key="'slice-' + index" :data="slice.primary" />
			<Stack v-if="slice.slice_type === 'stack'" :key="'slice-' + index" :data="slice" />
			<Partners v-if="slice.slice_type === 'partners'" :key="'slice-' + index" :data="slice" />
			<CallToAction
				v-if="slice.slice_type === 'cta'"
				:key="'slice-' + index"
				:data="slice"
				:name="slice.primary.sub_title"
			/>
			<Values v-if="slice.slice_type === 'values'" :key="'slice-' + index" :data="slice" />
			<LiveQuote v-if="slice.slice_type === 'livequote'" :key="'slice-' + index" :data="slice" />
			<Locations v-if="slice.slice_type === 'locations'" :key="'slice-' + index" :data="slice" />
			<FollowUp
				v-if="slice.slice_type === 'followup'"
				:key="'slice-' + index"
				:data="slice"
				:number="slice.primary.number || ''"
				:name="slice.primary.sub_title"
			/>
			<FollowUpCta
				v-if="slice.slice_type === 'followupcta'"
				:key="'slice-' + index"
				:data="slice"
				:number="slice.primary.number || ''"
				:name="slice.primary.sub_title"
			/>
			<EventInfo v-if="slice.slice_type === 'event_info'" :key="'slice-' + index" :data="slice" />
		</template>
	</section>
</template>
<script>
import { Component, Vue, Prop } from 'nuxt-property-decorator';
import {
	LiveQuote,
	TextList,
	Locations,
	FigureModule,
	FollowUp,
	FollowUpCta,
	IntroText,
	CallToAction,
	Values,
	Stack,
	Partners,
	EventInfo,
} from '@/components/modules';

@Component({
	components: {
		TextList,
		LiveQuote,
		Locations,
		FigureModule,
		FollowUp,
		FollowUpCta,
		CallToAction,
		IntroText,
		Values,
		Stack,
		Partners,
		EventInfo,
	},
})
export default class Slices extends Vue {
	@Prop() slices;
}
</script>

<style lang="scss">
.slices {
	display: block;
}
</style>
