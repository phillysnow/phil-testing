export const state = () => ({
	menu: {},
	dark: false,
});

export const mutations = {
	SET_MENU(state, menu) {
		state.menu = menu;
	},
	SET_ERROR(state, error) {
		state.menu = error;
	},
	SET_THEME(state, value) {
		state.dark = value;
	},
};

export const actions = {
	async fetchMenu({ commit }, $prismic) {
		try {
			const menu = (await $prismic.api.getSingle('navigation')).data;

			commit('SET_MENU', menu);
		} catch (e) {
			const error = 'Please create a menu document';

			commit('SET_ERROR', error);
		}
	},
};
