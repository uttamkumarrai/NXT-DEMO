package com.example.master.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.master.entity.AssignLR;
import com.example.master.entity.LR_Request_Routing;
import com.example.master.repository.AssignLRRepository;

@Service
public class AssignLRService {
	
	@Autowired
	AssignLRRepository assignLRRepository;
	
	  public void saveMultipleItems(AssignLR assignLR) {
	        String prefix = assignLR.getSeriesStartWith();	
	        Double fromSeries = assignLR.getSeriesFrom();
	        Double toSeries = assignLR.getSeriesTo();
	        String empid=assignLR.getInitiatorId();
	        if(empid=="2165") {
	        for (int i = fromSeries.intValue(); i <= toSeries.intValue(); i++) {
	            AssignLR assign = new AssignLR();
	            assign.setInitiatorbId(assignLR.getInitiatorbId());
	            assign.setInitiatorId(assignLR.getInitiatorId());
	            assign.setInitiatorName(assignLR.getInitiatorName());
	            assign.setBranchId(assignLR.getBranchId());
	            assign.setSeriesStartWith(prefix);
	            assign.setSeriesFrom(fromSeries);
	            assign.setSeriesTo(toSeries);
	            
	            System.out.println(fromSeries);
	            System.out.println(i);
	           
	           
	            assign.setConsignmentNo(prefix+i);
	            assign.setAllocated(assignLR.getAllocated());
	            assign.setUtilized(assignLR.getUtilized());
	            assignLRRepository.save(assign);
	            
	            
	            
	           
	        }
	    }else {
	    	System.out.println("else part for updating flag");
	    	for (int i = fromSeries.intValue(); i <= toSeries.intValue(); i++) {
	    
            String consignmentNo = prefix + i;
            AssignLR existingAssignLR = assignLRRepository.findByConsignmentNo(consignmentNo);
            if (existingAssignLR != null) {
                existingAssignLR.setAllocated(true); // Set allocated flag to true
                assignLRRepository.save(existingAssignLR);
            }
        }
	    }
	        
	      
	        
	        
	        
	        
	  }
	  
	  public Optional<AssignLR> getLastEntryByBranchId(Integer branchId) {
	        return assignLRRepository.findLastEntryByBranchId(branchId);
	    }
	   public List<AssignLR> getUnutilizedSeriesByBranchId(Integer branchId) {
	        return assignLRRepository.findUnutilizedByBranchId(branchId);
	    }

	    public Long countUnutilizedSeriesByBranchId(Integer branchId) {
	        return assignLRRepository.countUnutilizedByBranchId(branchId);
	    }

}
