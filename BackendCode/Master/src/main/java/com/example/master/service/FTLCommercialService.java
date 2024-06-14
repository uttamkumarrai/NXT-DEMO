package com.example.master.service;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.ss.usermodel.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.example.master.entity.FTLCommercial;
import com.example.master.repository.FTLCommercialRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class FTLCommercialService {
	
	@Autowired
	FTLCommercialRepository ftlCommercialRepository;
	
	public void saveExcelData(MultipartFile file) throws Exception {
		System.out.println("bulk upload method");
	    List<FTLCommercial> dataList = new ArrayList<>();
	    InputStream inputStream = file.getInputStream();
	    Workbook workbook = WorkbookFactory.create(inputStream);
	    Sheet sheet = workbook.getSheetAt(0);
	    for (Row row : sheet) {
            if (row.getRowNum() == 0) {
                continue; // Skip the header row
            }
            FTLCommercial data = new FTLCommercial();
            data.setServiceType(getStringCellValue(row.getCell(0)));
            data.setType(getStringCellValue(row.getCell(1)));
            data.setCommercialCode(getStringCellValue(row.getCell(2)));
            data.setVehicleType(getStringCellValue(row.getCell(3)));
            data.setOriginPincode((int) getNumericCellValue(row.getCell(4)));
            data.setOriginState(getStringCellValue(row.getCell(5)));
            data.setOriginCity(getStringCellValue(row.getCell(6)));
            data.setOriginLocation(getStringCellValue(row.getCell(7)));
            data.setDestinationPincode((int) getNumericCellValue(row.getCell(8)));
            data.setDestinationState(getStringCellValue(row.getCell(9)));
            data.setDestinationCity(getStringCellValue(row.getCell(10)));
            data.setDestinationLocation(getStringCellValue(row.getCell(11)));
            data.setTat((int) getNumericCellValue(row.getCell(12)));
            data.setDistanceKm((int) getNumericCellValue(row.getCell(13)));
            data.setRate(getDoubleCellValue(row.getCell(15)));

            dataList.add(data);
        }
        ftlCommercialRepository.saveAll(dataList);
    }

    private String getStringCellValue(Cell cell) {
        if (cell == null) {
            return null;
        }
        if (cell.getCellType() == CellType.STRING) {
            return cell.getStringCellValue();
        } else if (cell.getCellType() == CellType.NUMERIC) {
            return String.valueOf((int) cell.getNumericCellValue());
        } else {
            return null;
        }
    }

    private double getNumericCellValue(Cell cell) {
        if (cell == null) {
            return 0;
        }
        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        } else if (cell.getCellType() == CellType.STRING) {
            try {
                return Double.parseDouble(cell.getStringCellValue());
            } catch (NumberFormatException e) {
                return 0;
            }
        } else {
            return 0;
        }
    }
    
    private double getDoubleCellValue(Cell cell) {
        if (cell == null) {
            return 0.0;
        }
        if (cell.getCellType() == CellType.NUMERIC) {
            return cell.getNumericCellValue();
        } else if (cell.getCellType() == CellType.STRING) {
            try {
                return Double.parseDouble(cell.getStringCellValue());
            } catch (NumberFormatException e) {
                return 0.0;
            }
        } else {
            return 0.0;
        }
    }
	
	  public List<FTLCommercial> saveAllCommercials(List<FTLCommercial> entries) {
	        return ftlCommercialRepository.saveAll(entries);
	    }
	  
	  public List<FTLCommercial>getCommercialByBranchId(int branchId){
		  List<FTLCommercial> commercial= ftlCommercialRepository.findBybranchId(branchId);
		  if(!commercial.isEmpty()) {
			  return commercial;
		  }
	   else {
          throw new EntityNotFoundException("No Commercials found for branchid " + branchId);
      }
	  }
	  

}
