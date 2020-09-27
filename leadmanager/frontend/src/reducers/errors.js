import * as actionTypes from '../actions/types.js';

const initialState = {
	msg: {},
	status: null,
};

export default function (state = initialState, action) {
	switch (action.type) {
		case actionTypes.GET_ERRORS:
			return {
				msg: action.payload.msg,
				status: action.payload.status,
			};
		default:
			return state;
	}
}