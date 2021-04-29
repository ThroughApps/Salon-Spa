package report.expense;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/ExpenseReport")
public class ExpenseReportWebservice {

	
	/*
	 * API CALL FOR DAILY EXPENSE REPORT
	 */
	@POST
	@Path("/DailyExpenseReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyExpenseReport(ExpenseReportJSON json)
	     {
	
		
		ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
		dailyExpenseList =ExpenseReportLogic.DailyReport(json);
		
	
		return Response.status(200).entity(dailyExpenseList).build();
		
	
	     }  
	
	     
	     /*
	 	 * API CALL FOR DAILY EXPENSE REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/DailyExpenseReportDelete")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response DailyExpenseReportDelete(ExpenseReportJSON json)
	 	     {
	 		
	 		
	 		ExpenseReportJSON dailyExpenseList=new ExpenseReportJSON();
	 		dailyExpenseList =ExpenseReportLogic.DailyReportDelete(json);
	 		
	 		
	 		return Response.status(200).entity(dailyExpenseList).build();
	 		
	 	
	 	     } 
	
	 	    /*
	 	 	 * API CALL FOR DAILY EXPENSE REPORT UPDATE
	 	 	 */
	 	 	@POST
	 	 	@Path("/DailyExpenseReportUpdate")
	 	 	@Consumes(value= {"application/json"})
	 	 	@Produces(value={"application/json"})
	 	 	public Response DailyExpenseReportUpdate(ExpenseReportJSON json)
	 	 	     {
	 	 		
	 	 		
	 	 		ExpenseReportJSON dailyExpenseList=new ExpenseReportJSON();
	 	 		dailyExpenseList =ExpenseReportLogic.DailyReportUpdate(json);
	 	 		
	 	 		
	 	 		return Response.status(200).entity(dailyExpenseList).build();
	 	 		
	 	 	
	 	 	     }  
	
	
	 	 		/*
	 	 		 * API CALL FOR MONTHLY EXPENSE REPORT
	 	 		 */
	 	 		@POST
	 	 		@Path("/MonthlyExpenseReport")
	 	 		@Consumes(value= {"application/json"})
	 	 		@Produces(value={"application/json"})
	 	 		public Response MonthlyExpenseReport(ExpenseReportJSON json)
	 	 		     {
	 	 			
	 	 			
	 	 			ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 			ArrayList <ExpenseReportJSON> summaryExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 			dailyExpenseList =ExpenseReportLogic.MonthlyReport(json);
	 	 			summaryExpenseList=ExpenseReportLogic.MonthlySummaryReport(json);
	 	 			ExpenseReportJSON reportandcount=new ExpenseReportJSON();
	 	 			reportandcount.setDailyExpenseList(dailyExpenseList);
	 	 			reportandcount.setSummaryExpenseList(summaryExpenseList);
	 	
	 	 			return Response.status(200).entity(reportandcount).build();
	 	 			
	 	 		
	 	 		     }   
	 	 	     
	 	 		   /*
	 	 	 		 * API CALL FOR YEARLY EXPENSE REPORT
	 	 	 		 */
	 	 	 		@POST
	 	 	 		@Path("/YearlyExpenseReport")
	 	 	 		@Consumes(value= {"application/json"})
	 	 	 		@Produces(value={"application/json"})
	 	 	 		public Response YearlyExpenseReport(ExpenseReportJSON json)
	 	 	 		     {
	 	 	 		
	 	 	 			
	 	 	 			ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 	 			dailyExpenseList =ExpenseReportLogic.YearlyReport(json);
	 	 	 			
	 	 	 			
	 	 	 			return Response.status(200).entity(dailyExpenseList).build();
	 	 	 			
	 	 	 		
	 	 	 		     }   
	 	 	     
	 	 	 		  /*
	 	 	 	 		 * API CALL FOR DATE WISE EXPENSE REPORT
	 	 	 	 		 */
	 	 	 	 		@POST
	 	 	 	 		@Path("/DateWiseExpenseReport")
	 	 	 	 		@Consumes(value= {"application/json"})
	 	 	 	 		@Produces(value={"application/json"})
	 	 	 	 		public Response DateWiseExpenseReport(ExpenseReportJSON json)
	 	 	 	 		     {
	 	 	 	 		
	 	 	 	 			
	 	 	 	 			ArrayList <ExpenseReportJSON> dailyExpenseList=new ArrayList <ExpenseReportJSON>();
	 	 	 	 			dailyExpenseList =ExpenseReportLogic.DateWiseReport(json);
	 	 	 	 			
	 	 	 	 		
	 	 	 	 			return Response.status(200).entity(dailyExpenseList).build();
	 	 	 	 			
	 	 	 	 		
	 	 	 	 		     } 
	
}