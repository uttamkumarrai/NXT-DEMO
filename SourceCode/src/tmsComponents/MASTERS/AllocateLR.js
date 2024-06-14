import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import Modal from '@mui/material/Modal';
import {Select, FormControl, InputLabel, Grid, Table,IconButton } from '@mui/material';
import {Button, TextField } from '@mui/material';
import { TableBody, TableCell, TableRow,TableContainer,TableHead } from '@mui/material';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import './Request.css';
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';



function AllocatingLR(){
  const currentDate = format(new Date(), 'yyyy-MM-dd');
const[user,setUser]=useState('');
const[pendingLR,setPendingLR]=useState([]);
const[searchBranch,setSearchBranch]=useState('');
const[show,setShow]=useState(false);
const[branchOptions,setBranchOptions]=useState([]);
const[quantity,setQuantity]=useState('');
const[series,setSeies]=useState('');

const[allocateLR,setAllocateLR]=useState({
  initiatorId:'',
  initiatorName:'',
  initiatorbId:'',
  qty:'',
  assignedQty:'',
  lastSeries:'',
  seriesFrom:'',
  seriesTo:'',
  branchId:'',
  id:'',
  seriesStartWith:'',
  branchname:'',
  allocated:false,
  utilized:false,


});

const resetForm=()=>{
  setAllocateLR({
    qty:'',
  assignedQty:'',
  lastSeries:'',
  seriesFrom:'',
  seriesTo:'',

  });
  
}

const[updateRequest,setUpdateRequest]=useState({
  approvedFlag:true,
  modifiedDateTime:currentDate,
  id:0,
  status:'Closed',


});



useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'branches');
      const result = await response.json();
     
     setBranchOptions(result.map(product => ({ value: product.branchid, label: product.branchname })));
     
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchData();
}, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'users/ByEmpid/931');
        const result = await response.json();
       localStorage.setItem("user",JSON.stringify(result));
         const storedUser = localStorage.getItem('user');

         console.log(storedUser);
    

      const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setAllocateLR(prevState=>({
            ...prevState,
            initiatorId:parsedUser.empid,
            initiatorName:parsedUser.empname,
            initiatorbId:parsedUser.branchid,



          }))
        
          
        fetchPendingLR(parsedUser.empid,false)
        fetchquantity(parsedUser.branchid)
       
     


  }
      
     
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  fetchUser();
}, []);

const fetchPendingLR=async(empid,flag)=>{
  try {
    
     const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'LR/'+empid+'/'+flag);
    
     const result = await response.json();
     setPendingLR(result);

     
}catch(error){
  console.error('Error fetching Pending LR:', error);
}

}

const fetchquantity=async(branchid)=>{
  try {
  const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'AssignLR/unutilized/count/'+branchid);
    
  const result = await response.json();
  setQuantity(result);
}catch(error){
console.error('Error fetching Pending LR:', error);
}

}

const fetchSeries=async(branchid)=>{
  try {
  const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'AssignLR/unutilized/'+branchid);
    
  const result = await response.json();

  if (!result || result.length === 0) {
    console.warn('No data found');
    setAllocateLR(prevState => ({
      ...prevState,
      seriesStartWith: '', // or any default value you prefer
    }));
    return;
  }
  const maxEntry = result.reduce((max, entry) => (entry.id > max.id ? entry : max), result[0]);
  setSeies(maxEntry);
  console.log("last series",maxEntry);
  setAllocateLR(prevState=>({
    ...prevState,
    lastSeries:maxEntry.consignmentNo,
    
  }))
    
 
}catch(error){
console.error('Error fetching Pending LR:', error);
}

}

const handleBranchChange=async(e)=>{
  setSearchBranch(e.target.value);

}

const handleAllocateLR=async(e)=>{
  const{name,value}=e.target;
  setAllocateLR(prevState => ({
    ...prevState,
    [name]: value,
  }));

  

}

const handleShow = async(entry) => {
  fetchSeries(entry.branchid)
  setShow(true);
  setSearchBranch(entry.branchname);
  setAllocateLR(prevState=>({
    ...prevState,
    qty:entry.qty,
    branchId:entry.branchid,
    seriesStartWith:entry.prefix,
   
    id:entry.id,
    branchname:entry.branchname,
    utilized:false,
    allocated:false,
   

  }))
  setUpdateRequest(prevState=>({
    ...prevState,
    id:entry.id,

  }))
  
};

const handleClose = () => {
  setShow(false);
  fetchPendingLR(allocateLR.empid,false)
}

const handleSubmit=async()=>{
  console.log(allocateLR);

  try {
    const createAssignLR = async () => {
      const url = API_ENDPOINTS.FETCH_DATA + 'AssignLR/create';
      const method = 'POST';

      const response = await fetch(url, {
          method: method,
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(allocateLR)
      });

      if (!response.ok) {
          throw new Error('Failed to save changes');
      }
    };

    const UpdateLRRequest = async () => {
      
      
      const url = API_ENDPOINTS.FETCH_DATA +'LR/update'; // URL of the second API
      

      const response = await fetch(url, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateRequest)
        });
  
        if (!response.ok) {
            throw new Error('Failed to save changes');
        }
      };
      const [assignLRResponse, secondAPIResponse] = await Promise.all([
        createAssignLR(),
        UpdateLRRequest()
    ]);
      window.showToast("LR Allocated Successfully ", "success");
      handleClose();
      resetForm();

  } catch (error) {
    console.error('Error Sending LR Request:', error);
    // Optionally, you can display an error message to the user
}

  }





  

    return(
        <div>

        <Grid container spacing={2}>
            <Grid item xs={4}>

           

            {user.employeeRoleType === 'Branch Head' && (
        <Card sx={{ width: '80%', margin: '32px 0', padding: '1px',backgroundColor: '#ebe7df',height:'80px' }}>
      <CardContent>
      <h4 className='card-title-qty'>Quantity</h4>
        <Typography variant="h5" component="div">
          {quantity}
        </Typography>
      </CardContent>
    </Card>
    )}
    </Grid>
    
    <Grid item xs={12}>

   
    <Card sx={{ width: '100%', margin: '40px 0', padding: '16px', backgroundColor: '#f0f0f0' }}>

     <h4 className='card-title'>Pending Request </h4>
     <CardContent>
       <Typography variant="h5" component="div">

       </Typography>
       <Grid container spacing={2}>
      <Grid item xs={12}></Grid>
        <Grid item xs={12}>
        <TableContainer>
            <Table>
  <TableHead>
    <TableRow>
      <TableCell><b>#</b></TableCell>
      <TableCell><b>Requested Branch</b></TableCell>
      <TableCell><b>Requested BY</b></TableCell>
      <TableCell><b>Prefix</b></TableCell>
      <TableCell><b>Quantity</b></TableCell>
      <TableCell><b>From Series</b></TableCell>
      <TableCell><b>To Series</b></TableCell>
      <TableCell><b>Action</b></TableCell>
    
     
    
     

    </TableRow>
    </TableHead>
    <TableBody>
    {pendingLR.map((entry, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{entry.branchid}</TableCell>
                  <TableCell>{entry.requestedBy}</TableCell>
                  <TableCell>{entry.prefix}</TableCell>
                  <TableCell>{entry.qty}</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell>NA</TableCell>
                  <TableCell><Button variant='contained' color='primary'  onClick={() => handleShow(entry)}>Allocate</Button></TableCell>
                  </TableRow>
              ))}
               
    </TableBody>
    </Table>
    </TableContainer>
    </Grid>
    </Grid>
       </CardContent>
   </Card>
   </Grid>
    </Grid>

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
      <div style={{ position: 'relative', backgroundColor: 'white', padding: '20px', borderRadius: '5px', maxWidth: '50%', maxHeight: '80%', overflow: 'auto', marginTop: '40px' }}>
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
        <Grid container spacing={2}>
            <Grid item xs={4}>
            <FormControl fullWidth>
      <InputLabel id="Branch" >Select Branch*</InputLabel>

        <Select
          labelId="Branch"
          
          value={searchBranch}
          variant="standard"
          onChange={handleBranchChange}
          disabled
        >
           <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                <MenuItem value={searchBranch}>{searchBranch}</MenuItem>
         
        </Select>
      
    </FormControl>


            </Grid>
            <Grid item xs={4}>
            <TextField
                variant="standard"
                name="qty"
                value={allocateLR.qty}
                label="Requested Quantity*"
                onChange={handleAllocateLR}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px'} }}
                
              />
              </Grid>
              
              <Grid item xs={4}>
              <TextField
                variant="standard"
                name="lastSeries"
                value={allocateLR.lastSeries}
                label="Last Series*"
                onChange={handleAllocateLR}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' } }}
                disabled
              />
              </Grid>
              
              <Grid item xs={4}>
              <TextField
                variant="standard"
                name="seriesFrom"
                value={allocateLR.seriesFrom}
                label="From Series*"
                onChange={handleAllocateLR}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px' } }}
                
              />
              </Grid>
              <Grid item xs={4}>
             
              <TextField
                variant="standard"
                name="seriesTo"
                value={allocateLR.seriesTo}
                label="To Series*"
                onChange={handleAllocateLR}
                size='small'
                className="textfield-vehicle"
                InputLabelProps={{ style: { fontSize: '14px'} }}
                
              />
              </Grid>


              </Grid>

              <Button variant='contained' color='primary'onClick={handleSubmit}>Submit</Button>


           </div>
           </Modal>



    </div>
    )


}
export default AllocatingLR;