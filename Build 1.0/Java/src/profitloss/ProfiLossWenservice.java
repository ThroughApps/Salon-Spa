package profitloss;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path(value="/ProfitLossReport")
public class ProfiLossWenservice {

	
	/*
	 * API FOR GETTING DAILY PROFIT AND LOSS
	 */
	
		@POST
		@Path("/Daily")
		@Consumes(value= {"application/json"})
		@Produces(value={"application/json"})
	public Response DailyReport(ProfitLossJOSN json) {
		
		ProfitLossJOSN profitlossData = new ProfitLossJOSN();
		 profitlossData=ProfitLossLogic.DailyReport(json);
		
		return Response.status(200).entity(profitlossData).build();
		
	}
		
		
		/*
		 * API FOR GETTING WEEKLY AND MONTHLY PROFIT AND LOSS
		 */
		
			@POST
			@Path("/Weekly")
			@Consumes(value= {"application/json"})
			@Produces(value={"application/json"})
		public Response WeeklyReport(ProfitLossJOSN json) {
			
			ArrayList<ProfitLossJOSN> profitlossReportList = new ArrayList<ProfitLossJOSN>();
			profitlossReportList=ProfitLossLogic.WeeklyReport(json);
			
		  
			return Response.status(200).entity(profitlossReportList).build();
			
		}
			
			/*
			 * API FOR GETTING YEARLY PROFIT AND LOSS
			 */
			
				@POST
				@Path("/Yearly")
				@Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
			public Response YearlyReport(ProfitLossJOSN json) {
				
				ArrayList<ProfitLossJOSN> profitlossReportList = new ArrayList<ProfitLossJOSN>();
				profitlossReportList=ProfitLossLogic.YearlyReport(json);
				
			   
				return Response.status(200).entity(profitlossReportList).build();
				
			}
}
