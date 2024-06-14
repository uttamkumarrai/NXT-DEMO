package com.example.master.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;


import com.example.master.entity.User;

public interface UserRepository  extends JpaRepository<User,Integer>{
	Optional<User> findByempid(String empid);
	  List<User> findByBranchid(int branchid);
	  User findByEmpidAndPassword(String empid, String password);
	List<User> findByBranchidAndEmployeeRoleType(Integer branchid,String employeeRoleType);



}
