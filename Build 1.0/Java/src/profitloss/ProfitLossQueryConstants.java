package profitloss;

public interface ProfitLossQueryConstants {

	
	/*
	 * PROFIT LOSS (SALES WITH ESTIMATE) QUERY --DAILY/WEEKLY/MONTHLY
	 */
	String DAILY_PROFIT_LOSS_REPORT_WITH_ESTIMATE = "SELECT(SELECT sum(FinalAmount) From SaleInvoiceTable where companyId = ?"
			+ "  and date(InvoiceDate)= ? )AS SalesAmount,"
			+"(SELECT sum(Total) From EstimateInvoiceTable where companyId = ?  and date(InvoiceDate)= ? )AS EstimateAmount ,"
			+"(SELECT sum(FinalAmount) From PurchaseInvoiceTable where companyId = ?  and date(InvoiceDate)= ? )AS PurchaseAmount,"
			+"(SELECT sum(totalgst) From SaleInvoiceTable where companyId = ?  and date(InvoiceDate)= ?  )AS TotalGSTAmount,"
			 +"sum(Amount) AS ExpenseAmount From ExpenseTable where companyId = ? and date(Date)= ? ";

	
	/*
	 * PROFIT LOSS (SALES WITHOUT ESTIMATE) QUERY --DAILY/WEEKLY/MONTHLY
	 */
	String DAILY_PROFIT_LOSS_REPORT_WITHOUT_ESTIMATE = "SELECT(SELECT sum(FinalAmount) From SaleInvoiceTable where companyId = ?"
			+ "  and date(InvoiceDate)= ? )AS SalesAmount,"
			+"(SELECT sum(FinalAmount) From PurchaseInvoiceTable where companyId = ?  and date(InvoiceDate)= ? )AS PurchaseAmount,"
			+"(SELECT sum(totalgst) From SaleInvoiceTable where companyId = ? and date(InvoiceDate)= ? )AS TotalGSTAmount,"
			 +"sum(Amount) AS ExpenseAmount From ExpenseTable where companyId = ? and date(Date)= ? ";


	/*
	 * PROFIT LOSS (SALES WITH ESTIMATE) QUERY --YEARLY
	 */
	
	String YEARLY_PROFIT_LOSS_REPORT_WITH_ESTIMATE =  "SELECT(SELECT sum(FinalAmount) From SaleInvoiceTable where companyId = ?"
			+ "  and month(InvoiceDate)= ? AND year(InvoiceDate) = ? )AS SalesAmount,"
			+"(SELECT sum(Total) From EstimateInvoiceTable where companyId = ?  and month(InvoiceDate)= ? AND year(InvoiceDate) = ?  )AS EstimateAmount ,"
			+"(SELECT sum(FinalAmount) From PurchaseInvoiceTable where companyId = ?  and month(InvoiceDate)= ? AND year(InvoiceDate) = ?  )AS PurchaseAmount,"
			+"(SELECT sum(totalgst) From SaleInvoiceTable where companyId = ?  and month(InvoiceDate)= ? AND year(InvoiceDate) = ?  )AS TotalGSTAmount,"
			 +"sum(Amount) AS ExpenseAmount From ExpenseTable where companyId = ? and month(Date)= ? AND year(Date) = ?  ";



	/*
	 * PROFIT LOSS (SALES WITHOUT ESTIMATE) QUERY --YEARLY
	 */

	String YEARLY_PROFIT_LOSS_REPORT_WITHOUT_ESTIMATE = "SELECT(SELECT sum(FinalAmount) From SaleInvoiceTable where companyId = ?"
			+ "  and  month(InvoiceDate)= ? AND year(InvoiceDate) = ? )AS SalesAmount,"
			+"(SELECT sum(FinalAmount) From PurchaseInvoiceTable where companyId = ?  and  month(InvoiceDate)= ? AND year(InvoiceDate) = ? )AS PurchaseAmount,"
			+"(SELECT sum(totalgst) From SaleInvoiceTable where companyId = ?  and month(InvoiceDate)= ? AND year(InvoiceDate) = ?  )AS TotalGSTAmount,"
			+"sum(Amount) AS ExpenseAmount From ExpenseTable where companyId = ? and month(Date)= ? AND year(Date) = ? ";
	
	
	/* TOTAL PROFIT QUERY USE IF NEEDED IN FUTURE
	 * SELECT ( SELECT sum(Amount) TotalAmount FROM ( 
SELECT Amount from SaleInvoiceTable WHERE companyid = "002" and date(invoicedate) = "2019-12-05" 
union all select Amount from EstimateInvoiceTable WHERE companyid= "002"
and date(invoicedate) ="2019-12-05" ) T ) - 
(SELECT sum(Amount) TotalAmount1 FROM (SELECT PurchaseInvoiceTable.Amount
 from PurchaseInvoiceTable WHERE companyid = "002" and  date(invoicedate) = "2019-12-05"    
union all select ExpenseTable.Amount from ExpenseTable 
WHERE companyid= "002" and date(date) = "2019-12-05" )T1  )  AS TOTAL ;
	 */
	
}
