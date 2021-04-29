package saleOrder;

public interface QueryConstants {

	   
	   String Select_Customer_Name ="SELECT customerName,orderNumber,customerId,contactNo,eorderNumber,address,gstNo,email,companyName,rewardPoint,expiryDate from CustomerTable where status='0' and companyId= ? order by customerName asc";
	   
	   String Select_Product_Name_Rate="SELECT productName,description,saleRate,purchaseRate,cgst,sgst,igst,productType,quantity,productId,productCategory,QuantityLimit from ProductTable  where status='0'  and companyId= ?  ";
		
	   String SaleOrder_Insert="insert into SaleInvoiceTable(customerName,invoiceNo,orderNumber,"
	   		+ "invoiceDate,dueDate,saleType,productName,description,rate,quantity,total,"
	   		+ "cgsta,sgsta,igsta,finalAmount,date,contactNo,totalcgst,totalsgst,totaligst,"
	   		+ "totalitemqty,subtotal1,totalgst,advance,discount,balance_amount,payment_status,"
	   		+ "address,gstNo,email,customerId,companyId,companyName,productId,paymentmode,serviceBy,"
	   		+ "staffId,rewardPoint,redeemPoint,redeemAmount) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,"
	   		+ "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	   	
	   String Employee_Stat_Insert="insert into EmployeeStatistics(staffName,staffId,roleName,amount,date,companyId,productName,productType) values(?,?,?,?,?,?,?,?)";
	   String SaleOrder_Insert_SELECT="   SELECT CONCAT('INV-',MAX(CAST(SUBSTRING(invoiceNo, 5, length(invoiceNo)-4) AS UNSIGNED))) as invoiceNo FROM SaleInvoiceTable where companyId=? ";
	  
	   String Select_Staff_Name ="SELECT staffId,roleName from StaffTable where status='0' and companyId= ? and staffName = ?";
		
	   
	   String Customer_OrderNumber="UPDATE CustomerTable SET orderNumber = ? where customerId = ? and companyId= ? ";
		
	   String Update_Quantity="UPDATE ProductTable SET quantity=quantity-? where productId = ? and companyId= ? ";
		
	   String Update_Quantity_Exist="UPDATE ProductTable SET quantity=? where productId = ? and companyId= ? ";
	   
	   String select_quantity="Select quantity from ProductTable where productId = ? and companyId= ? ";
		
	   
	 //  String EstimateOrder_Insert_SELECT="SELECT MAX(invoiceNo) as invoiceNo FROM EstimateInvoiceTable  where companyId = ? ";
	   
	   String EstimateOrder_Insert_SELECT="  SELECT CONCAT('EST-',MAX(CAST(SUBSTRING(invoiceNo, 5, length(invoiceNo)-4) AS UNSIGNED))) as invoiceNo FROM EstimateInvoiceTable where companyId=? ";
	   
	   String Customer_EOrderNumber="UPDATE CustomerTable SET eorderNumber = ? where customerId = ? and companyId= ? ";	   

	   String EstimateOrder_Insert="insert into EstimateInvoiceTable(customerName,"
	   		+ "invoiceNo,orderNumber,invoiceDate,dueDate,productName,description,"
	   		+ "rate,quantity,total,date,contactNo,totalitemqty,subtotal1,"
	   		+ "advance,discount,balance_amount,payment_status,"
	   		+ "customerId,companyId,companyName,address,gstNo,"
	   		+ "email,productId,paymentmode,serviceBy,staffId,"
	   		+ "rewardPoint,redeemPoint,redeemAmount) VALUES(?,?,?,?,?,?,?,?,?,?,"
	   		+ "?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
	  
	   String SaleInvoice_Report ="SELECT saleInvoiceId,invoiceNo,date,customerName,contactNo,balance_amount,subtotal1,payment_status,advance,companyName,customerId,orderNumber,invoiceDate,dueDate,address,gstNo,email,discount,staffId,paymentMode,rewardPoint from SaleInvoiceTable  WHERE companyId= ? and invoiceNo = ? limit 1  ";
		
	 //  String SaleInvoice_Report ="SELECT saleInvoiceId,invoiceNo,date,customerName,contactNo,balance_amount,subtotal1,payment_status,advance,companyName from SaleInvoiceTable  WHERE companyId= ? and invoiceNo = ? order by saleInvoiceId desc  limit 1 ";
		
	   
	   String EstimateInvoice_Report ="SELECT estimateId,invoiceNo,date,customerName,contactNo,balance_amount,subtotal1,payment_status,advance,companyName,customerId,orderNumber,invoiceDate,dueDate,address,gstNo,email,discount,paymentMode,staffId,rewardPoint from EstimateInvoiceTable  WHERE companyId= ? and  invoiceNo = ? limit 1 ";

	   String SELECT_GST_INV = "SELECT  DISTINCT(invoiceNo) FROM $tableName WHERE Status = '0' and companyId= ? ";
	   
	   String GET_EMAIL_ID = "SELECT Email FROM CustomerTable WHERE contactNo = ?  and companyId= ? and status='0'";
	   
	   String Cus_Statement_Insert="insert into CustomerStatement(invoiceNo,pay,discount,dueAmount,date,userName,balanceAmt,address,gstNo,email,customerId,companyId,paymentMode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
		
	   String Est_Statement_Insert="insert into EstimateStatement(invoiceNo,pay,discount,dueAmount,date,userName,balanceAmt,address,gstNo,email,customerId,companyId,paymentMode) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)"; 
		
	   String INSERT_ENQUIRY="insert into EnquiryTable(productName,quantity,customerId,customerName,companyId,date) values(?,?,?,?,?,now())";
	   String CustomerStat_UPDATE="UPDATE CustomerStatement SET pay = ?,discount=?,dueAmount=?,date=?,userName=?,balanceAmt=?,address=?,gstNo=?,email=? WHERE  invoiceNo=? and customerId = ?  AND companyId= ?";

	   String productName_verify="SELECT productName,size,rate,quantity FROM SaleInvoiceTable where productName = ?  and companyId= ? and invoiceNo=? and customerId=?  ";
	   
	   String SaleOrder_Update="update SaleInvoiceTable set productName=?,description=?,height=?,width=?,size=?,"
	   		+ "rate=?,amount=?,quantity=?,total=?,cgsta=?,sgsta=?,igsta=?,finalAmount=?,date=?,"
	   		+ "totalcgst=?,totalsgst=?,totaligst=?,totalitemqty=?,subtotal1=?,totalgst=?,"
	   		+ "advance=?,discount=?,balance_amount=?,payment_status=?,"
	   		+ "unit=?  where  customerName=? and invoiceNo = ?  AND orderNumber= ? and customerId= ?  and companyId= ? "; 
		
	   String CustomerStat_DEL="delete from CustomerStatement where  invoiceNo=? and customerId = ?  AND companyId= ?";

	   String CustomerStat_select="select dueAmount,discount,pay,balanceAmt from CustomerStatement where  invoiceNo=? and customerId = ?  AND companyId= ?";

	   String DAILY_SALES_REPORT_DEL="delete from SaleInvoiceTable where  invoiceNo=? and customerId = ?  AND companyId= ?";

	   String EstimateStat_DEL="delete from EstimateStatement where  invoiceNo=? and customerId = ?  AND companyId= ?";

	   String DAILY_ESTIMATE_REPORT_DEL="delete from EstimateInvoiceTable where  invoiceNo=? and customerId = ?  AND companyId= ?";

	   String GET_QUANTITY="SELECT Productname,Quantity FROM ProductTable WHERE ProductId = ? and companyId = ? and status = 0 ";


	   String Select_Last_Vist_And_Amount="select sum(total) as totalRevenue,max(invoiceDate) as lastVisit,max(serviceBy) as serviceBy from EstimateInvoiceTable where customerid=? and companyId=?";
	   String Select_Expiry_Date="Select expiryDate from CustomerTable where customerid=? and companyId=?";

	   
	   
	   

	   String Select_Last_Est_Amount="select sum(total) as totalRevenue from EstimateInvoiceTable where customerid=? and companyId=?";

	   
	   String Select_Enquired_Product_Quantity="select productName,quantity,customerId,customerName from EnquiryTable where customerid=? and companyId=?";

	   String Enquiry_Delete="delete from EnquiryTable where customerId=?  and companyId=?";
	   
	   String Customer_Update="Update CustomerTable set expiryDate=?,rewardPoint=? where customerId=? and companyId=?";

       String Insert_Points_Redeem_Expiry_Details="insert into PointsLiabilityTable(customerId,customerName,expiryDate,rewardPoint,"
       		+ "redeemPoint,redeemAmount,companyId,date) values(?,?,?,?,?,?,?,now())";
       
       
}
