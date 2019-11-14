import React, { useState } from 'react';
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

const initialState = {
  [NAME]: '',
  [ADDRESS]: '',
  [INCOME]: '',
  [REQUEST]: '',
}

function App() {
  const [ response, setResponse ] = useState(null);
  const [ formState, setFormState ] = useState(initialState);
  const [ invalidAddress, setInvalidAddress ] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();

    if (invalidAddress) {
      return null
    }
    const requestBody = Object.entries(formState)

    const res = submit(requestBody)

    setResponse(res)
  }
  
  const handleInputChange = key => e => {
    const newState = {
      ...formState,
      [key]: e.target.value,
    };
    setFormState(newState);
  }

  return (
    <div className="body">
      {
        response 
          ? (
            <div className="response">
              {getResponseMessage(response)}
            </div>
          )
          : (
            <form
              onSubmit={handleSubmit}
            >
              {
                Object.entries(formState).map(([key, value]) => (
                  <FormRow
                    key={key}
                    inputKey={key}
                    value={value}
                    onChange={handleInputChange(key)}
                    setInvalid={setInvalidAddress}
                  />
                ))
              }
              <span className="submit-button">
                <button type="submit">
                  Submit
                </button>
              </span>
            </form>
          )
      }
    </div>
  );
};

export default App;
