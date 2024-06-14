package com.example.master.entity;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "Driver_Details")
public class Driver {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="Driver_Type")
	private String driverType;
	
	private Date DOB;
	
	@Column(name="DL_Number")
	private String DLNumber;
	
	@Column(name="First_Name")
	private String firstName;
	
	@Column(name="Last_Name")
	private String lastName;
	
	@Column(name="Mobile_Number")
	private String mobileNo;
	
	private String Email;
	
	private String Gender;
	
	private String Password;
	
	@Column(name="File_Name")
	private String fileName;
	
	@Column(name="File_Path")
	private String filePath;
	
	private Boolean status;
	

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public Integer getId() {
		return id;
	}

	public String getDriverType() {
		return driverType;
	}

	public Date getDOB() {
		return DOB;
	}

	public String getDLNumber() {
		return DLNumber;
	}

	public String getFirstName() {
		return firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public String getMobileNo() {
		return mobileNo;
	}

	public String getEmail() {
		return Email;
	}

	public String getGender() {
		return Gender;
	}

	public String getPassword() {
		return Password;
	}

	public String getFileName() {
		return fileName;
	}

	public String getFilePath() {
		return filePath;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public void setDriverType(String driverType) {
		this.driverType = driverType;
	}

	public void setDOB(Date dOB) {
		DOB = dOB;
	}

	public void setDLNumber(String dLNumber) {
		DLNumber = dLNumber;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}

	public void setEmail(String email) {
		Email = email;
	}

	public void setGender(String gender) {
		Gender = gender;
	}

	public void setPassword(String password) {
		Password = password;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public void setFilePath(String filePath) {
		this.filePath = filePath;
	}

	@Override
	public String toString() {
		return "Driver [id=" + id + ", driverType=" + driverType + ", DOB=" + DOB + ", DLNumber=" + DLNumber
				+ ", firstName=" + firstName + ", lastName=" + lastName + ", mobileNo=" + mobileNo + ", Email=" + Email
				+ ", Gender=" + Gender + ", Password=" + Password + ", fileName=" + fileName + ", filePath=" + filePath
				+ ", status=" + status + "]";
	}
	
	
	
	
	
	

}
