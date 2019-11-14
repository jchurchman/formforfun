import React from 'react';
import PropTypes from 'prop-types';
import AddressInput from './AddressInput.jsx'
import { NAME, ADDRESS, INCOME, REQUEST } from '../constants.js';

const inputConfig = {
  [NAME]: {
    label: 'Name',
    type: 'text',
  },
  [ADDRESS]: {
    label: 'Mailing Address',
    type: 'text',

  },
  [INCOME]: {
    label: 'Annual Income',
    type: 'number',
    otherProps: {
      min: 0,
      step: 500,
    }
  },
  [REQUEST]: {
    label: 'Requested Loan Amount',
    type: 'number',
    otherProps: {
      min: 0,
      step: 500,
    }
  },
}

const FormRow = (props) => {
	const {
    inputKey,
    value,
    onChange,
    setInvalid
  } = props;
  

  const {
    label,
    type,
    otherProps,
  } = inputConfig[inputKey]

	return (
		<span className="form-row">
			<label htmlFor={inputKey}>
        {label}
      </label>
      {
        inputKey === ADDRESS
          ? (
            <AddressInput
              onChange={onChange}
              value={value}
              inputKey={inputKey}
              setInvalid={setInvalid}
              {...inputConfig[inputKey]}
            />
          )
          : (
            <input
              onChange={onChange}
              value={value}
              name={inputKey}
              required
              type={type}
              id={inputKey}
              {...otherProps}
            />
          )
      }
		</span>
	);
};

FormRow.propTypes = {
  inputKey: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  setInvalid: PropTypes.func,
};

export default FormRow
