// ConsignorConsigneeForm.js

import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';

//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap-select/dist/css/bootstrap-select.css';

import '../../../js/admin'; 
import '../../../style.css';


const ConsignorConsigneeForm = () => {
  const downloadFile = () => {
    // Specify the path to your Excel file within your project directory
    const filePath = '/sampleExcel/Book2.xlsx';
    // Create a link element
    const link = document.createElement('a');
    link.href = process.env.PUBLIC_URL + filePath; // Use PUBLIC_URL to get the correct path
    link.download = 'excel_file.xlsx'; // Specify the desired file name

    // Simulate a click on the link
    link.click();
  };


  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      await axios.post('http://localhost:8080/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('File uploaded successfully.');
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    }
  };


  const optionsSubBranch = [
    { value: 'BangalorePeeneya', label: 'Bangalore Peeneya' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Mumbai', label: 'Mumbai' },
  ];
  const [formData, setFormData] = useState({
    subBranch: '',
    downloadFormat: '',
    uploadFile: '',
    consignorName: '',
    gstNumber: '',
    panNumber: '',
    pinCode: '',
    location: '',
    city: '',
    state: '',
    address: '',
    contactPersonName: '',
    contactEmail: '',
    contactNo: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleChangeSelect = (selectedOption, fieldName) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: selectedOption.value, // Assuming your data structure has a 'value' property
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   // console.log('Form Data:', formData);
   try {
    await axios.post(
      'http://localhost:8080/consignor/create',
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

  useEffect(() => {
    // Ensure jQuery is loaded before initializing scripts
    if (window.jQuery) {
      // Initialize Bootstrap components or other scripts here
      // Example: $('.selectpicker').selectpicker();
      // Example: $('#yourElement').yourPlugin();
    } else {
      console.error('jQuery is not available. Make sure it is properly loaded.');
    }
  }, []);
  const resetForm = () => {
    // Implement the logic to reset your form fields
    // For example, you can set the form data to an empty object
    setFormData({
        subBranch: '',
        downloadFormat: '',
        uploadFile: '',
        consignorName: '',
        gstNumber: '',
        panNumber: '',
        pinCode: '',
        location: '',
        city: '',
        state: '',
        address: '',
        contactPersonName: '',
        contactEmail: '',
        contactNo: '',


    });
  };
  return (
    <section className="content">
      <div className="container-fluid">
        <div className="block-header">
          <h2>Add Consignor/Consignee</h2>
        </div>
        <div className="row clearfix">
          <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
            <div className="card">
              <div className="body">
                <h2 className="card-inside-title">Consignor/Consignee Details</h2>
                <Form onSubmit={handleSubmit}>
                  <div className="row clearfix">
                    <div className="col-md-6">
                      <p>
                        <b>Select Sub Branch</b>
                      </p>
                      <Select
          
          name="subBranch"
          value={optionsSubBranch.find(option => option.value === formData.subBranch)}
          onChange={(selectedOption) => handleChangeSelect(selectedOption, 'sub_branch_name')}
          options={optionsSubBranch}
          isSearchable
          placeholder="Select Sub Branch" required
        />
                    </div>
                    <div className="col-md-2">
                      <button className="btn btn-success waves-effect" onClick={downloadFile}>
                        Download Format
                      </button>
                    </div>
                    <div className="col-md-4">
                      <input
                        type="file"
                        className="form-control"
                        placeholder="Upload File"
                        onChange={handleFileChange}
                        name="uploadFile"
                        value={formData.uploadFile}
                      />
                       <button onClick={handleUpload}>Upload</button>
                    </div>
                  </div>
                  {/* ... Add the rest of your form fields as needed */}
                  <div className="row clearfix">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="consignorName" value={formData.consignorName} onChange={handleChange} placeholder="Consignor/Consigne Name" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="gstNumber" value={formData.gstNumber} onChange={handleChange} placeholder="GST Number" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="panNumber" value={formData.panNumber} onChange={handleChange} placeholder="PAN Number." required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row clearfix">
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="pinCode" value={formData.pinCode} onChange={handleChange} placeholder="Pin Code" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="city" value={formData.city} onChange={handleChange} placeholder="City" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-3">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="state" value={formData.state} onChange={handleChange} placeholder="State" required />
                                        </div>
                                    </div>
                                </div>
                            </div>
							<div className="row clearfix">
                                <div className="col-sm-12">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} placeholder="Address" required />
                                        </div>
                                    </div>
                                </div>
							</div>
							 <div className="row clearfix">
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="contactPersonName" value={formData.contactPersonName} onChange={handleChange} placeholder="Contact Person Name" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="contactEmail" value={formData.contactEmail} onChange={handleChange} placeholder="Contact Email" required/>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-sm-4">
                                    <div className="form-group">
                                        <div className="form-line">
                                            <input type="text" className="form-control" name="contactNo" value={formData.contactNo} onChange={handleChange} placeholder=" Contact No." required />
                                        </div>
                                    </div>
                                </div>
                            </div>
                  <Button type="submit" className="btn btn-success waves-effect">
                    SUBMIT
                  </Button>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
   
  );
};

export default ConsignorConsigneeForm;
