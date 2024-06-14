

import React, { useState,useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';

 //import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap-select/dist/css/bootstrap-select.css';


import '../../../style.css';
import '../../../js/admin';
 //import '../allthemes.css';

const AddCustomer = () => {

  const [searchInput, setSearchInput] = useState('');
  const [searchOptions, setSearchOptions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:8080/branches');
            const result = await response.json();
           
            setSearchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
        } catch (error) {
            console.error('Error fetching data:', error);
           
        }
    };
    fetchData();
}, []);
  const [formData, setFormData] = useState({
    clientCode: '',
    clientName: '',
    clientGSTINId: '',
    client_pin_code: '',
    clientLocation: '',
    clientCity: '',
    clientState: '',
    clientCIN: '',
    clientContactPersonNo:'',
    clientContactEmail: '',
    clientContactPerson: '',
    clientEmailId: '',
    clientContactNo: '',
    client_PAN: '',
    branch: '', // Set a default value for branch
    client_GroupId:'',
  });

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    //console.log(`Updating ${name} to: ${value}`);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  


  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log('Form Data:', formData);
   try {
    await axios.post(
      'http://localhost:8080/clients',
      formData,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  
      // Handle the response as needed
      //console.log('API Response:', response.data);
      alert('Form submitted successfully');

      // Reset the form for a new entry
      resetForm();
    } catch (error) {
      // Handle errors
      console.error('Error:', error.message);
    }
  };
  const handleSearchChange = (selectedOption) => {
    if (selectedOption) {
        console.log("Selected branch number:", selectedOption.value);
        setSearchInput(selectedOption.value); // Set the searchInput as branch number
    }
};
  const resetForm = () => {
    // Implement the logic to reset your form fields
    // For example, you can set the form data to an empty object
    setFormData({
      clientCode: '',
      clientName: '',
      clientGSTINId: '',
      client_pin_code: '',
      clientLocation: '',
      clientCity: '',
      clientState: '',
      clientCIN: '',
      clientContactPersonNo:'',
      clientContactEmail: '',
      clientContactPerson: '',
      clientEmailId: '',
      clientContactNo: '',
      client_PAN: '',
      branch: '', // Set a default value for branch
      client_GroupId:'',


    });
  };
 // console.log(formData);
  return (
    <section className="content">
    <div className="container-fluid">
      <div className="block-header">
        <h2>Add Customer</h2>
      </div>
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="body">
              <h2 className="card-inside-title">Customer Details</h2>
              <form onSubmit={handleSubmit}>
                <div className="row clearfix">

                  <div className="col-md-6">
                    <p>
                      <b>Select Branch</b>
                    </p>
                    <Select
                                            value={searchOptions.find(option => option.value === searchInput)}
                                            onChange={handleSearchChange}
                                            options={searchOptions}
                                            placeholder="Search branch..."
                                            isClearable={true}
                                        />
                                    
                  </div>
                </div>
                <div className="row clearfix">
                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" value={formData.clientCode}
  onChange={handleChange}  name="clientCode" placeholder="Client Code" required/>
                                        </div>
                                    </div>
                                    </div>
               
                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientName" value={formData.clientName}
  onChange={handleChange} placeholder="Client Name" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientGSTINId" value={formData.clientGSTINId}
  onChange={handleChange}  placeholder="Client GST NO." required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                <div className="row clearfix">
                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control"  name="client_pin_code" value={formData.client_pin_code}
  onChange={handleChange} placeholder="Pin Code" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientLocation" value={formData.clientLocation}
  onChange={handleChange} placeholder="Location" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientCity" value={formData.clientCity}
  onChange={handleChange} placeholder="City" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientState" value={formData.clientState}
  onChange={handleChange} placeholder="State" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                
                <div className="row clearfix">
                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control"  placeholder="Client CIN" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientEmailId" value={formData.clientEmailId}
  onChange={handleChange} placeholder="Client Email" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientContactNo" value={formData.clientContactNo}
  onChange={handleChange} placeholder="Client Contact No." required/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                <div className="row clearfix">
                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientContactEmail" placeholder="Contact Person Emails" value={formData.clientContactEmail}
  onChange={handleChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="clientContactPersonNo" placeholder="Contact Person Number" value={formData.clientContactPersonNo}
  onChange={handleChange} required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="client_PAN" value={formData.client_PAN}
  onChange={handleChange} placeholder="Client PAN" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="client_GroupId" value={formData.client_GroupId}
  onChange={handleChange} placeholder="Client Group Id" required />
                                        </div>
                                    </div>
                                </div>
                                </div>
                            
               
                <button
                  className="btn btn-primary waves-effect"
                  type="submit"
                >
                  SUBMIT
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      
      </div>
      </section>
  );
};

export default AddCustomer;
