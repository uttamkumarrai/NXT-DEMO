package com.example.master.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.Consignment;

public interface ConsignmentRepository extends JpaRepository<Consignment,Integer> {
	List<Consignment> findByvendorCode(String vendorCode);

}
