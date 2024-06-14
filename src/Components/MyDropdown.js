import React, { useEffect } from "react";
import { useState } from "react";
import FormDataDisplay from "./FormDataDisplay";
import axios from "axios";
import { BASE_URL } from "./constant";

function MyDropdown() {
  const [loading, setLoading] = useState(false);
  const [states, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);

  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [homeNo, setHomeNo] = useState("");

  useEffect(() => {
    fetchState();
  }, []);

  useEffect(() => {
    fetchdistrictById();
  }, [selectedState]);

  useEffect(() => {
    fetchtalukaById();
  }, [selectedDistrict]); 

  useEffect(() => {
    fetchvillagesById();
  }, [selectedTaluka]); 
  

  const fetchState = async () => {
    try {
      const result = await axios.get(`${BASE_URL}/state`);
      if (result.status === 200) {
        console.log(result);
        setState(result.data.content);
      } else {
        console.log("error", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchdistrictById = async () => {
    try {
      const result = await axios.get(
        
        `${BASE_URL}/district/state/${selectedState}`
      );
      if (result.status === 200) {
        console.log(result);
        setDistrict(result.data);
      } else {
        console.log("error", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchtalukaById = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/taluka/district/${selectedDistrict}`
      );
      if (result.status === 200) {
        console.log(result);
        setTalukas(result.data);
      } else {
        console.log("error", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const fetchvillagesById = async () => {
    try {
      const result = await axios.get(
        `${BASE_URL}/village/taluka/${selectedTaluka}`
      );
      if (result.status === 200) {
        console.log(result);
        setVillages(result.data);
      } else {
        console.log("error", result);
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleStateChange = (data) => {
    setSelectedState(data);
  };

  const handleDistrictChange = (data) => {
    setSelectedDistrict(data);
  };
  const handleTalukaChange = (data) => {
    
    setSelectedTaluka(data);
  };
  const handleVillageChange = (event) => {
    const village = event.target.value;
    setSelectedVillage(village);
  };
  const handleHomeNoChange = (event) => {
    const no = parseInt(event.target.value);
    setHomeNo(no);
  };
  const handleSubmit = () => {
    // setShowData(true);
  };

  return (
    <div>
      <div className="d-flex flex-row container main-form-container">
        <div className="col-md-3 information-form-container">
          <h2 className="information-heading">Select Your Information</h2>

          <div className="d-flex my-4">
            {/* <label htmlFor="state" className=" dropdown-names my-2 ">
              States:
            </label> */}
            <span className="input-group-text" id="inputGroup-sizing-sm">
              State
            </span>
            <select
              id="State"
              value={selectedState}
              onChange={(e) => handleStateChange(e.target.value)}
              className="form-select"
              aria-label="Default select example"
              disabled={!states}
            >
              <option value="">Select State</option>

              {states &&
                states.map((state, index) => (
                  <option key={index} value={state.id}>
                    {state.name}
                  </option>
                ))}
            </select>
          </div>

          <div className="d-flex my-4">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Districts
            </span>
            <select
              id="District"
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
              className="form-select "
              aria-label="Default select example"
              disabled={district.length === 0}
            >
              <option value="">Select District</option>
              {district &&
                district.map((district, index) => (
                  <option key={index} value={district.id}>
                    {district.name}
                  </option>
                ))}
            </select>
          </div>

          {/* Talukas */}

          <div className="d-flex my-4">
            {/* <label htmlFor="state" className=" dropdown-names my-2 ">
              Taluka:
            </label> */}
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Taluka
            </span>
            <select
              id="Taluka"
              value={selectedTaluka}
              onChange={(e) => handleTalukaChange(e.target.value)}
              className="form-select "
              aria-label="Default select example"
              disabled={talukas.length === 0}
            >
              <option value="">Select Taluka</option>
              {talukas &&
                talukas.map((taluka, index) => (
                  <option key={index} value={taluka.id}>
                    {taluka.name}
                  </option>
                ))}
            </select>
          </div>

          {/* villages */}

          <div className="d-flex my-4">
            {/* <label htmlFor="state" className=" dropdown-names my-2 ">
              Vilage:
            </label> */}
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Village
            </span>
            <select
              id="Village"
              value={selectedVillage}
              onChange={(e) =>handleVillageChange(e.target.value)}
            
              className="form-select "
              aria-label="Default select example"
              disabled={villages.length === 0}
            >
              <option value="">Select Village</option>
              {villages &&
              villages.map((village, index) => (
                <option key={index} value={village.id}>
                  {village.name}
                </option>
              ))}
            </select>
          </div>

          <div className="input-group input-group-sm mb-3">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Gat No.
            </span>
            <input
              type="number"
              className="form-control"
              aria-label="Sizing example input"
              aria-describedby="inputGroup-sizing-sm"
              placeholder="0"
              value={homeNo}
              onChange={handleHomeNoChange}
            />
          </div>

          <div className="btn-container">
            <button
              type="button  "
              className="btn btn-primary my-2 submitBtn"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button  "
              className="btn btn-dark btn-size get-direction-btn "
              onClick={handleSubmit}
            >
              Get Direction
            </button>
          </div>
        </div>

        {/* {showData && (
          <FormDataDisplay
            selectedState={selectedState}
            selectedDistrict={selectedDistrict}
            selectedTaluka={selectedTaluka}
            selectedVillage={selectedVillage}
            homeNo={homeNo}
          />
        )} */}
      </div>
    </div>
  );
}

export default MyDropdown;
