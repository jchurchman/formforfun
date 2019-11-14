import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';

const approvedStates = new Set(['OR', 'CA', 'FL'])

const AddressInput = (props) => {
  const {
    inputKey,
    type,
    value,
    onChange,
    setInvalid,
  } = props
  const [ hasBlurred, setBlur ] = useState(false)
  const [ locationError, setLocationError ] = useState(false)
  let ref = useRef()

  const handlePlaceSelect = () => {
    const addressObject = ref.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      const stateObj = address.find(({ types }) => {
        return types.includes("administrative_area_level_1")
        && types.includes("political")
      })

      // Set State
      const locationError = !approvedStates.has(stateObj.short_name)
      setLocationError(locationError)
      setInvalid(locationError)

      onChange({ target: { value: addressObject.formatted_address}});
    }
  }
  const handleScriptLoad = () => { 
    // Declare Options For Autocomplete 
    const options = { types: ['address'], componentRestrictions: { country: 'us' } }; 
    
    // Initialize Google Autocomplete 
    /*global google*/
    ref = new google.maps.places.Autocomplete(
      document.getElementById(inputKey),
      options
    );
    // Avoid paying for data that you don't need by restricting the 
    // set of place fields that are returned to just the address
    // components and formatted address
    ref.setFields([
      'address_components',
      'formatted_address'
    ]);
    // Fire Event when a suggested name is selected
    ref.addListener(
      'place_changed',
      handlePlaceSelect
    ); 
  };

  const errorMessage = hasBlurred
    && locationError
    && 'Please choose a location in CA, OR, or FL'

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <input
        className={errorMessage ? 'error' : ''}
        name={inputKey}
        required
        type={type}
        id={inputKey}
        value={value}
        onBlur={() => setBlur(true)}
        onChange={onChange}
      />
      {
        errorMessage && (
          <div>
            {errorMessage}
          </div>
        )
      }
    </>
  )
};

AddressInput.propTypes = {
  inputKey: PropTypes.string,
  type: PropTypes.string,
};

export default AddressInput;
