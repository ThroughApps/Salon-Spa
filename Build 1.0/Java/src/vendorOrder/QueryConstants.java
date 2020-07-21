package vendorOrder;

public interface QueryConstants {

	   
	   String Select_Vendor_Name ="SELECT vendorName,orderNumber,vendorId,contactNo,companyName,address,gstNo,email from VendorTable where status='0' and companyId= ? order by vendorName asc ";
	   
	   String Select_Product_Name_Rate="SELECT productName,description,saleRate,purchaseRate,cgst,sgst,igst,productType,quantity,productId,productCategory from ProductTable  where  status='0' and companyId= ?";
		
	   String PurchaseOrder_Insert="insert into PurchaseInvoiceTable(vendorName,invoiceNo,orderNumber,invoiceDate,dueDate,productName,description,rate,quantity,total,cgsta,sgsta,igsta,finalAmount,date,contactNo,totalcgst,totalsgst,totaligst,totalitemqty,subtotal1,totalgst,adjustment,discount,finalAmountTotal,shipping,payment_status,vendorId,companyId,companyName,sTotal,address,email,gstNo,productId,expiryDate) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	   	
	   String PurchaseOrder_Insert_SELECT="SELECT CONCAT('PO-',MAX(CAST(SUBSTRING(invoiceNo, 4, length(invoiceNo)-3) AS UNSIGNED))) as invoiceNo FROM PurchaseInvoiceTable where companyId = ? ";
	   
	   String Customer_OrderNumber="UPDATE VendorTable SET orderNumber = ? where vendorId = ? and companyId= ? ";
		
	   String PurchaseInvoice_Report="SELECT purchaseId,invoiceNo,date,vendorName,contactNo,finalAmountTotal,subtotal1,payment_status,shipping,vendorId,companyName,orderNumber,invoiceDate,dueDate,address,gstNo,email,adjustment,discount,description from PurchaseInvoiceTable  WHERE companyId= ? and  Status = '0' and invoiceNo = ? limit 1";

	   String SELECT_GST_INV = "SELECT  DISTINCT(invoiceNo) FROM $tableName WHERE Status = '0' and companyId=? ";

	   String GET_EMAIL_ID = "SELECT Email FROM VendorTable WHERE contactNo = ? and status= '0' ";
	   
	   String ven_Statement_Insert="insert into VendorStatement(invoiceNo,pay,discount,dueAmount,date,vendorName,balanceAmt,vendorId,companyId,address,gstNo,email) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)"; 
		
	   String VendorStat_DEL="delete from VendorStatement where  invoiceNo=? and vendorId = ?  AND companyId= ?";

	   String DAILY_PURCHASE_REPORT_DEL="delete from PurchaseInvoiceTable where  invoiceNo=? and vendorId = ?  AND companyId= ?";

	   String Update_Quantity="UPDATE ProductTable SET quantity=quantity+? where productId = ? and companyId= ? ";
		
	   String Update_Quantity_Exist="UPDATE ProductTable SET quantity=quantity-? where productId = ? and companyId= ? ";
	   
}
