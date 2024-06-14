package com.example.master.entity;



import java.util.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "Vehicle_Master_Files")
public class VehicleDocuments {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name="Registration_No")
	private String regNo;
	
	@Column(name="File_Name")
	private String fileName;
	
	@Column(name="File_Path")
	private String filePath;
	
	  @Column(name = "File_Type")
	    private String fileType;

	    @Temporal(TemporalType.DATE)
	    @Column(name = "Start_Date")
	    private Date startDate;

	    @Temporal(TemporalType.DATE)
	    @Column(name = "End_Date")
	    private Date endDate;

	    @Column(name = "Document_Type")
	    private String documentType;
	    
	    private Boolean flag;

		public Boolean getFlag() {
			return flag;
		}

		public void setFlag(Boolean flag) {
			this.flag = flag;
		}

		public Integer getId() {
			return id;
		}

		public void setId(Integer id) {
			this.id = id;
		}

		public String getRegNo() {
			return regNo;
		}

		public void setRegNo(String regNo) {
			this.regNo = regNo;
		}

		public String getFileName() {
			return fileName;
		}

		public void setFileName(String fileName) {
			this.fileName = fileName;
		}

		public String getFilePath() {
			return filePath;
		}

		public void setFilePath(String filePath) {
			this.filePath = filePath;
		}

		public String getFileType() {
			return fileType;
		}

		public void setFileType(String fileType) {
			this.fileType = fileType;
		}

		public Date getStartDate() {
			return startDate;
		}

		public void setStartDate(Date startDate) {
			this.startDate = startDate;
		}

		public VehicleDocuments() {
			super();
			// TODO Auto-generated constructor stub
		}

		public Date getEndDate() {
			return endDate;
		}

		public void setEndDate(Date endDate) {
			this.endDate = endDate;
		}

		public String getDocumentType() {
			return documentType;
		}

		public void setDocumentType(String documentType) {
			this.documentType = documentType;
		}

		@Override
		public String toString() {
			return "VehicleDocuments [id=" + id + ", regNo=" + regNo + ", fileName=" + fileName + ", filePath="
					+ filePath + ", fileType=" + fileType + ", startDate=" + startDate + ", endDate=" + endDate
					+ ", documentType=" + documentType + ", flag=" + flag + "]";
		}

		public VehicleDocuments(String regNo, String fileName, String filePath, String fileType, Date startDate,
				Date endDate, String documentType) {
			super();
			this.regNo = regNo;
			this.fileName = fileName;
			this.filePath = filePath;
			this.fileType = fileType;
			this.startDate = startDate;
			this.endDate = endDate;
			this.documentType = documentType;
		}



}
