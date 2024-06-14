package com.example.master.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.master.entity.ConsignerMaster;
import com.example.master.entity.LR_Request_Routing;
import com.example.master.entity.User;
import com.example.master.repository.LR_Repository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class LR_Routing_Service {
	
	@Autowired
	LR_Repository lr_repository;
	
	
	  public List<LR_Request_Routing> saveAllLRRequests(List<LR_Request_Routing> entries) {
	        return lr_repository.saveAll(entries);
	    }
		public LR_Request_Routing create(LR_Request_Routing lrRequestRouting) {
			lrRequestRouting = lr_repository.save(lrRequestRouting);
		    return lrRequestRouting;
		}
		
		 public List<LR_Request_Routing> getLRByNextApproverEmpidAndApprovedFlag(String nextApproverEmpid,Boolean approvedFlag){
			  List<LR_Request_Routing> pendingLR=lr_repository.findByNextApproverEmpidAndApprovedFlag(nextApproverEmpid, approvedFlag);
			  if(!pendingLR.isEmpty()) {
				  return pendingLR;
			  }else {
		            throw new EntityNotFoundException("No Pending LR ");
			  }
		  }
		 
		 
		 public LR_Request_Routing updateLrRequest(LR_Request_Routing lrRequest) {
			  Optional<LR_Request_Routing> existingLR=lr_repository.findById(lrRequest.getId());
			  if (existingLR.isPresent()) {
				  LR_Request_Routing lrRequestRouting=existingLR.get();
				  lrRequestRouting.setApprovedFlag(lrRequest.getApprovedFlag());
				  lrRequestRouting.setStatus(lrRequest.getStatus());
				  lrRequestRouting.setModifiedDateTime(lrRequest.getModifiedDateTime());
				  return lr_repository.save(lrRequestRouting);
				  
				  
				  
			  }else {
				  throw new EntityNotFoundException("LR Request with ID " + lrRequest.getId() + " not found");
			  }
			  
		 }
	
	
	

}
