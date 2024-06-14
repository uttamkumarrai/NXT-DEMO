import React, { useState, useEffect, useContext } from 'react';
import ReactPaginate from 'react-paginate';
import MenuItem from '@mui/material/MenuItem';
import {Select, FormControl, InputLabel} from '@mui/material';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { Grid } from '@mui/material';
import Switch from '@mui/material/Switch';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import './MasterStyles.css';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import { FormHelperText } from '@material-ui/core';
import useStyles from '../../centralized_Components/arrowStyle';
import CloseIcon from '@mui/icons-material/Close';
import useValidations from '../../centralized_Components/Validations';
import UserContext from '../../Context/UserContext';

const AddUserList = () => {
  const classes = useStyles();

  const { userDetails, login, logout } = useContext(UserContext);
  const { emailError,nameError,mobileError, validateEmail, validateName, validateMobile } = useValidations();
    const [show, setShow] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
      empid:'',
      empname:'',
      department:'',
      designation:'',
      phone:'',
      email:'',
      
      branch_name:'',
      sub_branch_name:'',
      
    });
    const [formData, setFormData] = useState({
     
      employeeRoleType: '',

      status:true,
      
      
    });
    

   
    const handleClose = () => {
        setShow(false);
        setSelectedUser(''); // Reset selected user data when modal is closed
        setFormData('');
       
        setSearchBranch('');
        setSearchSubBranch('');
        setValidated(false);
    };

    
    
 
    const [validated, setValidated] = useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [searchBranch, setSearchBranch] = useState('');
  const [searchSubBranch, setSearchSubBranch] = useState('');
 
  const [BranchOptions, setBranchOptions] = useState([]);
  const [SubBranchOptions, setSubBranchOptions] = useState([]);



    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.FETCH_DATA+'branches');
                const result = await response.json();
               //setSearchOptions(userDetails.branchid);
                 setSearchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
                setBranchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
      if (userDetails && userDetails.branchid) {
        setSearchInput(userDetails.branchid);
      }
    }, [userDetails]);

    const handleBranchChange = async (event) => {
      const selectedOption = BranchOptions.find(option => option.value === event.target.value);
      setSelectedUser(prevState => ({
        ...prevState,
        branch_name: selectedOption.label,
    }))

      console.log("handle branch", selectedUser);
      if (selectedOption) {
        setSearchBranch(selectedOption.value); // Update searchBranch with the selected branch value
       

        try {
          const response = await fetch(API_ENDPOINTS.FETCH_DATA+'SubBranches/' + selectedOption.value);
          const result = await response.json();
          // const defaultBranchId = result[0]?.id || '';
          // setSearchSubBranch(defaultBranchId);
          setSubBranchOptions(result.map(product => ({ value: product.id, label: product.subBranchname })));
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        // Handle case when no branch is selected
        setSearchBranch(''); // Reset searchBranch if no branch is selected
        setSubBranchOptions([]); // Reset sub-branch options
       
      }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
              let url= API_ENDPOINTS.FETCH_DATA;
              if(searchInput==="All"){
                 url +='users';
              }
               
                else if (searchInput) {
                    url += 'users'+`/${searchInput}`;
                }else if(userDetails.branchid){
                  url+='users'+`/${userDetails.branchid}`;
                }
                console.log("Fetching data from URL:", url);
                const response = await fetch(url);
                const result = await response.json();
                setProducts(result);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [searchInput]); // Fetch data whenever searchInput changes

    const handlePageChange = (selectedPage) => {
      const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
      if (!isNaN(pageNumber)) {
          setCurrentPage(pageNumber);
      } else {
          console.error("Invalid page number:", selectedPage.target.textContent);
      }
    };

    const handleSearchChange = async(e) => {
      console.log("the selected branch",e.target.value);
      
        
        setSearchInput(e.target.value);
        console.log(searchInput);
        setCurrentPage(0);
  
};

    const paginatedData = products.slice(currentPage * perPage, (currentPage + 1) * perPage);



    const handleShow = (mode, product) => {
      console.log(product);
      setShow(true);
      setFormMode(mode);
      if(mode==='edit'){
      setSelectedUser(product ? {
        id:product.id || '',
        empid: product.empid || '',
        empname: product.empname || '',
        department: product.department || '',
        designation: product.designation || '',
        phone: product.phone || '',
        email: product.email || '',
       
      } : '');
      setFormData(product ? {
        status: product.status || false,
        employeeRoleType: product.employeeRoleType || '',
      } : '');
     
    
     
         
       
      }
    };
    

    const handleSaveChanges = async (event) => {
      event.preventDefault();
    

      let valid = true;

  // Validate Branch dropdown
  if (!searchBranch) {
    valid = false;
  }

  // Validate Sub Branch dropdown
  if (!searchSubBranch) {
    valid = false;
  }

 

  // Validate other fields in selectedUser
  for (const [fieldName, fieldValue] of Object.entries(selectedUser)) {
    if (typeof fieldValue === 'string') {
    if (fieldValue.trim() === '') {
      valid = false;
    }
  }

}
  // Validate employee role type
  if (!formData.employeeRoleType) {
    valid = false;
  }

  
  const isEmailValid = validateEmail(selectedUser.email);

  const isNameValid = validateName(selectedUser.empname);
  const isMobileValid = validateMobile(selectedUser.phone);
  valid = valid && isEmailValid && isNameValid && isMobileValid ;
 

  if (!valid) {
    setValidated(true);
    return;
  }

  setValidated(false);
  console.log(validated);
      try {
        

      const userData = {
        ...selectedUser,
       branchid:searchBranch,
       sub_branchid:searchSubBranch,
        ...formData
      };
      console.log("UserData values:", userData);

        let url = '';
        let method = '';

       
            url = API_ENDPOINTS.FETCH_DATA + 'users/create';
            method = 'POST';
       

        const response = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(userData),
        });

        if (!response.ok) {
            throw new Error('Failed to save changes');
        }
        handleClose();
        if (formMode === 'add') {
          window.showToast("User Created Successfully", "success");

            
        
        
        }else{
          window.showToast("User Updated Successfully", "success");
        }
        const createdUser = await response.json();

        // Update the state by adding the newly created cosignor to the existing products
        setProducts([...products, createdUser]);

        const totalPages = Math.ceil((products.length) / perPage);

    // Set current page to last page where new branch is added
    setCurrentPage(totalPages);

      } catch (error) {
          console.error('Error updating user data:', error);
          // Optionally, you can display an error message to the user
      }
  };
    
  const handleSubBranch=async(event)=>{
    setSearchSubBranch(event.target.value);
    const selectedOption = SubBranchOptions.find(option => option.value === event.target.value);
    setSelectedUser(prevState => ({
      ...prevState,
      sub_branch_name: selectedOption.label,
  }))

    // console.log("sub Branch",searchSubBranch);
    };

  const handleInputChange = (e) => {
    console.log("input change");
    
    const { name, value } = e.target;

    switch (name) {
     
      case 'email':
        validateEmail(value);
        break;
      
      case 'empname':
        validateName(value);
        break;
      case 'phone':
        validateMobile(value);
        break;
      default:
        break;
    }
    
    
    setSelectedUser(prevSelectedUser => ({ ...prevSelectedUser, [name]: value }));
  
    // Log the selectedUser object after setting the new value
    console.log("after setting ", selectedUser);
  };
    const handleSwitchChange = (e) => {
      setFormData({ ...formData, status: e.target.checked });
      console.log(formData);
    };

    const handleRadioChange = (e) => {
      console.log("admin selected1: " + e.target.value);
     
     
        setFormData({
          ...formData,
          employeeRoleType: e.target.value,
         
      
    });
  

  
    };

    return (
        


                            <div className="body">
                                <h2>User List</h2>
                                      
                                        <Grid container spacing={2} >
                                            <Grid item xs={4}>
                                            <FormControl fullWidth>
      <InputLabel id="Branch" >Select Branch</InputLabel>

        <Select
          labelId="Branch"
          
          value={searchInput}
          variant="standard"
          onChange={handleSearchChange}
         
        >
           <MenuItem value="All">
                    <em>All</em>
                </MenuItem>
          {searchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      
    </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                   
                                    
                                   <Button variant="contained" color="warning" onClick={() => handleShow('add', null)}>ADD NEW USER</Button>
                               </Grid>
                               </Grid>
                               <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell><b>EMPLOYEE NAME</b></TableCell>
                                      <TableCell><b>EMPLOYEE CODE</b></TableCell>
                                      <TableCell><b>DEPARTMENT</b></TableCell>
                                      <TableCell><b>BRANCH NAME</b></TableCell>
                                      <TableCell><b>EMAIL</b></TableCell>
                                      <TableCell><b>ACTION</b></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                  {loading ? (
                                    <TableRow>
                                      <TableCell>Loading...</TableCell>
                                    </TableRow>
                                    ) : (
                                    paginatedData.map((product, index) => (
                                        <TableRow key={index}>
                                          <TableCell>{product.empname}</TableCell>
                                          <TableCell>{product.empid}</TableCell>
                                          <TableCell>{product.department}</TableCell>
                                          <TableCell>{product.branch_name}</TableCell>
                                          <TableCell>{product.email}</TableCell>
                                          <TableCell><IconButton onClick={() => handleShow('edit', product)}>
      <EditIcon />
    </IconButton>
                                            </TableCell>
                                        </TableRow>
                                          ))
                                        )}


                                  </TableBody>
                                </Table>
                               </TableContainer>
                               {products.length > 0 ? (
    <Pagination count={Math.ceil(products.length / perPage)} page={currentPage + 1} onChange={handlePageChange} color="primary"/>
) : (
    <p>No data available</p>
)}
 <Modal
      open={show}
      onClose={handleClose}
      BackdropProps={{
        onClick: (event) => {
          event.stopPropagation();
        },
      }}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '80%', maxHeight: '80%', overflow: 'auto', marginTop: '40px' }}>
        <IconButton
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            color: 'red',
          }}
        >
          <CloseIcon />
        </IconButton>
   
   <h2>{formMode === 'add' ? 'Add User Master' : 'Edit User Master'}</h2>
       
        <form noValidate  onSubmit={handleSaveChanges}>


<Grid container spacing={2}>
      <Grid item xs={3}>
      <FormControl fullWidth  error={!!(validated && !searchBranch)}>
      <InputLabel id="SelectBranch" >Select Branch*</InputLabel>

        <Select
          labelId="SelectBranch"
          
          value={searchBranch}
          variant="standard"
          onChange={handleBranchChange}
         required
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
        {validated && !searchBranch && (
    <FormHelperText  style={{ color: '#d32f2f' }}>Please select a branch.</FormHelperText>
  )}
    </FormControl>
      </Grid>

      <Grid item xs={3}>
            <FormControl fullWidth error={!!(validated && !searchSubBranch)}>
            <InputLabel id="SubBranch" >Select Sub Branch*</InputLabel>

        <Select
          labelId="SubBranch"
          value={searchSubBranch}
          variant="standard"
          onChange={handleSubBranch}
        required
        >
           <MenuItem value="">
                    <em>None</em>
                </MenuItem>
          {SubBranchOptions.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {validated && !searchSubBranch && (
          <FormHelperText  style={{ color: '#d32f2f' }}>Please select a sub-branch.</FormHelperText>
        )}
      
    </FormControl>
            </Grid>
      <Grid item xs={3}>
        <TextField
         type="number"
         className={classes.noArrows}
        variant="standard"
          label="Employee Code"
          name="empid"
          value={selectedUser.empid}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
          error={!!(validated && selectedUser.empid === '')}
          helperText={validated && selectedUser.empid === '' ? 'Please Enter Empid.' : ''}
          inputProps={{ pattern: "[0-9]*" }}

        />
      </Grid>
      <Grid item xs={3}>
        <TextField
        variant="standard"
          label="Employee Name"
          name="empname"
          value={ selectedUser.empname}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
          error={validated && (selectedUser.empname === '' || !!nameError)}
          helperText={validated && (selectedUser.empname === '' ? 'Please Enter User Name.' : nameError)}
          
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
        variant="standard"
          label="Department"
          name="department"
          value={ selectedUser.department}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
          error={!!(validated && selectedUser.department === '')}
          helperText={validated && selectedUser.department === '' ? 'Please Enter Department.' : ''}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
        variant="standard"
          label="Designation"
          name="designation"
          value={selectedUser.designation}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
          error={!!(validated && selectedUser.designation === '')}
          helperText={validated && selectedUser.designation === '' ? 'Please Enter Designation.' : ''}
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
         type="number"
         className={classes.noArrows}
        variant="standard"
          label="Contact Number"
          name="phone"
          value={selectedUser.phone}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
          error={validated && (selectedUser.phone === '' || !!mobileError)}
          helperText={validated && (selectedUser.phone === '' ? 'Please Enter Contact Number.' : mobileError)}
          
        />
      </Grid>
      <Grid item xs={3}>
        <TextField
        type='email'
        variant="standard"
          label="Email"
          name="email"
          value={selectedUser.email}
          size='small'
          onChange={handleInputChange}
          fullWidth
          required
          error={validated && (selectedUser.email === '' || !!emailError)}
          helperText={validated && (selectedUser.email === '' ? 'Please Enter Email.' : emailError)}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControlLabel
          control={
            <Switch
            checked={formData ? formData.status === true : false}
              onChange={handleSwitchChange}
              required
            />
          }
          label="Status"
        />
      </Grid>
      <Grid item xs={4}>
        <RadioGroup
          aria-label="employee_role_type"
          name="employeeRoleType"
          value={(formData  && formData.employeeRoleType)||''}
          onChange={handleRadioChange}
          required
         
         
          
        >
          
          <FormControlLabel value="1" control={<Radio />} label="Adminstration" />
          <FormControlLabel value="2" control={<Radio />} label="Branch Head" />
          <FormControlLabel value="3" control={<Radio />} label="Branch Admin" />
          <FormControlLabel value="4" control={<Radio />} label="Branch User" />
        </RadioGroup>
        {validated && !(formData && formData.employeeRoleType) && (
  <FormHelperText style={{ color: '#d32f2f' }}>Please select an employee role type.</FormHelperText>
)}
      </Grid>
     
      </Grid>
    <Button variant="contained" type="submit" className='modal-botton'>{formMode === 'add' ? 'Submit' : 'Update'}</Button>
   
    </form>

    </div>
    </Modal>
    </div>
    );
};

export default AddUserList;