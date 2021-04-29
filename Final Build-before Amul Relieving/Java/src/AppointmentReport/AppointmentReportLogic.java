package AppointmentReport;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;

import Appointments.AppointmentsJSON;
import Appointments.AppointmentsQueryConstants;
import DBUtil.DatabaseUtil;

public class AppointmentReportLogic {

	
	/*
	 * FUNCTION FOR GETTING FUTURE APPOINTMENTS FROM CURRENT DATE
	 */
	public static ArrayList<AppointmentReportJSON> GetFutureAppointment(AppointmentReportJSON json) {
		Connection connection=null;
		ArrayList <AppointmentReportJSON> futureAppointmentList=new ArrayList <AppointmentReportJSON>();
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			//GETTING FUTURE APPOINTMENT DETAILS
			
			
			String querySelectFutureAppointments=AppointmentReportQueryConstants.GET_FUTURE_APPOINTMENT_DATA;
			PreparedStatement preparedStmtFutureAppointments=connection.prepareStatement(querySelectFutureAppointments);
			preparedStmtFutureAppointments.setString(1,json.getCompanyId());
			preparedStmtFutureAppointments.setString(2,json.getDate());
			ResultSet rsFutureAppointments=preparedStmtFutureAppointments.executeQuery();
			while(rsFutureAppointments.next()) {
				AppointmentReportJSON futureAppointmentDetails=new AppointmentReportJSON();
				futureAppointmentDetails.setCustomerName(rsFutureAppointments.getString("CustomerName"));
				futureAppointmentDetails.setMobileNo(rsFutureAppointments.getString("ContactNo"));
				futureAppointmentDetails.setGender(rsFutureAppointments.getString("Gender"));
				futureAppointmentDetails.setBookingDate(rsFutureAppointments.getString("BookingDate"));
				futureAppointmentDetails.setAppointmentDate(rsFutureAppointments.getString("AppointmentDate"));
				futureAppointmentDetails.setAppointmentTime(rsFutureAppointments.getString("AppointmentTime"));
				futureAppointmentDetails.setService(rsFutureAppointments.getString("Service"));
				futureAppointmentDetails.setEmployeedetails(rsFutureAppointments.getString("EmployeeDetails"));
				futureAppointmentDetails.setAppointmentBy(rsFutureAppointments.getString("AppointmentBy"));
				futureAppointmentDetails.setModeofAppointment(rsFutureAppointments.getString("ModeOfAppointment"));
				futureAppointmentDetails.setAppointmentEndTime(rsFutureAppointments.getString("AppointmentEndTime"));
				futureAppointmentDetails.setStatus(rsFutureAppointments.getString("Status"));
				futureAppointmentDetails.setDescription(rsFutureAppointments.getString("Description"));
				futureAppointmentList.add(futureAppointmentDetails);
			
			
			}
			
			
			
			connection.close(); 
			
	
		
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return futureAppointmentList;
		
	}

	
	/*
	 * FUNCTION FOR GETTING APPOINTMENT HISTORY
	 */
	public static ArrayList<AppointmentReportJSON> GetAppointmentHistory(AppointmentReportJSON json) {
		Connection connection=null;
		ArrayList <AppointmentReportJSON> AppointmentHistoryList=new ArrayList <AppointmentReportJSON>();
		
			
		try {
			connection=DatabaseUtil.getDBConnection();
			
			//GETTING FUTURE APPOINTMENT DETAILS
			
			
			String querySelectAppointmentsHistory=AppointmentReportQueryConstants.GET_APPOINTMENT_HISTORY_DATA;
			PreparedStatement preparedStmtAppointmentsHistory=connection.prepareStatement(querySelectAppointmentsHistory);
			preparedStmtAppointmentsHistory.setString(1,json.getCompanyId());
			preparedStmtAppointmentsHistory.setString(2,json.getFromDate());
			preparedStmtAppointmentsHistory.setString(3,json.getToDate());
			
			ResultSet rsAppointmentsHistory=preparedStmtAppointmentsHistory.executeQuery();
			while(rsAppointmentsHistory.next()) {
				AppointmentReportJSON AppointmentHistoryDetails=new AppointmentReportJSON();
				AppointmentHistoryDetails.setCustomerName(rsAppointmentsHistory.getString("CustomerName"));
				AppointmentHistoryDetails.setMobileNo(rsAppointmentsHistory.getString("ContactNo"));
				AppointmentHistoryDetails.setGender(rsAppointmentsHistory.getString("Gender"));
				AppointmentHistoryDetails.setBookingDate(rsAppointmentsHistory.getString("BookingDate"));
				AppointmentHistoryDetails.setAppointmentDate(rsAppointmentsHistory.getString("AppointmentDate"));
				AppointmentHistoryDetails.setAppointmentTime(rsAppointmentsHistory.getString("AppointmentTime"));
				AppointmentHistoryDetails.setService(rsAppointmentsHistory.getString("Service"));
				AppointmentHistoryDetails.setEmployeedetails(rsAppointmentsHistory.getString("EmployeeDetails"));
				AppointmentHistoryDetails.setAppointmentBy(rsAppointmentsHistory.getString("AppointmentBy"));
				AppointmentHistoryDetails.setModeofAppointment(rsAppointmentsHistory.getString("ModeOfAppointment"));
				AppointmentHistoryDetails.setAppointmentEndTime(rsAppointmentsHistory.getString("AppointmentEndTime"));
				AppointmentHistoryDetails.setStatus(rsAppointmentsHistory.getString("Status"));
				AppointmentHistoryDetails.setDescription(rsAppointmentsHistory.getString("Description"));
				AppointmentHistoryList.add(AppointmentHistoryDetails);
			
			
			}
			
			
			
			connection.close(); 
			
	
		
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		
		return AppointmentHistoryList;
	}

}
