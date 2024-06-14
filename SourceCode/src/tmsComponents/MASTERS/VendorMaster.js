import React, { useState} from 'react';

import  'jquery'
import axios from 'axios';
import {  Form,Button } from 'react-bootstrap';
import '../../../js/admin'; 
import '../../../js/demo';

import '../../../style.css';

const AddVendorForm = () => {
const [formData, setFormData] = useState({
    gstin: '',
    vrfCode: '',
    vendorName: '',
    contactName: '',
    mobileNo: '',
    email: '',
    cin: '',
    pan: '',
    discountAmount: '',
    discountPercentage:'',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
    const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      
      await axios.post(
        'http://localhost:8080/vendors/create',
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
        gstin: '',
        vrfCode: '',
        vendorName: '',
        contactName: '',
        mobileNo: '',
        email: '',
        cin: '',
        pan: '',
        discountAmount: '',
        discountPercentage:'',
    });
  };
return (
  <section className="content">
    <div className="container-fluid">
      <div className="block-header">
        <h2>Vendor Master</h2>
      </div>
      {/* Input */}
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="body">
              <h2 className="card-inside-title">Vendor Details</h2>
              <Form onSubmit={handleSubmit}>
			  <div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="GSTIN" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="vrfCode" value={formData.vrfCode} onChange={handleChange} placeholder="Vendor Code" required />
                    </div>
                  </div>
                </div>
				</div>
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="vendorName" value={formData.vendorName} onChange={handleChange} placeholder="Vendor Name" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="contactName" value={formData.contactName} onChange={handleChange} placeholder="Contact Name" required />
                    </div>
                  </div>
                </div>
				</div>
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="mobileNo" value={formData.mobileNo} onChange={handleChange} placeholder="Contact Number" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
                    </div>
                  </div>
                </div>
				</div>
				
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="cin" value={formData.cin} onChange={handleChange} placeholder="CIN No" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="pan" value={formData.pan} onChange={handleChange} placeholder="PAN No" required />
                    </div>
                  </div>
                </div>
				</div>
				
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="discountAmount" value={formData.discountAmount} onChange={handleChange} placeholder="Discount Amount" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="discountPercentage" value={formData.discountPercentage} onChange={handleChange} placeholder="Discount Percentage" required />
                    </div>
                  </div>
                </div>
				</div>
				<Button className="btn btn-success waves-effect" type="submit">
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
export default AddVendorForm;