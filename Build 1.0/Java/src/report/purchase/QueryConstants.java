package report.purchase;

public interface QueryConstants {

	//--------QUERY FOR DAILY PURCHASE REPORT--------------//
	
	String SELECT_DAILY_PURCHASE_INV = "SELECT  DISTINCT(invoiceNo) FROM PurchaseInvoiceTable WHERE date(Date) = ? AND companyId= ?  and  Status = '0' ";
	
	String DAILY_PURCHASE_REPORT = "SELECT invoiceNo,Date,vendorName,contactNo,Payment_status,finalAmountTotal,subtotal1,vendorId FROM PurchaseInvoiceTable WHERE date(Date) = ? and companyId=? and invoiceNo = ? limit 1 ";
	
	String DAILY_PURCHASE_REPORT_DEL = " delete from PurchaseInvoiceTable  WHERE invoiceNo = ? and companyId=? ";
	
	String DAILY_VENDOR_STATE_DEL = " delete from VendorStatement WHERE invoiceNo = ? and companyId= ? ";
	
	String UPDATE_ORDERNUMBER="UPDATE VendorTable SET orderNumber=orderNumber-1 where contactNo = ? and companyId= ?";
	
	
	String PURCHASE_REPORT_VIEW = " SELECT vendorName,contactno,Invoicedate,duedate,productname,size,unit,"
			+"quantity,rate,total,cgsta,sgsta,igsta,finalamount,subtotal1,totalgst,adjustment,shipping,"
			+"discount,height,width,description,amount,totalcgst,totalsgst,totaligst,finalAmountTotal,productId from PurchaseInvoiceTable where invoiceNo = ? and companyId= ? " ;
	

	String PURCHASE_REPORT_VIEW_CUST_DETAIL = "SELECT address,gstno,email FROM VendorTable WHERE contactNo = ? and companyId= ? ";

	String SALES_REPORT_VIEW_COMPANY_ADDRESS="SELECT address FROM StaffTable WHERE staffId = '1' ";
	

	//--------QUERY FOR MONTHLY ESTIMATE REPORT--------------//

	String SELECT_MONTHLY_PURCHASE_INV = "SELECT  DISTINCT(invoiceNo) FROM PurchaseInvoiceTable WHERE month(Date) = ? AND Status = '0' and companyId= ? ";
	
	String MONTHLY_PURCHASE_REPORT =  "SELECT invoiceNo,Date,vendorName,contactNo,Payment_status,finalAmountTotal,subtotal1,vendorId FROM PurchaseInvoiceTable WHERE month(Date) = ?  and companyId= ? and invoiceNo = ? limit 1 ";
	
	//--------QUERY FOR YEARLY PURCHASE REPORT--------------//
	
	
	String SELECT_YEARLY_PURCHASE_INV = "SELECT  DISTINCT(invoiceNo) FROM PurchaseInvoiceTable WHERE date(Date) BETWEEN ? AND ?  AND Status = '0' and companyId=? ";

	String YEARLY_PURCHASE_REPORT = "SELECT invoiceNo,Date,vendorName,contactNo,Payment_status,finalAmountTotal,subtotal1,vendorId FROM PurchaseInvoiceTable WHERE date(Date) BETWEEN ? AND ?  and companyId=? and  invoiceNo = ? limit 1 ";

	
	//--------QUERY FOR DATE WISE PURCHASE REPORT--------------//
	
	String SELECT_DATE_WISE_PURCHASE_INV = "SELECT  DISTINCT(invoiceNo) FROM PurchaseInvoiceTable WHERE date(Date) BETWEEN ? AND ?  AND Status = '0' and companyId= ? ";
	
	String DATE_WISE_PURCHASE_REPORT = "SELECT invoiceNo,date(date) as Date,vendorName,contactNo,Payment_status,finalAmountTotal,subtotal1,vendorId FROM PurchaseInvoiceTable WHERE date(date) BETWEEN ? AND ? and companyId=? and  invoiceNo = ? limit 1 ";

	 String Purchase_Invoice_BalanceAmt="UPDATE PurchaseInvoiceTable SET finalAmountTotal = ? where invoiceNo = ? and companyId= ? ";
	 

		String Vend_Statement_Insert ="insert into VendorStatement(invoiceNo,vendorName,balanceAmt,discount,pay,date,dueAmount,paymentMode,vendorId,companyId) VALUES(?,?,?,?,?,?,?,?,?,?)";
		
		String InvoicePayment_Report="select date,invoiceNo,vendorName,dueAmount,discount,pay,balanceAmt,paymentMode from VendorStatement where Status = '0' and companyId= ? ";
	    
		String VendorStatement_Report="select date,invoiceNo,vendorName,dueAmount,discount,pay,balanceAmt,paymentMode from VendorStatement  where date(DATE) BETWEEN ? AND ? and  vendorId = ? and Status = '0' and companyId = ? ";

		String VendorStatement_CUST_DETAIL = "SELECT vendorName,address,gstno,email,contactNo FROM VendorTable WHERE vendorId = ? and companyId= ? ";
 
	String Invoice_Amount = "Select sum(sTotal) as SaleInvoice_Total_Amt from PurchaseInvoiceTable where date(DATE) BETWEEN ? AND ? and vendorId = ?  and companyId= ? ";
		
		String Amount_Paid = "Select sum(pay) as Amount_Paid,sum(discount) as Discount from VendorStatement where date(DATE) BETWEEN ? AND ? and  vendorId = ? and Status = '0' and companyId= ? ";
		
	
	


}