import React from 'react';

// We are getting these properties from redux-form
// We are destructing from the meta property the touched and error values.
// When a user clicks or interacts with the form in any sort of way, the touched property turns true
// Errors are set when passing a validate function to redux-form
export default ({ input, label, meta: { touched, error }}) => {
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: '5px' }}/>
      <div className='red-text' style={{ marginBottom: '20px'}}>
        { touched && error  }
      </div>
    </div>
  )
}