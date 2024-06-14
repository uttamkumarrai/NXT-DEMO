package com.example.master.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.master.entity.Consignment;

import com.example.master.repository.ConsignmentRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ConsignmentService {

	@Autowired
	ConsignmentRepository consignmentRepository;
	
	public List<Consignment> getAllConsignments(){
		List<Consignment> ConsignmentList =consignmentRepository.findAll();
		if(ConsignmentList.size()>0) {
			return ConsignmentList;
		}
		else {
			return new ArrayList<Consignment>();
		}
	}
	
	public Consignment create(Consignment consignment) {
		consignment = consignmentRepository.save(consignment);
	    return consignment;
	}
	
	
	public List<Consignment> getConsignmentsByvendorCode(String vendorCode){
		List<Consignment> consignments=consignmentRepository.findByvendorCode(vendorCode);
		if(!consignments.isEmpty()) {
			return consignments;
		}else {
			 throw new EntityNotFoundException("No Consignments found for vrfCode " + vendorCode);
		}
	}

}
