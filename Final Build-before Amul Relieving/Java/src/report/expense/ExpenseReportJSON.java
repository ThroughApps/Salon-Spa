package report.expense;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

public class ExpenseReportJSON {

	String date;
	String id;
	String categoryName;
	String userName;
	String amount;
	String oldDate;
	String oldCategoryName;
	String oldUserName;
	String oldAmount;
	String month;
	String year;
	String fromDate;
	String toDate;
	String invoiceNo;
	String balanceAmt;
	String companyId;
	String staffId;
	String employeeName;
	String role;
 ArrayList<ExpenseReportJSON> dailyExpenseList;
 ArrayList<ExpenseReportJSON> summaryExpenseList;
	
	
	
	public String getStaffId() {
	return staffId;
}
public void setStaffId(String staffId) {
	this.staffId = staffId;
}
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
	public ArrayList<ExpenseReportJSON> getDailyExpenseList() {
	return dailyExpenseList;
}
public void setDailyExpenseList(ArrayList<ExpenseReportJSON> dailyExpenseList) {
	this.dailyExpenseList = dailyExpenseList;
}
public ArrayList<ExpenseReportJSON> getSummaryExpenseList() {
	return summaryExpenseList;
}
public void setSummaryExpenseList(ArrayList<ExpenseReportJSON> summaryExpenseList) {
	this.summaryExpenseList = summaryExpenseList;
}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
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
	public String getCategoryName() {
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getOldDate() {
		return oldDate;
	}
	public void setOldDate(String oldDate) {
		this.oldDate = oldDate;
	}
	public String getOldCategoryName() {
		return oldCategoryName;
	}
	public void setOldCategoryName(String oldCategoryName) {
		this.oldCategoryName = oldCategoryName;
	}
	public String getOldUserName() {
		return oldUserName;
	}
	public void setOldUserName(String oldUserName) {
		this.oldUserName = oldUserName;
	}
	public String getOldAmount() {
		return oldAmount;
	}
	public void setOldAmount(String oldAmount) {
		this.oldAmount = oldAmount;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getYear() {
		return year;
	}
	public void setYear(String year) {
		this.year = year;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public String getBalanceAmt() {
		return balanceAmt;
	}
	public void setBalanceAmt(String balanceAmt) {
		this.balanceAmt = balanceAmt;
	}
	
	
	
}