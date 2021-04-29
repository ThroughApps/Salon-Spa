package vendorOrder;

import java.util.ArrayList;



public class VendorOrderJSON {
	private String vendorName;
	private ArrayList<VendorOrderJSON> selectvendornamelist ;
	private ArrayList<VendorOrderJSON> selectsaleproductlist;
	private ArrayList<VendorOrderJSON> selectInvoiceNoList;
	private ArrayList<VendorOrderJSON>  productdatalist;
	private ArrayList<VendorOrderJSON>  arrdatalist;
	private ArrayList<VendorOrderJSON> purchaseinvoicereportlist;
	private String invoiceNo;
	private int orderNumber;
	private String invoiceDate;
	private String dueDate;
	private String productName;
	private String description;
	private String height;
	private String width;
	private String size;
	private String rate;
	private String amount;
	private String quantity;
	private String total;
	private String cgst;
	private String sgst;
	private String totalqty;
	private String subtotal1;
	private String advance;
	private String discount;
	private String balance_amount;
	private String saleType;
	private String saleRate;
	private String staffId;
	private String role;
	private String employeeName;
	private String updateQuantity;
	public String getSaleRate() {
		return saleRate;
	}
	public void setSaleRate(String saleRate) {
		this.saleRate = saleRate;
	}
	private String purchaseRate;	
	private String cgsta;
	private String sgsta;
	private String igsta;
	private String finalAmount;
	private String date;
	private String unit;
	private String igst;
	private int vendorId;
	private String contactNo;
	private String totalcgst;
	private String totalsgst;
	private String totaligst;
    private String totalgst;
    private String totalitemqty;
    private String invoiceData;
	private String shipping;
	private String purchaseId;
	private String payment_status;
	private String adjustment;
	private String finalAmountTotal;	
	private String companyId;
	private String companyName;
	private String email;
	private String gstNo;
	private String address;
	private String sms;
	private String emailoption;
	private String productType;
	private String productId;	
	private String month;
	private String productCategory;
    private String expiryDate;
    
    
    
    
	public String getExpiryDate() {
		return expiryDate;
	}
	public void setExpiryDate(String expiryDate) {
		this.expiryDate = expiryDate;
	}
	public String getUpdateQuantity() {
		return updateQuantity;
	}
	public void setUpdateQuantity(String updateQuantity) {
		this.updateQuantity = updateQuantity;
	}
	public String getStaffId() {
		return staffId;
	}
	public void setStaffId(String staffId) {
		this.staffId = staffId;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	public String getEmployeeName() {
		return employeeName;
	}
	public void setEmployeeName(String employeeName) {
		this.employeeName = employeeName;
	}
	public String getProductCategory() {
		return productCategory;
	}
	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
	}
	public String getSms() {
		return sms;
	}
	public void setSms(String sms) {
		this.sms = sms;
	}
	public String getEmailoption() {
		return emailoption;
	}
	public void setEmailoption(String emailoption) {
		this.emailoption = emailoption;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getGstNo() {
		return gstNo;
	}
	public void setGstNo(String gstNo) {
		this.gstNo = gstNo;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
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
	public String getAdjustment() {
		return adjustment;
	}
	public void setAdjustment(String adjustment) {
		this.adjustment = adjustment;
	}
	public String getFinalAmountTotal() {
		return finalAmountTotal;
	}
	public void setFinalAmountTotal(String finalAmountTotal) {
		this.finalAmountTotal = finalAmountTotal;
	}
	public String getPayment_status() {
		return payment_status;
	}
	public void setPayment_status(String payment_status) {
		this.payment_status = payment_status;
	}
	public ArrayList<VendorOrderJSON> getPurchaseinvoicereportlist() {
		return purchaseinvoicereportlist;
	}
	public void setPurchaseinvoicereportlist(ArrayList<VendorOrderJSON> purchaseinvoicereportlist) {
		this.purchaseinvoicereportlist = purchaseinvoicereportlist;
	}
	public String getPurchaseId() {
		return purchaseId;
	}
	public void setPurchaseId(String purchaseId) {
		this.purchaseId = purchaseId;
	}
	public String getShipping() {
		return shipping;
	}
	public void setShipping(String shipping) {
		this.shipping = shipping;
	}
	public ArrayList<VendorOrderJSON> getProductdatalist() {
		return productdatalist;
	}
	public void setProductdatalist(ArrayList<VendorOrderJSON> productdatalist) {
		this.productdatalist = productdatalist;
	}
	public ArrayList<VendorOrderJSON> getArrdatalist() {
		return arrdatalist;
	}
	public void setArrdatalist(ArrayList<VendorOrderJSON> arrdatalist) {
		this.arrdatalist = arrdatalist;
	}
	public String getBalance_amount() {
		return balance_amount;
	}
	public void setBalance_amount(String balance_amount) {
		this.balance_amount = balance_amount;
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
	public String getTotalgst() {
		return totalgst;
	}
	public void setTotalgst(String totalgst) {
		this.totalgst = totalgst;
	}
	public String getTotalitemqty() {
		return totalitemqty;
	}
	public void setTotalitemqty(String totalitemqty) {
		this.totalitemqty = totalitemqty;
	}
	public String getInvoiceData() {
		return invoiceData;
	}
	public void setInvoiceData(String invoiceData) {
		this.invoiceData = invoiceData;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public ArrayList<VendorOrderJSON> getSelectvendornamelist() {
		return selectvendornamelist;
	}
	public void setSelectvendornamelist(ArrayList<VendorOrderJSON> selectvendornamelist) {
		this.selectvendornamelist = selectvendornamelist;
	}

	public ArrayList<VendorOrderJSON> getSelectsaleproductlist() {
		return selectsaleproductlist;
	}
	public void setSelectsaleproductlist(ArrayList<VendorOrderJSON> selectsaleproductlist) {
		this.selectsaleproductlist = selectsaleproductlist;
	}
	public ArrayList<VendorOrderJSON> getSelectInvoiceNoList() {
		return selectInvoiceNoList;
	}
	public void setSelectInvoiceNoList(ArrayList<VendorOrderJSON> selectInvoiceNoList) {
		this.selectInvoiceNoList = selectInvoiceNoList;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public int getOrderNumber() {
		return orderNumber;
	}
	public void setOrderNumber(int orderNumber) {
		this.orderNumber = orderNumber;
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
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
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
	public String getSize() {
		return size;
	}
	public void setSize(String size) {
		this.size = size;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getAmount() {
		return amount;
	}
	public void setAmount(String amount) {
		this.amount = amount;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public String getTotal() {
		return total;
	}
	public void setTotal(String total) {
		this.total = total;
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
	public String getTotalqty() {
		return totalqty;
	}
	public void setTotalqty(String totalqty) {
		this.totalqty = totalqty;
	}
	public String getSubtotal1() {
		return subtotal1;
	}
	public void setSubtotal1(String subtotal1) {
		this.subtotal1 = subtotal1;
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

	public String getSaleType() {
		return saleType;
	}
	public void setSaleType(String saleType) {
		this.saleType = saleType;
	}


	public String getPurchaseRate() {
		return purchaseRate;
	}
	public void setPurchaseRate(String purchaseRate) {
		this.purchaseRate = purchaseRate;
	}
	public String getCgsta() {
		return cgsta;
	}
	public void setCgsta(String cgsta) {
		this.cgsta = cgsta;
	}
	public String getSgsta() {
		return sgsta;
	}
	public void setSgsta(String sgsta) {
		this.sgsta = sgsta;
	}
	public String getIgsta() {
		return igsta;
	}
	public void setIgsta(String igsta) {
		this.igsta = igsta;
	}
	public String getFinalAmount() {
		return finalAmount;
	}
	public void setFinalAmount(String finalAmount) {
		this.finalAmount = finalAmount;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
	}
	public String getIgst() {
		return igst;
	}
	public void setIgst(String igst) {
		this.igst = igst;
	}
	public int getVendorId() {
		return vendorId;
	}
	public void setVendorId(int vendorId) {
		this.vendorId = vendorId;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	
	


}
