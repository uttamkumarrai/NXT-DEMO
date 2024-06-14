import React, { useState, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import Select from 'react-select'; 
import 'datatables.net-bs4/css/dataTables.bootstrap4.min.css';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Table from '@mui/material/Table';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';

import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Checkbox } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Pagination from '@mui/material/Pagination';
import { TableBody, TableCell, TableRow } from '@mui/material';
import { Grid } from '@mui/material';
import './MasterStyles.css';
import EditIcon from '@mui/icons-material/Edit';
import {IconButton} from '@mui/material';
const AddCustomerProducts = () => {
    const [selectedVendor, setSelectedVendor] = useState(null);
    const handleClose = () => {
        setShow(false);
        setSelectedVendor(null); // Reset selected user data when modal is closed
    };
  



    

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [perPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [searchInput, setSearchInput] = useState('');
    const [searchOptions, setSearchOptions] = useState([]);
    const [show, setShow] = useState(false);
    const [formMode, setFormMode] = useState('add'); // 'add' or 'edit'
    const[checkboxData,setCheckboxData]=useState({
        notificationSms:false,
        notificationEmail:false,
        notificationDsr:false,
    })
    const handleMenuSelectionChange=(e)=>{
        const { name, checked } = e.target;
        setCheckboxData({
          ...checkboxData,
          [name]: checked
        });
        };


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
        const fetchData = async () => {
            try {
              let url = API_ENDPOINTS.FETCH_DATA+'vendors';
              // If a branch is selected, add it as a query parameter to the URL
              if (searchInput) {
                  url += `/${searchInput}`;
              }
              console.log("Fetching data from URL:", url);
              const response = await fetch(url);
              const result = await response.json();
              setProducts(result);
              setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };

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

    const handleSearchChange = (selectedOption) => {
      if (selectedOption !== null && selectedOption !== undefined) {
      setSearchInput(selectedOption.value);
    } else {
      
      setSearchInput('');
  }
  };

    const paginatedData = products.slice(currentPage * perPage, (currentPage + 1) * perPage);
    const handleShow = (mode, product) => {
        setShow(true);
        setFormMode(mode);
        setSelectedVendor(product || null);
    };
    const handleSaveChanges = async () => {
        
        try {

         
            let url = '';
            let method = '';

            if (formMode === 'add') {
                url = API_ENDPOINTS.FETCH_DATA + 'vendors/create';
                method = 'POST';
            } else if (formMode === 'edit') {
                url = API_ENDPOINTS.FETCH_DATA + `vendors/update`;
                method = 'PUT';
            }

            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedVendor),
            });

            if (!response.ok) {
                throw new Error('Failed to save changes');
            }
            if (formMode === 'add') {

                alert("Vendor Created");
                handleClose();
                const createdVendor = await response.json();

                // Update the state by adding the newly created vendor to the existing products
                setProducts([...products, createdVendor]);

                const totalPages = Math.ceil((products.length) / perPage);

            // Set current page to last page where new sub-branch is added
            setCurrentPage(totalPages);
            }
  
            const updatedUserDataResponse = await fetch(API_ENDPOINTS.FETCH_DATA+`vendors/Byid/${selectedVendor.id}`);
          if (!updatedUserDataResponse.ok) {
              throw new Error('Failed to fetch Client  data');
          }
          const updatedUserData = await updatedUserDataResponse.json();
  
          // Update the table data with the updated user data
          const updatedProducts = products.map(product => {
              if (product.id === selectedVendor.id) {
                  return updatedUserData;
              }
              return product;
          });
          setProducts(updatedProducts);
           alert('Vendor data updated successfully');
          
  
            // Close the modal after saving changes
            handleClose();
        } catch (error) {
            console.error('Error updating Client data:', error);
            // Optionally, you can display an error message to the user
        }
    };

    return (
       
                            <div className="body">
                             
                                    <h2>Vendor List</h2>
                                        
                                        <Grid container spacing={2} >
                                            <Grid item xs={4}>
                                        <Select
                                            value={searchOptions.find(option => option.value === searchInput)}
                                            onChange={handleSearchChange}
                                            options={searchOptions}
                                            placeholder="Search branch..."
                                            isClearable={true}
                                            // Set custom style to reduce width
                                            className='form-select'
                                        />
                                        </Grid>
                                        <Grid item xs={4}>
                                   
                                    
                                   <Button variant="contained" color="warning" onClick={() => handleShow('add', null)}>ADD NEW VENDOR</Button>
                               </Grid>
                               </Grid>
                               <TableContainer>
                                <Table>
                                  <TableHead>
                                    <TableRow>
                                      <TableCell><b>VRF CODE</b></TableCell>
                                      <TableCell><b>VENDOR NAME</b></TableCell>
                                      <TableCell><b>VENDOR TYPE</b></TableCell>
                                      <TableCell><b>AGREEMENT NUMBER</b></TableCell>
                                      <TableCell><b>FROM DATE</b></TableCell>
                                      <TableCell><b>TO DATE</b></TableCell>
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
                                            <TableCell>{product.vrfCode}</TableCell>
                                            <TableCell>{product.vendorName}</TableCell>
                                            <TableCell>{product.vendorType}</TableCell>
                                            <TableCell>{product.agreementNo}</TableCell>
                                            <TableCell>{product.agreementFromDate}</TableCell>
                                            <TableCell>{product.agreementToDate}</TableCell>
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
    <Pagination count={Math.ceil(products.length / perPage)} page={currentPage + 1} onChange={handlePageChange} color="primary" required/>
) : (
    <p>No data available</p>
)}

<Modal open={show} onClose={handleClose}>
  <div className='modal-div'>
  <h2>{formMode === 'add' ? 'Add Vendor Master' : 'Edit Vendor Master'}</h2>
        
        <form onSubmit={handleSaveChanges}>
            <Grid container spacing={2}>
                <Grid item xs={3}>

               
        <TextField  variant='standard' label="GSTIN" fullWidth value={(selectedVendor && selectedVendor.gstin) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, gstin: e.target.value })} size='small'className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
          <TextField variant='standard' label="Vendor Code" fullWidth  value={(selectedVendor && selectedVendor.vrfCode) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, vrfCode: e.target.value })} size='small'className="textfield-margin" required />
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="Vendor Name" fullWidth value={(selectedVendor && selectedVendor.vendorName) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, vendorName: e.target.value })} size='small' className="textfield-margin" required />
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="Contact Name" fullWidth value={(selectedVendor && selectedVendor.contactName) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, contactName: e.target.value })} size='small' className="textfield-margin" required />
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="Mobile Number" fullWidth value={(selectedVendor && selectedVendor.mobileNo) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, mobileNo: e.target.value })} size='small' className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="Email" fullWidth value={(selectedVendor && selectedVendor.email) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, email: e.target.value })} size='small' className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="CIN" fullWidth value={(selectedVendor && selectedVendor.cin) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, cin: e.target.value })} size='small'className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="PAN Number" fullWidth value={(selectedVendor && selectedVendor.pan) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, pan: e.target.value })} size='small' className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="Discount Amount" fullWidth value={(selectedVendor && selectedVendor.discountAmount) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, discountAmount: e.target.value })} size='small' className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
          <TextField  variant='standard' label="Discount Percentage" fullWidth value={(selectedVendor && selectedVendor.discountPercentage) || ''} onChange={e => setSelectedVendor({ ...selectedVendor, discountPercentage: e.target.value })} size='small' className="textfield-margin" required/>
          </Grid>
          <Grid item xs={3}>
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
          <Button variant="contained" onClick={handleClose}>Close</Button>


        </form>
          
      </div>
      </Modal>
      </div>
       
    );
};

export default AddCustomerProducts;
