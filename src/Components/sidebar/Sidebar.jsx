import React, { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {FaCentercode,FaRegAddressCard, FaSignOutAlt, FaUsers, FaUserTie } from 'react-icons/fa';
import {MdHome,MdIncompleteCircle } from "react-icons/md";
import styles from '../styleSheet/styles.module.css'
import { SiCodersrank } from "react-icons/si";
import { TbReportSearch } from "react-icons/tb";
import { PiCertificateLight } from "react-icons/pi";
import { FcProcess } from "react-icons/fc";
import axios from "axios";
import { BASE_URL } from "../constant";

const SideBar = ({ isOpen }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const location = useLocation();
    const navigate= useNavigate();
    const handleClick=()=>{
        navigate("/")
    }
    const [loading, setLoading] = useState(false);
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [talukas, setTalukas] = useState([]);
    const [villages, setVillages] = useState([]);
    const [gatNos, setGatNos] = useState([]);
    const [selectedState, setSelectedState] = useState("");
    const [selectedDistrict, setSelectedDistrict] = useState("");
    const [selectedTaluka, setSelectedTaluka] = useState("");
    const [selectedVillage, setSelectedVillage] = useState("");
    const [selectedGatNo, setSelectedGatNo] = useState("");
  
    useEffect(() => {
      fetchStates();
    }, []);
  
    useEffect(() => {
      if (selectedState) {
        fetchDistrictsByState();
      }
    }, [selectedState]);
  
    useEffect(() => {
      if (selectedDistrict) {
        fetchTalukasByDistrict();
      }
    }, [selectedDistrict]);
  
    useEffect(() => {
      if (selectedTaluka) {
        fetchVillagesByTaluka();
      }
    }, [selectedTaluka]);
  
    useEffect(() => {
      if (selectedVillage) {
        fetchGatNosByVillage();
      }
    }, [selectedVillage]);
  
    const fetchStates = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/state`);
        setStates(response.data.content);
      } catch (error) {
        console.error("Error fetching states:", error);
      }
    };
  
    const fetchDistrictsByState = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/district/state/${selectedState}`
        );
        setDistricts(response.data);
      } catch (error) {
        console.error(`Error fetching districts for state ${selectedState}:`, error);
      }
    };
  
    const fetchTalukasByDistrict = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/taluka/district/${selectedDistrict}`
        );
        setTalukas(response.data);
      } catch (error) {
        console.error(`Error fetching talukas for district ${selectedDistrict}:`, error);
      }
    };
  
    const fetchVillagesByTaluka = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/village/taluka/${selectedTaluka}`
        );
        setVillages(response.data);
      } catch (error) {
        console.error(`Error fetching villages for taluka ${selectedTaluka}:`, error);
      }
    };
  
    const fetchGatNosByVillage = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/plot/village/${selectedVillage}`
        );
        setGatNos(response.data);
      } catch (error) {
        console.error(`Error fetching gat numbers for village ${selectedVillage}:`, error);
      }
    };
  
    const handleStateChange = (event) => {
      setSelectedState(event.target.value);
      setSelectedDistrict(""); // Reset district when state changes
      setSelectedTaluka(""); // Reset taluka when state changes
      setSelectedVillage(""); // Reset village when state changes
      setSelectedGatNo(""); // Reset gat no when state changes
    };
  
    const handleDistrictChange = (event) => {
      setSelectedDistrict(event.target.value);
      setSelectedTaluka(""); // Reset taluka when district changes
      setSelectedVillage(""); // Reset village when district changes
      setSelectedGatNo(""); // Reset gat no when district changes
    };
  
    const handleTalukaChange = (event) => {
      setSelectedTaluka(event.target.value);
      setSelectedVillage(""); // Reset village when taluka changes
      setSelectedGatNo(""); // Reset gat no when taluka changes
    };
  
    const handleVillageChange = (event) => {
      setSelectedVillage(event.target.value);
      setSelectedGatNo(""); // Reset gat no when village changes
    };
  
    const handleGatNoChange = (event) => {
      setSelectedGatNo(event.target.value);
    };
  
    const handleSubmit = () => {
      // Handle form submission logic here
    };
  
    // const handleLogout = () => {
    //     logout();
    // };

    const renderNavLink = (to, Icon, text) => {
        return (
            <NavLink
                exact
                to={to}
                className={`flex items-center ${isOpen ? 'justify-start pl-2' : 'justify-center'
                    } text-sm sm:text-lg py-2 px-1  rounded-md transition-colors  ${location.pathname === to || location.pathname.match(to) ? `${styles.navActive}` : ` ${styles.button}`
                    }`}
            >
                <Icon className="text-xl" />
                <span className={`ml-2 ${isOpen ? '' : 'hidden'}`}>{text}</span>
            </NavLink>
        );
    };

    return (
        <aside className={` ${styles.container2} h-full overflow-y-scroll ${isOpen ? 'w-64 px-4' : 'w-16 p-4'}`}>
           
            <hr className='border-blue-500' />
            <nav>



            <div className="d-flex my-4">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              State
            </span>
            <select
              id="State"
              value={selectedState}
              onChange={handleStateChange}
              className="form-select"
              aria-label="Default select example"
              disabled={loading || states.length === 0}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
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
              onChange={handleDistrictChange}
              className="form-select"
              aria-label="Default select example"
              disabled={loading || districts.length === 0}
            >
              <option value="">Select District</option>
              {districts.map((district) => (
                <option key={district.id} value={district.id}>
                  {district.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex my-4">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Taluka
            </span>
            <select
              id="Taluka"
              value={selectedTaluka}
              onChange={handleTalukaChange}
              className="form-select"
              aria-label="Default select example"
              disabled={loading || talukas.length === 0}
            >
              <option value="">Select Taluka</option>
              {talukas.map((taluka) => (
                <option key={taluka.id} value={taluka.id}>
                  {taluka.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex my-4">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Village
            </span>
            <select
              id="Village"
              value={selectedVillage}
              onChange={handleVillageChange}
              className="form-select"
              aria-label="Default select example"
              disabled={loading || villages.length === 0}
            >
              <option value="">Select Village</option>
              {villages.map((village) => (
                <option key={village.id} value={village.id}>
                  {village.name}
                </option>
              ))}
            </select>
          </div>

          <div className="d-flex my-4">
            <span className="input-group-text" id="inputGroup-sizing-sm">
              Gat No.
            </span>
            <select
              id="GatNo"
              value={selectedGatNo}
              onChange={handleGatNoChange}
              className="form-select"
              aria-label="Default select example"
              disabled={loading || gatNos.length === 0}
            >
              <option value="">Select Gat No</option>
              {gatNos.map((gatNo) => (
                <option key={gatNo.id} value={gatNo.id}>
                  {gatNo.plotNumber}, {gatNo.name}
                </option>
              ))}
            </select>
          </div>

          <div className="btn-container">
            <button
              type="button"
              className="btn btn-primary my-2 submitBtn"
              onClick={handleSubmit}
            >
              Submit
            </button>
            <button
              type="button"
              className="btn btn-dark btn-size get-direction-btn"
              onClick={handleSubmit}
            >
              Get Direction
            </button>
          </div>
            </nav>
        </aside>
    );
};

export default SideBar;
