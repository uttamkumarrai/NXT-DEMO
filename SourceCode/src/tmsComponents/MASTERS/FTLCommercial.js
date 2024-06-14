import React, { useState, useEffect } from 'react';
import { Tabs, Tab, Button, Grid, TextField } from '@material-ui/core';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import Modal from '@mui/material/Modal';
// import './MasterStyles.css';
import MenuItem from '@mui/material/MenuItem';
import {Select, FormControl, InputLabel, CircularProgress, Table,IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import CloseIcon from '@mui/icons-material/Close';
import { useToast } from '../../Toast/toast';
import { useMessage } from '../../Toast/DialogContext';
import Tooltip from '@mui/material/Tooltip';
import Pagination from '@mui/material/Pagination';



import { TableBody, TableCell, TableRow } from '@mui/material';

import axios from 'axios';
import { event } from 'jquery';

function MyFTLCommercial() {
  const[commercialData,setCommercialData]=useState({
    commercialCode:'',
    originPincode:'',
    originState:'',
    originCity:'',
    originLocation:'',
    destinationPincode:'',
    destinationState:'',
    destinationCity:'',
    destinationLocation:'',
    distanceKm:'',
    tat:'',
    rate:'',
    vehicleType:'',





  });
  const [showTooltip, setShowTooltip] = useState(false);
  const { showMessage } = useMessage();
  const [entries, setEntries] = useState([]);
  const [entryCount, setEntryCount] = useState(1);
  const [selectedTab, setSelectedTab] = useState(0);
  const [show, setShow] = useState(false);
  const [searchBranch, setSearchBranch] = useState('');
  const [searchSubBranch, setSearchSubBranch] = useState([]);
 
  const [BranchOptions, setBranchOptions] = useState([]);
  const [SubBranchOptions, setSubBranchOptions] = useState([]);
  const [clientOptions, setClientOptions] = useState([]);
  const [vendorOptions, setVendorOptions] = useState([]);
  const[commercials,setCommercials]=useState([]);
  const [perPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);


  const [fromOptions, setFromOptions] = useState([]);
 
  const [toOptions, setToOptions] = useState([]);
  const [vehicleTypeOption, setVehicleTypeOption] = useState([]);
  const[upload,setUpload]=useState(false);
  const[selectedFile,setSelectedFile]=useState([]);
  const [disabledValues, setDisabledValues] = useState({
    branch: '',
    subBranch: '',
    commercialCode: '',
  });


  const resetForm = () => {
    setCommercialData({
      commercialCode:commercialData.commercialCode,
    originPincode:'',
    originState:'',
    originCity:'',
    originLocation:'',
    destinationPincode:'',
    destinationState:'',
    destinationCity:'',
    destinationLocation:'',
    distanceKm:'',
    tat:'',
    rate:'',
    vehicleType:'',

    })
  };


  const handleCommercial = (e) => {
    const { name, value } = e.target;
    
    setCommercialData({...commercialData,[name]:value});
    
    
  };


 

  const fetchOptions = async (pincode, location) => {
    console.log("fetch options");
    try {
      const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
      const postOffices = response.data[0].PostOffice;
      const optionsData = postOffices.map(postOffice => ({
        value: postOffice.Name,
        label: postOffice.Name,
      }));
      switch (location) {
        case 'from':
          setFromOptions(optionsData);
          break;
        case 'to':
          setToOptions(optionsData);
          break;
        default:
          break;
      }
  
      // Update the state variables based on the location
      switch (location) {
        case 'from':
          
          if (postOffices.length > 0) {
           
            setCommercialData(prevValues => ({
              ...prevValues,
              originCity: postOffices[0].District,
              originState: postOffices[0].State
            }));
          }
          break;
        case 'to':
          if (postOffices.length > 0) {
            setCommercialData(prevValues => ({
              ...prevValues,
              destinationCity: postOffices[0].District,
              destinationState: postOffices[0].State
            }));
          }
          break;
        default:
          break;
      }
    } catch (error) {
      console.error('Error fetching options:', error);
    }
  };
  
  

  const handleLocationChange = (location, pincode) => {
    if (pincode.length === 6) {
     
      fetchOptions(pincode, location);
    } else {
      switch (location) {
        case 'from':
          setCommercialData(prevValues => ({
            ...prevValues,
            originState: '',
            originCity: '',
            originLocation: '',
          }));
          break;
        case 'to':
          setCommercialData(prevValues => ({
            ...prevValues,
            destinationCity: '',
            destinationState: '',
            destinationLocation: '',
          }));
          break;
        default:
          break;
      }
      // setOptions([]);
    }
  };

  const handleFromPincodeChange = (event) => {
    const newPincode = event.target.value;
    const { name, value } = event.target;
    
    setCommercialData({...commercialData,[name]:value});
    handleLocationChange('from', newPincode);
  };
  
  const handleToPincodeChange = (event) => {
    const newPincode = event.target.value;
    console.log("pincode",newPincode);
    const { name, value } = event.target;
    
    setCommercialData({...commercialData,[name]:value});
    handleLocationChange('to', newPincode);
  };

  // useEffect(() => {
  //   console.log(pincodeDetails);
  // }, [pincodeDetails]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'FTLCommercial/10');
        const result = await response.json();
        setCommercials(result);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const paginatedData = commercials.slice(currentPage * perPage, (currentPage + 1) * perPage);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'branches');
        const result = await response.json();
        const defaultBranchId = result[0]?.branchid || '';
        //setSearchBranch(defaultBranchId);
       setBranchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
       console.log('fetching...',BranchOptions);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAdd = async () => {
    try {
      if (Object.values(commercialData).some((value) => value === '')) {
        showMessage('All fields are mandatory');
        
        return;
      }

      setDisabledValues({
        branch: searchBranch,
        subBranch: searchSubBranch,
        commercialCode: commercialData.commercialCode,
      });
      if(selectedTab===0){
        const newEntry = { ...commercialData, entryNumber: entryCount,serviceType:'FTL',type:'Client'};

        setEntries([...entries, newEntry]);
        setEntryCount(entryCount + 1);
      
      }else if(selectedTab===1){
        const newEntry = { ...commercialData, entryNumber: entryCount,serviceType:'FTL',type:'Vendor'};

        setEntries([...entries, newEntry]);
        setEntryCount(entryCount + 1);

      }
      else{
        const newEntry = { ...commercialData, entryNumber: entryCount,serviceType:'FTL',type:'Own Fleet'};

        setEntries([...entries, newEntry]);
        setEntryCount(entryCount + 1);

      }
     

      resetForm();
     
      console.log("data",entries);
    }catch(error){
      console.error("data is not there");
    }
  };

  useEffect(() => {
    console.log("Entries:", entries);
  }, [entries]);


  const handleBranchChange = async (event) => {
    const selectedOption = BranchOptions.find(option => option.value === event.target.value);
    console.log("handle branch", selectedOption);
    if (selectedOption) {
      setSearchBranch(selectedOption.value); // Update searchBranch with the selected branch value
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA+'SubBranches/' + selectedOption.value);
        const result = await response.json();
        // const defaultBranchId = result[0]?.id || '';
        // setSearchSubBranch(defaultBranchId);
        setSubBranchOptions(result.map(product => ({ value: product.id, label: product.subBranchname })));
        if (selectedTab === 0) {
          console.log("customer tab is selected");
          const response1 = await fetch(API_ENDPOINTS.FETCH_DATA+'clients/' + selectedOption.value);
          const result1 = await response1.json();
          setClientOptions(result1.map(product => ({ value: product.id, label: product.clientCode ,clientName:product.clientName})));
        } else if (selectedTab === 1) {
          console.log("vendor tab selected");
          const response1 = await fetch(API_ENDPOINTS.FETCH_DATA+'vendors/' + selectedOption.value);
          const result1 = await response1.json();
          setVendorOptions(result1.map(product => ({ value: product.id, label: product.vendorName,vendorCode:product.vrfCode })));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    } else {
      // Handle case when no branch is selected
      setSearchBranch(''); // Reset searchBranch if no branch is selected
      setSubBranchOptions([]); // Reset sub-branch options
      setClientOptions([]); // Reset client options
    }
  };
  useEffect(() => {
    const fetchVehicleType = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'vehicles/vehicleType');
        const result = await response.json();
        console.log('fetching...');
        setVehicleTypeOption(result.map(product => ({ value: product.id, label: product.vehicle_type })));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchVehicleType();
  }, []);






  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
   
  };
const handleSubBranch=async(event)=>{
setSearchSubBranch(event.target.value);
// console.log("sub Branch",searchSubBranch);
};

useEffect(() => {
  console.log("Sub Branch....", searchBranch);
}, [searchBranch]); // Log whenever searchSubBranch changes







  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
    setDisabledValues('');
    setCommercialData('');
    setSearchBranch('');
    setSearchSubBranch('');

  };

  const handleUpload=()=>{
    setUpload(true);

  };
  const handleCloseUpload=()=>{

    setUpload(false);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.FETCH_DATA+'FTLCommercial/AddCommercial', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entries) // Send all entries as JSON
      });

      if (response.ok) {
        window.showToast("FTL Commercial Added Successfully", "success");
        setEntries([]);
        setEntryCount(1); // Reset entry count
        handleClose();
      } else {
        console.error('Error submitting data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

const handleFileUpload=async()=>{
  if (selectedFile.length === 0) {
    console.log("File is not selected");
    showMessage('Please Select a file to upload');
  }else{
  const formData = new FormData();
  formData.append('file', selectedFile);

  try {
    const response = await fetch(API_ENDPOINTS.FETCH_DATA+'FTLCommercial/upload', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      window.showToast("Uploaded Successfully", "success");
    } else {
      console.log('File upload failed.');
    }
  } catch (error) {
    console.log('Error uploading file.',error);
  }
} 

}

const handleDeleteEntry = (entryNumber) => {
  // Filter out the entry with the given entryNumber
  const updatedEntries = entries.filter(entry => entry.entryNumber !== entryNumber);
  setEntries(updatedEntries);
  console.log("commercial Data",commercialData);
};

const handleKeyDown = (event) => {
  const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End'];
  // Allow special keys and digits (0-9)
  if (
    !allowedKeys.includes(event.key) &&
    (event.key.length !== 1 || !/[0-9]/.test(event.key))
  ) {
    event.preventDefault();
  }
};
const handlePageChange = (selectedPage) => {
  const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
  if (!isNaN(pageNumber)) {
      setCurrentPage(pageNumber);
  } else {
      console.error("Invalid page number:", selectedPage.target.textContent);
  }
};

  const tabStyle = {
    backgroundColor: '#8EC400',
    color: 'white', // Default background color for all tabs
  };

  const selectedTabStyle = {
    ...tabStyle,
    backgroundColor: '#0a0652', // Background color for the selected tab
    color: 'white', // Text color for the selected tab
  };

  return (
    <div>
      <h2>FTL Management</h2>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange} indicatorColor="primary" textColor="primary">
            <Tab label="Customer Commercial" style={selectedTab === 0 ? selectedTabStyle : tabStyle} />
            <Tab label="Vendor Commercial" style={selectedTab === 1 ? selectedTabStyle : tabStyle} />
            <Tab label="Own Fleet" style={selectedTab === 2 ? selectedTabStyle : tabStyle} />
          </Tabs>
        </Grid>
        
        <Grid item xs={3}>
        {selectedTab !== 2 &&
        <Button
        variant="contained"
        style={selectedTabStyle}
        component="a"
        href={`${process.env.PUBLIC_URL}/FTLCommercial.xlsx`}
        download="FTLCommercial.xlsx"
      >Download Template</Button>
        }
        </Grid>
        <Grid item xs={3}>
        {selectedTab !== 2 &&
          <Button variant="contained" style={selectedTabStyle} onClick={handleUpload}>Upload</Button>
        }
        </Grid>
        <Grid item xs={4}>
          <Button variant="contained" style={selectedTabStyle} onClick={handleShow}>+ Add FTL Commercial</Button>
        </Grid>
        
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
        <Grid item xs={12}>
        <TableContainer>
            <Table>
  <TableHead>
    <TableRow>
      <TableCell><b>#</b></TableCell>
      <TableCell><b>Vehicle Type</b></TableCell>
      <TableCell><b>From Pincode</b></TableCell>
      <TableCell><b>From State</b></TableCell>
      <TableCell><b>From City</b></TableCell>
      <TableCell><b>From Location</b></TableCell>
      <TableCell><b>To Pincode</b></TableCell>
      <TableCell><b>To State</b></TableCell>
      <TableCell><b>To City</b></TableCell>
      <TableCell><b>To Location</b></TableCell>
    
     

    </TableRow>
    </TableHead>
    <TableBody>
    {paginatedData.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.vehicleType}</TableCell>
                  <TableCell>{entry.originPincode}</TableCell>
                  <TableCell>{entry.originState}</TableCell>
                  <TableCell>{entry.originCity}</TableCell>
                  <TableCell>{entry.originLocation}</TableCell>
                  <TableCell>{entry.destinationPincode}</TableCell>
                  <TableCell>{entry.destinationState}</TableCell>
                  <TableCell>{entry.destinationCity}</TableCell>
                  <TableCell>{entry.destinationLocation}</TableCell>
                  </TableRow>
              ))}
  
            </TableBody>
            </Table>

            
            </TableContainer>
            {commercials.length > 0 ? (
    <Pagination count={Math.ceil(commercials.length / perPage)} page={currentPage + 1} onChange={handlePageChange} color="primary"/>
) : (
    <p>No data available</p>
)}
                  
          </Grid>
          </Grid>
      <Modal open={show} onClose={handleClose} BackdropProps={{
        onClick: (event) => {
          event.stopPropagation();
        },
      }}style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '80%', maxHeight: '80%',overflow: 'auto',marginTop:'40px' }}>
        <IconButton
          onClick={handleClose}
          
          style={{
            position: 'absolute',
            top: '90px',
            right: '150px',
            color: 'red', // Change the color to black
          }}
        >
          <CloseIcon />
        </IconButton>
         
          {selectedTab === 0 && <h2>Customer Details</h2>}
          {selectedTab === 1 && <h2>Vendor Details</h2>}
          {selectedTab === 2 && <h2>Own Fleet Details</h2>}
          <Grid container spacing={2}>
            <Grid item xs={4}>
            <Tooltip
        open={showTooltip}
        title="Name cannot be empty"
        placement="bottom"
        arrow
      >
            
    <FormControl fullWidth>
      <InputLabel id="Branch" style={{ color: 'Green' }}>Select Branch*</InputLabel>

        <Select
          labelId="Branch"
          
          value={searchBranch}
          variant="standard"
          onChange={handleBranchChange}
          disabled={!!disabledValues.branch}
        >
           <MenuItem value="">
                    <em>None</em>
                </MenuItem>
          {BranchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      
    </FormControl>
    </Tooltip>
    </Grid>
            
          <Grid item xs={4}>
            <FormControl fullWidth>
            <InputLabel id="SubBranch" style={{ color: 'Green' }}>Select Sub Branch*</InputLabel>

        <Select
          labelId="SubBranch"
          value={searchSubBranch}
          variant="standard"
          onChange={handleSubBranch}
          disabled={!!disabledValues.subBranch}
        >
           <MenuItem value="">
                    <em>None</em>
                </MenuItem>
          {SubBranchOptions.map((option) => (
            <MenuItem key={option.value} value={option.label}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      
    </FormControl>
            </Grid>
            <Grid item xs={4}>
            {selectedTab === 0 &&
              <FormControl fullWidth>
                <InputLabel id="client" style={{ color: 'Green' }}>Select Client*</InputLabel>
                <Select
                name="commercialCode"
                labelId='client'
                value={commercialData.commercialCode}
                variant="standard"
                onChange={handleCommercial}
                disabled={!!disabledValues.commercialCode}
               
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {clientOptions.map((option)=>(
                    <MenuItem key={option.value} value={option.label}>
                      {option.clientName}({option.label})
                    </MenuItem>

                  ))}

                </Select>
              </FormControl>
}
{selectedTab === 1 &&
 <FormControl fullWidth>
 <InputLabel id="vendor">Select Vendor*</InputLabel>
 <Select
 labelId='vendor'
 name="commercialCode"
 value={commercialData.commercialCode}
 variant="standard"
 onChange={handleCommercial}
 disabled={!!disabledValues.commercialCode}

 >
  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {vendorOptions.map((option)=>(
                    <MenuItem key={option.value} value={option.vendorCode}>
                      {option.label}({option.vendorCode})
                    </MenuItem>

                  ))}
                  </Select>
                  </FormControl>

}
            </Grid>
            
            
            <Grid item xs={12}>
              {selectedTab === 0 && <h2>Customer Commercial</h2>}
              {selectedTab === 1 && <h2>Vendor Commercial</h2>}
              {selectedTab === 2 && <h2>Own Fleet Commercial</h2>}
            </Grid>
            <Grid item xs={3}>
              <TextField
                variant="standard"
                name="originPincode"
                value={commercialData.originPincode}
                label="From Pincode*"
                onChange={handleFromPincodeChange}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' , color: 'Green'} }}
                
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
              disabled
                variant="standard"
                name="originState"
                label="From State*"
                value={commercialData.originState}
                onChange={handleCommercial}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' , color: 'Green' } }}
                InputProps={{ style: { color: 'black' } }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
              disabled
                variant="standard"
                name="originCity"
                label="From City*"
                value={commercialData.originCity}
                onChange={handleCommercial}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' , color: 'Green' } }}
                InputProps={{ style: { color: 'black' } }}
              />
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
            <InputLabel id="FromLocation" style={{ color: 'Green' }}>From Location*</InputLabel>
            <Select
            name='originLocation'
            labelId='FromLocation'
            value={commercialData.originLocation}
            onChange={handleCommercial}
            variant="standard"
            

            >
          <MenuItem value="">
            <em>None</em>
            </MenuItem>
            {fromOptions.map((option)=>(
            <MenuItem key={option.value} value={option.value}>
            {option.label}
            </MenuItem>

                  ))}
            </Select>
            </FormControl>


            </Grid>
            {/* <Grid item xs={3}>
              <Select
              
                value={selectedFromOption}
                onChange={handleFromOptionChange}
                options={fromOptions}
                placeholder="From Location"
              />
            
            </Grid> */}
            <Grid item xs={3}>
              <TextField
                variant="standard"
                name="destinationPincode"
                label="To Pincode*"
                value={commercialData.destinationPincode}
                onChange={handleToPincodeChange}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' , color: 'Green' } }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
              disabled
                variant="standard"
                name="destinationState"
                label="To State*"
                value={commercialData.destinationState}
                onChange={handleCommercial}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px'  , color: 'Green'} }}
                InputProps={{ style: { color: 'black' } }}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
              disabled
                variant="standard"
                name="destinationCity"
                label="To City*"
                value={commercialData.destinationCity}
                onChange={handleCommercial}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' , color: 'Green' } }}
                InputProps={{ style: { color: 'black' } }}
              />
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
 <InputLabel id="ToLocation" style={{ color: 'Green' }}>To Location*</InputLabel>
 <Select
 name="destinationLocation"
 labelId='ToLocation'
 value={commercialData.destinationLocation}
 variant="standard"
onChange={handleCommercial}

 >
  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {toOptions.map((option)=>(
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>

                  ))}
                  </Select>
                  </FormControl>
            </Grid>
         
            {/* <Grid item xs={3}>
              <Select
              
                value={selectedToOption}
                onChange={handleToOptionChange}
                options={toOptions}
                placeholder="To Location"
              />
            
            </Grid> */}
            {/* <Grid item xs={3}>
            <Select
              value={vehicleTypeOption.find(option => option.value === vehicleType)}
              options={vehicleTypeOption}
              onChange={(selectedOption) => setVehicleType(selectedOption ? selectedOption.value : null)}
              placeholder="Search Vehicle Type..."
              isClearable={true}
              className='form-select'
            />

            </Grid> */}
            <Grid item xs={3}>
            <TextField
              
                variant="standard"
                name="distanceKm"
                label="Distance(Km)*"
                value={commercialData.distanceKm}
                onChange={handleCommercial}
                size='small'
                onKeyDown={handleKeyDown}
                className="textfield-vehicle"
                InputLabelProps={{ inputMode: 'numeric',style: { fontSize: '14px'  , color: 'Green'} }}
              />
            </Grid>
            <Grid item xs={3}>
            <TextField
              
                variant="standard"
                name="tat"
                label="Customer TAT(Days)*"
                value={commercialData.tat}
                onChange={handleCommercial}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' , color: 'Green' } }}
              />
            </Grid>
            <Grid item xs={3}>
            <TextField
              
                variant="standard"
                name="rate"
                label="Customer Rate*"
                value={commercialData.rate}
                onChange={handleCommercial}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px'  , color: 'Green'} }}
              />
            </Grid>
            <Grid item xs={3}>
            <FormControl fullWidth>
 <InputLabel id="vehicleType" style={{ color: 'Green' }}>Vehicle Type*</InputLabel>
 <Select
 name="vehicleType"
 labelId='vehicleType'
 value={commercialData.vehicleType}

 variant="standard"
 onChange={handleCommercial}

 >
  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {vehicleTypeOption.map((option)=>(
                    <MenuItem key={option.value} value={option.label}>
                      {option.label}
                    </MenuItem>

                  ))}
                  </Select>
                  </FormControl>
            </Grid>
          </Grid>
          <Button variant="contained" color="primary" onClick={handleAdd}>Add</Button>
          <TableContainer>
            <Table>
  <TableHead>
    <TableRow>
      <TableCell><b>#</b></TableCell>
      <TableCell><b>Vehicle Type</b></TableCell>
      <TableCell><b>From Pincode</b></TableCell>
      <TableCell><b>From State</b></TableCell>
      <TableCell><b>From City</b></TableCell>
      <TableCell><b>From Location</b></TableCell>
      <TableCell><b>To Pincode</b></TableCell>
      <TableCell><b>To State</b></TableCell>
      <TableCell><b>To City</b></TableCell>
      <TableCell><b>To Location</b></TableCell>
      <TableCell><b>Rate</b></TableCell>
      <TableCell><b>KiloMeters</b></TableCell>
      <TableCell><b>TAT</b></TableCell>
      <TableCell><b>Action</b></TableCell>

    </TableRow>
    </TableHead>
    <TableBody>
    {entries&&entries.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.vehicleType}</TableCell>
                  <TableCell>{entry.originPincode}</TableCell>
                  <TableCell>{entry.originState}</TableCell>
                  <TableCell>{entry.originCity}</TableCell>
                  <TableCell>{entry.originLocation}</TableCell>
                  <TableCell>{entry.destinationPincode}</TableCell>
                  <TableCell>{entry.destinationState}</TableCell>
                  <TableCell>{entry.destinationCity}</TableCell>
                  <TableCell>{entry.destinationLocation}</TableCell>
                  <TableCell>{entry.rate}</TableCell>
                  <TableCell>{entry.distanceKm}</TableCell>
                  <TableCell>{entry.tat}</TableCell>
                  <TableCell><IconButton  color="secondary" onClick={() => handleDeleteEntry(entry.entryNumber)}>
                <DeleteIcon />
              </IconButton></TableCell>
                </TableRow>
              ))}
  
            </TableBody>
            </Table>

            
            </TableContainer>
            {entries.length > 0 && (
            <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
)}
        </div>
      </Modal>

<Modal open={upload} onClose={handleCloseUpload} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
  <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '50%', maxHeight: '50%',overflow: 'auto',marginTop:'40px' }}>
    
      {selectedTab === 0 && <h2>FTL Customer Bulk Upload</h2>}
    {selectedTab === 1 && <h2>FTL Vendor Bulk Upload</h2>}

      
    <TextField
      type="file"
      size="small"
      variant="standard"
      style={{ marginBottom: '10px' }}
      onChange={handleFileChange}
      />

    <Grid container spacing={2}>
    <Grid item xs={12}>
    <Button variant='contained' color='primary' onClick={handleFileUpload}>Upload</Button>

    </Grid>
    </Grid>
   
     
  


  </div>
</Modal>
    </div>
  );
}

export default MyFTLCommercial;
