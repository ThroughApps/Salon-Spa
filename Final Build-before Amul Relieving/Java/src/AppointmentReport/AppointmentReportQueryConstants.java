package AppointmentReport;

public interface AppointmentReportQueryConstants {

	/*
	 * QUERY FOR GETTING FUTURE APPOINTMENT DATA FROM CURRENT DATE
	 */
	String GET_FUTURE_APPOINTMENT_DATA = "SELECT CustomerName,ContactNo,Gender,BookingDate,AppointmentDate,"
			+ "AppointmentTime,Service,EmployeeDetails,AppointmentBy,"
			+ "ModeOfAppointment,AppointmentEndTime,Status,Description FROM AppointmentTable WHERE CompanyId = ? AND date(AppointmentDate) >= ? ";
	
	/*
	 * QUERY FOR GETTING APPOINTMNET HISTORY DATA
	 */
	String GET_APPOINTMENT_HISTORY_DATA = "SELECT CustomerName,ContactNo,Gender,BookingDate,AppointmentDate,"
			+ "AppointmentTime,Service,EmployeeDetails,AppointmentBy,"
			+ "ModeOfAppointment,AppointmentEndTime,Status,Description FROM AppointmentTable WHERE CompanyId = ? AND date(AppointmentDate) BETWEEN ? AND  ? ";

	
	

}
