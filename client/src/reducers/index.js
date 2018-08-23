import { combineReducers } from 'redux';
import { reducer as reduxForm } from 'redux-form'
import authReducer from './authReducer';


// whatever keys we pass in here
// are going to represent the keys inside our state object


// Redux-form wants the key for forms to be named "form"
// There is a way to override this setting but it's not worth it.
export default combineReducers({
  auth: authReducer,
  form: reduxForm
});