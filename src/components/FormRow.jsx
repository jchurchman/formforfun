import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
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
    }
  },
  [REQUEST]: {
    label: 'Requested Loan Amount',
    type: 'number',
    otherProps: {
      min: 0,
    }
  },
}

const FormRow = forwardRef((props, ref) => {
	const {
    inputKey
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
      <input
        ref={ref}
        name={inputKey}
        required
        type={type}
        id={inputKey}
        {...otherProps}
      />
		</span>
	);
});

FormRow.propTypes = {
  inputKey: PropTypes.string,
};

export default FormRow
