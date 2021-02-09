export const initialState = null;

export const reducer = (state, { payload, type }) => {
	switch (type) {
		case 'USER':
			return payload;
		case 'CLEAR':
			return null;

		case 'UPDATE':
			return {
				...state,
				followers: payload.followers,
				following: payload.following,
			};
		case 'UPDATEPIC':
			return {
				...state,
				avatar: payload,
			};
		default:
			return state;
	}
};
