package report.quotation;

public interface QueryContants {
	//----QUERY FOR DELETING DATA IN GST AND WITHOUT GST TABLE-----//
	
	String QUOTATION_REPORT_DEL = "delete from  $tableName WHERE invoiceNo = ? and companyId= ?";
	
	//----------QUERY FOR SELECTING DATA FROM GST TABLE FOR VIEW------//
	
	String SELECT_GSTREPORT_DATA = "SELECT invoiceDate,dueDate,customerName,address,contactNo,gstNo,productName,"
			+ "size,unit,quantity,rate,total,cgsta,sgsta,"
			+ "igsta,finalAmount,subtotal1,totalgst,"
			+ "shipping,adjustment,discount,finalAmountTotal,height,width FROM GSTQuotationTable WHERE InvoiceNo = ? and companyId=? " ;

	String SELECT_WITHOUT_GSTREPORT_DATA ="SELECT invoiceDate,dueDate,customerName,address,contactNo,gstNo,productName,"
			+ "size,unit,quantity,rate,total,subtotal1,"
			+ "shipping,adjustment,discount,finalAmountTotal,height,width FROM WithoutGSTQuotationTable WHERE InvoiceNo = ? and companyId=? " ;

}
