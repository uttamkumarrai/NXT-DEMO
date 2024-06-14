package com.example.master.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.master.entity.ClientMaster;
import com.example.master.entity.VendorMaster;
import com.example.master.repository.VendorRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class VendorService {
	
	@Autowired
	VendorRepository vendorRepository;
	
	public List<VendorMaster> getAllVendors(){
		List<VendorMaster> vendorList =vendorRepository.findAll();
		if(vendorList.size()>0) {
			return vendorList;
		}
		else {
			return new ArrayList<VendorMaster>();
		}
	}
	 public VendorMaster getVendorByid(int id) {
		  
		  java.util.Optional<VendorMaster> vendorOptional = vendorRepository.findByid(id);

		    if (vendorOptional.isPresent()) {
		        return vendorOptional.get();
		    } else {
		    	 return vendorOptional.orElse(null);
		    }
	 }
	
	public VendorMaster create(VendorMaster vendorMaster){
		 
		 
		vendorMaster = vendorRepository.save(vendorMaster);
	        return vendorMaster;
	 
}
	public VendorMaster updateVendor(VendorMaster updatedVendorMaster) {
	    Optional<VendorMaster> existingVendorOptional = vendorRepository.findById(updatedVendorMaster.getId());

	    if (existingVendorOptional.isPresent()) {
	    	VendorMaster existingVendor = existingVendorOptional.get();
	        // Update the fields of the existing client with the values from the updated client
	    	existingVendor.setVrfId(updatedVendorMaster.getVrfId());
	    	existingVendor.setVrfCode(updatedVendorMaster.getVrfCode());
	    	existingVendor.setVrfCodeCreatedDate(updatedVendorMaster.getVrfCodeCreatedDate());
	    	existingVendor.setVendorName(updatedVendorMaster.getVendorName());
	    	existingVendor.setVendorAddress(updatedVendorMaster.getVendorAddress());
	    	existingVendor.setVendorType(updatedVendorMaster.getVendorType());
	    	existingVendor.setCreditPeriod(updatedVendorMaster.getCreditPeriod());
	    	existingVendor.setAgreementNo(updatedVendorMaster.getAgreementNo());
	    	existingVendor.setAgreementFromDate(updatedVendorMaster.getAgreementFromDate());
	    	existingVendor.setAgreementToDate(updatedVendorMaster.getAgreementToDate());
	    	existingVendor.setTds(updatedVendorMaster.getTds());
	    	existingVendor.setStatus(updatedVendorMaster.getStatus());
	    	existingVendor.setGst(updatedVendorMaster.getGst());
	    	existingVendor.setSgstFreight(updatedVendorMaster.getSgstFreight());
	    	existingVendor.setCgstFreight(updatedVendorMaster.getCgstFreight());
	    	existingVendor.setIgstFreight(updatedVendorMaster.getIgstFreight());
	    	existingVendor.setSgstCharges(updatedVendorMaster.getSgstCharges());
	    	existingVendor.setCgstCharges(updatedVendorMaster.getCgstCharges());
	    	existingVendor.setIgstCharges(updatedVendorMaster.getIgstCharges());
	       

	        // Save the updated client to the repository
	        return vendorRepository.save(existingVendor);
	    } else {
	        // Handle the case where the client with the given ID is not found
	        throw new EntityNotFoundException("vendor with ID " + updatedVendorMaster.getId() + " not found");
	    }
	}
	
	  public List<VendorMaster> getByinitiatorbId(int initiatorbId) {
	        List<VendorMaster> vendors = vendorRepository.findByinitiatorbId(initiatorbId);

	        if (!vendors.isEmpty()) {
	            return vendors;
	        } else {
	            throw new EntityNotFoundException("No users found for branchid " + initiatorbId);
	        }
	    }
	
	  public void deleteVendor(Integer id) {
	        // Check if the client with the given ID exists
	        if (vendorRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	        	vendorRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("vendor with ID " + id + " not found");
	        }
	    }

	
	
}
