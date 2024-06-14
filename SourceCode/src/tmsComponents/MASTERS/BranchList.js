import React, { useState, useContext,useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select'; // Import react-select
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';

import { TableBody, TableCell, TableRow, Grid } from '@mui/material';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import EditIcon from '@mui/icons-material/Edit';

import {IconButton} from '@mui/material';
import { useToast } from '../../Toast/toast';
import useStyles from '../../centralized_Components/arrowStyle';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import useValidations from '../../centralized_Components/Validations';
import UserContext from '../../Context/UserContext';

const AddBranchList = () => {
    const classes = useStyles();
    const { userDetails, login, logout } = useContext(UserContext);


    const [selectedBranch, setSelectedBranch] = useState({
        branchname:'',
        branchid:'',
        branchcode:'',
        branchaddress:'',
        branchGST:'',
        InchargeEmail:'',
        InchargeContact:'',
        GroupId:'',
        lrPrefix:'',
    });
    const {gstError,mobileError,nameError,emailError, validateGST, validateEmail,validateName, validateMobile } = useValidations();

      const handleClose = () => {
        setShow(false);
        setSelectedBranch(''); // Reset selected user data when modal is closed
        setCheckboxData(false);
    };

  
    const [validated, setValidated] = useState(false);
    const { showToast } = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const [checkboxData,setCheckboxData]=useState({
        notificationSms:false,
        notificationEmail:false,
        
  
      });


    const fetchData = async () => {
        try {
            let url = API_ENDPOINTS.FETCH_DATA + 'branches';
            if (searchInput) {
                url += `/Bybranchid/${searchInput}`;
            }
            const response = await fetch(url);
            const result = await response.json();
            
            if (Array.isArray(result)) {
                setProducts(result);
            } else {
                // If the response is not an array, assume it's a single branch object
                setProducts([result]);
            }
            setLoading(false);
            setSearchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };




    useEffect(() => {
    
        fetchData();
    }, [searchInput]);

    

    const handlePageChange = (selectedPage) => {
        const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber);
        } else {
            console.error("Invalid page number:", selectedPage.target.textContent);
        }
    };

    const paginatedData = products.slice(currentPage * perPage, (currentPage + 1) * perPage);
    const handleSearchChange = (selectedOption) => {
        if (selectedOption !== null && selectedOption !== undefined) {
            console.log(selectedOption.value);
            setSearchInput(selectedOption.value);
            setCurrentPage(0); // Reset currentPage to 0 when branch selection changes
        } else {
            setSearchInput('');
        }
    };

    
    const handleShow = (mode, product) => {
        setShow(true);
        setFormMode(mode);
        if(formMode==='edit'){
            setSelectedBranch({
                ...product,
                lrPrefix: product.lrPrefix || '',
                GroupId: product.GroupId || '', // Ensure lrPrefix is never null
            });
        setCheckboxData(product ? {
            notificationEmail: product.notificationEmail || false,
            notificationSms:product.notificationSms || false,
        } : null);
        }
        
    };
const handleInputChange=(e)=>{
    const { name, value } = e.target;
    setSelectedBranch(prevSelectedBranch => ({ ...prevSelectedBranch, [name]: value }));
    switch (name) {
     
        case 'branchname':
          validateName(value);
          break;
        
        case 'branchGST':
          validateGST(value);
          break;
        case 'InchargeEmail':
            validateEmail(value);
          break;
        case 'InchargeContact':
            validateMobile(value);
            break;
        default:
          break;
      }

  


};

    const [errors, setErrors] = useState({});

    const handleSaveChanges = async (e) => {

        console.log(selectedBranch);
        e.preventDefault(); // Prevent default form submission

        let valid = true;
        for (const [fieldName, fieldValue] of Object.entries(selectedBranch)) {
            if (typeof fieldValue === 'string' || fieldValue === null) {
                if (fieldValue !== null && fieldValue.trim() === '') {
                    valid = false;
                    break;
                }  else {
                    // If fieldValue is neither a string nor null
                    valid = false;
                    break;
                }
             
            
          }
        }

          const isEmailValid = validateEmail(selectedBranch.InchargeEmail);

          const isNameValid = validateName(selectedBranch.branchname);
          const isMobileValid = validateMobile(selectedBranch.InchargeContact);
          const isGstValid=validateGST(selectedBranch.branchGST);
          valid = valid && isEmailValid && isNameValid && isMobileValid && isGstValid;
        



        
          if (!valid) {
            setValidated(true);
            return;
          }        


          
          setValidated(false);

      console.log(validated);
        try{
            
        let url = '';
        let method = '';

        url = API_ENDPOINTS.FETCH_DATA + 'branches/create';
            method = 'POST';

            const userData = {
                ...selectedBranch,
                ...checkboxData,
            }
            console.log(userData);

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

                window.showToast("Branch Created Successfully", "success");
                }else{
                    fetchData();
                    window.showToast("Branch Updated Successfully", "success");
                }
            const createdBranch = await response.json();

            // Update the state by adding the newly created cosignor to the existing products
            if(formMode==='add'){
                 setProducts([...products, createdBranch]);

           }else{
            fetchData();
           }
           //else{
        //         setProducts(prevProducts => {
        //             const productIndex = prevProducts.findIndex(product => product.id === createdBranch.id);
        //             if (productIndex !== -1) {
        //               // Update the existing product
        //               const updatedProducts = [...prevProducts];
        //               updatedProducts[productIndex] = createdBranch;
        //               return updatedProducts;
        //             }
        //     })
        // }
           

            //const totalPages = Math.ceil((products.length) / perPage);

        // Set current page to last page where new branch is added
      //  setCurrentPage(totalPages);

        
        // console.log(selectedBranch.branchid)
        //   const updatedUserDataResponse = await fetch(API_ENDPOINTS.FETCH_DATA+`branches/Bybranchid/${selectedBranch.branchid}`);
        // if (!updatedUserDataResponse.ok) {
        //     throw new Error('Failed to fetch updated Branch data');
        // }
        // const updatedUserData = await updatedUserDataResponse.json();

        // // Update the table data with the updated user data
        // const updatedProducts = products.map(product => {
        //     if (product.id === selectedBranch.id) {
        //         return updatedUserData;
        //     }
        //     return product;
        // });
        // setProducts(updatedProducts);
        //  alert('Branch data updated successfully');
        

        //   // Close the modal after saving changes
        //   handleClose();
      } catch (error) {
          console.error('Error updating Branch data:', error);
          // Optionally, you can display an error message to the user
      }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedBranch(prevState => ({
        ...prevState,
        [name]: value
    }));
    // Clear the error message when the user starts typing again
    setErrors(prevErrors => ({
        ...prevErrors,
        [name]: ''
    }));
};

const handleMenuSelectionChange=(e)=>{
const { name, checked } = e.target;
setCheckboxData({
  ...checkboxData,
  [name]: checked
});
};





    return (
       


                            <div className="body">
                            <h2>Branch List</h2>
                            <Grid container spacing={2}>
                <Grid item xs={4}>
                    <Select
                        value={searchInput ? searchOptions.find(option => option.value === searchInput) || null : null}
                        onChange={handleSearchChange}
                        options={searchOptions}
                        placeholder="Search branch..."
                        isClearable={true}
                        className='form-select'
                    />
                </Grid>
                <Grid item xs={4}>
                               
                                        <Button variant="contained" onClick={() => handleShow('add', null)} color="warning" >
                                                ADD NEW BRANCH
                                            </Button>
                                            </Grid>
                                            </Grid>
  
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>BRANCH NAME</b></TableCell>
                                                <TableCell><b>BRANCH CODE</b></TableCell>
                                                <TableCell><b>BRANCH ADDRESS</b></TableCell>
                                                <TableCell><b>BRANCH GST</b></TableCell>
                                                <TableCell><b>ACTION</b></TableCell>
                                                
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>

                                           {loading ? (
                                                <TableRow>
                                                    <TableCell  colSpan="5">Loading...</TableCell>
                                                </TableRow>
                                            ) : (
                                                paginatedData.map((product, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{product.branchname}</TableCell>
                                                        <TableCell>{product.branchcode}</TableCell>
                                                        <TableCell>{product.branchaddress}</TableCell>
                                                        <TableCell>{product.branchGST}</TableCell>
                                                        
                                                       <TableCell>
                                                       <IconButton onClick={() => handleShow('edit', product)}>
      <EditIcon />
    </IconButton>
      
                                                        
                                                   </TableCell>
                                                   </TableRow>
                                                ))
                                            )}
                                        
                                 </TableBody>
                                </Table>
                                </TableContainer>
                                <Pagination count={Math.ceil(products.length / perPage)} page={currentPage + 1} onChange={handlePageChange} color="primary"/>
                          
     
               
               
      

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
   
                <h2>{formMode === 'add' ? 'Add Branch Master' : 'Edit Branch Master'}</h2>
        
     
        <form noValidate onSubmit={handleSaveChanges}>
        <Grid container spacing={2}>
            <Grid item xs={4}>
        <TextField variant="standard" label="Branch Name" name='branchname'
        fullWidth value={selectedBranch.branchname}  
        onChange={handleInputChange} size='small'
        style={{ marginBottom: '9px' }} required    
        error={validated && (selectedBranch.branchname === '' || !!nameError)}
        helperText={validated && (selectedBranch.branchname === '' ? 'Please Enter Branch Name.' : nameError)}
        />

        {/* {errors.branchname && (
                    <div style={{ color: 'red', fontSize: '0.8rem', marginTop: '4px' }}>
                        {errors.branchname}
                    </div>
                )} */}
                </Grid>
                    <Grid item xs={4}>
        <TextField  type="number" className={classes.noArrows} variant="standard" label="Branch Id *" name='branchid' fullWidth value={selectedBranch.branchid} onChange={handleInputChange} size='small' style={{ marginBottom: '9px' }} error={validated && selectedBranch.branchid === ''} helperText={validated && selectedBranch.branchid === '' ? 'Please Enter Branch Id.' : ''}/>
        </Grid>
        <Grid item xs={4}>
        <TextField variant="standard" label="Branch Code" name='branchcode' fullWidth value={selectedBranch.branchcode} onChange={handleInputChange} size='small' style={{ marginBottom: '9px' }}required error={validated && selectedBranch.branchcode === ''} helperText={validated && selectedBranch.branchcode === '' ? 'Please Enter Branch Code.' : ''}/>
        </Grid>
        <Grid item xs={4}>
        <TextField variant="standard" label="Branch Address" name='branchaddress'  fullWidth value={selectedBranch.branchaddress} onChange={handleInputChange} size='small' style={{ marginBottom: '9px' }}required error={validated && selectedBranch.branchaddress === ''} helperText={validated && selectedBranch.branchaddress === '' ? 'Please Enter Branch Address.' : ''}/>
        </Grid>
        <Grid item xs={4}>
        <TextField variant="standard" label="Branch GST" name='branchGST' fullWidth value={selectedBranch.branchGST} onChange={handleInputChange} size='small' style={{ marginBottom: '9px' }}required 
        error={validated && (selectedBranch.branchGST === '' || !!gstError)}
        helperText={validated && (selectedBranch.branchGST === '' ? 'Please Enter Branch GST.' : gstError)}
        />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="standard" label="Branch Incharge Email" name='InchargeEmail' fullWidth value={selectedBranch.InchargeEmail} onChange={handleInputChange} size='small' style={{ marginBottom: '9px' }}required 
         error={validated && (selectedBranch.InchargeEmail === '' || !!emailError)}
         helperText={validated && (selectedBranch.InchargeEmail === '' ? 'Please Enter Incharge Email.' : emailError)}
         />
        </Grid>
        <Grid item xs={4}>
        <TextField type="number" className={classes.noArrows} variant="standard" label="Branch Incharge Contact" name='InchargeContact' fullWidth value={selectedBranch.InchargeContact} onChange={handleInputChange} size='small' style={{ marginBottom: '9px' }}required 
         error={validated && (selectedBranch.InchargeContact === '' || !!mobileError)}
         helperText={validated && (selectedBranch.InchargeContact === '' ? 'Please Enter Incharge Contact Number.' : mobileError)}
         />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="standard" label="Branch Group Email's" name='GroupId' fullWidth value={selectedBranch.GroupId} onChange={handleInputChange} size='small' style={{ marginBottom: '25px' }}required error={validated && selectedBranch.GroupId === ''} helperText={validated && selectedBranch.GroupId === '' ? 'Please Enter Branch Group Email Id.' : ''} />
        </Grid>
        <Grid item xs={4}>
        <TextField variant="standard" label="LR Prefix" name='lrPrefix' fullWidth value={selectedBranch.lrPrefix || ''} onChange={handleInputChange} size='small' style={{ marginBottom: '25px' }}required error={validated && (selectedBranch.lrPrefix === '' || selectedBranch.lrPrefix === null)} helperText={validated && (selectedBranch.lrPrefix === '' || selectedBranch.lrPrefix === null) ? 'Please Enter LR Prefix.' : ''} />
        </Grid>
        <Grid item xs={12}>
        <FormControlLabel
        control={<Checkbox name= "notificationSms" value="notificationSms" checked={!!(checkboxData && checkboxData.notificationSms)}  onChange={handleMenuSelectionChange} />}
        label="SMS Notification Required"
      />
      <FormControlLabel
        control={<Checkbox name= "notificationEmail" value="notificationEmail" checked={!!(checkboxData && checkboxData.notificationEmail)} onChange={handleMenuSelectionChange} />}
        label="Email Notification Required"
      />

        </Grid>
        </Grid>
        <Button  type="submit" variant="contained"  style={{ marginRight: '9px' }}>{formMode === 'add' ? 'Submit' : 'Update'}</Button>
        
    </form>
         
   

          
        
         
          </div>
       
      </Modal>
    
          </div>
        
    );
};

export default AddBranchList;