package com.example.master.service;

import java.util.ArrayList;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.master.entity.ConsignerMaster;
import java.util.Optional;

import com.example.master.repository.ConsignorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ConsignorService {
	
	@Autowired
	ConsignorRepository consignorRepository;
	
	public List<ConsignerMaster> getAllConsignor(){
		List<ConsignerMaster> consignorList =consignorRepository.findAll();
		if(consignorList.size()>0) {
			return consignorList;
		}
		else {
			return new ArrayList<ConsignerMaster>();
		}
	}
	
	 public ConsignerMaster getConsignerByid(int id) {
		 
		  java.util.Optional<ConsignerMaster> consignerOptional = consignorRepository.findByid(id);
		    if (consignerOptional.isPresent()) {
		        return consignerOptional.get();
		    } else {
		    	 return consignerOptional.orElse(null);
		    }
	 }
	  public List<ConsignerMaster> getByinitiatorBId(int initiatorBId) {
	        List<ConsignerMaster> consignors = consignorRepository.findByinitiatorBId(initiatorBId);

	        if (!consignors.isEmpty()) {
	            return consignors;
	        } else {
	            throw new EntityNotFoundException("No users found for branchid " + initiatorBId);
	        }
	    }

	
	public ConsignerMaster create(ConsignerMaster consignerMaster) {
	    consignerMaster = consignorRepository.save(consignerMaster);
	    return consignerMaster;
	}
	
	public ConsignerMaster updateConsignor(ConsignerMaster updatedConsignorMaster) {
	    Optional<ConsignerMaster> existingConsignorOptional = consignorRepository.findById(updatedConsignorMaster.getId());

	    if (existingConsignorOptional.isPresent()) {
	    	ConsignerMaster existingConsignor = existingConsignorOptional.get();
	        // Update the fields of the existing consignor with the values from the updated client
	    	existingConsignor.setConsignorName(updatedConsignorMaster.getConsignorName());
	    	existingConsignor.setGstNumber(updatedConsignorMaster.getGstNumber());
	    	existingConsignor.setPanNumber(updatedConsignorMaster.getPanNumber());
	    	existingConsignor.setPinCode(updatedConsignorMaster.getPinCode());
	    	existingConsignor.setLocation(updatedConsignorMaster.getLocation());
	    	existingConsignor.setCity(updatedConsignorMaster.getCity());
	    	existingConsignor.setState(updatedConsignorMaster.getState());
	    	existingConsignor.setAddress(updatedConsignorMaster.getAddress());
	    	existingConsignor.setContactPersonName(updatedConsignorMaster.getContactPersonName());
	    	existingConsignor.setContactEmail(updatedConsignorMaster.getContactEmail());
	    	existingConsignor.setContactNo(updatedConsignorMaster.getContactNo());
	    	
	       

	        // Save the updated client to the repository
	        return consignorRepository.save(existingConsignor);
	    } else {
	        // Handle the case where the client with the given ID is not found
	        throw new EntityNotFoundException("Consignor with ID " + updatedConsignorMaster.getId() + " not found");
	    }
	}
	
	  public void deleteConsignor(Integer id) {
	        // Check if the client with the given ID exists
	        if (consignorRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	        	consignorRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("vendor with ID " + id + " not found");
	        }
	    }

}
