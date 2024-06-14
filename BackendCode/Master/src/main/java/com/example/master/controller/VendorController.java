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

import com.example.master.entity.ClientMaster;
import com.example.master.entity.User;
import com.example.master.entity.VendorMaster;
import com.example.master.service.VendorService;

import jakarta.persistence.EntityNotFoundException;



@RestController
@RequestMapping("/vendors")
@CrossOrigin(origins = "*")
public class VendorController {
	
	@Autowired
	VendorService vendorService;
	
	@GetMapping
	public ResponseEntity<List<VendorMaster>> getAllVendors(){
		List<VendorMaster> list=vendorService.getAllVendors();
		
		return new ResponseEntity<List<VendorMaster>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	
	  @GetMapping("Byid/{id}")
	    public ResponseEntity<VendorMaster> getVendorByid(@PathVariable("id") int id) {

	        try {
//	        	VendorMaster vendor = vendorService.getVendorByid(id);
	            return new ResponseEntity<>(vendorService.getVendorByid(id), HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	  
	  @GetMapping("/{initiatorbId}")
	    public ResponseEntity<List<VendorMaster>> getByinitiatorbId(@PathVariable("initiatorbId") int initiatorbId) {
	        try {
	            List<VendorMaster> vendors = vendorService.getByinitiatorbId(initiatorbId);
	            return new ResponseEntity<>(vendors, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }  
	
	@PostMapping("/create")
	public ResponseEntity<VendorMaster> create(@RequestBody VendorMaster vendorMaster){
		System.out.println("Received user object in controller: " + vendorMaster);
		VendorMaster updated=vendorService.create(vendorMaster);
		return new ResponseEntity<VendorMaster>(updated, new HttpHeaders(),HttpStatus.OK);
		
		
		
	}
	
	  @PutMapping("/update")
	    public ResponseEntity<VendorMaster> updateVendor(@RequestBody VendorMaster updatedVendor) {
	        try {
	            // Call the updateClient method from the service
	        	VendorMaster updatedVendorResult = vendorService.updateVendor(updatedVendor);
	            return new ResponseEntity<>(updatedVendorResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteVendor(@PathVariable Integer id) {
	        try {
	            // Call the deleteVendor method from the service
	        	vendorService.deleteVendor(id);
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
