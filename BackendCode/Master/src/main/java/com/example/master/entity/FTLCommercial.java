package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "ftl_commercial_details")
public class FTLCommercial {
	
	 @Id
	  @GeneratedValue(strategy = GenerationType.IDENTITY)
	  private Integer id;
	 
	 @Column(name = "Branch_Id")
	  private Integer branchId;
	 
	  @Column(name = "service_type")
	  private String serviceType;
	 
	  private String type;
	  
	  @Column(name = "commercial_code")
	  private String commercialCode;
	 
	  @Column(name = "vehicle_type")
	  private String vehicleType;
	  
	  @Column(name = "origin_pincode")
	  private Integer originPincode;
	  
	  @Column(name = "origin_state")
	  private String originState;
	  
	  @Column(name = "origin_city")
	  private String originCity;
	  
	  @Column(name = "origin_location")
	  private String originLocation;
	  
	  @Column(name = "destination_pincode")
	  private Integer destinationPincode;
	  
	  @Column(name = "destination_state")
	  private String destinationState;
	  
	  @Column(name = "destination_city")
	  private String destinationCity;
	  
	  @Column(name = "destination_location")
	  private String destinationLocation;
	  
	  private Double tonnage;
	  private Double rate;
	  
	  @Column(name = "tat_in_days")
	  private Integer tat;
	  
	  @Column(name = "distance_km")
	  private Integer distanceKm;

	public Integer getId() {
		return id;
	}

	
	public Integer getBranchId() {
		return branchId;
	}


	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}


	public String getServiceType() {
		return serviceType;
	}

	public String getType() {
		return type;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public Integer getOriginPincode() {
		return originPincode;
	}

	public String getOriginState() {
		return originState;
	}

	public String getOriginCity() {
		return originCity;
	}

	public String getOriginLocation() {
		return originLocation;
	}

	public Integer getDestinationPincode() {
		return destinationPincode;
	}

	public String getDestinationState() {
		return destinationState;
	}

	public String getDestinationCity() {
		return destinationCity;
	}

	public String getDestinationLocation() {
		return destinationLocation;
	}

	public Double getTonnage() {
		return tonnage;
	}

	public Double getRate() {
		return rate;
	}

	public Integer getTat() {
		return tat;
	}

	public Integer getDistanceKm() {
		return distanceKm;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}

	public void setType(String type) {
		this.type = type;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public void setOriginPincode(Integer originPincode) {
		this.originPincode = originPincode;
	}

	public void setOriginState(String originState) {
		this.originState = originState;
	}

	public void setOriginCity(String originCity) {
		this.originCity = originCity;
	}

	public void setOriginLocation(String originLocation) {
		this.originLocation = originLocation;
	}

	public void setDestinationPincode(Integer destinationPincode) {
		this.destinationPincode = destinationPincode;
	}

	public void setDestinationState(String destinationState) {
		this.destinationState = destinationState;
	}

	public void setDestinationCity(String destinationCity) {
		this.destinationCity = destinationCity;
	}

	public void setDestinationLocation(String destinationLocation) {
		this.destinationLocation = destinationLocation;
	}

	public void setTonnage(Double tonnage) {
		this.tonnage = tonnage;
	}

	public void setRate(Double rate) {
		this.rate = rate;
	}

	public void setTat(Integer tat) {
		this.tat = tat;
	}

	public void setDistanceKm(Integer distanceKm) {
		this.distanceKm = distanceKm;
	}
	

	public String getCommercialCode() {
		return commercialCode;
	}

	public void setCommercialCode(String commercialCode) {
		this.commercialCode = commercialCode;
	}

	@Override
	public String toString() {
		return "FTLCommercial [id=" + id + ", branchId=" + branchId + ", serviceType=" + serviceType + ", type=" + type
				+ ", commercialCode=" + commercialCode + ", vehicleType=" + vehicleType + ", originPincode="
				+ originPincode + ", originState=" + originState + ", originCity=" + originCity + ", originLocation="
				+ originLocation + ", destinationPincode=" + destinationPincode + ", destinationState="
				+ destinationState + ", destinationCity=" + destinationCity + ", destinationLocation="
				+ destinationLocation + ", tonnage=" + tonnage + ", rate=" + rate + ", tat=" + tat + ", distanceKm="
				+ distanceKm + "]";
	}

	

}
