package com.example.master.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.Driver;

public interface DriverRepository extends JpaRepository<Driver,Integer> {

}
