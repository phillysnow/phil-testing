export const state = () => ({
	menu: {},
	dark: false,
	routeBack: '',
	detailpage: false,
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
	SET_PARENTROUTE(state, value) {
		state.routeBack = value;
	},
	SET_PARENTROUTEFALLBACK(state, value) {
		if (state.routeBack === '') state.routeBack = value;
	},
	SET_DETAILPAGE(state, value) {
		state.detailpage = value;
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
