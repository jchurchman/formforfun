import React, { useRef, useState } from 'react';
import FormRow from './components/FormRow'
import { NAME, ADDRESS, INCOME, REQUEST, REJECTED } from './constants.js';
import submit from './services/submit';
import './App.css';

const getResponseMessage = res => {
  if (REJECTED[res]) {
    return 'We are sorry, your application has been declined.'
  }

  return 'Congratulations! Your application has been approved.'
}

function App() {
  const [ response, setResponse ] = useState(null)
  const inputRefs = {
    [NAME]: useRef(null),
    [ADDRESS]: useRef(null),
    [INCOME]: useRef(null),
    [REQUEST]: useRef(null),
  }

  const handleSubmit = e => {
    e.preventDefault()
    const requestBody = Object.entries(inputRefs).reduce((accum, [key, { current: { value }}]) => {
      return {
        ...accum,
        [key]: value
      }
    }, {})

    const res = submit(requestBody)

    setResponse(res)
  }


  return (
    <div className="body">
      {
        !response && (
          <form
            onSubmit={handleSubmit}
          >
            {
              Object.entries(inputRefs).map(([key, ref]) => (
                <FormRow key={key} inputKey={key} ref={ref} />
              ))
            }
            <span className="submit-button">
              <button type="submit" >
                Submit
              </button>
            </span>
          </form>
        )
      }
      {
        response && (
          <div className="response">
            {getResponseMessage(response)}
          </div>
        )
      }
    </div>
  );
};

export default App;
