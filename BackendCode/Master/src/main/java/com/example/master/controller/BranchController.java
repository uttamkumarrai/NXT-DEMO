package com.example.master.controller;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.master.entity.BranchMaster;

import com.example.master.service.BranchService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/branches")
@CrossOrigin(origins = "*")
public class BranchController {
	
	@Autowired
	BranchService branchService;
	
	 @GetMapping("/ip")
	    @ResponseBody
	    public String getIPAddress() {
	        String ipAddress;
	        try {
	            InetAddress inetAddress = InetAddress.getLocalHost();
	            ipAddress = inetAddress.getHostAddress();
	            String host=inetAddress.getHostName();
	            System.out.println("host"+host);
	        } catch (UnknownHostException e) {
	            e.printStackTrace();
	            ipAddress = "Unknown";
	        }
	        return "System IP Address: " + ipAddress;
	    }
	
	@GetMapping
	public ResponseEntity<List<BranchMaster>> getAllBranches(){
		List<BranchMaster> list=branchService.getAllBranches();
		
		return new ResponseEntity<List<BranchMaster>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	
	  @GetMapping("Bybranchid/{branchid}")
	    public ResponseEntity<BranchMaster> getBranchBybranchid(@PathVariable("branchid") int branchid) {
//		  System.out.println("employee code......"+empid);
	        try {
	            BranchMaster branch = branchService.getbranchBybranchid(branchid);
	            return new ResponseEntity<>(branch, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	
	@PostMapping("/create")
	public ResponseEntity<BranchMaster> create(@RequestBody BranchMaster branchMaster) {
	    System.out.println("Received user object in controller: " + branchMaster);
	   
	    BranchMaster created = branchService.create(branchMaster);
	    return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	  @PutMapping("/update")
	    public ResponseEntity<BranchMaster> updateBranch(@RequestBody BranchMaster updatedBranch) {
	        try {
	            // Call the updateBranch method from the service
	        	BranchMaster updatedBranchResult = branchService.updateBranch(updatedBranch);
	            return new ResponseEntity<>(updatedBranchResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  
	  @DeleteMapping("/delete/{id}")
	  	public ResponseEntity<Void> deleteBranch(@PathVariable Integer id) {
    try {
        // Call the deleteBranch method from the service
    	branchService.deleteBranch(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT); // HTTP 204
    } catch (EntityNotFoundException e) {
        // Handle the case where the client with the given ID is not found
        return new ResponseEntity<>(HttpStatus.NOT_FOUND); // HTTP 404
    } catch (Exception e) {
        // Handle other exceptions
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // HTTP 500
    }
}
	  
	  

}
