export const initialState = null;

export const reducer = (state, { payload, type }) => {
	switch (type) {
		case 'USER':
			return payload;
		case 'CLEAR':
			return null;
		case 'AVATAR':
			return {
				...state,
				avatar: payload,
			};
		case 'UPDATE':
			return {
				...state,
				followers: payload.followers,
				following: payload.following,
			};
		default:
			return state;
	}
};
