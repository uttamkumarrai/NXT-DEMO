package com.example.master.service;

import java.io.File;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.master.entity.Vehicle;
import com.example.master.entity.VehicleDocuments;
import com.example.master.repository.VehicleDocumentsRepository;
import com.example.master.repository.VehicleRepository;

@Service
public class VehicleService {
    private final VehicleRepository vehicleRepository;
    private final VehicleDocumentsRepository vehicleDocumentsRepository;

    @Value("${file.upload.path}") // Inject the upload directory path from application.properties
    private String uploadDirectory;

    @Autowired
    public VehicleService(VehicleRepository vehicleRepository, VehicleDocumentsRepository vehicleDocumentsRepository) {
        this.vehicleRepository = vehicleRepository;
        this.vehicleDocumentsRepository = vehicleDocumentsRepository;
    }

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }
    
    public List<VehicleDocuments> getVehicleFilesByRegistrationNumber(String registrationNumber) {
        return vehicleDocumentsRepository.findByregNoAndFlag(registrationNumber,true);
    }
    
    public List<Object[]> getVehicleWithDocuments(){
    	return vehicleRepository.getVehicleWithDocuments();
    }
    
    
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getVehicleType() {
        String sql = "SELECT * FROM vehicle_type_master";
        return jdbcTemplate.queryForList(sql);
    }
    
    
    

    public Vehicle create(Vehicle formData, List<MultipartFile> files, List<String> fileTypes, List<String> startDates, List<String> endDates) {
        // Save the Vehicle object in the database
    	System.out.println("before save is there");
        Vehicle vehicle = vehicleRepository.save(formData);
        System.out.println("after sve is there");

        // Save the first input file (if provided)
       

        // Save the additional files (if provided)
        if (files != null && !files.isEmpty()) {
        	System.out.println("files is there");
        	 for (int i = 0; i < files.size(); i++) {
        	        MultipartFile file = files.get(i);
        	        String fileType = fileTypes.get(i);
        	        String startDate = startDates.get(i); // Get the start date for this file
        	        String endDate = endDates.get(i);     // Get the end date for this file
        	        
        	        System.out.println("Processing file: " + file.getOriginalFilename());
        	        System.out.println("File type: " + fileType);
        	        System.out.println("Start date: " + startDate);
        	        System.out.println("End date: " + endDate);

        	        saveFileData(vehicle.getRegNo(), file, parseDate(startDate), parseDate(endDate), fileType);
            }
        }

        return vehicle;
    }

    private void saveFileData(String regNo, MultipartFile file, Date startDate, Date endDate, String documentType) {
        try {
            // Construct the directory path with the registration number inside NEIN-TMS directory
            String directoryPath = uploadDirectory + File.separator + "NEIN-TMS" + File.separator + regNo;
            File directory = new File(directoryPath);

            // Create the directory if it doesn't exist
            if (!directory.exists()) {
                if (!directory.mkdirs()) {
                    // Directory creation failed, handle the error
                    throw new IOException("Failed to create directory: " + directoryPath);
                }
            }

            // Get the original filename
            String fileName = file.getOriginalFilename();

            // Construct the file path within the directory
            String filePath = directoryPath + File.separator + fileName;
            File dest = new File(filePath);

            // Transfer the file to the destination
            file.transferTo(dest);

            // Create a new VehicleDocuments object and save it
            VehicleDocuments document = new VehicleDocuments();
            document.setRegNo(regNo);
            document.setFileName(fileName);
            document.setFileType(file.getContentType());
            document.setStartDate(startDate);
            document.setEndDate(endDate);
            document.setDocumentType(documentType);
            document.setFilePath(filePath);
            document.setFlag(true);
            vehicleDocumentsRepository.save(document);
        } catch (IOException e) {
            // Handle the exception
            e.printStackTrace();
            // You may choose to throw an exception or log the error
        }
    }


    private Date parseDate(String dateString) {
        try {
            SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");
            return formatter.parse(dateString);
        } catch (ParseException e) {
            // Handle parsing exception
            e.printStackTrace();
            return null;
        }
    }


//    public String uploadImageToFileSystem(MultipartFile file) throws IOException {
//        String filePath = FOLDER_PATH + file.getOriginalFilename();
//
//        VehicleDocuments fileData = vehicleDocumentsRepository.save(new VehicleDocuments(file.getOriginalFilename(), file.getContentType(), filePath));
//
//        file.transferTo(new File(filePath));
//
//        if (fileData != null) {
//            return "file uploaded successfully : " + filePath;
//        }
//        return null;
//    }
}
