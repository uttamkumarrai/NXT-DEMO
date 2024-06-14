package com.example.master.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "assignstock_details")
public class AssignLR {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	
	private String initiatorId;
	
	private String 	initiatorName;
	
	private Integer initiatorbId;
	
	private Integer branchId;
	
	private Integer subBranchId;
	
	private Double seriesFrom;
	
	private Double seriesTo;
	
	private String seriesStartWith;
	
	private Boolean allocated;
	
	private Boolean utilized;
	
	private String issueDate;
	
	private String consignmentNo;

	public Integer getId() {
		return id;
	}

	public String getInitiatorId() {
		return initiatorId;
	}

	public String getInitiatorName() {
		return initiatorName;
	}

	public Integer getInitiatorbId() {
		return initiatorbId;
	}

	public Integer getBranchId() {
		return branchId;
	}

	public Integer getSubBranchId() {
		return subBranchId;
	}

	public Double getSeriesFrom() {
		return seriesFrom;
	}

	public Double getSeriesTo() {
		return seriesTo;
	}

	public String getSeriesStartWith() {
		return seriesStartWith;
	}

	public Boolean getAllocated() {
		return allocated;
	}

	public Boolean getUtilized() {
		return utilized;
	}

	public String getIssueDate() {
		return issueDate;
	}

	public String getConsignmentNo() {
		return consignmentNo;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setInitiatorId(String initiatorId) {
		this.initiatorId = initiatorId;
	}

	public void setInitiatorName(String initiatorName) {
		this.initiatorName = initiatorName;
	}

	public void setInitiatorbId(Integer initiatorbId) {
		this.initiatorbId = initiatorbId;
	}

	public void setBranchId(Integer branchId) {
		this.branchId = branchId;
	}

	public void setSubBranchId(Integer subBranchId) {
		this.subBranchId = subBranchId;
	}

	public void setSeriesFrom(Double seriesFrom) {
		this.seriesFrom = seriesFrom;
	}

	public void setSeriesTo(Double seriesTo) {
		this.seriesTo = seriesTo;
	}

	public void setSeriesStartWith(String seriesStartWith) {
		this.seriesStartWith = seriesStartWith;
	}

	public void setAllocated(Boolean allocated) {
		this.allocated = allocated;
	}

	public void setUtilized(Boolean utilized) {
		this.utilized = utilized;
	}

	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}

	public void setConsignmentNo(String consignmentNo) {
		this.consignmentNo = consignmentNo;
	}

	@Override
	public String toString() {
		return "AssignLR [id=" + id + ", initiatorId=" + initiatorId + ", initiatorName=" + initiatorName
				+ ", initiatorbId=" + initiatorbId + ", branchId=" + branchId + ", subBranchId=" + subBranchId
				+ ", seriesFrom=" + seriesFrom + ", seriesTo=" + seriesTo + ", seriesStartWith=" + seriesStartWith
				+ ", allocated=" + allocated + ", utilized=" + utilized + ", issueDate=" + issueDate
				+ ", consignmentNo=" + consignmentNo + "]";
	}

	
	
	


	
	
	
	

}
