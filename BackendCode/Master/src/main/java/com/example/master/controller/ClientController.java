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


import com.example.master.entity.ClientMaster;

import com.example.master.service.ClientService;

import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/clients")
@CrossOrigin(origins = "*")
public class ClientController {
	
	@Autowired
	ClientService clientService;
	@GetMapping
	public ResponseEntity<List<ClientMaster>> getAllClients(){
		List<ClientMaster> list=clientService.getAllClients();
		
		return new ResponseEntity<List<ClientMaster>>(list, new HttpHeaders(), HttpStatus.OK);
	}
	
	 @GetMapping("ByCid/{clientCode}")
	    public ResponseEntity<ClientMaster> getClientByCode(@PathVariable("clientCode") String clientCode) {
		  System.out.println("client code......"+clientCode);
	        try {
	            ClientMaster client = clientService.getClientByCode(clientCode);
	            return new ResponseEntity<>(client, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }

	  @GetMapping("/{clientBranchId}")
	    public ResponseEntity<List<ClientMaster>> getUsersByclientBranchId(@PathVariable("clientBranchId") int clientBranchId) {
	        try {
	            List<ClientMaster> clients = clientService.getUsersByclientBranchId(clientBranchId);
	            return new ResponseEntity<>(clients, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        }
	    }  
	  
	
	@PostMapping
	public ResponseEntity<ClientMaster> createOrUpdate(@RequestBody ClientMaster clientMaster){
		System.out.println("Received user object in controller: " + clientMaster.toString());
		ClientMaster updated=clientService.create(clientMaster);
		return new ResponseEntity<ClientMaster>(updated, new HttpHeaders(),HttpStatus.OK);
		
		
		
	}
	
	  @PutMapping("/update")
	    public ResponseEntity<ClientMaster> updateClient(@RequestBody ClientMaster updatedClient) {
	        try {
	            // Call the updateClient method from the service
	            ClientMaster updatedClientResult = clientService.updateClient(updatedClient);
	            return new ResponseEntity<>(updatedClientResult, HttpStatus.OK);
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
	        }
	    }
	  @DeleteMapping("/delete/{id}")
	    public ResponseEntity<Void> deleteClient(@PathVariable Integer id) {
	        try {
	            // Call the deleteClient method from the service
	            clientService.deleteClient(id);
	            return new ResponseEntity<>(HttpStatus.NO_CONTENT); // HTTP 204
	        } catch (EntityNotFoundException e) {
	            // Handle the case where the client with the given ID is not found
	            return new ResponseEntity<>(HttpStatus.NOT_FOUND); // HTTP 404
	        } catch (Exception e) {
	            // Handle other exceptions
	            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR); // HTTP 500
	        }
	    }
	

}
