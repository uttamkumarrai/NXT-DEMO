package com.example.master.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.master.entity.AssignLR;
import com.example.master.service.AssignLRService;

@RestController
@RequestMapping("/AssignLR")
@CrossOrigin(origins = "*")
public class AssignLRController {
	
	@Autowired
	AssignLRService assignLRService;
	
	 @PostMapping("/create")
	    public ResponseEntity<String> createLR(@RequestBody AssignLR assignLR) {
		 System.out.println("Received Allocated LR data in controller: " + assignLR);
		 assignLRService.saveMultipleItems(assignLR);
	        return ResponseEntity.ok("LR's created successfully");
	    }
	 
	  @GetMapping("/last/{branchId}")
	    public Optional<AssignLR> getLastEntry(@PathVariable Integer branchId) {
	        return assignLRService.getLastEntryByBranchId(branchId);
	    }
	   
	   
	   @GetMapping("/unutilized/{branchId}")
	    public List<AssignLR> getUnutilizedSeries(@PathVariable Integer branchId) {
	        return assignLRService.getUnutilizedSeriesByBranchId(branchId);
	    }

	    @GetMapping("/unutilized/count/{branchId}")
	    public Long countUnutilizedSeries(@PathVariable Integer branchId) {
	        return assignLRService.countUnutilizedSeriesByBranchId(branchId);
	    }

}
