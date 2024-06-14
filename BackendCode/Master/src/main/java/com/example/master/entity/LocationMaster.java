package com.example.master.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "location_master_details")
public class LocationMaster {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer location_Id;
	
	private String location_PinCode;
	
	private Integer state_Id;
	
	private Integer city_Id;
	
	private String location_Name;

	public Integer getLocation_Id() {
		return location_Id;
	}

	public String getLocation_PinCode() {
		return location_PinCode;
	}

	public Integer getState_Id() {
		return state_Id;
	}

	public Integer getCity_Id() {
		return city_Id;
	}

	public String getLocation_Name() {
		return location_Name;
	}

	public void setLocation_Id(Integer location_Id) {
		this.location_Id = location_Id;
	}

	public void setLocation_PinCode(String location_PinCode) {
		this.location_PinCode = location_PinCode;
	}

	public void setState_Id(Integer state_Id) {
		this.state_Id = state_Id;
	}

	public void setCity_Id(Integer city_Id) {
		this.city_Id = city_Id;
	}

	public void setLocation_Name(String location_Name) {
		this.location_Name = location_Name;
	}

	@Override
	public String toString() {
		return "LocationMaster [location_Id=" + location_Id + ", location_PinCode=" + location_PinCode + ", state_Id="
				+ state_Id + ", city_Id=" + city_Id + ", location_Name=" + location_Name + "]";
	}


	
	
}
