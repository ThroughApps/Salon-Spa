package login;

import java.util.ArrayList;


import com.fasterxml.jackson.annotation.JsonInclude;



public class LoginJSON {

	String emailId;
	String contactNo;
	String password;
	String permission;
	String roleName; 
	String staffId;
	String companyAddress;
	String companyId;
	String companyName;
	String licenseKey;
	String status;
	String date;
	String companyEmailId;
	String staffName;
	String landlineNo;
	String feedbackNo;
	String configValue;
	String doorNo="-";
	String floor="-";
	String street="-";
	String place="-";
	String state="-";
	String categoryId;
	String categoryName;
	String customerId;
	String customerName;
	String vendorId;
	String vendorName;
	String userName;
	String userId;
	String description;
	String bankName;
	String branchName;
	String accountNo;
	String ifscCode;
	String accountName;
	String gstNo;
	String fileName;
	String companyLogo;
	String productId;
	String productQuantity;
	String toggleValue;
	String rewardAmount;
	String rewardPoint;
	String expiryDuration;
	String maxRewardLimit;
	String redeemPoint;
	String redeemAmount;
	String minRedeemRewardPoint;
	String employeeName;
	String zipCode;
	String area;
	String permissionHeader;
	String planName;
	private ArrayList<LoginJSON> permissionList;
	private ArrayList<LoginJSON> employeePermisionlist;
	private ArrayList<LoginJSON> employeeRolelist;
	private ArrayList<LoginJSON> employeeList;
	private ArrayList<LoginJSON> categoryList;
	private ArrayList<LoginJSON> customerList;
	private ArrayList<LoginJSON> vendorList;
	private ArrayList<LoginJSON> userList;
	private ArrayList<LoginJSON> inventoryList;
	
	private ArrayList<LoginJSON> headerPermissionList;

	
	

	public String getPlanName() {
		return planName;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	public ArrayList<LoginJSON> getHeaderPermissionList() {
		return headerPermissionList;
	}
	public void setHeaderPermissionList(ArrayList<LoginJSON> headerPermissionList) {
		this.headerPermissionList = headerPermissionList;
	}
	public String getPermissionHeader() {
		return permissionHeader;
	}
	public void setPermissionHeader(String permissionHeader) {
		this.permissionHeader = permissionHeader;
	}
	public String getZipCode() {
		return zipCode;
	}
	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getCompanyLogo() {
		return companyLogo;
	}
	public void setCompanyLogo(String companyLogo) {
		this.companyLogo = companyLogo;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	public String getBankName() {
		return bankName;
	}
	public void setBankName(String bankName) {
		this.bankName = bankName;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getIfscCode() {
		return ifscCode;
	}
	public void setIfscCode(String ifscCode) {
		this.ifscCode = ifscCode;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ArrayList<LoginJSON> getUserList() {
		return userList;
	}
	public void setUserList(ArrayList<LoginJSON> userList) {
		this.userList = userList;
	}
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public ArrayList<LoginJSON> getCategoryList() {
		return categoryList;
	}
	public void setCategoryList(ArrayList<LoginJSON> categoryList) {
		this.categoryList = categoryList;
	}
	public ArrayList<LoginJSON> getCustomerList() {
		return customerList;
	}
	public void setCustomerList(ArrayList<LoginJSON> customerList) {
		this.customerList = customerList;
	}
	public ArrayList<LoginJSON> getVendorList() {
		return vendorList;
	}
	public void setVendorList(ArrayList<LoginJSON> vendorList) {
		this.vendorList = vendorList;
	}
	public String getConfigValue() {
		return configValue;
	}
	public void setConfigValue(String configValue) {
		this.configValue = configValue;
	}
	public String getLandlineNo() {
		return landlineNo;
	}
	public void setLandlineNo(String landlineNo) {
		this.landlineNo = landlineNo;
	}
	public String getFeedbackNo() {
		return feedbackNo;
	}
	public void setFeedbackNo(String feedbackNo) {
		this.feedbackNo = feedbackNo;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getDoorNo() {
		return doorNo;
	}
	public void setDoorNo(String doorNo) {
		this.doorNo = doorNo;
	}
	public String getFloor() {
		return floor;
	}
	public void setFloor(String floor) {
		this.floor = floor;
	}
	public String getStreet() {
		return street;
	}
	public void setStreet(String street) {
		this.street = street;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getCompanyEmailId() {
		return companyEmailId;
	}
	public void setCompanyEmailId(String companyEmailId) {
		this.companyEmailId = companyEmailId;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}

	public String getLicenseKey() {
		return licenseKey;
	}
	public void setLicenseKey(String licenseKey) {
		this.licenseKey = licenseKey;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getCompanyAddress() {
		return companyAddress;
	}
	public void setCompanyAddress(String companyAddress) {
		this.companyAddress = companyAddress;
	}
	public ArrayList<LoginJSON> getPermissionList() {
		return permissionList;
	}
	public void setPermissionList(ArrayList<LoginJSON> permissionList) {
		this.permissionList = permissionList;
	}
	public ArrayList<LoginJSON> getEmployeePermisionlist() {
		return employeePermisionlist;
	}
	public void setEmployeePermisionlist(ArrayList<LoginJSON> employeePermisionlist) {
		this.employeePermisionlist = employeePermisionlist;
	}
	public ArrayList<LoginJSON> getEmployeeRolelist() {
		return employeeRolelist;
	}
	public void setEmployeeRolelist(ArrayList<LoginJSON> employeeRolelist) {
		this.employeeRolelist = employeeRolelist;
	}
	public ArrayList<LoginJSON> getEmployeeList() {
		return employeeList;
	}
	public void setEmployeeList(ArrayList<LoginJSON> employeeList) {
		this.employeeList = employeeList;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getPermission() {
		return permission;
	}
	public void setPermission(String permission) {
		this.permission = permission;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getProductQuantity() {
		return productQuantity;
	}
	public void setProductQuantity(String productQuantity) {
		this.productQuantity = productQuantity;
	}
	public ArrayList<LoginJSON> getInventoryList() {
		return inventoryList;
	}
	public void setInventoryList(ArrayList<LoginJSON> inventoryList) {
		this.inventoryList = inventoryList;
	}
	public String getToggleValue() {
		return toggleValue;
	}
	public void setToggleValue(String toggleValue) {
		this.toggleValue = toggleValue;
	}
	public String getRewardAmount() {
		return rewardAmount;
	}
	public void setRewardAmount(String rewardAmount) {
		this.rewardAmount = rewardAmount;
	}
	public String getRewardPoint() {
		return rewardPoint;
	}
	public void setRewardPoint(String rewardPoint) {
		this.rewardPoint = rewardPoint;
	}
	public String getExpiryDuration() {
		return expiryDuration;
	}
	public void setExpiryDuration(String expiryDuration) {
		this.expiryDuration = expiryDuration;
	}
	public String getMaxRewardLimit() {
		return maxRewardLimit;
	}
	public void setMaxRewardLimit(String maxRewardLimit) {
		this.maxRewardLimit = maxRewardLimit;
	}
	public String getRedeemPoint() {
		return redeemPoint;
	}
	public void setRedeemPoint(String redeemPoint) {
		this.redeemPoint = redeemPoint;
	}
	public String getRedeemAmount() {
		return redeemAmount;
	}
	public void setRedeemAmount(String redeemAmount) {
		this.redeemAmount = redeemAmount;
	}
	public String getMinRedeemRewardPoint() {
		return minRedeemRewardPoint;
	}
	public void setMinRedeemRewardPoint(String minRedeemRewardPoint) {
		this.minRedeemRewardPoint = minRedeemRewardPoint;
	}
	
	
	
	
	
}
