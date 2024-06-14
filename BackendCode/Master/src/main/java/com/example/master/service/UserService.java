package com.example.master.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.master.entity.User;
import com.example.master.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class UserService {
	
	@Autowired
	UserRepository userRepository;
	
	public List<User> getAllUsers(){
		List<User> userList =userRepository.findAll();
		if(userList.size()>0) {
			return userList;
		}
		else {
			return new ArrayList<User>();
		}
	}
	public User create(User user) {
	    user = userRepository.save(user);
	    return user;
	}
	
	 public User getUserByEmpid(String empid) {
		  System.out.println("employee code......"+empid);
		  java.util.Optional<User> userOptional = userRepository.findByempid(empid);

		    if (userOptional.isPresent()) {
		        return userOptional.get();
		    } else {
		    	 return userOptional.orElse(null);
		    }
	 }
	 
	  public List<User> getUsersByBranchid(int branchid) {
	        List<User> users = userRepository.findByBranchid(branchid);

	        if (!users.isEmpty()) {
	            return users;
	        } else {
	            throw new EntityNotFoundException("No users found for branchid " + branchid);
	        }
	    }
	  
	  public List<User> getUsersByBranchIdAndEmployeeRoleType(Integer branchid,String employeeRoleType){
		  List<User> users=userRepository.findByBranchidAndEmployeeRoleType(branchid, employeeRoleType);
		  if(!users.isEmpty()) {
			  return users;
		  }else {
	            throw new EntityNotFoundException("No users found for branchid and employee role type " + branchid);
		  }
	  }

	
	public User updateUser(User updatedUserMaster) {
	    Optional<User> existingUserOptional = userRepository.findById(updatedUserMaster.getId());

	    if (existingUserOptional.isPresent()) {
	    	System.out.println("user is present to update");
	    	User existingUser = existingUserOptional.get();
	        // Update the fields of the existing User with the values from the updated client
	    	existingUser.setEmpid(updatedUserMaster.getEmpid());
	    	existingUser.setEmpname(updatedUserMaster.getEmpname());
	    	existingUser.setPassword(updatedUserMaster.getPassword());
	    	existingUser.setBranchid(updatedUserMaster.getBranchid());
	    	existingUser.setSub_branchid(updatedUserMaster.getSub_branchid());
	    	existingUser.setEmail(updatedUserMaster.getEmail());
	    	existingUser.setPhone(updatedUserMaster.getPhone());
	    	existingUser.setUser_right(updatedUserMaster.getUser_right());
	    	existingUser.setJob_role(updatedUserMaster.getJob_role());
	    	existingUser.setUsertype(updatedUserMaster.getUsertype());
	    	existingUser.setMailoption(updatedUserMaster.getMailoption());
	    	existingUser.setDepartment(updatedUserMaster.getDepartment());
	    	existingUser.setDesignation(updatedUserMaster.getDesignation());
	    	existingUser.setEmployeeRoleType(updatedUserMaster.getEmployeeRoleType());
	    	existingUser.setStatus(updatedUserMaster.getStatus());
	    	
	       

	        // Save the updated User to the repository
	        return userRepository.save(existingUser);
	    } else {
	        // Handle the case where the client with the given ID is not found
	        throw new EntityNotFoundException("User with ID " + updatedUserMaster.getId() + " not found");
	    }
	}
	
	  public void deleteUser(Integer id) {
	        // Check if the User with the given ID exists
	        if (userRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	        	userRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("User with ID " + id + " not found");
	        }
	    }
	  
	  public User authenticateUser(String empId, String password) {
	        User user = userRepository.findByEmpidAndPassword(empId, password);
	        System.out.println("Use "+user);
//	        return user != null;
	        return user;
	        
	    }
}
