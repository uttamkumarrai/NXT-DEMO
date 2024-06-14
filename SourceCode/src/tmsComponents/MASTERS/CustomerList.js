import React, { useState, useEffect,useContext } from 'react';

import {Select, FormControl, InputLabel} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import FormControlLabel from '@mui/material/FormControlLabel';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';

import Pagination from '@mui/material/Pagination';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { Grid } from '@mui/material';
import './MasterStyles.css';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import { useToast } from '../../Toast/toast';
import useStyles from '../../centralized_Components/arrowStyle';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import UserContext from '../../Context/UserContext';
import useValidations from '../../centralized_Components/Validations';
import { FormHelperText } from '@material-ui/core';



const AddCustomerProducts = () => {
    const classes = useStyles();
    const { userDetails, login, logout } = useContext(UserContext);
    const { showToast } = useToast();

    const [selectedCustomer, setSelectedCustomer] = useState({
        clientCode:'',
        clientName:'',
        clientGSTINId:'',
        client_pin_code:'',
        clientLocation:'',
        clientCity:'',
        clientState:'',
        cin:'',
        clientAddress:'',
        clientEmailId:'',
        clientMobileNo:'',
        contactPersonName:'',
        clientContactEmail:'',
        clientContactPersonNo:'',
        client_PAN:'',
        client_GroupId:'',

    });
    const handleClose = () => {
        setShow(false);
        setSelectedCustomer(''); // Reset selected user data when modal is closed
    };

    const[validated,setValidated]=useState(false);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchClient, setSearchClient] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);
    const[locationOptions,setLocationOptions]=useState([]);
    const [show, setShow] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const[checkboxData,setCheckboxData]=useState({
        notificationSms:false,
        notificationEmail:false,
        notificationDsr:false,
    })
    const {gstError,mobileError,nameError,emailError,panError,validatePAN, validateGST, validateEmail,validateName, validateMobile } = useValidations();
    useEffect(() => {
        const fetchData = async () => {
           
            try {
                
                const response = await fetch(API_ENDPOINTS.FETCH_DATA+'branches');
                const result = await response.json();
                console.log('fetching...');
               
                setSearchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        if(userDetails && userDetails.branchid){
            setSearchInput(userDetails.branchid);
        }

    },[userDetails]);

    const handlePincode=async(e)=>{
        
        const pincode=e.target.value;
        setSelectedCustomer(prevValues => ({
            ...prevValues,
            client_pin_code:pincode,
        }))
        if(pincode.length===6){
            fetchOptions(pincode)

        }


    }

    const fetchOptions =  async(pincode) => {
       
     
    
        try {
          const response = await axios.get(`https://api.postalpincode.in/pincode/${pincode}`);
          const postOffices = response.data[0].PostOffice;
          const optionsData = postOffices.map(postOffice => ({
            value: postOffice.Name,
            label: postOffice.Name,
          }));
          setLocationOptions(optionsData);
          setSelectedCustomer(prevValues => ({
            ...prevValues,
           
            clientCity: postOffices[0].District,
            clientState:postOffices[0].State
          }))
       

          
          
        }catch (error) {
            console.error('Error fetching Pincode:', error);

        }
    
    }

  

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                let clientUrl = API_ENDPOINTS.FETCH_DATA + 'clients';
                // If a branch is selected, add it as a query parameter to the URL
                if (searchInput) {
                    clientUrl += `/${searchInput}`;
                }else if(userDetails.branchid){
                    clientUrl += `/${userDetails.branchid}`;
                }
               
                const clientResponse = await fetch(clientUrl);
                const clientResult = await clientResponse.json();
                setClientOptions(clientResult.map(client => ({ value: client.clientCode, label: client.clientName })));
            } catch (error) {
                console.error('Error fetching client data:', error);
            }
        };
        
    
        const fetchProductsData = async () => {
            console.log("coming to fetchProductsData");
            try {
                let productsUrl = API_ENDPOINTS.FETCH_DATA + 'clients';
                // If both branch and client are selected, add them as query parameters to the URL
                if (searchInput && searchClient) {
                    console.log("both selected");
                    productsUrl += `/ByCid/${searchClient}`;
                } else if (searchInput) {
                    // If only branch is selected
                    productsUrl += `/${searchInput}`;
                } else if (searchClient) {
                    // If only client is selected
                    productsUrl += `/ByCid/${searchClient}`;
                }
                
                const productsResponse = await fetch(productsUrl);
                const productsResult = await productsResponse.json();
                if (Array.isArray(productsResult)) {
                    setProducts(productsResult);
                } else {
                    // If the response is not an array, assume it's a single client object
                    setProducts([productsResult]);
                }
                setLoading(false);
            } catch (error) {
                console.error('Error fetching product data:', error);
                setLoading(false);
            }
        };
    
        fetchClientData();
        fetchProductsData();
    }, [searchInput, searchClient]);
    

    const handlePageChange = (selectedPage) => {
        const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber);
        } else {
            console.error("Invalid page number:", selectedPage.target.textContent);
        }
    };
    const handleSearchChange = async(e) => {
        console.log("selected branch",e.target.value);
      setSearchInput(e.target.value);
      setSearchClient('');
    setClientOptions([]);
        // if (selectedOption !== null) {
        // setSearchInput(selectedOption.value); // Set the searchInput as branch number
        //  setSearchClient('');
        //  setClientOptions([]);
        // }else{
        //     setSearchInput(''); // Reset the searchInput
        //     setSearchClient(''); // Reset the searchClient
        // }
    };
    const handleClientChange = async(e) => {
       
       
        setSearchClient(e.target.value); 
        
    };

    const handleInputChange=(e)=>{
        const { name, value } = e.target;

        switch(name){
            case 'clientName':
                validateName(value);
                break;
            case 'clientGSTINId':
                validateGST(value);
                break;
            case 'clientContactNo':
                validateMobile(value);
                break;
            case 'clientContactPersonNo':
                validateMobile(value);
                break;
            case 'contactPersonName':
                validateName(value);
                break;
            case 'clientContactEmail':
                validateEmail(value);
                break;
            case 'clientEmailId':
                validateEmail(value);
                break;
            case 'client_PAN':
                validatePAN(value);
                break;


                    
                default:
                    break;

        }
        setSelectedCustomer(prevSelectedCustomer => ({ ...prevSelectedCustomer, [name]: value }));



    };

    const paginatedData = Array.isArray(products) ? products.slice(currentPage * perPage, (currentPage + 1) * perPage) : [];
    const handleShow = (mode, product) => {
       
        
        setShow(true);
        setFormMode(mode);
        if(formMode==='edit'){
        setSelectedCustomer(product || '');
        }
    };

    const handleMenuSelectionChange=(e)=>{
        const { name, checked } = e.target;
        setCheckboxData({
          ...checkboxData,
          [name]: checked
        });
        };

    const handleSaveChanges = async (e) => {
        e.preventDefault();
        for (const [fieldName, fieldValue] of Object.entries(selectedCustomer)) {
            if (fieldValue !== null && typeof fieldValue === 'string' && fieldValue.trim() === '') {
              setValidated(true);
              return;
            }else if(fieldValue===null){
                setValidated(true);
                return;
            }
          }
          
          setValidated(false);
        try {
            let url = '';
            let method = '';
          
                url = API_ENDPOINTS.FETCH_DATA + 'clients';
                method = 'POST';
         const userData={
            ...selectedCustomer,
            ...checkboxData,
            clientBranchId:searchInput,
            initiatorId:userDetails.empid,
            initiatorBId:userDetails.branchid,
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

            window.showToast("Customer Created Successfully", "success");
            }else{
                window.showToast("Customer Updated Successfully", "success");
            }
            const createdCustomer = await response.json();
            
            if(formMode==='add'){
            setProducts([...products, createdCustomer]);

        }
            const totalPages = Math.ceil((products.length) / perPage);

            // Set current page to last page where new customer is added
            setCurrentPage(totalPages);

            // Alert and close modal for adding new customer
           
       
        } catch (error) {
            console.error('Error updating Client data:', error);
            // Optionally, you can display an error message to the user
        }
    };

    return (
       
                   
           
                
                            <div className="body">
                                 <h2>Customer List</h2>
                               
                                      
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
                                            <MenuItem value="">
                                                        <em>None</em>
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
                                        {/* <Select
                                        value={clientOptions.find(option => option.value === searchClient)}
                                        onChange={handleClientChange}
                                        options={clientOptions}
                                        placeholder="Search Customer..."
                                        isClearable={true}
                                        // Set custom style to reduce width
                                        className='form-select'
      
                                        /> */}

                                    <FormControl fullWidth>
                                        <InputLabel id="customer" >Select Customer</InputLabel>

                                            <Select
                                            labelId="customer"
                                            
                                            value={searchClient}
                                            variant="standard"
                                            onChange={handleClientChange}
                                           
                                            >
                                            <MenuItem value="">
                                                        <em>All</em>
                                                    </MenuItem>
                                            {clientOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                        
                                        </FormControl>
                                        </Grid>
                                        <Grid item xs={4}>
                                   
                                    
                                        <Button variant="contained" color="warning" onClick={() => handleShow('add', null)}>ADD NEW CUSTOMER</Button>
                                    </Grid>
                                    </Grid>
                                    <TableContainer>
                                        <Table>
                                            <TableHead>
                                                <TableRow>
                                                    <TableCell><b>CUSTOMER NAME</b></TableCell>
                                                    <TableCell><b>CREATED DATE</b></TableCell>
                                                    <TableCell><b>CITY</b></TableCell>
                                                    <TableCell><b>STATE</b></TableCell>
                                                    <TableCell><b>DETAILS</b></TableCell>
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
                                                            <TableCell>{product.clientName}({product.clientCode})</TableCell>
                                                            <TableCell>{product.codeCreatedDate}</TableCell>
                                                            <TableCell>{product.clientCity}</TableCell>
                                                            <TableCell>{product.clientState}</TableCell>
                                                            <TableCell>{product.client_PAN} , {product.clientGSTINId}</TableCell>
                                                            <TableCell><IconButton onClick={() => handleShow('edit', product)}>
                                                            <EditIcon />
                                                         </IconButton></TableCell>

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
   
                                        <h2>{formMode === 'add' ? 'Add Customer Master' : 'Edit Customer Master'}</h2>
                                        
                                       
                                            <form noValidate onSubmit={handleSaveChanges}>
                                            <Grid container spacing={2}>
                                                <Grid item xs={3}>
                                                <FormControl fullWidth error={!!(validated && !searchInput)}>
                                        <InputLabel id="Branch" >Select Branch</InputLabel>

                                            <Select
                                            labelId="Branch"
                                            
                                            value={searchInput}
                                            variant="standard"
                                            onChange={handleSearchChange}
                                            
                                            >
                                            {/* <MenuItem value="">
                                                        <em>All</em>
                                                    </MenuItem> */}
                                            {searchOptions.map((option) => (
                                                <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                                </MenuItem>
                                            ))}
                                            </Select>
                                            {validated && !searchInput && (
                                    <FormHelperText  style={{ color: '#d32f2f' }}>Please select a branch.</FormHelperText>
                                        )}
                                        
                                        </FormControl>
                                                    
                                                </Grid>
                                            <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer Code" name='clientCode' fullWidth value={selectedCustomer.clientCode} onChange={handleInputChange} size='small'className="textfield-margin" required error={validated && selectedCustomer.clientCode === ''} helperText={validated && selectedCustomer.clientCode === '' ? 'Please Enter Client Code.' : ''}/>
                                               </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer Name" name='clientName' fullWidth value={selectedCustomer.clientName} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedCustomer.clientName === '' || !!nameError)} helperText={validated && selectedCustomer.clientName === '' ? 'Please Enter Client Name.' : nameError} />
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer GST NO" name='clientGSTINId' fullWidth value={selectedCustomer.clientGSTINId} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedCustomer.clientGSTINId === '' || !!gstError)} helperText={validated && selectedCustomer.clientGSTINId === '' ? 'Please Enter GST Number.' : gstError} />
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField type="number" className={classes.noArrows} variant='standard' label="Pincode" name='client_pin_code' fullWidth value={selectedCustomer.client_pin_code} onChange={handlePincode} size='small'  required error={validated && selectedCustomer.client_pin_code === ''} helperText={validated && selectedCustomer.client_pin_code === '' ? 'Please Enter Pincode.' : ''}/>
                                                </Grid>
                                              
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="City" name='clientCity' fullWidth value={selectedCustomer.clientCity} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && selectedCustomer.clientCity === ''} helperText={validated && selectedCustomer.clientCity === '' ? 'Please Enter City.' : ''}/>
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="State" name='clientState' fullWidth value={selectedCustomer.clientState} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && selectedCustomer.clientState === ''} helperText={validated && selectedCustomer.clientState === '' ? 'Please Enter State.' : ''}/>
                                                </Grid>
                                                <Grid item xs={3}>
                                                <FormControl fullWidth>
                                                <InputLabel id="Location">Location</InputLabel>
                                                <Select
                                                name="clientLocation"
                                                labelId='Location'
                                                value={setSelectedCustomer.clientLocation}
                                                variant="standard"
                                                onChange={handleInputChange}

                                                >
                                                <MenuItem value="">
                                                                    <em>None</em>
                                                                </MenuItem>
                                                                {locationOptions.map((option)=>(
                                                                    <MenuItem key={option.value} value={option.value}>
                                                                    {option.label}
                                                                    </MenuItem>

                                                                ))}
                                                                </Select>
                                                                </FormControl>
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer CIN"  name='cin' onChange={handleInputChange} fullWidth value={selectedCustomer.cin} size='small' className="textfield-margin" required error={validated && selectedCustomer.cin === ''} helperText={validated && selectedCustomer.cin === '' ? 'Please Enter CIN.' : ''}/>
                                                </Grid>
                                                <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer Address" name='clientAddress' onChange={handleInputChange} fullWidth value={selectedCustomer.clientAddress} size='small' className="textfield-margin" required error={validated && selectedCustomer.clientAddress === ''} helperText={validated && selectedCustomer.clientAddress === '' ? 'Please Enter Customer Email Id.' : ''}/>
                                                </Grid>

                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer Email" name='clientEmailId' onChange={handleInputChange} fullWidth value={selectedCustomer.clientEmailId} size='small' className="textfield-margin" required error={validated && (selectedCustomer.clientEmailId === '' || !!emailError)} helperText={validated && selectedCustomer.clientEmailId === '' ? 'Please Enter Customer Email Id.' : emailError}/>
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer Contact Number" name='clientMobileNo' fullWidth value={selectedCustomer.clientMobileNo} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedCustomer.clientMobileNo === ''|| !!mobileError)} helperText={validated && selectedCustomer.clientMobileNo === '' ? 'Please Enter Customer Contact Number.' : mobileError} />
                                                </Grid>

                                                <Grid item xs={3}>
                                                <TextField variant='standard' label="Contact Person Name"  name='contactPersonName' fullWidth value={selectedCustomer.contactPersonName} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedCustomer.contactPersonName === '' || !!nameError)} helperText={validated && selectedCustomer.contactPersonName === '' ? 'Please Enter Contact Person Name.' : nameError}/>
                                                </Grid>

                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Contact Person Email Id"  name='clientContactEmail' fullWidth value={selectedCustomer.clientContactEmail} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedCustomer.clientContactEmail === '' || !!emailError)} helperText={validated && selectedCustomer.clientContactEmail === '' ? 'Please Enter Contact Person Email Id.' : emailError}/>
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Contact Person Number" name='clientContactPersonNo' fullWidth value={(selectedCustomer && selectedCustomer.clientContactPersonNo) || ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (selectedCustomer.clientContactPersonNo === '' || !!mobileError)} helperText={validated && selectedCustomer.clientContactPersonNo === '' ? 'Please Enter Contact Person Contact Number.' :mobileError}/>
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer PAN" name='client_PAN' fullWidth value={selectedCustomer.client_PAN} onChange={handleInputChange}  size='small' className="textfield-margin" required error={validated && (selectedCustomer.client_PAN === '' || !!panError)} helperText={validated && selectedCustomer.client_PAN === '' ? 'Please Enter PAN Number.' : panError}/>
                                                </Grid>
                                               <Grid item xs={3}>
                                                <TextField variant='standard' label="Customer Group Email Id" name='client_GroupId' fullWidth  value={selectedCustomer?.client_GroupId ?? ''} onChange={handleInputChange} size='small' className="textfield-margin" required error={validated && (!selectedCustomer?.client_GroupId || selectedCustomer.client_GroupId.trim() === '')}
  helperText={validated && (!selectedCustomer?.client_GroupId || selectedCustomer.client_GroupId.trim() === '') ? 'Please Enter Group Email Id.' : ''}/>
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
                                             <FormControlLabel
                                                control={<Checkbox name= "notificationDsr" value="notificationDsr" checked={!!(checkboxData && checkboxData.notificationDsr)} onChange={handleMenuSelectionChange} />}
                                                label="DSR Notification Required"
                                            />

                                                </Grid>
                                                </Grid>
                                                <Button variant="contained" type="submit" className='modal-botton'>{formMode === 'add' ? 'Submit' : 'Update'}</Button>
                                              



                                            </form>
                                           
                                             </div>

                                    </Modal>
                                    </div>

                                        
                                  


      

      
      
    );
};


export default AddCustomerProducts;
