package attendance;

public interface QueryConstants {
	String SELECT_STATUS= "select status from AttendanceTable WHERE staffId = ? And date = ? ";
	
	String Attendance_Insert="insert into AttendanceTable(staffId,staffName,contactNo,status,date)values(?,?,?,?,?)";
 
	String Attendance_Update="update AttendanceTable set status=? where staffId=? and StaffName = ? and date(date)=? and companyId= ? ";

	String Attendance=" SELECT  S.staffId ,S.staffName, S.address,S.contactNo,S.roleName,S.salary,A.status FROM StaffTable S INNER JOIN AttendanceTable A ON S.staffId=A.staffId Where date = ? ";
	
	String StaffId="select staffId from StaffTable and status='0' ";
	
	String Staff_Details=" SELECT staffId ,staffName, address,contactNo,roleName,salary FROM StaffTable and status='0'";
	
	//Attendance Query by sandy
	String Staff_Attendance="Select * from AttendanceTable where Date(date) = ? and companyId= ? And roleName <> 'Proprietor'";
	
	//report by sandy
	String STAFF_MONTHLYREPORT="SELECT EA.StaffId,EA.StaffName,date(Date) as Date,EA.Status, "  
       		+"E.roleName FROM StaffTable E INNER JOIN AttendanceTable EA ON EA.StaffId=E.StaffId  WHERE month(Date) = ? AND year(Date) = ? and EA.companyId= ? And E.roleName <> 'Proprietor' ORDER BY  EA.staffId,EA.date " ;
	
	
	String STAFF_PERIODREPORT="SELECT EA.StaffId,EA.StaffName,date(Date) as Date,EA.Status,"
       		+"E.roleName FROM StaffTable E INNER JOIN AttendanceTable EA ON EA.StaffId=E.StaffId  WHERE date(Date) BETWEEN ? AND ? and EA.companyId= ? And E.roleName <> 'Proprietor'  ORDER BY EA.staffId";

	
}
