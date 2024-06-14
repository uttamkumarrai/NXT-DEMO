package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.master.entity.ConsignerMaster;

public interface ConsignorRepository extends JpaRepository<ConsignerMaster,Integer> {
	Optional<ConsignerMaster> findByid(int id);
	List<ConsignerMaster> findByinitiatorBId(int initiatorBId);
}
