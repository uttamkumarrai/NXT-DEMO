package com.example.master.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.master.entity.SubBranchMaster;
import com.example.master.repository.SubBranchRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class SubBranchService {
	
	@Autowired
	SubBranchRepository subBranchRepository;
	
	public List<SubBranchMaster> getAllSubBranches(){
		List<SubBranchMaster> SubBranchList =subBranchRepository.findAll();
		if(SubBranchList.size()>0) {
			return SubBranchList;
		}
		else {
			return new ArrayList<SubBranchMaster>();
		}
	}
	
	 public SubBranchMaster getSubBranchByid(int id) {
		 
		  java.util.Optional<SubBranchMaster> subBranchOptional = subBranchRepository.findByid(id);

		    if (subBranchOptional.isPresent()) {
		        return subBranchOptional.get();
		    } else {
		    	 return subBranchOptional.orElse(null);
		    }
	 }
	 
	  public List<SubBranchMaster> getBranchByreportingbranch(String reportingbranch) {
	        List<SubBranchMaster> subBranch = subBranchRepository.findByreportingbranch(reportingbranch);

	        if (!subBranch.isEmpty()) {
	            return subBranch;
	        } else {
	            throw new EntityNotFoundException("No users found for branchid " + reportingbranch);
	        }
	    }
	
	public SubBranchMaster create(SubBranchMaster subBranchMaster) {
	    subBranchMaster = subBranchRepository.save(subBranchMaster);
	    return subBranchMaster;
	}
	
	public SubBranchMaster updateSubBranch(SubBranchMaster updatedSubBranchMaster) {
	    Optional<SubBranchMaster> existingSubBranchOptional = subBranchRepository.findById(updatedSubBranchMaster.getId());

	    if (existingSubBranchOptional.isPresent()) {
	    	SubBranchMaster existingSubBranch = existingSubBranchOptional.get();
	        // Update the fields of the existing SubBranch with the values from the updated branch
	    	existingSubBranch.setSubBranchname(updatedSubBranchMaster.getSubBranchname());
	    	existingSubBranch.setSubBranchaddress(updatedSubBranchMaster.getSubBranchaddress());
	    	existingSubBranch.setReportingbranch(updatedSubBranchMaster.getReportingbranch());
	    	
	    	
	    	
	       

	        // Save the updated SubBranch to the repository
	        return subBranchRepository.save(existingSubBranch);
	    } else {
	        // Handle the case where the subBranch with the given ID is not found
	        throw new EntityNotFoundException("SubBranch with ID " + updatedSubBranchMaster.getId() + " not found");
	    }
	}
	
	  public void deleteSubBranch(Integer id) {
	        // Check if the Branch with the given ID exists
	        if (subBranchRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	        	subBranchRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("Subbranch with ID " + id + " not found");
	        }
	    }	


}
