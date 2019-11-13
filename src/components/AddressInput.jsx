import React, { forwardRef, useState } from 'react';
import PropTypes from 'prop-types';
import Script from 'react-load-script';

const AddressInput = forwardRef((props, ref) => {
  const {
    inputKey,
    type,
  } = props
  const [ value, setValue ] = useState('')
  const [ hasBlurred, setBlur ] = useState(false)
  const [ suggestionSelected, setSuggestionSelected ] = useState(false)

  const handleChange = e => {
    setValue(e.target.value)
    setSuggestionSelected(false)
  }
  const handlePlaceSelect = () => {

    // Extract City From Address Object
    const addressObject = ref.getPlace();
    const address = addressObject.address_components;

    // Check if address is valid
    if (address) {
      console.log({...addressObject})
      // Set State
      setSuggestionSelected(true)
      setValue(
        addressObject.formatted_address
      );
    }
  }
  const handleScriptLoad = () => { 
    // Declare Options For Autocomplete 
    const options = { types: ['address'], componentRestrictions: 'us' }; 
    
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

  return (
    <>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <input
        ref={ref}
        name={inputKey}
        required
        type={type}
        id={inputKey}
        value={value}
        onBlur={() => setBlur(true)}
        onChange={handleChange}
      />
    </>
  )
});

AddressInput.propTypes = {
  inputKey: PropTypes.string,
  type: PropTypes.string,
};

export default AddressInput;
