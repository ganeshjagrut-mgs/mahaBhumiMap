import React from 'react';

const FormDataDisplay = ({ selectedState, selectedDistrict, selectedTaluka, selectedVillage,selectedGatNo }) => {
  return (
    <div>
      
      <p>State: {selectedState}</p>
      <p>District: {selectedDistrict}</p>
      <p>Taluka: {selectedTaluka}</p>
      <p>Village: {selectedVillage}</p> 
      <p>Gat No:{selectedGatNo}</p>
    </div>
  );
};

export default FormDataDisplay;