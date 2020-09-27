import axios from 'axios';

import * as actionTypes from './types';

// CREATE MESSAGE
export const createMessage = (msg) => {
	return {
		type: actionTypes.CREATE_MESSAGE,
		payload: msg,
	};
};

// RETURN ERRORS
export const returnErrors = (msg, status) => {
	return {
		type: actionTypes.GET_ERRORS,
		payload: { msg, status },
	};
};