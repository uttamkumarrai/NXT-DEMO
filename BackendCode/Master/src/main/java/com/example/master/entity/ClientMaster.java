package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "client_master_details")
public class ClientMaster {

	 @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Integer id;  
	 
	 private String initiatorId;
	 
	 private Integer initiatorBId;
	 
	 @Column(name = "client_Code")
	    private String clientCode;
	 
	 @Column(name = "client_Name")
	    private String clientName;
	 
	 @Column(name = "code_Created_Date")
	    private String codeCreatedDate;
	 
	 @Column(name = "client_State")
	    private String clientState;
	 
	 @Column(name = "client_City")
	    private String clientCity;
	 
	 @Column(name = "client_Location")
	    private String clientLocation;
	    
	    @Column(name = "client_PinCode")
	    private String client_pin_code;
	    
	    @Column(name = "client_Address")
	    private String clientAddress;
	    
	    @Column(name = "client_MobileNo")
	    private String clientMobileNo;
	    
	  
	    
	    @Column(name = "client_EmailId")
	    private String clientEmailId;
	    
	   
	    
	    @Column(name = "client_PAN")
	    private String client_PAN;
	    
	    @Column(name = "client_GSTIN_ID")
	    private String clientGSTINId;
	    
	    @Column(name = "client_MaterialType")
	    private String clientMaterialType;
	    
	    @Column(name = "client_BranchId")
	    private int clientBranchId;
	    
	    @Column(name = "client_SubBranchIds")
	    private String clientSubBranchIds;
	    
	    @Column(name = "client_ContactPerson_Name")//client contact person Name
	    private String contactPersonName;
	    
	    @Column(name = "client_Contact_Person_MobileNo")//client contact person mobile number
	    private String clientContactPersonNo;
	    
	    @Column(name = "client_ContactPerson_email")//client contact person email id
	    private String clientContactEmail;
	    
	    @Column(name = "notification_sms")
	    private Boolean notificationSms;
	    
	    @Column(name = "notification_email")
	    private Boolean notificationEmail;
	    
	    @Column(name = "notification_dsr")
	    private Boolean notificationDsr;

		public Integer getId() {
			return id;
		}

		public String getInitiatorId() {
			return initiatorId;
		}

		public Integer getInitiatorBId() {
			return initiatorBId;
		}

		public String getClientCode() {
			return clientCode;
		}

		public String getClientName() {
			return clientName;
		}

		public String getCodeCreatedDate() {
			return codeCreatedDate;
		}

		public String getClientState() {
			return clientState;
		}

		public String getClientCity() {
			return clientCity;
		}

		public String getClientLocation() {
			return clientLocation;
		}

		public String getClient_pin_code() {
			return client_pin_code;
		}

		public String getClientAddress() {
			return clientAddress;
		}

		public String getClientMobileNo() {
			return clientMobileNo;
		}

		public String getClientEmailId() {
			return clientEmailId;
		}

		public String getClient_PAN() {
			return client_PAN;
		}

		public String getClientGSTINId() {
			return clientGSTINId;
		}

		public String getClientMaterialType() {
			return clientMaterialType;
		}

		public int getClientBranchId() {
			return clientBranchId;
		}

		public String getClientSubBranchIds() {
			return clientSubBranchIds;
		}

		public String getContactPersonName() {
			return contactPersonName;
		}

		public String getClientContactPersonNo() {
			return clientContactPersonNo;
		}

		public String getClientContactEmail() {
			return clientContactEmail;
		}

		public Boolean getNotificationSms() {
			return notificationSms;
		}

		public Boolean getNotificationEmail() {
			return notificationEmail;
		}

		public Boolean getNotificationDsr() {
			return notificationDsr;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public void setInitiatorId(String initiatorId) {
			this.initiatorId = initiatorId;
		}

		public void setInitiatorBId(Integer initiatorBId) {
			this.initiatorBId = initiatorBId;
		}

		public void setClientCode(String clientCode) {
			this.clientCode = clientCode;
		}

		public void setClientName(String clientName) {
			this.clientName = clientName;
		}

		public void setCodeCreatedDate(String codeCreatedDate) {
			this.codeCreatedDate = codeCreatedDate;
		}

		public void setClientState(String clientState) {
			this.clientState = clientState;
		}

		public void setClientCity(String clientCity) {
			this.clientCity = clientCity;
		}

		public void setClientLocation(String clientLocation) {
			this.clientLocation = clientLocation;
		}

		public void setClient_pin_code(String client_pin_code) {
			this.client_pin_code = client_pin_code;
		}

		public void setClientAddress(String clientAddress) {
			this.clientAddress = clientAddress;
		}

		public void setClientMobileNo(String clientMobileNo) {
			this.clientMobileNo = clientMobileNo;
		}

		public void setClientEmailId(String clientEmailId) {
			this.clientEmailId = clientEmailId;
		}

		public void setClient_PAN(String client_PAN) {
			this.client_PAN = client_PAN;
		}

		public void setClientGSTINId(String clientGSTINId) {
			this.clientGSTINId = clientGSTINId;
		}

		public void setClientMaterialType(String clientMaterialType) {
			this.clientMaterialType = clientMaterialType;
		}

		public void setClientBranchId(int clientBranchId) {
			this.clientBranchId = clientBranchId;
		}

		public void setClientSubBranchIds(String clientSubBranchIds) {
			this.clientSubBranchIds = clientSubBranchIds;
		}

		public void setContactPersonName(String contactPersonName) {
			this.contactPersonName = contactPersonName;
		}

		public void setClientContactPersonNo(String clientContactPersonNo) {
			this.clientContactPersonNo = clientContactPersonNo;
		}

		public void setClientContactEmail(String clientContactEmail) {
			this.clientContactEmail = clientContactEmail;
		}

		public void setNotificationSms(Boolean notificationSms) {
			this.notificationSms = notificationSms;
		}

		public void setNotificationEmail(Boolean notificationEmail) {
			this.notificationEmail = notificationEmail;
		}

		public void setNotificationDsr(Boolean notificationDsr) {
			this.notificationDsr = notificationDsr;
		}

		@Override
		public String toString() {
			return "ClientMaster [id=" + id + ", initiatorId=" + initiatorId + ", initiatorBId=" + initiatorBId
					+ ", clientCode=" + clientCode + ", clientName=" + clientName + ", codeCreatedDate="
					+ codeCreatedDate + ", clientState=" + clientState + ", clientCity=" + clientCity
					+ ", clientLocation=" + clientLocation + ", client_pin_code=" + client_pin_code + ", clientAddress="
					+ clientAddress + ", clientMobileNo=" + clientMobileNo + ", clientEmailId=" + clientEmailId
					+ ", client_PAN=" + client_PAN + ", clientGSTINId=" + clientGSTINId + ", clientMaterialType="
					+ clientMaterialType + ", clientBranchId=" + clientBranchId + ", clientSubBranchIds="
					+ clientSubBranchIds + ", contactPersonName=" + contactPersonName + ", clientContactPersonNo="
					+ clientContactPersonNo + ", clientContactEmail=" + clientContactEmail + ", notificationSms="
					+ notificationSms + ", notificationEmail=" + notificationEmail + ", notificationDsr="
					+ notificationDsr + "]";
		}

		


	
	    


	
}
