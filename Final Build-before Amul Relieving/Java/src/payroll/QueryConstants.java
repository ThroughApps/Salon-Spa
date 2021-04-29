package payroll;

public class QueryConstants {
	
  

	//-------QUERY FOR GETTING EMP DETAILS ------//
	
	public static final String SELECT_EMP_SALARY_DATA = "SELECT StaffId FROM SalaryTable WHERE SalaryMonth = ? AND StaffId = ? AND Status = '0' and  companyId= ? ";

	public static final String SELECT_EMP_PRESENT_COUNT = "SELECT Count(staffId) AS PresentDays FROM AttendanceTable WHERE Status = 'Present' AND StaffId = ? AND date(date) BETWEEN ? and ?  and companyId= ?  " ;
	
	public static final String SELECT_EMP_ABSENT_COUNT = "SELECT Count(StaffId) AS AbsentDays FROM AttendanceTable WHERE Status = 'Absent' AND StaffId = ? AND date(date) BETWEEN ? and ? and companyId= ? " ;
	
	public static final String SELECT_EMP_LEAVE_COUNT = "SELECT Count(StaffId) AS LeaveDays FROM AttendanceTable WHERE Status = 'Leave' AND StaffId = ? AND date(date) BETWEEN ? and ? and companyId= ?" ;
	
	public static final String SELECT_EMP_HOLIDAY_COUNT = "SELECT Count(StaffId) AS HolidayDays FROM AttendanceTable WHERE Status = 'Holiday' AND StaffId = ? AND date(date) BETWEEN ? and ? and companyId= ?" ;

	
	//Sandy
	public static final String SELECT_EMP_SALARY_CALC="SELECT salary FROM StaffTable WHERE StaffId = ?  and companyId= ? ";
	
	//--------QUERY FOR INSERTING SALARY INTO DB ----------//
	
	public static final String SELECT_EMP_NAME = "SELECT StaffName FROM StaffTable WHERE StaffId = ? and companyId= ? ";
	
	public static final String INSERT_EMP_SALARY_DATA = "INSERT INTO SalaryTable(StaffId,SalaryMonth,CompanyWorkingHrs,"
			+ "TotalDays,PresentDays,AbsentDays,LeaveDays,HolidayDays,TotalWorkingHrs,GeneralWorkingHrs,"
			+ "OTWorkingHrs,CompanyWorkingHrsSalary,CompanyOTWorkingHrsSalary,empTotalWorkingHrsSalary,StaffName,companyId)VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)" ;

	
	//----------QUERY FOR PAYROLL REPORT ----------//
	
	public static final String SELECT_EMP_SALARY = "SELECT StaffId,StaffName,SalaryMonth,TotalWorkingHrs,GeneralWorkingHrs,OTWorkingHrs,empTotalWorkingHrsSalary FROM SalaryTable WHERE Status ='0' and companyId= ? ";

	public static final String DELETE_EMP_SALARY = "UPDATE SalaryTable SET Status = '1' WHERE StaffId = ? AND SalaryMonth = ? and companyId= ?  ";

	public static final String SELECT_EMP_DETAIL = "SELECT Address,ContactNo FROM StaffTable WHERE StaffId = ? and companyId= ?";

	public static final String SELECT_EMP_SALARY_VIEW = "SELECT *FROM SalaryTable WHERE StaffId = ? AND SalaryMonth = ?  and status='0' and companyId= ? ";

	
	

}