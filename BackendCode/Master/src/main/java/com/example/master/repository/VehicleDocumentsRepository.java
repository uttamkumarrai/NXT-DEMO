package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.User;
import com.example.master.entity.VehicleDocuments;

public interface VehicleDocumentsRepository extends JpaRepository<VehicleDocuments,Integer> {
	 List<VehicleDocuments> findByregNoAndFlag(String regNo,Boolean flag);
	 Optional<VehicleDocuments> findByid(int id);

}
