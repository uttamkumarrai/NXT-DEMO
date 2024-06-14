package com.example.master.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.master.entity.BranchMaster;
import com.example.master.entity.User;
import com.example.master.repository.BranchRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class BranchService {
	
	@Autowired
	BranchRepository branchRepository;
	
	public List<BranchMaster> getAllBranches(){
		List<BranchMaster> BranchList =branchRepository.findAll();
		if(BranchList.size()>0) {
			return BranchList;
		}
		else {
			return new ArrayList<BranchMaster>();
		}
	}
	
	 public BranchMaster getbranchBybranchid(int branchid) {
		 
		  java.util.Optional<BranchMaster> branchOptional = branchRepository.findBybranchid(branchid);

		    if (branchOptional.isPresent()) {
		        return branchOptional.get();
		    } else {
		    	 return branchOptional.orElse(null);
		    }
	 }
	
	public BranchMaster create(BranchMaster branchMaster) {
	    branchMaster = branchRepository.save(branchMaster);
	    return branchMaster;
	}
	
	public BranchMaster updateBranch(BranchMaster updatedBranchMaster) {
	    Optional<BranchMaster> existingBranchOptional = branchRepository.findById(updatedBranchMaster.getId());

	    if (existingBranchOptional.isPresent()) {
	    	BranchMaster existingBranch = existingBranchOptional.get();
	        // Update the fields of the existing Branch with the values from the updated branch
	    	existingBranch.setBranchid(updatedBranchMaster.getBranchid());
	    	existingBranch.setBranchname(updatedBranchMaster.getBranchname());
	    	existingBranch.setBranchcode(updatedBranchMaster.getBranchcode());
	    	existingBranch.setBranchaddress(updatedBranchMaster.getBranchaddress());
	    	existingBranch.setBranchGST(updatedBranchMaster.getBranchGST());
	    	existingBranch.setBranchPAN(updatedBranchMaster.getBranchPAN());
	    	
	    	
	       

	        // Save the updated Branch to the repository
	        return branchRepository.save(existingBranch);
	    } else {
	        // Handle the case where the client with the given ID is not found
	        throw new EntityNotFoundException("Branch with ID " + updatedBranchMaster.getId() + " not found");
	    }
	}
	
	  public void deleteBranch(Integer id) {
	        // Check if the Branch with the given ID exists
	        if (branchRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	        	branchRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("branch with ID " + id + " not found");
	        }
	    }	

}
