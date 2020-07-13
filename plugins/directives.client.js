import Vue from 'vue';
const cursor = document.querySelector('.cursor');

Vue.directive('cursor-focus', {
	// eslint-disable-next-line object-shorthand
	bind: function (el, binding) {
		if (cursor) {
			el.addEventListener(
				'mouseover',
				() => {
					cursor.classList.add(binding.value);
				},
				{ passive: true }
			);
			el.addEventListener(
				'mouseleave',
				() => {
					cursor.classList.remove(binding.value);
				},
				{ passive: true }
			);
		}
	},
});
