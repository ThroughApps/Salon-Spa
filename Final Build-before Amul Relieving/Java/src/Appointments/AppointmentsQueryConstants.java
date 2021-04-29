package Appointments;

public interface AppointmentsQueryConstants {

	/*
	 * QUERY FOR GETTING SALOON DETAILS
	 */
	String GET_SALOON_NAME = "SELECT CompanyId,CompanyName FROM CompanyTable ";
	
	String GET_SERVICE_DETAILS = "SELECT ProductId,ProductName,ServiceTime FROM ProductTable WHERE Status = 0 and CompanyId = ? and ProductType = 'service' ";

	String GET_EMPLOYEE_DETAILS = "SELECT StaffId,StaffName FROM StaffTable WHERE CompanyId = ? and Status = 0 ";
	
	String GET_FUTURE_APPOINTMENT_DETAILS = "SELECT EmployeeDetails,AppointmentDate,AppointmentTime,AppointmentEndTime FROM AppointmentTable WHERE"
			+ " CompanyId = ? AND (Status = 0 OR Status = 2 OR Status = 4 ) AND date(AppointmentDate) >= ?" ;

	/*
	 * QUERY FOR MAKING AN APPOINTMENT BY Customer & Staff
	 */
	
	String CHECK_APPOINTMENT = "SELECT AppointmentTime,AppointmentEndTime FROM AppointmentTable WHERE "
			+ "CompanyId = ? AND EmployeeDetails = ? AND AppointmentDate = ? AND (Status = 0 OR Status = 2 OR Status = 4) ";
	
	String MAKE_APPOINTMENT = "INSERT INTO AppointmentTable(CompanyId,ContactNo,"
			+ "Gender,BookingDate,AppointmentDate,AppointmentTime,Service,EmployeeDetails,"
			+ "AppointmentBy,ModeOfAppointment,CustomerName,AppointmentEndTime,Status,Description)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	/*
	 * QUERY FOR GETTING APPOINTMENT DETAILS
	 */
	String GET_APPOINTMENT_DETAILS = "SELECT AppointmentId,CustomerName,ContactNo,Service,"
			+ "EmployeeDetails,AppointmentDate,AppointmentTime,AppointmentEndTime FROM "
			+ "AppointmentTable WHERE CompanyId = ? AND AppointmentDate BETWEEN ? AND ? AND (Status = 0 OR Status = 2 OR Status = 4 )";
	
	String GET_LAST_APPOINTMENT_DETAILS ="SELECT AppointmentDate "
			+ "from AppointmentTable WHERE CompanyId = ? AND (Status = 0 OR Status = 2 OR Status = 4 ) ORDER BY AppointmentDate DESC LIMIT 1  ";

	/*
	 * QUERY FOR UPDATING APPOINTMENT
	 */
	String UPDATE_APPOINTMENT = "UPDATE AppointmentTable SET AppointmentDate = ? ,AppointmentTime = ?,AppointmentEndTime = ? "
			+ " WHERE AppointmentId = ? AND CompanyId=  ? " ;

	

	String UPDATE_APPOINTMENT_VIA_POPUP = "UPDATE AppointmentTable SET CustomerName = ? ,ContactNo = ? ,"
			+ "AppointmentDate = ? ,AppointmentTime = ?,AppointmentEndTime = ?,Service = ? ,EmployeeDetails = ?  "
			+ " WHERE AppointmentId = ? AND CompanyId=  ? " ;
	
	
	/*
	 * QUERY FOR DELETING APPOINTMENT
	 */
	String DELETE_APPOINTMENT = "UPDATE AppointmentTable SET Status = 1 WHERE AppointmentId IN ($appointmentId) and CompanyId = ? ";


	/*
	 * QUERY FOR GETTING UNCONFIRMED APPOINTMENT DETAILS
	 */

	String GET_UN_CONFIRMED_APPOINTMENT_DATA ="SELECT CustomerName,ContactNo,Gender,BookingDate,AppointmentDate,"
			+ "AppointmentTime,Service,EmployeeDetails,AppointmentBy,"
			+ "ModeOfAppointment,AppointmentEndTime,"
			+ "AppointmentId FROM AppointmentTable WHERE CompanyId = ? AND date(AppointmentDate) >= ? AND Status = 0 ";

	/*
	 * QUERY FRO ACCEPTING APPOINTMENT
	 */
	String ACCEPT_APPOINTMENT = "UPDATE AppointmentTable SET Status = 2 WHERE AppointmentId IN ($appointmentId) and CompanyId = ? and Status = 0  ";

	/*
	 * QUERY FOR ACCEPTING / DENYING APPOINTMENTS
	 */
	String ACCEPT_DENY_APPOINTMENT = "UPDATE AppointmentTable SET Status = ?,Description = ?  WHERE AppointmentId = ? and CompanyId = ? and Status = 0 ";

	/*
	 * QUERY FOR ACCEPTING/REJECTING ALL APPOINTMENTS
	 */
	String ACCEPT_DENY_ALL_APPOINTMENT =  "UPDATE AppointmentTable SET Status = ?,Description = ?  "
			+ "WHERE date(AppointmentDate) IN ($appointmentDate) and CompanyId = ? and Status = 0 ";




}
