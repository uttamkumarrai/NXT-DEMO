package com.example.master.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.example.master.entity.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle,Integer>{
	  @Query(value = "SELECT * FROM vehicle_master v JOIN vehicle_master_files vf ON v.Reg_No = vf.Registration_No", nativeQuery = true)
	    List<Object[]> getVehicleWithDocuments();

}
