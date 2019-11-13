import React, { useRef } from 'react';
import FormRow from './components/FormRow'
import { NAME, ADDRESS, INCOME, REQUEST } from './constants.js';
import './App.css';

function App() {
  const inputRefs = {
    [NAME]: useRef(null),
    [ADDRESS]: useRef(null),
    [INCOME]: useRef(null),
    [REQUEST]: useRef(null),
  }

  const handleSubmit = e => {
    e.preventDefault()
    console.log(' e is ', e)
    console.log(' inputRefs is ', inputRefs)
  }


  return (
    <div className="body">
      <form
        onSubmit={handleSubmit}
      >
        {
          Object.entries(inputRefs).map(([key, ref]) => (
            <FormRow key={key} inputKey={key} ref={ref} />
          ))
        }
        <button type="submit" >
          Submit
        </button>
      </form>
    </div>
  );
};

export default App;
