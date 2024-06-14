package com.example.master.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.master.entity.Driver;
import com.example.master.repository.DriverRepository;

@Service
public class DriverService {
	
	@Autowired
	DriverRepository driverRepository;
	
	public List<Driver> getAllDrivers(){
		return driverRepository.findAll();
		
	}
	
	
	

	    public void create(Driver formData, String fileName, String filePath) {
	        formData.setFileName(fileName);
	        formData.setFilePath(filePath);
	        
	        // Save the driver entity to the database
	        driverRepository.save(formData);

	    }
	


}
