package com.example.master.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.master.entity.ConsignerMaster;
import com.example.master.entity.FTLCommercial;
import com.example.master.service.FTLCommercialService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/FTLCommercial")
@CrossOrigin(origins = "*")
public class FTLCommercialController {
	
	@Autowired
	FTLCommercialService ftlCommercialService;
	
	 @PostMapping("/upload")
	 public ResponseEntity<String> uploadFile(@RequestParam("file") MultipartFile file) {
	        try {
	        	System.out.println("bulk upload");
	        	ftlCommercialService.saveExcelData(file);
	        	return ResponseEntity.ok("File uploaded and data saved successfully");
	        } catch (Exception e) {
	        	 e.printStackTrace();
	             return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	                     .body("Failed to upload file: " + e.getMessage());
	        }

}

	    @PostMapping("/AddCommercial")
	    public ResponseEntity<List<FTLCommercial>> addCommercial(@RequestBody List<FTLCommercial> entries) {
	    	System.out.println("Received user object in controller: " + entries);
	        List<FTLCommercial> savedEntries = ftlCommercialService.saveAllCommercials(entries);
	        return ResponseEntity.ok(savedEntries);
	    }
	    
	    @GetMapping("/{branchId}")
	    public ResponseEntity<List<FTLCommercial>> getCommercialByBranchId(@PathVariable("branchId") int branchId){
	    	  try {
		            List<FTLCommercial> commercial = ftlCommercialService.getCommercialByBranchId(branchId);
		            return new ResponseEntity<>(commercial, HttpStatus.OK);
		        } catch (EntityNotFoundException e) {
		            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		        }
	    }
	    
}
