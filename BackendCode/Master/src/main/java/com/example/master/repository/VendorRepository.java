package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.master.entity.VendorMaster;

public interface VendorRepository extends JpaRepository<VendorMaster,Integer> {
	Optional<VendorMaster> findByid(int id);
	List<VendorMaster> findByinitiatorbId(int initiatorbId);

}
