import React from "react";
import { Route, Routes } from "react-router-dom";
import DashboardTms from "../Dashboard/Dashboard";
import AddUserList from '../tmsComponents/MASTERS/UserList';
import AddBranchList from "../tmsComponents/MASTERS/BranchList";
import AddSubBranchList from "../tmsComponents/MASTERS/SubBranchList";
import Addcustomer from "../tmsComponents/MASTERS/CustomerList";
import ConsignorList  from "../tmsComponents/MASTERS/ConsignorList";
import  VendorList  from "../tmsComponents/MASTERS/VendorList";
import  LocationMaster  from "../tmsComponents/MASTERS/LocationMaster";
import BranchMaster from "../tmsComponents/MASTERS/BranchMaster";
import MenuAssignmentForm from "../tmsComponents/MASTERS/AssignMenus";
import AddVehicle from "../tmsComponents/MASTERS/Vehicle";
import MyForm from "../tmsComponents/FTL/FTLBooking";
import AddDriver from "../tmsComponents/MASTERS/DriverMaster";
import MyComponent from "../Testing";
import MyFTLCommercial from "../tmsComponents/MASTERS/FTLCommercial";
import RequestLR from "../tmsComponents/MASTERS/RequestLR";
import AllocatingLR from "../tmsComponents/MASTERS/AllocateLR";
// import FTLBooking from "../Modules/LTL/Booking";


function tmsRouting(){

  return(
<>

  
         <Routes>
        <Route path="/Dashboard" element={<DashboardTms />} /> 

        {/* Masters */}

        <Route path="/Master/User" element={<AddUserList />} /> 
        <Route path="/Master/Menu" element={"Assingn Menu"} />
        <Route path="/Master/Branch" element={<AddBranchList/>} />
        <Route path="/Master/SubBranch" element={<AddSubBranchList />} />
        <Route path="/Master/Customer" element={< Addcustomer/>} />
        <Route path="/Master/Consignor" element={< ConsignorList/>} />
        <Route path="/Master/Product" element={"Product "} />
        <Route path="/Master/Commercial" element={"Commercial "} />
        <Route path="/Master/AddCarrier" element={< VendorList/>} />
        <Route path="/Master/CommercialUpdates" element={" Commercial updates"} />
        <Route path="/Master/AddLocation" element={< LocationMaster/>} />
        <Route path="/*" element={<h1>This 404 page  </h1>} />
        <Route path="/" element={<DashboardTms />} />
        <Route path="/Master/Branch/AddBranch" element={<BranchMaster />} />
        <Route path="/Master/AssignMenus" element={<MenuAssignmentForm />} />
        <Route path="/Master/Vehicle" element={<AddVehicle />} />
        <Route path="/Master/Driver" element={<AddDriver/>}/>
        <Route path="/Master/RequestLR" element={<RequestLR/>}/>
        <Route path="/Master/AllocateLR" element={<AllocatingLR/>}/>
    

        {/* <Route path="/FTL/:name" element={<FTLBooking />} />  */}

        
        {/* Oprations link */}
        <Route path="/LTL/Booking" element={< MyForm/>} />
        <Route path="/Testing" element={<MyComponent/>}/>
        <Route path='/Master/FTLCommercial' element={<MyFTLCommercial/>}/>
       
      </Routes> 

</>
  );
}

export default tmsRouting;
