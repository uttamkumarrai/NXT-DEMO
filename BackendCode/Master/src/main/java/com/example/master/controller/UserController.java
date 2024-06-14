package com.example.master.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.example.master.entity.User;
import com.example.master.service.UserService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*")
public class UserController {
	
	@Autowired
	UserService userService;
	
	@GetMapping
	public ResponseEntity<List<User>> getAllUsers(){
		List<User> list=userService.getAllUsers();
		
		return new ResponseEntity<List<User>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	
	  @GetMapping("ByEmpid/{empid}")
	    public ResponseEntity<User> getUserByEmpid(@PathVariable("empid") String empid) {
//		  System.out.println("employee code......"+empid);
	        try {
	            User user = userService.getUserByEmpid(empid);
	            return new ResponseEntity<>(user, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	  
	  @GetMapping("/{branchId}")
	    public ResponseEntity<List<User>> getUsersByBranchid(@PathVariable("branchId") int branchId) {
	        try {
	            List<User> users = userService.getUsersByBranchid(branchId);
	            return new ResponseEntity<>(users, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }
	  
	  @GetMapping("/{branchId}/{employeeRoleType}")
	    public ResponseEntity<List<User>> getUsersByBranchidAndEmployeeRoleType(@PathVariable("branchId") int branchId,@PathVariable("employeeRoleType") String employeeRoleType) {
	        try {
	            List<User> users = userService.getUsersByBranchIdAndEmployeeRoleType(branchId, employeeRoleType);
	            return new ResponseEntity<>(users, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }

	  
	
	@PostMapping("/create")
	public ResponseEntity<User> create(@RequestBody User user) {
	    System.out.println("Received user object in controller: " + user);
	    User created = userService.create(user);
	    return new ResponseEntity<>(created, new HttpHeaders(), HttpStatus.CREATED);
	}
	
	  @PutMapping("/update")
	    public ResponseEntity<User> updateUser(@RequestBody User updatedUser) {
	        try {
	        	System.out.println("user update controller");
	            // Call the updateUser method from the service
	        	User updatedUserResult = userService.updateUser(updatedUser);
	            return new ResponseEntity<>(updatedUserResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  
	  @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteUser(@PathVariable Integer id) {
	        try {
	            // Call the deleteUser method from the service
	        	userService.deleteUser(id);
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // HTTP 204
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // HTTP 404
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // HTTP 500
	        }
	    }
	  
	  @PostMapping("/login")
	    public User login(@RequestBody User user) {
		  System.out.println("Received user object in controller: " + user);
	        String empId = user.getEmpid();
	        String password = user.getPassword();
	        System.out.println("empId "+ empId);
	        System.out.println("password "+password);

	        User isAuthenticated = userService.authenticateUser(empId, password);
	        	System.out.println(" this is user "+ isAuthenticated);
	        if (isAuthenticated!=null) {
	        	
	            return isAuthenticated;
	        } else {
	            return isAuthenticated;
	        }
	    }


}
