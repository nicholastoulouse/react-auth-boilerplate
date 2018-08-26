import React from 'react';
// This gives our component access to this.props.history
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import formFields from './formFields';
import * as actions from './../../actions';

const ShowFormReview = ({ onCancel, values , submitSurvey, history }) => {
  const renderFields = formFields.map(field => {
    return (
     <div key={field.name}>
       <label>{ field.label }</label>
       <div>
         { values[field.name] }
       </div>
     </div>

    );
  });
  return (
    <div>
      ShowFormReview
      <h5>Please confirm your entries</h5>
      { renderFields }
      <button
        className='yellow darken-3 white-text btn-flat'
        onClick={ () => onCancel() }>
        Back
      </button>
      <button
        onClick={ () => submitSurvey(values, history)}
        className='green btn-flat right white-text'>
        Send survey
        <i className='material-icons right'>email</i>
      </button>
    </div>
  );
};
// Grab all the values from surveyForm
function mapStateToProps({ form: { surveyForm: { values }}}) {
  return { values };
}

export default connect(mapStateToProps, actions)(withRouter(ShowFormReview));