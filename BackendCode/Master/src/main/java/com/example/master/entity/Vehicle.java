package com.example.master.entity;



import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Table;
import jakarta.persistence.Id;

@Entity
@Table(name = "Vehicle_Master")
public class Vehicle {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer Id;
	
	@Column(name="Tracking_By")
	 private String trackingBy;
	
	@Column(name="Reg_No")
	    private String regNo;
	
	@Column(name="Model_SubModel")
	    private String modelSubModel;
	
	@Column(name="Engine_No")
	    private String engineNo;
	
	@Column(name="Chassis_No")
	    private String chassisNo;
	
	@Column(name="Odometer_Reading")
	    private String odometerReading;
	
	@Column(name="Vehicle_Type")
	    private String vehicleType;
	
	@Column(name="Permit_Type")
	    private String permitType;
	
	    private String manufacturer;
	    
	    @Column(name="Capacity_Kg")
	    private int capacityKg;
	    
	    @Column(name="Capacity_Cubic")
	    private int capacityCubic;
	    
	    @Column(name="Capacity_Liters")
	    private int capacityLiters;
	    private int length;
	    private int width;
	    private int height;
	    
	    
	    
	    @Column(name = "Manufacturer_Date", columnDefinition = "DATE")
	    private Date manufacturerDate;
	    
	    @Column(name="Reg_Date")
	    private Date regDate;
	    
	    private Boolean status;

		public Boolean getStatus() {
			return status;
		}

		public void setStatus(Boolean status) {
			this.status = status;
		}

		public Integer getId() {
			return Id;
		}

		public void setId(Integer id) {
			Id = id;
		}

		public String getTrackingBy() {
			return trackingBy;
		}

		public void setTrackingBy(String trackingBy) {
			this.trackingBy = trackingBy;
		}

		public String getRegNo() {
			return regNo;
		}

		public void setRegNo(String regNo) {
			this.regNo = regNo;
		}

		public String getModelSubModel() {
			return modelSubModel;
		}

		public void setModelSubModel(String modelSubModel) {
			this.modelSubModel = modelSubModel;
		}

		public String getEngineNo() {
			return engineNo;
		}

		public void setEngineNo(String engineNo) {
			this.engineNo = engineNo;
		}

		public String getChassisNo() {
			return chassisNo;
		}

		public void setChassisNo(String chassisNo) {
			this.chassisNo = chassisNo;
		}

		public String getOdometerReading() {
			return odometerReading;
		}

		public void setOdometerReading(String odometerReading) {
			this.odometerReading = odometerReading;
		}

		public String getVehicleType() {
			return vehicleType;
		}

		public void setVehicleType(String vehicleType) {
			this.vehicleType = vehicleType;
		}

		public String getPermitType() {
			return permitType;
		}

		public void setPermitType(String permitType) {
			this.permitType = permitType;
		}

		public String getManufacturer() {
			return manufacturer;
		}

		public void setManufacturer(String manufacturer) {
			this.manufacturer = manufacturer;
		}

		public int getCapacityKg() {
			return capacityKg;
		}

		public void setCapacityKg(int capacityKg) {
			this.capacityKg = capacityKg;
		}

		public int getCapacityCubic() {
			return capacityCubic;
		}

		public void setCapacityCubic(int capacityCubic) {
			this.capacityCubic = capacityCubic;
		}

		public int getCapacityLiters() {
			return capacityLiters;
		}

		public void setCapacityLiters(int capacityLiters) {
			this.capacityLiters = capacityLiters;
		}

		public int getLength() {
			return length;
		}

		public void setLength(int length) {
			this.length = length;
		}

		public int getWidth() {
			return width;
		}

		public void setWidth(int width) {
			this.width = width;
		}

		public int getHeight() {
			return height;
		}

		public void setHeight(int height) {
			this.height = height;
		}

		

		public Date getManufacturerDate() {
			return manufacturerDate;
		}

		public void setManufacturerDate(Date manufacturerDate) {
			this.manufacturerDate = manufacturerDate;
		}

		public Date getRegDate() {
			return regDate;
		}

		public void setRegDate(Date regDate) {
			this.regDate = regDate;
		}

		@Override
		public String toString() {
			return "Vehicle [Id=" + Id + ", trackingBy=" + trackingBy + ", regNo=" + regNo + ", modelSubModel="
					+ modelSubModel + ", engineNo=" + engineNo + ", chassisNo=" + chassisNo + ", odometerReading="
					+ odometerReading + ", vehicleType=" + vehicleType + ", permitType=" + permitType
					+ ", manufacturer=" + manufacturer + ", capacityKg=" + capacityKg + ", capacityCubic="
					+ capacityCubic + ", capacityLiters=" + capacityLiters + ", length=" + length + ", width=" + width
					+ ", height=" + height + ",  manufacturerDate="
					+ manufacturerDate + ", regDate=" + regDate + ", status=" + status + "]";
		}
	    
	    
	
	

	
	
}
