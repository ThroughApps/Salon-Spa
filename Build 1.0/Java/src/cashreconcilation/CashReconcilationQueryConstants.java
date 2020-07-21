package cashreconcilation;

public interface CashReconcilationQueryConstants {
	String Sale_Total_Cash= "select sum(advance) as TotalCash from SaleInvoiceTable "
			+ " where date(Date)=? and companyId= ? and paymentmode='Cash' ";
	
	String Insert_Cash_Details="Insert into CashReconcilationTable(companyId,date,denomination,totalAmount) values(?,?,?,?)";

}
