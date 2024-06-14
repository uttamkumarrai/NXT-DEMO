package com.example.master.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.master.entity.LocationMaster;
import com.example.master.repository.LocationRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LocationService {
	
	@Autowired
	LocationRepository locationRepository;
	
	public List<LocationMaster> getAllLocations(){
		List<LocationMaster> LocationList =locationRepository.findAll();
		if(LocationList.size()>0) {
			return LocationList;
		}
		else {
			return new ArrayList<LocationMaster>();
		}
	}
	
	public LocationMaster create(LocationMaster locationMaster) {
	    locationMaster = locationRepository.save(locationMaster);
	    return locationMaster;
	}
	
	public LocationMaster updateLocation(LocationMaster updatedLocationMaster) {
	    Optional<LocationMaster> existingLocationOptional = locationRepository.findById(updatedLocationMaster.getLocation_Id());

	    if (existingLocationOptional.isPresent()) {
	    	LocationMaster existingLocation = existingLocationOptional.get();
	        // Update the fields of the existing SubBranch with the values from the updated branch
	    	existingLocation.setLocation_PinCode(updatedLocationMaster.getLocation_PinCode());
	    	existingLocation.setState_Id(updatedLocationMaster.getState_Id());
	    	existingLocation.setCity_Id(updatedLocationMaster.getCity_Id());
			existingLocation.setLocation_Name(updatedLocationMaster.getLocation_Name());
	    	
	    	
	    	
	       

	        // Save the updated SubBranch to the repository
	        return locationRepository.save(existingLocation);
	    } else {
	        // Handle the case where the subBranch with the given ID is not found
	        throw new EntityNotFoundException("Location with ID " + updatedLocationMaster.getLocation_Id() + " not found");
	    }
	}
	
	  public void deleteLocation(Integer id) {
	        // Check if the Branch with the given ID exists
	        if (locationRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	        	locationRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("location with ID " + id + " not found");
	        }
	    }

}
