package com.example.master.controller;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;


import com.example.master.entity.ConsignerMaster;

import com.example.master.service.ConsignorService;

import jakarta.persistence.EntityNotFoundException;


@RestController
@RequestMapping("/consignor")
@CrossOrigin(origins = "*")
public class ConsignorController {

	@Autowired
	ConsignorService consignorService;	
	
	@GetMapping
	public ResponseEntity<List<ConsignerMaster>> getAllConsignor(){
		List<ConsignerMaster> list=consignorService.getAllConsignor();
		
		return new ResponseEntity<List<ConsignerMaster>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	
	 @GetMapping("Byid/{id}")
	    public ResponseEntity<ConsignerMaster> getConsignerByid(@PathVariable("id") int id) {
		
	        try {
	        	ConsignerMaster consigner = consignorService.getConsignerByid(id);
	        	return new ResponseEntity<>(consigner, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	  @GetMapping("/{initiatorBId}")
	    public ResponseEntity<List<ConsignerMaster>> getUsersByclientBranchId(@PathVariable("initiatorBId") int initiatorBId) {
	        try {
	            List<ConsignerMaster> consignor = consignorService.getByinitiatorBId(initiatorBId);
	            return new ResponseEntity<>(consignor, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }  
	
	@PostMapping("/create")
	public ResponseEntity<ConsignerMaster> create(@RequestBody ConsignerMaster consignerMaster) {
	    System.out.println("Received user object in controller: " + consignerMaster);
	    ConsignerMaster created = consignorService.create(consignerMaster);
	    return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	  @PostMapping("/upload")
	    public String uploadFile(@RequestParam("file") MultipartFile file) {
		  System.out.println("the upload");
	        if (file.isEmpty()) {
	            return "Please select a file to upload";
	        }
	        try {
	            byte[] bytes = file.getBytes();
	            String filePath = "E:/stupid/" + file.getOriginalFilename();
	            Path path = Paths.get(filePath);
	            Files.write(path, bytes);
	            return "File uploaded successfully";
	        } catch (IOException e) {
	            e.printStackTrace();
	            return "Failed to upload file";
	        }
	    }
	
	
	  @PutMapping("/update")
	    public ResponseEntity<ConsignerMaster> updateConsigner(@RequestBody ConsignerMaster updatedConsigner) {
	        try {
	            // Call the updateConsigner method from the service
	        	ConsignerMaster updatedConsignerResult = consignorService.updateConsignor(updatedConsigner);
	            return new ResponseEntity<>(updatedConsignerResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteConsignor(@PathVariable Integer id) {
	        try {
	            // Call the deleteConsignor method from the service
	        	consignorService.deleteConsignor(id);
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
