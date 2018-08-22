import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer';


// whatever keys we pass in here
// are going to represent the keys inside our state object
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});