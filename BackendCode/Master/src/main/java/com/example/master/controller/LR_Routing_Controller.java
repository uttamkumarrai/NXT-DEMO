package com.example.master.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.master.entity.BranchMaster;
import com.example.master.entity.LR_Request_Routing;
import com.example.master.entity.User;
import com.example.master.service.LR_Routing_Service;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/LR")
@CrossOrigin(origins = "*")
public class LR_Routing_Controller {
	
	@Autowired
	LR_Routing_Service lrRoutingService;
	
	@PostMapping("/create")
	public ResponseEntity<LR_Request_Routing> create(@RequestBody LR_Request_Routing lrRequestRouting) {
	    System.out.println("Received user object in controller: " + lrRequestRouting);
	   
	    LR_Request_Routing created = lrRoutingService.create(lrRequestRouting);
	    return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	 @GetMapping("/{nextApproverEmpid}/{approvedFlag}")
	    public ResponseEntity<List<LR_Request_Routing>> getLRByNextApproverEmpidAndApprovedFlag(@PathVariable("nextApproverEmpid") String nextApproverEmpid,@PathVariable("approvedFlag") Boolean approvedFlag) {
	        try {
	        	if(!approvedFlag) {
	            List<LR_Request_Routing> pendingLR = lrRoutingService.getLRByNextApproverEmpidAndApprovedFlag(nextApproverEmpid, approvedFlag);
	            return new ResponseEntity<>(pendingLR, HttpStatus.OK);
	        	}else {
	        		 return new ResponseEntity<>(Collections.emptyList(), HttpStatus.OK);
	        	}
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	 
	 
	 @PutMapping("/update")
	    public ResponseEntity<LR_Request_Routing> updateLRRequest(@RequestBody LR_Request_Routing lrRequest) {
	        try {
	        	System.out.println("Received LR for Update: " + lrRequest);
	            // Call the updateBranch method from the service
	        	LR_Request_Routing updatedLRResult = lrRoutingService.updateLrRequest(lrRequest);
	            return new ResponseEntity<>(updatedLRResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }

}
