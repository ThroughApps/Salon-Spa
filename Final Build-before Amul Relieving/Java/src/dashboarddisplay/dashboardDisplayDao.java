package dashboarddisplay;

import java.sql.Connection;




import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import DBUtil.DatabaseUtil;





public class dashboardDisplayDao {

	public dashboardDisplayJSON selectDashboard_Display_Data(dashboardDisplayJSON json) {
	
		
		ArrayList<dashboardDisplayJSON> dailyList = new ArrayList<dashboardDisplayJSON>();
		ArrayList<dashboardDisplayJSON> monthlyList = new ArrayList<dashboardDisplayJSON>();
		ArrayList<dashboardDisplayJSON> yearlyList = new ArrayList<dashboardDisplayJSON>();
		// ArrayList<dashboardDisplayJSON> selectvendornamelist = new
		// ArrayList<dashboardDisplayJSON>();
		//dashboardDisplayJSON res = new dashboardDisplayJSON();
		Connection connection = null;

		dashboardDisplayJSON selectdashboard_Monthly_sale_Purchase_Expense = new dashboardDisplayJSON();
		dashboardDisplayJSON dailyData = new dashboardDisplayJSON();
		dashboardDisplayJSON monthlyData = new dashboardDisplayJSON();
		dashboardDisplayJSON yearlyData = new dashboardDisplayJSON();
		
		
		try {
			

			
/* Select_Monthly_SaleInvoice*/
			connection = DatabaseUtil.getDBConnection();
			String Monthly_SaleInvoice = QueryConstants.Select_Monthly_SaleInvoice;
			PreparedStatement preparedStmt = connection.prepareStatement(Monthly_SaleInvoice);
			preparedStmt.setString(1, json.getCurrent_Month());
			preparedStmt.setString(2, json.getCurrent_Year());
			preparedStmt.setString(3, json.getCompanyId());
			ResultSet rs = preparedStmt.executeQuery();
			while (rs.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_SalesInvoice(rs.getString("SaleInvoice_Total_Amt"));
		
			
		
			}
			
			/* Select_Monthly_EstimateInvoice*/

			String Monthly_EstimateInvoice = QueryConstants.Select_Monthly_EstimateInvoice;
			PreparedStatement preparedStmt16 = connection.prepareStatement(Monthly_EstimateInvoice);
			preparedStmt16.setString(1, json.getCurrent_Month());
			preparedStmt16.setString(2, json.getCurrent_Year());
			preparedStmt16.setString(3, json.getCompanyId());
			ResultSet rs16 = preparedStmt16.executeQuery();
			while (rs16.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_EstimateInvoice(rs16.getString("EstimateInvoice_Total_Amt"));
				
		
		
			}
			

			String PurchaseInvoice1 = QueryConstants.Select_Daily_PurchaseInvoice;
			PreparedStatement preparedStmtda = connection.prepareStatement(PurchaseInvoice1);
			preparedStmtda.setString(1, json.getDate());		
			preparedStmtda.setString(2, json.getCompanyId());
			ResultSet rs1da = preparedStmtda.executeQuery();

			while (rs1da.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setDaily_PurchaseInvoice(rs1da.getString("PurchaseInvoice_Total_Amt"));
			
				dailyData.setDaily_PurchaseInvoice(rs1da.getString("PurchaseInvoice_Total_Amt"));
		
			}
			

			String PurchaseInvoice = QueryConstants.Select_Monthly_PurchaseInvoice;
			PreparedStatement preparedStmt1 = connection.prepareStatement(PurchaseInvoice);
			preparedStmt1.setString(1, json.getCurrent_Month());
			preparedStmt1.setString(2, json.getCurrent_Year());
			preparedStmt1.setString(3, json.getCompanyId());
			ResultSet rs1 = preparedStmt1.executeQuery();

			while (rs1.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_PurchaseInvoice(rs1.getString("PurchaseInvoice_Total_Amt"));
				monthlyData.setMonthly_PurchaseInvoice(rs1.getString("PurchaseInvoice_Total_Amt"));
			
			}
			
	
			String PurchaseInvoiceye = QueryConstants.Select_Yearly_PurchaseInvoice;
			PreparedStatement preparedStmtye = connection.prepareStatement(PurchaseInvoiceye);		
			preparedStmtye.setString(1, json.getCurrent_Year());
			preparedStmtye.setString(2, json.getCompanyId());
			ResultSet rsye = preparedStmtye.executeQuery();

			while (rsye.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setYearly_PurchaseInvoice(rsye.getString("PurchaseInvoice_Total_Amt"));
			
			yearlyData.setYearly_PurchaseInvoice(rsye.getString("PurchaseInvoice_Total_Amt"));
		
			}
			
			
/* Select_monthly_ExpenseInvoice*/
			String ExpenseInvoice = QueryConstants.Select_Monthly_ExpenseInvoice;
			PreparedStatement preparedStmt2 = connection.prepareStatement(ExpenseInvoice);
			preparedStmt2.setString(1, json.getCurrent_Month());
			preparedStmt2.setString(2, json.getCurrent_Year());
			preparedStmt2.setString(3, json.getCompanyId());
			ResultSet rs2 = preparedStmt2.executeQuery();

			while (rs2.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setMonthly_ExpenseInvoice(rs2.getString("ExpenseInvoice_Total_Amt"));
				
				monthlyData.setMonthly_ExpenseInvoice(rs2.getString("ExpenseInvoice_Total_Amt"));
			
			}
			
			String roleNameDaily = null;
			ArrayList <dashboardDisplayJSON> dailyEmployeeStatisticsDataList=new ArrayList <dashboardDisplayJSON>();
			  String querySelectemployeeStatisticsDataList=QueryConstants.Emp_Stat_daily;
				PreparedStatement preparedStmtemployeeStatisticsDataList = connection.prepareStatement(querySelectemployeeStatisticsDataList);
				preparedStmtemployeeStatisticsDataList.setString(1,json.getCompanyId());
preparedStmtemployeeStatisticsDataList.setString(2,json.getDate());
				ResultSet rsemployeeStatisticsDataList=preparedStmtemployeeStatisticsDataList.executeQuery();
				
				while(rsemployeeStatisticsDataList.next()) {
					dashboardDisplayJSON reportData=new dashboardDisplayJSON();
			
					reportData.setStaffName(rsemployeeStatisticsDataList.getString("staffName"));
					
				System.out.println("staffName:"+rsemployeeStatisticsDataList.getString("staffName"));
					String querySelect3=QueryConstants.Emp_Stat_role;
					PreparedStatement preparedStmtrole=connection.prepareStatement(querySelect3);					
					preparedStmtrole.setString(1, json.getCompanyId());
					preparedStmtrole.setString(2, rsemployeeStatisticsDataList.getString("staffName"));
				
					ResultSet rsrole=preparedStmtrole.executeQuery();
					while(rsrole.next())
					{
					
						reportData.setRoleName(rsrole.getString("roleName"));
						roleNameDaily=rsrole.getString("roleName");
						
					}
					System.out.println("roleName:"+roleNameDaily);
					String querySelect2=QueryConstants.Emp_Stat_Daily;
					PreparedStatement preparedStmtyear=connection.prepareStatement(querySelect2);					
					preparedStmtyear.setString(1, json.getCompanyId());
					preparedStmtyear.setString(2, rsemployeeStatisticsDataList.getString("staffName"));
					preparedStmtyear.setString(3, roleNameDaily);
					preparedStmtyear.setString(4, json.getDate());
					ResultSet rsyear=preparedStmtyear.executeQuery();
					while(rsyear.next())
					{
					
						reportData.setNoOfService(rsyear.getString("noofservices"));
						reportData.setServiceAmount(rsyear.getString("serviceamount"));
						System.out.println("no of services:"+rsyear.getString("noofservices"));
						System.out.println("Service Amount:"+rsyear.getString("serviceamount"));
					}
					dailyEmployeeStatisticsDataList.add(reportData);
				}
				selectdashboard_Monthly_sale_Purchase_Expense.setDailyEmployeeStatisticsDataList(dailyEmployeeStatisticsDataList);



ArrayList <dashboardDisplayJSON> monthlyEmployeeStatisticsDataList=new ArrayList <dashboardDisplayJSON>();
			  String querySelectemployeeStatisticsDataListmonthly=QueryConstants.Emp_Stat_monthly;
				PreparedStatement preparedStmtemployeeStatisticsDataListmonthly = connection.prepareStatement(querySelectemployeeStatisticsDataListmonthly);
				preparedStmtemployeeStatisticsDataListmonthly.setString(1,json.getCompanyId());
				preparedStmtemployeeStatisticsDataListmonthly.setString(2,json.getCurrent_Month());
				preparedStmtemployeeStatisticsDataListmonthly.setString(3,json.getCurrent_Year());
				ResultSet rsemployeeStatisticsDataListmonthly=preparedStmtemployeeStatisticsDataListmonthly.executeQuery();
				
				while(rsemployeeStatisticsDataListmonthly.next()) {
					dashboardDisplayJSON reportData=new dashboardDisplayJSON();
			
					reportData.setStaffName(rsemployeeStatisticsDataListmonthly.getString("staffName"));
					String querySelect3=QueryConstants.Emp_Stat_role;
					PreparedStatement preparedStmtrole=connection.prepareStatement(querySelect3);					
					preparedStmtrole.setString(1, json.getCompanyId());
					preparedStmtrole.setString(2, rsemployeeStatisticsDataListmonthly.getString("staffName"));
				
					ResultSet rsrole=preparedStmtrole.executeQuery();
					while(rsrole.next())
					{
					
						reportData.setRoleName(rsrole.getString("roleName"));
						roleNameDaily=rsrole.getString("roleName");
					
					}
					String querySelect2=QueryConstants.Emp_Stat_Monthly;
					PreparedStatement preparedStmtyear=connection.prepareStatement(querySelect2);					
					preparedStmtyear.setString(1, json.getCompanyId());
					preparedStmtyear.setString(2, rsemployeeStatisticsDataListmonthly.getString("staffName"));
					preparedStmtyear.setString(3, roleNameDaily);
					preparedStmtyear.setString(4,json.getCurrent_Month());
					preparedStmtyear.setString(5,json.getCurrent_Year());
					
					
					ResultSet rsyear=preparedStmtyear.executeQuery();
					while(rsyear.next())
					{
					
						reportData.setNoOfService(rsyear.getString("noofservices"));
						reportData.setServiceAmount(rsyear.getString("serviceamount"));
					
						
					
						
					}monthlyEmployeeStatisticsDataList.add(reportData);
				}
				selectdashboard_Monthly_sale_Purchase_Expense.setMonthlyEmployeeStatisticsDataList(monthlyEmployeeStatisticsDataList);






ArrayList <dashboardDisplayJSON> yearlyEmployeeStatisticsDataList=new ArrayList <dashboardDisplayJSON>();
			  String querySelectemployeeStatisticsDataListyearly=QueryConstants.Emp_Stat_yearly;
				PreparedStatement preparedStmtemployeeStatisticsDataListyearly = connection.prepareStatement(querySelectemployeeStatisticsDataListyearly);
				preparedStmtemployeeStatisticsDataListyearly.setString(1,json.getCompanyId());	
				preparedStmtemployeeStatisticsDataListyearly.setString(2,json.getCurrent_Year());
				ResultSet rsemployeeStatisticsDataListyearly=preparedStmtemployeeStatisticsDataListyearly.executeQuery();
				
				while(rsemployeeStatisticsDataListyearly.next()) {
					dashboardDisplayJSON reportData=new dashboardDisplayJSON();
			
					reportData.setStaffName(rsemployeeStatisticsDataListyearly.getString("staffName"));
					String querySelect3=QueryConstants.Emp_Stat_role;
					PreparedStatement preparedStmtrole=connection.prepareStatement(querySelect3);					
					preparedStmtrole.setString(1, json.getCompanyId());
					preparedStmtrole.setString(2, rsemployeeStatisticsDataListyearly.getString("staffName"));
				
					ResultSet rsrole=preparedStmtrole.executeQuery();
					while(rsrole.next())
					{
					
						reportData.setRoleName(rsrole.getString("roleName"));
						roleNameDaily=rsrole.getString("roleName");
					
					}	
					String querySelect2=QueryConstants.Emp_Stat_Yearly;
					PreparedStatement preparedStmtyear=connection.prepareStatement(querySelect2);					
					preparedStmtyear.setString(1, json.getCompanyId());
					preparedStmtyear.setString(2, rsemployeeStatisticsDataListyearly.getString("staffName"));
					preparedStmtyear.setString(3,roleNameDaily);
					preparedStmtyear.setString(4,json.getCurrent_Year());
					ResultSet rsyear=preparedStmtyear.executeQuery();
					while(rsyear.next())
					{
					
						reportData.setNoOfService(rsyear.getString("noofservices"));
						reportData.setServiceAmount(rsyear.getString("serviceamount"));
				}
					//yearlyData.setNoOfService(rsemployeeStatisticsDataListyearly.getString("noofservices"));
					//yearlyData.setServiceAmount(rsemployeeStatisticsDataListyearly.getString("serviceamount"));
					yearlyEmployeeStatisticsDataList.add(reportData);
				}
				selectdashboard_Monthly_sale_Purchase_Expense.setYearlyEmployeeStatisticsDataList(yearlyEmployeeStatisticsDataList);




/* Total_No_of_Vendors*/
			
			String Total_No_of_Vendors = QueryConstants.Select_Total_No_of_Vendors;
			PreparedStatement preparedStmt3 = connection.prepareStatement(Total_No_of_Vendors);
			preparedStmt3.setString(1, json.getCompanyId());
				ResultSet rs3 = preparedStmt3.executeQuery();

			while (rs3.next()) {

				
				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_Vendors(rs3.getString("Total_No_of_Vendors"));
			
				
			}
			
/* Total_No_of_Clients*/
			
			String Total_No_of_Customers = QueryConstants.Select_Total_No_of_Customers;
			PreparedStatement preparedStmtCus = connection.prepareStatement(Total_No_of_Customers);
			preparedStmtCus.setString(1, json.getCompanyId());
				ResultSet rsCus = preparedStmtCus.executeQuery();

			while (rsCus.next()) {

				
				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_Customers(rsCus.getString("Total_No_of_Customers"));
				
			
				
			}
/* Total_No_of_ProductList*/
			
			String Total_No_of_ProductList = QueryConstants.Select_Total_No_of_ProductList;
			PreparedStatement preparedStmt4 = connection.prepareStatement(Total_No_of_ProductList);
			preparedStmt4.setString(1, json.getCompanyId());
				ResultSet rs4 = preparedStmt4.executeQuery();

			while (rs4.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_ProductList(rs4.getString("Total_No_of_ProductList"));
			
				
			}
			
			/* Select_Total_No_of_SaleInvoice*/
			
			String Total_No_of_SaleInvoice = QueryConstants.Select_Total_No_of_SaleInvoice;
			PreparedStatement preparedStmt5 = connection.prepareStatement(Total_No_of_SaleInvoice);
			preparedStmt5.setString(1, json.getCompanyId());
				ResultSet rs5 = preparedStmt5.executeQuery();

			while (rs5.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_SaleInvoice(rs5.getString("Total_No_of_SaleInvoice"));
				
			
				
			}
			

			/* Select_Total_No_of_WithGST_Quotation*/
			
			String Total_No_of_WithGST_Quotation = QueryConstants.Select_Total_No_of_WithGST_Quotation;
			PreparedStatement preparedStmt6 = connection.prepareStatement(Total_No_of_WithGST_Quotation);
			preparedStmt6.setString(1, json.getCompanyId());
				ResultSet rs6 = preparedStmt6.executeQuery();

			while (rs6.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_WithGST_Quotation(rs6.getString("Total_No_of_WithGST_Quotation"));
				
		
			
				
			}
			
/* Select_Total_No_of_SaleInvoice_Qty*/
			
			
			String Total_No_of_SaleInvoice_Qty = QueryConstants.Select_Total_No_of_SaleInvoice_Qty;
			PreparedStatement preparedStmt7 = connection.prepareStatement(Total_No_of_SaleInvoice_Qty);
			preparedStmt7.setString(1, json.getCurrent_Month());
			preparedStmt7.setString(2, json.getCurrent_Year());
			preparedStmt7.setString(3, json.getCompanyId());	
			ResultSet rs7 = preparedStmt7.executeQuery();

			while (rs7.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_SaleInvoice_Qty(rs7.getString("Total_No_of_SaleInvoice_Qty"));
				
	
			
			
				
			}
				/*Select_Total_No_of_SaleInvoice_Qty_Estimate*/
			
			String Total_No_of_SaleInvoice_Qty_Estimate = QueryConstants.Select_Total_No_of_SaleInvoice_Qty_Estimate;
			PreparedStatement preparedStmt8 = connection.prepareStatement(Total_No_of_SaleInvoice_Qty_Estimate);
			preparedStmt8.setString(1, json.getCurrent_Month());
			preparedStmt8.setString(2, json.getCurrent_Year());
			preparedStmt8.setString(3, json.getCompanyId());	
			ResultSet rs8 = preparedStmt8.executeQuery();

			while (rs8.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_SaleInvoice_Qty_Estimate(rs8.getString("Total_No_of_SaleInvoice_Qty_Estimate"));
				
		

			}
				/*Select_Total_No_of_Salary_paid*/
			
			String Total_No_of_Salary_paid = QueryConstants.Select_Total_No_of_Salary_paid;
			PreparedStatement preparedStmt9 = connection.prepareStatement(Total_No_of_Salary_paid);
			preparedStmt9.setString(1, json.getCurrent_Month());
			preparedStmt9.setString(2, json.getCurrent_Year());
			preparedStmt9.setString(3, json.getCompanyId());
			ResultSet rs9 = preparedStmt9.executeQuery();

			while (rs9.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_No_of_Salary_paid(rs9.getString("Total_No_of_Salary_paid"));
				
			
			
		
			
			}
			
		/*Select_Total_Sales_Amount_Monthwise*/
			ArrayList<dashboardDisplayJSON> dashboard_LineChart_List = new ArrayList<dashboardDisplayJSON>();	
			
			String Sales_Amount_sale_Monthwise = QueryConstants.Select_Total_Sales_Amount_sale_Monthwise;
			PreparedStatement preparedStmt10 = connection.prepareStatement(Sales_Amount_sale_Monthwise);
			preparedStmt10.setString(1, json.getCurrent_Year());
			preparedStmt10.setString(2, json.getCompanyId());	
			
			ResultSet rs10 = preparedStmt10.executeQuery();

			while (rs10.next()) {
				
				dashboardDisplayJSON dashboard_LineChart = new dashboardDisplayJSON();
				dashboard_LineChart.setCurrent_Year(rs10.getString("current_Year"));
				dashboard_LineChart.setCurrent_Month(rs10.getString("month_index"));
				dashboard_LineChart.setMonthly_SalesInvoice(rs10.getString("month_subtotal"));
				dashboard_LineChart_List.add(dashboard_LineChart);
				
				
			}	       
			selectdashboard_Monthly_sale_Purchase_Expense.setDashboard_LineChart_List(dashboard_LineChart_List);
			
				
			/*Select_Total_Estimate_Amount_sale_Monthwise*/
			ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_Estimate = new ArrayList<dashboardDisplayJSON>();	
			
			String Estimate_Amount_sale_Monthwise = QueryConstants.Select_Total_Estimate_Amount_sale_Monthwise;
			PreparedStatement preparedStmt18 = connection.prepareStatement(Estimate_Amount_sale_Monthwise);
			preparedStmt18.setString(1, json.getCurrent_Year());
			preparedStmt18.setString(2, json.getCompanyId());	
			
			ResultSet rs18 = preparedStmt18.executeQuery();

			while (rs18.next()) {
				
				dashboardDisplayJSON dashboard_LineChart_estimate = new dashboardDisplayJSON();
				dashboard_LineChart_estimate.setCurrent_Year(rs18.getString("current_Year"));
				dashboard_LineChart_estimate.setCurrent_Month(rs18.getString("month_index"));
				dashboard_LineChart_estimate.setMonthly_EstimateInvoice(rs18.getString("month_estimate_subtotal"));
				dashboard_LineChart_List_Estimate.add(dashboard_LineChart_estimate);
				
				
			}        
			selectdashboard_Monthly_sale_Purchase_Expense.setDashboard_LineChart_List_estimate(dashboard_LineChart_List_Estimate);
		
			
			/*Total_Purchase_Amount_sale_Monthwise*/
			ArrayList<dashboardDisplayJSON> dashboard_LineChart_List_purchase = new ArrayList<dashboardDisplayJSON>();	
			
			String Total_Purchase_Amount_sale_Monthwise = QueryConstants.Select_Total_Purchase_Amount_sale_Monthwise;
			PreparedStatement preparedStmt11 = connection.prepareStatement(Total_Purchase_Amount_sale_Monthwise);
			preparedStmt11.setString(1, json.getCurrent_Year());
			preparedStmt11.setString(2, json.getCompanyId());
			ResultSet rs11 = preparedStmt11.executeQuery();

			while (rs11.next()) {
				
				dashboardDisplayJSON dashboard_LineChart_purchase = new dashboardDisplayJSON();
				dashboard_LineChart_purchase.setCurrent_Year(rs11.getString("current_Year"));
				dashboard_LineChart_purchase.setCurrent_Month(rs11.getString("month_index"));
				dashboard_LineChart_purchase.setMonthly_PurchaseInvoice(rs11.getString("month_subtotal"));
				dashboard_LineChart_List_purchase.add(dashboard_LineChart_purchase);
				
				
			} 
			selectdashboard_Monthly_sale_Purchase_Expense.setDashboard_LineChart_List_purchase(dashboard_LineChart_List_purchase);
			
/* Select_Total_No_of_SaleInvoice_Amount_Annually*/
			
			
			String Total_No_of_SaleInvoice_Amount_Annually = QueryConstants.Select_Total_No_of_SaleInvoice_Amount_Annually;
			PreparedStatement preparedStmt12 = connection.prepareStatement(Total_No_of_SaleInvoice_Amount_Annually);
			preparedStmt12.setString(1, json.getCompanyId());
			ResultSet rs12 = preparedStmt12.executeQuery();

			while (rs12.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_Sales_Amount_Annually(rs12.getString("Annual_Sale_Amount"));
				
			
						
			}
			
/* Select_Total_No_of_EstimateInvoice_Amount_Annually*/
			
			
			String Total_No_of_EstimateInvoice_Amount_Annually = QueryConstants.Select_Total_No_of_EstimateInvoice_Amount_Annually;
			PreparedStatement preparedStmt17 = connection.prepareStatement(Total_No_of_EstimateInvoice_Amount_Annually);
			preparedStmt17.setString(1, json.getCompanyId());
			ResultSet rs17 = preparedStmt17.executeQuery();

			while (rs17.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_Estimate_Amount_Annually(rs17.getString("Annual_Estimate_Amount"));
				
				
						
			}
/* Select_Total_No_of_PurchaseInvoice_Amount_Annually*/
			
			
			String Total_No_of_PurchaseInvoice_Amount_Annually = QueryConstants.Select_Total_No_of_PurchaseInvoice_Amount_Annually;
			PreparedStatement preparedStmt13 = connection.prepareStatement(Total_No_of_PurchaseInvoice_Amount_Annually);
			preparedStmt13.setString(1, json.getCompanyId());
			ResultSet rs13 = preparedStmt13.executeQuery();

			while (rs13.next()) {

				selectdashboard_Monthly_sale_Purchase_Expense
						.setTotal_Purchase_Amount_Annually(rs13.getString("Annual_Purchase_Amount"));
				
			
						
			}
		
			/*
			* TOP 5 SALES PER MONTH
			*/
		
			ArrayList <dashboardDisplayJSON> topSlaesPerMonth=new ArrayList <dashboardDisplayJSON>();

			String topSalesPerMonthQuery = QueryConstants.TOP_SALES_PER_MONTH;
			PreparedStatement preparedStmtTopSalesperMonth=connection.prepareStatement(topSalesPerMonthQuery);
			preparedStmtTopSalesperMonth.setString(1, json.getCompanyId());
			preparedStmtTopSalesperMonth.setString(2,json.getCurrent_Month());
			preparedStmtTopSalesperMonth.setString(3,json.getCurrent_Year());
			preparedStmtTopSalesperMonth.setString(4, json.getCompanyId());
			preparedStmtTopSalesperMonth.setString(5,json.getCurrent_Month());
			preparedStmtTopSalesperMonth.setString(6,json.getCurrent_Year());
			ResultSet rstopSalesPerMonth=preparedStmtTopSalesperMonth.executeQuery();
			while(rstopSalesPerMonth.next()) {
			dashboardDisplayJSON topSlaes= new dashboardDisplayJSON();
			topSlaes.setProductName(rstopSalesPerMonth.getString("ProductName"));
			topSlaes.setQuantity(rstopSalesPerMonth.getString("Quantity"));

			topSlaesPerMonth.add(topSlaes);

			}
			selectdashboard_Monthly_sale_Purchase_Expense.setTopSalesPerMonth(topSlaesPerMonth);


			
			ArrayList <dashboardDisplayJSON> topSlaesPerYear=new ArrayList <dashboardDisplayJSON>();

			String topSalesPerYearQuery = QueryConstants.TOP_SALES_PER_YEAR;
			PreparedStatement preparedStmtTopSalesperYear=connection.prepareStatement(topSalesPerYearQuery);
			preparedStmtTopSalesperYear.setString(1,json.getCompanyId());
			preparedStmtTopSalesperYear.setString(2,json.getCurrent_Year());
			preparedStmtTopSalesperYear.setString(3, json.getCompanyId());
			preparedStmtTopSalesperYear.setString(4,json.getCurrent_Year());
			ResultSet rstopSalesPerYear=preparedStmtTopSalesperYear.executeQuery();
			while(rstopSalesPerYear.next()) {
			dashboardDisplayJSON topSlaesyear= new dashboardDisplayJSON();
			topSlaesyear.setProductName(rstopSalesPerYear.getString("ProductName"));
			topSlaesyear.setQuantity(rstopSalesPerYear.getString("Quantity"));

			topSlaesPerYear.add(topSlaesyear);

			}
			selectdashboard_Monthly_sale_Purchase_Expense.setTopSalesPerYear(topSlaesPerYear);
			
			ArrayList <dashboardDisplayJSON> criticalReportDataList=new ArrayList <dashboardDisplayJSON>();
			  String querySelect0=QueryConstants.GET_PRODUCT_DETAILS;
				PreparedStatement preparedStmt0 = connection.prepareStatement(querySelect0);
				preparedStmt0.setString(1,json.getCompanyId());
				ResultSet rs0=preparedStmt0.executeQuery();
				
				while(rs0.next()) {
					dashboardDisplayJSON reportData=new dashboardDisplayJSON();
			
					reportData.setProductName(rs0.getString("ProductName"));
					reportData.setQuantity(rs0.getString("Quantity"));
				
					criticalReportDataList.add(reportData);
				}
				selectdashboard_Monthly_sale_Purchase_Expense.setCriticalReportDataList(criticalReportDataList);
			
				
			/*	
				* Employee Statistics
				
				ArrayList <dashboardDisplayJSON> employeeStatisticsDataList=new ArrayList <dashboardDisplayJSON>();
				  String querySelectemployeeStatisticsDataList=QueryConstants.Emp_Stat;
					PreparedStatement preparedStmtemployeeStatisticsDataList = connection.prepareStatement(querySelectemployeeStatisticsDataList);
					preparedStmtemployeeStatisticsDataList.setString(1,json.getCompanyId());
					ResultSet rsemployeeStatisticsDataList=preparedStmtemployeeStatisticsDataList.executeQuery();
					
					while(rsemployeeStatisticsDataList.next()) {
						dashboardDisplayJSON reportData=new dashboardDisplayJSON();
				
						reportData.setStaffName(rsemployeeStatisticsDataList.getString("staffName"));
						reportData.setRoleName(rsemployeeStatisticsDataList.getString("roleName"));
						reportData.setNoOfService(rsemployeeStatisticsDataList.getString("noofservices"));
						reportData.setServiceAmount(rsemployeeStatisticsDataList.getString("serviceamount"));
						employeeStatisticsDataList.add(reportData);
					}
					selectdashboard_Monthly_sale_Purchase_Expense.setEmployeeStatisticsDataList(employeeStatisticsDataList);
*/		
			/*
			* YEARLY EXPENSE
			*/
			String ExpenseInvoiceYearly = QueryConstants.SELECT_YEARLY_EXPENSE;
			PreparedStatement preparedStmtYearlyExpense = connection.prepareStatement(ExpenseInvoiceYearly);
			preparedStmtYearlyExpense.setString(1, json.getCurrent_Year());
			preparedStmtYearlyExpense.setString(2, json.getCompanyId());
			ResultSet rsYeralyExpense = preparedStmtYearlyExpense.executeQuery();

			while (rsYeralyExpense.next()) {

			selectdashboard_Monthly_sale_Purchase_Expense
			.setYearlyExpense(rsYeralyExpense.getString("YearlyExpenseAmt"));

			yearlyData.setYearlyExpense(rsYeralyExpense.getString("YearlyExpenseAmt"));
		//	yearlyList.add(yearlyData);

			}


			/*
			* DAILY EXPENSE
			*/
			String ExpenseInvoiceDaily = QueryConstants.SELECT_DAILY_EXPENSE;
			PreparedStatement preparedStmtDailyExpense = connection.prepareStatement(ExpenseInvoiceDaily);
			preparedStmtDailyExpense.setString(1, json.getDate());
			preparedStmtDailyExpense.setString(2, json.getCompanyId());
			ResultSet rsDailyExpense = preparedStmtDailyExpense.executeQuery();

			while (rsDailyExpense.next()) {

			selectdashboard_Monthly_sale_Purchase_Expense
			.setDailyExpense(rsDailyExpense.getString("DailyExpenseAmt"));

			dailyData.setDailyExpense(rsDailyExpense.getString("DailyExpenseAmt"));
		//	dailyList.add(dailyData);
			}

			 /*
			* DAILY & YEARLY SALES AMOUNT
			*/
			String configValue = null;
			String configQuery = QueryConstants.SELECT_CONFIG_OPTION;
			PreparedStatement preparedStmtConfigQuery = connection.prepareStatement(configQuery);
			preparedStmtConfigQuery.setString(1, json.getCompanyId());
			ResultSet rsConfigQuery = preparedStmtConfigQuery.executeQuery();

			while (rsConfigQuery.next()) {

			configValue=rsConfigQuery.getString("configValue");
			}

			if(configValue.equals("0")) {
		

			String salesAmtWithoutEstimateDailyQuery = QueryConstants.SELECT_SALES_WITHOUT_ESTIMATE_DAILY;
			PreparedStatement preparedStmtSalesWithoutEstimateDailyQuery = connection.prepareStatement(salesAmtWithoutEstimateDailyQuery);
			preparedStmtSalesWithoutEstimateDailyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesWithoutEstimateDailyQuery.setString(2, json.getDate());
			ResultSet rsSalesWithoutEstimateDailyQuery = preparedStmtSalesWithoutEstimateDailyQuery.executeQuery();
			while(rsSalesWithoutEstimateDailyQuery.next()) {
			selectdashboard_Monthly_sale_Purchase_Expense.setDailySales(rsSalesWithoutEstimateDailyQuery.getString("TotalAmount"));
			dailyData.setDailySales(rsSalesWithoutEstimateDailyQuery.getString("TotalAmount"));
		//	dailyList.add(dailyData);
			}
			//selectdashboard_Monthly_sale_Purchase_Expense.setDailyList(dailyList);
			
			String salesAmtWithoutEstimateMonthlyQuery = QueryConstants.SELECT_SALES_WITHOUT_ESTIMATE_MONTHLY;
			PreparedStatement preparedStmtSalesWithoutEstimateMonthlyQuery = connection.prepareStatement(salesAmtWithoutEstimateMonthlyQuery);
			preparedStmtSalesWithoutEstimateMonthlyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesWithoutEstimateMonthlyQuery.setString(2, json.getCurrent_Month());			
			preparedStmtSalesWithoutEstimateMonthlyQuery.setString(3, json.getCurrent_Year());	
			
			ResultSet rsSalesWithoutEstimateMonthlyQuery = preparedStmtSalesWithoutEstimateMonthlyQuery.executeQuery();
			while(rsSalesWithoutEstimateMonthlyQuery.next()) {
				selectdashboard_Monthly_sale_Purchase_Expense.setMonthlySales(rsSalesWithoutEstimateMonthlyQuery.getString("TotalAmount"));
				
				monthlyData.setMonthlySales(rsSalesWithoutEstimateMonthlyQuery.getString("TotalAmount"));
			//	monthlyList.add(monthlyData);
			
			}
			
			String salesAmtWithoutEstimateYearlyQuery = QueryConstants.SELECT_SALES_WITHOUT_ESTIMATE_YEARLY;
			PreparedStatement preparedStmtSalesWithoutEstimateYearlyQuery = connection.prepareStatement(salesAmtWithoutEstimateYearlyQuery);
			preparedStmtSalesWithoutEstimateYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesWithoutEstimateYearlyQuery.setString(2, json.getCurrent_Year());
			ResultSet rsSalesWithoutEstimateYearlyQuery = preparedStmtSalesWithoutEstimateYearlyQuery.executeQuery();
			while(rsSalesWithoutEstimateYearlyQuery.next()) {
			selectdashboard_Monthly_sale_Purchase_Expense.setYearlySales(rsSalesWithoutEstimateYearlyQuery.getString("TotalAmount"));
			
			
			yearlyData.setYearlySales(rsSalesWithoutEstimateYearlyQuery.getString("TotalAmount"));
			//yearlyList.add(yearlyData);
			
			}

	
			
			//TOTAL SALES QUANTITY -- DAILY/MONTHLY/YEARLY
			String salesQtyWithoutEstimateDailyMonthlyYearlyQuery = QueryConstants.SELECT_TOTAL_SALES_QTY_WITHOUT_ESTIMATE_DAILY_MONTHLY_YEARLY;
			PreparedStatement preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery = connection.prepareStatement(salesQtyWithoutEstimateDailyMonthlyYearlyQuery);
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(2, json.getDate());
			
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(3, json.getCompanyId());
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(4, json.getCurrent_Month());
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(5, json.getCurrent_Year());
			
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(6, json.getCompanyId());
			preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.setString(7, json.getCurrent_Year());
			
			ResultSet rsSalesQtyWithoutEstimateDailyMonthlyYearlyQuery = preparedStmtQtySalesWithoutEstimateDailyMonthlyYearlyQuery.executeQuery();
			while(rsSalesQtyWithoutEstimateDailyMonthlyYearlyQuery.next()) {
				
			dailyData.setQuantity(rsSalesQtyWithoutEstimateDailyMonthlyYearlyQuery.getString("DailyQty"));
			monthlyData.setQuantity(rsSalesQtyWithoutEstimateDailyMonthlyYearlyQuery.getString("MonthlyQty"));
			yearlyData.setQuantity(rsSalesQtyWithoutEstimateDailyMonthlyYearlyQuery.getString("YearlyQty"));
			//yearlyList.add(yearlyData);
			
			}
		
			

			String paymentStaticsWithoutEstimateDailyQuery = QueryConstants.SELECT_PAY_STAT_WITHOUT_ESTIMATE_DAILY;
			PreparedStatement preparedStmtpaymentStaticsWithoutEstimateDailyQuery = connection.prepareStatement(paymentStaticsWithoutEstimateDailyQuery);
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(1, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(2, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(3, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(4, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(5, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(6, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(7, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(8, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(9, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(10, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(11, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(12, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(13, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(14, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(15, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(16, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(17, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(18, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(19, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(20, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(21, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(22, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(23, json.getDate());
			preparedStmtpaymentStaticsWithoutEstimateDailyQuery.setString(24, json.getCompanyId());
			
			
			ResultSet rspaymentStaticsWithoutEstimateDailyQuery = preparedStmtpaymentStaticsWithoutEstimateDailyQuery.executeQuery();
			while(rspaymentStaticsWithoutEstimateDailyQuery.next()) {
				
			dailyData.setDailyCashPaymentStatics(rspaymentStaticsWithoutEstimateDailyQuery.getString("Cash"));
			dailyData.setCashpayStaticsAmount(rspaymentStaticsWithoutEstimateDailyQuery.getString("CashAmount"));
			
			dailyData.setDailyCardPaymentStatics(rspaymentStaticsWithoutEstimateDailyQuery.getString("Card"));
			dailyData.setCardpayStaticsAmount(rspaymentStaticsWithoutEstimateDailyQuery.getString("CardAmount"));
			
			dailyData.setDailyChequePaymentStatics(rspaymentStaticsWithoutEstimateDailyQuery.getString("Cheque"));
			dailyData.setChequepayStaticsAmount(rspaymentStaticsWithoutEstimateDailyQuery.getString("ChequeAmount"));
			
			dailyData.setDailyOnlinePaymentStatics(rspaymentStaticsWithoutEstimateDailyQuery.getString("Online"));
			dailyData.setOnlinepayStaticsAmount(rspaymentStaticsWithoutEstimateDailyQuery.getString("OnlineAmount"));
			
			//dailyList.add(dailyData);
			}
			

			
			
			String paymentStaticsWithoutEstimateMonthlyQuery = QueryConstants.SELECT_PAY_STAT_WITHOUT_ESTIMATE_MONTHLY;
			PreparedStatement preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery = connection.prepareStatement(paymentStaticsWithoutEstimateMonthlyQuery);
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(1, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(2, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(3, json.getCompanyId());
			
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(4, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(5, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(6, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(7, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(8, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(9, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(10, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(11, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(12, json.getCompanyId());
			
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(13, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(14, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(15, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(16, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(17, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(18, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(19, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(20, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(21, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(22, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(23, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(24, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(25, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(26, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(27, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(28, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(29, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(30, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(31, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(32, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(33, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(34, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(35, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.setString(36, json.getCompanyId());

			
			
			
			
			
			
		
			ResultSet rspaymentStaticsWithoutEstimateMonthlyQuery = preparedStmtpaymentStaticsWithoutEstimateMonthlyQuery.executeQuery();
			while(rspaymentStaticsWithoutEstimateMonthlyQuery.next()) {
					
			
				monthlyData.setMonthlyCashPaymentStatics(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("Cash"));
				monthlyData.setCashpayStaticsAmount(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("CashAmount"));

				
				monthlyData.setMonthlyCardPaymentStatics(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("Card"));
				monthlyData.setCardpayStaticsAmount(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("CardAmount"));

				monthlyData.setMonthlyChequePaymentStatics(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("Cheque"));
				monthlyData.setChequepayStaticsAmount(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("ChequeAmount"));

				monthlyData.setMonthlyOnlinePaymentStatics(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("Online"));
				monthlyData.setOnlinepayStaticsAmount(rspaymentStaticsWithoutEstimateMonthlyQuery.getString("OnlineAmount"));
			
	
				//monthlyList.add(monthlyData);
			
			}
			
				
			String paymentStaticsWithoutEstimateYearlyQuery = QueryConstants.SELECT_PAY_STAT_WITHOUT_ESTIMATE_YEARLY;
			PreparedStatement preparedStmtpaymentStaticsWithoutEstimateYearlyQuery = connection.prepareStatement(paymentStaticsWithoutEstimateYearlyQuery);
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(1, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(2, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(3, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(4, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(5, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(6, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(7, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(8, json.getCompanyId());
			
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(9, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(10, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(11, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(12, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(13, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(14, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(15, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(16, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(17, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(18, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(19, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(20, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(21, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(22, json.getCompanyId());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(23, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.setString(24, json.getCompanyId());
			
			
			ResultSet rspaymentStaticsWithoutEstimateYearlyQuery = preparedStmtpaymentStaticsWithoutEstimateYearlyQuery.executeQuery();
			while(rspaymentStaticsWithoutEstimateYearlyQuery.next()) {

			yearlyData.setYearlyCashPaymentStatics(rspaymentStaticsWithoutEstimateYearlyQuery.getString("Cash"));
			yearlyData.setCashpayStaticsAmount(rspaymentStaticsWithoutEstimateYearlyQuery.getString("CashAmount"));

			
			yearlyData.setYearlyCardPaymentStatics(rspaymentStaticsWithoutEstimateYearlyQuery.getString("Card"));
			yearlyData.setCardpayStaticsAmount(rspaymentStaticsWithoutEstimateYearlyQuery.getString("CardAmount"));

			
			yearlyData.setYearlyChequePaymentStatics(rspaymentStaticsWithoutEstimateYearlyQuery.getString("Cheque"));
			yearlyData.setChequepayStaticsAmount(rspaymentStaticsWithoutEstimateYearlyQuery.getString("ChequeAmount"));

			
			yearlyData.setYearlyOnlinePaymentStatics(rspaymentStaticsWithoutEstimateYearlyQuery.getString("Online"));
			yearlyData.setOnlinepayStaticsAmount(rspaymentStaticsWithoutEstimateYearlyQuery.getString("OnlineAmount"));
			
	
		//	yearlyList.add(yearlyData);
			
			}

			
			

			
			
			}else {
			

	

			String salesAmtWithEstimateDailyQuery = QueryConstants.SELECT_SALES_WITH_ESTIMATE_DAILY;
			PreparedStatement preparedStmtSalesWithEstimateDailyQuery = connection.prepareStatement(salesAmtWithEstimateDailyQuery);
			preparedStmtSalesWithEstimateDailyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesWithEstimateDailyQuery.setString(2, json.getDate());
			preparedStmtSalesWithEstimateDailyQuery.setString(3, json.getCompanyId());
			preparedStmtSalesWithEstimateDailyQuery.setString(4, json.getDate());
			ResultSet rsSalesWithEstimateDailyQuery = preparedStmtSalesWithEstimateDailyQuery.executeQuery();
			while(rsSalesWithEstimateDailyQuery.next()) {
			selectdashboard_Monthly_sale_Purchase_Expense.setDailySales(rsSalesWithEstimateDailyQuery.getString("TotalAmount"));
			dailyData.setDailySales(rsSalesWithEstimateDailyQuery.getString("TotalAmount"));
		//	dailyList.add(dailyData);
			}
		

		
			
			String salesAmtWithEstimateMonthlyQuery = QueryConstants.SELECT_SALES_WITH_ESTIMATE_MONTHLY;
			PreparedStatement preparedStmtSalesWithEstimateMonthlyQuery = connection.prepareStatement(salesAmtWithEstimateMonthlyQuery);
			preparedStmtSalesWithEstimateMonthlyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesWithEstimateMonthlyQuery.setString(2, json.getCurrent_Month());		
			preparedStmtSalesWithEstimateMonthlyQuery.setString(3, json.getCurrent_Year());	
			preparedStmtSalesWithEstimateMonthlyQuery.setString(4, json.getCompanyId());
			preparedStmtSalesWithEstimateMonthlyQuery.setString(5, json.getCurrent_Month());	
			preparedStmtSalesWithEstimateMonthlyQuery.setString(6,json.getCurrent_Year());	
			ResultSet rsSalesWithEstimateMonthlyQuery = preparedStmtSalesWithEstimateMonthlyQuery.executeQuery();
			while(rsSalesWithEstimateMonthlyQuery.next()) {
				selectdashboard_Monthly_sale_Purchase_Expense.setMonthlySales(rsSalesWithEstimateMonthlyQuery.getString("TotalAmount"));
			
				monthlyData.setMonthlySales(rsSalesWithEstimateMonthlyQuery.getString("TotalAmount"));
				//monthlyList.add(monthlyData);	
			
			}
			
	
			
			String salesAmtWithEstimateYearlyQuery = QueryConstants.SELECT_SALES_WITH_ESTIMATE_YEARLY;
			PreparedStatement preparedStmtSalesWithEstimateYearlyQuery = connection.prepareStatement(salesAmtWithEstimateYearlyQuery);
			preparedStmtSalesWithEstimateYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesWithEstimateYearlyQuery.setString(2, json.getCurrent_Year());
			preparedStmtSalesWithEstimateYearlyQuery.setString(3, json.getCompanyId());
			preparedStmtSalesWithEstimateYearlyQuery.setString(4, json.getCurrent_Year());
			ResultSet rsSalesWithEstimateYearlyQuery = preparedStmtSalesWithEstimateYearlyQuery.executeQuery();
			while(rsSalesWithEstimateYearlyQuery.next()) {
			selectdashboard_Monthly_sale_Purchase_Expense.setYearlySales(rsSalesWithEstimateYearlyQuery.getString("TotalAmount"));
			
			yearlyData.setYearlySales(rsSalesWithEstimateYearlyQuery.getString("TotalAmount"));
		//	yearlyList.add(yearlyData);	
			}
			
		
			
			
			//TOTAL SALES QUANTITY -- DAILY/MONTHLY/YEARLY
			String salesQtyWithEstimateDailyMonthlyYearlyQuery = QueryConstants.SELECT_TOTAL_SALES_QTY_WITH_ESTIMATE_DAILY_MONTHLY_YEARLY;
			PreparedStatement preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery = connection.prepareStatement(salesQtyWithEstimateDailyMonthlyYearlyQuery);
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(2, json.getDate());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(3, json.getCompanyId());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(4, json.getDate());
			
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(5, json.getCompanyId());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(6, json.getCurrent_Month());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(7, json.getCurrent_Year());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(8, json.getCompanyId());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(9, json.getCurrent_Month());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(10, json.getCurrent_Year());
			
			
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(11, json.getCompanyId());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(12, json.getCurrent_Year());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(13, json.getCompanyId());
			preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.setString(14, json.getCurrent_Year());
			
			
			ResultSet rsSalesQtyWithEstimateDailyMonthlyYearlyQuery = preparedStmtQtySalesWithEstimateDailyMonthlyYearlyQuery.executeQuery();
			while(rsSalesQtyWithEstimateDailyMonthlyYearlyQuery.next()) {
				
			dailyData.setQuantity(rsSalesQtyWithEstimateDailyMonthlyYearlyQuery.getString("DailyQty"));
			monthlyData.setQuantity(rsSalesQtyWithEstimateDailyMonthlyYearlyQuery.getString("MonthlyQty"));
			yearlyData.setQuantity(rsSalesQtyWithEstimateDailyMonthlyYearlyQuery.getString("YearlyQty"));
			//yearlyList.add(yearlyData);
			
			}
			
		
	/*		
	//TAX AMOUNT -- DAILY/MONTHLY/YEARLY
			
			String salesTaxWithEstimateDailyMonthlyYearlyQuery = QueryConstants.SELECT_TAX_WITH_ESTIMATE;
			PreparedStatement preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery = connection.prepareStatement(salesTaxWithEstimateDailyMonthlyYearlyQuery);
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(2, json.getDate());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(3, json.getCompanyId());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(4, json.getDate());
			
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(5, json.getCompanyId());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(6, json.getCurrent_Month());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(7, json.getCurrent_Year());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(8, json.getCompanyId());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(9, json.getCurrent_Month());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(10, json.getCurrent_Year());
			
			
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(11, json.getCompanyId());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(12, json.getCurrent_Year());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(13, json.getCompanyId());
			preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.setString(14, json.getCurrent_Year());
			
			
			ResultSet rsSalesTaxWithEstimateDailyMonthlyYearlyQuery = preparedStmtQtySalesTaxWithEstimateDailyMonthlyYearlyQuery.executeQuery();
			while(rsSalesTaxWithEstimateDailyMonthlyYearlyQuery.next()) {
				
			dailyData.setTaxAmount(rsSalesTaxWithEstimateDailyMonthlyYearlyQuery.getString("DailyTax"));
			monthlyData.setTaxAmount(rsSalesTaxWithEstimateDailyMonthlyYearlyQuery.getString("MonthlyTax"));
			yearlyData.setTaxAmount(rsSalesTaxWithEstimateDailyMonthlyYearlyQuery.getString("YearlyTax"));
			//yearlyList.add(yearlyData);
			
			}
			*/

//CODE FOR PAYEMENT STATICS
			
		
		
			
			String paymentStaticsWithEstimateDailyQuery = QueryConstants.SELECT_PAY_STAT_WITH_ESTIMATE_DAILY;
			PreparedStatement preparedStmtpaymentStaticsWithEstimateDailyQuery = connection.prepareStatement(paymentStaticsWithEstimateDailyQuery);
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(1, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(2, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(3, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(4, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(5, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(6, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(7, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(8, json.getDate());
			
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(9, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(10, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(11, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(12, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(13, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(14, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(15, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(16, json.getDate());
			
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(17, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(18, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(19, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(20, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(21, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(22, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(23, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(24, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(25, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(26, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(27, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(28, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(29, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(30, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(31, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(32, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(33, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(34, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(35, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(36, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(37, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(38, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(39, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(40, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(41, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(42, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(43, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(44, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(45, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(46, json.getDate());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(47, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateDailyQuery.setString(48, json.getDate());
		
			
			ResultSet rspaymentStaticsWithEstimateDailyQuery = preparedStmtpaymentStaticsWithEstimateDailyQuery.executeQuery();
			while(rspaymentStaticsWithEstimateDailyQuery.next()) {
				dailyData.setDailyCashPaymentStatics(rspaymentStaticsWithEstimateDailyQuery.getString("TotalCashCount"));
				dailyData.setCashpayStaticsAmount(rspaymentStaticsWithEstimateDailyQuery.getString("CashAmount"));

				
				dailyData.setDailyCardPaymentStatics(rspaymentStaticsWithEstimateDailyQuery.getString("TotalCardCount"));
				dailyData.setCardpayStaticsAmount(rspaymentStaticsWithEstimateDailyQuery.getString("CardAmount"));

				
				dailyData.setDailyChequePaymentStatics(rspaymentStaticsWithEstimateDailyQuery.getString("TotalChequeCount"));
				dailyData.setChequepayStaticsAmount(rspaymentStaticsWithEstimateDailyQuery.getString("ChequeAmount"));

				
				dailyData.setDailyOnlinePaymentStatics(rspaymentStaticsWithEstimateDailyQuery.getString("TotalOnlineCount"));
				dailyData.setOnlinepayStaticsAmount(rspaymentStaticsWithEstimateDailyQuery.getString("OnlineAmount"));

		//	dailyList.add(dailyData);
			}
			
				
		
			
			String paymentStaticsWithEstimateMonthlyQuery = QueryConstants.SELECT_PAY_STAT_WITH_ESTIMATE_MONTHLY;
			PreparedStatement preparedStmtpaymentStaticsWithEstimateMonthlyQuery = connection.prepareStatement(paymentStaticsWithEstimateMonthlyQuery);
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(1, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(2, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(3, json.getCurrent_Month());
			
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(4, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(5, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(6, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(7, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(8, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(9, json.getCurrent_Month());			
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(10, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(11, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(12, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(13, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(14, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(15, json.getCurrent_Month());			
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(16, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(17, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(18, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(19, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(20, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(21, json.getCurrent_Month());			
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(22, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(23, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(24, json.getCurrent_Month());	
			
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(25, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(26, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(27, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(28, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(29, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(30, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(31, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(32, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(33, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(34, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(35, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(36, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(37, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(38, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(39, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(40, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(41, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(42, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(43, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(44, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(45, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(46, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(47, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(48, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(49, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(50, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(51, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(52, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(53, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(54, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(55, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(56, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(57, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(58, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(59, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(60, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(61, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(62, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(63, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(64, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(65, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(66, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(67, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(68, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(69, json.getCurrent_Month());	
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(70, json.getCompanyId()); 
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(71, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateMonthlyQuery.setString(72, json.getCurrent_Month());	
			
	
		
			ResultSet rspaymentStaticsWithEstimateMonthlyQuery = preparedStmtpaymentStaticsWithEstimateMonthlyQuery.executeQuery();
			while(rspaymentStaticsWithEstimateMonthlyQuery.next()) {
					
				monthlyData.setMonthlyCashPaymentStatics(rspaymentStaticsWithEstimateMonthlyQuery.getString("TotalCashCount"));
				monthlyData.setCashpayStaticsAmount(rspaymentStaticsWithEstimateMonthlyQuery.getString("CashAmount"));

				
				monthlyData.setMonthlyCardPaymentStatics(rspaymentStaticsWithEstimateMonthlyQuery.getString("TotalCardCount"));
				monthlyData.setCardpayStaticsAmount(rspaymentStaticsWithEstimateMonthlyQuery.getString("CardAmount"));

				
				monthlyData.setMonthlyChequePaymentStatics(rspaymentStaticsWithEstimateMonthlyQuery.getString("TotalChequeCount"));
				monthlyData.setChequepayStaticsAmount(rspaymentStaticsWithEstimateMonthlyQuery.getString("ChequeAmount"));

				
				monthlyData.setMonthlyOnlinePaymentStatics(rspaymentStaticsWithEstimateMonthlyQuery.getString("TotalOnlineCount"));
				monthlyData.setOnlinepayStaticsAmount(rspaymentStaticsWithEstimateMonthlyQuery.getString("OnlineAmount"));
				

				
			//	monthlyList.add(monthlyData);
			
			}
			
			
				
		
			
			String paymentStaticsWithEstimateYearlyQuery = QueryConstants.SELECT_PAY_STAT_WITH_ESTIMATE_YEARLY;
			PreparedStatement preparedStmtpaymentStaticsWithEstimateYearlyQuery = connection.prepareStatement(paymentStaticsWithEstimateYearlyQuery);
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(2, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(3, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(4, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(5, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(6, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(7, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(8, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(9, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(10, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(11, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(12, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(13, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(14, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(15, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(16, json.getCurrent_Year());
			
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(17, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(18, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(19, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(20, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(21, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(22, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(23, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(24, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(25, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(26, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(27, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(28, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(29, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(30, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(31, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(32, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(33, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(34, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(35, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(36, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(37, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(38, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(39, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(40, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(41, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(42, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(43, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(44, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(45, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(46, json.getCurrent_Year());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(47, json.getCompanyId());
			preparedStmtpaymentStaticsWithEstimateYearlyQuery.setString(48, json.getCurrent_Year());


			ResultSet rspaymentStaticsWithEstimateYearlyQuery = preparedStmtpaymentStaticsWithEstimateYearlyQuery.executeQuery();
			while(rspaymentStaticsWithEstimateYearlyQuery.next()) {
	
			yearlyData.setYearlyCashPaymentStatics(rspaymentStaticsWithEstimateYearlyQuery.getString("TotalCashCount"));
			yearlyData.setCashpayStaticsAmount(rspaymentStaticsWithEstimateYearlyQuery.getString("CashAmount"));

			
			yearlyData.setYearlyCardPaymentStatics(rspaymentStaticsWithEstimateYearlyQuery.getString("TotalCardCount"));
			yearlyData.setCardpayStaticsAmount(rspaymentStaticsWithEstimateYearlyQuery.getString("CardAmount"));

			
			yearlyData.setYearlyChequePaymentStatics(rspaymentStaticsWithEstimateYearlyQuery.getString("TotalChequeCount"));
			yearlyData.setChequepayStaticsAmount(rspaymentStaticsWithEstimateYearlyQuery.getString("ChequeAmount"));

			
			yearlyData.setYearlyOnlinePaymentStatics(rspaymentStaticsWithEstimateYearlyQuery.getString("TotalOnlineCount"));
			yearlyData.setOnlinepayStaticsAmount(rspaymentStaticsWithEstimateYearlyQuery.getString("OnlineAmount"));
			

			
		//	yearlyList.add(yearlyData);
			
			}
			
			
			}
			
			
			
			ArrayList <dashboardDisplayJSON> dailyInvoiceList=new ArrayList <dashboardDisplayJSON>();
			List<String> invList =  new ArrayList<String>();
			
			String querySelect23=QueryConstants.SELECT_GST_INV;
			PreparedStatement preparedStmt23=connection.prepareStatement(querySelect23);
			//preparedStmt.setString(1,json.getDate());
			preparedStmt23.setString(1,json.getCompanyId());
			ResultSet rs23=preparedStmt23.executeQuery();
			while(rs23.next()) {
				invList.add(rs23.getString("invoiceNo"));
				
			}
		
	
			
			for(int i=0;i<(invList.size()-1);i++) {
			//for(int i=(invList.size()-1);i>=0;i--) {
			String daily_report_limtby_10 = QueryConstants.SELECT_DAILY_SALES_INV1;
			PreparedStatement preparedStmt15=connection.prepareStatement(daily_report_limtby_10);
			preparedStmt15.setString(1, json.getCompanyId());
		    preparedStmt15.setString(2,invList.get(i));
			ResultSet rs15=preparedStmt15.executeQuery();
			while(rs15.next()) {
				dashboardDisplayJSON dailySales= new dashboardDisplayJSON();
				dailySales.setInvoiceNo(rs15.getString("invoiceNo"));
				dailySales.setDate(rs15.getString("Date"));
				dailySales.setUserName(rs15.getString("customerName"));
				dailySales.setContact(rs15.getString("contactNo"));
				dailySales.setStatus(rs15.getString("Payment_status"));
				dailySales.setSubTotal(rs15.getString("subtotal1"));
				dailyInvoiceList.add(dailySales); 
				
				
				
			}
			}
			
			
			
			//TAX AMOUNT -- DAILY/MONTHLY/YEARLY
			
//TAX AMOUNT -- DAILY
			
			float dailytax=0;
			
			String salesTaxDailyQuery = QueryConstants.SELECT_TAX_WITHOUT_ESTIMATE_DAILY;
			PreparedStatement preparedStmtSalesTaxDailyQuery = connection.prepareStatement(salesTaxDailyQuery);
			preparedStmtSalesTaxDailyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesTaxDailyQuery.setString(2, json.getDate());
			ResultSet rsSalesTaxDailyQuery = preparedStmtSalesTaxDailyQuery.executeQuery();
			while(rsSalesTaxDailyQuery.next()) {
			
				float damount=Float.parseFloat(rsSalesTaxDailyQuery.getString("DailyTax"));
				dailytax=dailytax+damount;
				
			}
			dailyData.setTaxAmount(String.valueOf(dailytax));
	
			//TAX AMOUNT -- MONTHLY
			
			float monthlytax=0;
			String salesTaxMonthlyQuery = QueryConstants.SELECT_TAX_WITHOUT_ESTIMATE_MONTHLY;
			PreparedStatement preparedStmtalesTaxMonthlyQuery = connection.prepareStatement(salesTaxMonthlyQuery);
			preparedStmtalesTaxMonthlyQuery.setString(1, json.getCompanyId());
			preparedStmtalesTaxMonthlyQuery.setString(2, json.getCurrent_Month());
			preparedStmtalesTaxMonthlyQuery.setString(3, json.getCurrent_Year());
			ResultSet rsSalesTaxMonthlyQuery = preparedStmtalesTaxMonthlyQuery.executeQuery();
			while(rsSalesTaxMonthlyQuery.next()) {
				
				float mamount=Float.parseFloat(rsSalesTaxMonthlyQuery.getString("MonthlyTax"));
				monthlytax=monthlytax+mamount;
			
			}
			monthlyData.setTaxAmount(String.valueOf(monthlytax));
			
			//TAX AMOUNT -- YEARLY
			
			float yearlytax=0;
			String salesTaxYearlyQuery = QueryConstants.SELECT_TAX_WITHOUT_ESTIMATE_YEARLY;
			PreparedStatement preparedStmtSalesTaxYearlyQuery = connection.prepareStatement(salesTaxYearlyQuery);
			preparedStmtSalesTaxYearlyQuery.setString(1, json.getCompanyId());
			preparedStmtSalesTaxYearlyQuery.setString(2, json.getCurrent_Year());
			ResultSet rsSalesTaxYearlyQuery = preparedStmtSalesTaxYearlyQuery.executeQuery();
			while(rsSalesTaxYearlyQuery.next()) {
				
				float yamount=Float.parseFloat(rsSalesTaxYearlyQuery.getString("YearlyTax"));
				yearlytax=yearlytax+yamount;
			}
			yearlyData.setTaxAmount(String.valueOf(yearlytax));
			
			
			dailyList.add(dailyData);
			monthlyList.add(monthlyData);
			yearlyList.add(yearlyData);
			

			selectdashboard_Monthly_sale_Purchase_Expense.setDailyInvoiceList(dailyInvoiceList);
			selectdashboard_Monthly_sale_Purchase_Expense.setDailyList(dailyList);
			selectdashboard_Monthly_sale_Purchase_Expense.setMonthlyList(monthlyList);
			selectdashboard_Monthly_sale_Purchase_Expense.setYearlyList(yearlyList);
	
				connection.close();
			
		} catch (SQLException e) {
			e.printStackTrace();
		}

		finally {
			DatabaseUtil.closeConnection(connection);
		}

		return selectdashboard_Monthly_sale_Purchase_Expense;

	}

	

}
