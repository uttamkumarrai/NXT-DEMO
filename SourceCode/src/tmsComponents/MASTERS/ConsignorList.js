import React, { useState, useEffect ,useContext} from 'react';
import ReactPaginate from 'react-paginate';
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
import { useToast } from '../../Toast/toast';
import './MasterStyles.css';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import MenuItem from '@mui/material/MenuItem';
import FormControlLabel from '@mui/material/FormControlLabel';
import UserContext from '../../Context/UserContext';

const AddConsignorProducts = () => {
    const { userDetails, login, logout } = useContext(UserContext);
    const [selectedConsignor, setSelectedConsignor] = useState({
        clientCode:'',
        consignorName:'',
        gstNumber:'',
        panNumber:'',
        location:'',
        pinCode:'',
        city:'',
        state:'',
        address:'',
        contactPersonName:'',
        contactEmail:'',
        contactNo:'',
        groupId:'',

    });
    const[checkboxData,setCheckboxData]=useState({
        notificationSms:false,
        notificationEmail:false,
    });
    const handleClose = () => {
        setShow(false);
        setSelectedConsignor(''); // Reset selected user data when modal is closed
    };
  
    

    
    const handleButtonClick = () => {
      // Perform any actions you need
      // Then go back to the Dashboard with the 'Consignor' menu option
     
    };
    const { showToast } = useToast();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [searchConsignor, setSearchConsignor] = useState('');
    const [consignorOptions, setConsignorOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const[searchClient,setSearchClient]=useState('');
    const[clientOptions,setClientOptions]=useState([]);
    

    useEffect(() => {
        const fetchClientData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.FETCH_DATA+'clients');
                const result = await response.json();
               
                setClientOptions(result.map(product => ({ value: product.clientCode, label: product.clientName })));
                console.log("client Options",clientOptions);
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };
        fetchClientData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(API_ENDPOINTS.FETCH_DATA+'branches');
                const result = await response.json();
               
                setSearchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
            } catch (error) {
                console.error('Error fetching data:', error);
               
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        const fetchConsignorData = async () => {
            try {
                let consignorUrl =API_ENDPOINTS.FETCH_DATA+'consignor';
                // If a branch is selected, add it as a query parameter to the URL
                if (searchInput) {
                    consignorUrl += `/${searchInput}`;
                }
                console.log(API_ENDPOINTS.FETCH_DATA);
                console.log("Fetching data from URL:", consignorUrl);
                const consignorResponse = await fetch(consignorUrl);
                const consignorResult = await consignorResponse.json();
                setConsignorOptions(consignorResult.map(consignor => ({ value: consignor.id, label: consignor.consignorName })));
                
            } catch (error) {
                console.error('Error fetching user data:', error);
                
            }
        };

        const fetchProductsData = async () => {
            try {
                let productsUrl =API_ENDPOINTS.FETCH_DATA+'consignor';
                if (searchInput && searchConsignor) {
                    productsUrl += `/Byid/${searchConsignor}`;
                } else if (searchInput) {
                    // If only branch is selected
                    productsUrl += `/${searchInput}`;
                } else if (searchConsignor) {
                    // If only client is selected
                    productsUrl += `/Byid/${searchConsignor}`;
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
        fetchConsignorData();
        fetchProductsData();



    },[searchInput, searchConsignor]);

    const handleInputChange=async(e)=>{
        const { name, value } = e.target;
        setSelectedConsignor(prevSelectedConsignor => ({ ...prevSelectedConsignor, [name]: value }));

    }

    const handlePageChange = (selectedPage) => {
        const pageNumber = parseInt(selectedPage.target.textContent, 10) - 1; // Subtracting 1 to match the zero-based index of currentPage
        if (!isNaN(pageNumber)) {
            setCurrentPage(pageNumber);
        } else {
            console.error("Invalid page number:", selectedPage.target.textContent);
        }
    };
    const handleSearchChange = async(e) => {
        const selectedOption=e.target.value;
        if (selectedOption !== null) {
            setSearchInput(e.target.value); // Set the searchInput as branch number
             setSearchConsignor('');
             setConsignorOptions([]);
            }else{
                setSearchInput(''); // Reset the searchInput
                setSearchConsignor(''); // Reset the searchConsignor
            }
        };

        const handleConsignorChange =async(e) => {
          
            setSearchConsignor(e.target.value); // Set the searchInput as branch number
        };

    const paginatedData = Array.isArray(products) ? products.slice(currentPage * perPage, (currentPage + 1) * perPage) : [];
    const handleShow = (mode, product) => {
        setShow(true);
        setFormMode(mode);
        setSelectedConsignor(product || '');
    };
    const handleSaveChanges = async () => {
        try {
            let url = '';
            let method = '';

            if (formMode === 'add') {
                url = API_ENDPOINTS.FETCH_DATA + 'consignor/create';
                method = 'POST';
            } else if (formMode === 'edit') {
                url = API_ENDPOINTS.FETCH_DATA + `consignor/update`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedConsignor),
            });

            if (!response.ok) {
                throw new Error('Failed to save changes');
            }
            if (formMode === 'add') {

                window.showToast("Consignor/Consignee Created Successfully", "success");
                handleClose();
                const createdConsignor = await response.json();

                // Update the state by adding the newly created cosignor to the existing products
                setProducts([...products, createdConsignor]);

                const totalPages = Math.ceil((products.length) / perPage);

            // Set current page to last page where new sub-branch is added
            setCurrentPage(totalPages);
            }
  
            const updatedUserDataResponse = await fetch(API_ENDPOINTS.FETCH_DATA+`consignor/Byid/${selectedConsignor.id}`);
          if (!updatedUserDataResponse.ok) {
              throw new Error('Failed to fetch Client  data');
          }
          const updatedUserData = await updatedUserDataResponse.json();
  
          // Update the table data with the updated user data
          const updatedProducts = products.map(product => {
              if (product.id === selectedConsignor.id) {
                  return updatedUserData;
              }
              return product;
          });
          setProducts(updatedProducts);
          window.showToast("Consignor/Consignee Updated Successfully", "success");
          
  
            // Close the modal after saving changes
            handleClose();
        } catch (error) {
            console.error('Error updating Client data:', error);
            // Optionally, you can display an error message to the user
        }
    };


    return (
      

  <div className="body">
  
  <div className="col-md-6">
    <h2>Consignor List</h2>
   
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
    {/* <Select
      value={consignorOptions.find(option => option.value === searchConsignor)}
      onChange={handleConsignorChange}
      options={consignorOptions}
      placeholder="Search Consignor..."
      isClearable={true}
      // Set custom style to reduce width
      className='form-select'
      
    /> */}
      <FormControl fullWidth>
              <InputLabel id="consignor" >Select Consignor/Consignee</InputLabel>

               <Select
               labelId="consignor"
               value={searchConsignor}
               variant="standard"
               onChange={handleConsignorChange}
                                            
                >
                <MenuItem value="">
                <em>All</em>
                </MenuItem>
                {consignorOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                {option.label}
                </MenuItem>
                ))}
                </Select>
                                        
                </FormControl>
     </Grid>
     <Grid item xs={4}>
     {/* <div className="demo-google-material-icon" style={{ float: 'right', marginTop: '30px' }}> */}
      <Button variant="contained" color="warning" onClick={() => handleShow('add', null)}>ADD NEW CONSIGNOR</Button>
                                        {/* </div> */}
                                         </Grid>

             </Grid> 
  </div>
  

                                    
                                
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell><b>CONSIGNOR/CONSIGNEE NAME</b></TableCell>
                                                <TableCell><b>GST NUMBER</b></TableCell>
                                                <TableCell><b>PAN NUMBER</b></TableCell>
                                                <TableCell><b>LOCATION</b></TableCell>
                                                <TableCell><b>STATE</b></TableCell>
                                                <TableCell><b>ACTION</b></TableCell>
                                               </TableRow>
                                           </TableHead>
                                           <TableBody>
                                            {loading ? (
                                                <TableRow>
                                                    <TableCell colSpan="6">Loading...</TableCell>
                                                </TableRow>
                                            ) : (
                                                paginatedData.map((product, index) => (
                                                    <TableRow key={index}>
                                                        <TableCell>{product.consignorName} </TableCell>
                                                        <TableCell>{product.gstNumber} </TableCell>
                                                        <TableCell>{product.panNumber} </TableCell>
                                                        <TableCell>{product.location} </TableCell>
                                                        <TableCell>{product.state} </TableCell>
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
                    <h2>{formMode === 'add' ? 'Add Consignor/Consignee Master' : 'Edit Consignor/Consignee Master'}</h2>
                       
                            <form onSubmit={handleSaveChanges}>
                                <Grid container spacing={2}>
                                    <Grid item xs={3}>
                                    <FormControl fullWidth>
                                <InputLabel id="Client" >Client</InputLabel>
                                <Select
                                name="clientCode"
                                labelId='Client'
                                value={selectedConsignor.clientCode}
                                variant="standard"
                                onChange={handleInputChange}

                                >
                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {clientOptions.map((option)=>(
                                                    <MenuItem key={option.value} value={option.value}>
                                                    {option.label}
                                                    </MenuItem>

                                                ))}
                                                </Select>
                                                </FormControl>
                                    </Grid>
                                    <Grid item xs={3}>
                                <TextField variant='standard' name='consignorName' label="Consignor Name" fullWidth value={selectedConsignor.consignorName} onChange={handleInputChange}className="textfield-margin" required />
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='gstNumber' label="GST Number"  fullWidth value={selectedConsignor.gstNumber} onChange={handleInputChange}className="textfield-margin" required />
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='panNumber' label="PAN Number" fullWidth value={selectedConsignor.panNumber} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='pinCode' label="Pincode" fullWidth value={selectedConsignor.pinCode} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='location' label="Location" fullWidth value={selectedConsignor.location} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='city' label="City" fullWidth value={selectedConsignor.city} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='state' label="State" fullWidth value={selectedConsignor.state} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='address' label="Address" fullWidth value={selectedConsignor.address} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='contactPersonName' label="Contact Person Name" fullWidth value={selectedConsignor.contactPersonName} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='contactEmail' label="Contact Email" fullWidth value={selectedConsignor.contactEmail} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                <Grid item xs={3}>
                                <TextField variant='standard' name='contactNo' label="Contact Number" fullWidth value={selectedConsignor.contactNo} onChange={handleInputChange} className="textfield-margin" required/>
                                </Grid>
                                </Grid>
                                <Button variant="contained" type="submit" className='modal-botton'>{formMode === 'add' ? 'Submit' : 'Update'}</Button>
                               
                            </form>
                        
                    </div>
                </Modal>
            </div>
    
    );
};


export default AddConsignorProducts;
