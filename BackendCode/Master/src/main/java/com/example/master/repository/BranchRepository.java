package com.example.master.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.master.entity.BranchMaster;
import com.example.master.entity.User;

public interface BranchRepository extends JpaRepository<BranchMaster,Integer>{
	Optional<BranchMaster> findBybranchid(int branchid);
	

}
