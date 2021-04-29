package login;

import java.sql.Connection;





import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


import java.util.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import DBUtil.DatabaseUtil;



public class LoginLogic {

	/*
	 * FUNCTION FOR VERIFYING LOGIN
	 */
	public static LoginJSON LoginCheck(LoginJSON json) {

	
		return json;
	}
	/*
	* FUNCTION FOR VERIFYING LOGIN
	*/
	public static LoginJSON LoginCheck1(LoginJSON json) {

	Connection connection = null;
	LoginLogic details=new LoginLogic();
	ArrayList<LoginJSON> employeePermisionlist = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> employeeRolelist = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> employeeList = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> categoryList = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> customerList = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> vendorList = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> userList = new ArrayList<LoginJSON>();
	ArrayList<LoginJSON> headerPermissionList = new ArrayList<LoginJSON>();
	
	LoginJSON loginData = new LoginJSON();
	String staffId = null;
	String password = null;
	String permission = null;
	String companyName = null;
	String companyAddress =null;
	String CompanyId = null;
	String licenseKey = null;
	String status = null;
	String fromdate = null;
	String todate = null;
	String role = null;
	String companyEmailId = null;
	String contactNo = null;
	String doorNo=null;
	String floor=null;
	String street=null;
	String place=null;
	String state=null;
	String staffName=null;
	String feedbackNo =null;
	String landlineNo= null;
	String configValue=null;
	String toggleValue=null;
	String bankName=null;
	String branchName =null;
	String accountNo= null;
	String ifscCode=null;
	String accountName=null;
	String gstNo=null;
	String rewardAmount=null;
	String rewardPoint=null;
	String maxRewardLimit=null;
	String expiryDuration=null;
	String redeemPoint=null;
	String redeemAmount=null;
	String minRedeemRewardPoint=null;
	String companyLogo=null;
	String employeeName=null;
	String zipCode=null;
	String area=null;
	String plan=null;
	String HeaderPermission = null;
	json.setStaffId("NOT_REGISTERED");
	int valid = LoginLogic.vaildmailid(json);
	
	if (valid == 0) {
	try {

	connection = DatabaseUtil.getDBConnection();
	

	String querySelect = QueryConstants.LOGIN_VERIFY;
	PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
	preparedStmt.setString(1, json.getEmailId());
	preparedStmt.setString(2, json.getEmailId());
//		preparedStmt.setString(3, json.getPassword());
	ResultSet rs = preparedStmt.executeQuery();
	if(rs.next()) {

	staffId = rs.getString("staffId");
	role = rs.getString("roleName");
	CompanyId = rs.getString("companyId");
	password=rs.getString("password");
	employeeName=rs.getString("staffName");
	

	if ((json.getPassword().equals(password))) {
		

	String bankdetails = QueryConstants.Bank_Details;
	PreparedStatement preparedStmtBank = connection.prepareStatement(bankdetails);
	preparedStmtBank.setString(1, CompanyId);
	ResultSet rsbank = preparedStmtBank.executeQuery();
	while (rsbank.next()) {
		bankName = rsbank.getString("bankName");
		branchName = rsbank.getString("branchName");
		accountNo = rsbank.getString("accountNo");
		ifscCode = rsbank.getString("ifscCode");
		accountName = rsbank.getString("accountName");
		
		

	}

	String rolePer = QueryConstants.ROLE_PERMISSION;
	PreparedStatement preparedStmtPer = connection.prepareStatement(rolePer);
	preparedStmtPer.setString(1, role);
	preparedStmtPer.setString(2, CompanyId);
	ResultSet rsPer = preparedStmtPer.executeQuery();
	while (rsPer.next()) {
		HeaderPermission=rsPer.getString("HeaderPermission");
	permission = rsPer.getString("Permission");

	}
	
	if (permission != null) {
	List<String> aList = Arrays.asList(permission.split(","));
	for (int i = 0; i < aList.size(); i++) {

	LoginJSON empConf = new LoginJSON();
	empConf.setPermission(aList.get(i));
	employeePermisionlist.add(empConf);
	

	}

	}
	if (HeaderPermission != null) {
		List<String> headerList = Arrays.asList(HeaderPermission.split(","));
		for (int i = 0; i < headerList.size(); i++) {
			
			LoginJSON empConf1 = new LoginJSON();
			empConf1.setPermissionHeader(headerList.get(i));
			headerPermissionList.add(empConf1);

		}
		// config.setHeaderPermissionList(headerPermissionList);
	}
	json.setStaffId(staffId);
	json.setRoleName(role);
	json.setCompanyId(CompanyId);
	json.setEmployeeName(employeeName);

	String compName = QueryConstants.companyName;
	PreparedStatement preparedStmtCompName = connection.prepareStatement(compName);
	preparedStmtCompName.setString(1, CompanyId);
	ResultSet rsCompName = preparedStmtCompName.executeQuery();
	while (rsCompName.next()) {

	companyName = rsCompName.getString("companyName");
	licenseKey = rsCompName.getString("licenseKey");
	status = rsCompName.getString("status");
	fromdate = rsCompName.getString("fromdate");
	todate = rsCompName.getString("todate");
	companyAddress = rsCompName.getString("companyAddress");
	companyEmailId = rsCompName.getString("emailId");	
	contactNo =rsCompName.getString("contactNo");
	doorNo=rsCompName.getString("doorNo");
	floor=rsCompName.getString("floor");
	street=rsCompName.getString("street");
	place=rsCompName.getString("city");
	state=rsCompName.getString("place");
	staffName=rsCompName.getString("staffName");
	landlineNo=rsCompName.getString("landlineNo");
	feedbackNo=rsCompName.getString("feedbackNo");
	configValue=rsCompName.getString("configValue");
	toggleValue=rsCompName.getString("toggleValue");
	gstNo=rsCompName.getString("gstNo");
	companyLogo=rsCompName.getString("fileName");
	rewardAmount=rsCompName.getString("rewardAmount");
	rewardPoint=rsCompName.getString("rewardPoint");
	maxRewardLimit=rsCompName.getString("maxRewardLimit");
	expiryDuration=rsCompName.getString("expiryDuration");
	redeemPoint=rsCompName.getString("redeemPoint");
	redeemAmount=rsCompName.getString("redeemAmount");
	minRedeemRewardPoint=rsCompName.getString("minRedeemRewardPoint");
	zipCode=rsCompName.getString("zipCode");
	area=rsCompName.getString("area");
	plan = rsCompName.getString("Plan");
	


	}

	//sif (status.equals("active")) {

	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
	sdf.setLenient(false);

	Date d1 = sdf.parse(fromdate);
	Date d2 = sdf.parse(json.getDate());
	Date d3 = sdf.parse(todate);

	if (d2.compareTo(d1) >= 0) {
	if (d2.compareTo(d3) <= 0) {
	if (status.equals("inactive")) { 

	status = "inactive";
	}

	} else {
	
	// update status has expiered
	String changStatus = QueryConstants.UPDATE_EXPIRED;
	PreparedStatement preparedStmtchangStatus = connection.prepareStatement(changStatus);
	preparedStmtchangStatus.setString(1, CompanyId);
	preparedStmtchangStatus.executeUpdate();


	status = "expired";

	}
	} 

	json.setCompanyName(companyName);
	json.setLicenseKey(licenseKey);
	json.setCompanyAddress(companyAddress);
	json.setStatus(status);
	json.setCompanyEmailId(companyEmailId);
	json.setContactNo(contactNo);
	json.setDoorNo(doorNo);
	json.setFloor(floor);
	json.setStreet(street);
	json.setPlace(place);
	json.setState(state);
	json.setStaffName(staffName);
	json.setLandlineNo(landlineNo);
	json.setFeedbackNo(feedbackNo);
	json.setConfigValue(configValue);
	json.setToggleValue(toggleValue);
	json.setAccountNo(accountNo);
	json.setBankName(bankName);
	json.setBranchName(branchName);
	json.setIfscCode(ifscCode);
	json.setAccountName(accountName);
	json.setGstNo(gstNo);
	json.setCompanyLogo(companyLogo);
	json.setRewardAmount(rewardAmount);
	json.setRewardPoint(rewardPoint);
	json.setMaxRewardLimit(maxRewardLimit);
	json.setExpiryDuration(expiryDuration);
	json.setRedeemAmount(redeemAmount);
	json.setRedeemPoint(redeemPoint);
	json.setMinRedeemRewardPoint(minRedeemRewardPoint);
	json.setZipCode(zipCode);
	json.setArea(area);
	json.setPlanName(plan);
	
	employeeRolelist = LoginLogic.RoleDropDownDetails(CompanyId);
	employeeList = LoginLogic.EmployeeList(CompanyId);
	vendorList=LoginLogic.VendorList(CompanyId);
	customerList=LoginLogic.CustomerList(CompanyId);
	categoryList=LoginLogic.CategoryList(CompanyId);
	userList=LoginLogic.UserList(CompanyId);
	
	
	json.setEmployeeRolelist(employeeRolelist);
	json.setEmployeePermisionlist(employeePermisionlist);
	json.setEmployeeList(employeeList);
	json.setVendorList(vendorList);
	json.setCustomerList(customerList);
	json.setCategoryList(categoryList);
	json.setUserList(userList);
	json.setHeaderPermissionList(headerPermissionList);
	
	
	

	

	if (staffId == null) {
	
	json.setEmailId("Failed");
	} else {
	
	json.setEmailId("Success");
	}


	}
	else {
	json.setStaffId("PASSWORD_INCORRECT");


	}

	}



	connection.close();
	} catch (Exception e) {
	e.printStackTrace();
	} finally {

	}
	}
	return json;
	}
	
	 private static ArrayList<LoginJSON> UserList(String CompanyId) {
		 ArrayList<LoginJSON> userList = new ArrayList<LoginJSON>();
			Connection connection = null;

			try {
		
				connection = DatabaseUtil.getDBConnection();
				String querySelect = QueryConstants.User_Report;
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1, CompanyId);
				ResultSet rs = preparedStmt.executeQuery();
				while (rs.next()) {
					LoginJSON user = new LoginJSON();

					user.setUserId(rs.getString("userId"));
					user.setUserName(rs.getString("userName"));
					user.setContactNo(rs.getString("contactNo"));
					user.setDescription(rs.getString("description"));

					userList.add(user);
				}
		
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			finally {

			}

			return userList;
	}


	private static ArrayList<LoginJSON> CategoryList(String CompanyId) {
		 ArrayList<LoginJSON> categoryList = new ArrayList<LoginJSON>();
			Connection connection = null;

			try {
	
				connection = DatabaseUtil.getDBConnection();
				String querySelect = QueryConstants.Cat_LIST;
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1, CompanyId);
				ResultSet rs = preparedStmt.executeQuery();
				while (rs.next()) {
					LoginJSON category = new LoginJSON();

					category.setCategoryId(rs.getString("categoryId"));
					category.setCategoryName(rs.getString("categoryName"));

					categoryList.add(category);
				}
	
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			finally {

			}

			return categoryList;
	}

	
	private static ArrayList<LoginJSON> CustomerList(String CompanyId) {
		ArrayList<LoginJSON> customerList = new ArrayList<LoginJSON>();
		Connection connection = null;

		try {
	
			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.Cus_LIST;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, CompanyId);
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				LoginJSON customer = new LoginJSON();

				customer.setCustomerId(rs.getString("customerId"));
				customer.setCustomerName(rs.getString("customerName"));

				customerList.add(customer);
			}
			
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

		}

		return customerList;
	}

	private static ArrayList<LoginJSON> VendorList(String CompanyId) {
		ArrayList<LoginJSON> vendorList = new ArrayList<LoginJSON>();
		Connection connection = null;

		try {
			
			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.Ven_LIST;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, CompanyId);
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				LoginJSON vendor = new LoginJSON();

				vendor.setVendorId(rs.getString("vendorId"));
				vendor.setVendorName(rs.getString("vendorName"));

				vendorList.add(vendor);
			}
		
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

		}

		return vendorList;
	}

	
	/*
	 * verifying where EmailID is Valid
	 */

	public static int vaildmailid(LoginJSON json) {

		int flag = 1;// false
		Connection connection = null;

		try {
			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.VALID_MAILID;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1, json.getEmailId());
			preparedStmt.setString(2, json.getEmailId());
			ResultSet result = preparedStmt.executeQuery();

			if (result.next()) {
				flag = 0; // set the flag value 0 if it is valid email id
							// otherwise it return 1 means invalid

			}
			connection.close();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}

		return flag;
	}

	/*
	 * function for getting EmployeeList
	 */

	public static ArrayList<LoginJSON> EmployeeList(String CompanyId) {

		ArrayList<LoginJSON> employeeList = new ArrayList<LoginJSON>();
		Connection connection = null;

		try {
			
			connection = DatabaseUtil.getDBConnection();
			String querySelect = QueryConstants.EMP_LIST;
			PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
			preparedStmt.setString(1,CompanyId);
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {
				LoginJSON emp = new LoginJSON();

				emp.setStaffId(rs.getString("staffId"));
				emp.setStaffName(rs.getString("staffName"));

				employeeList.add(emp);
			}
		
			connection.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {

		}

		return employeeList;

	}


	
		public static ArrayList<LoginJSON> RoleDropDownDetails(String CompanyId) {

			ArrayList<LoginJSON> employeeRolelist = new ArrayList<LoginJSON>();
			Connection connection = null;

			try {

				connection = DatabaseUtil.getDBConnection();
				String querySelect = QueryConstants.EMP_GET_ROLE;
				PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
				preparedStmt.setString(1,CompanyId);
				ResultSet rs = preparedStmt.executeQuery();
				while (rs.next()) {
					LoginJSON roleObj = new LoginJSON();
					String role = rs.getString("roleName");
					if (role != null) {
						roleObj.setRoleName(rs.getString("roleName"));
						employeeRolelist.add(roleObj);
					}
				}

		
				connection.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}

			finally {

			}

			return employeeRolelist;

		}
		 
	public static LoginJSON UpdateStatus(LoginJSON json) {
		// TODO Auto-generated method stub
		
		Connection connection=null;
	
		
		
		try {
			connection=DatabaseUtil.getDBConnection();
		
		
			String querySelect = QueryConstants.Status_Update;
			
			PreparedStatement preparedStmt=connection.prepareStatement(querySelect);	
			preparedStmt.setString(1,json.getCompanyId());
			preparedStmt.executeUpdate();
			connection.close(); 
		}
		catch (Exception e) {
				e.printStackTrace();
		} finally {
				
			
		}
		return json;
	}

	
	public LoginJSON FileUpload(LoginJSON json)  {
		Connection connection=null;
		String FileName=null;
	
		      
		try {
		connection = DatabaseUtil.getDBConnection();
		
		
	    String querySelect=QueryConstants.File_Insert;
		PreparedStatement preparedStmt = connection.prepareStatement(querySelect);
		preparedStmt.setString(1,json.getFileName());
		preparedStmt.setString(2,json.getCompanyId());		
		preparedStmt.executeUpdate();
		
		connection.close();    
		}

		catch (SQLException e)
		       {
		       e.printStackTrace();
		       }
		        
		  finally {
			  DatabaseUtil.closeConnection(connection);
		}
		return json;
		}

}
