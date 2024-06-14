import React, { useState,useEffect} from 'react';
import Select from 'react-select';
import  'jquery'
import Switch from 'react-switch';

/* import $ from 'jquery';
import 'bootstrap';
import 'bootstrap-select';
import 'jquery-slimscroll';
import 'node-waves';
import 'autosize';
import moment from 'moment';
import 'bootstrap-material-datetimepicker';
import 'bootstrap-datepicker';
 */
// Your other code...



import * as Yup from 'yup';
import axios from 'axios';
import {  Form,Button } from 'react-bootstrap';
//import 'bootstrap/dist/css/bootstrap.min.css';
//import 'bootstrap-select/dist/css/bootstrap-select.css';
//import 'jquery-slimscroll';
import '../../../js/admin'; 
import '../../../js/demo';

import '../../../style.css';
//import '../allthemes.css';

// Import Bootstrap Material Design JavaScript


// Initialize Bootstrap Material Design components
//$.material.init();



const validationSchema = Yup.object().shape({
  branch_name: Yup.string().required('Branch is required'),
  sub_branch_name: Yup.string().required('Sub Branch is required'),
  empid: Yup.string().required('Employee Code is required'),
  empname: Yup.string().required('Employee Name is required'),
  depatment: Yup.string().required('Department is required'),
  designation: Yup.string().required('Designation is required'),
  phone: Yup.string().required('Contact Number is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  status: Yup.string().required('Status is required'),
  employee_role_type: Yup.string().required('Employee Role Type is required'),
});


const AddUserForm = () => {
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

    const handleSearchChange = (selectedOption) => {
      console.log("Selected branch number:", selectedOption.value);
      setSearchInput(selectedOption.value); // Set the searchInput as branch number
  };


  const [searchInputSubBranch, setSearchInputSubBranch] = useState('');

  const [searchOptionsSubBranch, setSearchOptionsSubBranch] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
            
            let url = 'http://localhost:8080/SubBranches';
            // If a branch is selected, add it as a query parameter to the URL
            if (searchInput) {
                url += `/${searchInput}`;
            }
            console.log("Fetching data from URL:", url);
            const response = await fetch(url);
            const result = await response.json();

              
             
              setSearchOptionsSubBranch(result.map(product => ({ value: product.subBranchname, label: product.subBranchname })));
          } catch (error) {
              console.error('Error fetching data:', error);
             
          }
      };
      fetchData();
    }, [searchInput]);

  const handleSearchChangeSubBranch = (selectedOption) => {
    console.log("Selected branch number:", selectedOption.value);
    setSearchInputSubBranch(selectedOption.value); // Set the searchInput as branch number
};

  const [formData, setFormData] = useState({
    sub_branch_name: '',
    branch_name: '',
    empid: '',
    empname: '',
    depatment: '',
    designation: '',
    phone: '',
    email: '',
    employee_role_type: '',
    status:'false',
    
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSwitchChange = (checked) => {
    setFormData({ ...formData, status: checked });
  };

   

  const handleRadioChange = (e) => {
    setFormData({
      ...formData,
      employee_role_type: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
   
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      await axios.post(
        'http://localhost:8080/users/create',
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
      sub_branch_name: '',
      branch_name: '',
      empid: '',
      empname: '',
      depatment: '',
      designation: '',
      phone: '',
      email: '',
      employee_role_type: '',
      status:'',
    });
  };

  





  return (
    <section className="content">
    <div className="container-fluid">
      <div className="block-header">
        <h2>Add Users</h2>
      </div>
      {/* Input */}
      <div className="row clearfix">
        <div className="col-lg-12 col-md-12 col-sm-12 col-xs-12">
          <div className="card">
            <div className="body">
              <h2 className="card-inside-title">User Details</h2>
              <Form onSubmit={handleSubmit}>
              <div className="row clearfix">
                <div className="col-sm-6">
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
      <div className="col-md-6">
        <p>
          <b>Select Sub Branch</b>
        </p>
        <Select
                                            value={searchOptionsSubBranch.find(option => option.value === searchInputSubBranch)}
                                            onChange={handleSearchChangeSubBranch}
                                            options={searchOptionsSubBranch}
                                            placeholder="Search Sub branch..."
                                            isClearable={true}
                                        />
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-sm-4">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="empid" value={formData.empid} onChange={handleChange} placeholder="Employee Code" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="empname" value={formData.empname} onChange={handleChange} placeholder="Employee Name" required />
                    </div>
                  </div>
                </div>
                <div className="col-sm-4">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="depatment" value={formData.depatment} onChange={handleChange} placeholder="Department"  required/>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} placeholder="Designation" required />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="phone" value={formData.phone} onChange={handleChange} placeholder="Contact Number" required/>
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="form-line">
                      <input type="text" className="form-control" name="email" value={formData.email} onChange={handleChange} autocomplete="off" placeholder="Email" required />
                    </div>
                  </div>
                </div>
                <div className="col-sm-3">
                  <div className="form-group">
                    <div className="form-line">
                    <label>Status</label>
                    <Switch
            checked={formData.status}
            onChange={handleSwitchChange}
            handleDiameter={28} // Adjust handle diameter for better click effect
            uncheckedIcon={false}
            checkedIcon={false}
            height={20}
            width={48}
            onColor="#007bff" // Set the color when switch is on
            offColor="#ccc"
          />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row clearfix">
                <div className="col-sm-12">
                  <div className="demo-radio-button">
                    <div className="form-line">
                    <input
              type="radio"
              name="employee_role_type"
              checked={formData.employee_role_type === 'Adminstration'}
              value="Adminstration"
              id="radio_1"
              onChange={handleRadioChange} 
            />
            <label htmlFor="radio_1">Adminstration</label>

            <input
              type="radio"
              name="employee_role_type"
              checked={formData.employee_role_type === 'BranchHead'}
              value="BranchHead"
              id="radio_2"
              onChange={handleRadioChange}
            />
            <label htmlFor="radio_2">Branch Head</label>

            <input
              type="radio"
              name="employee_role_type"
              checked={formData.employee_role_type === 'BranchAdmin'}
              value="BranchAdmin"
              id="radio_3"
              onChange={handleRadioChange}
            />
            <label htmlFor="radio_3">Branch Admin</label>

            <input
              type="radio"
              name="employee_role_type"
              checked={formData.employee_role_type === 'BranchUser'}
              value="BranchUser"
              id="radio_4"
              onChange={handleRadioChange}
            />
            <label htmlFor="radio_4">Branch User</label>
                    </div>
                  </div>
                </div>
              </div>
           
      {/* #END# Input */}
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

export default AddUserForm;
