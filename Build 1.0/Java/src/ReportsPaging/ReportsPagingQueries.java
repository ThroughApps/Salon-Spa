package ReportsPaging;

public interface ReportsPagingQueries {

	/* MAINTENANCE REPORT QUERIES */
	String EMP_MAINTENANCE_REPORT="SELECT EmployeeId,FirstName,LastName,Type,"
			+ "Department,Role,MobileNo from EmployeeTable  where  CompanyId  = ? And"
			+ " Status=0 and Role <> 'TAPropertier'  limit ? , ?";
	

	/*AUDIT REPORT QUERIES */
	String EMP_SELECT_AUDIT_REPORT="SELECT SuperiorId,Name,Role,Operation,"
			+ "EmployeeId,date(date) as date,time(date) as time from AuditReport where "
			+ "CompanyId = ? And   date(Date) BETWEEN ? AND ?   limit ? , ?";
	
	
	/*MESSAGE CENTER QUERIES */
	String EMP_MESSAGE_CENTER_REPORT="SELECT SuperiorId,Name,Role,Type,"
			+ "SendTo,MessageSent,date(date) as date,time(date) as time "
			+ "from MessageCenterTable where CompanyId = ? And   date(Date) BETWEEN ? AND ? limit ?,? ";
	
	
	/*DEVICE REPORT QUERIES */
	String SELECT_ONE_DEVICE_REPORT= "select *from DeviceReport where CompanyId = ? AND "
			+ "date(Date) BETWEEN ? AND ? limit ?,? ";


	
	/*
	 * QUERY FOR GETTING EMPLOYEE SHIFTWISE REPORT
	 */
	
	/*String EMP_MAINTENANCE_SHIFT_REPORT="SELECT EmployeeId,CONCAT(FirstName,' ',LastName) AS Name,Type,"
			+ "Department,Role,MobileNo,shift,PreviousLocation,CurrentLocation from EmployeeTable  where  CompanyId  = ? And"
			+ " Status=0 and shift= ? and Role <> 'TAPropertier'  LIMIT ?,? ";
	*/

	
	String EMP_MAINTENANCE_SHIFT_REPORT="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,"
			+" SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,"
			+" CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode from ShiftReportDataTable "
			+" SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId "
			+" where  SRDT.CompanyId  = ? And SRDT.Status=0 and SRDT.Role <> 'Propertier'  and SRDT.Role <> 'TAPropertier' "
			+" AND date(SRDT.Date) = ? AND SRDT.Shift = ? LIMIT ?,?";
	
	
	String EMP_MAINTENANCE_REPORT_COUNT = "SELECT Count(EmployeeId) AS EmpCount from ShiftReportDataTable  where  CompanyId  = ? And " 
					+" Status=0 and shift=? and date(Date) = ? and Role <> 'Propertier' and Role <> 'TAPropertier' " ;
	String EMP_MAINTENANCE_REPORT_COUNT_Emp = "SELECT Count(EmployeeId) AS EmpCount from EmployeeTable  where  CompanyId  = ? And " 
			+" Status=0 and shift=? and Role <> 'Propertier' and Role <> 'TAPropertier'  " ;

	
	String EMP_MAINTENANCE_REPORT_EMPID = "SELECT EmployeeId from ShiftReportDataTable  where  CompanyId  = ? And " 
			+" Status=0 and shift=?  and Role <> 'Propertier' and Role <> 'TAPropertier'  LIMIT ?,?  " ;
	
	
	String EMP_MAINTENANCE_REPORT_COUNT_AllShift = "SELECT Count(EmployeeId) AS EmpCount from EmployeeTable  where  CompanyId  = ? And " 
					+" Status=0  and Role <> 'Propertier' and Role <> 'TAPropertier'  " ;
	
	String EMP_MAINTENANCE_SHIFT_REPORT_All="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,"
			+" SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.ShiftSupervisorId,"
			+" CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode from ShiftReportDataTable "
			+" SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId"
			+" where  SRDT.CompanyId  = ? And SRDT.Status=0 and SRDT.Role <> 'Propertier' and SRDT.Role <> 'TAPropertier' "
			+"  LIMIT ?,?";
	
	
	
	String EMP_MAINTENANCE_REPORT_COUNT_All = "SELECT Count(EmployeeId) AS EmpCount from EmployeeTable  where  CompanyId  = ? And " 
					+" Status=0 and Role <> 'Propertier' and  Role <> 'TAPropertier' " ;
	
	
	String All_Shift="select count( employeeid) as empCount,shift from EmployeeTable where companyId=? and Status=0  and Role <> 'Propertier' and Role <> 'TAPropertier'  group by shift";
	
	String Grade_Shift="select grade,employeecode from EmployeeTable where companyid=? and shift=? and status=0";
	
	/*
	 * QUERY FOR GETTING EMPLOYEE DATEWISE SHIFT HISTORY REPORT
	 */
	

	String EMP_DATE_WISE_SHIFT_HISTORY_COUNT = "SELECT Count(DISTINCT EmployeeId) AS EmpCount from EmployeeTable  where  CompanyId  = ? And " 
					+" Status=0 and Role <> 'Propertier' and Role <> 'TAPropertier'   " ;
	
	
	String EMP_DATE_WISE_SHIFT__EMP_ID = "SELECT distinct EmployeeId FROM EmployeeTable WHERE CompanyId = ? AND Status = 0 "
			+ " AND Role <>  'TAPropertier'  AND Role <>  'Propertier' order by CAST(EmployeeId AS UNSIGNED) LIMIT ?,? ";
	
	String EMP_DATE_WISE_SHIFT_HISTORY_REPORT="SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type," + 
			 "SRDT.Department,SRDT.Role,SRDT.shift,SRDT.CurrentLocation,SRDT.grade,SRDT.EmpCode,SRDT.ShiftSupervisorId,CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName from ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId=ET.employeeId and SRDT.CompanyId=ET.CompanyId where  SRDT.CompanyId  = ? And" + 
				 " SRDT.Status=0 and SRDT.Role <> 'Propertier' and SRDT.Role <> 'TAPropertier' AND date(SRDT.Date) = ?  LIMIT ?,? ";


	/*
	 * QUERY FOR GETTING EMPLOYEE PERIOD WISE SHIFT HISTORY REPORT
	 */
	
	String EMP_PERIOD_WISE_SHIFT_HISTORY_COUNT = "SELECT Count(DISTINCT EmployeeId) AS EmpCount from EmployeeTable  where  CompanyId  = ? And  Status=0 and Role <> 'Propertier' and Role <> 'TAPropertier'  " ;
				

	String EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT_EMP_ID = "SELECT EmployeeId FROM EmployeeTable WHERE CompanyId = ? AND Status = 0 "
			+ " AND Role <>  'TAPropertier' AND Role <>  'Propertier' order by CAST(EmployeeId AS UNSIGNED) LIMIT ?,? ";
	String VACENCY_EMP_COUNT="SELECT Count(DISTINCT employeeid) AS EmpCount FROM EmployeeTable WHERE status=0 and role<>'propertier' and role<>'tapropertier' and companyid=? and employeeid NOT IN (SELECT DISTINCT employeeid FROM ShiftReportDataTable where date=?)";
	String EMP_VACENCY_REPORT_EMP_ID="SELECT DISTINCT EmployeeId  FROM EmployeeTable WHERE status=0 and role<>'propertier' and role<>'tapropertier' and companyid=? and employeeid NOT IN (SELECT DISTINCT employeeid FROM ShiftReportDataTable where date=?) LIMIT ?,?";

	
	
	String EMP_VACENCY_REPORT1 = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.EmployeeId = ? ORDER BY CAST(EmployeeId AS UNSIGNED),SRDT.Date ";
	
	String EMP_VACANCY_REPORT_Emp="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.employeeid = ? AND status=0 ORDER BY CONVERT(SUBSTRING(SRDT.EmployeeId, 6), SIGNED INTEGER)  ";

	String EMP_PERIOD_WISE_SHIFT_HISTORY_REPORT = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.EmployeeId = ? ORDER BY SRDT.EmployeeId,SRDT.Date";

	String SELECT_EMP_PREV_SHIFT_PERIOD_SHIFT_HISTORY = "select EmployeeId, name,"
			+ " Type,Department,Shift,MAX(date(Date) )AS Date,"
			+ " CurrentLocation from ShiftReportDataTable where CompanyId = ? and"
			+ " date(Date) < ?  and  currentLocation <> ? and "
			+ "EmployeeId =  ? GROUP BY EmployeeId,Date DESC Limit 1 " ;
	   
	
	
	
	/*MONTH WISE SHIFT HISTORY REPORT QUERIES */
	
	String EMP_MONTH_WISE_SHIFT_HISTORY_COUNT =  "SELECT Count(DISTINCT EmployeeId) AS EmpCount from EmployeeTable  where  CompanyId  = ? And " 
			+" Status=0 and Role <> 'Propertier' and Role <> 'TAPropertier' " ;
	
	
		String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT1 = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.EmployeeId = ? ORDER BY CAST(EmployeeId AS UNSIGNED),SRDT.Date";
	
	
	String EMP_SHIFT_WISE__REPORT1 = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.shift=? ORDER BY SRDT.EmployeeId,SRDT.Date LIMIT ?,?";
	
	String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,"
			+" SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId,"
			+" CONCAT(ET.FirstName,' ',ET.LastName) as supervisorName,SRDT.grade,SRDT.EmpCode from "
			+" ShiftReportDataTable SRDT INNER JOIN EmployeeTable ET ON SRDT.ShiftSupervisorId= ET.employeeId and SRDT.CompanyId=ET.CompanyId"
			+" WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.EmployeeId = ? "
			+" ORDER BY SRDT.EmployeeId,SRDT.Date" ;
	
String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.employeeid = ? AND status=0 ORDER BY CONVERT(SUBSTRING(SRDT.EmployeeId, 6), SIGNED INTEGER) ";

String EMP_MONTH_WISE_SHIFT_HISTORY_REPORT_Emp1="SELECT SRDT.EmployeeId,CONCAT(SRDT.FirstName,' ',SRDT.LastName) as Name,SRDT.Type,SRDT.Department,SRDT.Shift,SRDT.CurrentLocation, SRDT.ReportingManagerId,SRDT.grade,SRDT.EmployeeCode from EmployeeTable SRDT  WHERE SRDT.CompanyId = ?  AND SRDT.shift = ? AND status=0 ORDER BY SRDT.EmployeeId LIMIT ?,?";



String GET_SUPERVISOR="SELECT CONCAT(FirstName,' ',LastName) as supervisorName FROM EmployeeTable where companyid=? and employeeid=?";
	

String GET_SHIFT_LOC="SELECT CONCAT(SiteName,'-',Area,'-',Location) as CurrentLocation FROM ShiftConfig where companyid=? and ShiftType=1";

	//for previous month
	String SELECT_EMP_PREV_SHIFT = "select EmployeeId, name,Type,Department,Shift,Date ,CurrentLocation from ShiftReportDataTable where CompanyId = ? and date(Date) = ? and EmployeeId =  ? " ;
	   
	
	String SELECT_EMP_PREV_SHIFT1 = "select EmployeeId, name,Type,Department,Shift,Date ,CurrentLocation from ShiftReportDataTable where CompanyId = ? and date(Date) < ? and EmployeeId =  ?" ;
	
	/*
	 * QUERY FOR GETTING TOTAL NO.OF.SHIFT
	 */
	String Select_Shift = "select ShiftType,SiteName,Area,Location from ShiftConfig where companyId= ? and status = 0 ";
	String Select_Supervisor_Details = "select distinct shiftsupervisorid from ShiftReportDataTable where companyId= ? and status = 0 order by CAST(shiftsupervisorid AS UNSIGNED) ";


String select_expired_report="select shiftType,startDate,endDate,CONCAT(shiftType,':',SiteName,'-',Area,'-',Location) as CurrentLocation,Description from ShiftConfig where companyid=? and status=3 and ((startdate between ? and ?)or (enddate between ? and ?) ) LIMIT ?,?";
	
String select_expired_report_Excel="select shiftType,startDate,endDate,CONCAT(shiftType,':',SiteName,'-',Area,'-',Location) as CurrentLocation,Description from ShiftConfig where companyid=? and status=3 and ((startdate between ? and ?)or (enddate between ? and ?) ) ";

String select_deleted_shift="select shiftType,startDate,endDate,status,CONCAT(shiftType,':',SiteName,'-',Area,'-',Location) as CurrentLocation,Description  from ShiftConfig where companyid= ? and status<>0 and status<>3 and ((startdate between ? and ?)or (enddate between ? and ?) ) LIMIT ?,?";


String select_deleted_shift_Excel="select shiftType,startDate,endDate,status,CONCAT(shiftType,':',SiteName,'-',Area,'-',Location) as CurrentLocation,Description from ShiftConfig where companyid= ? and status<>0 and status<>3 and ((startdate between ? and ?)or (enddate between ? and ?) )";

String Shift_Count =  "SELECT Count(shiftType) AS shiftCount from ShiftConfig  where  CompanyId  = ? And " 
		+" Status=3 and ((startdate between ? and ?)or (enddate between ? and ?) ) " ;


String Shift_Count_Delete =  "SELECT Count(shiftType) AS shiftCount from ShiftConfig  where  CompanyId  = ? And " 
		+" Status<>0 and status<>3 and ((startdate between ? and ?)or (enddate between ? and ?) ) " ;


String Select_ShiftType =  "SELECT shiftType,startDate,endDate from ShiftConfig  where  CompanyId  = ? And " 
		+" Status=1 LIMIT ?,? " ;


String EMP_SUPERVISOR_BASED_COUNT =  "SELECT Count(DISTINCT EmployeeId) AS EmpCount from ShiftReportDataTable  where  CompanyId  = ? And " 
		+" Status=0 and shiftsupervisorid=? and (date between ? and ?) and Role <> 'Propertier' AND Role <>  'TAPropertier' " ;

String EMP_SUPERVISOR_BASED_EMP_ID = "SELECT DISTINCT EmployeeId FROM ShiftReportDataTable WHERE CompanyId = ? AND Status = 0 "
		+ " AND Role <>  'TAPropertier' AND Role <>  'Propertier' and shiftsupervisorid=? and (date between ? and ?) order by CAST(EmployeeId AS UNSIGNED) LIMIT ?,? ";

String EMP_SUPERVISOR_BASED_COUNT_ALL =  "SELECT Count(DISTINCT EmployeeId) AS EmpCount from ShiftReportDataTable  where  CompanyId  = ? And " 
		+" Status=0  and (date between ? and ?) and Role <> 'Propertier' AND Role <>  'TAPropertier' " ;

String EMP_SUPERVISOR_BASED_EMP_ID_ALL = "SELECT DISTINCT EmployeeId FROM ShiftReportDataTable WHERE CompanyId = ? AND Status = 0 "
		+ " AND Role <>  'TAPropertier' AND Role <>  'Propertier' and (date between ? and ?) order by CAST(EmployeeId AS UNSIGNED) LIMIT ?,? ";


String EMP_SUPERVISOR_REPORT = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ? AND Role <>  'TAPropertier' AND Role <>  'Propertier' and SRDT.Date =? AND SRDT.employeeid = ?  AND SRDT.ShiftSupervisorId = ? ORDER BY CAST(EmployeeId AS UNSIGNED),SRDT.Date";

String EMP_SUPERVISOR_REPORT1 = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ? AND Role <>  'TAPropertier' AND Role <>  'Propertier' and SRDT.Date =? AND SRDT.employeeid = ?  ORDER BY CAST(EmployeeId AS UNSIGNED),SRDT.Date";


String ScheduledShiftReport_Count="select ShiftLoop,TimingsLoop,DescriptionLoop,WorkLocationLoop,FromDate,ToDate,ShiftDescription from ShiftAutomationTable where companyId=? and fromdate>? and status=0";

String ScheduledShiftReport="select ShiftLoop,TimingsLoop,DescriptionLoop,WorkLocationLoop,FromDate,ToDate,ShiftDescription from ShiftAutomationTable where companyId=? and fromdate>? and status=0 LIMIT ?,?";

//String EMP_SUPERVISOR_REPORT = "SELECT SRDT.EmployeeId,SRDT.Name,SRDT.Type,SRDT.Department,SRDT.Shift,date(SRDT.Date) AS Date,SRDT.CurrentLocation, SRDT.ShiftSupervisorId, SRDT.grade,SRDT.EmpCode from ShiftReportDataTable SRDT WHERE SRDT.CompanyId = ?  and SRDT.Date =? AND SRDT.ShiftSupervisorId = ? ORDER BY CAST(SRDT.EmployeeId AS UNSIGNED),SRDT.Date";



}
