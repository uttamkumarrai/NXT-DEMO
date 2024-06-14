package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "consignee_or_consignor_details")
public class ConsignerMaster {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private Integer initiatorBId;
	
	@Column(name = "consignee_or_consignor_Name")
	private String consignorName;
	
	@Column(name = "consignee_or_consignor_code")
	private String consignorCode;
	
	

	@Column(name = "consignee_or_consignor_GSTIN_ID")
	private String gstNumber;
	
	

	@Column(name = "consignee_or_consignor_PAN")
	private String panNumber;
	
	@Column(name = "consignee_or_consignor_PinCode")
	private String pinCode;
	
	@Column(name = "consignee_or_consignor_Location")
	private String location;
	
	@Column(name = "consignee_or_consignor_City")
	private String city;
	
	@Column(name = "consignee_or_consignor_State")
	private String state;
	
	@Column(name = "consignee_or_consignor_Address")
	private String address;
	
	@Column(name = "consignee_or_consignor_ContactPerson")
	private String contactPersonName;
	
	@Column(name = "consignee_or_consignor_EmailId")
	private String contactEmail;
	
	@Column(name = "consignee_or_consignor_ContactNo")
	private String contactNo;
	
	
	
	
	
	


	public Integer getId() {
		return id;
	}

	public Integer getInitiatorBId() {
		return initiatorBId;
	}

	public String getConsignorName() {
		return consignorName;
	}

	public String getConsignorCode() {
		return consignorCode;
	}

	public String getGstNumber() {
		return gstNumber;
	}

	public String getPanNumber() {
		return panNumber;
	}

	public String getPinCode() {
		return pinCode;
	}

	public String getLocation() {
		return location;
	}

	public String getCity() {
		return city;
	}

	public String getState() {
		return state;
	}

	public String getAddress() {
		return address;
	}

	public String getContactPersonName() {
		return contactPersonName;
	}

	public String getContactEmail() {
		return contactEmail;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setInitiatorBId(Integer initiatorBId) {
		this.initiatorBId = initiatorBId;
	}

	public void setConsignorName(String consignorName) {
		this.consignorName = consignorName;
	}

	public void setConsignorCode(String consignorCode) {
		this.consignorCode = consignorCode;
	}

	public void setGstNumber(String gstNumber) {
		this.gstNumber = gstNumber;
	}

	public void setPanNumber(String panNumber) {
		this.panNumber = panNumber;
	}

	public void setPinCode(String pinCode) {
		this.pinCode = pinCode;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setState(String state) {
		this.state = state;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public void setContactPersonName(String contactPersonName) {
		this.contactPersonName = contactPersonName;
	}

	public void setContactEmail(String contactEmail) {
		this.contactEmail = contactEmail;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	@Override
	public String toString() {
		return "ConsignerMaster [id=" + id + ", initiatorBId=" + initiatorBId + ", consignorName=" + consignorName
				+ ", consignorCode=" + consignorCode + ", gstNumber=" + gstNumber + ", panNumber=" + panNumber
				+ ", pinCode=" + pinCode + ", location=" + location + ", city=" + city + ", state=" + state
				+ ", address=" + address + ", contactPersonName=" + contactPersonName + ", contactEmail=" + contactEmail
				+ ", contactNo=" + contactNo +"]";
	}





}
