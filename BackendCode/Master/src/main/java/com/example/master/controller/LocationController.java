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

import com.example.master.entity.LocationMaster;
import com.example.master.service.LocationService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/locations")
@CrossOrigin(origins = "*")
public class LocationController {
	
	@Autowired
	LocationService locationService;
	
	@GetMapping
public ResponseEntity<List<LocationMaster>> getAllLocations(){
List<LocationMaster> list=locationService.getAllLocations();

return new ResponseEntity<List<LocationMaster>>(list, new HttpHeaders(), HttpStatus.OK);
}

@PostMapping("/create")
public ResponseEntity<LocationMaster> create(@RequestBody LocationMaster locationMaster) {
System.out.println("Received user object in controller: " + locationMaster);
LocationMaster created = locationService.create(locationMaster);
return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
}

@PutMapping("/update")
public ResponseEntity<LocationMaster> updateLocation(@RequestBody LocationMaster UpdatedLocation) {
    try {
        // Call the updatelocation method from the service
    	LocationMaster updatedLocationResult = locationService.updateLocation(UpdatedLocation);
        return new ResponseEntity<>(updatedLocationResult, HttpStatus.OK);
    } catch (EntityNotFoundException e) {
        // Handle the case where the client with the given ID is not found
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    } catch (Exception e) {
        // Handle other exceptions
        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

@DeleteMapping("/delete/{id}")
	public ResponseEntity<Void> deleteLocation(@PathVariable Integer id) {
try {
// Call the deleteLocation method from the service
locationService.deleteLocation(id);
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
