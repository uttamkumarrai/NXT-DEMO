package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.ClientMaster;


public interface ClientRepository extends JpaRepository<ClientMaster,Integer>{
	 
	Optional<ClientMaster> findByClientCode(String clientCode);
	List<ClientMaster> findByclientBranchId(int clientBranchId);

}
