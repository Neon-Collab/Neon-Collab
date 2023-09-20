import React, { useState } from 'react';

function FeedbackForm({ closeModal }) {
  return (
    <div className='modal'>
      <div className='modal-content'>
        <div className='close' onClick={() => closeModal()}>
          x
        </div>
        <div className='top'>
          <h4>Code To Review</h4>
          <h4>Your Review</h4>
        </div>
        <div className='feedback'>
          <div className='inner-feedback'>Code Here</div>
          <div className='inner-feedback'>
            <form>
              <label htmlFor='pros'>Pros</label>
              <textarea id='pros' />
              <label htmlFor='cons'>Cons</label>
              <textarea id='cons' />
              <label htmlFor='suggestions'>Suggestions</label>
              <textarea id='suggestions' />
            </form>
          </div>
        </div>
        <div className='bottom'>
          <button type='button' className='form-submit'>
            SUBMIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default FeedbackForm;
