package report.sales;

import java.util.ArrayList;

public class SalesReportJSON {

	String date;
	String id;
	String userName;
	String contact;
	String status;
	String total;
	String oldDate;
	String oldUserName;
	String month;
	String year;
	String fromDate;
	String toDate;
    String invoiceNo;
    String staffId;
	String balanceAmt;
	String invoiceDate;
	String dueDate;
	String hsn;
	String size;
	String unit;
	String qty;
	String rate;
	String subTotal;
	String cgst;
	String sgst;
	String igst;
	String product;
	String totalGst;
	String advance;
	String discount;
	String address;
	String gstNo;
	String email;
	String amount;
	String sTotal;
	String pay;
	String dueAmount;
	String paymentMode;
	String customerId;
	String subtotal1;
	String Invoice_Amount;
	String customerName;
	String contactNo;
	String Amount_Paid;
	String Discount;
	String companyAddress;
	String companyId;
	String height;
	String width;
	String totalcgst;
	String totalsgst;
	String totaligst;
	String sAmount;
	String description;
	String productId;
	String serviceBy;
	String employeeName;
	String role;
	private ArrayList<SalesReportJSON>  invoicepaymentreportlist;
	private ArrayList<SalesReportJSON>  salesDataList;
	
	
	
	

	

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
	public String getServiceBy() {
		return serviceBy;
	}
	public void setServiceBy(String serviceBy) {
		this.serviceBy = serviceBy;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getsAmount() {
		return sAmount;
	}
	public void setsAmount(String sAmount) {
		this.sAmount = sAmount;
	}
	public String getTotalcgst() {
		return totalcgst;
	}
	public void setTotalcgst(String totalcgst) {
		this.totalcgst = totalcgst;
	}
	public String getTotalsgst() {
		return totalsgst;
	}
	public void setTotalsgst(String totalsgst) {
		this.totalsgst = totalsgst;
	}
	public String getTotaligst() {
		return totaligst;
	}
	public void setTotaligst(String totaligst) {
		this.totaligst = totaligst;
	}
	public ArrayList<SalesReportJSON> getInvoicepaymentreportlist() {
		return invoicepaymentreportlist;
	}
	public void setInvoicepaymentreportlist(ArrayList<SalesReportJSON> invoicepaymentreportlist) {
		this.invoicepaymentreportlist = invoicepaymentreportlist;
	}
	public String getHeight() {
		return height;
	}
	public void setHeight(String height) {
		this.height = height;
	}
	public String getWidth() {
		return width;
	}
	public void setWidth(String width) {
		this.width = width;
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
	public String getAmount_Paid() {
		return Amount_Paid;
	}
	public void setAmount_Paid(String amount_Paid) {
		Amount_Paid = amount_Paid;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public ArrayList<SalesReportJSON> getSalesDataList() {
		return salesDataList;
	}
	public void setSalesDataList(ArrayList<SalesReportJSON> salesDataList) {
		this.salesDataList = salesDataList;
	}
	public String getInvoice_Amount() {
		return Invoice_Amount;
	}
	public void setInvoice_Amount(String invoice_Amount) {
		Invoice_Amount = invoice_Amount;
	}
	public String getSubtotal1() {
		return subtotal1;
	}
	public void setSubtotal1(String subtotal1) {
		this.subtotal1 = subtotal1;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	public String getPaymentMode() {
		return paymentMode;
	}
	public void setPaymentMode(String paymentMode) {
		this.paymentMode = paymentMode;
	}

	public String getPay() {
		return pay;
	}
	public void setPay(String pay) {
		this.pay = pay;
	}
	public String getDueAmount() {
		return dueAmount;
	}
	public void setDueAmount(String dueAmount) {
		this.dueAmount = dueAmount;
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
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getContact() {
		return contact;
	}
	public void setContact(String contact) {
		this.contact = contact;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getOldDate() {
		return oldDate;
	}
	public void setOldDate(String oldDate) {
		this.oldDate = oldDate;
	}
	public String getOldUserName() {
		return oldUserName;
	}
	public void setOldUserName(String oldUserName) {
		this.oldUserName = oldUserName;
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
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getDueDate() {
		return dueDate;
	}
	public void setDueDate(String dueDate) {
		this.dueDate = dueDate;
	}
	public String getHsn() {
		return hsn;
	}
	public void setHsn(String hsn) {
		this.hsn = hsn;
	}
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getQty() {
		return qty;
	}
	public void setQty(String qty) {
		this.qty = qty;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}
	public String getCgst() {
		return cgst;
	}
	public void setCgst(String cgst) {
		this.cgst = cgst;
	}
	public String getSgst() {
		return sgst;
	}
	public void setSgst(String sgst) {
		this.sgst = sgst;
	}
	public String getIgst() {
		return igst;
	}
	public void setIgst(String igst) {
		this.igst = igst;
	}
	public String getProduct() {
		return product;
	}
	public void setProduct(String product) {
		this.product = product;
	}
	public String getTotalGst() {
		return totalGst;
	}
	public void setTotalGst(String totalGst) {
		this.totalGst = totalGst;
	}
	public String getAdvance() {
		return advance;
	}
	public void setAdvance(String advance) {
		this.advance = advance;
	}
	public String getDiscount() {
		return discount;
	}
	public void setDiscount(String discount) {
		this.discount = discount;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getsTotal() {
		return sTotal;
	}
	public void setsTotal(String sTotal) {
		this.sTotal = sTotal;
	}
	
	
	
}