import React from 'react';

const FormDataDisplay = ({ selectedState, selectedDistrict, selectedTaluka, selectedVillage,homeNo }) => {
  return (
    <div>
      
      <p>State: {selectedState}</p>
      <p>District: {selectedDistrict}</p>
      <p>Taluka: {selectedTaluka}</p>
      <p>Village: {selectedVillage}</p> 
      <p>Gat No:{homeNo}</p>
    </div>
  );
};

export default FormDataDisplay;