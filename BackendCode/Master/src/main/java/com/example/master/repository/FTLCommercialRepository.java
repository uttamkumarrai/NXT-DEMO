package com.example.master.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.master.entity.FTLCommercial;

public interface FTLCommercialRepository extends JpaRepository<FTLCommercial,Integer> {
	List<FTLCommercial> findBybranchId(int branchId);

}
