package report.estimate;

public interface QueryConstants {

	//--------QUERY FOR DAILY ESTIMATE REPORT--------------//
	
	String SELECT_DAILY_ESTIMATE_INV = "SELECT  DISTINCT(invoiceNo) FROM EstimateInvoiceTable WHERE date(Date) = ? AND Status = '0' and companyId= ? ";
	
	String DAILY_ESTIMATE_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM EstimateInvoiceTable WHERE date(Date) = ? and companyId= ? and invoiceNo = ? limit 1 ";

	String DAILY_ESTIMATE_REPORT_DEL = "delete from EstimateInvoiceTable  WHERE invoiceNo = ? and companyId= ?";
		//	" DELETE FROM EstimateInvoiceTable WHERE EstimateId = ? AND date = ? ";
	
	String DAILY_ESTIMATE_STATE_DEL = "delete from EstimateStatement WHERE invoiceNo = ? and companyId= ? ";
	
	String UPDATE_ORDERNUMBER="UPDATE CustomerTable SET eorderNumber=eorderNumber-1 where contactNo = ? and companyId= ?";
	
	
	String ESTIMATE_REPORT_VIEW = " SELECT customername,contactno,Invoicedate,duedate,productname,size,unit,"
			+"quantity,rate,total,subtotal1,advance,"
			+"discount,balance_amount,amount,height,width,description,serviceBy,productId from EstimateInvoiceTable where invoiceNo = ? and companyId= ? " ;
	
	String ESTIMATE_REPORT_VIEW_CUST_DETAIL = "SELECT address,gstno,email FROM CustomerTable WHERE contactNo = ? and companyId= ? ";


	String SALES_REPORT_VIEW_COMPANY_ADDRESS="SELECT address FROM StaffTable WHERE staffId = '1' ";
	
	//--------QUERY FOR MONTHLY ESTIMATE REPORT--------------//

	String SELECT_MONTHLY_ESTIMATE_INV = "SELECT  DISTINCT(invoiceNo) FROM EstimateInvoiceTable WHERE month(Date) = ? AND Status = '0' and companyId= ?  ";

	String MOTHLY_ESTIMATE_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM EstimateInvoiceTable WHERE month(Date) = ? and companyId=? and  invoiceNo = ? limit 1 ";

	
	//--------QUERY FOR YEARLY ESTIMATE REPORT--------------//
	
	String SELECT_YEARLY_ESTIMATE_INV = "SELECT  DISTINCT(invoiceNo) FROM EstimateInvoiceTable WHERE date(Date) BETWEEN ? AND ? AND Status = '0' and companyId= ?  ";

	String YEARLY_ESTIMATE_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM EstimateInvoiceTable WHERE date(Date) BETWEEN ? AND ? and companyId= ? and  invoiceNo = ? limit 1  ";
	
	
	//--------QUERY FOR DATE WISE ESTIMATE REPORT--------------//
	
	String SELECT_DATE_WISE_ESTIMATE_INV = "SELECT  DISTINCT(invoiceNo) FROM EstimateInvoiceTable WHERE date(Date) BETWEEN ? AND ?  AND Status = '0' and companyId= ? ";
	
	String DATE_WISE_ESTIMATE_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM EstimateInvoiceTable WHERE date(Date) BETWEEN ? AND ? and companyId= ? and invoiceNo = ? limit 1  ";
 
	 String Invoice_BalanceAmt="UPDATE EstimateInvoiceTable SET balance_amount = ?,advance=?,discount=? where invoiceNo = ? and companyId= ? ";
		
	 String Invoice_Advance="select advance,discount from EstimateInvoiceTable where invoiceNo = ? and companyId= ? ";
	 String Est_Statement_Insert ="insert into EstimateStatement(invoiceNo,userName,balanceAmt,discount,pay,date,dueAmount,paymentMode,customerId,companyId) VALUES(?,?,?,?,?,?,?,?,?,?)";
		
		String InvoicePayment_Report="select date,invoiceNo,userName,dueAmount,discount,pay,balanceAmt,paymentMode from EstimateStatement where Status = '0' and companyId= ?  ";
	     
		String EstimateCustomerStatement_Report="select date,invoiceNo,userName,dueAmount,discount,pay,balanceAmt,paymentMode from EstimateStatement where date(DATE) BETWEEN ? AND ? and  customerId = ? and  Status = '0' and companyId= ?  ";
		
		String SalesCustomerStatement_CUST_DETAIL = "SELECT customerName,address,gstno,email,contactNo FROM CustomerTable WHERE customerId = ? and companyId= ?  ";

		String Invoice_Amount = "Select sum(total) as SaleInvoice_Total_Amt from EstimateInvoiceTable where date(DATE) BETWEEN ? AND ? and  customerId = ? and companyId= ?  ";
		
		String Amount_Paid = "Select sum(pay) as Amount_Paid,sum(discount) as Discount from EstimateStatement where date(DATE) BETWEEN ? AND ? and  customerId = ? and  Status = '0' and companyId=?  ";
		
		String EMP_SELECT_AUDIT_REPORT="SELECT staffId,staffName,Role,Operation,affectedId,affectedName,date(date) as date,time(date) as time from AuditReportTable where CompanyId = ? And   date(Date) BETWEEN ? AND ?";
		
		

}