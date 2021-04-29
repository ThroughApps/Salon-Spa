package Excel;

public interface ExcelQueryConstants {

	/* QUERY FOR FILE EXPORT CUSTOMER (DOWNLOAD) */
	String SELECT_CUSTOMER_FILENAME = "SELECT CustomerFileName FROM CompanyTable WHERE CompanyId = ? ";
	
	String UPDATE_CUSTOMER_FILENAME_WHOLE = "UPDATE CompanyTable SET customerFileName = ? where companyId = ? ";

	String UPDATE_CUSTOMER_FILENAME=" update CompanyTable set customerFileName = if(find_in_set(?,customerFileName),"
			+"customerFileName,   CONCAT(customerFileName, ',', ?)  )  where companyid= ? ";


	
	
	/* QUERY FOR FILE EXPORT VENDOR (DOWNLOAD) */
	String SELECT_VENDOR_FILENAME = "SELECT VendorFileName FROM CompanyTable WHERE CompanyId = ? ";
	
	String UPDATE_VENDOR_FILENAME_WHOLE = "UPDATE CompanyTable SET VendorFileName = ? where companyId = ? ";

	String UPDATE_VENDOR_FILENAME=" update CompanyTable set VendorFileName = if(find_in_set(?,VendorFileName),"
			+"VendorFileName,   CONCAT(VendorFileName, ',', ?)  )  where companyid= ? ";


	
	/* QUERY FOR FILE EXPORT PRODUCT (DOWNLOAD) */
	String SELECT_PRODUCT_FILENAME = "SELECT ProductFileName FROM CompanyTable WHERE CompanyId = ? ";
	
	String UPDATE_PRODUCT_FILENAME_WHOLE = "UPDATE CompanyTable SET ProductFileName = ? where companyId = ? ";

	String UPDATE_PRODUCT_FILENAME=" update CompanyTable set ProductFileName = if(find_in_set(?,ProductFileName),"
			+"ProductFileName,   CONCAT(ProductFileName, ',', ?)  )  where companyid= ? ";



	String GET_PRODUCT_NAME = "SELECT ProductName FROM ProductTable"
			+ " WHERE CompanyId = ? AND Status = 0 ";

	
	
	/* QUERY FOR FILE EXPORT EMPLOYEE (DOWNLOAD) */
	String SELECT_EMPLOYEE_FILENAME = "SELECT EmployeeFileName FROM CompanyTable WHERE CompanyId = ? ";
	
	String UPDATE_EMPLOYEE_FILENAME_WHOLE = "UPDATE CompanyTable SET EmployeeFileName = ? where companyId = ? ";

	String UPDATE_EMPLOYEE_FILENAME=" update CompanyTable set EmployeeFileName = if(find_in_set(?,EmployeeFileName),"
			+"EmployeeFileName,   CONCAT(EmployeeFileName, ',', ?)  )  where companyid= ? ";

    String Staff_VERIFY_MOBILENO="select contactNo from StaffTable where contactNo=? and companyId= ?  and status='0' ";
    
    String Staff_VERIFY_MAIL="select emailId from StaffTable where emailId=? and companyId= ?  and status='0' ";
  	
    String EMP_INSERT_SELECT = "SELECT MAX(EmployeeId) as EmployeeId FROM EmployeeTable where CompanyId = ?  ";
    
   	String INSERT_STAFF_TIC="Insert Into EmployeeTable(CompanyId,EmployeeId,FirstName,LastName,EmailId,MobileNo,Address,"+
  			 "DOJ,DOEXP,Type,Department,Role,Shift,Category,location,batch) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

	   String Staff_Insert ="insert into StaffTable(staffName,address,city,contactNo,dob,gender,nationality,salary,joiningDate,roleName,emailId,companyId,staffId) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)";
		
	   String GET_ROLENAME = "SELECT roleName FROM RoleTable WHERE CompanyId=  ?  ";
}
