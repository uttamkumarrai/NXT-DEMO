package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class BranchMaster {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private  Integer branchid;
	
	private String branchname;
	
	private String branchcode;
	
	private String branchaddress;
	
	private String branchGST;
	
	private String branchPAN;
	
	@Column(name = "notification_sms")
	private Boolean notificationSms;
	
	@Column(name = "notification_email")
	private Boolean notificationEmail;
	
	@Column(name = "Incharge_Email")
	private String InchargeEmail;
	
	@Column(name = "Incharge_Contact_Number	")
	private Integer InchargeContact;
	
	@Column(name = "Group_Email_Id")
	private String GroupId;
	
	private String LR_Prefix;
	
	



	public String getLR_Prefix() {
		return LR_Prefix;
	}

	public void setLR_Prefix(String lR_Prefix) {
		LR_Prefix = lR_Prefix;
	}

	public Integer getId() {
		return id;
	}

	public Integer getBranchid() {
		return branchid;
	}

	public String getBranchname() {
		return branchname;
	}

	public String getBranchcode() {
		return branchcode;
	}

	public String getBranchaddress() {
		return branchaddress;
	}

	public String getBranchGST() {
		return branchGST;
	}

	public String getBranchPAN() {
		return branchPAN;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setBranchid(Integer branchid) {
		this.branchid = branchid;
	}

	public void setBranchname(String branchname) {
		this.branchname = branchname;
	}

	public void setBranchcode(String branchcode) {
		this.branchcode = branchcode;
	}

	public void setBranchaddress(String branchaddress) {
		this.branchaddress = branchaddress;
	}

	public void setBranchGST(String branchGST) {
		this.branchGST = branchGST;
	}

	public void setBranchPAN(String branchPAN) {
		this.branchPAN = branchPAN;
	}
	
	

	public Boolean getNotificationSms() {
		return notificationSms;
	}

	public Boolean getNotificationEmail() {
		return notificationEmail;
	}

	public void setNotificationSms(Boolean notificationSms) {
		this.notificationSms = notificationSms;
	}

	public void setNotificationEmail(Boolean notificationEmail) {
		this.notificationEmail = notificationEmail;
	}
	

	public String getInchargeEmail() {
		return InchargeEmail;
	}

	public Integer getInchargeContact() {
		return InchargeContact;
	}

	public String getGroupId() {
		return GroupId;
	}

	public void setInchargeEmail(String inchargeEmail) {
		InchargeEmail = inchargeEmail;
	}

	public void setInchargeContact(Integer inchargeContact) {
		InchargeContact = inchargeContact;
	}

	public void setGroupId(String groupId) {
		GroupId = groupId;
	}

	@Override
	public String toString() {
		return "BranchMaster [id=" + id + ", branchid=" + branchid + ", branchname=" + branchname + ", branchcode="
				+ branchcode + ", branchaddress=" + branchaddress + ", branchGST=" + branchGST + ", branchPAN="
				+ branchPAN + ", notificationSms=" + notificationSms + ", notificationEmail=" + notificationEmail
				+ ", InchargeEmail=" + InchargeEmail + ", InchargeContact=" + InchargeContact + ", GroupId=" + GroupId
				+ ", LR_Prefix=" + LR_Prefix + "]";
	}
	
	
	
	
	
}
