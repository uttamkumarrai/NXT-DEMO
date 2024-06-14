import React, { useState} from 'react';

import  'jquery'
import axios from 'axios';
import {  Form,Button } from 'react-bootstrap';
// import '../../../js/admin'; 
// import '../../../js/demo';

// import '../../../style.css';

const AddSubBranchForm = () => {
const [formData, setFormData] = useState({
    subBranchname: '',
    subBranchaddress: '',
    reportingbranch: '',
    
   
    
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
        'http://localhost:8080/SubBranches/create',
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
  subBranchname: '',
    subBranchaddress: '',
    reportingbranch: '',
    });
  };
return (
  <section className="content">
    <div className="container-fluid">
      <div className="block-header">
        <h2>Sub Branch Master</h2>
      </div>
      {/* Input */}
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="body">
              <h2 className="card-inside-title">Sub Branch Details</h2>
              <Form onSubmit={handleSubmit}>
			  <div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="subBranchname" value={formData.subBranchname} onChange={handleChange} placeholder="Sub Branch Name" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="subBranchaddress" value={formData.subBranchaddress} onChange={handleChange} placeholder="Sub Branch Address" required />
                    </div>
                  </div>
                </div>
				</div>
				<div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="reportingbranch" value={formData.reportingbranch} onChange={handleChange} placeholder="Reporting Branch" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="InchargeEmail" value={formData.InchargeEmail} onChange={handleChange} placeholder="Incharge Email" required/>
                    </div>
                  </div>
                </div>
               </div>
               <div className="row clearfix">
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="InchargeContact" value={formData.InchargeContact} onChange={handleChange} placeholder="Incharge Contact Number" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-6">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="groupId" value={formData.groupId} onChange={handleChange} placeholder="Group Id" required/>
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
export default AddSubBranchForm;