import Vue from 'vue';

Vue.directive('cursor-focus', {
	// eslint-disable-next-line object-shorthand
	bind: function (el, binding) {
		setTimeout(() => {
			const cursor = document.querySelector('.cursor');
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
		}, 1);
	},
});
