package ReportsPaging;

import java.sql.Connection;


import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.Month;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import DBUtil.DatabaseUtil;;

public class ReportsPagingLogic {

	
	
	/*
	 * FUCNTION FOR GETTING EMPLOYEE SHIFTWISE REPORT
	 */
	public static ReportsPagingJSON shiftwiseReport(ReportsPagingJSON details) {
		
		ArrayList<ReportsPagingJSON> employeeRetrievelist = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> employeeRetrievelist1 = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		Connection connection=null;

		ReportsPagingJSON employeeRetrieveobj1 = new ReportsPagingJSON();
		int dataEndCount=details.getDataCount()+10;
		        int empCount=0;
		        int empCount1=0;
		        String EmpId="";
		        String empId="";
		        String empId1="";
		try {
		connection =DatabaseUtil.getDBConnection();

		System.out.println("DATA COUNT : \t"+details.getDataCount());
		System.out.println("if condition:"+(!details.getShift().equals("all")));
		System.out.println("shift value:"+(details.getShift()));
		if(!details.getShift().equals("all"))
		{
			if(!details.getShift().equals("1"))
			{
				System.out.println("SHIFT OTHER THAN 1 \n");
				if(details.getDataCount()==0) {
					System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
					String querySelectEmpCount=ReportsPagingQueries.EMP_MAINTENANCE_REPORT_COUNT;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,details.getCompanyId());
				preparedStmtEmpCount.setString(2,details.getShift());
				preparedStmtEmpCount.setString(3,details.getDate());
					  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   empCount=rsEmpCount.getInt("EmpCount");
				       
				       }
				       
				   	details.setTotlaItemCount(empCount);
				}
					String querySelectEmpCount=ReportsPagingQueries.All_Shift;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,details.getCompanyId());
			
					  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
				    	   empcountall.setEmpCount(rsEmpCount.getString("empCount"));
				    	   empcountall.setShiftNo(rsEmpCount.getString("shift"));
				    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
							PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
							preparedStmtEmpCountgr.setString(1,details.getCompanyId());
							preparedStmtEmpCountgr.setString(2,rsEmpCount.getString("shift"));
							  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
						       while(rsEmpCountgr.next())
						       {
						    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
						    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
						    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
						      	   empcountallgr.setShiftNo(rsEmpCount.getString("shift"));
						    	   allShiftGrade.add(empcountallgr);
						    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
						    	  
						       }
				    	   
				    	   allShiftDetails.add(empcountall);
				    	   empCount1=empCount1+Integer.parseInt(rsEmpCount.getString("empCount"));
				       }
				       
				   	details.setTotalItemCount(empCount1);
				   	details.setAllShiftDetails(allShiftDetails);
				      LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),(details.getFromDate1().getMonth().getValue()),details.getFromDate1().getDayOfMonth());
				         //   LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				            
				             LocalDate prevDate = fromDate1.minusDays(1);
				             System.out.println("PreviousDate:"+prevDate);
				    System.out.println("Date:"+details.getDate());
		            String querySelect1 = ReportsPagingQueries.EMP_SHIFT_WISE__REPORT1;
		             PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
		             preparedStmt1.setString(1, details.getCompanyId());          
		             preparedStmt1.setString(2, details.getDate());		           
		             preparedStmt1.setString(3, details.getShift()); 
		             preparedStmt1.setInt(4, details.getDataCount()); 
		             preparedStmt1.setInt(5, 10); 
		             ResultSet rs = preparedStmt1.executeQuery();
		             while (rs.next()) {
		            
		                    int numberOfRows = rs.getRow();
		                  //  System.out.println("Shift Report Data Table\t :"+numberOfRows);
	                     System.out.println("SHIFT REPORT DATA TABLE \t :"+numberOfRows);
	                     ReportsPagingJSON shiftData = new ReportsPagingJSON();
	                     shiftData.setEmployeeId(rs.getString("EmployeeId"));
	                     shiftData.setName(rs.getString("Name"));
	                     shiftData.setEmployeeType(rs.getString("Type"));
	                     shiftData.setDepartment(rs.getString("Department"));
	                     shiftData.setShift(rs.getString("Shift"));
	                     shiftData.setDate(rs.getString("Date"));
	                     shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
	                     shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId")); 
	                     String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
	                     PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
	                     preparedStmtSupervisor.setString(1, details.getCompanyId());
	                     preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));                     
	                     ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
	                     while (rsSupervisor.next()) {
	                        shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
	                     }
	                     shiftData.setGrade(rs.getString("grade"));
	                     shiftData.setEmpCode(rs.getString("EmpCode"));
	                     System.out.print("BEFORE EMP-ID :\t"+empId);
	                     System.out.println("EMPLOYEID :\t"+shiftData.getEmployeeId()+"\t LOCATION :\t"+shiftData.getCurrentLocation());
	                  
	                     if(!empId.equals(shiftData.getEmployeeId())) {
	                        System.out.println("IN PREV IF LOOP \n" +empId+","+shiftData.getEmployeeId());
	                        String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
	                        PreparedStatement preparedStmtPrevShift = connection.prepareStatement(querySelectPrevShift );
	                        preparedStmtPrevShift.setString(1, details.getCompanyId());
	                        preparedStmtPrevShift.setString(2, prevDate.toString());
	                     //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
	                        preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
	                        ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
	                        //System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
	                        //rsPrevShift2.beforeFirst();
	                        if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
	                           //while (rs.next()) {
	                        //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                           rsPrevShift.beforeFirst();
	                           while (rsPrevShift.next()) {
	                              System.out.println("IN yesterday Date loop \n");
	                              
	                              ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
	                              prevShiftData.setEmployeeId(shiftData.getEmployeeId());
	                              prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
	                              shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
	                              System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
	                              prevShiftList.add(prevShiftData);
	                           }
	                        }
	                        
	                        else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {            
	                           //rs.beforeFirst();
	                           
	                           rsPrevShift.afterLast();
	                           System.out.println("else if loop when data is not in prev date \t :");
	                           String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
	                           PreparedStatement preparedStmtPrevShift4 = connection.prepareStatement(querySelectPrevShift4 );
	                           preparedStmtPrevShift4.setString(1, details.getCompanyId());
	                           preparedStmtPrevShift4.setString(2, details.getFromDate1().toString());
	                        //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
	                           preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
	                           ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
	                           System.out.println("BEFORE NO previous date but there is a data \t :");
	                           if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
	                              System.out.println("NO previous date but there is a data \t :");
	                              //while (rs.next()) {
	                           //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                              rsPrevShift4.beforeFirst();
	                              while(rsPrevShift4.next()) {
	                                 System.out.println("NO previous date but there is a data so select data for shift1\t :");
	                               String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
	                                 PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
	                                 preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());
	                                                   
	                                 ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
	                                 while (rsSupervisorLocation1.next()) {
	                                    shiftData.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation"));
	                                 }
	                                 //System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
	                              }} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {            
	                                 //rs.beforeFirst();
	                                 rsPrevShift4.afterLast();
	                                 System.out.println("NO data at all \t :");
	                                 
	                                 while(rsPrevShift4.next()) {
	                                 
	                                 shiftData.setPreviousLocation("-");
	                                 System.out.println("NO data at all location\t :"+shiftData.getPreviousLocation());
	                                 }
	                              }
	                           
	                        
	                        }
	            
	                        empId=shiftData.getEmployeeId();
	                        details.setPrevShiftList(prevShiftList);
	                        System.out.println("Prev shift list \n"+prevShiftList);
	                  }else {
	                           empId=shiftData.getEmployeeId();
	                           System.out.print("ELSE EMP-ID :\t"+empId);
	                        }
	                     
	                     employeeRetrievelist.add(shiftData);
	                     }
		             details.setDataCount(dataEndCount);
		        	 details.setEmployeeRetrievelist(employeeRetrievelist);
		             
			}
			else {
				
				System.out.println("SHIFT IS 1\n");
				if(details.getDataCount()==0) {
					System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
					String querySelectEmpCount=ReportsPagingQueries.EMP_MAINTENANCE_REPORT_COUNT_Emp;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,details.getCompanyId());
				preparedStmtEmpCount.setString(2,details.getShift());
			//	preparedStmtEmpCount.setString(3,details.getDate());
					  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   empCount=rsEmpCount.getInt("EmpCount");
				       
				       }
				       
				   	details.setTotlaItemCount(empCount);
				}
					String querySelectEmpCount=ReportsPagingQueries.All_Shift;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,details.getCompanyId());
			
					  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
				    	   empcountall.setEmpCount(rsEmpCount.getString("empCount"));
				    	   empcountall.setShiftNo(rsEmpCount.getString("shift"));
				    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
							PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
							preparedStmtEmpCountgr.setString(1,details.getCompanyId());
							preparedStmtEmpCountgr.setString(2,rsEmpCount.getString("shift"));
							  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
						       while(rsEmpCountgr.next())
						       {
						    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
						    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
						    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
						      	   empcountallgr.setShiftNo(rsEmpCount.getString("shift"));
						    	   allShiftGrade.add(empcountallgr);
						    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
						    	  
						       }
				    	   
				    	   allShiftDetails.add(empcountall);
				    	   empCount1=empCount1+Integer.parseInt(rsEmpCount.getString("empCount"));
				       }
				       
				   	details.setTotalItemCount(empCount1);
				   	details.setAllShiftDetails(allShiftDetails);
				    
				LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),(details.getFromDate1().getMonth().getValue()),details.getFromDate1().getDayOfMonth());
		         //   LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
		            
		             LocalDate prevDate = fromDate1.minusDays(1);
		             System.out.println("PreviousDate:"+prevDate);
				 String querySelectEmp = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp1;
                 PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
                 preparedStmtEmp.setString(1, details.getCompanyId());
                 preparedStmtEmp.setString(2, details.getShift());  
                 preparedStmtEmp.setInt(3, details.getDataCount());  
                 preparedStmtEmp.setInt(4, 10);  
                 
                 ResultSet rsEmp = preparedStmtEmp.executeQuery();
              
                 while (rsEmp.next()) {
                    
                    int numberOfRows = rsEmp.getRow();
                    System.out.println("EMPLOYEE TABLE \t :"+numberOfRows);
                    ReportsPagingJSON shiftData1 = new ReportsPagingJSON();
                    shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));
                    
                    shiftData1.setName(rsEmp.getString("Name"));
                    shiftData1.setEmployeeType(rsEmp.getString("Type"));
                    shiftData1.setDepartment(rsEmp.getString("Department"));
                    shiftData1.setShift("1");
                    shiftData1.setDate(details.getDate());
                     String querySelectShiftLocation= ReportsPagingQueries.GET_SHIFT_LOC;
                       PreparedStatement preparedStmtSupervisorLocation = connection.prepareStatement(querySelectShiftLocation);
                       preparedStmtSupervisorLocation.setString(1, details.getCompanyId());
                                         
                       ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
                       while (rsSupervisorLocation.next()) {
                          shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
                       }
                    shiftData1.setShiftSuperVisorId("-"); 
                     String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
                       PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
                       preparedStmtSupervisor.setString(1, details.getCompanyId());
                       preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));                     
                       ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
                       while (rsSupervisor.next()) {
                          shiftData1.setShiftSupervisorName("-");
                       }
                       shiftData1.setGrade(rsEmp.getString("grade"));
                       shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));
                       
                       System.out.print("BEFORE EMP-ID :\t"+empId1);
                       System.out.println("EMPLOYEID :\t"+shiftData1.getEmployeeId()+"\t LOCATION :\t"+shiftData1.getCurrentLocation());
                    
                 
                       if(!empId1.equals(shiftData1.getEmployeeId())) {
                          System.out.println("IN PREV IF LOOP \n" +empId1+","+shiftData1.getEmployeeId());
                          String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
                          PreparedStatement preparedStmtPrevShift2 = connection.prepareStatement(querySelectPrevShift2 );
                          preparedStmtPrevShift2.setString(1, details.getCompanyId());
                          preparedStmtPrevShift2.setString(2, prevDate.toString());
                       //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
                          preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
                          ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
                          //System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
                          //rsPrevShift2.beforeFirst();
                          if(Boolean.valueOf(rsPrevShift2.next()).equals(true)){
                             //while (rs.next()) {
                          //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                             rsPrevShift2.beforeFirst();
                             while (rsPrevShift2.next()) {
                                System.out.println("IN yesterday Date loop \n");
                                
                                ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
                                prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
                                prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
                                shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
                                System.out.println("IN yesterday Date Location \n"+rsPrevShift2.getString("CurrentLocation"));
                                prevShiftList.add(prevShiftData);
                             }
                          }
                          
                          else if(Boolean.valueOf(rsPrevShift2.next()).equals(false)) {            
                             //rs.beforeFirst();
                             
                             rsPrevShift2.afterLast();
                             System.out.println("else if loop when data is not in prev date \t :");
                             String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
                             PreparedStatement preparedStmtPrevShift3 = connection.prepareStatement(querySelectPrevShift3 );
                             preparedStmtPrevShift3.setString(1, details.getCompanyId());
                             preparedStmtPrevShift3.setString(2, details.getFromDate1().toString());
                          //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
                             preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
                             ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
                             System.out.println("BEFORE NO previous date but there is a data \t :");
                             if(Boolean.valueOf(rsPrevShift3.next()).equals(true)){
                                System.out.println("NO previous date but there is a data \t :");
                                //while (rs.next()) {
                             //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                                rsPrevShift3.beforeFirst();
                                while(rsPrevShift3.next()) {
                                   System.out.println("NO previous date but there is a data so select shift1 data\t :");
                                 String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
                                   PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
                                   preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());
                                                     
                                   ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
                                   while (rsSupervisorLocation1.next()) {
                                      shiftData1.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation"));
                                   }
                                   //System.out.println("NO previous date but there is a data Shift1 Value\t :"+rsSupervisorLocation.getString("CurrentLocation"));
                                }
                                
                             } else if(Boolean.valueOf(rsPrevShift3.next()).equals(false)) {            
                                   //rs.beforeFirst();
                                   rsPrevShift3.afterLast();
                                   while(rsPrevShift3.next()) {
                                   System.out.println("NO data at all \t :");
                                   
                                   shiftData1.setPreviousLocation("-");
                                   System.out.println("NO data at all location\t :"+shiftData1.getPreviousLocation());
                                   }
                                }
                             
                          
                          }
                          
               
                          empId1=shiftData1.getEmployeeId();
                          details.setPrevShiftList(prevShiftList);
                          System.out.println("Prev shift list \n"+prevShiftList);
                    }else {
                          empId1=shiftData1.getEmployeeId();
                          
                       }
                    System.out.print("EmployeeId from employee Table:"+empId1);
                       employeeRetrievelist1.add(shiftData1);
                      /// i=i+1;
                 }   

     			details.setDataCount(dataEndCount);
            	 details.setEmployeeRetrievelist(employeeRetrievelist1);  
			}

		}
		else {
			if(details.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectEmpCount=ReportsPagingQueries.EMP_MAINTENANCE_REPORT_COUNT_AllShift;
				PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
				preparedStmtEmpCount.setString(1,details.getCompanyId());
		
				  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
			       while(rsEmpCount.next())
			       {
			    	   empCount=rsEmpCount.getInt("EmpCount");
			       
			       }
			       
			   	details.setTotlaItemCount(empCount);
				
			}
			
			
			System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
			String querySelectEmpCount=ReportsPagingQueries.All_Shift;
			PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
			preparedStmtEmpCount.setString(1,details.getCompanyId());
	
			  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
		       while(rsEmpCount.next())
		       {
		    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
		    	   empcountall.setEmpCount(rsEmpCount.getString("empCount"));
		    	   empcountall.setShiftNo(rsEmpCount.getString("shift"));
		    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
					PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
					preparedStmtEmpCountgr.setString(1,details.getCompanyId());
					preparedStmtEmpCountgr.setString(2,rsEmpCount.getString("shift"));
					  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
				       while(rsEmpCountgr.next())
				       {
				    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
				    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
				    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
				      	   empcountallgr.setShiftNo(rsEmpCount.getString("shift"));
				    	   allShiftGrade.add(empcountallgr);
				    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
				    	  
				       }
		    	   
		    	   allShiftDetails.add(empcountall);
		    	   empCount1=empCount1+Integer.parseInt(rsEmpCount.getString("empCount"));
		       }
		       
		   	details.setTotalItemCount(empCount1);
		   	details.setAllShiftDetails(allShiftDetails);
			

			String querySelect=ReportsPagingQueries.EMP_DATE_WISE_SHIFT__EMP_ID;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,details.getCompanyId());
			//preparedStmt.setString(2,json.getDate());
			preparedStmt.setInt(2, details.getDataCount());
			preparedStmt.setInt(3, 10);
	        ResultSet rsEmp1=preparedStmt.executeQuery();
			       
	 while(rsEmp1.next()) {
	            
	            EmpId=rsEmp1.getString("EmployeeId");
	                  
	            System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
	            
	            System.out.println("Date:"+details.getDate());
	            String querySelect1 = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
	             PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
	             preparedStmt1.setString(1, details.getCompanyId());          
	             preparedStmt1.setString(2, details.getDate());
	             preparedStmt1.setString(3, EmpId);               
	             ResultSet rs = preparedStmt1.executeQuery();
	             //System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
	             LocalDate fromDate1 = LocalDate.of(details.getFromDate1().getYear(),(details.getFromDate1().getMonth().getValue()),details.getFromDate1().getDayOfMonth());
	         //   LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
	            
	             LocalDate prevDate = fromDate1.minusDays(1);
	             System.out.println("PreviousDate:"+prevDate);
	           if(Boolean.valueOf(rs.next()).equals(true)){
	        	   //while (rs.next()) {
	               //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                rs.beforeFirst();
	                  while (rs.next()) {
	                     System.out.println("SHIFT REPORT DATA TABLE \t :");
	                     ReportsPagingJSON shiftData = new ReportsPagingJSON();
	                     shiftData.setEmployeeId(rs.getString("EmployeeId"));
	                     shiftData.setName(rs.getString("Name"));
	                     shiftData.setEmployeeType(rs.getString("Type"));
	                     shiftData.setDepartment(rs.getString("Department"));
	                     shiftData.setShift(rs.getString("Shift"));
	                     shiftData.setDate(rs.getString("Date"));
	                     shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
	                     shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId")); 
	                     String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
	                     PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
	                     preparedStmtSupervisor.setString(1, details.getCompanyId());
	                     preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));                     
	                     ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
	                     while (rsSupervisor.next()) {
	                        shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
	                     }
	                     shiftData.setGrade(rs.getString("grade"));
	                     shiftData.setEmpCode(rs.getString("EmpCode"));
	                     System.out.print("BEFORE EMP-ID :\t"+empId);
	                     System.out.println("EMPLOYEID :\t"+shiftData.getEmployeeId()+"\t LOCATION :\t"+shiftData.getCurrentLocation());
	                  
	                     if(!empId.equals(shiftData.getEmployeeId())) {
	                        System.out.println("IN PREV IF LOOP \n" +empId+","+shiftData.getEmployeeId());
	                        String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
	                        PreparedStatement preparedStmtPrevShift = connection.prepareStatement(querySelectPrevShift );
	                        preparedStmtPrevShift.setString(1, details.getCompanyId());
	                        preparedStmtPrevShift.setString(2, prevDate.toString());
	                     //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
	                        preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
	                        ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
	                        //System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
	                        //rsPrevShift2.beforeFirst();
	                        if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
	                           //while (rs.next()) {
	                        //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                           rsPrevShift.beforeFirst();
	                           while (rsPrevShift.next()) {
	                              System.out.println("IN yesterday Date loop \n");
	                              
	                              ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
	                              prevShiftData.setEmployeeId(shiftData.getEmployeeId());
	                              prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
	                              shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
	                              System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
	                              prevShiftList.add(prevShiftData);
	                           }
	                        }
	                        
	                        else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {            
	                           //rs.beforeFirst();
	                           
	                           rsPrevShift.afterLast();
	                           System.out.println("else if loop when data is not in prev date \t :");
	                           String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
	                           PreparedStatement preparedStmtPrevShift4 = connection.prepareStatement(querySelectPrevShift4 );
	                           preparedStmtPrevShift4.setString(1, details.getCompanyId());
	                           preparedStmtPrevShift4.setString(2, details.getFromDate1().toString());
	                        //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
	                           preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
	                           ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
	                           System.out.println("BEFORE NO previous date but there is a data \t :");
	                           if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
	                              System.out.println("NO previous date but there is a data \t :");
	                              //while (rs.next()) {
	                           //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                              rsPrevShift4.beforeFirst();
	                              while(rsPrevShift4.next()) {
	                                 System.out.println("NO previous date but there is a data so select data for shift1\t :");
	                               String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
	                                 PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
	                                 preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());
	                                                   
	                                 ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
	                                 while (rsSupervisorLocation1.next()) {
	                                    shiftData.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation"));
	                                 }
	                                 //System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
	                              }} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {            
	                                 //rs.beforeFirst();
	                                 rsPrevShift4.afterLast();
	                                 System.out.println("NO data at all \t :");
	                                 
	                                 while(rsPrevShift4.next()) {
	                                 
	                                 shiftData.setPreviousLocation("-");
	                                 System.out.println("NO data at all location\t :"+shiftData.getPreviousLocation());
	                                 }
	                              }
	                           
	                        
	                        }
	                        
	                  /*      while (rsPrevShift.next()) {
	                           System.out.println("IN PREV LOOP \n");
	                           
	                           ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
	                           prevShiftData.setEmployeeId(shiftData.getEmployeeId());
	                           prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
	                           shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
	                           
	                           prevShiftList.add(prevShiftData);
	                        }
	                        */
	                        empId=shiftData.getEmployeeId();
	                        details.setPrevShiftList(prevShiftList);
	                        System.out.println("Prev shift list \n"+prevShiftList);
	                  }else {
	                           empId=shiftData.getEmployeeId();
	                           System.out.print("ELSE EMP-ID :\t"+empId);
	                        }
	                     
	                     employeeRetrievelist.add(shiftData);
	                     }
	                  
	                  //json.setShiftList(shiftList1);
	        	   
	           }
	           else if(Boolean.valueOf(rs.next()).equals(false)){
	        	   rs.afterLast();
	               
	               
	               System.out.println("EMPLOYEE TABLE \t :");
	             String querySelectEmp = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
	                  PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
	                  preparedStmtEmp.setString(1, details.getCompanyId());
	                  preparedStmtEmp.setString(2, EmpId);     
	                  
	                  
	                  ResultSet rsEmp = preparedStmtEmp.executeQuery();
	               
	                  while (rsEmp.next()) {
	                     rsEmp.first();
	                     rsEmp.last();
	                     int numberOfRows = rsEmp.getRow();
	                     System.out.println("EMPLOYEE TABLE \t :"+numberOfRows);
	                     ReportsPagingJSON shiftData1 = new ReportsPagingJSON();
	                     shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));
	                     
	                     shiftData1.setName(rsEmp.getString("Name"));
	                     shiftData1.setEmployeeType(rsEmp.getString("Type"));
	                     shiftData1.setDepartment(rsEmp.getString("Department"));
	                     shiftData1.setShift("1");
	                     shiftData1.setDate(details.getDate());
	                      String querySelectShiftLocation= ReportsPagingQueries.GET_SHIFT_LOC;
	                        PreparedStatement preparedStmtSupervisorLocation = connection.prepareStatement(querySelectShiftLocation);
	                        preparedStmtSupervisorLocation.setString(1, details.getCompanyId());
	                                          
	                        ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
	                        while (rsSupervisorLocation.next()) {
	                           shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
	                        }
	                     shiftData1.setShiftSuperVisorId("-"); 
	                      String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
	                        PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
	                        preparedStmtSupervisor.setString(1, details.getCompanyId());
	                        preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));                     
	                        ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
	                        while (rsSupervisor.next()) {
	                           shiftData1.setShiftSupervisorName("-");
	                        }
	                        shiftData1.setGrade(rsEmp.getString("grade"));
	                        shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));
	                        
	                        System.out.print("BEFORE EMP-ID :\t"+empId1);
	                        System.out.println("EMPLOYEID :\t"+shiftData1.getEmployeeId()+"\t LOCATION :\t"+shiftData1.getCurrentLocation());
	                     
	                  
	                        if(!empId1.equals(shiftData1.getEmployeeId())) {
	                           System.out.println("IN PREV IF LOOP \n" +empId1+","+shiftData1.getEmployeeId());
	                           String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
	                           PreparedStatement preparedStmtPrevShift2 = connection.prepareStatement(querySelectPrevShift2 );
	                           preparedStmtPrevShift2.setString(1, details.getCompanyId());
	                           preparedStmtPrevShift2.setString(2, prevDate.toString());
	                        //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
	                           preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
	                           ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
	                           //System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
	                           //rsPrevShift2.beforeFirst();
	                           if(Boolean.valueOf(rsPrevShift2.next()).equals(true)){
	                              //while (rs.next()) {
	                           //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                              rsPrevShift2.beforeFirst();
	                              while (rsPrevShift2.next()) {
	                                 System.out.println("IN yesterday Date loop \n");
	                                 
	                                 ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
	                                 prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
	                                 prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
	                                 shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
	                                 System.out.println("IN yesterday Date Location \n"+rsPrevShift2.getString("CurrentLocation"));
	                                 prevShiftList.add(prevShiftData);
	                              }
	                           }
	                           
	                           else if(Boolean.valueOf(rsPrevShift2.next()).equals(false)) {            
	                              //rs.beforeFirst();
	                              
	                              rsPrevShift2.afterLast();
	                              System.out.println("else if loop when data is not in prev date \t :");
	                              String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
	                              PreparedStatement preparedStmtPrevShift3 = connection.prepareStatement(querySelectPrevShift3 );
	                              preparedStmtPrevShift3.setString(1, details.getCompanyId());
	                              preparedStmtPrevShift3.setString(2, details.getFromDate1().toString());
	                           //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
	                              preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
	                              ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
	                              System.out.println("BEFORE NO previous date but there is a data \t :");
	                              if(Boolean.valueOf(rsPrevShift3.next()).equals(true)){
	                                 System.out.println("NO previous date but there is a data \t :");
	                                 //while (rs.next()) {
	                              //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
	                                 rsPrevShift3.beforeFirst();
	                                 while(rsPrevShift3.next()) {
	                                    System.out.println("NO previous date but there is a data so select shift1 data\t :");
	                                  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
	                                    PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
	                                    preparedStmtSupervisorLocation1.setString(1, details.getCompanyId());
	                                                      
	                                    ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
	                                    while (rsSupervisorLocation1.next()) {
	                                       shiftData1.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation"));
	                                    }
	                                    //System.out.println("NO previous date but there is a data Shift1 Value\t :"+rsSupervisorLocation.getString("CurrentLocation"));
	                                 }
	                                 
	                              } else if(Boolean.valueOf(rsPrevShift3.next()).equals(false)) {            
	                                    //rs.beforeFirst();
	                                    rsPrevShift3.afterLast();
	                                    while(rsPrevShift3.next()) {
	                                    System.out.println("NO data at all \t :");
	                                    
	                                    shiftData1.setPreviousLocation("-");
	                                    System.out.println("NO data at all location\t :"+shiftData1.getPreviousLocation());
	                                    }
	                                 }
	                              
	                           
	                           }
	                           
	                     /*      while (rsPrevShift.next()) {
	                              System.out.println("IN PREV LOOP \n");
	                              
	                              ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
	                              prevShiftData.setEmployeeId(shiftData.getEmployeeId());
	                              prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
	                              shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
	                              
	                              prevShiftList.add(prevShiftData);
	                           }
	                           */
	                           empId1=shiftData1.getEmployeeId();
	                           details.setPrevShiftList(prevShiftList);
	                           System.out.println("Prev shift list \n"+prevShiftList);
	                     }else {
	                           empId1=shiftData1.getEmployeeId();
	                           
	                        }
	                     System.out.print("EmployeeId from employee Table:"+empId1);
	                        employeeRetrievelist1.add(shiftData1);
	                       /// i=i+1;
	                  }     
	           }
	 }
	 employeeRetrievelist.addAll(employeeRetrievelist1); 
		
	 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
	 System.out.print("ShiftList1 Content:"+employeeRetrievelist1.size());


		//json.setShiftList(shiftList);
	 details.setDataCount(dataEndCount);
	 details.setEmployeeRetrievelist(employeeRetrievelist);
			
		}
		   	
		       connection.close();  
		       } catch (SQLException e)
		       {
		       e.printStackTrace();
		       }
		        
		  finally {
			  DatabaseUtil.closeConnection(connection);
		}


		  return details;
		}
	
	
	/*
	 * FUCNTION FOR GENERATING DATE WISE SHIFT HISTORY REPORT 
	 */
	public static ReportsPagingJSON DateWiseShiftHistoryReport(ReportsPagingJSON json) {
		ArrayList<ReportsPagingJSON> employeeRetrievelist = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> employeeRetrievelist1 = new ArrayList<ReportsPagingJSON>();
		   ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		Connection connection=null;

		int dataEndCount=json.getDataCount()+10;
		        int empCount=0;

		          String empId1="";
		          String empId="";
		          String EmpId="";
		        int empCount1=0;
		try {
		connection =DatabaseUtil.getDBConnection();

		System.out.println("DATA COUNT : \t"+json.getDataCount());
		if(json.getDataCount()==0) {
			System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
			String querySelectEmpCount=ReportsPagingQueries.EMP_DATE_WISE_SHIFT_HISTORY_COUNT;
			PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
			preparedStmtEmpCount.setString(1,json.getCompanyId());
			//preparedStmtEmpCount.setString(2,json.getDate());
			
			  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
		       while(rsEmpCount.next())
		       {
		    	   empCount=rsEmpCount.getInt("EmpCount");
		       
		       }
		       
		   	json.setTotlaItemCount(empCount);
		}
		
		
		
	   	System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
		String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
		PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
		preparedStmtEmpCount1.setString(1,json.getCompanyId());

		  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
	       while(rsEmpCount1.next())
	       {
	    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
	    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
	    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
	    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
				PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
				preparedStmtEmpCountgr.setString(1,json.getCompanyId());
				preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
				  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
			       while(rsEmpCountgr.next())
			       {
			    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
			    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
			    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
			      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
			    	   allShiftGrade.add(empcountallgr);
			    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
			    	  
			       }
	    	   
	    	   allShiftDetails.add(empcountall);
	    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
	       }
	    //	json.setTotlaItemCount(empCount1);
	   	json.setTotalItemCount(empCount1);
	   	json.setAllShiftDetails(allShiftDetails);
		
		
		String querySelect=ReportsPagingQueries.EMP_DATE_WISE_SHIFT__EMP_ID;
		PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
		preparedStmt.setString(1,json.getCompanyId());
		//preparedStmt.setString(2,json.getDate());
		preparedStmt.setInt(2, json.getDataCount());
		preparedStmt.setInt(3, 10);
        ResultSet rsEmp1=preparedStmt.executeQuery();
		       
 while(rsEmp1.next()) {
            
            EmpId=rsEmp1.getString("EmployeeId");
                  
            System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
            
            System.out.println("Date:"+json.getDate());
            String querySelect1 = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
             PreparedStatement preparedStmt1 = connection.prepareStatement(querySelect1);
             preparedStmt1.setString(1, json.getCompanyId());          
             preparedStmt1.setString(2, json.getDate());
             preparedStmt1.setString(3, EmpId);               
             ResultSet rs = preparedStmt1.executeQuery();
             //System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
             LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
         //   LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
            
             LocalDate prevDate = fromDate1.minusDays(1);
             System.out.println("PreviousDate:"+prevDate);
           if(Boolean.valueOf(rs.next()).equals(true)){
        	   //while (rs.next()) {
               //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                rs.beforeFirst();
                  while (rs.next()) {
                     System.out.println("SHIFT REPORT DATA TABLE \t :");
                     ReportsPagingJSON shiftData = new ReportsPagingJSON();
                     shiftData.setEmployeeId(rs.getString("EmployeeId"));
                     shiftData.setName(rs.getString("Name"));
                     shiftData.setEmployeeType(rs.getString("Type"));
                     shiftData.setDepartment(rs.getString("Department"));
                     shiftData.setShift(rs.getString("Shift"));
                     shiftData.setDate(rs.getString("Date"));
                     shiftData.setCurrentLocation(rs.getString("CurrentLocation"));
                     shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId")); 
                     String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
                     PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
                     preparedStmtSupervisor.setString(1, json.getCompanyId());
                     preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));                     
                     ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
                     while (rsSupervisor.next()) {
                        shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
                     }
                     shiftData.setGrade(rs.getString("grade"));
                     shiftData.setEmpCode(rs.getString("EmpCode"));
                     System.out.print("BEFORE EMP-ID :\t"+empId);
                     System.out.println("EMPLOYEID :\t"+shiftData.getEmployeeId()+"\t LOCATION :\t"+shiftData.getCurrentLocation());
                  
                     if(!empId.equals(shiftData.getEmployeeId())) {
                        System.out.println("IN PREV IF LOOP \n" +empId+","+shiftData.getEmployeeId());
                        String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
                        PreparedStatement preparedStmtPrevShift = connection.prepareStatement(querySelectPrevShift );
                        preparedStmtPrevShift.setString(1, json.getCompanyId());
                        preparedStmtPrevShift.setString(2, prevDate.toString());
                     //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
                        preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
                        ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
                        //System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
                        //rsPrevShift2.beforeFirst();
                        if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
                           //while (rs.next()) {
                        //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                           rsPrevShift.beforeFirst();
                           while (rsPrevShift.next()) {
                              System.out.println("IN yesterday Date loop \n");
                              
                              ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
                              prevShiftData.setEmployeeId(shiftData.getEmployeeId());
                              prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
                              shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
                              System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
                              prevShiftList.add(prevShiftData);
                           }
                        }
                        
                        else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {            
                           //rs.beforeFirst();
                           
                           rsPrevShift.afterLast();
                           System.out.println("else if loop when data is not in prev date \t :");
                           String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
                           PreparedStatement preparedStmtPrevShift4 = connection.prepareStatement(querySelectPrevShift4 );
                           preparedStmtPrevShift4.setString(1, json.getCompanyId());
                           preparedStmtPrevShift4.setString(2, json.getFromDate1().toString());
                        //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
                           preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
                           ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
                           System.out.println("BEFORE NO previous date but there is a data \t :");
                           if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
                              System.out.println("NO previous date but there is a data \t :");
                              //while (rs.next()) {
                           //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                              rsPrevShift4.beforeFirst();
                              while(rsPrevShift4.next()) {
                                 System.out.println("NO previous date but there is a data so select data for shift1\t :");
                               String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
                                 PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
                                 preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
                                                   
                                 ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
                                 while (rsSupervisorLocation1.next()) {
                                    shiftData.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation"));
                                 }
                                 //System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
                              }} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {            
                                 //rs.beforeFirst();
                                 rsPrevShift4.afterLast();
                                 System.out.println("NO data at all \t :");
                                 
                                 while(rsPrevShift4.next()) {
                                 
                                 shiftData.setPreviousLocation("-");
                                 System.out.println("NO data at all location\t :"+shiftData.getPreviousLocation());
                                 }
                              }
                           
                        
                        }
                        
                  /*      while (rsPrevShift.next()) {
                           System.out.println("IN PREV LOOP \n");
                           
                           ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
                           prevShiftData.setEmployeeId(shiftData.getEmployeeId());
                           prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
                           shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
                           
                           prevShiftList.add(prevShiftData);
                        }
                        */
                        empId=shiftData.getEmployeeId();
                        json.setPrevShiftList(prevShiftList);
                        System.out.println("Prev shift list \n"+prevShiftList);
                  }else {
                           empId=shiftData.getEmployeeId();
                           System.out.print("ELSE EMP-ID :\t"+empId);
                        }
                     
                     employeeRetrievelist.add(shiftData);
                     }
                  
                  //json.setShiftList(shiftList1);
        	   
           }
           else if(Boolean.valueOf(rs.next()).equals(false)){
        	   rs.afterLast();
               
               
               //System.out.println("EMPLOYEE TABLE \t :"+i);
             String querySelectEmp = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
                  PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
                  preparedStmtEmp.setString(1, json.getCompanyId());
                  preparedStmtEmp.setString(2, EmpId);                     
                  ResultSet rsEmp = preparedStmtEmp.executeQuery();
               
                  while (rsEmp.next()) {
                     rsEmp.first();
                     rsEmp.last();
                     int numberOfRows = rsEmp.getRow();
                     System.out.println("EMPLOYEE TABLE \t :"+numberOfRows);
                     ReportsPagingJSON shiftData1 = new ReportsPagingJSON();
                     shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));
                     
                     shiftData1.setName(rsEmp.getString("Name"));
                     shiftData1.setEmployeeType(rsEmp.getString("Type"));
                     shiftData1.setDepartment(rsEmp.getString("Department"));
                     shiftData1.setShift("1");
                     shiftData1.setDate(json.getDate());
                      String querySelectShiftLocation= ReportsPagingQueries.GET_SHIFT_LOC;
                        PreparedStatement preparedStmtSupervisorLocation = connection.prepareStatement(querySelectShiftLocation);
                        preparedStmtSupervisorLocation.setString(1, json.getCompanyId());
                                          
                        ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
                        while (rsSupervisorLocation.next()) {
                           shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation"));
                        }
                     shiftData1.setShiftSuperVisorId("-"); 
                      String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
                        PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
                        preparedStmtSupervisor.setString(1, json.getCompanyId());
                        preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));                     
                        ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
                        while (rsSupervisor.next()) {
                           shiftData1.setShiftSupervisorName("-");
                        }
                        shiftData1.setGrade(rsEmp.getString("grade"));
                        shiftData1.setEmpCode(rsEmp.getString("EmployeeCode"));
                        
                        System.out.print("BEFORE EMP-ID :\t"+empId1);
                        System.out.println("EMPLOYEID :\t"+shiftData1.getEmployeeId()+"\t LOCATION :\t"+shiftData1.getCurrentLocation());
                     
                  
                        if(!empId1.equals(shiftData1.getEmployeeId())) {
                           System.out.println("IN PREV IF LOOP \n" +empId1+","+shiftData1.getEmployeeId());
                           String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
                           PreparedStatement preparedStmtPrevShift2 = connection.prepareStatement(querySelectPrevShift2 );
                           preparedStmtPrevShift2.setString(1, json.getCompanyId());
                           preparedStmtPrevShift2.setString(2, prevDate.toString());
                        //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
                           preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
                           ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
                           //System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
                           //rsPrevShift2.beforeFirst();
                           if(Boolean.valueOf(rsPrevShift2.next()).equals(true)){
                              //while (rs.next()) {
                           //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                              rsPrevShift2.beforeFirst();
                              while (rsPrevShift2.next()) {
                                 System.out.println("IN yesterday Date loop \n");
                                 
                                 ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
                                 prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
                                 prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
                                 shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation"));
                                 System.out.println("IN yesterday Date Location \n"+rsPrevShift2.getString("CurrentLocation"));
                                 prevShiftList.add(prevShiftData);
                              }
                           }
                           
                           else if(Boolean.valueOf(rsPrevShift2.next()).equals(false)) {            
                              //rs.beforeFirst();
                              
                              rsPrevShift2.afterLast();
                              System.out.println("else if loop when data is not in prev date \t :");
                              String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
                              PreparedStatement preparedStmtPrevShift3 = connection.prepareStatement(querySelectPrevShift3 );
                              preparedStmtPrevShift3.setString(1, json.getCompanyId());
                              preparedStmtPrevShift3.setString(2, json.getFromDate1().toString());
                           //   preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
                              preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
                              ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
                              System.out.println("BEFORE NO previous date but there is a data \t :");
                              if(Boolean.valueOf(rsPrevShift3.next()).equals(true)){
                                 System.out.println("NO previous date but there is a data \t :");
                                 //while (rs.next()) {
                              //   System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
                                 rsPrevShift3.beforeFirst();
                                 while(rsPrevShift3.next()) {
                                    System.out.println("NO previous date but there is a data so select shift1 data\t :");
                                  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
                                    PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
                                    preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
                                                      
                                    ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
                                    while (rsSupervisorLocation1.next()) {
                                       shiftData1.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation"));
                                    }
                                    //System.out.println("NO previous date but there is a data Shift1 Value\t :"+rsSupervisorLocation.getString("CurrentLocation"));
                                 }
                                 
                              } else if(Boolean.valueOf(rsPrevShift3.next()).equals(false)) {            
                                    //rs.beforeFirst();
                                    rsPrevShift3.afterLast();
                                    while(rsPrevShift3.next()) {
                                    System.out.println("NO data at all \t :");
                                    
                                    shiftData1.setPreviousLocation("-");
                                    System.out.println("NO data at all location\t :"+shiftData1.getPreviousLocation());
                                    }
                                 }
                              
                           
                           }
                           
                     /*      while (rsPrevShift.next()) {
                              System.out.println("IN PREV LOOP \n");
                              
                              ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
                              prevShiftData.setEmployeeId(shiftData.getEmployeeId());
                              prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
                              shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation"));
                              
                              prevShiftList.add(prevShiftData);
                           }
                           */
                           empId1=shiftData1.getEmployeeId();
                           json.setPrevShiftList(prevShiftList);
                           System.out.println("Prev shift list \n"+prevShiftList);
                     }else {
                           empId1=shiftData1.getEmployeeId();
                           
                        }
                     System.out.print("EmployeeId from employee Table:"+empId1);
                        employeeRetrievelist1.add(shiftData1);
                       /// i=i+1;
                  }     
           }
 }
 employeeRetrievelist.addAll(employeeRetrievelist1); 
	
 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
 System.out.print("ShiftList1 Content:"+employeeRetrievelist1.size());


	//json.setShiftList(shiftList);
		       json.setDataCount(dataEndCount);
		       json.setEmployeeRetrievelist(employeeRetrievelist);
		   	
		       connection.close();  
		       } catch (SQLException e)
		       {
		       e.printStackTrace();
		       }
		        
		  finally {
			  DatabaseUtil.closeConnection(connection);
		}


		  return json;
	}
	
	
	/*
	 * FUNCTION FOR GENERATING PERIOD WISE SHIFT HISTORY REPORT
	 */

	
	public static ReportsPagingJSON VacancyReport(ReportsPagingJSON json) {
		Connection connection = null;
	
		ArrayList<ReportsPagingJSON> vacancyReportlist =new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		String empId="";
	     int empCount=0;  int empCount1=0;

			int dataEndCount=json.getDataCount()+10;
			 int i=1;
			 String empId1="";
			
		try {		
						
			connection = DatabaseUtil.getDBConnection();			
			 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
			 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
			
			 LocalDate prevDate = fromDate1.minusDays(1);
			System.out.println("DATA COUNT : \t"+json.getDataCount());
			if(json.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectEmpCount=ReportsPagingQueries.VACENCY_EMP_COUNT;
				PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
				preparedStmtEmpCount.setString(1,json.getCompanyId());
				preparedStmtEmpCount.setString(2,toDate1.toString());
			
				
				  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
			       while(rsEmpCount.next())
			       {
			    	   empCount=rsEmpCount.getInt("EmpCount");
			       
			       }
			       
			   	json.setTotlaItemCount(empCount);
			   	
				
			}
	
			
			
			String EmpId;
			
			String querySelectEmpId=ReportsPagingQueries.EMP_VACENCY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1,json.getCompanyId());
			preparedStmtEmpId.setString(2,toDate1.toString());
			preparedStmtEmpId.setInt(3, json.getDataCount());
			preparedStmtEmpId.setInt(4, 10);
			ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
			while(rsEmpId.next()) {
				
				EmpId=rsEmpId.getString("EmployeeId");
						
				System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
		
				
		
				
			
				 System.out.println("PreviousDate:"+prevDate);
				// for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
			//	{
				   
				    /*String querySelect = ReportsPagingQueries.EMP_VACENCY_REPORT1;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getCompanyId());				
					preparedStmt.setString(2, toDate1.toString());
					preparedStmt.setString(3, EmpId);	
					//preparedStmt.setInt(4, json.getDataCount());
					//preparedStmt.setInt(5, 10);
					ResultSet rs = preparedStmt.executeQuery();
				
				 if(Boolean.valueOf(rs.next()).equals(true)){
					
					}*/
			//	 else if(Boolean.valueOf(rs.next()).equals(false)) {			
					
			//		rs.afterLast();
					String querySelectEmp = ReportsPagingQueries.EMP_VACANCY_REPORT_Emp;
							PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
							preparedStmtEmp.setString(1, json.getCompanyId());
							preparedStmtEmp.setString(2, EmpId);		
							//preparedStmtEmp.setInt(3, json.getDataCount());
							//preparedStmtEmp.setInt(4, 10);
							ResultSet rsEmp = preparedStmtEmp.executeQuery();
						
							while (rsEmp.next()) {
								rsEmp.first();
								rsEmp.last();
								int numberOfRows = rsEmp.getRow();
								System.out.println("EMPLOYEE TABLE \t :"+i+','+numberOfRows);
								ReportsPagingJSON employeeRetrieveobj1 = new ReportsPagingJSON();
								employeeRetrieveobj1.setEmployeeId(rsEmp.getString("EmployeeId"));
								
								employeeRetrieveobj1.setName(rsEmp.getString("Name"));
								employeeRetrieveobj1.setEmployeeType(rsEmp.getString("Type"));
								employeeRetrieveobj1.setDepartment(rsEmp.getString("Department"));
								employeeRetrieveobj1.setShift("1");
								employeeRetrieveobj1.setDate(toDate1.toString());
								  String querySelectShiftLocation= ReportsPagingQueries.GET_SHIFT_LOC;
									PreparedStatement preparedStmtSupervisorLocation = connection.prepareStatement(querySelectShiftLocation);
									preparedStmtSupervisorLocation.setString(1, json.getCompanyId());
															
									ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
									while (rsSupervisorLocation.next()) {
										employeeRetrieveobj1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation")); 
									}
									employeeRetrieveobj1.setShiftSuperVisorId("-");   
								  String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
									PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
									preparedStmtSupervisor.setString(1, json.getCompanyId());
									preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));							
									ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
									while (rsSupervisor.next()) {
										employeeRetrieveobj1.setShiftSupervisorName("-");
									}
									employeeRetrieveobj1.setGrade(rsEmp.getString("grade")); 
									employeeRetrieveobj1.setEmpCode(rsEmp.getString("EmployeeCode")); 
								//	if(rsEmp.getString("EmployeeCode").equals(" ") || rsEmp.getString("EmployeeCode").equals("NUll"))
									
										
										System.out.print("BEFORE EMP-ID :\t"+empId1);
									System.out.println("EMPLOYEID :\t"+employeeRetrieveobj1.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj1.getCurrentLocation());
								
							
									if(!empId1.equals(employeeRetrieveobj1.getEmployeeId())) {
										System.out.println("IN PREV  IF LOOP \n" +empId1+","+employeeRetrieveobj1.getEmployeeId());
										String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
										PreparedStatement preparedStmtPrevShift2  = connection.prepareStatement(querySelectPrevShift2 );
										preparedStmtPrevShift2.setString(1, json.getCompanyId());
										preparedStmtPrevShift2.setString(2, prevDate.toString());
										preparedStmtPrevShift2.setString(3, employeeRetrieveobj1.getEmployeeId());
										ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
										if(Boolean.valueOf(rsPrevShift2.next()).equals(true)){
										rsPrevShift2.beforeFirst();
											while (rsPrevShift2.next()) {
												System.out.println("IN yesterday Date loop \n");
												
												ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
												prevShiftData.setEmployeeId(employeeRetrieveobj1.getEmployeeId());
												prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
												employeeRetrieveobj1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation")); 
												System.out.println("IN yesterday Date Location \n"+rsPrevShift2.getString("CurrentLocation"));
												prevShiftList.add(prevShiftData);
											}
										} 
										
										else if(Boolean.valueOf(rsPrevShift2.next()).equals(false)) {				
											rsPrevShift2.afterLast();
											System.out.println("else if loop when data is not in prev date \t :");
											String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
											PreparedStatement preparedStmtPrevShift3  = connection.prepareStatement(querySelectPrevShift3 );
											preparedStmtPrevShift3.setString(1, json.getCompanyId());
											preparedStmtPrevShift3.setString(2, json.getFromDate());
											preparedStmtPrevShift3.setString(3, employeeRetrieveobj1.getEmployeeId());
											ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
											System.out.println("BEFORE NO previous date but there is a data \t :");
											if(Boolean.valueOf(rsPrevShift3.next()).equals(true)){
												System.out.println("NO previous date but there is a data \t :");
												rsPrevShift3.beforeFirst();
												while(rsPrevShift3.next()) {
													System.out.println("NO previous date but there is a data so select shift1 data\t :");
												  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
													PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
													preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																			
													ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
													while (rsSupervisorLocation1.next()) {
														employeeRetrieveobj1.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
													}
														}
												
											} else if(Boolean.valueOf(rsPrevShift3.next()).equals(false)) {				
												
													rsPrevShift3.afterLast();
													while(rsPrevShift3.next()) {
													System.out.println("NO data at all \t :");
													
													employeeRetrieveobj1.setPreviousLocation("-"); 
													System.out.println("NO data at all location\t :"+employeeRetrieveobj1.getPreviousLocation());
													}
												}
											
										
										}
										
							
										empId1=employeeRetrieveobj1.getEmployeeId();
										json.setPrevShiftList(prevShiftList);
										System.out.println("Prev shift list \n"+prevShiftList);

								}else {
										empId1=employeeRetrieveobj1.getEmployeeId();
										
									}
								System.out.print("EmployeeId from employee Table:"+empId1);
							
								vacancyReportlist.add(employeeRetrieveobj1);
									i=i+1;
									
							}
							//}
				// }
				 }			
				json.setVacancyReportlist(vacancyReportlist);
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;		
		
	}
	
	
	
	/*
	 * FUNCTION FOR GENERATING SHIFT HISTORY REPORT
	 */
	public static ReportsPagingJSON MonthlyShiftHistoryReport(ReportsPagingJSON json) {
		Connection connection = null;
		ArrayList<ReportsPagingJSON> shiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> shiftList1 = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		String empId="";
	     int empCount=0;  int empCount1=0;

			int dataEndCount=json.getDataCount()+3;
			 int i=1;
			 String empId1="";
			
		try {
			
						
			connection = DatabaseUtil.getDBConnection();			

			System.out.println("DATA COUNT : \t"+json.getDataCount());
			if(json.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectEmpCount=ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_COUNT;
				PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
				preparedStmtEmpCount.setString(1,json.getCompanyId());
			
				
				  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
			       while(rsEmpCount.next())
			       {
			    	   empCount=rsEmpCount.getInt("EmpCount");
			       
			       }
			       
			   	json.setTotlaItemCount(empCount);
			   	
				
			}
		   	
		
			String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
			PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
			preparedStmtEmpCount1.setString(1,json.getCompanyId());

			  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
		       while(rsEmpCount1.next())
		       {
		    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
		    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
		    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
		    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
					PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
					preparedStmtEmpCountgr.setString(1,json.getCompanyId());
					preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
					  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
				       while(rsEmpCountgr.next())
				       {
				    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
				    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
				    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
				      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
				    	   allShiftGrade.add(empcountallgr);
				    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
				    	  
				       }
		    	   
		    	   allShiftDetails.add(empcountall);
		    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
		       }
		    	//json.setTotlaItemCount(empCount1);
		   	json.setTotalItemCount(empCount1);
		   	json.setAllShiftDetails(allShiftDetails);
			
			
			String EmpId;
			
			String querySelectEmpId=ReportsPagingQueries.EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1,json.getCompanyId());
			preparedStmtEmpId.setInt(2, json.getDataCount());
			preparedStmtEmpId.setInt(3, 3);
			ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
			while(rsEmpId.next()) {
				
				EmpId=rsEmpId.getString("EmployeeId");
						
				System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
		
				
		
				
				 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
				 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				
				 LocalDate prevDate = fromDate1.minusDays(1);
				 System.out.println("PreviousDate:"+prevDate);
				 for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
				{
				    System.out.println("Date:"+date);
				    String querySelect = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getCompanyId());
					//preparedStmt.setString(2, json.getMonth());
					//preparedStmt.setString(3, json.getYear());
					preparedStmt.setString(2, date.toString());
					preparedStmt.setString(3, EmpId);					
					ResultSet rs = preparedStmt.executeQuery();
					//System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
					
				 if(Boolean.valueOf(rs.next()).equals(true)){
						//while (rs.next()) {
					//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
					 rs.beforeFirst();
						while (rs.next()) {
							System.out.println("SHIFT REPORT DATA TABLE \t :");
							ReportsPagingJSON shiftData = new ReportsPagingJSON();
							shiftData.setEmployeeId(rs.getString("EmployeeId"));
							shiftData.setName(rs.getString("Name"));
							shiftData.setEmployeeType(rs.getString("Type"));
							shiftData.setDepartment(rs.getString("Department"));
							shiftData.setShift(rs.getString("Shift"));
							shiftData.setDate(rs.getString("Date"));
							shiftData.setCurrentLocation(rs.getString("CurrentLocation")); 
							shiftData.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));   
							String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, json.getCompanyId());
							preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
							}
							shiftData.setGrade(rs.getString("grade")); 
							shiftData.setEmpCode(rs.getString("EmpCode")); 
							System.out.print("BEFORE EMP-ID :\t"+empId);
							System.out.println("EMPLOYEID :\t"+shiftData.getEmployeeId()+"\t LOCATION :\t"+shiftData.getCurrentLocation());
						
							if(!empId.equals(shiftData.getEmployeeId())) {
								System.out.println("IN PREV  IF LOOP \n" +empId+","+shiftData.getEmployeeId());
								String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
								preparedStmtPrevShift.setString(1, json.getCompanyId());
								preparedStmtPrevShift.setString(2, prevDate.toString());
							//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift.setString(3, shiftData.getEmployeeId());
								ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
								//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
								//rsPrevShift2.beforeFirst();
								if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
									//while (rs.next()) {
								//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
									rsPrevShift.beforeFirst();
									while (rsPrevShift.next()) {
										System.out.println("IN yesterday Date loop \n");
										
										ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
										prevShiftData.setEmployeeId(shiftData.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
										shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
										System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								} 
								
								else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {				
									//rs.beforeFirst();
									
									rsPrevShift.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift4  = connection.prepareStatement(querySelectPrevShift4 );
									preparedStmtPrevShift4.setString(1, json.getCompanyId());
									preparedStmtPrevShift4.setString(2, json.getFromDate());
								//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift4.setString(3, shiftData.getEmployeeId());
									ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
										System.out.println("NO previous date but there is a data \t :");
										//while (rs.next()) {
									//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
										rsPrevShift4.beforeFirst();
										while(rsPrevShift4.next()) {
											System.out.println("NO previous date but there is a data so select data for shift1\t :");
										  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																	
											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
											while (rsSupervisorLocation1.next()) {
												shiftData.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
											}
											//System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
										}} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {				
											//rs.beforeFirst();
											rsPrevShift4.afterLast();
											System.out.println("NO data at all \t :");
											
											while(rsPrevShift4.next()) {
											
											shiftData.setPreviousLocation("-"); 
											System.out.println("NO data at all location\t :"+shiftData.getPreviousLocation());
											}
										}
									
								
								}
								
						/*		while (rsPrevShift.next()) {
									System.out.println("IN PREV LOOP \n");
									
									ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
									prevShiftData.setEmployeeId(shiftData.getEmployeeId());
									prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
									shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
									
									prevShiftList.add(prevShiftData);
								}
								*/
								empId=shiftData.getEmployeeId();
								json.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n"+prevShiftList);

						}else {
									empId=shiftData.getEmployeeId();
									System.out.print("ELSE EMP-ID :\t"+empId);
								}
							
								shiftList.add(shiftData);
							}
						
						//json.setShiftList(shiftList1);
					}
				 else if(Boolean.valueOf(rs.next()).equals(false)) {				
					//rs.beforeFirst();
					
					rs.afterLast();
					
					 
						//System.out.println("EMPLOYEE TABLE \t :"+i);
					  String querySelectEmp = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
							PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
							preparedStmtEmp.setString(1, json.getCompanyId());
							preparedStmtEmp.setString(2, EmpId);							
							ResultSet rsEmp = preparedStmtEmp.executeQuery();
						
							while (rsEmp.next()) {
								rsEmp.first();
								rsEmp.last();
								int numberOfRows = rsEmp.getRow();
								System.out.println("EMPLOYEE TABLE \t :"+i+','+numberOfRows);
								ReportsPagingJSON shiftData1 = new ReportsPagingJSON();
								shiftData1.setEmployeeId(rsEmp.getString("EmployeeId"));
								
								shiftData1.setName(rsEmp.getString("Name"));
								shiftData1.setEmployeeType(rsEmp.getString("Type"));
								shiftData1.setDepartment(rsEmp.getString("Department"));
								shiftData1.setShift("1");
								shiftData1.setDate(date.toString());
								  String querySelectShiftLocation= ReportsPagingQueries.GET_SHIFT_LOC;
									PreparedStatement preparedStmtSupervisorLocation = connection.prepareStatement(querySelectShiftLocation);
									preparedStmtSupervisorLocation.setString(1, json.getCompanyId());
															
									ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
									while (rsSupervisorLocation.next()) {
										shiftData1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation")); 
									}
								shiftData1.setShiftSuperVisorId("-");   
								  String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
									PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
									preparedStmtSupervisor.setString(1, json.getCompanyId());
									preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));							
									ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
									while (rsSupervisor.next()) {
										shiftData1.setShiftSupervisorName("-");
									}
									shiftData1.setGrade(rsEmp.getString("grade")); 
									shiftData1.setEmpCode(rsEmp.getString("EmployeeCode")); 
									
									System.out.print("BEFORE EMP-ID :\t"+empId1);
									System.out.println("EMPLOYEID :\t"+shiftData1.getEmployeeId()+"\t LOCATION :\t"+shiftData1.getCurrentLocation());
								
							
									if(!empId1.equals(shiftData1.getEmployeeId())) {
										System.out.println("IN PREV  IF LOOP \n" +empId1+","+shiftData1.getEmployeeId());
										String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
										PreparedStatement preparedStmtPrevShift2  = connection.prepareStatement(querySelectPrevShift2 );
										preparedStmtPrevShift2.setString(1, json.getCompanyId());
										preparedStmtPrevShift2.setString(2, prevDate.toString());
									//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift2.setString(3, shiftData1.getEmployeeId());
										ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
										//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
										//rsPrevShift2.beforeFirst();
										if(Boolean.valueOf(rsPrevShift2.next()).equals(true)){
											//while (rs.next()) {
										//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
											rsPrevShift2.beforeFirst();
											while (rsPrevShift2.next()) {
												System.out.println("IN yesterday Date loop \n");
												
												ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
												prevShiftData.setEmployeeId(shiftData1.getEmployeeId());
												prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
												shiftData1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation")); 
												System.out.println("IN yesterday Date Location \n"+rsPrevShift2.getString("CurrentLocation"));
												prevShiftList.add(prevShiftData);
											}
										} 
										
										else if(Boolean.valueOf(rsPrevShift2.next()).equals(false)) {				
											//rs.beforeFirst();
											
											rsPrevShift2.afterLast();
											System.out.println("else if loop when data is not in prev date \t :");
											String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
											PreparedStatement preparedStmtPrevShift3  = connection.prepareStatement(querySelectPrevShift3 );
											preparedStmtPrevShift3.setString(1, json.getCompanyId());
											preparedStmtPrevShift3.setString(2, json.getFromDate());
										//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
											preparedStmtPrevShift3.setString(3, shiftData1.getEmployeeId());
											ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
											System.out.println("BEFORE NO previous date but there is a data \t :");
											if(Boolean.valueOf(rsPrevShift3.next()).equals(true)){
												System.out.println("NO previous date but there is a data \t :");
												//while (rs.next()) {
											//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
												rsPrevShift3.beforeFirst();
												while(rsPrevShift3.next()) {
													System.out.println("NO previous date but there is a data so select shift1 data\t :");
												  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
													PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
													preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																			
													ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
													while (rsSupervisorLocation1.next()) {
														shiftData1.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
													}
													//System.out.println("NO previous date but there is a data Shift1 Value\t :"+rsSupervisorLocation.getString("CurrentLocation"));
												}
												
											} else if(Boolean.valueOf(rsPrevShift3.next()).equals(false)) {				
													//rs.beforeFirst();
													rsPrevShift3.afterLast();
													while(rsPrevShift3.next()) {
													System.out.println("NO data at all \t :");
													
													shiftData1.setPreviousLocation("-"); 
													System.out.println("NO data at all location\t :"+shiftData1.getPreviousLocation());
													}
												}
											
										
										}
										
								/*		while (rsPrevShift.next()) {
											System.out.println("IN PREV LOOP \n");
											
											ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
											prevShiftData.setEmployeeId(shiftData.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
											
											prevShiftList.add(prevShiftData);
										}
										*/
										empId1=shiftData1.getEmployeeId();
										json.setPrevShiftList(prevShiftList);
										System.out.println("Prev shift list \n"+prevShiftList);

								}else {
										empId1=shiftData1.getEmployeeId();
										
									}
								System.out.print("EmployeeId from employee Table:"+empId1);
									shiftList1.add(shiftData1);
									i=i+1;
									
							}
					
							
							
					}
					
				

						
				}
				 
			/*	 String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
					PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
					preparedStmtPrevShift.setString(1, json.getCompanyId());
					preparedStmtPrevShift.setString(2, json.getFromDate());
					preparedStmtPrevShift.setString(3, shiftList.get(6).toString());
					preparedStmtPrevShift.setString(4,EmpId);
					ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
				
					while (rsPrevShift.next()) {
					
						
						ReportsPagingJSON shiftData1 = new ReportsPagingJSON();
						
						shiftData1.setDBPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
						
					}*/
					
					
				 
			
			}
			
			
			 shiftList.addAll(shiftList1); 
			
			 System.out.print("ShiftList Content:"+shiftList.size());
			 System.out.print("ShiftList1 Content:"+shiftList1.size());
		
			
				json.setShiftList(shiftList);
			
			
	
				
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
	}




	/*
	 * FUNCTION FOR SELECTING TOTAL NO.OF SHIFTS
	 */

	public static List<ReportsPagingJSON> SelectTotalNoOfShift(ReportsPagingJSON config) {
		Connection connection = null;
		List<ReportsPagingJSON> totalShift = new ArrayList<ReportsPagingJSON>();
		
		
		try {
			connection = DatabaseUtil.getDBConnection();
			String querySelect = ReportsPagingQueries.Select_Shift;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, config.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				ReportsPagingJSON shiftData =new ReportsPagingJSON();
				shiftData.setShift(rs.getString("ShiftType"));
				shiftData.setSiteName(rs.getString("SiteName"));
				shiftData.setArea(rs.getString("Area"));
				shiftData.setLocation(rs.getString("Location"));
				

				totalShift.add(shiftData);

			}
			
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return totalShift;

	}

	public static ReportsPagingJSON PeriodWiseShiftHistoryReport(ReportsPagingJSON json) {
		Connection connection = null;
		ArrayList<ReportsPagingJSON> employeeRetrievelist = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> employeeRetrievelist1 = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> vacancyReportlist =new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		String empId="";
	     int empCount=0;  int empCount1=0;

			int dataEndCount=json.getDataCount()+3;
			 int i=1;
			 String empId1="";
			
		try {
			
						
			connection = DatabaseUtil.getDBConnection();			

			System.out.println("DATA COUNT : \t"+json.getDataCount());
			if(json.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectEmpCount=ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_COUNT;
				PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
				preparedStmtEmpCount.setString(1,json.getCompanyId());
			
				
				  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
			       while(rsEmpCount.next())
			       {
			    	   empCount=rsEmpCount.getInt("EmpCount");
			       
			       }
			       
			   	json.setTotlaItemCount(empCount);
			   	
				
			}
		   	
		
			String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
			PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
			preparedStmtEmpCount1.setString(1,json.getCompanyId());

			  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
		       while(rsEmpCount1.next())
		       {
		    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
		    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
		    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
		    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
					PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
					preparedStmtEmpCountgr.setString(1,json.getCompanyId());
					preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
					  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
				       while(rsEmpCountgr.next())
				       {
				    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
				    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
				    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
				      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
				    	   allShiftGrade.add(empcountallgr);
				    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
				    	  
				       }
		    	   
		    	   allShiftDetails.add(empcountall);
		    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
		       }
		    	//json.setTotlaItemCount(empCount1);
		   	json.setTotalItemCount(empCount1);
		   	json.setAllShiftDetails(allShiftDetails);
			
			
			String EmpId;
			
			String querySelectEmpId=ReportsPagingQueries.EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID;
			PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
			preparedStmtEmpId.setString(1,json.getCompanyId());
			preparedStmtEmpId.setInt(2, json.getDataCount());
			preparedStmtEmpId.setInt(3, 3);
			ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
			while(rsEmpId.next()) {
				
				EmpId=rsEmpId.getString("EmployeeId");
						
				System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
		
				
		
				
				 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
				 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				
				 LocalDate prevDate = fromDate1.minusDays(1);
				 System.out.println("PreviousDate:"+prevDate);
				 for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
				{
				    System.out.println("Date:"+date);
				    String querySelect = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1;
					PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
					preparedStmt.setString(1, json.getCompanyId());
					//preparedStmt.setString(2, json.getMonth());
					//preparedStmt.setString(3, json.getYear());
					preparedStmt.setString(2, date.toString());
					preparedStmt.setString(3, EmpId);					
					ResultSet rs = preparedStmt.executeQuery();
					//System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
					
				 if(Boolean.valueOf(rs.next()).equals(true)){
						//while (rs.next()) {
					//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
					 rs.beforeFirst();
						while (rs.next()) {
							System.out.println("SHIFT REPORT DATA TABLE \t :");
							ReportsPagingJSON employeeRetrieveobj = new ReportsPagingJSON();
							employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
							employeeRetrieveobj.setName(rs.getString("Name"));
							employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
							employeeRetrieveobj.setDepartment(rs.getString("Department"));
							employeeRetrieveobj.setShift(rs.getString("Shift"));
							employeeRetrieveobj.setDate(rs.getString("Date"));
							employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation")); 
							employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));   
							String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
							PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
							preparedStmtSupervisor.setString(1, json.getCompanyId());
							preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
							ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
							while (rsSupervisor.next()) {
								employeeRetrieveobj.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
							}
							employeeRetrieveobj.setGrade(rs.getString("grade")); 
							employeeRetrieveobj.setEmpCode(rs.getString("EmpCode")); 
							System.out.print("BEFORE EMP-ID :\t"+empId);
							System.out.println("EMPLOYEID :\t"+employeeRetrieveobj.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj.getCurrentLocation());
						
							if(!empId.equals(employeeRetrieveobj.getEmployeeId())) {
								System.out.println("IN PREV  IF LOOP \n" +empId+","+employeeRetrieveobj.getEmployeeId());
								String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
								PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
								preparedStmtPrevShift.setString(1, json.getCompanyId());
								preparedStmtPrevShift.setString(2, prevDate.toString());
							//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
								preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
								ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
								//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
								//rsPrevShift2.beforeFirst();
								if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
									//while (rs.next()) {
								//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
									rsPrevShift.beforeFirst();
									while (rsPrevShift.next()) {
										System.out.println("IN yesterday Date loop \n");
										
										ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
										prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
										prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
										employeeRetrieveobj.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
										System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
										prevShiftList.add(prevShiftData);
									}
								} 
								
								else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {				
									//rs.beforeFirst();
									
									rsPrevShift.afterLast();
									System.out.println("else if loop when data is not in prev date \t :");
									String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
									PreparedStatement preparedStmtPrevShift4  = connection.prepareStatement(querySelectPrevShift4 );
									preparedStmtPrevShift4.setString(1, json.getCompanyId());
									preparedStmtPrevShift4.setString(2, json.getFromDate());
								//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
									System.out.println("BEFORE NO previous date but there is a data \t :");
									if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
										System.out.println("NO previous date but there is a data \t :");
										//while (rs.next()) {
									//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
										rsPrevShift4.beforeFirst();
										while(rsPrevShift4.next()) {
											System.out.println("NO previous date but there is a data so select data for shift1\t :");
										  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
											PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
											preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																	
											ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
											while (rsSupervisorLocation1.next()) {
												employeeRetrieveobj.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
											}
											//System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
										}} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {				
											//rs.beforeFirst();
											rsPrevShift4.afterLast();
											System.out.println("NO data at all \t :");
											
											while(rsPrevShift4.next()) {
											
												employeeRetrieveobj.setPreviousLocation("-"); 
											System.out.println("NO data at all location\t :"+employeeRetrieveobj.getPreviousLocation());
											}
										}
									
								
								}
								
						/*		while (rsPrevShift.next()) {
									System.out.println("IN PREV LOOP \n");
									
									ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
									prevShiftData.setEmployeeId(shiftData.getEmployeeId());
									prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
									shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
									
									prevShiftList.add(prevShiftData);
								}
								*/
								empId=employeeRetrieveobj.getEmployeeId();
								json.setPrevShiftList(prevShiftList);
								System.out.println("Prev shift list \n"+prevShiftList);

						}else {
									empId=employeeRetrieveobj.getEmployeeId();
									System.out.print("ELSE EMP-ID :\t"+empId);
								}
							
							employeeRetrievelist.add(employeeRetrieveobj);
							}
						
						//json.setShiftList(shiftList1);
					}
				 else if(Boolean.valueOf(rs.next()).equals(false)) {				
					//rs.beforeFirst();
					
					rs.afterLast();
					
					 
						//System.out.println("EMPLOYEE TABLE \t :"+i);
					  String querySelectEmp = ReportsPagingQueries.EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp;
							PreparedStatement preparedStmtEmp = connection.prepareStatement(querySelectEmp);
							preparedStmtEmp.setString(1, json.getCompanyId());
							preparedStmtEmp.setString(2, EmpId);							
							ResultSet rsEmp = preparedStmtEmp.executeQuery();
						
							while (rsEmp.next()) {
								rsEmp.first();
								rsEmp.last();
								int numberOfRows = rsEmp.getRow();
								System.out.println("EMPLOYEE TABLE \t :"+i+','+numberOfRows);
								ReportsPagingJSON employeeRetrieveobj1 = new ReportsPagingJSON();
								employeeRetrieveobj1.setEmployeeId(rsEmp.getString("EmployeeId"));
								
								employeeRetrieveobj1.setName(rsEmp.getString("Name"));
								employeeRetrieveobj1.setEmployeeType(rsEmp.getString("Type"));
								employeeRetrieveobj1.setDepartment(rsEmp.getString("Department"));
								employeeRetrieveobj1.setShift("1");
								employeeRetrieveobj1.setDate(date.toString());
								  String querySelectShiftLocation= ReportsPagingQueries.GET_SHIFT_LOC;
									PreparedStatement preparedStmtSupervisorLocation = connection.prepareStatement(querySelectShiftLocation);
									preparedStmtSupervisorLocation.setString(1, json.getCompanyId());
															
									ResultSet rsSupervisorLocation = preparedStmtSupervisorLocation.executeQuery();
									while (rsSupervisorLocation.next()) {
										employeeRetrieveobj1.setCurrentLocation(rsSupervisorLocation.getString("CurrentLocation")); 
									}
									employeeRetrieveobj1.setShiftSuperVisorId("-");   
								  String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
									PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
									preparedStmtSupervisor.setString(1, json.getCompanyId());
									preparedStmtSupervisor.setString(2, rsEmp.getString("ReportingManagerId"));							
									ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
									while (rsSupervisor.next()) {
										employeeRetrieveobj1.setShiftSupervisorName("-");
									}
									employeeRetrieveobj1.setGrade(rsEmp.getString("grade")); 
									employeeRetrieveobj1.setEmpCode(rsEmp.getString("EmployeeCode")); 
									
									System.out.print("BEFORE EMP-ID :\t"+empId1);
									System.out.println("EMPLOYEID :\t"+employeeRetrieveobj1.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj1.getCurrentLocation());
								
							
									if(!empId1.equals(employeeRetrieveobj1.getEmployeeId())) {
										System.out.println("IN PREV  IF LOOP \n" +empId1+","+employeeRetrieveobj1.getEmployeeId());
										String querySelectPrevShift2 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
										PreparedStatement preparedStmtPrevShift2  = connection.prepareStatement(querySelectPrevShift2 );
										preparedStmtPrevShift2.setString(1, json.getCompanyId());
										preparedStmtPrevShift2.setString(2, prevDate.toString());
									//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift2.setString(3, employeeRetrieveobj1.getEmployeeId());
										ResultSet rsPrevShift2 = preparedStmtPrevShift2.executeQuery();
										//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
										//rsPrevShift2.beforeFirst();
										if(Boolean.valueOf(rsPrevShift2.next()).equals(true)){
											//while (rs.next()) {
										//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
											rsPrevShift2.beforeFirst();
											while (rsPrevShift2.next()) {
												System.out.println("IN yesterday Date loop \n");
												
												ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
												prevShiftData.setEmployeeId(employeeRetrieveobj1.getEmployeeId());
												prevShiftData.setCurrentLocation(rsPrevShift2.getString("CurrentLocation"));
												employeeRetrieveobj1.setPreviousLocation(rsPrevShift2.getString("CurrentLocation")); 
												System.out.println("IN yesterday Date Location \n"+rsPrevShift2.getString("CurrentLocation"));
												prevShiftList.add(prevShiftData);
											}
										} 
										
										else if(Boolean.valueOf(rsPrevShift2.next()).equals(false)) {				
											//rs.beforeFirst();
											
											rsPrevShift2.afterLast();
											System.out.println("else if loop when data is not in prev date \t :");
											String querySelectPrevShift3 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
											PreparedStatement preparedStmtPrevShift3  = connection.prepareStatement(querySelectPrevShift3 );
											preparedStmtPrevShift3.setString(1, json.getCompanyId());
											preparedStmtPrevShift3.setString(2, json.getFromDate());
										//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
											preparedStmtPrevShift3.setString(3, employeeRetrieveobj1.getEmployeeId());
											ResultSet rsPrevShift3 = preparedStmtPrevShift3.executeQuery();
											System.out.println("BEFORE NO previous date but there is a data \t :");
											if(Boolean.valueOf(rsPrevShift3.next()).equals(true)){
												System.out.println("NO previous date but there is a data \t :");
												//while (rs.next()) {
											//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
												rsPrevShift3.beforeFirst();
												while(rsPrevShift3.next()) {
													System.out.println("NO previous date but there is a data so select shift1 data\t :");
												  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
													PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
													preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																			
													ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
													while (rsSupervisorLocation1.next()) {
														employeeRetrieveobj1.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
													}
													//System.out.println("NO previous date but there is a data Shift1 Value\t :"+rsSupervisorLocation.getString("CurrentLocation"));
												}
												
											} else if(Boolean.valueOf(rsPrevShift3.next()).equals(false)) {				
													//rs.beforeFirst();
													rsPrevShift3.afterLast();
													while(rsPrevShift3.next()) {
													System.out.println("NO data at all \t :");
													
													employeeRetrieveobj1.setPreviousLocation("-"); 
													System.out.println("NO data at all location\t :"+employeeRetrieveobj1.getPreviousLocation());
													}
												}
											
										
										}
										
								/*		while (rsPrevShift.next()) {
											System.out.println("IN PREV LOOP \n");
											
											ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
											prevShiftData.setEmployeeId(shiftData.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											shiftData.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
											
											prevShiftList.add(prevShiftData);
										}
										*/
										empId1=employeeRetrieveobj1.getEmployeeId();
										json.setPrevShiftList(prevShiftList);
										System.out.println("Prev shift list \n"+prevShiftList);

								}else {
										empId1=employeeRetrieveobj1.getEmployeeId();
										
									}
								System.out.print("EmployeeId from employee Table:"+empId1);
								employeeRetrievelist1.add(employeeRetrieveobj1);
								vacancyReportlist.add(employeeRetrieveobj1);
									i=i+1;
									
							}
					
							
							
					}
					
				

						
				}
				 
			/*	 String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
					PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
					preparedStmtPrevShift.setString(1, json.getCompanyId());
					preparedStmtPrevShift.setString(2, json.getFromDate());
					preparedStmtPrevShift.setString(3, shiftList.get(6).toString());
					preparedStmtPrevShift.setString(4,EmpId);
					ResultSet rsPrevShift = preparedStmtPrevShift.executeQuery();
				
					while (rsPrevShift.next()) {
					
						
						ReportsPagingJSON shiftData1 = new ReportsPagingJSON();
						
						shiftData1.setDBPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
						
					}*/
					
					
				 
			
			}
			
			
			employeeRetrievelist.addAll(employeeRetrievelist1); 
			
			 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
			 System.out.print("ShiftList1 Content:"+employeeRetrievelist1.size());
		
			
				json.setEmployeeRetrievelist(employeeRetrievelist);
				json.setVacancyReportlist(vacancyReportlist);
			
			
	
				
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
		
		
	}
	
	public static ReportsPagingJSON expiredShiftReport(ReportsPagingJSON json) {
		// TODO Auto-generated method stub
		Connection connection=null;
		int ShiftCount=0;
	
		int dataEndCount=json.getDataCount()+10;
		ArrayList<ReportsPagingJSON> expiredShiftReportList=new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> expiredShiftReportListExcel=new ArrayList<ReportsPagingJSON>();
		try {
			connection=DatabaseUtil.getDBConnection();
			
			System.out.println("DATA COUNT : \t"+json.getDataCount());
			 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
			 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
			
			if(json.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectShiftCount=ReportsPagingQueries.Shift_Count;
				PreparedStatement preparedStmtShiftCount = connection.prepareStatement(querySelectShiftCount);
				preparedStmtShiftCount.setString(1,json.getCompanyId());
				preparedStmtShiftCount.setString(2,fromDate1.toString());
				preparedStmtShiftCount.setString(3,toDate1.toString());
				preparedStmtShiftCount.setString(4,fromDate1.toString());
				preparedStmtShiftCount.setString(5,toDate1.toString());
				
				  ResultSet rsShiftCount=preparedStmtShiftCount.executeQuery();
			       while(rsShiftCount.next())
			       {
			    	   ShiftCount=rsShiftCount.getInt("shiftCount");
			       
			       }
			       
			   	json.setTotlaItemCount(ShiftCount);
			   	
				System.out.println("shiftCount"+ShiftCount);
			}
			
		
			
			
					System.out.println("FromDate \t :"+fromDate1);
					System.out.println("ToDate \t :"+toDate1);
					
				 
			
					 
					 String querySelect=ReportsPagingQueries.select_expired_report;
						PreparedStatement preparestmt=connection.prepareStatement(querySelect);
						preparestmt.setString(1,json.getCompanyId());
						preparestmt.setString(2,fromDate1.toString());
						preparestmt.setString(3,toDate1.toString());
						preparestmt.setString(4,fromDate1.toString());
						preparestmt.setString(5,toDate1.toString());
						preparestmt.setInt(6, json.getDataCount());
						preparestmt.setInt(7, 10);
						
					
						ResultSet rs=preparestmt.executeQuery();
						while(rs.next()) {
							ReportsPagingJSON expiredData=new ReportsPagingJSON();
							expiredData.setShiftType(rs.getString("shiftType"));
							expiredData.setStartDate(rs.getString("startDate"));
							expiredData.setEndDate(rs.getString("endDate"));
							expiredData.setCurrentLocation(rs.getString("CurrentLocation"));
							expiredData.setDescription(rs.getString("Description"));
							expiredShiftReportList.add(expiredData);
						}
						
						
					
			
			
			
			json.setExpiredShiftReportList(expiredShiftReportList);
		
			connection.close();
			
		}catch (SQLException e) {
			e.printStackTrace();
		}finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
	}


	public static ReportsPagingJSON deletedShiftReport(ReportsPagingJSON json) {
		// TODO Auto-generated method stub
	
		int ShiftCount=0;
		
		int dataEndCount=json.getDataCount()+10;
		ArrayList<ReportsPagingJSON> deletedShiftReportList=new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> deletedShiftReportListExcel=new ArrayList<ReportsPagingJSON>();
		Connection connection=null;
		try {
			connection=DatabaseUtil.getDBConnection();
			System.out.println("DATA COUNT : \t"+json.getDataCount());
			 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
			 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
			
			if(json.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectShiftCount=ReportsPagingQueries.Shift_Count_Delete;
				PreparedStatement preparedStmtShiftCount = connection.prepareStatement(querySelectShiftCount);
				preparedStmtShiftCount.setString(1,json.getCompanyId());
				preparedStmtShiftCount.setString(2,fromDate1.toString());
				preparedStmtShiftCount.setString(3,toDate1.toString());
				preparedStmtShiftCount.setString(4,fromDate1.toString());
				preparedStmtShiftCount.setString(5,toDate1.toString());
				
				  ResultSet rsShiftCount=preparedStmtShiftCount.executeQuery();
			       while(rsShiftCount.next())
			       {
			    	   ShiftCount=rsShiftCount.getInt("shiftCount");
			       
			       }
			       
			   	json.setTotlaItemCount(ShiftCount);
			   	
				System.out.println("shiftCount"+ShiftCount);
			}
			
		
			
			
					System.out.println("FromDate \t :"+fromDate1);
					System.out.println("ToDate \t :"+toDate1);
					
				 
			
			String querySelect=ReportsPagingQueries.select_deleted_shift;
			PreparedStatement preparestmnt=connection.prepareStatement(querySelect);
			preparestmnt.setString(1, json.getCompanyId());
			preparestmnt.setString(2,fromDate1.toString());
			preparestmnt.setString(3,toDate1.toString());
			preparestmnt.setString(4,fromDate1.toString());
			preparestmnt.setString(5,toDate1.toString());
			preparestmnt.setInt(6, json.getDataCount());
			preparestmnt.setInt(7, 10);
			ResultSet rs=preparestmnt.executeQuery();
			while(rs.next()) {
				ReportsPagingJSON deletedReport=new ReportsPagingJSON();
				deletedReport.setShiftType(rs.getString("shiftType"));
				deletedReport.setStartDate(rs.getString("startDate"));
				deletedReport.setEndDate(rs.getString("endDate"));
				deletedReport.setStatus(rs.getString("status"));
				deletedReport.setCurrentLocation(rs.getString("CurrentLocation"));
				deletedReport.setDescription(rs.getString("Description"));
				deletedShiftReportList.add(deletedReport);	
			}	
			
		
			json.setDeletedShiftReportList(deletedShiftReportList);
		
			
		connection.close();
		}catch (SQLException e) {
		e.printStackTrace();}
		finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		return json;
	}
	
	/*
	 * FUNCTION FOR SELECTING TOTAL NO.OF SHIFTS
	 */

	public static List<ReportsPagingJSON> selectSupervisorDetails(ReportsPagingJSON config) {
		Connection connection = null;
		List<ReportsPagingJSON> supervisorDetails = new ArrayList<ReportsPagingJSON>();
		
		
		try {
			connection = DatabaseUtil.getDBConnection();
			String querySelect = ReportsPagingQueries.Select_Supervisor_Details;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, config.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {

                int numberOfRows = rs.getRow();
              //  System.out.println("Shift Report Data Table\t :"+numberOfRows);
             System.out.println("Total rows \t :"+numberOfRows);
				ReportsPagingJSON shiftData =new ReportsPagingJSON();
				shiftData.setShiftSuperVisorId(rs.getString("shiftsupervisorid"));
				String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
				PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
				preparedStmtSupervisor.setString(1, config.getCompanyId());
				preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
				ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
				while (rsSupervisor.next()) {
					shiftData.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
				}
			
				

				supervisorDetails.add(shiftData);

			}
			
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return supervisorDetails;

	}


/*	public static ReportsPagingJSON supervisorbasedReport(ReportsPagingJSON json) {
		Connection connection = null;
		ArrayList<ReportsPagingJSON> employeeRetrievelist = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> employeeRetrievelist1 = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> vacancyReportlist =new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		String empId="";
	     int empCount=0;  int empCount1=0;

			int dataEndCount=json.getDataCount()+3;
			 int i=1;
			 String empId1="";
			
		try {
			
						
			connection = DatabaseUtil.getDBConnection();			

			System.out.println("DATA COUNT : \t"+json.getDataCount());
			if(!json.getSupervisor().equals("all"))
			{
				 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
				 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				
	if(json.getDataCount()==0) {
					
					System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
					String querySelectEmpCount=ReportsPagingQueries.EMP_SUPERVISOR_BASED_COUNT;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,json.getCompanyId());
					preparedStmtEmpCount.setString(2,json.getSupervisor());
					preparedStmtEmpCount.setString(3,fromDate1.toString());
					preparedStmtEmpCount.setString(4,toDate1.toString());
				
					
					  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   empCount=rsEmpCount.getInt("EmpCount");
				       
				       }
				       
				   	json.setTotlaItemCount(empCount);
				   	
					
				}
				String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
				PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
				preparedStmtEmpCount1.setString(1,json.getCompanyId());

				  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
			       while(rsEmpCount1.next())
			       {
			    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
			    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
			    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
			    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
						PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
						preparedStmtEmpCountgr.setString(1,json.getCompanyId());
						preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
						  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
					       while(rsEmpCountgr.next())
					       {
					    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
					    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
					    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
					      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
					    	   allShiftGrade.add(empcountallgr);
					    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
					    	  
					       }
			    	   
			    	   allShiftDetails.add(empcountall);
			    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
			       }
			    	//json.setTotlaItemCount(empCount1);
			   	json.setTotalItemCount(empCount1);
			   	json.setAllShiftDetails(allShiftDetails);

				String EmpId;
				
				String querySelectEmpId=ReportsPagingQueries.EMP_SUPERVISOR_BASED_EMP_ID;
				PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
				preparedStmtEmpId.setString(1,json.getCompanyId());
				preparedStmtEmpId.setString(2,json.getSupervisor());
				preparedStmtEmpId.setString(3,fromDate1.toString());
				preparedStmtEmpId.setString(4,toDate1.toString());
				preparedStmtEmpId.setInt(5, json.getDataCount());
				preparedStmtEmpId.setInt(6, 3);
				ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
				while(rsEmpId.next()) {
					
					EmpId=rsEmpId.getString("EmployeeId");
							
					System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
			
					
			
					
				
					 LocalDate prevDate = fromDate1.minusDays(1);
					 System.out.println("PreviousDate:"+prevDate);
					 for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
					{
					    System.out.println("Date:"+date);
					    String querySelect = ReportsPagingQueries.EMP_SUPERVISOR_REPORT;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						//preparedStmt.setString(2, json.getMonth());
						//preparedStmt.setString(3, json.getYear());
						preparedStmt.setString(2, date.toString());
						preparedStmt.setString(3, EmpId);					
						ResultSet rs = preparedStmt.executeQuery();
						//System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
						
					 if(Boolean.valueOf(rs.next()).equals(true)){
							//while (rs.next()) {
						//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
						 rs.beforeFirst();
							while (rs.next()) {
								System.out.println("SHIFT REPORT DATA TABLE \t :");
								ReportsPagingJSON employeeRetrieveobj = new ReportsPagingJSON();
								employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
								employeeRetrieveobj.setName(rs.getString("Name"));
								employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
								employeeRetrieveobj.setDepartment(rs.getString("Department"));
								employeeRetrieveobj.setShift(rs.getString("Shift"));
								employeeRetrieveobj.setDate(rs.getString("Date"));
								employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation")); 
								employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));   
								String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
								PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
								preparedStmtSupervisor.setString(1, json.getCompanyId());
								preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
								ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
								while (rsSupervisor.next()) {
									employeeRetrieveobj.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
								}
								employeeRetrieveobj.setGrade(rs.getString("grade")); 
								employeeRetrieveobj.setEmpCode(rs.getString("EmpCode")); 
								System.out.print("BEFORE EMP-ID :\t"+empId);
								System.out.println("EMPLOYEID :\t"+employeeRetrieveobj.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj.getCurrentLocation());
							
								if(!empId.equals(employeeRetrieveobj.getEmployeeId())) {
									System.out.println("IN PREV  IF LOOP \n" +empId+","+employeeRetrieveobj.getEmployeeId());
									String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
									PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
									preparedStmtPrevShift.setString(1, json.getCompanyId());
									preparedStmtPrevShift.setString(2, prevDate.toString());
								//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
									//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
									//rsPrevShift2.beforeFirst();
									if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
										//while (rs.next()) {
									//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
										rsPrevShift.beforeFirst();
										while (rsPrevShift.next()) {
											System.out.println("IN yesterday Date loop \n");
											
											ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
											prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											employeeRetrieveobj.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
											System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
											prevShiftList.add(prevShiftData);
										}
									} 
									
									else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {				
										//rs.beforeFirst();
										
										rsPrevShift.afterLast();
										System.out.println("else if loop when data is not in prev date \t :");
										String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
										PreparedStatement preparedStmtPrevShift4  = connection.prepareStatement(querySelectPrevShift4 );
										preparedStmtPrevShift4.setString(1, json.getCompanyId());
										preparedStmtPrevShift4.setString(2, json.getFromDate());
									//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
										ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
										System.out.println("BEFORE NO previous date but there is a data \t :");
										if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
											System.out.println("NO previous date but there is a data \t :");
											//while (rs.next()) {
										//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
											rsPrevShift4.beforeFirst();
											while(rsPrevShift4.next()) {
												System.out.println("NO previous date but there is a data so select data for shift1\t :");
											  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
												PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
												preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																		
												ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
												while (rsSupervisorLocation1.next()) {
													employeeRetrieveobj.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
												}
												//System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
											}} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {				
												//rs.beforeFirst();
												rsPrevShift4.afterLast();
												System.out.println("NO data at all \t :");
												
												while(rsPrevShift4.next()) {
												
													employeeRetrieveobj.setPreviousLocation("-"); 
												System.out.println("NO data at all location\t :"+employeeRetrieveobj.getPreviousLocation());
												}
											}
										
									
									}
					
									empId=employeeRetrieveobj.getEmployeeId();
									json.setPrevShiftList(prevShiftList);
									System.out.println("Prev shift list \n"+prevShiftList);

							}else {
										empId=employeeRetrieveobj.getEmployeeId();
										System.out.print("ELSE EMP-ID :\t"+empId);
									}
								
								employeeRetrievelist.add(employeeRetrieveobj);
								}
							
							//json.setShiftList(shiftList1);
						}
					 else if(Boolean.valueOf(rs.next()).equals(false)) {				
						//rs.beforeFirst();	
				}
			}
			}
				
				
				//employeeRetrievelist.addAll(employeeRetrievelist1); 
				
				 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
			
			
				
					json.setEmployeeRetrievelist(employeeRetrievelist);
					json.setVacancyReportlist(vacancyReportlist);
			}else {
				 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
				 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				
	if(json.getDataCount()==0) {
					
					System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
					String querySelectEmpCount=ReportsPagingQueries.EMP_SUPERVISOR_BASED_COUNT_ALL;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,json.getCompanyId());
					preparedStmtEmpCount.setString(2,fromDate1.toString());
					preparedStmtEmpCount.setString(3,toDate1.toString());
				   ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   empCount=rsEmpCount.getInt("EmpCount");
				       
				       }
				       
				   	json.setTotlaItemCount(empCount);
				   	
					
				}
				String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
				PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
				preparedStmtEmpCount1.setString(1,json.getCompanyId());

				  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
			       while(rsEmpCount1.next())
			       {
			    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
			    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
			    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
			    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
						PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
						preparedStmtEmpCountgr.setString(1,json.getCompanyId());
						preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
						  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
					       while(rsEmpCountgr.next())
					       {
					    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
					    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
					    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
					      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
					    	   allShiftGrade.add(empcountallgr);
					    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
					    	  
					       }
			    	   
			    	   allShiftDetails.add(empcountall);
			    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
			       }
			    	//json.setTotlaItemCount(empCount1);
			   	json.setTotalItemCount(empCount1);
			   	json.setAllShiftDetails(allShiftDetails);

				String EmpId;
				
				String querySelectEmpId=ReportsPagingQueries.EMP_SUPERVISOR_BASED_EMP_ID_ALL;
				PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
				preparedStmtEmpId.setString(1,json.getCompanyId());
				preparedStmtEmpId.setString(2,fromDate1.toString());
				preparedStmtEmpId.setString(3,toDate1.toString());
				preparedStmtEmpId.setInt(4, json.getDataCount());
				preparedStmtEmpId.setInt(5, 3);
				ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
				while(rsEmpId.next()) {
					
					EmpId=rsEmpId.getString("EmployeeId");
							
					System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
			
					
			
					
					
					 LocalDate prevDate = fromDate1.minusDays(1);
					 System.out.println("PreviousDate:"+prevDate);
					 for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
					{
					    System.out.println("Date:"+date);
					    String querySelect = ReportsPagingQueries.EMP_SUPERVISOR_REPORT;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						//preparedStmt.setString(2, json.getMonth());
						//preparedStmt.setString(3, json.getYear());
						preparedStmt.setString(2, date.toString());
						preparedStmt.setString(3, EmpId);					
						ResultSet rs = preparedStmt.executeQuery();
						//System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
						
					 if(Boolean.valueOf(rs.next()).equals(true)){
							//while (rs.next()) {
						//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
						 rs.beforeFirst();
							while (rs.next()) {
								System.out.println("SHIFT REPORT DATA TABLE \t :");
								ReportsPagingJSON employeeRetrieveobj = new ReportsPagingJSON();
								employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
								employeeRetrieveobj.setName(rs.getString("Name"));
								employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
								employeeRetrieveobj.setDepartment(rs.getString("Department"));
								employeeRetrieveobj.setShift(rs.getString("Shift"));
								employeeRetrieveobj.setDate(rs.getString("Date"));
								employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation")); 
								employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));   
								String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
								PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
								preparedStmtSupervisor.setString(1, json.getCompanyId());
								preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
								ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
								while (rsSupervisor.next()) {
									employeeRetrieveobj.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
								}
								employeeRetrieveobj.setGrade(rs.getString("grade")); 
								employeeRetrieveobj.setEmpCode(rs.getString("EmpCode")); 
								System.out.print("BEFORE EMP-ID :\t"+empId);
								System.out.println("EMPLOYEID :\t"+employeeRetrieveobj.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj.getCurrentLocation());
							
								if(!empId.equals(employeeRetrieveobj.getEmployeeId())) {
									System.out.println("IN PREV  IF LOOP \n" +empId+","+employeeRetrieveobj.getEmployeeId());
									String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
									PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
									preparedStmtPrevShift.setString(1, json.getCompanyId());
									preparedStmtPrevShift.setString(2, prevDate.toString());
								//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
									//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
									//rsPrevShift2.beforeFirst();
									if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
										//while (rs.next()) {
									//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
										rsPrevShift.beforeFirst();
										while (rsPrevShift.next()) {
											System.out.println("IN yesterday Date loop \n");
											
											ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
											prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											employeeRetrieveobj.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
											System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
											prevShiftList.add(prevShiftData);
										}
									} 
									
									else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {				
										//rs.beforeFirst();
										
										rsPrevShift.afterLast();
										System.out.println("else if loop when data is not in prev date \t :");
										String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
										PreparedStatement preparedStmtPrevShift4  = connection.prepareStatement(querySelectPrevShift4 );
										preparedStmtPrevShift4.setString(1, json.getCompanyId());
										preparedStmtPrevShift4.setString(2, json.getFromDate());
									//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
										ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
										System.out.println("BEFORE NO previous date but there is a data \t :");
										if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
											System.out.println("NO previous date but there is a data \t :");
											//while (rs.next()) {
										//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
											rsPrevShift4.beforeFirst();
											while(rsPrevShift4.next()) {
												System.out.println("NO previous date but there is a data so select data for shift1\t :");
											  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
												PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
												preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																		
												ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
												while (rsSupervisorLocation1.next()) {
													employeeRetrieveobj.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
												}
												//System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
											}} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {				
												//rs.beforeFirst();
												rsPrevShift4.afterLast();
												System.out.println("NO data at all \t :");
												
												while(rsPrevShift4.next()) {
												
													employeeRetrieveobj.setPreviousLocation("-"); 
												System.out.println("NO data at all location\t :"+employeeRetrieveobj.getPreviousLocation());
												}
											}
										
									
									}
					
									empId=employeeRetrieveobj.getEmployeeId();
									json.setPrevShiftList(prevShiftList);
									System.out.println("Prev shift list \n"+prevShiftList);

							}else {
										empId=employeeRetrieveobj.getEmployeeId();
										System.out.print("ELSE EMP-ID :\t"+empId);
									}
								
								employeeRetrievelist.add(employeeRetrieveobj);
								}
							
							//json.setShiftList(shiftList1);
						}
					 else if(Boolean.valueOf(rs.next()).equals(false)) {				
						//rs.beforeFirst();	
				}
			}
			}
				
				
				//employeeRetrievelist.addAll(employeeRetrievelist1); 
				
				 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
			
			
				
					json.setEmployeeRetrievelist(employeeRetrievelist);
					
				
			}
		
		   	
		
			
	
			
			
			
			
	
				
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
		
		
	}
	*/

	public static ReportsPagingJSON supervisorbasedReport(ReportsPagingJSON json) {
		Connection connection = null;
		ArrayList<ReportsPagingJSON> employeeRetrievelist = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> employeeRetrievelist1 = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> vacancyReportlist =new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> prevShiftList = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftGrade = new ArrayList<ReportsPagingJSON>();
		ArrayList<ReportsPagingJSON> allShiftDetails = new ArrayList<ReportsPagingJSON>();
		String empId="";
	     int empCount=0;  int empCount1=0;

			int dataEndCount=json.getDataCount()+3;
			 int i=1;
			 String empId1="";
			
		try {
			
						
			connection = DatabaseUtil.getDBConnection();			

			System.out.println("DATA COUNT : \t"+json.getDataCount());
			if(!json.getSupervisor().equals("all"))
			{
				 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
				 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				
	if(json.getDataCount()==0) {
					
					System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
					String querySelectEmpCount=ReportsPagingQueries.EMP_SUPERVISOR_BASED_COUNT;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,json.getCompanyId());
					preparedStmtEmpCount.setString(2,json.getSupervisor());
					preparedStmtEmpCount.setString(3,fromDate1.toString());
					preparedStmtEmpCount.setString(4,toDate1.toString());
				
					
					  ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   empCount=rsEmpCount.getInt("EmpCount");
				       
				       }
				       
				   	json.setTotlaItemCount(empCount);
				   	
					
				}
				String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
				PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
				preparedStmtEmpCount1.setString(1,json.getCompanyId());

				  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
			       while(rsEmpCount1.next())
			       {
			    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
			    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
			    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
			    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
						PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
						preparedStmtEmpCountgr.setString(1,json.getCompanyId());
						preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
						  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
					       while(rsEmpCountgr.next())
					       {
					    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
					    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
					    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
					      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
					    	   allShiftGrade.add(empcountallgr);
					    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
					    	  
					       }
			    	   
			    	   allShiftDetails.add(empcountall);
			    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
			       }
			    	//json.setTotlaItemCount(empCount1);
			   	json.setTotalItemCount(empCount1);
			   	json.setAllShiftDetails(allShiftDetails);

				String EmpId;
				
				String querySelectEmpId=ReportsPagingQueries.EMP_SUPERVISOR_BASED_EMP_ID;
				PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
				preparedStmtEmpId.setString(1,json.getCompanyId());
				preparedStmtEmpId.setString(2,json.getSupervisor());
				preparedStmtEmpId.setString(3,fromDate1.toString());
				preparedStmtEmpId.setString(4,toDate1.toString());
				preparedStmtEmpId.setInt(5, json.getDataCount());
				preparedStmtEmpId.setInt(6, 3);
				ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
				while(rsEmpId.next()) {
					
					EmpId=rsEmpId.getString("EmployeeId");
							
					System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
			
					
			
					
				
					 LocalDate prevDate = fromDate1.minusDays(1);
					 System.out.println("PreviousDate:"+prevDate);
					 for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
					{
					    System.out.println("Date:"+date);
					    String querySelect = ReportsPagingQueries.EMP_SUPERVISOR_REPORT;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						//preparedStmt.setString(2, json.getMonth());
						//preparedStmt.setString(3, json.getYear());
						preparedStmt.setString(2, date.toString());
						preparedStmt.setString(3, EmpId);
						preparedStmt.setString(4, json.getSupervisor());
						
						ResultSet rs = preparedStmt.executeQuery();
						//System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
						
					 if(Boolean.valueOf(rs.next()).equals(true)){
							//while (rs.next()) {
						//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
						 rs.beforeFirst();
							while (rs.next()) {
								System.out.println("SHIFT REPORT DATA TABLE \t :");
								ReportsPagingJSON employeeRetrieveobj = new ReportsPagingJSON();
								employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
								employeeRetrieveobj.setName(rs.getString("Name"));
								employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
								employeeRetrieveobj.setDepartment(rs.getString("Department"));
								employeeRetrieveobj.setShift(rs.getString("Shift"));
								employeeRetrieveobj.setDate(rs.getString("Date"));
								employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation")); 
								employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));   
								String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
								PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
								preparedStmtSupervisor.setString(1, json.getCompanyId());
								preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
								ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
								while (rsSupervisor.next()) {
									employeeRetrieveobj.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
								}
								employeeRetrieveobj.setGrade(rs.getString("grade")); 
								employeeRetrieveobj.setEmpCode(rs.getString("EmpCode")); 
								System.out.print("BEFORE EMP-ID :\t"+empId);
								System.out.println("EMPLOYEID :\t"+employeeRetrieveobj.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj.getCurrentLocation());
							
								if(!empId.equals(employeeRetrieveobj.getEmployeeId())) {
									System.out.println("IN PREV  IF LOOP \n" +empId+","+employeeRetrieveobj.getEmployeeId());
									String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
									PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
									preparedStmtPrevShift.setString(1, json.getCompanyId());
									preparedStmtPrevShift.setString(2, prevDate.toString());
								//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
									//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
									//rsPrevShift2.beforeFirst();
									if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
										//while (rs.next()) {
									//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
										rsPrevShift.beforeFirst();
										while (rsPrevShift.next()) {
											System.out.println("IN yesterday Date loop \n");
											
											ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
											prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											employeeRetrieveobj.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
											System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
											prevShiftList.add(prevShiftData);
										}
									} 
									
									else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {				
										//rs.beforeFirst();
										
										rsPrevShift.afterLast();
										System.out.println("else if loop when data is not in prev date \t :");
										String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
										PreparedStatement preparedStmtPrevShift4  = connection.prepareStatement(querySelectPrevShift4 );
										preparedStmtPrevShift4.setString(1, json.getCompanyId());
										preparedStmtPrevShift4.setString(2, json.getFromDate());
									//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
										ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
										System.out.println("BEFORE NO previous date but there is a data \t :");
										if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
											System.out.println("NO previous date but there is a data \t :");
											//while (rs.next()) {
										//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
											rsPrevShift4.beforeFirst();
											while(rsPrevShift4.next()) {
												System.out.println("NO previous date but there is a data so select data for shift1\t :");
											  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
												PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
												preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																		
												ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
												while (rsSupervisorLocation1.next()) {
													employeeRetrieveobj.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
												}
												//System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
											}} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {				
												//rs.beforeFirst();
												rsPrevShift4.afterLast();
												System.out.println("NO data at all \t :");
												
												while(rsPrevShift4.next()) {
												
													employeeRetrieveobj.setPreviousLocation("-"); 
												System.out.println("NO data at all location\t :"+employeeRetrieveobj.getPreviousLocation());
												}
											}
										
									
									}
					
									empId=employeeRetrieveobj.getEmployeeId();
									json.setPrevShiftList(prevShiftList);
									System.out.println("Prev shift list \n"+prevShiftList);

							}else {
										empId=employeeRetrieveobj.getEmployeeId();
										System.out.print("ELSE EMP-ID :\t"+empId);
									}
								
								employeeRetrievelist.add(employeeRetrieveobj);
								}
							
							//json.setShiftList(shiftList1);
						}
					 else if(Boolean.valueOf(rs.next()).equals(false)) {				
						//rs.beforeFirst();	
						 
				}
			}
			}
				
				
				//employeeRetrievelist.addAll(employeeRetrievelist1); 
				
				 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
			
			
				
					json.setEmployeeRetrievelist(employeeRetrievelist);
					
			}else {
				 LocalDate fromDate1 = LocalDate.of(json.getFromDate1().getYear(),(json.getFromDate1().getMonth().getValue()),json.getFromDate1().getDayOfMonth());
				 LocalDate toDate1 = LocalDate.of(json.getToDate1().getYear(),(json.getToDate1().getMonth().getValue()),json.getToDate1().getDayOfMonth());
				
	if(json.getDataCount()==0) {
					
					System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
					String querySelectEmpCount=ReportsPagingQueries.EMP_SUPERVISOR_BASED_COUNT_ALL;
					PreparedStatement preparedStmtEmpCount = connection.prepareStatement(querySelectEmpCount);
					preparedStmtEmpCount.setString(1,json.getCompanyId());
					preparedStmtEmpCount.setString(2,fromDate1.toString());
					preparedStmtEmpCount.setString(3,toDate1.toString());
				   ResultSet rsEmpCount=preparedStmtEmpCount.executeQuery();
				       while(rsEmpCount.next())
				       {
				    	   empCount=rsEmpCount.getInt("EmpCount");
				       
				       }
				       
				   	json.setTotlaItemCount(empCount);
				   	
					
				}
				String querySelectEmpCount1=ReportsPagingQueries.All_Shift;
				PreparedStatement preparedStmtEmpCount1 = connection.prepareStatement(querySelectEmpCount1);
				preparedStmtEmpCount1.setString(1,json.getCompanyId());

				  ResultSet rsEmpCount1=preparedStmtEmpCount1.executeQuery();
			       while(rsEmpCount1.next())
			       {
			    	   ReportsPagingJSON empcountall=new ReportsPagingJSON();
			    	   empcountall.setEmpCount(rsEmpCount1.getString("empCount"));
			    	   empcountall.setShiftNo(rsEmpCount1.getString("shift"));
			    		String querySelectEmpCountgr=ReportsPagingQueries.Grade_Shift;
						PreparedStatement preparedStmtEmpCountgr = connection.prepareStatement(querySelectEmpCountgr);
						preparedStmtEmpCountgr.setString(1,json.getCompanyId());
						preparedStmtEmpCountgr.setString(2,rsEmpCount1.getString("shift"));
						  ResultSet rsEmpCountgr=preparedStmtEmpCountgr.executeQuery();
					       while(rsEmpCountgr.next())
					       {
					    	   ReportsPagingJSON empcountallgr=new ReportsPagingJSON();
					    	   empcountallgr.setGrade(rsEmpCountgr.getString("grade"));
					    	   empcountallgr.setEmpCode(rsEmpCountgr.getString("employeecode"));
					      	   empcountallgr.setShiftNo(rsEmpCount1.getString("shift"));
					    	   allShiftGrade.add(empcountallgr);
					    	   empcountall.setAllShiftGrade(allShiftGrade);		    	 
					    	  
					       }
			    	   
			    	   allShiftDetails.add(empcountall);
			    	   empCount1=empCount1+Integer.parseInt(rsEmpCount1.getString("empCount"));
			       }
			    	//json.setTotlaItemCount(empCount1);
			   	json.setTotalItemCount(empCount1);
			   	json.setAllShiftDetails(allShiftDetails);

				String EmpId;
				
				String querySelectEmpId=ReportsPagingQueries.EMP_SUPERVISOR_BASED_EMP_ID_ALL;
				PreparedStatement preparedStmtEmpId = connection.prepareStatement(querySelectEmpId);
				preparedStmtEmpId.setString(1,json.getCompanyId());
				preparedStmtEmpId.setString(2,fromDate1.toString());
				preparedStmtEmpId.setString(3,toDate1.toString());
				preparedStmtEmpId.setInt(4, json.getDataCount());
				preparedStmtEmpId.setInt(5, 3);
				ResultSet rsEmpId=preparedStmtEmpId.executeQuery();
				while(rsEmpId.next()) {
					
					EmpId=rsEmpId.getString("EmployeeId");
							
					System.out.println("SELECTING DATA OF EMPLOYEE \t :"+EmpId);
			
					
			
					
					
					 LocalDate prevDate = fromDate1.minusDays(1);
					 System.out.println("PreviousDate:"+prevDate);
					 for (LocalDate date = fromDate1; !date.isAfter(toDate1); date = date.plusDays(1))
					{
					    System.out.println("Date:"+date);
					    String querySelect = ReportsPagingQueries.EMP_SUPERVISOR_REPORT1;
						PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
						preparedStmt.setString(1, json.getCompanyId());
						//preparedStmt.setString(2, json.getMonth());
						//preparedStmt.setString(3, json.getYear());
						preparedStmt.setString(2, date.toString());
						preparedStmt.setString(3, EmpId);		
						//preparedStmt.setString(4, json.getSupervisor());
						ResultSet rs = preparedStmt.executeQuery();
						//System.out.println("For checking loop condition \t :"+rs +','+rs.next()+','+date);
						
					 if(Boolean.valueOf(rs.next()).equals(true)){
							//while (rs.next()) {
						//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
						 rs.beforeFirst();
							while (rs.next()) {
								System.out.println("SHIFT REPORT DATA TABLE \t :");
								ReportsPagingJSON employeeRetrieveobj = new ReportsPagingJSON();
								employeeRetrieveobj.setEmployeeId(rs.getString("EmployeeId"));
								employeeRetrieveobj.setName(rs.getString("Name"));
								employeeRetrieveobj.setEmployeeType(rs.getString("Type"));
								employeeRetrieveobj.setDepartment(rs.getString("Department"));
								employeeRetrieveobj.setShift(rs.getString("Shift"));
								employeeRetrieveobj.setDate(rs.getString("Date"));
								employeeRetrieveobj.setCurrentLocation(rs.getString("CurrentLocation")); 
								employeeRetrieveobj.setShiftSuperVisorId(rs.getString("ShiftSupervisorId"));   
								String querySelectSupervisor = ReportsPagingQueries.GET_SUPERVISOR;
								PreparedStatement preparedStmtSupervisor = connection.prepareStatement(querySelectSupervisor);
								preparedStmtSupervisor.setString(1, json.getCompanyId());
								preparedStmtSupervisor.setString(2, rs.getString("ShiftSupervisorId"));							
								ResultSet rsSupervisor = preparedStmtSupervisor.executeQuery();
								while (rsSupervisor.next()) {
									employeeRetrieveobj.setShiftSupervisorName(rsSupervisor.getString("supervisorName"));
								}
								employeeRetrieveobj.setGrade(rs.getString("grade")); 
								employeeRetrieveobj.setEmpCode(rs.getString("EmpCode")); 
								System.out.print("BEFORE EMP-ID :\t"+empId);
								System.out.println("EMPLOYEID :\t"+employeeRetrieveobj.getEmployeeId()+"\t LOCATION :\t"+employeeRetrieveobj.getCurrentLocation());
							
								if(!empId.equals(employeeRetrieveobj.getEmployeeId())) {
									System.out.println("IN PREV  IF LOOP \n" +empId+","+employeeRetrieveobj.getEmployeeId());
									String querySelectPrevShift = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT;
									PreparedStatement preparedStmtPrevShift  = connection.prepareStatement(querySelectPrevShift );
									preparedStmtPrevShift.setString(1, json.getCompanyId());
									preparedStmtPrevShift.setString(2, prevDate.toString());
								//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
									preparedStmtPrevShift.setString(3, employeeRetrieveobj.getEmployeeId());
									ResultSet rsPrevShift= preparedStmtPrevShift.executeQuery();
									//System.out.println("IN PREV LOOP next() value\n"+rsPrevShift2.next());
									//rsPrevShift2.beforeFirst();
									if(Boolean.valueOf(rsPrevShift.next()).equals(true)){
										//while (rs.next()) {
									//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
										rsPrevShift.beforeFirst();
										while (rsPrevShift.next()) {
											System.out.println("IN yesterday Date loop \n");
											
											ReportsPagingJSON prevShiftData = new ReportsPagingJSON();
											prevShiftData.setEmployeeId(employeeRetrieveobj.getEmployeeId());
											prevShiftData.setCurrentLocation(rsPrevShift.getString("CurrentLocation"));
											employeeRetrieveobj.setPreviousLocation(rsPrevShift.getString("CurrentLocation")); 
											System.out.println("IN yesterday Date Location \n"+rsPrevShift.getString("CurrentLocation"));
											prevShiftList.add(prevShiftData);
										}
									} 
									
									else if(Boolean.valueOf(rsPrevShift.next()).equals(false)) {				
										//rs.beforeFirst();
										
										rsPrevShift.afterLast();
										System.out.println("else if loop when data is not in prev date \t :");
										String querySelectPrevShift4 = ReportsPagingQueries.SELECT_EMP_PREV_SHIFT1;
										PreparedStatement preparedStmtPrevShift4  = connection.prepareStatement(querySelectPrevShift4 );
										preparedStmtPrevShift4.setString(1, json.getCompanyId());
										preparedStmtPrevShift4.setString(2, json.getFromDate());
									//	preparedStmtPrevShift.setString(3, shiftData.getCurrentLocation());
										preparedStmtPrevShift4.setString(3, employeeRetrieveobj.getEmployeeId());
										ResultSet rsPrevShift4 = preparedStmtPrevShift4.executeQuery();
										System.out.println("BEFORE NO previous date but there is a data \t :");
										if(Boolean.valueOf(rsPrevShift4.next()).equals(true)){
											System.out.println("NO previous date but there is a data \t :");
											//while (rs.next()) {
										//	System.out.println("SHIFT REPORT DATA TABLE ELSE PART\t :"+rs.next()+','+date);
											rsPrevShift4.beforeFirst();
											while(rsPrevShift4.next()) {
												System.out.println("NO previous date but there is a data so select data for shift1\t :");
											  String querySelectShiftLocation1= ReportsPagingQueries.GET_SHIFT_LOC;
												PreparedStatement preparedStmtSupervisorLocation1 = connection.prepareStatement(querySelectShiftLocation1);
												preparedStmtSupervisorLocation1.setString(1, json.getCompanyId());
																		
												ResultSet rsSupervisorLocation1 = preparedStmtSupervisorLocation1.executeQuery();
												while (rsSupervisorLocation1.next()) {
													employeeRetrieveobj.setPreviousLocation(rsSupervisorLocation1.getString("CurrentLocation")); 
												}
												//System.out.println("NO previous date but there is a data so shift1 Value\t :"+rsSupervisorLocation1.getString("CurrentLocation"));
											}} else if(Boolean.valueOf(rsPrevShift4.next()).equals(false)) {				
												//rs.beforeFirst();
												rsPrevShift4.afterLast();
												System.out.println("NO data at all \t :");
												
												while(rsPrevShift4.next()) {
												
													employeeRetrieveobj.setPreviousLocation("-"); 
												System.out.println("NO data at all location\t :"+employeeRetrieveobj.getPreviousLocation());
												}
											}
										
									
									}
					
									empId=employeeRetrieveobj.getEmployeeId();
									json.setPrevShiftList(prevShiftList);
									System.out.println("Prev shift list \n"+prevShiftList);

							}else {
										empId=employeeRetrieveobj.getEmployeeId();
										System.out.print("ELSE EMP-ID :\t"+empId);
									}
								
								employeeRetrievelist.add(employeeRetrieveobj);
								}
							
							//json.setShiftList(shiftList1);
						}
					 else if(Boolean.valueOf(rs.next()).equals(false)) {				
						//rs.beforeFirst();	
				}
			}
			}
				
				
				//employeeRetrievelist.addAll(employeeRetrievelist1); 
				
				 System.out.print("ShiftList Content:"+employeeRetrievelist.size());
			
			
				
					json.setEmployeeRetrievelist(employeeRetrievelist);
					
				
			}
		
		   	
		
			
	
			
			
			
			
	
				
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}
		return json;
		
		
	}
	public static ReportsPagingJSON ScheduledShiftReport(ReportsPagingJSON json) {
		// TODO Auto-generated method stub
	
		int ShiftCount=0;
		
	
		ArrayList<ReportsPagingJSON> scheduledShiftReportList=new ArrayList<ReportsPagingJSON>();
	
		Connection connection=null;
		try {
			connection=DatabaseUtil.getDBConnection();
			System.out.println("DATA COUNT : \t"+json.getDataCount());
		
			if(json.getDataCount()==0) {
				
				System.out.println("FIRST TIME SO TAKING COUNT OF TOTAL ITEM \n");
				String querySelectShiftCount=ReportsPagingQueries.ScheduledShiftReport_Count;
				PreparedStatement preparedStmtShiftCount = connection.prepareStatement(querySelectShiftCount);
				preparedStmtShiftCount.setString(1,json.getCompanyId());
				preparedStmtShiftCount.setString(2,json.getDate());
				
				
				  ResultSet rsShiftCount=preparedStmtShiftCount.executeQuery();
			       while(rsShiftCount.next())
			       {
			    	   ShiftCount = rsShiftCount.getRow();
			          
			             System.out.println("Total rows \t :"+ShiftCount);
			    	 
			       
			       }
			       
			   	json.setTotlaItemCount(ShiftCount);
			   	
			}
			
		
			
				 
			
			String querySelect=ReportsPagingQueries.ScheduledShiftReport;
			PreparedStatement preparestmnt=connection.prepareStatement(querySelect);
			preparestmnt.setString(1, json.getCompanyId());
			preparestmnt.setString(2,json.getDate());			
			preparestmnt.setInt(3, json.getDataCount());
			preparestmnt.setInt(4, 10);
			ResultSet rs=preparestmnt.executeQuery();
			while(rs.next()) {
				ReportsPagingJSON scheduledShiftReport=new ReportsPagingJSON();
				scheduledShiftReport.setShiftLoop(rs.getString("ShiftLoop"));
				scheduledShiftReport.setTimingsLoop(rs.getString("TimingsLoop"));
				scheduledShiftReport.setDescriptionLoop(rs.getString("DescriptionLoop"));
				scheduledShiftReport.setWorkLocationLoop(rs.getString("WorkLocationLoop"));
				scheduledShiftReport.setFromDate(rs.getString("FromDate"));
				scheduledShiftReport.setToDate(rs.getString("ToDate"));
				scheduledShiftReport.setShiftDescription(rs.getString("ShiftDescription"));
		
				scheduledShiftReportList.add(scheduledShiftReport);	
			}	
			
		
			json.setScheduledShiftReportList(scheduledShiftReportList);
		
			
		connection.close();
		}catch (SQLException e) {
		e.printStackTrace();}
		finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		return json;
	}
	
	
	
	
	
}
