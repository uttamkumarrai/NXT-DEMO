package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SubBranchMaster {

	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String subBranchname;
	
	private String subBranchaddress;
	
	private String reportingbranch;

	public Integer getId() {
		return id;
	}

	public String getSubBranchname() {
		return subBranchname;
	}

	public String getSubBranchaddress() {
		return subBranchaddress;
	}

	public String getReportingbranch() {
		return reportingbranch;
	}
	
	
	@Column(name="Incharge_Contact_Number")
	public String inchargeContactNumber;
	
	@Column(name="Incharge_Email")
	private String inchargeEmail;
	
	@Column(name="Group_Email_Id")
	private String groupEmailId;

	public String getInchargeContactNumber() {
		return inchargeContactNumber;
	}

	public String getInchargeEmail() {
		return inchargeEmail;
	}

	public String getGroupEmailId() {
		return groupEmailId;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setSubBranchname(String subBranchname) {
		this.subBranchname = subBranchname;
	}

	public void setSubBranchaddress(String subBranchaddress) {
		this.subBranchaddress = subBranchaddress;
	}

	public void setReportingbranch(String reportingbranch) {
		this.reportingbranch = reportingbranch;
	}

	public void setInchargeContactNumber(String inchargeContactNumber) {
		this.inchargeContactNumber = inchargeContactNumber;
	}

	public void setInchargeEmail(String inchargeEmail) {
		this.inchargeEmail = inchargeEmail;
	}

	public void setGroupEmailId(String groupEmailId) {
		this.groupEmailId = groupEmailId;
	}

	@Override
	public String toString() {
		return "SubBranchMaster [id=" + id + ", subBranchname=" + subBranchname + ", subBranchaddress="
				+ subBranchaddress + ", reportingbranch=" + reportingbranch + ", inchargeContactNumber="
				+ inchargeContactNumber + ", inchargeEmail=" + inchargeEmail + ", groupEmailId=" + groupEmailId + "]";
	}
	
	
	

	
	
}
