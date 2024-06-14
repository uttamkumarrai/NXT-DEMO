package com.example.master.controller;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.example.master.entity.Driver;
import com.example.master.service.DriverService;

@RestController
@RequestMapping("/drivers")
@CrossOrigin(origins = "*")
public class DriverController {
	
	@Autowired
	DriverService driverService;
	
	  @Value("${file.upload.path}") // Inject the upload directory path from application.properties
	    private String uploadDirectory;
	
	@GetMapping
	public ResponseEntity<List<Driver>> getAllDrivers(){
		List<Driver> list=driverService.getAllDrivers();
		return new ResponseEntity<List<Driver>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	
    @PostMapping("/add")
    public String addDriver(@ModelAttribute Driver formData,
                            @RequestParam("file") MultipartFile file) throws IOException {
        
        // Check if the file is not empty
        if (!file.isEmpty()) {
            try {
            	 String directoryPath = uploadDirectory + File.separator + "NEIN-TMS" + File.separator + "Driver";
                 File directory = new File(directoryPath);

                 // Create the directory if it doesn't exist
                 if (!directory.exists()) {
                     if (!directory.mkdirs()) {
                         // Directory creation failed, handle the error
                         throw new IOException("Failed to create directory: " + directoryPath);
                     }
                 }

                 // Get the original filename
                 String fileName = file.getOriginalFilename();

                 // Construct the file path within the directory
                 String filePath = directoryPath + File.separator + fileName;
                 File dest = new File(filePath);

                 // Transfer the file to the destination
                 file.transferTo(dest);

                
                // Call your service method and pass form data, filename, and filepath
                driverService.create(formData, fileName, filePath.toString());
                
                return "Driver added successfully";
            } catch (IOException e) {
                e.printStackTrace();
                return "Failed to add driver";
            }
        } else {
            return "File is empty";
        }
    }

}
