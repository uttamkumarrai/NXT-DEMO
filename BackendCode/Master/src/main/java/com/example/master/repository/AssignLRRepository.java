package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.example.master.entity.AssignLR;

@Repository
public interface AssignLRRepository extends JpaRepository<AssignLR,Integer> {
	
	boolean existsBySeriesFromAndSeriesTo(Double seriesFrom, Double seriesTo);
    List<AssignLR> findBySeriesFromAndSeriesTo(Double seriesFrom, Double seriesTo);
    
    AssignLR findByConsignmentNo(String consignmentNo);
	
	 @Query("SELECT a FROM AssignLR a WHERE a.branchId = ?1 AND a.utilized = false ORDER BY a.id DESC")
	    Optional<AssignLR> findLastEntryByBranchId(Integer branchId);
	

    @Query("SELECT a FROM AssignLR a WHERE a.branchId = ?1 AND a.utilized = false")
    List<AssignLR> findUnutilizedByBranchId(Integer branchId);

    @Query("SELECT COUNT(a) FROM AssignLR a WHERE a.branchId = ?1 AND a.allocated = false")
    Long countUnutilizedByBranchId(Integer branchId);

}
