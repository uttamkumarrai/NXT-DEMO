package com.example.master.controller;

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
import org.springframework.web.bind.annotation.RestController;


import com.example.master.entity.SubBranchMaster;
import com.example.master.service.SubBranchService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/SubBranches")
@CrossOrigin(origins = "*")
public class SubBranchController {
	
	@Autowired
	SubBranchService subBranchService;
	
	@GetMapping
	public ResponseEntity<List<SubBranchMaster>> getAllSubBranches(){
		List<SubBranchMaster> list=subBranchService.getAllSubBranches();
		
		return new ResponseEntity<List<SubBranchMaster>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	  @GetMapping("Byid/{id}")
	    public ResponseEntity<SubBranchMaster> getBranchBybranchid(@PathVariable("id") int id) {
//		  System.out.println("employee code......"+empid);
	        try {
	        	SubBranchMaster subBranch = subBranchService.getSubBranchByid(id);
	            return new ResponseEntity<>(subBranch, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	  
	  @GetMapping("/{reportingbranch}")
	    public ResponseEntity<List<SubBranchMaster>> getBranchByreportingbranch(@PathVariable("reportingbranch") String reportingbranch) {
	        try {
	            List<SubBranchMaster> subBranch = subBranchService.getBranchByreportingbranch(reportingbranch);
	            return new ResponseEntity<>(subBranch, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }  

	
	@PostMapping("/create")
	public ResponseEntity<SubBranchMaster> create(@RequestBody SubBranchMaster subBranchMaster) {
	    System.out.println("Received user object in controller: " + subBranchMaster);
	    SubBranchMaster created = subBranchService.create(subBranchMaster);
	    return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	  @PutMapping("/update")
	    public ResponseEntity<SubBranchMaster> updateSubBranch(@RequestBody SubBranchMaster updatedSubBranch) {
	        try {
	            // Call the updateSubBranch method from the service
	        	SubBranchMaster updatedSubBranchResult = subBranchService.updateSubBranch(updatedSubBranch);
	            return new ResponseEntity<>(updatedSubBranchResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  
	  @DeleteMapping("/delete/{id}")
	  	public ResponseEntity<Void> deleteSubBranch(@PathVariable Integer id) {
    try {
        // Call the deletesubBranch method from the service
    	subBranchService.deleteSubBranch(id);
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
