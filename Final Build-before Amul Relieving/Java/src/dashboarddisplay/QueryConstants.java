package dashboarddisplay;

public interface QueryConstants {
	

	String Select_Monthly_SaleInvoice = "Select sum(finalAmount) as SaleInvoice_Total_Amt from SaleInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	
	String Select_Monthly_EstimateInvoice = "Select sum(total) as EstimateInvoice_Total_Amt from EstimateInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	// String Select_Monthly_SaleInvoice="Select sum(subTotal1) as
	// SaleInvoice_Total_Amt from SaleInvoiceTable where Month(date) =
	// MONTH(now()) and Year(date) = YEAR(now()); ";

	String Select_Monthly_PurchaseInvoice = "Select sum(finalAmount) as PurchaseInvoice_Total_Amt from PurchaseInvoiceTable where  month(Date) = ? AND year(Date) = ?  and companyId= ? ";
	String Select_Daily_PurchaseInvoice = "Select sum(finalAmount) as PurchaseInvoice_Total_Amt from PurchaseInvoiceTable where date(Date) = ? and companyId= ? ";
	
	String Select_Yearly_PurchaseInvoice = "Select sum(finalAmount) as PurchaseInvoice_Total_Amt from PurchaseInvoiceTable where year(Date) = ? and companyId= ? ";

	
	String Select_Monthly_ExpenseInvoice = "Select sum(amount) as ExpenseInvoice_Total_Amt from ExpenseTable where  month(Date) = ? AND year(Date) = ? AND status='0' and companyId= ? ";

	// dashboard total no(vendor,product,saleInvoice,withGst Quotation)

	String Select_Total_No_of_Vendors = "Select count(vendorName) as Total_No_of_Vendors from VendorTable where status='0' and companyId= ?  ";

	String Select_Total_No_of_Customers = "Select count(customerName) as Total_No_of_Customers from CustomerTable where status='0' and companyId= ?  ";

	
	String Select_Total_No_of_ProductList = "Select count(productName) as Total_No_of_ProductList from ProductTable where status='0' and companyId= ? ";

	String Select_Total_No_of_SaleInvoice = "Select count(invoiceNo) as Total_No_of_SaleInvoice from SaleInvoiceTable where companyId= ? ";

	String Select_Total_No_of_WithGST_Quotation = "Select count(invoiceNo) as Total_No_of_WithGST_Quotation from GSTQuotationTable  where companyId= ? ";

	// Doughnut chart
	String Select_Total_No_of_SaleInvoice_Qty = "Select sum(quantity) as Total_No_of_SaleInvoice_Qty from SaleInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	String Select_Total_No_of_SaleInvoice_Qty_Estimate = "Select sum(quantity) as Total_No_of_SaleInvoice_Qty_Estimate from EstimateInvoiceTable where month(Date) = ? AND year(Date) = ? and companyId= ? ";

	// already we calculating expense value Select_Monthly_ExpenseInvoice

	String Select_Total_No_of_Salary_paid = "Select sum(empTotalWorkingHrsSalary) as Total_No_of_Salary_paid from SalaryTable where month(Date) = ? AND year(Date) = ? and status='0' and companyId= ?  ";

	// Line chart data

	String Select_Total_Sales_Amount_sale_Monthwise = "select year(curdate()) as current_Year , month(date) as month_index , sum(finalAmount) as month_subtotal from SaleInvoiceTable where year(Date)=?  and companyId= ? group by year(date), month(date) ";
	String Select_Total_Estimate_Amount_sale_Monthwise = "select year(curdate()) as current_Year , month(date) as month_index , sum(total) as month_estimate_subtotal from EstimateInvoiceTable where year(Date)=? and companyId= ? group by year(date), month(date) ";

	String Select_Total_Purchase_Amount_sale_Monthwise = "select year(curdate()) as current_Year, month(date) as month_index , sum(finalAmount)  as month_subtotal  from PurchaseInvoiceTable where year(Date)=? and companyId= ? group by year(date), month(date)";

	String Select_Total_CustomerPaid_Earnings_Amount_sale_Monthwise = "SELECT  year(curdate()), month(date),  SUM(amount)FROM ExpenseTable where  status='0' GROUP BY month(date)";
//annual amt
	String Select_Total_No_of_SaleInvoice_Amount_Annually = "select sum(finalAmount)  as Annual_Sale_Amount  from SaleInvoiceTable where  year(curdate()) and companyId= ?   ";

	String Select_Total_No_of_EstimateInvoice_Amount_Annually = "select sum(total)  as Annual_Estimate_Amount  from EstimateInvoiceTable where  year(curdate()) and companyId= ?   ";

	
	String Select_Total_No_of_PurchaseInvoice_Amount_Annually = "select sum(finalAmount)  as Annual_Purchase_Amount  from PurchaseInvoiceTable where  year(curdate()) and companyId= ?  ";
//daily_report_limitby 8
	String SELECT_DAILY_SALES_INV = "SELECT  invoiceNo ,Date,customerName,contactNo,Payment_status,subtotal1 FROM (SELECT  invoiceNo,Date,customerName,contactNo,Payment_status,subtotal1 FROM SaleInvoiceTable where companyId= ? order by invoiceno desc limit 6)c";
	
	String SELECT_DAILY_SALES_INV1 = "SELECT  invoiceNo ,Date,customerName,contactNo,Payment_status,subtotal1 from SaleInvoiceTable  WHERE companyId= ? and invoiceNo = ?  limit 1";
	String SELECT_DAILY_SALES_INV2 = "SELECT  invoiceNo,Date,customerName,contactNo,Payment_status,subtotal1 FROM SaleInvoiceTable where companyId= ? order by invoiceno desc limit 6";
	
			
	String SELECT_GST_INV = "SELECT  DISTINCT invoiceNo,invoicedate FROM SaleInvoiceTable WHERE companyId= ? order by invoicedate desc limit 6";

	String SELECT_DAILY_SALES_INV_trial = "SELECT  DISTINCT(invoiceNo) FROM SaleInvoiceTable WHERE date(Date) = ?  ";
	
	String DAILY_SALES_REPORT = "SELECT invoiceNo,Date,customerName,contactNo,Payment_status,balance_amount,total FROM SaleInvoiceTable WHERE date(Date) = ? and  invoiceNo = ? and companyId= ? order by invoiceno desc limit 8";

	/*
	 * TOP SALES PER MONTH
	 */
	String TOP_SALES_PER_MONTH = "SELECT ProductName,sum(Quantity) Quantity FROM ( SELECT ProductName,Quantity from SaleInvoiceTable WHERE companyid= ?  and month(invoicedate) = ? and Quantity <> 0 and year(invoicedate) = ? union all select ProductName,Quantity from EstimateInvoiceTable WHERE companyid= ?  and month(invoicedate) = ? and Quantity <> 0 and year(invoicedate) = ? ) T group by productName Order by Quantity desc LIMIT 5";
	
	/*
	* TOP SALES PER YEAR
	*/

	
	String TOP_SALES_PER_YEAR="SELECT ProductName,sum(Quantity) Quantity FROM ( SELECT ProductName,Quantity from SaleInvoiceTable WHERE companyid = ? and Quantity <> 0 and year(invoicedate) = ? union all select ProductName,Quantity from EstimateInvoiceTable WHERE companyid = ? and Quantity <> 0 and year(invoicedate) = ? ) T group by ProductName Order by Quantity desc LIMIT 5 " ;

	//Critical Inventory Details
	String GET_PRODUCT_DETAILS = "SELECT ProductName,Quantity FROM ProductTable WHERE CompanyId = ? AND Status = '0' And (Quantity < QuantityLimit) order by Quantity asc limit 5 ";
	/*
	* QUERY FOR YEARLY EXPENSE
	*/
	String SELECT_YEARLY_EXPENSE = "Select sum(amount) as YearlyExpenseAmt from ExpenseTable where  year(Date) = ? AND status='0' and companyId= ? ";

	/*
	 * QUERY FOR DAILY EXPENSE
	 */
	String SELECT_DAILY_EXPENSE ="Select sum(amount) as DailyExpenseAmt from ExpenseTable where  date(Date) = ? AND status='0' and companyId= ? ";


	
	 /*
	* SALES WITH ESTIMATE QUERY --DAILY
	*/
	String SELECT_SALES_WITH_ESTIMATE_DAILY ="SELECT sum(finalAmount) TotalAmount FROM ( SELECT finalAmount from SaleInvoiceTable WHERE companyid = ? and date(invoicedate) = ? union all select total from EstimateInvoiceTable WHERE companyid= ? and date(invoicedate) = ? ) T  ";


	 /*
	* SALES WITH ESTIMATE QUERY --MONTHLY
	*/
	String SELECT_SALES_WITH_ESTIMATE_MONTHLY ="SELECT sum(finalAmount) TotalAmount FROM ( SELECT finalAmount from SaleInvoiceTable WHERE companyid = ? and month(invoicedate) = ? and  year(invoicedate) = ? union all select total from EstimateInvoiceTable WHERE companyid= ? and month(invoicedate) = ? and year(invoicedate) = ? ) T  ";


	
	
	/*
	* SALES WITH ESTIMATE QUERY -- YEARLY
	*/

	String SELECT_SALES_WITH_ESTIMATE_YEARLY="SELECT sum(finalAmount) TotalAmount FROM ( SELECT finalAmount from SaleInvoiceTable WHERE companyid = ? and year(invoicedate) = ? union all select total from EstimateInvoiceTable WHERE companyid= ? and year(invoicedate) = ? ) T  ";

	/*
	* SALES WITHOUT ESTIMATE QUERY --DAILY
	*/

	String SELECT_SALES_WITHOUT_ESTIMATE_DAILY = "SELECT sum(finalAmount) TotalAmount FROM SaleInvoiceTable WHERE companyid = ? and date(invoicedate) = ?  ";

	/*
	* SALES WITHOUT ESTIMATE QUERY --MONTHLY
	*/

	String SELECT_SALES_WITHOUT_ESTIMATE_MONTHLY = "SELECT sum(finalAmount) TotalAmount FROM SaleInvoiceTable WHERE companyid = ? and month(invoicedate) = ? and year(invoicedate) = ?";

	/*
	* SALES WITHOUT ESTIMATE QUERY -- YEARLY
	*/

	String SELECT_SALES_WITHOUT_ESTIMATE_YEARLY= "SELECT sum(finalAmount) TotalAmount FROM SaleInvoiceTable WHERE companyid = ? and year(invoicedate) = ?  ";

	
    String SELECT_CONFIG_OPTION="select configValue from CompanyTable where companyId=?";

    
    /*
     * PAYMENT STATICS WITHOUT ESTIMATE 
     */

    // -- DAILY

    /*
	String SELECT_PAY_STAT_WITHOUT_ESTIMATE_DAILY = "SELECT  (select count(PaymentMode)  from SaleInvoiceTable where paymentmode='Cash' AND "
													+ "date(InvoiceDate) = ? AND CompanyId = ? )AS Cash,"
													+"(select count(PaymentMode)  from SaleInvoiceTable where paymentmode='Cheque'"
													+ "AND date(InvoiceDate) = ? AND CompanyId = ? ) AS Cheque,"
													+"(select count(PaymentMode) from SaleInvoiceTable where paymentmode='Card'"
													+ "AND date(InvoiceDate) = ? AND CompanyId = ? ) AS Card,"
													+"count(PaymentMode) AS Online from SaleInvoiceTable where paymentmode='Online' AND date(InvoiceDate) = ? AND CompanyId = ? ";
		*/

    /*
	String SELECT_PAY_STAT_WITHOUT_ESTIMATE_DAILY = "SELECT  (select count(PaymentMode)  from CustomerStatement where paymentmode='Cash' AND "
			+ "date(Date) = ? AND CompanyId = ? )AS Cash,"
			+"(select count(PaymentMode)  from CustomerStatement where paymentmode='Cheque'"
			+ "AND date(Date) = ? AND CompanyId = ? ) AS Cheque,"
			+"(select count(PaymentMode) from CustomerStatement where paymentmode='Card'"
			+ "AND date(Date) = ? AND CompanyId = ? ) AS Card,"
			+"count(PaymentMode) AS Online from CustomerStatement where paymentmode='Online' AND date(Date) = ? AND CompanyId = ? ";

    */
    
	String SELECT_PAY_STAT_WITHOUT_ESTIMATE_DAILY="SELECT  (select count(PaymentMode)  from CustomerStatement where paymentmode='Cash' AND "
			+ "date(Date) = ?  AND CompanyId = ?  )AS Cash,"
			+ "(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement where paymentmode='Cash' AND "
			+ "date(Date) = ?  AND CompanyId = ? ) cashpay JOIN (select  sum(Discount) sum_disocunt"
		    + "	FROM CustomerStatement where paymentmode='Cash' AND date(Date) = ? AND "
		    + "CompanyId = ? ) cashdiscount )AS CashAmount,"
		    + "(select count(PaymentMode)  from CustomerStatement where paymentmode='Cheque' AND date(Date) = ?  AND CompanyId = ? ) AS Cheque,"
			+"(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement where paymentmode='Cheque' "
			+ " AND date(Date) = ? AND CompanyId = ?  ) chequepay JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement "
			+ "where paymentmode='Cheque' AND date(Date) = ?  AND CompanyId = ?  ) chequediscount )AS ChequeAmount,"
			+ "(select count(PaymentMode) from CustomerStatement where paymentmode='Card' AND date(Date) = ?  "
			+ " AND CompanyId = ? ) AS Card,(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay "
			+"FROM CustomerStatement where paymentmode='Card' AND date(Date) = ?    AND CompanyId = ? ) cardpay "
			+"JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Card' AND date(Date) = ?  "
			+ "  AND CompanyId = ? ) carddiscount )AS CardAmount, "
			+"(Select count(PaymentMode) from CustomerStatement where paymentmode='Online' AND date(Date) = ?  "
			+ "AND CompanyId = ?  ) AS Online, (sum_pay + sum_disocunt) AS OnlineAmount FROM (select sum(Pay) sum_pay FROM CustomerStatement "
			+"where paymentmode='Online' AND date(Date) = ? AND CompanyId = ? ) onlinepay "
			+"JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Online' AND "
			+"date(Date) = ?  AND CompanyId = ? ) onlinediscount ";
    
    
    
    
	//--MONTHLY
	
	
	/* String SELECT_PAY_STAT_WITHOUT_ESTIMATE_MONTHLY =  "SELECT  (select count(PaymentMode)  from SaleInvoiceTable where paymentmode='Cash' AND "
													+ "month(InvoiceDate) = ? AND year(InvoiceDate) = ? AND CompanyId = ? )AS Cash,"
													+"(select count(PaymentMode)  from SaleInvoiceTable where paymentmode='Cheque'"
													+ "AND month(InvoiceDate) = ?  AND year(InvoiceDate) = ? AND CompanyId = ? ) AS Cheque,"
													+"(select count(PaymentMode) from SaleInvoiceTable where paymentmode='Card'"
													+ "AND month(InvoiceDate) = ?  AND year(InvoiceDate) = ? AND CompanyId = ? ) AS Card,"
													+"count(PaymentMode) AS Online from SaleInvoiceTable where paymentmode='Online' "
													+ "AND month(InvoiceDate) = ?  AND year(InvoiceDate) = ? AND CompanyId = ? ";
	 */
	
	/* String SELECT_PAY_STAT_WITHOUT_ESTIMATE_MONTHLY =  "SELECT  (select count(PaymentMode)  from CustomerStatement where paymentmode='Cash' AND "
			+ "month(Date) = ? AND year(Date) = ? AND CompanyId = ? )AS Cash,"
			+"(select count(PaymentMode)  from CustomerStatement where paymentmode='Cheque'"
			+ "AND month(Date) = ?  AND year(Date) = ? AND CompanyId = ? ) AS Cheque,"
			+"(select count(PaymentMode) from CustomerStatement where paymentmode='Card'"
			+ "AND month(Date) = ?  AND year(Date) = ? AND CompanyId = ? ) AS Card,"
			+"count(PaymentMode) AS Online from CustomerStatement where paymentmode='Online' "
			+ "AND month(Date) = ?  AND year(Date) = ? AND CompanyId = ? ";
	*/
	String SELECT_PAY_STAT_WITHOUT_ESTIMATE_MONTHLY="SELECT  (select count(PaymentMode)  from CustomerStatement where paymentmode='Cash' AND "
			+ "month(Date) = ? AND year(Date) = ?  AND CompanyId = ?  )AS Cash,"
			+ "(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement where paymentmode='Cash' AND "
			+ "month(Date) = ? AND year(Date) = ?  AND CompanyId = ? ) cashpay JOIN (select  sum(Discount) sum_disocunt"
		    + "	FROM CustomerStatement where paymentmode='Cash' AND month(Date) = ?  AND year(Date) = ?  AND "
		    + "CompanyId = ? ) cashdiscount )AS CashAmount,"
		    + "(select count(PaymentMode)  from CustomerStatement where paymentmode='Cheque'AND month(Date) = ?  AND year(Date) = ?  "
		    + " AND CompanyId = ? ) AS Cheque,"
			+"(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement where paymentmode='Cheque'"
			+ " AND month(Date) = ? AND year(Date) = ?  AND CompanyId = ?  ) chequepay JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Cheque' AND month(Date) = ?  AND year(Date) = ?  AND CompanyId = ?  ) chequediscount )AS ChequeAmount,"
			+ "(select count(PaymentMode) from CustomerStatement where paymentmode='Card' AND month(Date) = ? AND year(Date) = ?  "
			+ " AND CompanyId = ? ) AS Card,(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay "
			+"FROM CustomerStatement where paymentmode='Card' AND month(Date) = ?  AND year(Date) = ?  AND CompanyId = ? ) cardpay "
			+"JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Card' AND month(Date) = ?  "
			+ " AND year(Date) = ?  AND CompanyId = ? ) carddiscount )AS CardAmount, "
			+"(Select count(PaymentMode) from CustomerStatement where paymentmode='Online' AND month(Date) = ?  AND year(Date) = ?  "
			+ "AND CompanyId = ?  ) AS Online, (sum_pay + sum_disocunt) AS OnlineAmount FROM (select sum(Pay) sum_pay FROM CustomerStatement "
			+"where paymentmode='Online' AND month(Date) = ?  AND year(Date) = ?  AND CompanyId = ? ) onlinepay "
			+"JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Online' AND "
			+"month(Date) = ?  AND year(Date) = ?  AND CompanyId = ? ) onlinediscount ";
			 
			 
	
	
	
	
	
	
	//--YEARLY   

	/* String SELECT_PAY_STAT_WITHOUT_ESTIMATE_YEARLY = "SELECT  (select count(PaymentMode)  from SaleInvoiceTable where paymentmode='Cash' AND "
													+ "year(InvoiceDate) = ? AND CompanyId = ? )AS Cash,"
													+"(select count(PaymentMode)  from SaleInvoiceTable where paymentmode='Cheque'"
													+ "AND year(InvoiceDate) = ? AND CompanyId = ? ) AS Cheque,"
													+"(select count(PaymentMode) from SaleInvoiceTable where paymentmode='Card'"
													+ "AND year(InvoiceDate) = ? AND CompanyId = ? ) AS Card,"
													+"count(PaymentMode) AS Online from SaleInvoiceTable where paymentmode='Online' "
													+ "AND year(InvoiceDate) = ? AND CompanyId = ? ";
		*/

	/* String SELECT_PAY_STAT_WITHOUT_ESTIMATE_YEARLY = "SELECT  (select count(PaymentMode)  from CustomerStatement where paymentmode='Cash' AND "
				+ "year(Date) = ? AND CompanyId = ? )AS Cash,"
				+"(select count(PaymentMode)  from CustomerStatement where paymentmode='Cheque'"
				+ "AND year(Date) = ? AND CompanyId = ? ) AS Cheque,"
				+"(select count(PaymentMode) from CustomerStatement where paymentmode='Card'"
				+ "AND year(Date) = ? AND CompanyId = ? ) AS Card,"
				+"count(PaymentMode) AS Online from CustomerStatement where paymentmode='Online' "
				+ "AND year(Date) = ? AND CompanyId = ? ";
	*/
	String SELECT_PAY_STAT_WITHOUT_ESTIMATE_YEARLY="SELECT  (select count(PaymentMode)  from CustomerStatement where paymentmode='Cash' AND "
			+ "year(Date) = ?  AND CompanyId = ?  )AS Cash,"
			+ "(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement where paymentmode='Cash' AND "
			+ " year(Date) = ?  AND CompanyId = ? ) cashpay JOIN (select  sum(Discount) sum_disocunt"
		    + "	FROM CustomerStatement where paymentmode='Cash'  AND year(Date) = ?  AND "
		    + "CompanyId = ? ) cashdiscount )AS CashAmount,"
		    + "(select count(PaymentMode)  from CustomerStatement where paymentmode='Cheque' AND year(Date) = ?  "
		    + " AND CompanyId = ? ) AS Cheque,"
			+"(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement where paymentmode='Cheque'"
			+ "  AND year(Date) = ?  AND CompanyId = ?  ) chequepay JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Cheque' AND year(Date) = ?  AND CompanyId = ?  )"
			+ " chequediscount )AS ChequeAmount,"
			+ "(select count(PaymentMode) from CustomerStatement where paymentmode='Card'  AND year(Date) = ?  "
			+ " AND CompanyId = ? ) AS Card,(select (sum_pay + sum_disocunt) sum_all FROM (select sum(Pay) sum_pay FROM CustomerStatement "
			+ "where paymentmode='Card'  AND year(Date) = ?  AND CompanyId = ? ) cardpay "
			+"JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Card'  "
			+ " AND year(Date) = ?  AND CompanyId = ? ) carddiscount )AS CardAmount, "
			+"(Select count(PaymentMode) from CustomerStatement where paymentmode='Online' AND year(Date) = ?  "
			+ "AND CompanyId = ?  ) AS Online, (sum_pay + sum_disocunt) AS OnlineAmount FROM (select sum(Pay) sum_pay FROM CustomerStatement "
			+"where paymentmode='Online'   AND year(Date) = ?  AND CompanyId = ? ) onlinepay "
			+"JOIN (select  sum(Discount) sum_disocunt FROM CustomerStatement where paymentmode='Online' AND "
			+" year(Date) = ?  AND CompanyId = ? ) onlinediscount ";
	
	
	/*
     * PAYMENT STATICS WITH ESTIMATE 
     */
	
	//--DAILY   
	
	String SELECT_PAY_STAT_WITH_ESTIMATE_DAILY="SELECT (SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement "
			+"WHERE companyid = ? and date(Date) = ? and "
			+"paymentmode = 'Cash' union all select PaymentMode from EstimateStatement "
			+"WHERE companyid= ? and date(Date) = ?  and paymentmode = 'Cash' ) T )AS TotalCashCount, "
			           
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Cash') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Cash') custdiscount, "
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ? and date(Date) = ?  and "
			+"paymentmode = 'Cash') estpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and date(Date) = ? and "
			+"paymentmode = 'Cash') estdiscount ) AS CashAmount , "

			+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
			+"and date(Date) = ?  and paymentmode = 'Cheque' union all select PaymentMode "
			+"from EstimateStatement WHERE companyid= ? and date(Date) = ?  "
			+"and paymentmode = 'Cheque' ) T1 )AS TotalChequeCount, "

			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and date(Date) = ?  and "
			+"paymentmode = 'Cheque') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Cheque') custdiscount, "
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Cheque') estpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Cheque') estdiscount ) AS ChequeAmount , "
			           
			           
			+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
			+"and date(Date) = ?  and paymentmode = 'Card' union all select PaymentMode "
			+"from EstimateStatement WHERE companyid= ? and date(Date) = ?  "
			+"and paymentmode = 'Card' ) T2 )AS TotalCardCount, "
			           
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and date(Date) = ?  and "
			+"paymentmode = 'Card') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Card') custdiscount, "
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ?  and date(Date) = ?  and  "
			+"paymentmode = 'Card') estpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Card') estdiscount ) AS CardAmount , "
			           
			           
			+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
			+"and date(Date) = ?  and paymentmode = 'Online' union all select PaymentMode "
			+"from EstimateStatement WHERE companyid= ? and date(Date) = ?  "
			+"and paymentmode = 'Online' ) T3 ) AS TotalOnlineCount, "
			           
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and date(Date) = ?  and "
			+"paymentmode = 'Online') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and date(Date) = ? and "
			+"paymentmode = 'Online') custdiscount, "
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ? and date(Date) = ?  and "
			+"paymentmode = 'Online') estpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and date(Date) = ?  and "
			+"paymentmode = 'Online') estdiscount ) AS OnlineAmount ";


	 String SELECT_PAY_STAT_WITH_ESTIMATE_MONTHLY= "SELECT (SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement "
				+"WHERE companyid = ? and year(Date) = ? and month(Date) = ? and "
				+"paymentmode = 'Cash' union all select PaymentMode from EstimateStatement "
				+"WHERE companyid= ? and year(Date) = ? and month(Date) = ? and paymentmode = 'Cash' ) T )AS TotalCashCount, "
	            
				+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
				+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Cash') custpay, "
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Cash') custdiscount, "
				+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ? and year(Date) = ? and month(Date) = ? and paymentmode = 'Cash') estpay,	"
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Cash') estdiscount ) AS CashAmount , "
				+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
				+"and year(Date) = ? and month(Date) = ? and paymentmode = 'Cheque' union all select PaymentMode "
				+"from EstimateStatement WHERE companyid= ? and year(Date) = ? and month(Date) = ? "
				+"and paymentmode = 'Cheque' ) T1 )AS TotalChequeCount, "
			
				+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
				+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and year(Date) = ? and month(Date) = ? and paymentmode = 'Cheque') custpay, "
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Cheque') custdiscount,	"
				+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Cheque') estpay,	"
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Cheque') estdiscount ) AS ChequeAmount , "
	            
	            
				+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
				+"and year(Date) = ? and month(Date) = ? and paymentmode = 'Card' union all select PaymentMode "
				+"from EstimateStatement WHERE companyid= ? and year(Date) = ? and month(Date) = ? "
				+"and paymentmode = 'Card' ) T2 )AS TotalCardCount, "
	            
				+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
				+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and year(Date) = ? and month(Date) = ? and paymentmode = 'Card') custpay, "
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Card') custdiscount, "
				+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and  paymentmode = 'Card') estpay,	"
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Card') estdiscount ) AS CardAmount , "
	            
	            
				+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
				+"and year(Date) = ? and month(Date) = ? and paymentmode = 'Online' union all select PaymentMode "
				+"from EstimateStatement WHERE companyid= ? and year(Date) = ? and month(Date) = ? "
				+"and paymentmode = 'Online' ) T3 ) AS TotalOnlineCount, "
	            
				+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
				+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and year(Date) = ? and month(Date) = ? and paymentmode = 'Online') custpay, "
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ? and month(Date) = ? and paymentmode = 'Online') custdiscount,	"
				+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ? and year(Date) = ? and month(Date) = ? and paymentmode = 'Online') estpay,	"
				+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ?and month(Date) = ? and paymentmode = 'Online') estdiscount ) AS OnlineAmount ";

	
	String SELECT_PAY_STAT_WITH_ESTIMATE_YEARLY= "SELECT (SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement "
			+"WHERE companyid = ? and year(Date) = ?  and "
			+"paymentmode = 'Cash' union all select PaymentMode from EstimateStatement "
			+"WHERE companyid= ? and year(Date) = ?  and paymentmode = 'Cash' ) T )AS TotalCashCount, "
            
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ?  and year(Date) = ? and "
			+"paymentmode = 'Cash') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ?  and "
			+"paymentmode = 'Cash') custdiscount, "
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ? and year(Date) = ?  and "
			+"paymentmode = 'Cash') estpay,	"
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and "
			+"paymentmode = 'Cash') estdiscount ) AS CashAmount , "

			+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
			+"and year(Date) = ?  and paymentmode = 'Cheque' union all select PaymentMode "
			+"from EstimateStatement WHERE companyid= ? and year(Date) = ?  "
			+"and paymentmode = 'Cheque' ) T1 )AS TotalChequeCount, "
		
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and year(Date) = ?  and "
			+"paymentmode = 'Cheque') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ?  and "
			+"paymentmode = 'Cheque') custdiscount,	"
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and "
			+"paymentmode = 'Cheque') estpay,	"
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ?  and "
			+"paymentmode = 'Cheque') estdiscount ) AS ChequeAmount , "
            
            
			+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
			+"and year(Date) = ? and  paymentmode = 'Card' union all select PaymentMode "
			+"from EstimateStatement WHERE companyid= ? and year(Date) = ?  "
			+"and paymentmode = 'Card' ) T2 )AS TotalCardCount, "
            
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and year(Date) = ?  and "
			+"paymentmode = 'Card') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ?  and "
			+"paymentmode = 'Card') custdiscount, "
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ?  and year(Date) = ?  and  "
			+"paymentmode = 'Card') estpay,	"
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ?  and "
			+"paymentmode = 'Card') estdiscount ) AS CardAmount , "
            
            
			+"(SELECT Count(PaymentMode)  FROM ( SELECT PaymentMode from CustomerStatement WHERE companyid = ? "
			+"and year(Date) = ?  and paymentmode = 'Online' union all select PaymentMode "
			+"from EstimateStatement WHERE companyid= ? and year(Date) = ?  "
			+"and paymentmode = 'Online' ) T3 ) AS TotalOnlineCount, "
            
			+"(SELECT (custpay.pay+estpay.pay+custdiscount.discount+estdiscount.discount) "
			+"FROM (SELECT COALESCE(SUM(Pay),0) pay FROM CustomerStatement WHERE companyid = ? and year(Date) = ? and "
			+"paymentmode = 'Online') custpay, "
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM CustomerStatement WHERE companyid = ?  and year(Date) = ?  and "
			+"paymentmode = 'Online') custdiscount,	"
			+"(SELECT COALESCE(SUM(Pay),0) pay FROM EstimateStatement WHERE companyid = ? and year(Date) = ?  and "
			+"paymentmode = 'Online') estpay,	"
			+"(SELECT COALESCE(SUM(Discount),0) discount FROM EstimateStatement WHERE companyid = ?  and year(Date) = ? and "
			+"paymentmode = 'Online') estdiscount ) AS OnlineAmount ";


	
	
	
	
	
	
	
	
	
	/*
	 * TOTAL SALES QTY WITHOUT ESTIMATE
	 */
	
	/*
	String SELECT_TOTAL_SALES_QTY_WITHOUT_ESTIMATE_DAILY = "SELECT SUM(totalitemqty) AS DailyQty FROM SaleInvoiceTable WHERE companyid = ?  and date(date) = ? ";
	
	String SELECT_TOTAL_SALES_QTY_WITHOUT_ESTIMATE_MONTHLY = "SELECT SUM(totalitemqty) AS MonthlyQty FROM SaleInvoiceTable WHERE companyid = ?  and month(date) = ? ";
	
	String SELECT_TOTAL_SALES_QTY_WITHOUT_ESTIMATE_YEARLY = "SELECT SUM(totalitemqty) AS YearlyQty FROM SaleInvoiceTable WHERE companyid = ?  and year(date) = ? ";
	
	*/
	
	String SELECT_TOTAL_SALES_QTY_WITHOUT_ESTIMATE_DAILY_MONTHLY_YEARLY="  SELECT (SELECT SUM(Quantity) FROM SaleInvoiceTable "
			+ "WHERE companyid= ? and date(Invoicedate)= ? ) AS DailyQty,"
			+"(SELECT SUM(Quantity) FROM SaleInvoiceTable WHERE companyid= ? and month(Invoicedate)= ? and year(Invoicedate)= ? )AS MonthlyQty,"
			+"SUM(Quantity) AS YearlyQty FROM SaleInvoiceTable WHERE companyid= ?  and year(Invoicedate)= ? ";
	
	
	
	/*
	 * TOTAL SALES QTY WITH ESTIMATE
	 */
	
	String SELECT_TOTAL_SALES_QTY_WITH_ESTIMATE_DAILY_MONTHLY_YEARLY="SELECT (SELECT Sum(Quantity) "
			+"FROM ( SELECT Quantity from SaleInvoiceTable WHERE companyid = ?  "
			+ "and date(InvoiceDate) = ?  union all select Quantity from EstimateInvoiceTable WHERE companyid= ? and "
			+ "date(InvoiceDate) = ?  ) T )AS DailyQty,(SELECT SUM(Quantity)  FROM ( SELECT Quantity from SaleInvoiceTable "
			+ "WHERE companyid = ? and month(InvoiceDate) = ? and year(InvoiceDate) = ? union all select Quantity from EstimateInvoiceTable WHERE"
			+ " companyid= ? and  month(InvoiceDate) = ? and year(InvoiceDate) = ? ) T1 )AS MonthlyQty,"
			+ "SUM(Quantity) AS YearlyQty  FROM ( SELECT Quantity from SaleInvoiceTable WHERE companyid = ? "
			+ "and year(InvoiceDate) = ?  union all select Quantity "
			+ "from EstimateInvoiceTable WHERE companyid= ? and year(InvoiceDate) = ? ) T2 ";
	
	
	
	/*
	 * TAX WITHOUT ESTIMATE
	 */
	
	String SELECT_TAX_WITHOUT_ESTIMATE="  SELECT (SELECT SUM(totalgst) FROM SaleInvoiceTable "
			+ "WHERE companyid= ? and date(Invoicedate)= ? ) AS DailyTax,"
			+"(SELECT SUM(totalgst) FROM SaleInvoiceTable WHERE companyid= ? and month(Invoicedate)= ? and year(Invoicedate)= ? )AS MonthlyTax,"
			+"SUM(totalgst) AS YearlyTax FROM SaleInvoiceTable WHERE companyid= ?  and year(Invoicedate)= ? ";
	
	/*
	 * TAX WITH ESTIMATE
	 */
	String SELECT_TAX_WITH_ESTIMATE="SELECT (SELECT Sum(totalgst) "
			+"FROM ( SELECT totalgst from SaleInvoiceTable WHERE companyid = ?  "
			+ "and date(InvoiceDate) = ?  union all select totalgst from EstimateInvoiceTable WHERE companyid= ? and "
			+ "date(InvoiceDate) = ?  ) T )AS DailyQty,(SELECT SUM(totalgst)  FROM ( SELECT totalgst from SaleInvoiceTable "
			+ "WHERE companyid = ? and month(InvoiceDate) = ? and year(InvoiceDate) = ? union all select totalgst from EstimateInvoiceTable WHERE"
			+ " companyid= ? and  month(InvoiceDate) = ? and year(InvoiceDate) = ? ) T1 )AS MonthlyQty,"
			+ "SUM(totalgst) AS YearlyQty  FROM ( SELECT totalgst from SaleInvoiceTable WHERE companyid = ? "
			+ "and year(InvoiceDate) = ?  union all select totalgst "
			+ "from EstimateInvoiceTable WHERE companyid= ? and year(InvoiceDate) = ? ) T2 ";
	
	String SELECT_TAX_WITHOUT_ESTIMATE_DAILY="  SELECT DISTINCT InvoiceNo,totalgst AS DailyTax FROM SaleInvoiceTable "
			+ "WHERE companyid= ? and date(Invoicedate)= ? ";
		
	String SELECT_TAX_WITHOUT_ESTIMATE_MONTHLY="SELECT DISTINCT InvoiceNo,totalgst AS MonthlyTax  FROM SaleInvoiceTable WHERE "
			+ "companyid= ? and month(Invoicedate)= ? and year(Invoicedate)= ? ";
	
	String SELECT_TAX_WITHOUT_ESTIMATE_YEARLY="  SELECT DISTINCT InvoiceNo,totalgst AS YearlyTax FROM SaleInvoiceTable "
			+ "WHERE companyid= ? and year(Invoicedate)= ?  ";
	
	/*
	 * QUERY FOR EMPLOYEE STATISTICS
	 */
	String Emp_Stat_daily="select staffName from EmployeeStatistics where companyId=? and date(Date) = ? group by staffName ";
	String Emp_Stat_role="select roleName from EmployeeStatistics where companyId=? and staffName=? ";

	String Emp_Stat_monthly="select staffName from EmployeeStatistics where companyId=? and month(Date) = ? AND year(Date) = ? group by staffName";

	String Emp_Stat_yearly="select staffName  from EmployeeStatistics where companyId=? and year(Date) = ? group by staffName";
	
	String Emp_Stat_Daily="select count(productType) as noofservices,sum(amount) as serviceamount from EmployeeStatistics where companyId=? and staffName=? and roleName=? and date(Date)=?";
	
	String Emp_Stat_Monthly="select count(productType) as noofservices,sum(amount) as serviceamount from EmployeeStatistics where companyId=? and staffName=? and roleName=? and month(Date) = ? AND year(Date) = ?";
	
	String Emp_Stat_Yearly="select count(productType) as noofservices,sum(amount) as serviceamount from EmployeeStatistics where companyId=? and staffName=? and roleName=? and year(Date) = ?";
	
}
