import axios from 'axios';
import { createMessage, returnErrors } from './messages';
import { tokenConfig } from './auth';

import * as actionTypes from './types';

// GET LEADS
export const getLeads = () => (dispatch, getState) => {
	axios.get('/api/leads/', tokenConfig(getState))
		.then((response) => {
			dispatch({
				type: actionTypes.GET_LEADS,
				payload: response.data,
			});
		})
		.catch((err) => {
			console.error(err);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};

// DELETE LEAD
export const deleteLead = (id) => (dispatch, getState) => {
	axios.delete(`/api/leads/${id}/`, tokenConfig(getState))
		.then(() => {
			dispatch(createMessage({ deleteLead: 'Lead Deleted' }));
			dispatch({
				type: actionTypes.DELETE_LEAD,
				payload: id,
			});
		})
		.catch((err) => {
			console.error(err);
		});
};

// ADD LEAD
export const addLead = (lead) => (dispatch, getState) => {
	axios.post('/api/leads/', lead, tokenConfig(getState))
		.then((response) => {
			dispatch(createMessage({ addLead: 'Lead Added' }));
			dispatch({
				type: actionTypes.ADD_LEAD,
				payload: response.data,
			})
		})
		.catch((err) => {
			console.error(err);
			dispatch(returnErrors(err.response.data, err.response.status));
		});
};