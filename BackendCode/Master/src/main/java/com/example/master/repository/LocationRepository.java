package com.example.master.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.LocationMaster;

public interface LocationRepository extends JpaRepository<LocationMaster,Integer> {	

}
