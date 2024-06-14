package com.example.master.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class User {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	private String empid;
	
	private String empname;
	
	private String password;
	
	private String department;
	
	private String designation;
	
	private String sub_branch_name;
	
	private String branch_name;
	
	@Column(name="employee_role_type")
	private String employeeRoleType;
	
	private Integer branchid;
	
	private Integer sub_branchid;
	
	private String 	email;
	
	private String phone;
	
	private String user_right;
	
	private String job_role;
	
	private String 	usertype;
	
	private String mailoption;
	
	private Boolean status;
	
	private String menus;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getEmpid() {
		return empid;
	}

	public void setEmpid(String empid) {
		this.empid = empid;
	}

	public String getEmpname() {
		return empname;
	}

	public void setEmpname(String empname) {
		this.empname = empname;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDesignation() {
		return designation;
	}

	public void setDesignation(String designation) {
		this.designation = designation;
	}

	public String getSub_branch_name() {
		return sub_branch_name;
	}

	public void setSub_branch_name(String sub_branch_name) {
		this.sub_branch_name = sub_branch_name;
	}

	public String getBranch_name() {
		return branch_name;
	}

	public void setBranch_name(String branch_name) {
		this.branch_name = branch_name;
	}



	public String getEmployeeRoleType() {
		return employeeRoleType;
	}

	public void setEmployeeRoleType(String employeeRoleType) {
		this.employeeRoleType = employeeRoleType;
	}

	public Integer getBranchid() {
		return branchid;
	}

	public void setBranchid(Integer branchid) {
		this.branchid = branchid;
	}

	public Integer getSub_branchid() {
		return sub_branchid;
	}

	public void setSub_branchid(Integer sub_branchid) {
		this.sub_branchid = sub_branchid;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getUser_right() {
		return user_right;
	}

	public void setUser_right(String user_right) {
		this.user_right = user_right;
	}

	public String getJob_role() {
		return job_role;
	}

	public void setJob_role(String job_role) {
		this.job_role = job_role;
	}

	public String getUsertype() {
		return usertype;
	}

	public void setUsertype(String usertype) {
		this.usertype = usertype;
	}

	public String getMailoption() {
		return mailoption;
	}

	public void setMailoption(String mailoption) {
		this.mailoption = mailoption;
	}

	public Boolean getStatus() {
		return status;
	}

	public void setStatus(Boolean status) {
		this.status = status;
	}

	public String getMenus() {
		return menus;
	}

	public void setMenus(String menus) {
		this.menus = menus;
	}

	@Override
	public String toString() {
		return "User [id=" + id + ", empid=" + empid + ", empname=" + empname + ", password=" + password
				+ ", department=" + department + ", designation=" + designation + ", sub_branch_name=" + sub_branch_name
				+ ", branch_name=" + branch_name + ", employeeRoleType=" + employeeRoleType + ", branchid="
				+ branchid + ", sub_branchid=" + sub_branchid + ", email=" + email + ", phone=" + phone
				+ ", user_right=" + user_right + ", job_role=" + job_role + ", usertype=" + usertype + ", mailoption="
				+ mailoption + ", status=" + status + ", menus=" + menus + "]";
	}
	
	


	


	
	

}
