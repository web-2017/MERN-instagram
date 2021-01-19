export const initialState = null;

export const reducer = (state, action) => {
	switch (action.type) {
		case 'USER':
			return action.payload;
		case 'CLEAR':
			return null;
		case 'AVATAR':
			return {
				...state,
				avatar: action.payload,
			};
		default:
			return state;
	}
};
