package master;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;



public class MasterJSON {
	private String customerName;
	private String companyName="-";
	private String address="-";
	private String city;
	private String contactNo;
	private String alternateContactNo;
	private String gstNo;
	private String email;
	private String id;
	private String customerId;
	private String vendorId;
	private String productId;
	private String vendorName;
	private ArrayList<MasterJSON> customerRetrievelist ;
	private ArrayList<MasterJSON> vendorRetrievelist ;
	private ArrayList<MasterJSON> saleProductRetrievelist;
	private ArrayList<MasterJSON> purchaseProductRetrievelist;
	private String productName;
	private String unit;
	private String cgst;
	private String sgst;
	private String igst;
	private String hsnCode;
	private String rate;
	private String description;
	private String productCategory;	
	private String companyId;
	private String OldCustomerName;
	private String OldCompanyName;
	private String OldAddress;
	private String OldCity;
	private String OldContactNo;
	private String OldAlternateContactNo;
	private String OldGstNo;
	private String OldEmail;
	private String OldVendorName;
	private String OldProductName;
	private String OldUnit;
	private String OldCgst;
	private String OldSgst;
	private String OldIgst;
	private String OldHsnCode;
	private String minimumServiceTime;
	private String staffId;
	private String employeeName;
	private String role;
	
	
	private String OldDescription;
	private String OldProductCategory;
	private String productType;
	private String quantity;
	private String invenLimit;
	private String quantityLimit;
	private int dataCount;
	private String landlineNo;
	private String saleRate;
	private String purchaseRate;

	
	

	
	
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
	public String getSaleRate() {
		return saleRate;
	}
	public void setSaleRate(String saleRate) {
		this.saleRate = saleRate;
	}
	public String getPurchaseRate() {
		return purchaseRate;
	}
	public void setPurchaseRate(String purchaseRate) {
		this.purchaseRate = purchaseRate;
	}
	public String getQuantityLimit() {
		return quantityLimit;
	}
	public void setQuantityLimit(String quantityLimit) {
		this.quantityLimit = quantityLimit;
	}
	public String getProductType() {
		return productType;
	}
	public void setProductType(String productType) {
		this.productType = productType;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public int getDataCount() {
		return dataCount;
	}
	public void setDataCount(int dataCount) {
		this.dataCount = dataCount;
	}
	public String getOldCustomerName() {
		return OldCustomerName;
	}
	public void setOldCustomerName(String oldCustomerName) {
		OldCustomerName = oldCustomerName;
	}
	public String getOldCompanyName() {
		return OldCompanyName;
	}
	public void setOldCompanyName(String oldCompanyName) {
		OldCompanyName = oldCompanyName;
	}
	public String getOldAddress() {
		return OldAddress;
	}
	public void setOldAddress(String oldAddress) {
		OldAddress = oldAddress;
	}
	public String getOldCity() {
		return OldCity;
	}
	public void setOldCity(String oldCity) {
		OldCity = oldCity;
	}
	public String getOldContactNo() {
		return OldContactNo;
	}
	public void setOldContactNo(String oldContactNo) {
		OldContactNo = oldContactNo;
	}
	public String getOldAlternateContactNo() {
		return OldAlternateContactNo;
	}
	public void setOldAlternateContactNo(String oldAlternateContactNo) {
		OldAlternateContactNo = oldAlternateContactNo;
	}
	public String getOldGstNo() {
		return OldGstNo;
	}
	public void setOldGstNo(String oldGstNo) {
		OldGstNo = oldGstNo;
	}
	public String getOldEmail() {
		return OldEmail;
	}
	public void setOldEmail(String oldEmail) {
		OldEmail = oldEmail;
	}
	public String getOldVendorName() {
		return OldVendorName;
	}
	public void setOldVendorName(String oldVendorName) {
		OldVendorName = oldVendorName;
	}
	public String getOldProductName() {
		return OldProductName;
	}
	public void setOldProductName(String oldProductName) {
		OldProductName = oldProductName;
	}
	public String getOldUnit() {
		return OldUnit;
	}
	public void setOldUnit(String oldUnit) {
		OldUnit = oldUnit;
	}
	public String getOldCgst() {
		return OldCgst;
	}
	public void setOldCgst(String oldCgst) {
		OldCgst = oldCgst;
	}
	public String getOldSgst() {
		return OldSgst;
	}
	public void setOldSgst(String oldSgst) {
		OldSgst = oldSgst;
	}
	public String getOldIgst() {
		return OldIgst;
	}
	public void setOldIgst(String oldIgst) {
		OldIgst = oldIgst;
	}
	public String getOldHsnCode() {
		return OldHsnCode;
	}
	public void setOldHsnCode(String oldHsnCode) {
		OldHsnCode = oldHsnCode;
	}

	public String getOldDescription() {
		return OldDescription;
	}
	public void setOldDescription(String oldDescription) {
		OldDescription = oldDescription;
	}
	public String getOldProductCategory() {
		return OldProductCategory;
	}
	public void setOldProductCategory(String oldProductCategory) {
		OldProductCategory = oldProductCategory;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getProductId() {
		return productId;
	}
	public void setProductId(String productId) {
		this.productId = productId;
	}
	public String getVendorId() {
		return vendorId;
	}
	public void setVendorId(String vendorId) {
		this.vendorId = vendorId;
	}
	public String getCustomerId() {
		return customerId;
	}
	public void setCustomerId(String customerId) {
		this.customerId = customerId;
	}
	
	public ArrayList<MasterJSON> getPurchaseProductRetrievelist() {
		return purchaseProductRetrievelist;
	}
	public void setPurchaseProductRetrievelist(ArrayList<MasterJSON> purchaseProductRetrievelist) {
		this.purchaseProductRetrievelist = purchaseProductRetrievelist;
	}
	public ArrayList<MasterJSON> getSaleProductRetrievelist() {
		return saleProductRetrievelist;
	}
	public void setSaleProductRetrievelist(ArrayList<MasterJSON> saleProductRetrievelist) {
		this.saleProductRetrievelist = saleProductRetrievelist;
	}
	public String getProductCategory() {
		return productCategory;
	}
	public void setProductCategory(String productCategory) {
		this.productCategory = productCategory;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getUnit() {
		return unit;
	}
	public void setUnit(String unit) {
		this.unit = unit;
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
	public String getHsnCode() {
		return hsnCode;
	}
	public void setHsnCode(String hsnCode) {
		this.hsnCode = hsnCode;
	}
	public String getRate() {
		return rate;
	}
	public void setRate(String rate) {
		this.rate = rate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public ArrayList<MasterJSON> getVendorRetrievelist() {
		return vendorRetrievelist;
	}
	public void setVendorRetrievelist(ArrayList<MasterJSON> vendorRetrievelist) {
		this.vendorRetrievelist = vendorRetrievelist;
	}
	public String getVendorName() {
		return vendorName;
	}
	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}

	
	public ArrayList<MasterJSON> getCustomerRetrievelist() {
		return customerRetrievelist;
	}
	public void setCustomerRetrievelist(ArrayList<MasterJSON> customerRetrievelist) {
		this.customerRetrievelist = customerRetrievelist;
	}
	public String getCustomerName() {
		return customerName;
	}
	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}
	public String getCompanyName() {
		return companyName;
	}
	public void setCompanyName(String companyName) {
		this.companyName = companyName;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	
	public String getAlternateContactNo() {
		return alternateContactNo;
	}
	public void setAlternateContactNo(String alternateContactNo) {
		this.alternateContactNo = alternateContactNo;
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
	public String getInvenLimit() {
		return invenLimit;
	}
	public void setInvenLimit(String invenLimit) {
		this.invenLimit = invenLimit;
	}
	public String getLandlineNo() {
		return landlineNo;
	}
	public void setLandlineNo(String landlineNo) {
		this.landlineNo = landlineNo;
	}
	public String getMinimumServiceTime() {
		return minimumServiceTime;
	}
	public void setMinimumServiceTime(String minimumServiceTime) {
		this.minimumServiceTime = minimumServiceTime;
	}
	
	
	
}
