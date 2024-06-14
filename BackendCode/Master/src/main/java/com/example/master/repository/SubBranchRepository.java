package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.master.entity.SubBranchMaster;

public interface SubBranchRepository extends JpaRepository<SubBranchMaster,Integer>{
	Optional<SubBranchMaster> findByid(int id);
	List<SubBranchMaster> findByreportingbranch(String reportingbranch);

}
