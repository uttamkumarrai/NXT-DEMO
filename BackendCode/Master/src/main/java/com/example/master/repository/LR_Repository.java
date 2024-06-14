package com.example.master.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.LR_Request_Routing;


public interface LR_Repository extends JpaRepository<LR_Request_Routing,Integer> {
	List<LR_Request_Routing> findByNextApproverEmpidAndApprovedFlag(String nextApproverEmpid,Boolean approvedFlag);
	

}
