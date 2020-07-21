package cashreconcilation;

import com.fasterxml.jackson.annotation.JsonInclude;


public class CashReconcilationJSON {
private String companyId;
private String totalCash;
private String date;
private String totalAmount;
private String denomination;
private String status;
private String userStatus;

public String getCompanyId() {
	return companyId;
}
public void setCompanyId(String companyId) {
	this.companyId = companyId;
}
public String getTotalCash() {
	return totalCash;
}
public void setTotalCash(String totalCash) {
	this.totalCash = totalCash;
}
public String getDate() {
	return date;
}
public void setDate(String date) {
	this.date = date;
}
public String getTotalAmount() {
	return totalAmount;
}
public void setTotalAmount(String totalAmount) {
	this.totalAmount = totalAmount;
}
public String getDenomination() {
	return denomination;
}
public void setDenomination(String denomination) {
	this.denomination = denomination;
}
public String getStatus() {
	return status;
}
public void setStatus(String status) {
	this.status = status;
}
public String getUserStatus() {
	return userStatus;
}
public void setUserStatus(String userStatus) {
	this.userStatus = userStatus;
}


}
