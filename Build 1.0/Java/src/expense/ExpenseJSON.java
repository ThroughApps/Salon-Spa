package expense;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;



public class ExpenseJSON {
	private String categoryName;
	private String categoryDate;
	private String userName;
	private String contactNo;
	private String description;
	private String amount;
	private String date;
	private String id;
	private String userId;
	private String expenseId;
	private String categoryId;
	private String companyId;
	private ArrayList<ExpenseJSON> categoryRetrievelist;
	private ArrayList<ExpenseJSON> userRetrievelist;
	private ArrayList<ExpenseJSON> expenseRetrievelist;
	private String employeeName;
	private String role;
	private String staffId;
	
	
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getExpenseId() {
		return expenseId;
	}
	public void setExpenseId(String expenseId) {
		this.expenseId = expenseId;
	}
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getCategoryDate() {
		return categoryDate;
	}
	public void setCategoryDate(String categoryDate) {
		this.categoryDate = categoryDate;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	
	public String getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}
	public ArrayList<ExpenseJSON> getCategoryRetrievelist() {
		return categoryRetrievelist;
	}
	public void setCategoryRetrievelist(ArrayList<ExpenseJSON> categoryRetrievelist) {
		this.categoryRetrievelist = categoryRetrievelist;
	}
	public ArrayList<ExpenseJSON> getUserRetrievelist() {
		return userRetrievelist;
	}
	public void setUserRetrievelist(ArrayList<ExpenseJSON> userRetrievelist) {
		this.userRetrievelist = userRetrievelist;
	}
	public ArrayList<ExpenseJSON> getExpenseRetrievelist() {
		return expenseRetrievelist;
	}
	public void setExpenseRetrievelist(ArrayList<ExpenseJSON> expenseRetrievelist) {
		this.expenseRetrievelist = expenseRetrievelist;
	}
	
	

}
