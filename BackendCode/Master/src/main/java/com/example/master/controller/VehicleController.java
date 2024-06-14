package com.example.master.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.master.entity.Vehicle;
import com.example.master.entity.VehicleDocuments;
import com.example.master.repository.VehicleDocumentsRepository;
import com.example.master.service.VehicleService;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "*")
public class VehicleController {
	
	@Autowired
	VehicleService vehicleService;
	
	@Autowired
	VehicleDocumentsRepository vehicleDocumentsRepository;
	
	
    @GetMapping("/vehicleType")
    public List<Map<String, Object>> getVehicleType() {
        return vehicleService.getVehicleType();
    }
	
	@GetMapping
	public ResponseEntity<List<Vehicle>>getAllVehicles(){
		List<Vehicle> list=vehicleService.getAllVehicles();
		return new ResponseEntity<List<Vehicle>>(list, new HttpHeaders(), HttpStatus.OK);
		
	}
	
	 @GetMapping("/combinedData")
	    public List<Object[]> getCombinedData() {
	        return vehicleService.getVehicleWithDocuments();
	    }
	
	
	  @GetMapping("/{registrationNumber}/files")
	    public List<VehicleDocuments> getVehicleFilesByRegistrationNumber(@PathVariable String registrationNumber) {
	        return vehicleService.getVehicleFilesByRegistrationNumber(registrationNumber);
	    }
	  
	  
	
	
	
//	  @PostMapping("/create")
//	    public ResponseEntity<Vehicle> create(@ModelAttribute Vehicle formData,
//	                                          @RequestParam(name = "firstInputFile", required = false) MultipartFile firstInputFile,
//	                                          @RequestParam(name = "File", required = false) Map<String, MultipartFile> file1,
//	                                          @RequestParam(name = "parameters", required = false) Map<String, String> parameters) {
//	        try {
//	        	System.out.println("coming to controller");
//	            List<MultipartFile> fileList = new ArrayList<>();
//	            List<String> fileTypes = new ArrayList<>();
//	            Map<String, String> startDates = parameters;
//	            Map<String, String> endDates = parameters;
//
//	            // Extract files and types from parameters
//	            for (Map.Entry<String, MultipartFile> entry : file1.entrySet()) {
//	                String key = entry.getKey();
//	                MultipartFile file = entry.getValue();
//	                fileList.add(file);
//	                String type = key.substring(0, key.length() - 4); // Remove "File" suffix to get type
//	                fileTypes.add(type);
//	            }
//
//	            // Pass the extracted data to your service method
//	            Vehicle created = vehicleService.create(formData, firstInputFile, fileList, fileTypes, startDates, endDates);
//	            return ResponseEntity.ok(created);
//	        } catch (Exception e) {
//	            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//	        }
//	    }
	
//	 @PostMapping("/upload")
//	    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
//	        try {
//	            String filePath = vehicleService.uploadImageToFileSystem(file);
//	            return new ResponseEntity<>(filePath, HttpStatus.OK);
//	        } catch (IOException e) {
//	            e.printStackTrace();
//	            return new ResponseEntity<>("Failed to upload file", HttpStatus.INTERNAL_SERVER_ERROR);
//	        }
//	    }
	   @PostMapping("/upload")
	   public ResponseEntity<Vehicle> uploadFiles(
	    		@ModelAttribute Vehicle formData,
	    		@RequestParam(value="files",required=false) List<MultipartFile> files,
	    		@RequestParam(value="labels",required=false) List<String> labels,
	            @RequestParam(value="startDates",required=false) List<String> startDates,
	            @RequestParam(value="endDates",required=false) List<String> endDates) {
		   try {
			   System.out.println("upload controller");
			   Integer id = formData.getId(); // Assuming getId() method exists in Vehicle class

		        if(id==null) {
		        System.out.println("id id null");
		        }else {
		        	 System.out.println("id"+id);
		        }
		        	
		        	
		        
			   
			   Map<String, String> startDateMap = convertToMap(startDates);
		        Map<String, String> endDateMap = convertToMap(endDates);
		       
		        Vehicle savedVehicle = vehicleService.create(formData, files,labels, startDates, endDates);
		        
		        return ResponseEntity.ok(savedVehicle);
		        
		    } catch (Exception e) {
		        e.printStackTrace();
		        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
		    }
	    
	}
	   
	   
	   @DeleteMapping("/delete/{id}")
	    public String delete(@PathVariable int id) {
		   Optional<VehicleDocuments> optionalEntity = vehicleDocumentsRepository.findByid(id);

	        // Check if the entity exists
	        if (optionalEntity.isPresent()) {
	            VehicleDocuments entity = optionalEntity.get();

	            // Set the flag value to false
	            entity.setFlag(false);

	            // Save the updated entity back to the database
	            vehicleDocumentsRepository.save(entity);

	            return "Deleted successfully!";
	        } else {
	            return "Entity not found for ID: " + id;
	        }
	    }
	   

private Map<String, String> convertToMap(List<String> startDates) {
	// TODO Auto-generated method stub
	return null;
}
}