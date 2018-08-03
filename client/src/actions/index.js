import axios from 'axios';

import { FETCH_USER } from './types';

// if redux-thunk sees that we're returning a function in
// an action creator instead of an action
// redux thunk will automatically call this function and pass in dispatch as an argument

export const fetchUser = () => async dispatch => {
  // we do not want to dispatch an action until this request is completed
  const res = await axios.get('/api/current_user');
  dispatch({ type: FETCH_USER, payload: res.data });
};