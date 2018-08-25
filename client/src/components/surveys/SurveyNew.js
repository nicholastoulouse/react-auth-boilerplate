import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import SurveyForm from './SurveyForm';
import SurveyFormReview from './SurveyFormReview';

class SurveyNew extends Component {
  // For state as simple as this, I believe it's a better design pattern
  // to use rather than using a lot of redux boilerplate
  state = { showFormReview: false };

  renderContent() {
    if (this.state.showFormReview) {
      return (
        <SurveyFormReview
          onCancel={ () => this.setState({ showFormReview: false })}
        />
      )
    }

    return (
      <SurveyForm
        onSurveySubmit={ () => this.setState({ showFormReview: true })}
      />
    )
  }
  render() {
    return (
      <div>
        { this.renderContent() }
      </div>
    )
  }
}

// Note that this component is what is actually rendering the SurveyForm component
// We are letting the state persist when the user toggles between
// the SurveyForm and SurveyFormReview components.
// However, when the user leaves the SurveyForm area of the app, we want to clear out the values
// Remember that by default, redux-form will drop the state when the component unmounts
export default reduxForm({
  form: 'surveyForm'
})(SurveyNew);