package master;

public interface QueryConstants {
	
	 String Customer_Insert ="insert into CustomerTable(customerName,companyName,address,city,contactNo,"
	    		+ "alternatecontactNo,gstNo,email,companyId,LandLineNo,rewardPoint) VALUES(?,?,?,?,?,?,?,?,?,?,0)";
	String Customer_Report ="SELECT customerId,customerName,companyName,address,contactNo,city,alternatecontactNo,gstNo,email,landlineNo from CustomerTable where companyId= ? and status= '0'  ";
	
	String Customer_Report_Rough ="SELECT customerId,customerName,companyName,address,contactNo,city,alternatecontactNo,gstNo,email from CustomerTable where companyId= ? and status= '0' limit ? , ? ";
	
	
	String Vendor_Insert ="insert into VendorTable(vendorName,companyName,address,city,contactNo,alternatecontactNo,gstNo,email,companyId,description) VALUES(?,?,?,?,?,?,?,?,?,?)";
	
	String Vendor_Report ="SELECT vendorId,vendorName,companyName,address,contactNo,city,alternatecontactNo,gstNo,email,description  from VendorTable  where companyId= ? and  status= '0' ";
	
	String Product_Insert ="insert into ProductTable(productName,cgst,sgst,igst,hsnCode,description,saleRate,"
			+ "companyId,productType,QuantityLimit,productCategory,quantity,purchaseRate,serviceTime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
	
	String Inventory_Insert ="insert into InventoryTable(productName,companyId,productId) VALUES(?,?,?)";

	
	String Sale_Product_Report ="SELECT productId,productName,cgst,sgst,igst,hsnCode,saleRate,description,quantityLimit,productType,productCategory,quantity,purchaseRate from ProductTable where companyId= ? and status= '0' ";
	
	String Purchase_Product_Report ="SELECT productId,productName,unit,cgst,sgst,igst,hsnCode,saleRate,purchaseRate,productCategory,description from ProductTable where productCategory='purchase' and companyId= ? and status= '0' ";

    String CUS_VERIFY_MOBILENO="SELECT contactNo FROM CustomerTable where contactNo = ? and status='0' and companyId= ? ";
    
    String select_customerid="SELECT customerId FROM CustomerTable where contactNo = ? and status='0' and companyId= ? ";
    
    String select_vendorid="SELECT vendorId FROM VendorTable where contactNo = ? and status='0' and companyId= ? ";
    
    
    String CUS_VERIFY_MAIL="SELECT email FROM CustomerTable where email = ? and status='0'";
    
    String Ven_VERIFY_MOBILENO="SELECT contactNo FROM VendorTable where contactNo = ? and status='0' and companyId= ? ";
    
    String Ven_VERIFY_MAIL="SELECT email FROM VendorTable where email = ? and status='0'";
    
    String VERIFY_ProductName="SELECT productName FROM ProductTable where productName = ? and status='0' and companyId= ? ";

    String Select_ProductID="SELECT productId FROM ProductTable where productName = ? and status='0' and companyId= ? ";

    
    String DELETE_CUSTOMER = "UPDATE CustomerTable SET Status ='1' WHERE contactNo = ? and companyId= ? ";
    
    String DELETE_VENDOR = "UPDATE VendorTable SET Status ='1' WHERE contactNo = ? and companyId= ? ";
    
    String DELETE_SALE_PRODUCT = "UPDATE ProductTable SET Status ='1' WHERE productName = ? and productId= ? and companyId= ?";
    
    String DELETE_PURCHASE_PRODUCT = "UPDATE ProductTable SET Status ='1' WHERE productName = ? and productCategory=? and companyId= ?";
  
    String CustomerList_UPDATE="UPDATE CustomerTable SET companyName = ?,address=?,city=?,contactNo=?,alternateContactNo=?,gstNo=?,email=?,customerName=? WHERE  customerId = ?  AND companyId= ?";

    String VendorList_UPDATE="UPDATE VendorTable SET companyName = ?,address=?,city=?,contactNo=?,alternateContactNo=?,gstNo=?,email=? WHERE vendorId = ? AND companyId= ? ";

    String ProductList_UPDATE="UPDATE ProductTable SET cgst=?,sgst=?,igst=?,hsnCode=?,saleRate=?,description=?,productType=?,productCategory=?,quantityLimit=?,productName=?,purchaseRate=?,quantity=? WHERE productId = ? and companyId= ?";

    String EMP_AUDIT_REPORT="INSERT INTO AuditReportTable(StaffId,Role,affectedId,Operation,CompanyId,StaffName,affectedName)VALUES(?,?,?,?,?,?,?)";

}

