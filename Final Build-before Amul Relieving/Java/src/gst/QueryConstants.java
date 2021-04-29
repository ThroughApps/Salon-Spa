package gst;

public interface QueryConstants {
	
	
		
	String MONTHLY_SALES_REPORT = "SELECT sum(totalgst) AS totalgst,sum(totalcgst) AS totalcgst,sum(totalsgst) AS totalsgst,sum(totaligst) AS totaligst FROM SaleInvoiceTable WHERE month(DATE) = ? and companyId= ? ";

	String MONTHLY_PURCHASE_REPORT = "SELECT sum(totalgst) AS totalgst,sum(totalcgst) AS totalcgst,sum(totalsgst) AS totalsgst,sum(totaligst) AS totaligst FROM PurchaseInvoiceTable WHERE month(DATE) = ? and companyId= ? ";

	String BUSINESS_BUSINESS_REPORT = "SELECT invoiceNo,invoiceDate,vendorName,totalgst,totalcgst,totalsgst,totaligst,subtotal1 FROM PurchaseInvoiceTable WHERE month(DATE) = ? and companyId= ? and invoiceNo = ? limit 1 ";
	
	String BUSINESS_Customer_REPORT = "SELECT invoiceNo,invoiceDate,customerName,totalgst,totalcgst,totalsgst,totaligst,subtotal1 FROM SaleInvoiceTable WHERE month(DATE) = ? and  companyId= ? and invoiceNo = ? limit 1";

	String SELECT_GST_INV = "SELECT  DISTINCT(invoiceNo) FROM $tableName WHERE Status = '0' and companyId= ? ";
	  
}
