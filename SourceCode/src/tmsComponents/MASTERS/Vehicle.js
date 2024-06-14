import React, { useState, useEffect } from 'react';

import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import { TableBody, TableCell, TableRow } from '@mui/material';

import './MasterStyles.css';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';

import InputAdornment from '@mui/material/InputAdornment';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, IconButton, Grid } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';

import axios from 'axios';
import DownloadIcon from '@mui/icons-material/Download';
import Alert from '@mui/material/Alert';
import { useToast } from '../../Toast/toast';

const AddVehicle=()=>{
  const { showToast } = useToast();
    const [products, setProducts] = useState([]);
    const [selectedVehicleDocs, setSelectedVehicleDocs] = useState([]);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);

    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [show, setShow] = useState(false);
    const[selectedVehicle,setSelectedVehicle]=useState(null);
    const [activeStep, setActiveStep] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [formData, setFormData] = useState({
        regNo: '',
        modelSubModel: '',
        trackingBy: '',
        engineNo: '',
        chassisNo: '',
        odometerReading:'',
        manufacturer:'',
        manufacturerDate:'',
        regDate:'',
        vehicleType:'',
        permitType:'',
        capacityKg:'',
        capacityCubic:'',
        capacityLiters:'',
        length:'',
        width:'',
        height:'',
        status:true,
        
       
    });
    const initialDocuments = [
      { id: 1, type: 'Insurance', startDate: '', endDate: '' }, // Initialize with empty string or your desired default value
      { id: 2, type: 'Tax', startDate: '', endDate: '' }, // Initialize with empty string or your desired default value
      { id: 3, type: 'Emission Certificate', startDate: '', endDate: '' }, // Initialize with empty string or your desired default value
      { id: 4, type: 'Permit', startDate: '', endDate: '' }, // Initialize with empty string or your desired default value
    ];
    const [error, setError] = useState('');
    const [textFieldErrors, setTextFieldErrors] = useState({
        regNo: '',
        modelSubModel: '',
        engineNo: '',
        chassisNo: '',
        odometerReading: '',
        manufacturer: '',
        manufacturerDate: '',
        regDate: '',

    });
    const [selectedDocument, setSelectedDocument] = useState('');
  const [documents, setDocuments] = useState([]);
  const [firstInputFile, setFirstInputFile] = useState(null);
    



    const paginatedData = products.slice(currentPage * perPage, (currentPage + 1) * perPage);

 const handleShow = (mode, product) => {
  console.log("product data",product);
        setShow(true);
        setFormMode(mode);
        setFormData(product || null);
        setSelectedVehicle(product || null);
        
    };

    useEffect(() => {
      console.log("form data for edit", formData);
  }, [formData]);

    const handleClose = () => {
        setShow(false);
        setSelectedVehicle(null); 
       setActiveStep(0);
    };
    const validateStep = () => {
        let isValid = true;
        if (activeStep === 0) {
            const step0Errors = {};
            if (!formData.trackingBy) {
                step0Errors.trackingBy = 'Please select a tracking option.';
                isValid = false;
            }
            if (!formData.regNo) {
                step0Errors.regNo = 'Registration Number is required';
                isValid = false;
            }
            if (!formData.modelSubModel) {
                step0Errors.modelSubModel = 'Model & Sub Model is required';
                isValid = false;
            }
            if (!formData.engineNo) {
                step0Errors.engineNo = 'Engine Number is required';
                isValid = false;
            }
            if (!formData.chassisNo) {
                step0Errors.chassisNo = 'Chassis Number is required';
                isValid = false;
            }
            if (!formData.odometerReading) {
                step0Errors.odometerReading = 'Odometer Reading is required';
                isValid = false;
            }
            if (!formData.manufacturer) {
                step0Errors.manufacturer = 'Manufacturer is required';
                isValid = false;
            }
            if (!formData.manufacturerDate) {
                step0Errors.manufacturerDate = 'Manufacturer Date is required';
                isValid = false;
            }
            if (!formData.regDate) {
                step0Errors.regDate = 'Registration Date is required';
                isValid = false;
            }
            setTextFieldErrors(step0Errors);
        }
        return isValid;
    };
    
      

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      };
    
      const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
      };
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
      const handleRadioChange = (event) => {
        console.log("admin selected1: " + event.target.value);
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            trackingBy: value, 
          
        }));
        console.log("the form data",formData);
      };


      const handleSubmit = async () => {
        console.warn("coming to on submit");
        // Create a new FormData object
        const formDataToSend = new FormData();
      
        // Append each document file to the FormData object
        documents.forEach(doc => {
          doc.file && formDataToSend.append('files', doc.file);
          formDataToSend.append('labels', doc.type);
          formDataToSend.append('startDates', doc.startDate);
          formDataToSend.append('endDates', doc.endDate);
        });
      
        // Append the first input file to the FormData object
        if (firstInputFile) {
          formDataToSend.append('firstInputFile', firstInputFile);
          console.log('First Input File:', formDataToSend);
        }
      
        // Append each field from formData to formDataToSend
        for (const [key, value] of Object.entries(formData)) {
          formDataToSend.append(key, value);
        }
        console.log("Total Data:");
for (const [key, value] of formDataToSend.entries()) {
  console.log(`${key}:`, value);
}
      
        try {
          // Send the FormData object to your backend using fetch or Axios
          const response = await fetch(API_ENDPOINTS.FETCH_DATA+'vehicles/upload', {
            method: 'POST',
            body: formDataToSend,
          });
      
          if (!response.ok) {
            throw new Error('Failed to send data to the server');
          }
      
          // Handle successful response
          console.log('Data sent successfully');
          window.showToast("Vehicle Details Added  Successfully", "success");
          //setShowSuccessAlert(true);
          handleClose();
          const createdVehicle = await response.json();

                // Update the state by adding the newly created vendor to the existing products
                setProducts([...products, createdVehicle]);
                console.log("updated products after submission",products);
        } catch (error) {
          // Handle errors
          console.error('Error sending data:', error);
        }
        
      };
      
    
      

      const steps = [
        'General Information',
        'Vehicle Type/Dimension',
        'Upload Details',
        
      ];


    useEffect(() => {
        const fetchData = async () => {
            try {
              let url = API_ENDPOINTS.FETCH_DATA+'vehicles';
              // If a branch is selected, add it as a query parameter to the URL
              // if (searchInput) {
              //     url += `/${searchInput}`;
              // }
              console.log("Fetching data from URL:", url);
              const response = await fetch(url);
              const result = await response.json();
              setProducts(result);
              setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchInput]);

    const handleViewDocuments = (vehicleId) => {
      // Fetch documents for selected vehicle from backend API
      axios.get(API_ENDPOINTS.FETCH_DATA+`vehicles/${vehicleId}/files`)
        .then(response => {
          setSelectedVehicleDocs(response.data);
          setModalOpen(true);
        })
        .catch(error => {
          console.error('Error fetching vehicle documents:', error);
        });
    };

    function deleteFile(id) {
      console.log("id value",id);
    
      console.log(API_ENDPOINTS.FETCH_DATA+'vehicles/delete/'+{id});
      window.showToast("Are you sure you want to delete?", "confirm", {
        onConfirm: () => {
      fetch(API_ENDPOINTS.FETCH_DATA+`vehicles/delete/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers if required
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // Handle success response
        console.log('Document deleted successfully');
        window.showToast("Document deleted successfully", "success");
        setSelectedVehicleDocs(selectedVehicleDocs.filter(doc =>doc.id !== id));
      })
      .catch(error => {
        // Handle error
        console.error('There was a problem deleting the document:', error);
      });
    },
    onCancel: () => {
      // If user cancels, do nothing
      console.log("Deletion cancelled");
    }
  });
    }
    

    const handlePageChange = (selectedPage) => {
        const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber);
        } else {
            console.error("Invalid page number:", selectedPage.target.textContent);
        }
    };


    const [selectedFile, setSelectedFile] = useState(null);

   

    const handleDocumentChange = (event) => {
      setSelectedDocument(event.target.value);
      console.log("selected document"+selectedDocument);
    };
  
    const handleAddDocument = () => {
      if (selectedDocument && !documents.find(doc => doc.type === selectedDocument)) {
        setDocuments([
          ...documents,
          {
            id: Date.now(), // Unique identifier for each document type
            type: selectedDocument,
            file: null,
            startDate: '',
            endDate: ''
          }
        ]);
        setSelectedDocument('');
      }
    };
  
    const handleRemoveDocument = (id) => {
      setDocuments(documents.filter(doc => doc.id !== id));
    };
    const handleFileChange = (docId, event) => {
      if (docId !== null) {
        // Handle file change for the document input fields
        const updatedDocuments = documents.map(doc => {
          if (doc.id === docId) {
            return { ...doc, file: event.target.files[0] };
          }
          return doc;
        });
        setDocuments(updatedDocuments);
      } else {
        // Handle file change for the first input field
        setFirstInputFile(event.target.files[0]); // Update firstInputFile state
      }
  
      // Log all files in documents after each file selection
      console.log('All files:', documents.map(doc => doc.file));
  
      // Log the file selected for the first input field
      console.log('First input file:', firstInputFile);
    };
  
    const handleStartDateChange = (id, event) => {
      const updatedDocuments = [...documents];
      const index = updatedDocuments.findIndex(doc => doc.id === id);
      updatedDocuments[index].startDate = event.target.value;
      setDocuments(updatedDocuments);
    };
  
    const handleEndDateChange = (id, event) => {
      const updatedDocuments = [...documents];
      const index = updatedDocuments.findIndex(doc => doc.id === id);
      updatedDocuments[index].endDate = event.target.value;
      setDocuments(updatedDocuments);
    };

    const fileURL = API_ENDPOINTS.file_Url;
  
    // const handleUpload = () => {
    //   // Handle file upload logic here
    //   console.log('Uploaded documents:', documents);
    //   // Implement file upload logic here
    // };
  
    const downloadFile = async ({ fileName, filePath }) => {
      try {
        console.log('fileName:', fileName);
console.log('filePath:', filePath);
        const response = await fetch(filePath);
        const blob = await response.blob();
  
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = fileName; // Use the provided file name here
  
        // Programmatically click the link to trigger the download
        document.body.appendChild(link);
        link.click();
  
        // Clean up resources
        URL.revokeObjectURL(link.href);
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error downloading file:', error);
      }
    };



return(
    <div className="body">

{showSuccessAlert && (
        <Alert severity="success">
          This is a success Alert.
        </Alert>
      )}
                             
    <h2>Vehicle List</h2>
        
    <Grid container spacing={2}>
  <Grid item xs={12} sm={6} md={4}>
        {/* <Select
            value={searchInput ? searchOptions.find(option => option.value === searchInput) : null}
            
            options={searchOptions}
            placeholder="Search State..."
          
            // Set custom style to reduce width
            className='form-select'
        /> */}
        </Grid>
  <Grid item xs={12} sm={6} md={4}>
    {/* Add new vehicle button */}
    <Button variant="contained" color="primary" onClick={() => handleShow('add', null)}>
      Add New Vehicle
    </Button>
  </Grid>
</Grid>
<TableContainer style={{ overflowX: 'auto' }}>
<Table>
  <TableHead>
    <TableRow>
      <TableCell><b>VEHICLE NUMBER</b></TableCell>
      <TableCell><b>VEHICLE TYPE</b></TableCell>
      <TableCell><b>TRACKING TYPE</b></TableCell>
     
      <TableCell><b>VEHICLE DETAILS</b></TableCell>
      <TableCell><b>STATUS</b></TableCell>
      <TableCell><b>ACTION</b></TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
  {loading ? (
      <TableRow>
      <TableCell colSpan={6}>Loading...</TableCell>
  </TableRow>
    ) : (
      paginatedData.map((product) => (
        
          <TableRow key={product.id}>
            <TableCell>{product.regNo}</TableCell>
            <TableCell>{product.vehicleType}</TableCell>
            <TableCell>{product.trackingBy}</TableCell>
            <TableCell>{product.manufacturer}</TableCell>
           
            <TableCell>{(!product.status==null|| !product.status==" ") ? 'NA' :product.status}</TableCell>
            <TableCell><IconButton onClick={() => {
              console.log('IconButton clicked');
              handleShow('edit', product);
            }}>
            <EditIcon />
            </IconButton>
            <ListIcon onClick={() => {
              console.log('ListIcon clicked');
              handleViewDocuments(product.regNo);
            }} /></TableCell>
            </TableRow>
           
             ))
            )}

  </TableBody>
</Table>
</TableContainer>
{products.length > 0 ? (
<Pagination count={Math.ceil(products.length / perPage)} page={currentPage + 1} onChange={handlePageChange} color="primary" required/>
) : (
<p>No data available</p>
)}

<Modal open={show} onClose={handleClose} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
<div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '60%', maxHeight: '80%', overflow: 'auto' }}>
<Stepper activeStep={activeStep}>
            {steps.map((label, index) => (
              <Step key={label}>
                <StepLabel >{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <div>
                <h2>All steps completed</h2>
                <Button onClick={handleClose}>Close</Button>
              </div>
            ) : (
              <div>
                
                {activeStep === 0 && (
                  <>
                  <div style={{ marginTop: '20px' }}> {/* Add this wrapper */}
                  <RadioGroup
                  row
          aria-label="TrackType"
          name="trackingBy"
          value={(formData && formData.trackingBy)||''}
          onChange={handleRadioChange}
          className="removeBold"
          error={textFieldErrors.trackingBy? "true" : undefined}
        >
          
          <FormControlLabel value="DriverManual" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Driver App/Manual Tracking</span>}/>
          <FormControlLabel value="GPSTracking" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Enable GPS Tracking</span>} />
          <FormControlLabel value="SIMTracking" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Enable SIM Tracking</span>} />
         
        </RadioGroup>
        <FormHelperText error>{textFieldErrors.trackingBy}</FormHelperText>
        </div>
                    <TextField
                    variant="standard"
                      name="regNo"
                      label="Registration Number"
                      value={(formData && formData.regNo)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.regNo? "true" : undefined}
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                    />
                    <TextField
                    variant="standard"
                      name="modelSubModel"
                      label="Model& Sub Model"
                      value={(formData && formData.modelSubModel)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle"  
                      
                      error={textFieldErrors.modelSubModel? "true" : undefined}
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                     
                    />
                    <TextField
                    variant="standard"
                      name="engineNo"
                      label="Engine Number"
                      value={(formData && formData.engineNo)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle"  
                     
                      error={textFieldErrors.engineNo? "true" : undefined}
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                    />
                    <TextField
                     variant="standard"
                      name="chassisNo"
                      label="Chassis Number"
                      value={(formData && formData.chassisNo)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle"  
                      
                      error={textFieldErrors.chassisNo? "true" : undefined}
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                    />
                    <TextField
                    variant="standard"
                      name="odometerReading"
                      label="Odometer Reading"
                      value={(formData && formData.odometerReading)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.odometerReading? "true" : undefined}
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                    />
                    <TextField
                    variant="standard"
                      name="manufacturer"
                      label="Manufacturer"
                      value={(formData && formData.manufacturer)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.manufacturer? "true" : undefined}
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                    />
                    
                    <TextField
                      name="manufacturerDate"
                      label="Manufacturer Date"
                      value={(formData && formData.manufacturerDate)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      InputProps={{
                      startAdornment: (
                      <InputAdornment position="start">
            
                      </InputAdornment>
                        ),
                        }}
                    variant="standard"
                    type="date"
                    error={textFieldErrors.manufacturerDate? "true" : undefined}
                    InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    <TextField
                      name="regDate"
                      label="Registration Date"
                      value={(formData && formData.regDate)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      InputProps={{
                      startAdornment: (
                      <InputAdornment position="start">
            
                      </InputAdornment>
                        ),
                        }}
                    variant="standard"
                    type="date"
                    error={textFieldErrors.regDate? "true" : undefined}
                    InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    
                  </>
                )}
                {activeStep === 1 && (
                  <>
                    <TextField
                      name="vehicleType"
                      label="Vehicle Type"
                      value={(formData && formData.vehicleType)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.vehicleType ? "true" : undefined}
                      
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    <TextField
                      name="permitType"
                      label="Permit Type"
                      value={(formData && formData.permitType)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.permitType? "true" : undefined}
                      
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                      
                    />
                   
                    <TextField
                      name="capacityKg"
                      label="Capacity In Kg"
                      value={(formData && formData.capacityKg)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.capacityKg? "true" : undefined}
                     
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    
                    <TextField
                      name="capacityCubic"
                      label="Capacity In Cubic Meters"
                      value={(formData && formData.capacityCubic)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.capacityCubic? "true" : undefined}
                      
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                     <TextField
                      name="capacityLiters"
                      label="Capacity In Liters"
                      value={(formData && formData.capacityLiters)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.capacityLiters? "true" : undefined}
                     
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    <TextField
                      name="length"
                      label="Length"
                      value={(formData && formData.length)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                      
                      error={textFieldErrors.length? "true" : undefined}
                      
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    <TextField
                      name="width"
                      label="Width"
                      value={(formData && formData.width)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                     
                      error={textFieldErrors.width? "true" : undefined}
                      
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                    <TextField
                      name="height"
                      label="Height"
                      value={(formData && formData.height)||''}
                      onChange={handleChange}
                      size='small'
                      className="textfield-vehicle" 
                     
                      error={textFieldErrors.height? "true" : undefined}
                     
                      variant="standard"
                      InputLabelProps={{ style: { fontSize: '14px' } }}
                    />
                  </>
                )}
               
                {activeStep === 2 && (
                  <>
                  
                    <p>DOC/Maintenance</p>
                    <div>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <FormControl fullWidth variant="standard" style={{ marginBottom: '20px' }}>
            <InputLabel>Select Document</InputLabel>
            <Select
              value={selectedDocument}
              onChange={handleDocumentChange}
              size="small"
            >
              <MenuItem value="RC">RC/FC</MenuItem>
              <MenuItem value="Insurance">Insurance</MenuItem>
              <MenuItem value="Tax">Tax</MenuItem>
              <MenuItem value="Emission Certificate">Emission Certificate</MenuItem>
              <MenuItem value="Permit">Permit</MenuItem>

            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={6}>
          <Button onClick={handleAddDocument} variant="contained" color="primary">Add</Button>
        </Grid>
      </Grid>
      
      {documents.map((doc) => (
        <div key={doc.id}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={4}>
              <TextField
                label={`Upload ${doc.type} Doc (Only png, jpg, jpeg, pdf)`}
                type="file"
                onChange={(event) => handleFileChange(doc.id, event)}
                InputLabelProps={{ shrink: true }}
                InputProps={{ inputProps: { accept: 'image/*,.pdf' } }}
                size="small"
                style={{ marginBottom: '10px' }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Valid From"
                type="date"
                value={doc.startDate}
                onChange={(event) => handleStartDateChange(doc.id, event)}
                InputLabelProps={{ shrink: true }}
                size="small"
                style={{ marginBottom: '10px' }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Valid To"
                type="date"
                value={doc.endDate}
                onChange={(event) => handleEndDateChange(doc.id, event)}
                InputLabelProps={{ shrink: true }}
                size="small"
                style={{ marginBottom: '10px' }}
                variant="standard"
              />
            </Grid>
            <Grid item xs={2}>
              <IconButton onClick={() => handleRemoveDocument(doc.id)} color="secondary">
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        </div>
      ))}
      
      {/* <Button variant="contained" onClick={handleUpload} disabled={documents.length === 0}>Upload</Button> */}
    </div>
                    

                    <Button onClick={handleSubmit}>Submit</Button>
                  </>
                )}
                <div>
                  <Button disabled={activeStep === 0} onClick={handleBack}>
                    Back
                  </Button>
                  {activeStep !== steps.length - 1 && (
                    <Button variant="contained" onClick={() => {
                        const isValid = validateStep();
                        if (isValid) {
                          handleNext();
                        }
                      }}>
                        Next
                      </Button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

</Modal>
<Modal open={modalOpen} onClose={() => setModalOpen(false)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '60%', maxHeight: '80%', overflow: 'auto' }}>
        <TableContainer>
<Table>
  <TableHead>
    
    <TableRow>
      <TableCell><b>#</b></TableCell>
      <TableCell><b>Document Name</b></TableCell>
      <TableCell><b>End Date</b></TableCell>
      <TableCell><b>Action</b></TableCell>
      </TableRow>
      </TableHead>
      <TableBody>
      {loading ? (
      <TableRow>
      <TableCell>Loading...</TableCell>
  </TableRow>
    ) : (
      selectedVehicleDocs.map((doc, index) => (
          <TableRow key={doc.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{doc.documentType}</TableCell>
            <TableCell>{doc.endDate}</TableCell>
            
            <TableCell><DownloadIcon onClick={() => downloadFile({ filePath:fileURL+ doc.filePath, fileName: doc.fileName })}/> 
            <DeleteIcon onClick={()=>deleteFile(doc.id)}/>
            </TableCell>

            
          
        </TableRow>
        
        
        
      ))
    )}
    </TableBody>
    </Table>
    </TableContainer>
    </div>
      </Modal>
</div>


);

};
export default AddVehicle;