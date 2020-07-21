package Appointments;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import AppointmentReport.AppointmentReportJSON;
import AppointmentReport.AppointmentReportQueryConstants;
import DBUtil.DatabaseUtil;
import report.expense.ExpenseReportJSON;
import report.expense.QueryConstants;

public class AppointmentsLogic {

	
	/*
	 * FUNCTION FOR GETTING SALOON DETAILS LIKE SALOON NAME/SERVICES OFFERED WITH RATE/EMPLOYEE NAMES
	 */
	public static AppointmentsJSON GetAllSaloonDetails(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> saloonDetailsList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> serviceDetailsMainList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> employeeDetailsMainList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> appointmentDetailsMainList=new ArrayList <AppointmentsJSON>();
		
		AppointmentsJSON saloonData=new AppointmentsJSON();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			//GETTING SALOON DETAILS
			String querySelectSaloonName=AppointmentsQueryConstants.GET_SALOON_NAME;
			PreparedStatement preparedStmtSaloonName=connection.prepareStatement(querySelectSaloonName);
			ResultSet rsSaloonName=preparedStmtSaloonName.executeQuery();
			while(rsSaloonName.next()) {
				AppointmentsJSON saloonDetails=new AppointmentsJSON();
				saloonDetails.setCompanyId(rsSaloonName.getString("CompanyId"));
				saloonDetails.setCompanyName(rsSaloonName.getString("CompanyName"));
				
				saloonDetailsList.add(saloonDetails);
				
				//GETTING SERVICES DETAILS, EMPLOYEE DETAILS,APPOINTMENT DETAILS
				
				saloonData=Service_Employee_Appointment_Details(saloonDetails.getCompanyId(),json.getDate());
				
				serviceDetailsMainList.addAll(saloonData.getServiceDetails());
				employeeDetailsMainList.addAll(saloonData.getEmployeeDetails());
				appointmentDetailsMainList.addAll(saloonData.getAppointmentDetails());
			
			}
			
			
			
			connection.close(); 
			
			saloonData.setSaloonDetails(saloonDetailsList);
			saloonData.setServiceDetails(serviceDetailsMainList);
			saloonData.setEmployeeDetails(employeeDetailsMainList);
			saloonData.setAppointmentDetails(appointmentDetailsMainList);
		
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return saloonData;
		
	}

	/*
	 * FUNCTION FOR MAKING AN APPOINTMENT
	 */
	public static AppointmentsJSON MakeAppointment(AppointmentsJSON json) {
		Connection connection=null;
	
		json.setResponse("Fail");
		AppointmentsJSON makeAppointmentResponeData=new AppointmentsJSON();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			
			
		
			String currentAppointmentStartTime=json.getAppointmentTime();
			    Date d1 = new SimpleDateFormat("HH:mm").parse(currentAppointmentStartTime);
			    Calendar calendar1 = Calendar.getInstance();
			    calendar1.setTime(d1);
			    calendar1.add(Calendar.DATE, 1);
			    
			    
			    String currentAppointmentEndTime=json.getAppointmentEndTime();
			    Date d2 = new SimpleDateFormat("HH:mm").parse(currentAppointmentEndTime);
			    Calendar calendar2 = Calendar.getInstance();
			    calendar2.setTime(d2);
			    calendar2.add(Calendar.DATE, 1);
			    
			    Date currentStart = calendar1.getTime();
			    Date currentEnd = calendar2.getTime();
			    
				System.out.println("CURRENT START TIME - END TIME : \t"+currentStart+ " - "+currentEnd);
				
				
			//CHECK IF EMPLOYEE IS AVAILABLE 
			String queryCheckAppointment=AppointmentsQueryConstants.CHECK_APPOINTMENT;
			PreparedStatement preparedStmtCheckAppointment=connection.prepareStatement(queryCheckAppointment);
			preparedStmtCheckAppointment.setString(1, json.getCompanyId());
			preparedStmtCheckAppointment.setString(2,json.getEmployeedetails());
			preparedStmtCheckAppointment.setString(3,json.getAppointmentDate());
			ResultSet rsCheckAppointment=preparedStmtCheckAppointment.executeQuery();
			while(rsCheckAppointment.next()) {
			
				
				String appointmentTime=rsCheckAppointment.getString("AppointmentTime");
				    Date time1 = new SimpleDateFormat("HH:mm").parse(appointmentTime);
				    Calendar calendar3 = Calendar.getInstance();
				    calendar3.setTime(time1);
				    calendar3.add(Calendar.DATE, 1);


				    String appointmentEndTime=rsCheckAppointment.getString("AppointmentEndTime");
				    Date time2 = new SimpleDateFormat("HH:mm").parse(appointmentEndTime);
				    Calendar calendar4 = Calendar.getInstance();
				    calendar4.setTime(time2);
				    calendar4.add(Calendar.DATE, 1);

				
				    if ( (currentStart.after(calendar3.getTime()) && currentStart.before(calendar4.getTime()) ) || 
				    		(currentEnd.after(calendar3.getTime()) && currentEnd.before(calendar4.getTime()) ) ) {
				    	
				    	System.out.println("EMPLOYEE ENGAGED \n");
				    	json.setResponse("EmployeeEngaged");
				    	break;
				    	
				    }
				    
				    
				    
				
			}
				
			
			
			if(!json.getResponse().equals("EmployeeEngaged")) {
				
				String queryMakeAppointment=AppointmentsQueryConstants.MAKE_APPOINTMENT;
				PreparedStatement preparedStmtMakeAppointment=connection.prepareStatement(queryMakeAppointment);
				preparedStmtMakeAppointment.setString(1, json.getCompanyId());
				preparedStmtMakeAppointment.setString(2,json.getMobileNo());
				preparedStmtMakeAppointment.setString(3, json.getGender());
				preparedStmtMakeAppointment.setString(4,json.getBookingDate());
				preparedStmtMakeAppointment.setString(5, json.getAppointmentDate());
				preparedStmtMakeAppointment.setString(6,json.getAppointmentTime());
				preparedStmtMakeAppointment.setString(7, json.getService());
				preparedStmtMakeAppointment.setString(8,json.getEmployeedetails());
				preparedStmtMakeAppointment.setString(9, json.getAppointmentBy());
				preparedStmtMakeAppointment.setString(10,json.getModeofAppointment());
				preparedStmtMakeAppointment.setString(11,json.getCustomerName());
				preparedStmtMakeAppointment.setString(12,json.getAppointmentEndTime());
				preparedStmtMakeAppointment.setString(13,json.getStatus());
				preparedStmtMakeAppointment.setString(14,json.getDescription());
				preparedStmtMakeAppointment.executeUpdate();
				
				json.setResponse("Success");
				
				
			}
			
			
			
			if(json.getGetDataType().equals("AllSaloon")) {
				//GET ALL SALOON DETAILS
				makeAppointmentResponeData=GetAllSaloonDetails(json);
				makeAppointmentResponeData.setResponse(json.getResponse());
				
			}else if(json.getGetDataType().equals("NotAllSaloon")) {
				//GET INDIVIDUAL SALOON DETAILS
				makeAppointmentResponeData=GetSaloonDetails(json);
				makeAppointmentResponeData.setResponse(json.getResponse());
			}
			
			
			
			
			
			
			
			
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return makeAppointmentResponeData;
			
			
			
			
	}

	/*
	 * FUNCTION FOR GETTING PARTICULAR SALOON'S SERVICE,SERVICE EMPLOYEE DETAILS
	 */
	public static AppointmentsJSON GetSaloonDetails(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> saloonDetailsList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> serviceDetailsMainList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> employeeDetailsMainList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> appointmentDetailsMainList=new ArrayList <AppointmentsJSON>();
		
		AppointmentsJSON saloonData=new AppointmentsJSON();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			

			
			//GETTING SERVICES DETAILS, EMPLOYEE DETAILS,APPOINTMENT DETAILS
						
						saloonData=Service_Employee_Appointment_Details(json.getCompanyId(),json.getDate());
						
						serviceDetailsMainList.addAll(saloonData.getServiceDetails());
						employeeDetailsMainList.addAll(saloonData.getEmployeeDetails());
						appointmentDetailsMainList.addAll(saloonData.getAppointmentDetails());
		
					saloonData.setServiceDetails(serviceDetailsMainList);
					saloonData.setEmployeeDetails(employeeDetailsMainList);
					saloonData.setAppointmentDetails(appointmentDetailsMainList);
			
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return saloonData;
	}
	
	/*
	 * FUCNTION FOR GETTING APPOINTMENT DETAILS
	 */

	public static AppointmentsJSON GetAppointmentDetails(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> appointmentDetailsList=new ArrayList <AppointmentsJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			
			
		//GETTING APPOINTMENT DETAILS
				
				String querySelectAppointmentDetils=AppointmentsQueryConstants.GET_APPOINTMENT_DETAILS;
				PreparedStatement preparedStmtAppointmentDetails=connection.prepareStatement(querySelectAppointmentDetils);
				preparedStmtAppointmentDetails.setString(1, json.getCompanyId());
				preparedStmtAppointmentDetails.setString(2, json.getFromDate());
				preparedStmtAppointmentDetails.setString(3, json.getToDate());
				ResultSet rsAppointment=preparedStmtAppointmentDetails.executeQuery();
				while(rsAppointment.next()) {
					AppointmentsJSON appointmentDetails=new AppointmentsJSON();
				
					 appointmentDetails.setAppointmentId(rsAppointment.getString("AppointmentId"));
					 appointmentDetails.setCustomerName(rsAppointment.getString("CustomerName"));
					 appointmentDetails.setMobileNo(rsAppointment.getString("ContactNo"));
					 appointmentDetails.setService(rsAppointment.getString("Service"));
					 appointmentDetails.setEmployeedetails(rsAppointment.getString("EmployeeDetails"));
					 appointmentDetails.setAppointmentDate(rsAppointment.getString("AppointmentDate"));  
					 appointmentDetails.setAppointmentTime(rsAppointment.getString("AppointmentTime"));   
					 appointmentDetails.setAppointmentEndTime(rsAppointment.getString("AppointmentEndTime")); 
					 appointmentDetailsList.add(appointmentDetails);

			}
		
				json.setAppointmentDetails(appointmentDetailsList);
				
			
	//GETTING LAST APPOINTMENT DETAILS
				
				String querySelectLastAppointmentDetils=AppointmentsQueryConstants.GET_LAST_APPOINTMENT_DETAILS;
				PreparedStatement preparedStmtLastAppointmentDetails=connection.prepareStatement(querySelectLastAppointmentDetils);
				preparedStmtLastAppointmentDetails.setString(1, json.getCompanyId());
				ResultSet rsLastAppointment=preparedStmtLastAppointmentDetails.executeQuery();
				while(rsLastAppointment.next()) {
					json.setAppointmentDate(rsLastAppointment.getString("AppointmentDate"));
				}
			
			connection.close(); 
			

			
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return json;
	}
	
	/*
	 * FUNCTION FOR UPDATING APPOINTMENT
	 */

	public static AppointmentsJSON UpdateAppointment(AppointmentsJSON json) {
		Connection connection=null;
		json.setResponse("Fail");
		try {
			connection=DatabaseUtil.getDBConnection();

	
		
		if(!json.getDeleteArray().isEmpty()) {
			System.out.println("DELETE ARRAY IS NOT EMPTY \n"+json.getDeleteArray());
		
			String queryDeleteAppointmentDetils=AppointmentsQueryConstants.DELETE_APPOINTMENT.replace("$appointmentId", json.getDeleteArray());
			PreparedStatement preparedStmtDeleteAppointmentDetails=connection.prepareStatement(queryDeleteAppointmentDetils);
			preparedStmtDeleteAppointmentDetails.setString(1, json.getCompanyId());
			preparedStmtDeleteAppointmentDetails.executeUpdate();
		}
		
		
		if(!json.getUpdateArray().isEmpty()) {
			System.out.println("UPDATE ARRAY IS NOT EMPTY \n"+json.getDeleteArray());
			List<String> updateArrayData = Arrays.asList(json.getUpdateArray().split(","));
			
		for (int i = 0; i < updateArrayData.size(); i = i + 4) {
			
			System.out.println("ID :"+updateArrayData.get(i));
			System.out.println("DATE :"+updateArrayData.get(i+1));
			System.out.println("START TIME :"+updateArrayData.get(i+2));
			System.out.println("END TIME :"+updateArrayData.get(i+3));
							
			String queryUpdateAppointmentDetils=AppointmentsQueryConstants.UPDATE_APPOINTMENT;
			PreparedStatement preparedStmtUpdateAppointmentDetails=connection.prepareStatement(queryUpdateAppointmentDetils);
			preparedStmtUpdateAppointmentDetails.setString(1, updateArrayData.get(i+1)); //AppointmentDate
			preparedStmtUpdateAppointmentDetails.setString(2, updateArrayData.get(i+2)); //Appointment Start Time
			preparedStmtUpdateAppointmentDetails.setString(3, updateArrayData.get(i+3)); //Appointment End Time
			preparedStmtUpdateAppointmentDetails.setString(4, updateArrayData.get(i));   //Appointment Id
			preparedStmtUpdateAppointmentDetails.setString(5, json.getCompanyId());
			preparedStmtUpdateAppointmentDetails.executeUpdate();
			
		}
		}
		json.setResponse("Success");
		
		//GETTING LAST APPOINTMENT DETAILS
		
		String querySelectLastAppointmentDetils=AppointmentsQueryConstants.GET_LAST_APPOINTMENT_DETAILS;
		PreparedStatement preparedStmtLastAppointmentDetails=connection.prepareStatement(querySelectLastAppointmentDetils);
		preparedStmtLastAppointmentDetails.setString(1, json.getCompanyId());
		ResultSet rsLastAppointment=preparedStmtLastAppointmentDetails.executeQuery();
		while(rsLastAppointment.next()) {
			json.setAppointmentDate(rsLastAppointment.getString("AppointmentDate"));
		}
		
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}
	
	/*
	 * FUNCTION FOR GETTING SERVICE,EMPLOYEE & APPOINTMENT DETAILS
	 */
	public static AppointmentsJSON Service_Employee_Appointment_Details(String companyId, String appointmentDate) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> serviceDetailsList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> employeeDetailsList=new ArrayList <AppointmentsJSON>();
		ArrayList <AppointmentsJSON> appointmentDetailsList=new ArrayList <AppointmentsJSON>();
		
		
		AppointmentsJSON saloonData=new AppointmentsJSON();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
		
			
			String querySelectSaloonService=AppointmentsQueryConstants.GET_SERVICE_DETAILS;
			PreparedStatement preparedStmtSaloonService=connection.prepareStatement(querySelectSaloonService);
			preparedStmtSaloonService.setString(1,companyId);
			ResultSet rsSaloonService=preparedStmtSaloonService.executeQuery();
			while(rsSaloonService.next()) {
				AppointmentsJSON serviceDetails=new AppointmentsJSON();
				serviceDetails.setCompanyId(companyId);
				serviceDetails.setProductId(rsSaloonService.getString("ProductId"));
				serviceDetails.setServiceName(rsSaloonService.getString("ProductName"));
				serviceDetails.setServiceTime(rsSaloonService.getString("ServiceTime"));
				serviceDetailsList.add(serviceDetails);

		}
		
	//GETTING EMPLOYEE DETAILS
			
			String querySelectEmployeeDetils=AppointmentsQueryConstants.GET_EMPLOYEE_DETAILS;
			PreparedStatement preparedStmtEmployeeDetails=connection.prepareStatement(querySelectEmployeeDetils);
			preparedStmtEmployeeDetails.setString(1, companyId);
			ResultSet rsEmployeeName=preparedStmtEmployeeDetails.executeQuery();
			while(rsEmployeeName.next()) {
				AppointmentsJSON employeeDetails=new AppointmentsJSON();
				employeeDetails.setCompanyId(companyId);
				employeeDetails.setEmployeeId(rsEmployeeName.getString("StaffId"));
				employeeDetails.setEmployeeName(rsEmployeeName.getString("StaffName"));
				employeeDetailsList.add(employeeDetails);

		}
			
	//GETTING APPOINTMENT DETAILS
			
			String querySelectAppointmentDetils=AppointmentsQueryConstants.GET_FUTURE_APPOINTMENT_DETAILS;
			PreparedStatement preparedStmtAppointmentDetails=connection.prepareStatement(querySelectAppointmentDetils);
			preparedStmtAppointmentDetails.setString(1, companyId);
			preparedStmtAppointmentDetails.setString(2,appointmentDate);
			ResultSet rsAppointment=preparedStmtAppointmentDetails.executeQuery();
			while(rsAppointment.next()) {
				AppointmentsJSON appointmentDetails=new AppointmentsJSON();
				appointmentDetails.setCompanyId(companyId);
				appointmentDetails.setEmployeedetails(rsAppointment.getString("EmployeeDetails"));
				appointmentDetails.setAppointmentDate(rsAppointment.getString("AppointmentDate"));
				appointmentDetails.setAppointmentTime(rsAppointment.getString("AppointmentTime"));
				appointmentDetails.setAppointmentEndTime(rsAppointment.getString("AppointmentEndTime"));
				appointmentDetailsList.add(appointmentDetails);

		}
			
			connection.close();
			saloonData.setServiceDetails(serviceDetailsList);
			saloonData.setEmployeeDetails(employeeDetailsList);
			saloonData.setAppointmentDetails(appointmentDetailsList);
			
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return saloonData;
			
			
			
			
	}
	
	/*
	 * FUNCTION FOR GETTING UNCONFIRMED APPOINTMENT DETAILS
	 */

	public static ArrayList<AppointmentsJSON> UnConfirmedAppointmentDetails(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> unconfirmedAppointmentList=new ArrayList <AppointmentsJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			//GETTING FUTURE APPOINTMENT DETAILS
			
			
			String querySelectFutureAppointments=AppointmentsQueryConstants.GET_UN_CONFIRMED_APPOINTMENT_DATA;
			PreparedStatement preparedStmtFutureAppointments=connection.prepareStatement(querySelectFutureAppointments);
			preparedStmtFutureAppointments.setString(1,json.getCompanyId());
			preparedStmtFutureAppointments.setString(2,json.getDate());
			ResultSet rsFutureAppointments=preparedStmtFutureAppointments.executeQuery();
			while(rsFutureAppointments.next()) {
				AppointmentsJSON unconfirmedAppointmentDetails=new AppointmentsJSON();
				unconfirmedAppointmentDetails.setCustomerName(rsFutureAppointments.getString("CustomerName"));
				unconfirmedAppointmentDetails.setMobileNo(rsFutureAppointments.getString("ContactNo"));
				unconfirmedAppointmentDetails.setGender(rsFutureAppointments.getString("Gender"));
				unconfirmedAppointmentDetails.setBookingDate(rsFutureAppointments.getString("BookingDate"));
				unconfirmedAppointmentDetails.setAppointmentDate(rsFutureAppointments.getString("AppointmentDate"));
				unconfirmedAppointmentDetails.setAppointmentTime(rsFutureAppointments.getString("AppointmentTime"));
				unconfirmedAppointmentDetails.setService(rsFutureAppointments.getString("Service"));
				unconfirmedAppointmentDetails.setEmployeedetails(rsFutureAppointments.getString("EmployeeDetails"));
				unconfirmedAppointmentDetails.setAppointmentBy(rsFutureAppointments.getString("AppointmentBy"));
				unconfirmedAppointmentDetails.setModeofAppointment(rsFutureAppointments.getString("ModeOfAppointment"));
				unconfirmedAppointmentDetails.setAppointmentEndTime(rsFutureAppointments.getString("AppointmentEndTime"));
				unconfirmedAppointmentDetails.setAppointmentId(rsFutureAppointments.getString("AppointmentId"));
				
				unconfirmedAppointmentList.add(unconfirmedAppointmentDetails);
			
			
			}
			
			
			
			connection.close(); 
			
	
		
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return unconfirmedAppointmentList;
		
	}
	
	/*
	 * FUNCTION FOR ACCEPTING OR REJECTING APPOINTMENTS
	 */

	public static AppointmentsJSON AcceptRejectAppointmentDetails(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> unconfirmedAppointmentList=new ArrayList <AppointmentsJSON>();
		
		
		json.setResponse("Fail");

		try {
			connection=DatabaseUtil.getDBConnection();
			
			//ACCEPTING / DENYING APPOINTMNETS
			

				String queryAcceptDenyAppointmentDetils=AppointmentsQueryConstants.ACCEPT_DENY_APPOINTMENT;
				PreparedStatement preparedStmtAcceptDenyAppointmentDetails=connection.prepareStatement(queryAcceptDenyAppointmentDetils);
				preparedStmtAcceptDenyAppointmentDetails.setString(1, json.getStatus());
				preparedStmtAcceptDenyAppointmentDetails.setString(2, json.getDescription());
				preparedStmtAcceptDenyAppointmentDetails.setString(3, json.getAppointmentId());
				preparedStmtAcceptDenyAppointmentDetails.setString(4, json.getCompanyId());
				int rsCount=preparedStmtAcceptDenyAppointmentDetails.executeUpdate();
			
				if(rsCount>0) {
					json.setResponse("Success");
				}else {
					json.setResponse("AlreadyAffected");
				}
			
			
			
		//	unconfirmedAppointmentList=UnConfirmedAppointmentDetails(json);
			
		//	json.setAppointmentDetails(unconfirmedAppointmentList);
			

			connection.close(); 

		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return json;
		
	}
	
	/*
	 * FUNCTION FOR RESCHEDULING AN APPOINTMENT
	 */

	public static AppointmentsJSON RescheduleAppointmentDetails(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> unconfirmedAppointmentList=new ArrayList <AppointmentsJSON>();
		
		
		json.setResponse("Fail");

		try {
			connection=DatabaseUtil.getDBConnection();
			
			// DENYING APPOINTMNETS
			
			System.out.println("CALLING MAKE APPOINTMENT FUNC \n");
	
			MakeAppointment(json);
			
			
			if(json.getResponse().equals("Success")) {
				System.out.println("CALLING ACCEPT/REJECT FUNC  \n");
				json.setStatus("1");
				json=AcceptRejectAppointmentDetails(json);
				
			}
			
			
			
	

			connection.close(); 

		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return json;
	}

	/*
	 * FUNCTION FOR ACCEPTING OR REJECTING ALL APPOINMENT
	 */
	public static AppointmentsJSON AcceptRejectAllAppointment(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> unconfirmedAppointmentList=new ArrayList <AppointmentsJSON>();
		
		
		json.setResponse("Fail");

		try {
			connection=DatabaseUtil.getDBConnection();
			
			//ACCEPTING / DENYING ALL APPOINTMNETS
			
			System.out.println("DTAES OPTED :"+json.getDate());
		
			String result=json.getDate().replaceAll("^|$", "'").replaceAll(",", "','"); 
		
		    
		    
	
			
				String queryAcceptDenyAllAppointmentDetils=AppointmentsQueryConstants.ACCEPT_DENY_ALL_APPOINTMENT.replace("$appointmentDate", result);
				PreparedStatement preparedStmtAcceptDenyAllAppointmentDetails=connection.prepareStatement(queryAcceptDenyAllAppointmentDetils);
				preparedStmtAcceptDenyAllAppointmentDetails.setString(1, json.getStatus());
				preparedStmtAcceptDenyAllAppointmentDetails.setString(2, json.getDescription());
				preparedStmtAcceptDenyAllAppointmentDetails.setString(3, json.getCompanyId());
				int rsCount=preparedStmtAcceptDenyAllAppointmentDetails.executeUpdate();
			
				System.out.println("RS COUNT :"+rsCount);
				if(rsCount>0) {
					json.setResponse("Success");
				}else {
					json.setResponse("AlreadyAffected");
				}

				json.setDate(json.getCurrentDate());
				
				
			unconfirmedAppointmentList=UnConfirmedAppointmentDetails(json);
			System.out.println("TODAY DATE :"+json.getDate());
			
			json.setAppointmentDetails(unconfirmedAppointmentList);
			

			connection.close(); 
	}
		catch (Exception e) {
			e.printStackTrace();
	} finally {
			
		
	}
		return json;
		
	}

	/*
	 * FUNCTION FOR UPDATING APPOINTMENTS VIA POPUP
	 */
	public static AppointmentsJSON UpdateAppointments(AppointmentsJSON json) {
		Connection connection=null;
		ArrayList <AppointmentsJSON> unconfirmedAppointmentList=new ArrayList <AppointmentsJSON>();
		
		
		json.setResponse("Fail");

		try {
			connection=DatabaseUtil.getDBConnection();
			
			
			String currentAppointmentStartTime=json.getAppointmentTime();
		    Date d1 = new SimpleDateFormat("HH:mm").parse(currentAppointmentStartTime);
		    Calendar calendar1 = Calendar.getInstance();
		    calendar1.setTime(d1);
		    calendar1.add(Calendar.DATE, 1);
		    
		    
		    String currentAppointmentEndTime=json.getAppointmentEndTime();
		    Date d2 = new SimpleDateFormat("HH:mm").parse(currentAppointmentEndTime);
		    Calendar calendar2 = Calendar.getInstance();
		    calendar2.setTime(d2);
		    calendar2.add(Calendar.DATE, 1);
		    
		    Date currentStart = calendar1.getTime();
		    Date currentEnd = calendar2.getTime();
		    
			System.out.println("CURRENT START TIME - END TIME : \t"+currentStart+ " - "+currentEnd);
			
			
		//CHECK IF EMPLOYEE IS AVAILABLE 
		String queryCheckAppointment=AppointmentsQueryConstants.CHECK_APPOINTMENT;
		PreparedStatement preparedStmtCheckAppointment=connection.prepareStatement(queryCheckAppointment);
		preparedStmtCheckAppointment.setString(1, json.getCompanyId());
		preparedStmtCheckAppointment.setString(2,json.getEmployeedetails());
		preparedStmtCheckAppointment.setString(3,json.getAppointmentDate());
		ResultSet rsCheckAppointment=preparedStmtCheckAppointment.executeQuery();
		while(rsCheckAppointment.next()) {
		
			
			String appointmentTime=rsCheckAppointment.getString("AppointmentTime");
			    Date time1 = new SimpleDateFormat("HH:mm").parse(appointmentTime);
			    Calendar calendar3 = Calendar.getInstance();
			    calendar3.setTime(time1);
			    calendar3.add(Calendar.DATE, 1);


			    String appointmentEndTime=rsCheckAppointment.getString("AppointmentEndTime");
			    Date time2 = new SimpleDateFormat("HH:mm").parse(appointmentEndTime);
			    Calendar calendar4 = Calendar.getInstance();
			    calendar4.setTime(time2);
			    calendar4.add(Calendar.DATE, 1);

			
			    if ( (currentStart.after(calendar3.getTime()) && currentStart.before(calendar4.getTime()) ) || 
			    		(currentEnd.after(calendar3.getTime()) && currentEnd.before(calendar4.getTime()) ) ) {
			    	
			    	System.out.println("EMPLOYEE ENGAGED \n");
			    	json.setResponse("EmployeeEngaged");
			    	break;
			    	
			    }
			    
			    
			    
			
		}
			
		

		
		
			//UPDATING APPOINTMNETS VIA POPUP
		
		if(!json.getResponse().equals("EmployeeEngaged")) {
			
				String queryUpdateAppointmentDetils=AppointmentsQueryConstants.UPDATE_APPOINTMENT_VIA_POPUP;
				PreparedStatement preparedStmtUpdateAppointmentDetails=connection.prepareStatement(queryUpdateAppointmentDetils);
				preparedStmtUpdateAppointmentDetails.setString(1, json.getCustomerName());
				preparedStmtUpdateAppointmentDetails.setString(2, json.getMobileNo());
				preparedStmtUpdateAppointmentDetails.setString(3, json.getAppointmentDate());
				preparedStmtUpdateAppointmentDetails.setString(4, json.getAppointmentTime());
				preparedStmtUpdateAppointmentDetails.setString(5, json.getAppointmentEndTime());
				preparedStmtUpdateAppointmentDetails.setString(6, json.getService());
				preparedStmtUpdateAppointmentDetails.setString(7, json.getEmployeedetails());
				preparedStmtUpdateAppointmentDetails.setString(8, json.getAppointmentId());
				preparedStmtUpdateAppointmentDetails.setString(9, json.getCompanyId());
				
				int rsCount=preparedStmtUpdateAppointmentDetails.executeUpdate();
			
				System.out.println("RS COUNT :"+rsCount);
				if(rsCount>0) {
					json.setResponse("Success");
				}

				json.setDate(json.getCurrentDate());
				
				
			unconfirmedAppointmentList=UnConfirmedAppointmentDetails(json);
			System.out.println("TODAY DATE :"+json.getDate());
			
			json.setAppointmentDetails(unconfirmedAppointmentList);
			
		}

			connection.close(); 
	}
		catch (Exception e) {
			e.printStackTrace();
	} finally {
			
		
	}
		return json;

	}

}
