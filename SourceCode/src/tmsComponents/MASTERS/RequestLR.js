// RequestLR.js
import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import {Select, FormControl, InputLabel, Grid } from '@mui/material';
import {Button, TextField } from '@material-ui/core';
import { API_ENDPOINTS } from '../../configFiles/apiConfig';
import './Request.css';

function RequestLR() {
const[branch,setBranch]=useState('');
const[branchOptions,setBranchOptions]=useState([]);
const [user, setUser] = useState(null);
const[lrDetails,setLRDetails]=useState({
  branchname:'',
    prefix:'',
   
  
    qty:'',
    initiatorempid:'',
    branchid:'',
    requestedBy:'',
   
    status:'',
   
    fromSeries:'0',
    toSeries:'',
    requestedFlag:false,
    nextApproverEmpid:'',
    nextApproverName:'',
    // approvedFlag:false,



   
})

const resetForm=()=>{
  setLRDetails({
    branchname:'',
    prefix:'',
   
  
    qty:'',
    initiatorempid:'',
    branchid:'',
    requestedBy:'',
   
    status:'',
   
    fromSeries:'',
    toSeries:'',
    requestedFlag:false,
    nextApproverEmpid:'',
    nextApproverName:'',

  })
    
   
  
    

};

const handleLRDetails = (e) => {
    const { name, value } = e.target;
    
   
  
    setLRDetails(prevState => ({
      ...prevState,
      [name]: value,
    }));
    console.log("input change",lrDetails);
    
  };

  const handleBranchChange = async(e) => {
    const selectedOption = branchOptions.find(option => option.value === e.target.value);
    const selectedLabel = branchOptions.find(option => option.value === branch)?.label || '';
    console.log(selectedLabel);
    setBranch(selectedOption.value);

    
    
  };

  
    const fetchData = async (branchid) => {
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'branches/Bybranchid/'+branchid);
        const result = await response.json();
     setBranch(result.branchname);
     
     setLRDetails(prevState => ({
      ...prevState,
      prefix:result.lr_Prefix,
     
    }));
       console.log("fetch branch data",lrDetails);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
   
 

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'users/ByEmpid/1987');
        const result = await response.json();
       localStorage.setItem("user",JSON.stringify(result));
         const storedUser = localStorage.getItem('user');

         console.log(storedUser);
    if (storedUser) {
      // setUser(JSON.parse(storedUser));
      // console.log(user);

      const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
         
          
          setLRDetails(prevState => ({
            ...prevState,
            initiatorempid: parsedUser.empid,
            requestedBy: parsedUser.empname,
            branchid: parsedUser.branchid,
          }));
          fetchData(parsedUser.branchid);
          
          fetchNextApprover(parsedUser.branchid,parsedUser.employeeRoleType)
          fetchSeries(parsedUser.branchid)


    }
        
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchUser();
  }, []);


 
const fetchNextApprover=async(id,employeeRoleType)=>{
  console.log("next approver",id,employeeRoleType);
  try {
    let branchid=id;
    let endpoint = '';
    if (employeeRoleType === 'Branch User') {
      endpoint = 'Branch Head';
    } else if (employeeRoleType === 'Branch Head') {
      endpoint = 'Super Admin';
      branchid='90';
    }
  if(endpoint){
     const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'users/'+branchid+'/'+endpoint);
    
     const result = await response.json();
     setLRDetails(prevState => ({
      ...prevState,
      nextApproverEmpid: result[0].empid,
      nextApproverName: result[0].empname,
    }));
  }
  }catch(error){

  }

}

const fetchSeries=async(branchid)=>{
  try {
  const response = await fetch(API_ENDPOINTS.FETCH_DATA + 'AssignLR/unutilized/'+branchid);
    
  const result = await response.json();

  if (!result || result.length === 0) {
    console.warn('No data found');
    setLRDetails(prevState => ({
      ...prevState,
      fromSeries: '', // or any default value you prefer
    }));
    return;
  }
  const maxEntry = result.reduce((max, entry) => (entry.id > max.id ? entry : max), result[0]);
  setLRDetails(prevState => ({
    ...prevState,
    fromSeries: maxEntry.seriesTo,
  }))
    
 
}catch(error){
console.error('Error fetching Pending LR:', error);
}

}


  const handleSubmit=async()=>{

     // Parse fromSeries and Quantity into integers
  const fromSeriesInt = parseInt(lrDetails.fromSeries);
  const QuantityInt = parseInt(lrDetails.qty);

  // Check if parsing was successful
  if (isNaN(fromSeriesInt) || isNaN(QuantityInt)) {
    console.error('Invalid fromSeries or Quantity');
    return;
  }

  // Calculate the toSeries value by adding the parsed integers
  const toSeriesValue = fromSeriesInt + QuantityInt;

    const totalData={
      ...lrDetails,
    approvedFlag:false,
     status:'open',
     requestedFlag:true,
     toSeries:toSeriesValue.toString(), 
     branchname:branch,
    }
    console.log("total Data",totalData);
    try {
    let url = '';
    let method = '';

   
        url = API_ENDPOINTS.FETCH_DATA + 'LR/create';
        method = 'POST';
   

    const response = await fetch(url, {
        method: method,
        headers: {
            'Content-Type': 'application/json',
        },
        
       
        body:JSON.stringify(totalData)
    });

    if (!response.ok) {
        throw new Error('Failed to save changes');
    }
    
      window.showToast("LR Request Sent Successfully to  "+lrDetails.nextApproverName, "success");
      resetForm();

  } catch (error) {
    console.error('Error Sending LR Request:', error);
    // Optionally, you can display an error message to the user
}

  }






  return (
    <div>
       
    {/* <Card sx={{ width: '100%', margin: '16px 0', padding: '1px',backgroundColor: '#62799e',height:'50%' }}>
      <CardContent>
        <Typography variant="h5" component="div">
          LR Request
        </Typography>
      </CardContent>
    </Card> */}

    
     <Card sx={{ width: '100%', margin: '40px 0', padding: '16px', backgroundColor: '#f0f0f0' }}>

     <h4 className='card-title'>LR Request </h4>
     <CardContent>
       <Typography variant="h5" component="div">
        <Grid container spacing={2}>
            <Grid item xs={3}>
       <FormControl fullWidth>
      <InputLabel id="Branch">Select Branch*</InputLabel>

        <Select
          labelId="Branch"
          
          value={branch}
          variant="standard"
          onChange={handleBranchChange}
          disabled
         
        >
          <MenuItem value="">
    <em>None</em>
  </MenuItem>
  {/* Render a single MenuItem with the fetched branch name */}
  <MenuItem value={branch}>{branch}</MenuItem>
</Select>
      
    </FormControl>
    </Grid>
    <Grid item xs={2}>
              <TextField
            
                variant="standard"
                name="prefix"
                label="Prefix*"
                value={lrDetails.prefix}
                onChange={handleLRDetails}
                size='small'
               
                InputLabelProps={{ style: { fontSize: '14px'  } }}
                
              />
            </Grid>
    <Grid item xs={2}>
              <TextField
             
                variant="standard"
                name="qty"
                label="Quantity*"
                value={lrDetails.qty}
                onChange={handleLRDetails}
                size='small'
               
                InputLabelProps={{ style: { fontSize: '14px'} }}
                
              />
            </Grid>
           
            <Grid item xs={2}>
              <TextField
            
                variant="standard"
                name="fromSeries"
                label="Last Series*"
                value={lrDetails.fromSeries}
                onChange={handleLRDetails}
                size='small'
               
                InputLabelProps={{ style: { fontSize: '14px'  } }}
                
              />
            </Grid>
            <Grid item xs={3}>
                <Button variant='contained' color='primary' onClick={handleSubmit}>Request</Button>
            </Grid>
    </Grid>
       </Typography>
     </CardContent>
   </Card>
   </div>
    
  );
}

export default RequestLR;
