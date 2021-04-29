package profitloss;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;



import DBUtil.DatabaseUtil;
import dashboarddisplay.QueryConstants;


public class ProfitLossLogic {

	/*
	 * FUNCTION FOR WITH ESTIMATE QUERY
	 */
	public static ProfitLossJOSN WithEstimateFunc(ProfitLossJOSN json) {
		Connection connection=null;
		ProfitLossJOSN profitlossData=new ProfitLossJOSN();
		try {
			connection=DatabaseUtil.getDBConnection();
			

		
				String querySelect=ProfitLossQueryConstants.DAILY_PROFIT_LOSS_REPORT_WITH_ESTIMATE;
				PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getCompanyId());
				preparedStmt.setString(2,json.getDate());
				preparedStmt.setString(3,json.getCompanyId());
				preparedStmt.setString(4,json.getDate());
				preparedStmt.setString(5,json.getCompanyId());
				preparedStmt.setString(6,json.getDate());
				preparedStmt.setString(7,json.getCompanyId());
				preparedStmt.setString(8,json.getDate());
				preparedStmt.setString(9,json.getCompanyId());
				preparedStmt.setString(10,json.getDate());
				ResultSet rs=preparedStmt.executeQuery();
				while(rs.next()) {
					profitlossData.setTotalSales(rs.getString("SalesAmount"));
					profitlossData.setTotalEstimate(rs.getString("EstimateAmount"));
					profitlossData.setTotalPurchase(rs.getString("PurchaseAmount"));
					profitlossData.setTotalExpense(rs.getString("ExpenseAmount"));  
					profitlossData.setTotalGST(rs.getString("TotalGSTAmount"));
					profitlossData.setDate(json.getDate());
					profitlossData.setConfigValue(json.getConfigValue());

				}
				connection.close();
		
		}
			catch (Exception e) {
				e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		
		return profitlossData;

	}
	
	/*
	 * FUNCTION FOR  WITHOUT ESTIMATE QUERY
	 */
	public static ProfitLossJOSN WithoutEstimateFunc(ProfitLossJOSN json) {
		Connection connection=null;
		ProfitLossJOSN profitlossData=new ProfitLossJOSN();
		try {
			connection=DatabaseUtil.getDBConnection();
			
	
			
				
				String querySelect=ProfitLossQueryConstants.DAILY_PROFIT_LOSS_REPORT_WITHOUT_ESTIMATE;
				PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
				preparedStmt.setString(1,json.getCompanyId());
				preparedStmt.setString(2,json.getDate());
				preparedStmt.setString(3,json.getCompanyId());
				preparedStmt.setString(4,json.getDate());
				preparedStmt.setString(5,json.getCompanyId());
				preparedStmt.setString(6,json.getDate());
				preparedStmt.setString(7,json.getCompanyId());
				preparedStmt.setString(8,json.getDate());
				ResultSet rs=preparedStmt.executeQuery();
				while(rs.next()) {
					profitlossData.setTotalSales(rs.getString("SalesAmount"));
					profitlossData.setTotalPurchase(rs.getString("PurchaseAmount"));
					profitlossData.setTotalExpense(rs.getString("ExpenseAmount"));
					profitlossData.setTotalGST(rs.getString("TotalGSTAmount"));
					profitlossData.setDate(json.getDate());
					profitlossData.setConfigValue(json.getConfigValue());

				}
			
				connection.close();
		}
			catch (Exception e) {
				e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		
		return profitlossData;
	}
	
	
	/*
	 * FUNCTION FOR GENERATING DAILY PROFIT LOSS REPORT
	 */
	public static ProfitLossJOSN DailyReport(ProfitLossJOSN json) {
		Connection connection=null;
		ProfitLossJOSN profitlossData=new ProfitLossJOSN();
		try {
			connection=DatabaseUtil.getDBConnection();
			
	
			
			String configValue = null;
			String configQuery = QueryConstants.SELECT_CONFIG_OPTION;
			PreparedStatement preparedStmtConfigQuery = connection.prepareStatement(configQuery);
			preparedStmtConfigQuery.setString(1, json.getCompanyId());
			ResultSet rsConfigQuery = preparedStmtConfigQuery.executeQuery();

			while (rsConfigQuery.next()) {

				configValue=rsConfigQuery.getString("configValue");
				json.setConfigValue(configValue);
			}
			
			if(configValue.equals("0")) {
				
				
				profitlossData=WithoutEstimateFunc(json);
				
			}else {
				
		
				profitlossData=WithEstimateFunc(json);
				
				
				
				
			}
			connection.close();
		}
			catch (Exception e) {
				e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		
		return profitlossData;
	}

	/*
	 * FUNCTION FOR GENERATING WEEKLY PROFIT LOSS REPORT
	 */
	public static ArrayList<ProfitLossJOSN> WeeklyReport(ProfitLossJOSN json) {
		Connection connection=null;
		

		DateFormat formatter;
		List<Date> dates = new ArrayList<Date>();
		ArrayList<ProfitLossJOSN> profitlossReportList = new ArrayList<ProfitLossJOSN>();
		ProfitLossJOSN profitlossData=new ProfitLossJOSN();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String configValue = null;
			String configQuery = QueryConstants.SELECT_CONFIG_OPTION;
			PreparedStatement preparedStmtConfigQuery = connection.prepareStatement(configQuery);
			preparedStmtConfigQuery.setString(1, json.getCompanyId());
			ResultSet rsConfigQuery = preparedStmtConfigQuery.executeQuery();

			while (rsConfigQuery.next()) {

				configValue=rsConfigQuery.getString("configValue");
				profitlossData.setConfigValue(configValue);
			}
			
			formatter = new SimpleDateFormat("yyyy-MM-dd");
			Date startDate = (Date) formatter.parse(json.getFromDate());
			Date endDate = (Date) formatter.parse(json.getToDate());
			long interval = 24 * 1000 * 60 * 60; // 1 hour in millis
			long endTime = endDate.getTime(); // create your endtime here,
												// possibly using Calendar
												// or Date
			long curTime = startDate.getTime();
			while (curTime <= endTime) {
				dates.add(new Date(curTime));
				curTime += interval;
			}
			
			if(configValue.equals("0")) {
			
				
				for (int i = 0; i < dates.size(); i++) {
					Date lDate = (Date) dates.get(i);
					String date = formatter.format(lDate);
					
					json.setDate(date);
					
					ProfitLossJOSN profitlossReportData=new ProfitLossJOSN();
					profitlossReportData=WithoutEstimateFunc(json);
					profitlossReportList.add(profitlossReportData);
					
					
				}
			
			}else {
			
				for (int i = 0; i < dates.size(); i++) {
					Date lDate = (Date) dates.get(i);
					String date = formatter.format(lDate);
					
					json.setDate(date);
					
					ProfitLossJOSN profitlossReportData=new ProfitLossJOSN();
					profitlossReportData=WithEstimateFunc(json);
					profitlossReportList.add(profitlossReportData);
					
					
				}
				
				
			}
			profitlossReportList.add(profitlossData);
			connection.close();
		}
			catch (Exception e) {
				e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		
		return profitlossReportList;

	}
	
	
	/*
	 * FUNCTION FOR GENERATING YEARLY REPORT
	 */

	public static ArrayList<ProfitLossJOSN> YearlyReport(ProfitLossJOSN json) {
	Connection connection=null;
		

		List<String> monthsList =  Arrays.asList(json.getMonths().split(","));
		ArrayList<ProfitLossJOSN> profitlossReportList = new ArrayList<ProfitLossJOSN>();
		ProfitLossJOSN profitlossData=new ProfitLossJOSN();
		
		try {
			connection=DatabaseUtil.getDBConnection();
			
			String configValue = null;
			String configQuery = QueryConstants.SELECT_CONFIG_OPTION;
			PreparedStatement preparedStmtConfigQuery = connection.prepareStatement(configQuery);
			preparedStmtConfigQuery.setString(1, json.getCompanyId());
			ResultSet rsConfigQuery = preparedStmtConfigQuery.executeQuery();

			while (rsConfigQuery.next()) {

				configValue=rsConfigQuery.getString("configValue");
				profitlossData.setConfigValue(configValue);
			}
			

			if(configValue.equals("0")) {
				
				
				
				for(int i=0;i<monthsList.size();i++) {
					
					
					String querySelect=ProfitLossQueryConstants.YEARLY_PROFIT_LOSS_REPORT_WITHOUT_ESTIMATE;
					PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
					preparedStmt.setString(1,json.getCompanyId());
					preparedStmt.setString(2,monthsList.get(i));
					preparedStmt.setString(3,json.getYear());
					preparedStmt.setString(4,json.getCompanyId());
					preparedStmt.setString(5,monthsList.get(i));
					preparedStmt.setString(6,json.getYear());
					preparedStmt.setString(7,json.getCompanyId());
					preparedStmt.setString(8,monthsList.get(i));
					preparedStmt.setString(9,json.getYear());
					preparedStmt.setString(10,json.getCompanyId());
					preparedStmt.setString(11,monthsList.get(i));
					preparedStmt.setString(12,json.getYear());
					
					ResultSet rs=preparedStmt.executeQuery();
					while(rs.next()) {
						ProfitLossJOSN profitlossReportData=new ProfitLossJOSN();
						profitlossReportData.setTotalSales(rs.getString("SalesAmount"));
						profitlossReportData.setTotalPurchase(rs.getString("PurchaseAmount"));
						profitlossReportData.setTotalExpense(rs.getString("ExpenseAmount"));
						profitlossReportData.setTotalGST(rs.getString("TotalGSTAmount"));
						profitlossReportData.setMonth(monthsList.get(i));
						profitlossReportList.add(profitlossReportData);

					}
					
					
				}
								
			}else {
				
		
					for(int i=0;i<monthsList.size();i++) {
					
						String querySelect=ProfitLossQueryConstants.YEARLY_PROFIT_LOSS_REPORT_WITH_ESTIMATE;
						PreparedStatement preparedStmt=connection.prepareStatement(querySelect);
						preparedStmt.setString(1,json.getCompanyId());
						preparedStmt.setString(2,monthsList.get(i));
						preparedStmt.setString(3,json.getYear());
						preparedStmt.setString(4,json.getCompanyId());
						preparedStmt.setString(5,monthsList.get(i));
						preparedStmt.setString(6,json.getYear());
						preparedStmt.setString(7,json.getCompanyId());
						preparedStmt.setString(8,monthsList.get(i));
						preparedStmt.setString(9,json.getYear());
						preparedStmt.setString(10,json.getCompanyId());
						preparedStmt.setString(11,monthsList.get(i));
						preparedStmt.setString(12,json.getYear());
						preparedStmt.setString(13,json.getCompanyId());
						preparedStmt.setString(14,monthsList.get(i));
						preparedStmt.setString(15,json.getYear());
						ResultSet rs=preparedStmt.executeQuery();
						while(rs.next()) {
							ProfitLossJOSN profitlossReportData=new ProfitLossJOSN();
							profitlossReportData.setTotalSales(rs.getString("SalesAmount"));
							profitlossReportData.setTotalEstimate(rs.getString("EstimateAmount"));
							profitlossReportData.setTotalPurchase(rs.getString("PurchaseAmount"));
							profitlossReportData.setTotalExpense(rs.getString("ExpenseAmount"));
							profitlossReportData.setTotalGST(rs.getString("TotalGSTAmount"));
							
							
							profitlossReportData.setMonth(monthsList.get(i));
							profitlossReportList.add(profitlossReportData);

						}
					
					
				}
				
			}
			profitlossReportList.add(profitlossData);
			connection.close();
		}
			catch (Exception e) {
				e.printStackTrace();
		} finally {
			DatabaseUtil.closeConnection(connection);
		}
		
		
		return profitlossReportList;
	}

}
