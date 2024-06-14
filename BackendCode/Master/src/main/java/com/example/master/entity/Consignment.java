package com.example.master.entity;

import java.util.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "consignment_details")
public class Consignment {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String initiator_Id;
	
	private int initiator_BId;
	
	private int initiator_SBId;
	
	private String PrqNo;
	
	private int PrqId;
	
	private String LoadType;
	
	private int lr_Count;
	
	private String client_Code;
	
	private String client_Name,client_address,modeOfTransport;
	
	private int client_BId;
	
	private String consignor_Code,consignor_Name,consignor_Address,consignor_Zone,consignor_State,consignor_City,consignor_Location,consignor_PinCode;
	
	private String consignor_EmailId,consignor_Ph_No,consignor_ContactPernName,consignor_ContactPernPhNo,consignor_PAN,consignor_GSTIN_Id;
	
	private String consignee_Code,consignee_Name,consignee_Address,consignee_Zone,consignee_State,consignee_City,consignee_Location,consignee_PinCode;
	
	private String consignee_Ph_No,consignee_EmailId,consignee_ContactPersonName,consignee_ContactPersonPhNo,consignee_PAN,consignee_GSTIN_Id;
	
	private String MaterialType,vendorCode,vendorName,Typeof_measurement,lRType,lrNumber,lRDate,estimatedDeliveryDate;
	
	private String vehicleReporteddate,vehicleReportedTime,loaddate,loadedTime,eway_Bill_by,eway_Bill_Status,	invoiceValue;
	
	private String 	carrierLRNumber,carrierLRDate,lRCopySendToClient,sendMailTo,remarks,lrCopyFile;
	
	private int pageNo;
	
	private String lr_Status,revenue_Status,vehicleType,vehicleNo,client_conversion_Factor,	vendor_conversion_Factor;
	
	private String 	delivery_status,tspName,trackId;
	
	private int noofPkg;
	
	private double weight;
	
	private Date cratedDate;

	public Integer getId() {
		return id;
	}

	public String getInitiator_Id() {
		return initiator_Id;
	}

	public int getInitiator_BId() {
		return initiator_BId;
	}

	public int getInitiator_SBId() {
		return initiator_SBId;
	}

	public String getPrqNo() {
		return PrqNo;
	}

	public int getPrqId() {
		return PrqId;
	}

	public String getLoadType() {
		return LoadType;
	}

	public int getLr_Count() {
		return lr_Count;
	}

	public String getClient_Code() {
		return client_Code;
	}

	public String getClient_Name() {
		return client_Name;
	}

	public String getClient_address() {
		return client_address;
	}

	public String getModeOfTransport() {
		return modeOfTransport;
	}

	public int getClient_BId() {
		return client_BId;
	}

	public String getConsignor_Code() {
		return consignor_Code;
	}

	public String getConsignor_Name() {
		return consignor_Name;
	}

	public String getConsignor_Address() {
		return consignor_Address;
	}

	public String getConsignor_Zone() {
		return consignor_Zone;
	}

	public String getConsignor_State() {
		return consignor_State;
	}

	public String getConsignor_City() {
		return consignor_City;
	}

	public String getConsignor_Location() {
		return consignor_Location;
	}

	public String getConsignor_PinCode() {
		return consignor_PinCode;
	}

	public String getConsignor_EmailId() {
		return consignor_EmailId;
	}

	public String getConsignor_Ph_No() {
		return consignor_Ph_No;
	}

	public String getConsignor_ContactPernName() {
		return consignor_ContactPernName;
	}

	public String getConsignor_ContactPernPhNo() {
		return consignor_ContactPernPhNo;
	}

	public String getConsignor_PAN() {
		return consignor_PAN;
	}

	public String getConsignor_GSTIN_Id() {
		return consignor_GSTIN_Id;
	}

	public String getConsignee_Code() {
		return consignee_Code;
	}

	public String getConsignee_Name() {
		return consignee_Name;
	}

	public String getConsignee_Address() {
		return consignee_Address;
	}

	public String getConsignee_Zone() {
		return consignee_Zone;
	}

	public String getConsignee_State() {
		return consignee_State;
	}

	public String getConsignee_City() {
		return consignee_City;
	}

	public String getConsignee_Location() {
		return consignee_Location;
	}

	public String getConsignee_PinCode() {
		return consignee_PinCode;
	}

	public String getConsignee_Ph_No() {
		return consignee_Ph_No;
	}

	public String getConsignee_EmailId() {
		return consignee_EmailId;
	}

	public String getConsignee_ContactPersonName() {
		return consignee_ContactPersonName;
	}

	public String getConsignee_ContactPersonPhNo() {
		return consignee_ContactPersonPhNo;
	}

	public String getConsignee_PAN() {
		return consignee_PAN;
	}

	public String getConsignee_GSTIN_Id() {
		return consignee_GSTIN_Id;
	}

	public String getMaterialType() {
		return MaterialType;
	}

	public String getVendorCode() {
		return vendorCode;
	}

	public String getVendorName() {
		return vendorName;
	}

	public String getTypeof_measurement() {
		return Typeof_measurement;
	}

	public String getlRType() {
		return lRType;
	}

	public String getLrNumber() {
		return lrNumber;
	}

	public String getlRDate() {
		return lRDate;
	}

	public String getEstimatedDeliveryDate() {
		return estimatedDeliveryDate;
	}

	public String getVehicleReporteddate() {
		return vehicleReporteddate;
	}

	public String getVehicleReportedTime() {
		return vehicleReportedTime;
	}

	public String getLoaddate() {
		return loaddate;
	}

	public String getLoadedTime() {
		return loadedTime;
	}

	public String getEway_Bill_by() {
		return eway_Bill_by;
	}

	public String getEway_Bill_Status() {
		return eway_Bill_Status;
	}

	public String getInvoiceValue() {
		return invoiceValue;
	}

	public String getCarrierLRNumber() {
		return carrierLRNumber;
	}

	public String getCarrierLRDate() {
		return carrierLRDate;
	}

	public String getlRCopySendToClient() {
		return lRCopySendToClient;
	}

	public String getSendMailTo() {
		return sendMailTo;
	}

	public String getRemarks() {
		return remarks;
	}

	public String getLrCopyFile() {
		return lrCopyFile;
	}

	public int getPageNo() {
		return pageNo;
	}

	public String getLr_Status() {
		return lr_Status;
	}

	public String getRevenue_Status() {
		return revenue_Status;
	}

	public String getVehicleType() {
		return vehicleType;
	}

	public String getVehicleNo() {
		return vehicleNo;
	}

	public String getClient_conversion_Factor() {
		return client_conversion_Factor;
	}

	public String getVendor_conversion_Factor() {
		return vendor_conversion_Factor;
	}

	public String getDelivery_status() {
		return delivery_status;
	}

	public String getTspName() {
		return tspName;
	}

	public String getTrackId() {
		return trackId;
	}

	public int getNoofPkg() {
		return noofPkg;
	}

	public double getWeight() {
		return weight;
	}

	public Date getCratedDate() {
		return cratedDate;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setInitiator_Id(String initiator_Id) {
		this.initiator_Id = initiator_Id;
	}

	public void setInitiator_BId(int initiator_BId) {
		this.initiator_BId = initiator_BId;
	}

	public void setInitiator_SBId(int initiator_SBId) {
		this.initiator_SBId = initiator_SBId;
	}

	public void setPrqNo(String prqNo) {
		PrqNo = prqNo;
	}

	public void setPrqId(int prqId) {
		PrqId = prqId;
	}

	public void setLoadType(String loadType) {
		LoadType = loadType;
	}

	public void setLr_Count(int lr_Count) {
		this.lr_Count = lr_Count;
	}

	public void setClient_Code(String client_Code) {
		this.client_Code = client_Code;
	}

	public void setClient_Name(String client_Name) {
		this.client_Name = client_Name;
	}

	public void setClient_address(String client_address) {
		this.client_address = client_address;
	}

	public void setModeOfTransport(String modeOfTransport) {
		this.modeOfTransport = modeOfTransport;
	}

	public void setClient_BId(int client_BId) {
		this.client_BId = client_BId;
	}

	public void setConsignor_Code(String consignor_Code) {
		this.consignor_Code = consignor_Code;
	}

	public void setConsignor_Name(String consignor_Name) {
		this.consignor_Name = consignor_Name;
	}

	public void setConsignor_Address(String consignor_Address) {
		this.consignor_Address = consignor_Address;
	}

	public void setConsignor_Zone(String consignor_Zone) {
		this.consignor_Zone = consignor_Zone;
	}

	public void setConsignor_State(String consignor_State) {
		this.consignor_State = consignor_State;
	}

	public void setConsignor_City(String consignor_City) {
		this.consignor_City = consignor_City;
	}

	public void setConsignor_Location(String consignor_Location) {
		this.consignor_Location = consignor_Location;
	}

	public void setConsignor_PinCode(String consignor_PinCode) {
		this.consignor_PinCode = consignor_PinCode;
	}

	public void setConsignor_EmailId(String consignor_EmailId) {
		this.consignor_EmailId = consignor_EmailId;
	}

	public void setConsignor_Ph_No(String consignor_Ph_No) {
		this.consignor_Ph_No = consignor_Ph_No;
	}

	public void setConsignor_ContactPernName(String consignor_ContactPernName) {
		this.consignor_ContactPernName = consignor_ContactPernName;
	}

	public void setConsignor_ContactPernPhNo(String consignor_ContactPernPhNo) {
		this.consignor_ContactPernPhNo = consignor_ContactPernPhNo;
	}

	public void setConsignor_PAN(String consignor_PAN) {
		this.consignor_PAN = consignor_PAN;
	}

	public void setConsignor_GSTIN_Id(String consignor_GSTIN_Id) {
		this.consignor_GSTIN_Id = consignor_GSTIN_Id;
	}

	public void setConsignee_Code(String consignee_Code) {
		this.consignee_Code = consignee_Code;
	}

	public void setConsignee_Name(String consignee_Name) {
		this.consignee_Name = consignee_Name;
	}

	public void setConsignee_Address(String consignee_Address) {
		this.consignee_Address = consignee_Address;
	}

	public void setConsignee_Zone(String consignee_Zone) {
		this.consignee_Zone = consignee_Zone;
	}

	public void setConsignee_State(String consignee_State) {
		this.consignee_State = consignee_State;
	}

	public void setConsignee_City(String consignee_City) {
		this.consignee_City = consignee_City;
	}

	public void setConsignee_Location(String consignee_Location) {
		this.consignee_Location = consignee_Location;
	}

	public void setConsignee_PinCode(String consignee_PinCode) {
		this.consignee_PinCode = consignee_PinCode;
	}

	public void setConsignee_Ph_No(String consignee_Ph_No) {
		this.consignee_Ph_No = consignee_Ph_No;
	}

	public void setConsignee_EmailId(String consignee_EmailId) {
		this.consignee_EmailId = consignee_EmailId;
	}

	public void setConsignee_ContactPersonName(String consignee_ContactPersonName) {
		this.consignee_ContactPersonName = consignee_ContactPersonName;
	}

	public void setConsignee_ContactPersonPhNo(String consignee_ContactPersonPhNo) {
		this.consignee_ContactPersonPhNo = consignee_ContactPersonPhNo;
	}

	public void setConsignee_PAN(String consignee_PAN) {
		this.consignee_PAN = consignee_PAN;
	}

	public void setConsignee_GSTIN_Id(String consignee_GSTIN_Id) {
		this.consignee_GSTIN_Id = consignee_GSTIN_Id;
	}

	public void setMaterialType(String materialType) {
		MaterialType = materialType;
	}

	public void setVendorCode(String vendorCode) {
		this.vendorCode = vendorCode;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public void setTypeof_measurement(String typeof_measurement) {
		Typeof_measurement = typeof_measurement;
	}

	public void setlRType(String lRType) {
		this.lRType = lRType;
	}

	public void setLrNumber(String lrNumber) {
		this.lrNumber = lrNumber;
	}

	public void setlRDate(String lRDate) {
		this.lRDate = lRDate;
	}

	public void setEstimatedDeliveryDate(String estimatedDeliveryDate) {
		this.estimatedDeliveryDate = estimatedDeliveryDate;
	}

	public void setVehicleReporteddate(String vehicleReporteddate) {
		this.vehicleReporteddate = vehicleReporteddate;
	}

	public void setVehicleReportedTime(String vehicleReportedTime) {
		this.vehicleReportedTime = vehicleReportedTime;
	}

	public void setLoaddate(String loaddate) {
		this.loaddate = loaddate;
	}

	public void setLoadedTime(String loadedTime) {
		this.loadedTime = loadedTime;
	}

	public void setEway_Bill_by(String eway_Bill_by) {
		this.eway_Bill_by = eway_Bill_by;
	}

	public void setEway_Bill_Status(String eway_Bill_Status) {
		this.eway_Bill_Status = eway_Bill_Status;
	}

	public void setInvoiceValue(String invoiceValue) {
		this.invoiceValue = invoiceValue;
	}

	public void setCarrierLRNumber(String carrierLRNumber) {
		this.carrierLRNumber = carrierLRNumber;
	}

	public void setCarrierLRDate(String carrierLRDate) {
		this.carrierLRDate = carrierLRDate;
	}

	public void setlRCopySendToClient(String lRCopySendToClient) {
		this.lRCopySendToClient = lRCopySendToClient;
	}

	public void setSendMailTo(String sendMailTo) {
		this.sendMailTo = sendMailTo;
	}

	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}

	public void setLrCopyFile(String lrCopyFile) {
		this.lrCopyFile = lrCopyFile;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public void setLr_Status(String lr_Status) {
		this.lr_Status = lr_Status;
	}

	public void setRevenue_Status(String revenue_Status) {
		this.revenue_Status = revenue_Status;
	}

	public void setVehicleType(String vehicleType) {
		this.vehicleType = vehicleType;
	}

	public void setVehicleNo(String vehicleNo) {
		this.vehicleNo = vehicleNo;
	}

	public void setClient_conversion_Factor(String client_conversion_Factor) {
		this.client_conversion_Factor = client_conversion_Factor;
	}

	public void setVendor_conversion_Factor(String vendor_conversion_Factor) {
		this.vendor_conversion_Factor = vendor_conversion_Factor;
	}

	public void setDelivery_status(String delivery_status) {
		this.delivery_status = delivery_status;
	}

	public void setTspName(String tspName) {
		this.tspName = tspName;
	}

	public void setTrackId(String trackId) {
		this.trackId = trackId;
	}

	public void setNoofPkg(int noofPkg) {
		this.noofPkg = noofPkg;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public void setCratedDate(Date cratedDate) {
		this.cratedDate = cratedDate;
	}

	@Override
	public String toString() {
		return "Consignment [id=" + id + ", initiator_Id=" + initiator_Id + ", initiator_BId=" + initiator_BId
				+ ", initiator_SBId=" + initiator_SBId + ", PrqNo=" + PrqNo + ", PrqId=" + PrqId + ", LoadType="
				+ LoadType + ", lr_Count=" + lr_Count + ", client_Code=" + client_Code + ", client_Name=" + client_Name
				+ ", client_address=" + client_address + ", modeOfTransport=" + modeOfTransport + ", client_BId="
				+ client_BId + ", consignor_Code=" + consignor_Code + ", consignor_Name=" + consignor_Name
				+ ", consignor_Address=" + consignor_Address + ", consignor_Zone=" + consignor_Zone
				+ ", consignor_State=" + consignor_State + ", consignor_City=" + consignor_City
				+ ", consignor_Location=" + consignor_Location + ", consignor_PinCode=" + consignor_PinCode
				+ ", consignor_EmailId=" + consignor_EmailId + ", consignor_Ph_No=" + consignor_Ph_No
				+ ", consignor_ContactPernName=" + consignor_ContactPernName + ", consignor_ContactPernPhNo="
				+ consignor_ContactPernPhNo + ", consignor_PAN=" + consignor_PAN + ", consignor_GSTIN_Id="
				+ consignor_GSTIN_Id + ", consignee_Code=" + consignee_Code + ", consignee_Name=" + consignee_Name
				+ ", consignee_Address=" + consignee_Address + ", consignee_Zone=" + consignee_Zone
				+ ", consignee_State=" + consignee_State + ", consignee_City=" + consignee_City
				+ ", consignee_Location=" + consignee_Location + ", consignee_PinCode=" + consignee_PinCode
				+ ", consignee_Ph_No=" + consignee_Ph_No + ", consignee_EmailId=" + consignee_EmailId
				+ ", consignee_ContactPersonName=" + consignee_ContactPersonName + ", consignee_ContactPersonPhNo="
				+ consignee_ContactPersonPhNo + ", consignee_PAN=" + consignee_PAN + ", consignee_GSTIN_Id="
				+ consignee_GSTIN_Id + ", MaterialType=" + MaterialType + ", vendorCode=" + vendorCode + ", vendorName="
				+ vendorName + ", Typeof_measurement=" + Typeof_measurement + ", lRType=" + lRType + ", lrNumber="
				+ lrNumber + ", lRDate=" + lRDate + ", estimatedDeliveryDate=" + estimatedDeliveryDate
				+ ", vehicleReporteddate=" + vehicleReporteddate + ", vehicleReportedTime=" + vehicleReportedTime
				+ ", loaddate=" + loaddate + ", loadedTime=" + loadedTime + ", eway_Bill_by=" + eway_Bill_by
				+ ", eway_Bill_Status=" + eway_Bill_Status + ", invoiceValue=" + invoiceValue + ", carrierLRNumber="
				+ carrierLRNumber + ", carrierLRDate=" + carrierLRDate + ", lRCopySendToClient=" + lRCopySendToClient
				+ ", sendMailTo=" + sendMailTo + ", remarks=" + remarks + ", lrCopyFile=" + lrCopyFile + ", pageNo="
				+ pageNo + ", lr_Status=" + lr_Status + ", revenue_Status=" + revenue_Status + ", vehicleType="
				+ vehicleType + ", vehicleNo=" + vehicleNo + ", client_conversion_Factor=" + client_conversion_Factor
				+ ", vendor_conversion_Factor=" + vendor_conversion_Factor + ", delivery_status=" + delivery_status
				+ ", tspName=" + tspName + ", trackId=" + trackId + ", noofPkg=" + noofPkg + ", weight=" + weight
				+ ", cratedDate=" + cratedDate + "]";
	}



	
	
	
	
}
