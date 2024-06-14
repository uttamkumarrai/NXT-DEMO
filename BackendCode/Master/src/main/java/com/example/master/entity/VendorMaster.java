package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table(name = "vendormasterdetails")
public class VendorMaster {
	
	@Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private int initiatorbId;
	
	@Column(name = "vrf_ID")
	private String vrfId;
	
	@Column(name = "vRF_Code")
	private String vrfCode;
	
	@Column(name = "vrf_Code_Created_Date")
	private String vrfCodeCreatedDate;
	
	@Column(name = "vendor_Name")
	private String vendorName;
	
	@Column(name = "vendorAddress")
	private String vendorAddress;
	
	@Column(name = "vendor_Type")
	private String vendorType;
	
	@Column(name = "credit_Period")
	private String creditPeriod;
	
	@Column(name = "agreement_No")
	private String agreementNo;
	
	@Column(name = "agreement_From_Date")
	private String agreementFromDate;
	
	@Column(name = "agreement_To_Date")
	private String agreementToDate;
	
	//@Column(name = "tds")
	private String tds;
	
	//@Column(name = "status")
	private String status;
	
	private String gst;
	
	@Column(name = "sgst_freight")
	private String sgstFreight;
	
	@Column(name = "cgst_freight")
	private String cgstFreight;
	
	@Column(name = "igst_freight")
	private String igstFreight;
	
	@Column(name = "sgst_charges")
	private String sgstCharges;
	
	@Column(name = "cgst_charges")
	private String cgstCharges;
	
	@Column(name = "igst_charges")
	private String igstCharges;
	
	
	private String gstin;
	
	@Column(name = "contact_name")
	private String contactName;
	
	@Column(name = "mobile_no")
	private String mobileNo;
	
	private String email;
	
	private String cin;
	
	private String pan;
	
	@Column(name = "discount_amount")
	private String discountAmount;
	
	@Column(name = "discount_percentage")
	private String discountPercentage;

	public Integer getId() {
		return id;
	}

	public int getInitiatorbId() {
		return initiatorbId;
	}

	public String getVrfId() {
		return vrfId;
	}

	public String getVrfCode() {
		return vrfCode;
	}

	public String getVrfCodeCreatedDate() {
		return vrfCodeCreatedDate;
	}

	public String getVendorName() {
		return vendorName;
	}

	public String getVendorAddress() {
		return vendorAddress;
	}

	public String getVendorType() {
		return vendorType;
	}

	public String getCreditPeriod() {
		return creditPeriod;
	}

	public String getAgreementNo() {
		return agreementNo;
	}

	public String getAgreementFromDate() {
		return agreementFromDate;
	}

	public String getAgreementToDate() {
		return agreementToDate;
	}

	public String getTds() {
		return tds;
	}

	public String getStatus() {
		return status;
	}

	public String getGst() {
		return gst;
	}

	public String getSgstFreight() {
		return sgstFreight;
	}

	public String getCgstFreight() {
		return cgstFreight;
	}

	public String getIgstFreight() {
		return igstFreight;
	}

	public String getSgstCharges() {
		return sgstCharges;
	}

	public String getCgstCharges() {
		return cgstCharges;
	}

	public String getIgstCharges() {
		return igstCharges;
	}

	public String getGstin() {
		return gstin;
	}

	public String getContactName() {
		return contactName;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public String getEmail() {
		return email;
	}

	public String getCin() {
		return cin;
	}

	public String getPan() {
		return pan;
	}

	public String getDiscountAmount() {
		return discountAmount;
	}

	public String getDiscountPercentage() {
		return discountPercentage;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setInitiatorbId(int initiatorbId) {
		this.initiatorbId = initiatorbId;
	}

	public void setVrfId(String vrfId) {
		this.vrfId = vrfId;
	}

	public void setVrfCode(String vrfCode) {
		this.vrfCode = vrfCode;
	}

	public void setVrfCodeCreatedDate(String vrfCodeCreatedDate) {
		this.vrfCodeCreatedDate = vrfCodeCreatedDate;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public void setVendorAddress(String vendorAddress) {
		this.vendorAddress = vendorAddress;
	}

	public void setVendorType(String vendorType) {
		this.vendorType = vendorType;
	}

	public void setCreditPeriod(String creditPeriod) {
		this.creditPeriod = creditPeriod;
	}

	public void setAgreementNo(String agreementNo) {
		this.agreementNo = agreementNo;
	}

	public void setAgreementFromDate(String agreementFromDate) {
		this.agreementFromDate = agreementFromDate;
	}

	public void setAgreementToDate(String agreementToDate) {
		this.agreementToDate = agreementToDate;
	}

	public void setTds(String tds) {
		this.tds = tds;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setGst(String gst) {
		this.gst = gst;
	}

	public void setSgstFreight(String sgstFreight) {
		this.sgstFreight = sgstFreight;
	}

	public void setCgstFreight(String cgstFreight) {
		this.cgstFreight = cgstFreight;
	}

	public void setIgstFreight(String igstFreight) {
		this.igstFreight = igstFreight;
	}

	public void setSgstCharges(String sgstCharges) {
		this.sgstCharges = sgstCharges;
	}

	public void setCgstCharges(String cgstCharges) {
		this.cgstCharges = cgstCharges;
	}

	public void setIgstCharges(String igstCharges) {
		this.igstCharges = igstCharges;
	}

	public void setGstin(String gstin) {
		this.gstin = gstin;
	}

	public void setContactName(String contactName) {
		this.contactName = contactName;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setCin(String cin) {
		this.cin = cin;
	}

	public void setPan(String pan) {
		this.pan = pan;
	}

	public void setDiscountAmount(String discountAmount) {
		this.discountAmount = discountAmount;
	}

	public void setDiscountPercentage(String discountPercentage) {
		this.discountPercentage = discountPercentage;
	}

	@Override
	public String toString() {
		return "VendorMaster [id=" + id + ", initiatorbId=" + initiatorbId + ", vrfId=" + vrfId + ", vrfCode=" + vrfCode
				+ ", vrfCodeCreatedDate=" + vrfCodeCreatedDate + ", vendorName=" + vendorName + ", vendorAddress="
				+ vendorAddress + ", vendorType=" + vendorType + ", creditPeriod=" + creditPeriod + ", agreementNo="
				+ agreementNo + ", agreementFromDate=" + agreementFromDate + ", agreementToDate=" + agreementToDate
				+ ", tds=" + tds + ", status=" + status + ", gst=" + gst + ", sgstFreight=" + sgstFreight
				+ ", cgstFreight=" + cgstFreight + ", igstFreight=" + igstFreight + ", sgstCharges=" + sgstCharges
				+ ", cgstCharges=" + cgstCharges + ", igstCharges=" + igstCharges + ", gstin=" + gstin
				+ ", contactName=" + contactName + ", mobileNo=" + mobileNo + ", email=" + email + ", cin=" + cin
				+ ", pan=" + pan + ", discountAmount=" + discountAmount + ", discountPercentage=" + discountPercentage
				+ "]";
	}





	
	

}
