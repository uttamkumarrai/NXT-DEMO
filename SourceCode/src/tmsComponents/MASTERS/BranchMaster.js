import React, { useState} from 'react';

import  'jquery'
import axios from 'axios';
import {  Form,Button } from 'react-bootstrap';


const AddBranchForm = () => {
const [formData, setFormData] = useState({
    branchname: '',
    branchcode: '',
    branchaddress: '',
    branchGST: '',
    InchargeEmail:'',
    GroupId: '',
    InchargeContact:'',
   
    
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
        'http://localhost:8080/branches/create',
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
        branchname: '',
    branchcode: '',
    branchaddress: '',
    branchGST: '',
    InchargeEmail:'',
    GroupId: '',
    InchargeContact:'',
    });
  };
return (
  <section className="content">
    <div className="container-fluid">
      <div className="block-header">
        <h2>Branch Master</h2>
      </div>
      {/* Input */}
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="body">
              <h2 className="card-inside-title">Branch Details</h2>
              <Form onSubmit={handleSubmit}>
			  <div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="branchname" value={formData.branchname} onChange={handleChange} placeholder="Branch Name" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="branchcode" value={formData.branchcode} onChange={handleChange} placeholder="Branch Code" required />
                    </div>
                  </div>
                </div>
				</div>
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="branchaddress" value={formData.branchaddress} onChange={handleChange} placeholder="Branch Address" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="branchGST" value={formData.branchGST} onChange={handleChange} placeholder="Branch GST" required />
                    </div>
                  </div>
                </div>
				</div>
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="InchargeEmail" value={formData.InchargeEmail} onChange={handleChange} placeholder="Incharge Email Id" required/>
                    </div>
                  </div>
                  </div>
                  <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="InchargeContact" value={formData.InchargeContact} onChange={handleChange} placeholder="Incharge Contact Number" required/>
                    </div>
                  </div>
                </div>
                
				</div>
        <div className="row clearfix">
        <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="GroupId" value={formData.GroupId} onChange={handleChange} placeholder="Group Id" required/>
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
export default AddBranchForm;