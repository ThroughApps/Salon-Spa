package ExcelDownload;

public interface ExcelDownloadQueryConstants {

	/*QUERY FOR MAINTENANCE REPORT */
	String EMP_MAINTENANCE_REPORT="SELECT EmployeeId,FirstName,LastName,Type,Department,Role,MobileNo from EmployeeTable  where  CompanyId  = ? And Status=0 and Role <> 'TAPropertier'  ";
	
	
	/*QUERY FOR AUDIT REPORT */
	String EMP_SELECT_AUDIT_REPORT="SELECT SuperiorId,Name,Role,Operation,EmployeeId,date(date) as date,time(date) as time from AuditReport where CompanyId = ? And   date(Date) BETWEEN ? AND ?";
	
	/*QUERY FOR DEVICE REPORT */
	String SELECT_ONE_DEVICE_REPORT= "select *from DeviceReport where CompanyId = ? AND date(Date) BETWEEN ? AND ? ";

	/*QUERY FOR MESSAGECENTER REPORT EMAIL */
	String EMP_MESSAGE_CENTER_REPORT_EMAIL="SELECT SuperiorId,Name,Role,Type,SendTo,MessageSent,date(date) as date,time(date) as time from MessageCenterTable where CompanyId = ? And  Type='Email' and  date(Date) BETWEEN ? AND ? and Type='Email'  ";

	/*QUERY FOR MESSAGECENTER REPORT SMS */
	String EMP_MESSAGE_CENTER_REPORT_SMS="SELECT SuperiorId,Name,Role,Type,SendTo,MessageSent,date(date) as date,time(date) as time from MessageCenterTable where CompanyId = ? And   Type='Text Message' and date(Date) BETWEEN ? AND ? ";

	String MSG_CENTER_COUNT="Select Sum(SMSCount) as  SMSCount from EmployeeAttendanceTable where CompanyId = ? And   date(Date) BETWEEN ? AND ?";
	
	String CHECKINOUT_MSG_COUNT="Select Sum(SMSCount) as  SMSCount from MessageCenterTable where CompanyId = ? And   date(Date) BETWEEN ? AND ?";


	/*QUERY FOR TRIP HISTORY REPORT */
	String TRIP_HISTORY_REPORT="SELECT CompanyId,DeviceId,VehicleName,VehicleNumber,EmployeeId,EmployeeName,TripNo,TripStartTime,"
			+ "TripStartLocation,TripEndTime,TripEndLocation,Date(date) as StartDate ,Date(EndDate) as EndDate, "
			+ "Location,TotalTripTime from DeviceTripTable where "
			+ "CompanyId = ? And   date(Date) BETWEEN ? AND ? ";
	
	
	/*QUERY FOR SHIFT WISE REPORT */
	
	String EMP_MAINTENANCE_SHIFT_REPORT="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode,date(SRDT.Date) AS Date  from ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId  and SRDT.CompanyId=ET.CompanyId where   SRDT.CompanyId  = ? And SRDT.Status=0 And SRDT.shift= ? AND date(SRDT.Date) = ? and SRDT.Role <> 'Propertier' and SRDT.Role <> 'TAPropertier'";
	
	String EMP_MAINTENANCE_SHIFT_REPORT1="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode,date(SRDT.Date) AS Date  from ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId  where   SRDT.CompanyId  = ? And SRDT.Status=0 AND date(SRDT.Date) = ? and SRDT.Role <> 'Propertier' and SRDT.Role <> 'TAPropertier' ";
	
	/*QUERY FOR DATE WISE SHIFT HISTORY REPORT */
	String EMP_DATE_WISE_SHIFT_HISTORY_REPORT="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode,date(SRDT.Date) AS Date  from ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId where  SRDT.CompanyId  = ? And SRDT.Status=0 and SRDT.Role <> 'Propertier' and SRDT.Role <> 'TAPropertier' AND date(SRDT.Date) = ?; ";

	/*QUERY FOR PERIOD WISE SHIFT HISTORY REPORT */
	String EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT ="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode,date(SRDT.Date) AS Date  from ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId where  SRDT.CompanyId  = ? And SRDT.Status=0  and SRDT.Role <> 'Propertier' and SRDT.Role <> 'TAPropertier' AND date(SRDT.Date) BETWEEN ? AND ? ORDER BY SRDT.EmployeeId,SRDT.Date ";

	/*QUERY FOR MONTH WISE SHIFT HISTORY REPORT */

	String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode,date(SRDT.Date) AS Date  from ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId where  SRDT.CompanyId  = ?  AND month(SRDT.Date) = ? AND year(SRDT.Date)= ? ORDER BY SRDT.EmployeeId,SRDT.Date; ";
	
	String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1 = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? and employeeid=? ORDER BY SRDT.EmployeeId,SRDT.Date";
	String EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID = "SELECT distinct EmployeeId FROM EmployeeTable WHERE CompanyId = ? and Status = 0 "
			+ " AND Role <>  'TAPropertier' ";
	
	
	String GET_SHIFT_LOC="SELECT CONCAT(SiteName,Area,Location) as CurrentLocation FROM ShiftConfig where companyid=? and ShiftType=1";

	//for previous month
	String SELECT_EMP_PREV_SHIFT = "select EmployeeId, name,Type,Department,Shift,Date ,CurrentLocation from ShiftReportDataTable where CompanyId = ? and date(Date) = ? and EmployeeId =  ? " ;
	   
	
	String SELECT_EMP_PREV_SHIFT1 = "select EmployeeId, name,Type,Department,Shift,Date ,CurrentLocation from ShiftReportDataTable where CompanyId = ? and date(Date) < ? and EmployeeId =  ?" ;
	
	//String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.EmployeeId = ? ORDER BY SRDT.EmployeeId";

	String GET_SUPERVISOR="SELECT CONCAT(FirstName,' ',LastName) as supervisorName FROM EmployeeTable where companyid=? and employeeid=?";
		
	/*String SELECT_EMP_PREV_SHIFT = "select EmployeeId, name,Type,Department,Shift,"
			+ "MAX(date(Date) )AS Date,CurrentLocation"
			+ " from ShiftReportDataTable where CompanyId = ? "
			+ " and date(Date) < ? and currentLocation <> ? and EmployeeId =  ? GROUP BY EmployeeId,Date DESC Limit 1 " ;
	*/
	
	String EMP_SHIFT_WISE__REPORT1 = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.shift=? ORDER BY SRDT.EmployeeId,SRDT.Date";
	
	String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.employeeid = ? AND status=0 ORDER BY SRDT.EmployeeId ";

	String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp1="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.shift = ? AND status=0 ORDER BY SRDT.EmployeeId ";

	String EMP_DATE_WISE_SHIFT__EMP_ID = "SELECT EmployeeId FROM EmployeeTable WHERE CompanyId = ? AND Status = 0 "
			+ " AND Role <>  'TAPropertier' ";
	
	String EMP_SUPERVISOR_BASED_EMP_ID = "SELECT DISTINCT EmployeeId FROM ShiftReportDataTable WHERE CompanyId = ? AND Status = 0 "
			+ " AND Role <>  'TAPropertier' and shiftsupervisorid=? and (date between ? and ?) order by CAST(EmployeeId AS UNSIGNED)  ";

	
	String EMP_SUPERVISOR_BASED_EMP_ID_ALL = "SELECT DISTINCT EmployeeId FROM ShiftReportDataTable WHERE CompanyId = ? AND Status = 0 "
			+ " AND Role <>  'TAPropertier' and (date between ? and ?) order by CAST(EmployeeId AS UNSIGNED)";


	String EMP_VACENCY_REPORT_EMP_ID="SELECT DISTINCT EmployeeId  FROM EmployeeTable WHERE status=0 and role<>'propertier' and role<>'tapropertier' and companyid=? and employeeid NOT IN (SELECT DISTINCT employeeid FROM ShiftReportDataTable where date=?) ";
	String EMP_VACANCY_REPORT_Emp="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.employeeid = ? AND status=0 ORDER BY CONVERT(SUBSTRING(SRDT.EmployeeId, 6), SIGNED INTEGER)  ";


	
}
