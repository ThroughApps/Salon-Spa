package ReportsPaging;

import java.text.ParseException;

import java.util.ArrayList;
import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/EmployeeReportPaging")
public class ReportsPagingWebservice {

	
	
	
		 /*
	     * API FOR CURRENT EMPLOYEE SHIFT REPORT
	     */
	    
	    @POST
	    @Produces(value="application/json" )
	    @Path(value="/EmployeeShiftWiseReport")
	    @Consumes(value="application/json")
	    public Response shiftwiseReport(ReportsPagingJSON details) throws ParseException {
	    System.out.println("GENERATING EMPLOYEE SHIFT WISE REPORT \n");
	    ReportsPagingJSON shiftRetrievelist = new ReportsPagingJSON();
	    shiftRetrievelist=ReportsPagingLogic.shiftwiseReport(details);
	    System.out.println("COMPLETED GENERATING EMPLOYEE SHIFT WISE REPORT \n");
	     	return Response.status(200).entity(shiftRetrievelist).build();
	    }
	    
	    /*
		  * API FOR GENERATING DATE WISE SHIFT HISTORY REPORT
		  */
			
			@POST
			@Path(value="/DateWiseShiftHistoryReport")
			@Consumes(value= {"application/json"})
			@Produces(value={"application/json"})
			public Response DateWiseShiftHistoryReport(ReportsPagingJSON json)throws ParseException
			{  
				
				System.out.println("GENERATING EMPLOYEE DATE WISE SHIFT HISTORY REPORT \n");
				ReportsPagingJSON shiftList=new  ReportsPagingJSON();
				shiftList=ReportsPagingLogic.DateWiseShiftHistoryReport(json);
			  	System.out.println("GENERATING EMPLOYEE DATE WISE SHIFT HISTORY REPORT COMPLETED \n ");
			   	return Response.status(200).entity(shiftList).build();
				 
				}
	    
	    
			  /*
			  * API FOR GENERATING PERIOD WISE SHIFT HISTORY REPORT
			  */
				
				@POST
				@Path(value="/PeriodWiseShiftHistoryReport")
				@Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
				public Response PeriodWiseShiftHistoryReport(ReportsPagingJSON json)throws ParseException
				{  
					
					System.out.println("GENERATING EMPLOYEE PERIOD WISE SHIFT HISTORY REPORT \n");
					ReportsPagingJSON shiftList=new  ReportsPagingJSON();
					shiftList=ReportsPagingLogic.PeriodWiseShiftHistoryReport(json);
				  	System.out.println("GENERATING EMPLOYEE PERIOD WISE SHIFT HISTORY REPORT COMPLETED \n ");
				   	return Response.status(200).entity(shiftList).build();
					 
					}
				
				
				
				
				
		 /*
		  * API FOR GENERATING SHIFT REPORT
		  */
			
			@POST
			@Path(value="/MonthlyShiftHistoryReport")
			@Consumes(value= {"application/json"})
			@Produces(value={"application/json"})
			public Response MonthlyShiftHistoryReport(ReportsPagingJSON json)throws ParseException
			{  
				
				System.out.println("GENERATING EMPLOYEE MONTHLY SHIFT HISTORY REPORT \n");
				ReportsPagingJSON shiftList=new  ReportsPagingJSON();
				shiftList=ReportsPagingLogic.MonthlyShiftHistoryReport(json);
			  	System.out.println("GENERATING EMPLOYEE MONTHLY SHIFT HISTORY REPORT COMPLETED \n ");
			   	return Response.status(200).entity(shiftList).build();
				 
				}
	
	
			 /*
		     * API FOR GETTING TOTAL NO OF SHIFTS
		     */
		   
			@POST
			@Produces(value = "application/json")
			@Path(value = "/selectTotalNoShift")
			@Consumes(value = "application/json")

			public Response selectTotalNoShift(ReportsPagingJSON config) throws ParseException {
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				List<ReportsPagingJSON> totalShift = new ArrayList<ReportsPagingJSON>();
				totalShift = ReportsPagingLogic.SelectTotalNoOfShift(config);
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				return Response.status(200).entity(totalShift).build();
			}
		    
			
			 
		 
			  /*
			  * API FOR GENERATING PERIOD WISE SHIFT HISTORY REPORT
			  */
				
				@POST
				@Path(value="/vacancyReport")
				@Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
				public Response vacancyReport(ReportsPagingJSON json)throws ParseException
				{  
					
					System.out.println("GENERATING EMPLOYEE PERIOD WISE SHIFT HISTORY REPORT \n");
					ReportsPagingJSON shiftList=new  ReportsPagingJSON();
					shiftList=ReportsPagingLogic.VacancyReport(json);
				  	System.out.println("GENERATING EMPLOYEE PERIOD WISE SHIFT HISTORY REPORT COMPLETED \n ");
				   	return Response.status(200).entity(shiftList).build();
					 
					}
		   
			@POST
			@Produces(value = "application/json")
			@Path(value = "/expiredShiftReport")
			@Consumes(value = "application/json")

			public Response expiredShiftReport(ReportsPagingJSON config) throws ParseException {
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				ReportsPagingJSON totalShift = new ReportsPagingJSON();
				totalShift = ReportsPagingLogic.expiredShiftReport(config);
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				return Response.status(200).entity(totalShift).build();
			}
		    
			@POST
			@Produces(value = "application/json")
			@Path(value = "/deletedShiftReport")
			@Consumes(value = "application/json")

			public Response deletedShiftReport(ReportsPagingJSON config) throws ParseException {
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				ReportsPagingJSON totalShift = new ReportsPagingJSON();
				totalShift = ReportsPagingLogic.deletedShiftReport(config);
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				return Response.status(200).entity(totalShift).build();
			}
		    
			
			 /*
		     * API FOR GETTING TOTAL NO OF SHIFTS
		     */
		   
			@POST
			@Produces(value = "application/json")
			@Path(value = "/selectSupervisorDetails")
			@Consumes(value = "application/json")

			public Response selectSupervisorDetails(ReportsPagingJSON config) throws ParseException {
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				List<ReportsPagingJSON> totalShift = new ArrayList<ReportsPagingJSON>();
				totalShift = ReportsPagingLogic.selectSupervisorDetails(config);
				System.out.println("GETTING ALL SHIFTS OPTED \n");
				return Response.status(200).entity(totalShift).build();
			}
		    
			
			  /*
			  * API FOR GENERATING Supervisor REPORT
			  */
				
				@POST
				@Path(value="/supervisorbasedReport")
				@Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
				public Response supervisorbasedReport(ReportsPagingJSON json)throws ParseException
				{  
					
					System.out.println("GENERATING EMPLOYEE supervisorbasedReport \n");
					ReportsPagingJSON shiftList=new  ReportsPagingJSON();
					shiftList=ReportsPagingLogic.supervisorbasedReport(json);
				  	System.out.println("GENERATING EMPLOYEE supervisorbasedReport COMPLETED \n ");
				   	return Response.status(200).entity(shiftList).build();
					 
					}
				
				@POST
				@Produces(value = "application/json")
				@Path(value = "/ScheduledShiftReport")
				@Consumes(value = "application/json")

				public Response ScheduledShiftReport(ReportsPagingJSON config) throws ParseException {
					System.out.println("GETTING ALL ScheduledShiftReport \n");
					ReportsPagingJSON totalShift = new ReportsPagingJSON();
					totalShift = ReportsPagingLogic.ScheduledShiftReport(config);
					System.out.println("GETTING ALL ScheduledShiftReport completed \n");
					return Response.status(200).entity(totalShift).build();
				}
			    
			
			
		    
	
}
