package staff;



public interface QueryConstants {
	
	  String DELETE_STAFF_TICTOKS="Update EmployeeTable set status='1' where mobileNo=? and companyId= ?  ";
	  
	
	   String Staff_Insert ="insert into StaffTable(staffName,address,city,contactNo,dob,gender,nationality,salary,joiningDate,roleName,emailId,companyId,staffId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
       String Staff_Report ="select staffId,staffName,address,contactNo,roleName,salary,city,dob,gender,religion,nationality,joiningDate,emailId from StaffTable where companyId= ? and status='0' and roleName <> 'Proprietor' ";
       
       String Salary_Insert="insert into SalaryTable(staffName,salary,pay,deduction,date,salaryMonth,remark) VALUES(?,?,?,?,?,?,?)";

       String Salary_Report ="select salaryId,staffName,salary,pay,deduction,date,remark from SalaryTable where companyId= ? ";
       
       String Staff_VERIFY="select staffName from StaffTable where staffName=? and status='0'";	
      	
       String Staff_VERIFY_MOBILENO="select contactNo from StaffTable where contactNo=? and companyId= ?  and status='0' ";
       
       String Staff_VERIFY_MAIL="select emailId from StaffTable where emailId=? and companyId= ?  and status='0' ";
       
     String DELETE_STAFF="Update StaffTable set status='1' where contactNo=? and companyId= ?  ";
     String DELETE_BANK ="Update BankTable set status='1' where accountNo=? and companyId= ?";
     
      // String Select_Staff ="select ST.staffId,A.staffId,staffName,status,count(status) AS NODAYS,address,contactNo,roleName,salary from StaffTable ST inner join AttendanceTable A on ST.staffId = A.staffId ";
       
     //  String LOGIN_VERIFY = "SELECT StaffId,ST.roleName,PT.roleName FROM StaffTable ST inner join PermissionTable PT on ST.roleName = PT.roleName WHERE ( EmailId = ? OR ContactNo = ? ) AND Password = ? ";

    //   String Select_Staff = "SELECT staffId,staffname,status, COUNT(status) FROM AttendanceTable  where staffid=4 and month(date)=12 group by status";

     String EmployeeList_UPDATE="UPDATE StaffTable SET address=?,city=?,contactNo=?,dob=?,gender=?,nationality=?,salary=?,roleName=?,emailId=? WHERE  staffId = ?  AND companyId= ?";

     
     String Bank_VERIFY_Acc="select accountNo from BankTable where accountNo=? and companyId= ?  and status='0' ";
     String Bank_Insert ="insert into BankTable(bankName,accountName,accountNo,branchName,ifscCode,companyId) VALUES(?,?,?,?,?,?)";
     String bank_Report ="select bankId,bankName,accountName,accountNo,branchName,ifscCode from BankTable where companyId= ? and status=0";
     String bank_UPDATE="UPDATE BankTable SET bankName=?,accountName=?,accountNo=?,branchName=?,ifscCode=? WHERE  bankId = ?  AND companyId= ? and status=0";

     String EMP_INSERT_SELECT = "SELECT MAX(EmployeeId) as EmployeeId FROM EmployeeTable where CompanyId = ?  ";
     
 	String INSERT_STAFF_TIC="Insert Into EmployeeTable(CompanyId,EmployeeId,FirstName,LastName,EmailId,MobileNo,Address,"+
			 "DOJ,DOEXP,Type,Department,Role,Shift,Category,location,batch) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

//	String STAFF_Insert = "insert into StaffTable(CompanyId,StaffId,StaffName,Address,Location,Activity,ContactNo,"
//		    +"AlternateContactNo,Email,Category,roleName,EmailId,batch) values(?,?,?,?,?,?,?,?,?,?,?,?,?) " ;

}
