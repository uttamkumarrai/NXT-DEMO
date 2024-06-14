package com.example.master.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.master.entity.Consignment;

import com.example.master.service.ConsignmentService;

import jakarta.persistence.EntityNotFoundException;



@RestController
@RequestMapping("/consignments")
@CrossOrigin(origins = "*")
public class ConsignmentController {
	
	@Autowired
	ConsignmentService consignmentService;
	
	@GetMapping
	public ResponseEntity<List<Consignment>> getAllConsignments(){
		List<Consignment> list=consignmentService.getAllConsignments();
		
		return new ResponseEntity<List<Consignment>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	

	
	@PostMapping("/create")
	public ResponseEntity<Consignment> create(@RequestBody Consignment consignment) {
	    System.out.println("Received user object in controller: " + consignment);
	    Consignment created = consignmentService.create(consignment);
	    return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	@GetMapping("/{vendorCode}")
	public ResponseEntity<List<Consignment>> getConsignmentsByvrfCode(@PathVariable("vendorCode") String vendorCode){
		try {
			List<Consignment> consignments=consignmentService.getConsignmentsByvendorCode(vendorCode);
			return new ResponseEntity<>(consignments,HttpStatus.OK);
			
			
		}catch(EntityNotFoundException e) {
			 return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}


}
