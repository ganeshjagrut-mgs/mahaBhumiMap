import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import axios from "axios";
import { BASE_URL } from "../constant";
import { Autocomplete, TextField } from "@mui/material";

const SideBar = (props) => {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [talukas, setTalukas] = useState([]);
  const [villages, setVillages] = useState([]);
  const [gatNos, setGatNos] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedTaluka, setSelectedTaluka] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  const [selectedGatNo, setSelectedGatNo] = useState(null);

  useEffect(() => {
    fetchStates();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (selectedState) {
      fetchDistrictsByState();
    }
    // eslint-disable-next-line
  }, [selectedState]);

  useEffect(() => {
    if (selectedDistrict) {
      fetchTalukasByDistrict();
    }
    // eslint-disable-next-line
  }, [selectedDistrict]);

  useEffect(() => {
    if (selectedTaluka) {
      fetchVillagesByTaluka();
    }
    // eslint-disable-next-line
  }, [selectedTaluka]);

  useEffect(() => {
    if (selectedVillage) {
      fetchGatNosByVillage();
    }
    // eslint-disable-next-line
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
      console.error(
        `Error fetching districts for state ${selectedState}:`,
        error
      );
    }
  };

  const fetchTalukasByDistrict = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/taluka/district/${selectedDistrict}`
      );
      setTalukas(response.data);
    } catch (error) {
      console.error(
        `Error fetching talukas for district ${selectedDistrict}:`,
        error
      );
    }
  };

  const fetchVillagesByTaluka = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/village/taluka/${selectedTaluka}`
      );
      setVillages(response.data);
    } catch (error) {
      console.error(
        `Error fetching villages for taluka ${selectedTaluka}:`,
        error
      );
    }
  };

  const fetchGatNosByVillage = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/plot/village/${selectedVillage}`
      );
      setGatNos(response.data);
    } catch (error) {
      console.error(
        `Error fetching gat numbers for village ${selectedVillage}:`,
        error
      );
    }
  };

  const handleStateChange = (data) => {
    setSelectedState(data);
    setDistricts([]);
    setTalukas([]);
    setVillages([]);
    setGatNos([]);
    setSelectedDistrict("");
    setSelectedTaluka("");
    setSelectedVillage("");
    setSelectedGatNo(null);
  };

  const handleDistrictChange = (data) => {
    setSelectedDistrict(data);
    setTalukas([]);
    setVillages([]);
    setGatNos([]);
    setSelectedTaluka("");
    setSelectedVillage("");
    setSelectedGatNo(null);
  };

  const handleTalukaChange = (data) => {
    setSelectedTaluka(data);
    setVillages([]);
    setGatNos([]);
    setSelectedVillage("");
    setSelectedGatNo(null);
  };

  const handleVillageChange = (data) => {
    setSelectedVillage(data);
    setGatNos([]);
    setSelectedGatNo(null);
  };

  const handleGatNoChange = (data) => {
    setSelectedGatNo(data);
  };

  const handleSubmit = () => {
    if (
      selectedState &&
      selectedDistrict &&
      selectedTaluka &&
      selectedVillage &&
      selectedGatNo
    ) {
      props.onSubmit(selectedGatNo);
    }
  };

  return (
    <aside className="w-80 p-4 mt-5">
      <nav>
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth disabled={states.length === 0}>
            <InputLabel id="state-label">State</InputLabel>
            <Select
              labelId="state-label"
              id="State"
              value={selectedState}
              label="State"
              onChange={(e) => handleStateChange(e.target.value)}
            >
              <MenuItem value="">
                <em>Select State</em>
              </MenuItem>
              {states.map((state) => (
                <MenuItem key={state.id} value={state.id}>
                  {state.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box sx={{ minWidth: 120 }} className="mt-3">
          <FormControl fullWidth disabled={districts.length === 0}>
            <InputLabel id="district-label">Districts</InputLabel>
            <Select
              labelId="district-label"
              id="District"
              label="District"
              value={selectedDistrict}
              onChange={(e) => handleDistrictChange(e.target.value)}
            >
              <MenuItem value="">
                <em>Select District</em>
              </MenuItem>
              {districts.map((district) => (
                <MenuItem key={district.id} value={district.id}>
                  {district.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }} className="mt-3">
          <FormControl fullWidth disabled={talukas.length === 0}>
            <InputLabel id="taluka-label">Taluka</InputLabel>
            <Select
              labelId="taluka-label"
              id="Taluka"
              label="Taluka"
              value={selectedTaluka}
              onChange={(e) => handleTalukaChange(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Taluka</em>
              </MenuItem>
              {talukas.map((taluka) => (
                <MenuItem key={taluka.id} value={taluka.id}>
                  {taluka.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }} className="mt-3">
          <FormControl fullWidth disabled={villages.length === 0}>
            <InputLabel id="village-label">Village</InputLabel>
            <Select
              labelId="village-label"
              id="Village"
              label="Village"
              value={selectedVillage}
              onChange={(e) => handleVillageChange(e.target.value)}
            >
              <MenuItem value="">
                <em>Select Village</em>
              </MenuItem>
              {villages.map((village) => (
                <MenuItem key={village.id} value={village.id}>
                  {village.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box sx={{ minWidth: 120 }} className="mt-3">
          <Autocomplete
            id="GatNo"
            options={gatNos ? gatNos : []}
            getOptionLabel={(option) => option.plotNumber}
            value={gatNos.find((gatNo) => gatNo.plotNumber === selectedGatNo) || null}
            onChange={(event, newValue) =>
              handleGatNoChange(newValue ? newValue.plotNumber: null)
            }
            renderInput={(params) => (
              <TextField
                {...params}
                label="Gat No."
                variant="outlined"
                disabled={gatNos.length === 0}
              />
            )}
          />
        </Box>

        <div className="flex flex-col gap-2 justify-between mt-2 p-2">
          <Button
            variant="contained"
            color="success"
            className="p-1 w-full h-10"
            // disabled={!!selectedGatNo}
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <Button
            variant="contained"
            // disabled={!!selectedGatNo}
            className="p-1 w-full h-10"
            onClick={handleSubmit}
          >
            Get Direction
          </Button>
        </div>
      </nav>
    </aside>
  );
};

export default SideBar;
