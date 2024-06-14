import React, { useState, useEffect } from 'react';
import Modal from '@mui/material/Modal';

import Table from '@mui/material/Table';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import { TableBody, TableCell, TableRow } from '@mui/material';
import ListIcon from '@mui/icons-material/List';
import EditIcon from '@mui/icons-material/Edit';
import InputAdornment from '@mui/material/InputAdornment';
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, IconButton, Grid } from '@mui/material';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Input from '@mui/material/Input';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteIcon from '@mui/icons-material/Delete';


import './MasterStyles.css';

const AddDriver=()=>{

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({
      driverType:'',
      dob:'',
      dlnumber:'',
      firstName:'',
      lastName:'',
      mobileNo:'',
      email:'',
      gender:'',
      Password:'',
      confirmPassword:'',
      file:null,
      status:true,
    })
    
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    

    const paginatedData = products.slice(currentPage * perPage, (currentPage + 1) * perPage);

    const handlePageChange = (selectedPage) => {
      const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
      if (!isNaN(pageNumber)) {
          setCurrentPage(pageNumber);
      } else {
          console.error("Invalid page number:", selectedPage.target.textContent);
      }
  };

    useEffect(() => {
      const fetchData = async () => {
          try {
            let url = API_ENDPOINTS.FETCH_DATA+'drivers';
            // If a branch is selected, add it as a query parameter to the URL
            // if (searchInput) {
            //     url += `/${searchInput}`;
            // }
            console.log("Fetching data from URL:", url);
            const response = await fetch(url);
            const result = await response.json();
            setProducts(result);
            console.log('products....',products);
            setLoading(false);
          } catch (error) {
              console.error('Error fetching data:', error);
              setLoading(false);
          }
      };

      fetchData();
  }, []);

  const handleShow = (mode, product) => {
    console.log("product data",product);
          setShow(true);
          setFormMode(mode);
          setFormData(product || null);
        
          
      };
      const handleClose = () => {
        setShow(false);
      
    };

    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
      if (name === 'Password') {
        setPassword(value);
      } else if (name === 'confirmPassword') {
        setConfirmPassword(value);
      }
    };

    const handleRadioChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));
    };

    const handleFileInputChange = (e) => {
      const file = e.target.files[0];
      setFormData((prevData) => ({
        ...prevData,
        file: file,
      }));
    };

    const handleSubmit = async () => {
      console.warn("coming to on submit");
      const formDataToSend = new FormData();
      for (const [key, value] of Object.entries(formData)) {
        formDataToSend.append(key, value);
      }
      console.log("Total Data:");
for (const [key, value] of formDataToSend.entries()) {
console.log(`${key}:`, value);
}
try {
  // Send the FormData object to your backend using fetch or Axios
  const response = await fetch('http://localhost:8080/drivers/add', {
    method: 'POST',
    body: formDataToSend,
  });

  if (!response.ok) {
    throw new Error('Failed to send data to the server');
  }

  // Handle successful response
  console.log('Data sent successfully');
  
  handleClose();
  // const createdDriver = await response.json();

  //       // Update the state by adding the newly created vendor to the existing products
  //       setProducts([...products, createdDriver]);
  //       console.log("updated products after submission",products);
} catch (error) {
  // Handle errors
  console.error('Error sending data:', error);
}

    };

    function handleDocuments(){
      setModalOpen(true);
    }


return(
    <div className="body">
        <h2>Driver List</h2>
        <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
    {/* Add new vehicle button */}
    <Button variant="contained" color="primary" onClick={() => handleShow('add', null)}>
      Add New Driver
    </Button>
  </Grid>
</Grid>
        <TableContainer style={{ overflowX: 'auto' }}>
<Table>
  <TableHead>
    <TableRow>
      <TableCell><b>#</b></TableCell>
      <TableCell><b>NAME</b></TableCell>
      <TableCell><b>PHONE NUMBER</b></TableCell>
     
      <TableCell><b>VEHICLE ASSIGNED</b></TableCell>
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
      paginatedData.map((product, index) => (
        <React.Fragment key={index}>
          <TableRow>
            <TableCell>{index+1}</TableCell>
            <TableCell>{product.firstName} {product.lastName}</TableCell>
            <TableCell>{product.mobileNo}</TableCell>
            <TableCell>NA</TableCell>
           
            <TableCell>{product.status ? "Active" : "Inactive"}</TableCell>
            <TableCell><IconButton >
            <EditIcon onClick={() => handleShow('edit', product)} />
            </IconButton>
            <ListIcon onClick={() => handleDocuments(product.filePath)} ></ListIcon></TableCell>
            </TableRow>
            </React.Fragment>
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
<div style={{ backgroundColor: 'white', padding: '20px', paddingTop:'5px',borderRadius: '5px', maxWidth: '60%', maxHeight: '80%', overflow: 'auto' }}>
<h2>{formMode === 'add' ? 'Add Driver ' : 'Edit Driver'}</h2>
<Grid container spacing={2}>
  <Grid item xs={12}>
<RadioGroup
                  row
          
          name="driverType"
          value={(formData && formData.driverType)||''}
          onChange={handleRadioChange}
          className="removeBold"
          
        >
          
          <FormControlLabel value="own" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Own</span>}/>
          <FormControlLabel value="Vendor" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Vendor</span>} />
          </RadioGroup>
          </Grid>
      
      <Grid item xs={6}>
        <TextField
           InputProps={{
            startAdornment: (
            <InputAdornment position="start">
  
            </InputAdornment>
              ),
              }}
        variant="standard"
          label="Date Of Birth"
          name="dob"
          type='Date'
          value={(formData && formData.dob) || ''}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField

        variant="standard"
          label="DL Number"
          name="dlnumber"
          value={(formData && formData.dlnumber) || ''}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
        variant="standard"
          label="First Name"
          name="firstName"
          value={(formData && formData.firstName) || ''}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField

        variant="standard"
          label="Last Name"
          name="lastName"
          value={(formData && formData.lastName) || ''}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
        />
        </Grid>
        <Grid item xs={6}>
        <TextField

        variant="standard"
          label="Mobile Number"
          name="mobileNo"
          value={(formData && formData.mobileNo) || ''}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
      <Grid item xs={6}>
        <TextField

        variant="standard"
          label="Email Id"
          name="email"
          value={(formData && formData.email) || ''}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
        />
      </Grid>
     
        <Grid item xs={6}>
          <RadioGroup
          
            row
          aria-label="Gender"
          
          name="gender"
          value={(formData && formData.gender)||''}
          onChange={handleRadioChange}
          className="removeBold"
          
        >
          
          <FormControlLabel value="Male" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Male</span>}/>
          <FormControlLabel value="Female" control={<Radio />} label={<span style={{ fontSize: '14px' }}>Female</span>} />
          </RadioGroup>
          <Grid item xs={12}>
          <TextField
       InputProps={{
        startAdornment: (
        <InputAdornment position="start">

        </InputAdornment>
          ),
          }}

      variant="standard"
      label="Upload DL Copy"
      name="file"
      type='file'
      onChange={(e) => handleFileInputChange(e)}
      size='small'
     
      fullWidth
      required
      />
      </Grid>
          </Grid>
          {formMode === 'add' && (
          <Grid item xs={6}>
        <TextField

        variant="standard"
          label="Create Password"
          name="Password"
          value={(formData && formData.Password) || ''}
          size='small'
          onChange={handleInputChange}
          type='password'
          fullWidth
          required
        />
     
      <Grid item xs={12}>
        <TextField

        variant="standard"
          label="Confirm Password"
          name="confirmPassword"
          value={(formData && formData.confirmPassword) || ''}
          size='small'
          type='password'
          onChange={handleInputChange}
          fullWidth
          required
        />
        {confirmPassword && password !== confirmPassword && (
  <p style={{ color: 'red' }}>Passwords do not match</p>
)}

         </Grid>
      </Grid>
          )}
      
      
      <Grid item xs={12}>
      <Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button>
      </Grid>
      
      
      </Grid>
      
  
  
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
      products.map((doc, index) => (
          <TableRow key={doc.id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell>{doc.fileName}</TableCell>
            <TableCell>{doc.endDate}</TableCell>
            
            <TableCell><DownloadIcon /> 
            <DeleteIcon />
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
export default AddDriver;