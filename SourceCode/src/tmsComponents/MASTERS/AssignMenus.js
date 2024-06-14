import React, { useState, useEffect,useContext } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import UserContext from '../../Context/UserContext';
import {Select, FormControl, InputLabel} from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { Grid } from '@mui/material';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import { TableBody, TableCell, TableRow ,TablePagination} from '@mui/material';
import Table from '@mui/material/Table';
import { Autocomplete, TextField } from '@mui/material';
const TripHireContract=()=>{
  const [selectedTab, setSelectedTab] = useState(0);
  const { userDetails, login, logout } = useContext(UserContext);
  const [product,setProducts]=useState([]);
  const[VendorOptions,setVendorOptions]=useState([]);
  const[vendor,setVendor]=useState('');
  const[loading,setLoading]=useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - product.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };



  const selectedTabStyle = {
   
    backgroundColor: '#0a0652', // Background color for the selected tab
    color: 'white', // Text color for the selected tab
  };

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
   
  }; 
  const handleVendor=(event, value)=>{
    console.log(value);
    setVendor(value);

  }

  useEffect(() => {
    const fetchData = async () => {
        try {
          let url = API_ENDPOINTS.FETCH_DATA+'vendors';
          // If a branch is selected, add it as a query parameter to the URL
          if (userDetails.branchid) {
              url += `/${userDetails.branchid}`;
          }
          console.log("Fetching data from URL:", url);
          const response = await fetch(url);
          const result = await response.json();
        
          setVendorOptions(result.map(vendor=>({value:vendor.vrfCode,label:vendor.vendorName})));
         
          setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    fetchData();
}, [userDetails]);

useEffect(() => {
  const fetchConsignments = async () => {
      try {
        let url = API_ENDPOINTS.FETCH_DATA+'consignments';
        // If a branch is selected, add it as a query parameter to the URL
        if (vendor) {
          console.log(vendor.value);
            url += `/${vendor.value}`;
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

  fetchConsignments();
}, [vendor]);


return(
  <div>
    <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
    <Tabs variant="fullWidth" value={selectedTab} onChange={handleChange} >
            <Tab label="Create THC" />
            <Tab label="Close THC"  />
            <Tab label="Generate Annexure"  />
          </Tabs>
          </Box>

          <Grid container spacing={2} >
                                          <Grid item xs={4}>                           
                                          <Autocomplete
                                          options={VendorOptions}
                                         
                                          getOptionLabel={(option) => option.label  || ''}
                                          renderInput={(params) => <TextField {...params} label="Search Vendor" variant="standard" />}
                                          style={{ width: 300 }}
                                          onChange={handleVendor}    
                                          
                                          />
                                          </Grid>
                                         
                                          
     
        <Grid item xs={12}>
        <TableContainer>
            <Table>
  <TableHead>
    <TableRow>
      <TableCell><b>#</b></TableCell>
      <TableCell><b>LR Number</b></TableCell>
      <TableCell><b>Vehicle Number</b></TableCell>
      <TableCell><b>Customer Name</b></TableCell>
      <TableCell><b>Origin</b></TableCell>
      <TableCell><b>Destinataion</b></TableCell>
      
     
    
     

    </TableRow>
    </TableHead>
    <TableBody>
    {product.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell component="th" scope="row">
                  {entry.PrqNo}
                </TableCell>
                  <TableCell>{entry.lrNumber}</TableCell>
                  <TableCell>{entry.vehicleNo}</TableCell>
                  <TableCell>{entry.consignor_Name}</TableCell>
                  <TableCell>{entry.consignor_Location}</TableCell>
                  <TableCell>{entry.consignee_Location}</TableCell>
                 
                 
                  </TableRow>
              ))}
               {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
  
            </TableBody>
            </Table>

            
            </TableContainer>
            <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={product.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
            </Grid>
            </Grid>
          

          </div>
)


}
export default TripHireContract;
