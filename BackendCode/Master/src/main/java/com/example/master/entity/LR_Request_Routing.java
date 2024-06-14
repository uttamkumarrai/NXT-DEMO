package com.example.master.entity;

import java.time.LocalDate;
import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class LR_Request_Routing {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	
	@Column(name="initiator_empid")
	private String initiatorempid;
	
	@Column(name="branch_id")
	private String branchid;
	
	@Column(name="branch_name")
	private String branchname;
	
	private String prefix;
	

	private String qty;
	
	@Column(name="from_series")
	private String fromSeries;
	
	@Column(name="to_series")
	private String toSeries;
	
	@Column(name="Requested_By")
	private String requestedBy;
	
	@Column(name="requested_flag")
	private Boolean requestedFlag;
	
	@Column(name="Next_Approver_empid")
	private String nextApproverEmpid;
	
	@Column(name="Next_Approver_name")
	private String nextApproverName;
	
	@Column(name="Approved_flag")
	private Boolean approvedFlag;
	
	
	
	private String status;
	
	@Column(name="Modified_Date_Time")
	private LocalDate  modifiedDateTime;

	public Integer getId() {
		return id;
	}

	public String getInitiatorempid() {
		return initiatorempid;
	}

	public String getBranchid() {
		return branchid;
	}

	public String getBranchname() {
		return branchname;
	}

	public String getPrefix() {
		return prefix;
	}

	public String getQty() {
		return qty;
	}

	public String getFromSeries() {
		return fromSeries;
	}

	public String getToSeries() {
		return toSeries;
	}

	public String getRequestedBy() {
		return requestedBy;
	}

	public Boolean getRequestedFlag() {
		return requestedFlag;
	}

	public String getNextApproverEmpid() {
		return nextApproverEmpid;
	}

	public String getNextApproverName() {
		return nextApproverName;
	}

	public Boolean getApprovedFlag() {
		return approvedFlag;
	}

	public String getStatus() {
		return status;
	}

	public LocalDate getModifiedDateTime() {
		return modifiedDateTime;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setInitiatorempid(String initiatorempid) {
		this.initiatorempid = initiatorempid;
	}

	public void setBranchid(String branchid) {
		this.branchid = branchid;
	}

	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}

	public void setPrefix(String prefix) {
		this.prefix = prefix;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public void setFromSeries(String fromSeries) {
		this.fromSeries = fromSeries;
	}

	public void setToSeries(String toSeries) {
		this.toSeries = toSeries;
	}

	public void setRequestedBy(String requestedBy) {
		this.requestedBy = requestedBy;
	}

	public void setRequestedFlag(Boolean requestedFlag) {
		this.requestedFlag = requestedFlag;
	}

	public void setNextApproverEmpid(String nextApproverEmpid) {
		this.nextApproverEmpid = nextApproverEmpid;
	}

	public void setNextApproverName(String nextApproverName) {
		this.nextApproverName = nextApproverName;
	}

	public void setApprovedFlag(Boolean approvedFlag) {
		this.approvedFlag = approvedFlag;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public void setModifiedDateTime(LocalDate modifiedDateTime) {
		this.modifiedDateTime = modifiedDateTime;
	}

	@Override
	public String toString() {
		return "LR_Request_Routing [id=" + id + ", initiatorempid=" + initiatorempid + ", branchid=" + branchid
				+ ", branchname=" + branchname + ", prefix=" + prefix + ", qty=" + qty + ", fromSeries=" + fromSeries
				+ ", toSeries=" + toSeries + ", requestedBy=" + requestedBy + ", requestedFlag=" + requestedFlag
				+ ", nextApproverEmpid=" + nextApproverEmpid + ", nextApproverName=" + nextApproverName
				+ ", approvedFlag=" + approvedFlag + ", status=" + status + ", modifiedDateTime=" + modifiedDateTime
				+ "]";
	}





	
	

}
