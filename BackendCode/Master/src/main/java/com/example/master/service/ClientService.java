package com.example.master.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.example.master.entity.ClientMaster;

import com.example.master.repository.ClientRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class ClientService {
	
	@Autowired
	ClientRepository clientRepository;
	
	public List<ClientMaster> getAllClients(){
		List<ClientMaster> clientList =clientRepository.findAll();
		if(clientList.size()>0) {
			return clientList;
		}
		else {
			return new ArrayList<ClientMaster>();
		}
	}
	
	 public ClientMaster getClientByCode(String clientCode) {
		  System.out.println("client code......"+clientCode);
		  java.util.Optional<ClientMaster> userOptional = clientRepository.findByClientCode(clientCode);

		    if (userOptional.isPresent()) {
		        return userOptional.get();
		    } else {
		    	 return userOptional.orElse(null);
		    }
	 }
	 
	  public List<ClientMaster> getUsersByclientBranchId(int clientBranchId) {
	        List<ClientMaster> clients = clientRepository.findByclientBranchId(clientBranchId);

	        if (!clients.isEmpty()) {
	            return clients;
	        } else {
	            throw new EntityNotFoundException("No users found for branchid " + clientBranchId);
	        }
	    }
		
	
	public ClientMaster create(ClientMaster clientMaster){
		 
			 
			  clientMaster = clientRepository.save(clientMaster);
		        return clientMaster;
		 
	}
	
	
	public ClientMaster updateClient(ClientMaster updatedClientMaster) {
	    Optional<ClientMaster> existingClientOptional = clientRepository.findById(updatedClientMaster.getId());

	    if (existingClientOptional.isPresent()) {
	        ClientMaster existingClient = existingClientOptional.get();
	        // Update the fields of the existing client with the values from the updated client
	        existingClient.setClientCode(updatedClientMaster.getClientCode());
	        existingClient.setClientName(updatedClientMaster.getClientName());
	        existingClient.setCodeCreatedDate(updatedClientMaster.getCodeCreatedDate());
	        existingClient.setClientState(updatedClientMaster.getClientState());
	        existingClient.setClientCity(updatedClientMaster.getClientCity());
	        existingClient.setClientLocation(updatedClientMaster.getClientLocation());
	        existingClient.setClient_pin_code(updatedClientMaster.getClient_pin_code());
	        existingClient.setClientAddress(updatedClientMaster.getClientAddress());
	        existingClient.setClientMobileNo(updatedClientMaster.getClientMobileNo());
//	        existingClient.setClientContactPersonName(updatedClientMaster.getContactPersonName();
	        existingClient.setClientEmailId(updatedClientMaster.getClientEmailId());
	        existingClient.setClient_PAN(updatedClientMaster.getClient_PAN());
	        existingClient.setClientGSTINId(updatedClientMaster.getClientGSTINId());
	        existingClient.setClientMaterialType(updatedClientMaster.getClientMaterialType());
	        existingClient.setClientBranchId(updatedClientMaster.getClientBranchId());
	        existingClient.setClientSubBranchIds(updatedClientMaster.getClientSubBranchIds());
	        existingClient.setClientContactPersonNo(updatedClientMaster.getClientContactPersonNo());
	        existingClient.setClientContactEmail(updatedClientMaster.getClientContactEmail());
	        // Update other fields as needed

	        // Save the updated client to the repository
	        return clientRepository.save(existingClient);
	    } else {
	        // Handle the case where the client with the given ID is not found
	        throw new EntityNotFoundException("Client with ID " + updatedClientMaster.getId() + " not found");
	    }
	}
	
	  public void deleteClient(Integer id) {
	        // Check if the client with the given ID exists
	        if (clientRepository.existsById(id)) {
	            // If it exists, perform the delete operation
	            clientRepository.deleteById(id);
	        } else {
	            // If not found, throw EntityNotFoundException
	            throw new EntityNotFoundException("Client with ID " + id + " not found");
	        }
	    }

	
	

	
	

}
