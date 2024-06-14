import React, { useState} from 'react';

import  'jquery'
import axios from 'axios';
import Button from '@mui/material/Button';

import TextField from '@mui/material/TextField';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';

// import '../../../js/admin'; 
// import '../../../js/demo';

// import '../../../style.css';

const AddLocationForm = () => {
const [formData, setFormData] = useState({
    location_PinCode: '',
    state_Id: '',
    city_Id: '',
	location_Name:'',
    
   
    
  });

  const handleChange = (e) => {
    console.log("handle change ");
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      console.log("handle submit ");
      
      await axios.post(
        'http://localhost:8080/locations/create',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      // Handle the response as needed
      alert('Form submitted successfully');

      // Reset the form for a new entry
      resetForm();
    } catch (error) {
      console.error('Validation Error:', error);
      if (error.inner) {
        error.inner.forEach((e) => {
          console.error(`Field: ${e.path}, Error: ${e.message}`);
        });
      }
    }
  }
  
  const resetForm = () => {
    setFormData({
    location_PinCode: '',
    state_Id: '',
    city_Id: '',
	location_Name:'',
    });
  };
return (
  
      
            <div className="body">
            <h2>Location Master</h2>
            
              <form onSubmit={handleSubmit}>
              <TextField label="Location Pincode" name="location_PinCode" fullWidth value={formData.location_PinCode} onChange={handleChange} required className="textfield-margin" />
              <TextField label="State" name="state_Id" fullWidth value={formData.state_Id} onChange={handleChange} required className="textfield-margin" />
              <TextField label="City" name="city_Id" fullWidth value={formData.city_Id} onChange={handleChange} required className="textfield-margin" />
              <TextField label="Location Name" name="location_Name" fullWidth value={formData.location_Name} onChange={handleChange} required className="textfield-margin" />
			 

              
				<Button variant="contained" type="submit">
        SUBMIT
      </Button>
      </form>
      </div>
    
  );
};
export default AddLocationForm;