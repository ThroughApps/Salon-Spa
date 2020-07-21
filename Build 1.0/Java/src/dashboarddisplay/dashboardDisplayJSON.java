package dashboarddisplay;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;





public class dashboardDisplayJSON {
	/*private String vendorName;
	private ArrayList<dashboardDisplayJSON> selectvendornamelist ;
	*/
	
	//for dashboard 
	private String date;
	private String companyId;
	private String current_Month;
	private String current_Year;
	private String productName;
	private String quantity;
	private String yearlyExpense;
	private String dailyExpense;
	private String dailySales;
	private String yearlySales;
	private String monthly_SalesInvoice="0";
	private String monthly_EstimateInvoice="0";
	private String monthly_PurchaseInvoice="0";
	private String monthly_ExpenseInvoice="0";
	private String daily_PurchaseInvoice="0";
	private String yearly_PurchaseInvoice="0";
	private String Total_No_of_Vendors="0";
	private String Total_No_of_Customers="0";
	private String Total_No_of_ProductList="0";
	private String Total_No_of_SaleInvoice="0";
	private String Total_No_of_WithGST_Quotation="0";

	private String Total_No_of_SaleInvoice_Qty;
	private String Total_No_of_SaleInvoice_Qty_Estimate;
	private String Total_No_of_Salary_paid;
	
	
	private String Total_Sales_Amount_sale_Monthwise="0";
	private String Total_Purchase_Amount_sale_Monthwise="0";
	
	private ArrayList<dashboardDisplayJSON> dashboard_LineChart_List;
	private ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_purchase;
	private ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_estimate;
	private ArrayList<dashboardDisplayJSON> dailyInvoiceList;
	private ArrayList<dashboardDisplayJSON> dailyList;
	private ArrayList<dashboardDisplayJSON> monthlyList;
	private ArrayList<dashboardDisplayJSON> yearlyList;
	private ArrayList<dashboardDisplayJSON> criticalReportDataList;

	private ArrayList<dashboardDisplayJSON>  dailyEmployeeStatisticsDataList;
	private ArrayList<dashboardDisplayJSON>  monthlyEmployeeStatisticsDataList;
	private ArrayList<dashboardDisplayJSON>  yearlyEmployeeStatisticsDataList;
	private String taxAmount;
	
	
	private ArrayList<dashboardDisplayJSON> topSalesPerMonth;
	private ArrayList<dashboardDisplayJSON> topSalesPerYear;
	private String Total_Sales_Amount_Annually="0";
	private String Total_Purchase_Amount_Annually="0";	
	private String Total_Estimate_Amount_Annually="0";
	private String monthlySales;
	
	public String getMonthly_EstimateInvoice() {
		return monthly_EstimateInvoice;
	}
	public void setMonthly_EstimateInvoice(String monthly_EstimateInvoice) {
		this.monthly_EstimateInvoice = monthly_EstimateInvoice;
	}
	private String invoiceNo;
	private String userName;
	private String contact;
	private String status;
	private String subTotal;
	private String dailyPaymentStatics;
	private String monthlyPaymentStatics;
	private String yearlyPaymentStatics;
	
	private String dailyCashPaymentStatics;
	private String monthlyCashPaymentStatics;
	private String yearlyCashPaymentStatics;
	
	private String dailyCardPaymentStatics;
	private String monthlyCardPaymentStatics;
	private String yearlyCardPaymentStatics;

	private String dailyChequePaymentStatics;
	private String monthlyChequePaymentStatics;
	private String yearlyChequePaymentStatics;
	
	private String dailyOnlinePaymentStatics;;
	private String monthlyOnlinePaymentStatics;
	private String yearlyOnlinePaymentStatics;
	private String cashpayStaticsAmount;
	private String cardpayStaticsAmount;
	private String chequepayStaticsAmount;
	private String onlinepayStaticsAmount;
	
	private String staffName;
	private String roleName;
	private String noOfService;
	private String serviceAmount;
	
 
	
	
	public ArrayList<dashboardDisplayJSON> getDailyEmployeeStatisticsDataList() {
		return dailyEmployeeStatisticsDataList;
	}
	public void setDailyEmployeeStatisticsDataList(ArrayList<dashboardDisplayJSON> dailyEmployeeStatisticsDataList) {
		this.dailyEmployeeStatisticsDataList = dailyEmployeeStatisticsDataList;
	}
	public ArrayList<dashboardDisplayJSON> getMonthlyEmployeeStatisticsDataList() {
		return monthlyEmployeeStatisticsDataList;
	}
	public void setMonthlyEmployeeStatisticsDataList(ArrayList<dashboardDisplayJSON> monthlyEmployeeStatisticsDataList) {
		this.monthlyEmployeeStatisticsDataList = monthlyEmployeeStatisticsDataList;
	}
	public ArrayList<dashboardDisplayJSON> getYearlyEmployeeStatisticsDataList() {
		return yearlyEmployeeStatisticsDataList;
	}
	public void setYearlyEmployeeStatisticsDataList(ArrayList<dashboardDisplayJSON> yearlyEmployeeStatisticsDataList) {
		this.yearlyEmployeeStatisticsDataList = yearlyEmployeeStatisticsDataList;
	}
	public String getStaffName() {
		return staffName;
	}
	public void setStaffName(String staffName) {
		this.staffName = staffName;
	}
	public String getRoleName() {
		return roleName;
	}
	public void setRoleName(String roleName) {
		this.roleName = roleName;
	}
	public String getNoOfService() {
		return noOfService;
	}
	public void setNoOfService(String noOfService) {
		this.noOfService = noOfService;
	}
	public String getServiceAmount() {
		return serviceAmount;
	}
	public void setServiceAmount(String serviceAmount) {
		this.serviceAmount = serviceAmount;
	}
	public ArrayList<dashboardDisplayJSON> getDashboard_LineChart_List_estimate() {
		return dashboard_LineChart_List_estimate;
	}
	public void setDashboard_LineChart_List_estimate(ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_estimate) {
		this.dashboard_LineChart_List_estimate = dashboard_LineChart_List_estimate;
	}
	public String getTotal_Estimate_Amount_Annually() {
		return Total_Estimate_Amount_Annually;
	}
	public void setTotal_Estimate_Amount_Annually(String total_Estimate_Amount_Annually) {
		Total_Estimate_Amount_Annually = total_Estimate_Amount_Annually;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getTotal_No_of_Salary_paid() {
		return Total_No_of_Salary_paid;
	}
	public void setTotal_No_of_Salary_paid(String total_No_of_Salary_paid) {
		Total_No_of_Salary_paid = total_No_of_Salary_paid;
	}
	public String getTotal_Sales_Amount_sale_Monthwise() {
		return Total_Sales_Amount_sale_Monthwise;
	}
	public void setTotal_Sales_Amount_sale_Monthwise(String total_Sales_Amount_sale_Monthwise) {
		Total_Sales_Amount_sale_Monthwise = total_Sales_Amount_sale_Monthwise;
	}
	public String getTotal_Purchase_Amount_sale_Monthwise() {
		return Total_Purchase_Amount_sale_Monthwise;
	}
	public void setTotal_Purchase_Amount_sale_Monthwise(String total_Purchase_Amount_sale_Monthwise) {
		Total_Purchase_Amount_sale_Monthwise = total_Purchase_Amount_sale_Monthwise;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getMonthly_SalesInvoice() {
		return monthly_SalesInvoice;
	}
	public void setMonthly_SalesInvoice(String monthly_SalesInvoice) {
		this.monthly_SalesInvoice = monthly_SalesInvoice;
	}
	public String getCurrent_Month() {
		return current_Month;
	}
	public void setCurrent_Month(String current_Month) {
		this.current_Month = current_Month;
	}
	public String getCurrent_Year() {
		return current_Year;
	}
	public void setCurrent_Year(String current_Year) {
		this.current_Year = current_Year;
	}
	public String getMonthly_PurchaseInvoice() {
		return monthly_PurchaseInvoice;
	}
	public void setMonthly_PurchaseInvoice(String monthly_PurchaseInvoice) {
		this.monthly_PurchaseInvoice = monthly_PurchaseInvoice;
	}
	public String getMonthly_ExpenseInvoice() {
		return monthly_ExpenseInvoice;
	}
	public void setMonthly_ExpenseInvoice(String monthly_ExpenseInvoice) {
		this.monthly_ExpenseInvoice = monthly_ExpenseInvoice;
	}
	public String getTotal_No_of_Vendors() {
		return Total_No_of_Vendors;
	}
	public void setTotal_No_of_Vendors(String total_No_of_Vendors) {
		Total_No_of_Vendors = total_No_of_Vendors;
	}
	public String getTotal_No_of_ProductList() {
		return Total_No_of_ProductList;
	}
	public void setTotal_No_of_ProductList(String total_No_of_ProductList) {
		Total_No_of_ProductList = total_No_of_ProductList;
	}
	public String getTotal_No_of_SaleInvoice() {
		return Total_No_of_SaleInvoice;
	}
	public void setTotal_No_of_SaleInvoice(String total_No_of_SaleInvoice) {
		Total_No_of_SaleInvoice = total_No_of_SaleInvoice;
	}
	public String getTotal_No_of_WithGST_Quotation() {
		return Total_No_of_WithGST_Quotation;
	}
	public void setTotal_No_of_WithGST_Quotation(String total_No_of_WithGST_Quotation) {
		Total_No_of_WithGST_Quotation = total_No_of_WithGST_Quotation;
	}
	public String getTotal_No_of_SaleInvoice_Qty() {
		return Total_No_of_SaleInvoice_Qty;
	}
	public void setTotal_No_of_SaleInvoice_Qty(String total_No_of_SaleInvoice_Qty) {
		Total_No_of_SaleInvoice_Qty = total_No_of_SaleInvoice_Qty;
	}
	public String getTotal_No_of_SaleInvoice_Qty_Estimate() {
		return Total_No_of_SaleInvoice_Qty_Estimate;
	}
	public void setTotal_No_of_SaleInvoice_Qty_Estimate(String total_No_of_SaleInvoice_Qty_Estimate) {
		Total_No_of_SaleInvoice_Qty_Estimate = total_No_of_SaleInvoice_Qty_Estimate;
	}
	public ArrayList<dashboardDisplayJSON> getDashboard_LineChart_List() {
		return dashboard_LineChart_List;
	}
	public void setDashboard_LineChart_List(ArrayList<dashboardDisplayJSON> dashboard_LineChart_List) {
		this.dashboard_LineChart_List = dashboard_LineChart_List;
	}
	public ArrayList<dashboardDisplayJSON> getDashboard_LineChart_List_purchase() {
		return dashboard_LineChart_List_purchase;
	}
	public void setDashboard_LineChart_List_purchase(ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_purchase) {
		this.dashboard_LineChart_List_purchase = dashboard_LineChart_List_purchase;
	}
	public String getTotal_Sales_Amount_Annually() {
		return Total_Sales_Amount_Annually;
	}
	public void setTotal_Sales_Amount_Annually(String total_Sales_Amount_Annually) {
		Total_Sales_Amount_Annually = total_Sales_Amount_Annually;
	}
	public String getTotal_Purchase_Amount_Annually() {
		return Total_Purchase_Amount_Annually;
	}
	public void setTotal_Purchase_Amount_Annually(String total_Purchase_Amount_Annually) {
		Total_Purchase_Amount_Annually = total_Purchase_Amount_Annually;
	}
	public ArrayList<dashboardDisplayJSON> getDailyInvoiceList() {
		return dailyInvoiceList;
	}
	public void setDailyInvoiceList(ArrayList<dashboardDisplayJSON> dailyInvoiceList) {
		this.dailyInvoiceList = dailyInvoiceList;
	}
	public String getInvoiceNo() {
		return invoiceNo;
	}
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
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
	public String getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}
	public String getProductName() {
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public String getQuantity() {
		return quantity;
	}
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}
	public ArrayList<dashboardDisplayJSON> getTopSalesPerMonth() {
		return topSalesPerMonth;
	}
	public void setTopSalesPerMonth(ArrayList<dashboardDisplayJSON> topSalesPerMonth) {
		this.topSalesPerMonth = topSalesPerMonth;
	}
	public ArrayList<dashboardDisplayJSON> getTopSalesPerYear() {
		return topSalesPerYear;
	}
	public void setTopSalesPerYear(ArrayList<dashboardDisplayJSON> topSalesPerYear) {
		this.topSalesPerYear = topSalesPerYear;
	}
	public String getYearlyExpense() {
		return yearlyExpense;
	}
	public void setYearlyExpense(String yearlyExpense) {
		this.yearlyExpense = yearlyExpense;
	}
	public String getDailyExpense() {
		return dailyExpense;
	}
	public void setDailyExpense(String dailyExpense) {
		this.dailyExpense = dailyExpense;
	}
	public String getDailySales() {
		return dailySales;
	}
	public void setDailySales(String dailySales) {
		this.dailySales = dailySales;
	}
	public String getYearlySales() {
		return yearlySales;
	}
	public void setYearlySales(String yearlySales) {
		this.yearlySales = yearlySales;
	}
	public String getMonthlySales() {
		return monthlySales;
	}
	public void setMonthlySales(String monthlySales) {
		this.monthlySales = monthlySales;
	}
	public ArrayList<dashboardDisplayJSON> getDailyList() {
		return dailyList;
	}
	public void setDailyList(ArrayList<dashboardDisplayJSON> dailyList) {
		this.dailyList = dailyList;
	}
	public ArrayList<dashboardDisplayJSON> getMonthlyList() {
		return monthlyList;
	}
	public void setMonthlyList(ArrayList<dashboardDisplayJSON> monthlyList) {
		this.monthlyList = monthlyList;
	}
	public ArrayList<dashboardDisplayJSON> getYearlyList() {
		return yearlyList;
	}
	public void setYearlyList(ArrayList<dashboardDisplayJSON> yearlyList) {
		this.yearlyList = yearlyList;
	}
	public String getDaily_PurchaseInvoice() {
		return daily_PurchaseInvoice;
	}
	public void setDaily_PurchaseInvoice(String daily_PurchaseInvoice) {
		this.daily_PurchaseInvoice = daily_PurchaseInvoice;
	}
	public String getYearly_PurchaseInvoice() {
		return yearly_PurchaseInvoice;
	}
	public void setYearly_PurchaseInvoice(String yearly_PurchaseInvoice) {
		this.yearly_PurchaseInvoice = yearly_PurchaseInvoice;
	}
	public String getTotal_No_of_Customers() {
		return Total_No_of_Customers;
	}
	public void setTotal_No_of_Customers(String total_No_of_Customers) {
		Total_No_of_Customers = total_No_of_Customers;
	}
	public ArrayList<dashboardDisplayJSON> getCriticalReportDataList() {
		return criticalReportDataList;
	}
	public void setCriticalReportDataList(ArrayList<dashboardDisplayJSON> criticalReportDataList) {
		this.criticalReportDataList = criticalReportDataList;
	}
	public String getDailyPaymentStatics() {
		return dailyPaymentStatics;
	}
	public void setDailyPaymentStatics(String dailyPaymentStatics) {
		this.dailyPaymentStatics = dailyPaymentStatics;
	}
	public String getMonthlyPaymentStatics() {
		return monthlyPaymentStatics;
	}
	public void setMonthlyPaymentStatics(String monthlyPaymentStatics) {
		this.monthlyPaymentStatics = monthlyPaymentStatics;
	}
	public String getYearlyPaymentStatics() {
		return yearlyPaymentStatics;
	}
	public void setYearlyPaymentStatics(String yearlyPaymentStatics) {
		this.yearlyPaymentStatics = yearlyPaymentStatics;
	}
	public String getDailyCashPaymentStatics() {
		return dailyCashPaymentStatics;
	}
	public void setDailyCashPaymentStatics(String dailyCashPaymentStatics) {
		this.dailyCashPaymentStatics = dailyCashPaymentStatics;
	}
	public String getMonthlyCashPaymentStatics() {
		return monthlyCashPaymentStatics;
	}
	public void setMonthlyCashPaymentStatics(String monthlyCashPaymentStatics) {
		this.monthlyCashPaymentStatics = monthlyCashPaymentStatics;
	}
	public String getYearlyCashPaymentStatics() {
		return yearlyCashPaymentStatics;
	}
	public void setYearlyCashPaymentStatics(String yearlyCashPaymentStatics) {
		this.yearlyCashPaymentStatics = yearlyCashPaymentStatics;
	}
	public String getDailyCardPaymentStatics() {
		return dailyCardPaymentStatics;
	}
	public void setDailyCardPaymentStatics(String dailyCardPaymentStatics) {
		this.dailyCardPaymentStatics = dailyCardPaymentStatics;
	}
	public String getMonthlyCardPaymentStatics() {
		return monthlyCardPaymentStatics;
	}
	public void setMonthlyCardPaymentStatics(String monthlyCardPaymentStatics) {
		this.monthlyCardPaymentStatics = monthlyCardPaymentStatics;
	}
	public String getYearlyCardPaymentStatics() {
		return yearlyCardPaymentStatics;
	}
	public void setYearlyCardPaymentStatics(String yearlyCardPaymentStatics) {
		this.yearlyCardPaymentStatics = yearlyCardPaymentStatics;
	}
	public String getDailyChequePaymentStatics() {
		return dailyChequePaymentStatics;
	}
	public void setDailyChequePaymentStatics(String dailyChequePaymentStatics) {
		this.dailyChequePaymentStatics = dailyChequePaymentStatics;
	}
	
	public String getMonthlyChequePaymentStatics() {
		return monthlyChequePaymentStatics;
	}
	public void setMonthlyChequePaymentStatics(String monthlyChequePaymentStatics) {
		this.monthlyChequePaymentStatics = monthlyChequePaymentStatics;
	}
	public String getYearlyChequePaymentStatics() {
		return yearlyChequePaymentStatics;
	}
	public void setYearlyChequePaymentStatics(String yearlyChequePaymentStatics) {
		this.yearlyChequePaymentStatics = yearlyChequePaymentStatics;
	}
	public String getDailyOnlinePaymentStatics() {
		return dailyOnlinePaymentStatics;
	}
	public void setDailyOnlinePaymentStatics(String dailyOnlinePaymentStatics) {
		this.dailyOnlinePaymentStatics = dailyOnlinePaymentStatics;
	}
	public String getMonthlyOnlinePaymentStatics() {
		return monthlyOnlinePaymentStatics;
	}
	public void setMonthlyOnlinePaymentStatics(String monthlyOnlinePaymentStatics) {
		this.monthlyOnlinePaymentStatics = monthlyOnlinePaymentStatics;
	}
	public String getYearlyOnlinePaymentStatics() {
		return yearlyOnlinePaymentStatics;
	}
	public void setYearlyOnlinePaymentStatics(String yearlyOnlinePaymentStatics) {
		this.yearlyOnlinePaymentStatics = yearlyOnlinePaymentStatics;
	}
	public String getCashpayStaticsAmount() {
		return cashpayStaticsAmount;
	}
	public void setCashpayStaticsAmount(String cashpayStaticsAmount) {
		this.cashpayStaticsAmount = cashpayStaticsAmount;
	}
	public String getCardpayStaticsAmount() {
		return cardpayStaticsAmount;
	}
	public void setCardpayStaticsAmount(String cardpayStaticsAmount) {
		this.cardpayStaticsAmount = cardpayStaticsAmount;
	}
	public String getChequepayStaticsAmount() {
		return chequepayStaticsAmount;
	}
	public void setChequepayStaticsAmount(String chequepayStaticsAmount) {
		this.chequepayStaticsAmount = chequepayStaticsAmount;
	}
	public String getOnlinepayStaticsAmount() {
		return onlinepayStaticsAmount;
	}
	public void setOnlinepayStaticsAmount(String onlinepayStaticsAmount) {
		this.onlinepayStaticsAmount = onlinepayStaticsAmount;
	}
	public String getTaxAmount() {
		return taxAmount;
	}
	public void setTaxAmount(String taxAmount) {
		this.taxAmount = taxAmount;
	}
	


	
}
