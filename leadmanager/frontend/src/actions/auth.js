import axios from 'axios';
import { returnErrors } from './messages';

import * as actionTypes from './types';

// CHECK TOKEN & LOAD USER
export const loadUser = () => (dispatch, getState) => {
	// User Loading
	dispatch({ type: actionTypes.USER_LOADING });

	axios.get('/api/auth/user', tokenConfig(getState))
		.then((result) => {
			dispatch({
				type: actionTypes.USER_LOADED,
				payload: result.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: actionTypes.AUTH_ERROR,
			});
		});
};

// LOGIN USER
export const login = (username, password) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// Request body
	const body = JSON.stringify({ username, password });

	axios.post('/api/auth/login', body, config)
		.then((result) => {
			dispatch({
				type: actionTypes.LOGIN_SUCCESS,
				payload: result.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: actionTypes.LOGIN_FAIL,
			});
		});
};

// REGISTER USER
export const register = ({ username, password, email }) => (dispatch) => {
	// Headers
	const config = {
		headers: {
			'Content-Type': 'application/json',
		},
	};

	// Request body
	const body = JSON.stringify({ username, email, password });

	axios.post('/api/auth/register', body, config)
		.then((result) => {
			dispatch({
				type: actionTypes.REGISTER_SUCCESS,
				payload: result.data,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
			dispatch({
				type: actionTypes.REGISTER_FAIL,
			});
		});
};

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
	axios.post('/api/auth/logout/', null, tokenConfig(getState))
		.then((result) => {
			dispatch({
				type: actionTypes.LOGOUT_SUCCESS,
			});
		})
		.catch((err) => {
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

// Setup config with token - helper function
export const tokenConfig = (getState) => {
	// Get token from state
	const token = getState().auth.token;

	// Headers
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	// If token, add to headers config
	if (token) {
		config.headers["Authorization"] = `Token ${token}`;
	}

	return config;
};

