package report.sales;

public interface QueryConstants {

	//--------QUERY FOR DAILY SALES REPORT--------------//
	
		String SELECT_DAILY_SALES_INV = "SELECT  DISTINCT(invoiceNo) FROM SaleInvoiceTable WHERE date(Date) = ? AND Status = '0' and companyId= ? ";
		
		String DAILY_SALES_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM SaleInvoiceTable WHERE date(Date) = ? and companyId = ? and  invoiceNo = ? limit 1";
		
		String DAILY_SALES_REPORT_DEL =" delete from SaleInvoiceTable WHERE invoiceNo = ? and companyId= ? ";
		
		String DAILY_CUST_STATE_DEL =" delete from CustomerStatement WHERE invoiceNo = ? and companyId= ? ";
		String UPDATE_ORDERNUMBER="UPDATE CustomerTable SET orderNumber=orderNumber-1 where contactNo = ? and companyId= ?";
		String SALES_REPORT_VIEW = " SELECT customername,contactno,Invoicedate,duedate,productname,"
				+"quantity,rate,total,cgsta,sgsta,igsta,finalamount,subtotal1,totalgst,advance,"
				+"discount,totalcgst,totalsgst,totaligst,amount,description,productId,serviceBy,staffId from SaleInvoiceTable where invoiceNo = ? and companyId = ?  " ;
		

		String SALES_REPORT_VIEW_CUST_DETAIL = "SELECT address,gstno,email FROM CustomerTable WHERE contactNo = ? and status='0' and companyId= ? ";

		String SALES_REPORT_VIEW_COMPANY_ADDRESS="SELECT address FROM StaffTable WHERE staffId = '1' ";
		//--------QUERY FOR MONTHLY SALES REPORT--------------//
		
		String SELECT_MONTHLY_SALES_INV = "SELECT  DISTINCT(invoiceNo) FROM SaleInvoiceTable WHERE month(Date) = ? AND Status = '0' and companyId= ? ";
		
		String MONTHLY_SALES_REPORT = "SELECT SaleInvoiceId,invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM SaleInvoiceTable WHERE month(DATE) = ? and companyId = ? and invoiceNo = ? limit 1 ";


		//--------QUERY FOR YEARLY SALES REPORT--------------//
		
		String SELECT_YEARLY_SALES_INV = "SELECT  DISTINCT(invoiceNo) FROM SaleInvoiceTable WHERE date(Date) BETWEEN ? AND ? AND companyId= ? and Status = '0' ";
		
		String YERALY_SALES_REPORT = " SELECT SaleInvoiceId,invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM SaleInvoiceTable WHERE date(Date) BETWEEN ? AND ? and companyId = ? and invoiceNo = ? limit 1 ";

		//--------QUERY FOR DATE_WISE SALES REPORT--------------//
		
		String SELECT_DATE_WISE_SALES_INV = "SELECT  DISTINCT(invoiceNo) FROM SaleInvoiceTable WHERE date(Date) BETWEEN ? AND ?  AND Status = '0' and companyId = ? ";
		
		String DATE_WISE_SALES_REPORT = "SELECT SaleInvoiceId,invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,subtotal1,customerId FROM SaleInvoiceTable WHERE date(DATE) BETWEEN ? AND ? and companyId = ? and invoiceNo = ? limit 1 ";

		//--------QUERY FOR CUSTOMER STATEMENT SALES REPORT--------------//
		
		String CUST_SALES_REPORT = null;
		
		String Cust_Statement_Insert ="insert into CustomerStatement(invoiceNo,userName,balanceAmt,discount,pay,date,dueAmount,paymentMode,customerId,companyId) VALUES(?,?,?,?,?,?,?,?,?,?)";
		
	    String Invoice_BalanceAmt="UPDATE SaleInvoiceTable SET balance_amount = ? where invoiceNo = ? and companyId= ? ";
		
		String InvoicePayment_Report="select date,invoiceNo,userName,dueAmount,discount,pay,balanceAmt,paymentMode from CustomerStatement where Status = '0' and companyId= ? ";
       
		String SalesCustomerStatement_Report="select date,invoiceNo,userName,dueAmount,discount,pay,balanceAmt,paymentMode from CustomerStatement where date(DATE) BETWEEN ? AND ? and  customerId = ? and Status = '0' and companyId= ?  ";
	      
	
		String SalesCustomerStatement_CUST_DETAIL = "SELECT customerName,address,gstno,email,contactNo FROM CustomerTable WHERE customerId = ? and status='0' and companyId= ?  ";

		String Invoice_Amount = "Select sum(finalAmount) as SaleInvoice_Total_Amt from SaleInvoiceTable where date(DATE) BETWEEN ? AND ? and  customerId = ? and companyId= ?   ";
		
		String Amount_Paid = "Select sum(pay) as Amount_Paid,sum(discount) as Discount from CustomerStatement where date(DATE) BETWEEN ? AND ? and  customerId = ? and Status = '0'  and companyId= ? ";
		
		

		
}
