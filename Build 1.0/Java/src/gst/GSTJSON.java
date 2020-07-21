package gst;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;


public class GSTJSON {
	private String date;
	private String month;
	private String fromDate;
	private String toDate;
	private String totalgst;
	private String totalcgst;
	private String totalsgst;
	private String totaligst;
	private ArrayList<GSTJSON> saleRetrievelist;
	private ArrayList<GSTJSON> purchaseRetrievelist;
	private ArrayList<GSTJSON> businesstobusinessreportlist;
	private ArrayList<GSTJSON> businesstocustomerreportlist;
	private String invoiceNo;
	private String invoiceDate;
	private String customerName;
	private String subtotal1;
	private String vendorName;
	private String companyId;
	
	
	
	
	
	
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public ArrayList<GSTJSON> getBusinesstocustomerreportlist() {
		return businesstocustomerreportlist;
	}
	public void setBusinesstocustomerreportlist(ArrayList<GSTJSON> businesstocustomerreportlist) {
		this.businesstocustomerreportlist = businesstocustomerreportlist;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}
	public String getInvoiceDate() {
		return invoiceDate;
	}
	public void setInvoiceDate(String invoiceDate) {
		this.invoiceDate = invoiceDate;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getSubtotal1() {
		return subtotal1;
	}
	public void setSubtotal1(String subtotal1) {
		this.subtotal1 = subtotal1;
	}
	public ArrayList<GSTJSON> getBusinesstobusinessreportlist() {
		return businesstobusinessreportlist;
	}
	public void setBusinesstobusinessreportlist(ArrayList<GSTJSON> businesstobusinessreportlist) {
		this.businesstobusinessreportlist = businesstobusinessreportlist;
	}
	public ArrayList<GSTJSON> getPurchaseRetrievelist() {
		return purchaseRetrievelist;
	}
	public void setPurchaseRetrievelist(ArrayList<GSTJSON> purchaseRetrievelist) {
		this.purchaseRetrievelist = purchaseRetrievelist;
	}
	public ArrayList<GSTJSON> getSaleRetrievelist() {
		return saleRetrievelist;
	}
	public void setSaleRetrievelist(ArrayList<GSTJSON> saleRetrievelist) {
		this.saleRetrievelist = saleRetrievelist;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMonth() {
		return month;
	}
	public void setMonth(String month) {
		this.month = month;
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
	public String getTotalgst() {
		return totalgst;
	}
	public void setTotalgst(String totalgst) {
		this.totalgst = totalgst;
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
	
	

	
	
	

}
