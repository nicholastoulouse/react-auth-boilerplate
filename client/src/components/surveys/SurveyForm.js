import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { reduxForm, Field } from 'redux-form';
import SurveyField from './SurveyField';
import validateEmails from './../../utils/validateEmails';

import formFields from './formFields';

class SurveyForm extends Component {

  renderFields(){
    return formFields.map(({ name, label })=> {
      return <Field key={name} component={SurveyField} label={label} name={name} />;
    });
  }

  render() {
    return (
      <div>
        {/*
          handleSubmit is a function given to us by redux-form
          values in this case are coming from the name property passed into
          the Field component
        */}
        <form onSubmit={this.props.handleSubmit(this.props.onSurveySubmit)}>
          {this.renderFields()}
          <Link to='/surveys' className='red white-text btn-flat'>Cancel</Link>
          <button type='submit' className='teal white-text right btn-flat'>
            Submit
            <i className='material-icons right'>done</i>
          </button>
        </form>
      </div>
    )
  }
}

// validate automatically gets called every time the user tries to submit the form
// The values argument is coming from the name prop passed into the Field component

// Note that validate always runs whenever the component first boots up

function validate(values) {
  const errors = {};

  formFields.forEach( ({ name }) => {
    if(!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  // Have to pass in an empty string otherwise this function will throw an error
  // When this component first renders, validate will fire right away and validate emails
  // Will not have any values in it. This will cause the helper function to break
  errors.recipients = validateEmails(values.recipients || '');
  return errors;
}

// The form value tells redux-form which form state is being changed
// This is how we setup multiple forms in different pages.
// Each form must have a unique form value
export default reduxForm({
  validate,
  // This tells redux-form to save our form values in form.surveyForm.values
  // This allows us to have multiple form components and never have conflicting state
  form: 'surveyForm',
  // By default, redux-form will destroy the state when it unmounts.
  // This tells redux form to keep the state even when it leaves.
  destroyOnUnmount: false
})(SurveyForm);