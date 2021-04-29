package organization;

public interface QueryConstants {

	
	  String ORG_VERIFY_MOBILENO="SELECT contactNo FROM CompanyTable where contactNo = ?";
	  
	  String ORG_VERIFY_EMAIL="SELECT emailId FROM CompanyTable where emailId = ? ";
	  
	  String UPDATE_LICENSE_KEY="update CompanyTable set licenseKey= ? where companyId= ? ";
	  
	  String Organization_Insert ="insert into CompanyTable(companyName,emailId,contactNo,plan,licenseKey,status,fromdate,todate,doorNo,floor,city,street,place,staffName,companyaddress,companyId,zipCode,area) VALUES(?,?,?,?,?,'inactive',?,?,?,?,?,?,?,?,?,?,?,?)";
		
	 
	  String SITE_ALREADYEXIST_EMAILID = "SELECT EmailId  From StaffTable WHERE EmailId = ? ";
	  
	  String SITE_ALREADYEXIST_MOBILENO = "SELECT ContactNo From StaffTable WHERE ContactNo = ? ";
	  
	  String SITE_SELECTID = "SELECT CompanyId FROM CompanyTable WHERE EmailId = ? OR ContactNo = ? ";
	  
	  String SITE_INSERTPERMISSION_TABLE = "INSERT INTO PermissionTable (CompanyId,roleName,Permission,HeaderPermission)values( ? , 'Proprietor' ,?,?)";

	  String SITE_INSERTPERMISSION_TABLEADMIN = "INSERT INTO PermissionTable (CompanyId,roleName,Permission,HeaderPermission)values( ? , 'Admin' ,?,?)";

	  String SITE_INSERTROLE_TABLE="INSERT INTO RoleTable (CompanyId,roleName,roleDate) values(? , 'Proprietor',now())";

	  //QUERY TO INSERT INTO TICTOKS DB
	  String SITE_INSERT_COMPANY="INSERT INTO CompanyTable(CompanyName,Address,City,PinCode,State,Country,"
	  		+ "Phone,EmailId,CompanyType,Plan)VALUES(?,?,?,?,?,?,?,?,?,?) ";
	  
	  String SITE_SELECTID_TICTOKS = "SELECT CompanyId FROM CompanyTable WHERE EmailId = ? OR Phone = ? ";
	  

	    //QUERY TO CREATE HOLIDAY TABLE
	    String CREATE_TABLE_HOLIDAY = "CREATE TABLE $tableName( dt DATE NOT NULL PRIMARY KEY, "
	    		+ "y SMALLINT NULL,q tinyint NULL, m tinyint NULL,d tinyint NULL,"
	    		+ "dw tinyint NULL,monthName VARCHAR(9) NULL,dayName VARCHAR(9) NULL,"
	    		+ "w tinyint NULL,isWeekday BINARY(1) NULL,isHoliday BINARY(1) NULL,"
	    		+ "holidayDescr VARCHAR(32) NULL,isPayday BINARY(1) NULL,"
	    		+ "Shift1 varchar(7),Shift2 varchar(7),Shift3 varchar(7),"
	    		+ "HoliDayShift varchar(10))";

	    /*
	    String INSERT_HOLIDAYTABLE="INSERT INTO $tableName (dt) SELECT DATE( ? ) "
	    		+ " + INTERVAL a.i*10000 + b.i*1000 + c.i*100 + d.i*10 + e.i DAY FROM ints a "
	    		+ "JOIN ints b JOIN ints c JOIN ints d JOIN ints e WHERE (a.i*10000 + b.i*1000 + "
	    		+ "c.i*100 + d.i*10 + e.i) <= 365 ORDER BY 1" ;

	    String UPDATE_HOLIDAYTABLE=" update $tableName set y=year(dt),q=quarter(dt),m=month(dt),d=day(dt),dw=dayofweek(dt),"
	    		+ "monthName=monthname(dt),dayName=dayname(dt),w=week(dt),isWeekday="
	    		+"case " 
	    		+"when dayofweek(dt) = 1 or dayofweek(dt) = 7 then 0 "  
	    		+"   else 1 end ";
	    */

		String INSERT_HOLIDAYTABLE = "INSERT INTO $tableName (dt) SELECT DATE( ? ) "
				+ " + INTERVAL a.i*10000 + b.i*1000 + c.i*100 + d.i*10 + e.i DAY FROM ints a "
				+ "JOIN ints b JOIN ints c JOIN ints d JOIN ints e WHERE (a.i*10000 + b.i*1000 + "
				+ "c.i*100 + d.i*10 + e.i) <= ? ORDER BY 1";

		String UPDATE_HOLIDAYTABLE = " update $tableName set y=year(dt),q=quarter(dt),m=month(dt),d=day(dt),dw=dayofweek(dt),"
				+ "monthName=monthname(dt),dayName=dayname(dt),w=week(dt),isWeekday=" + "case "
				+ "when dayofweek(dt) = 1 or dayofweek(dt) = 7 then 0 " + "   else 1 end ";



	    String SITE_INSERTAdminROLE_TABLE="INSERT INTO RoleTable (CompanyId,roleName,roleDate) values(? , 'Admin',now())";
		  

	    String INSERT_STAFF_TIC="Insert Into EmployeeTable(CompanyId,EmployeeId,FirstName,LastName,EmailId,MobileNo,Address,"+
				 "DOJ,DOEXP,Type,Department,Role,Shift,Category,location,batch) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	    String STAFF_Insert = "insert into StaffTable(staffName,address,city,contactNo,gender,nationality,salary,roleName,emailId,companyId,staffId) VALUES(?,?,?,?,?,?,?,?,?,?,?)";
				 

	 //   String STAFF_Insert = "insert into StaffTable(CompanyId,StaffId,StaffName,Address,city,ContactNo,"
	//		    +"EmailId,Category,roleName,batch) values(?,?,?,?,?,?,?,?,?,?,?,?) " ;

		 
	    
	    String Staff_Insert ="insert into StaffTable(staffName,address,city,contactNo,dob,gender,nationality,salary,joiningDate,roleName,emailId,companyId,staffId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
			 
}
