package report.estimate;

import java.text.ParseException;



import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;






@Path(value="/EstimateReport")
public class EstimateReportWebservice {


	/*
	 * API CALL FOR DAILY SALES REPORT
	 */
	@POST
	@Path("/DailyEstimateReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyEstimateReport(EstimateReportJSON json)
	     {
		
		
		ArrayList <EstimateReportJSON> dailyEstimateList=new ArrayList <EstimateReportJSON>();
		dailyEstimateList =EstimateReportLogic.DailyReport(json);

		return Response.status(200).entity(dailyEstimateList).build();
		
	
	     }  
	     
	     

	   		/*
		 	 * API CALL FOR ESTIMATE  REPORT DELETE
		 	 */
		 	@POST
		 	@Path("/DailyEstimateReportDelete")
		 	@Consumes(value= {"application/json"})
		 	@Produces(value={"application/json"})
		 	public Response DailyEstimateReportDelete(EstimateReportJSON json)
		 	     {
		
		 		
		 		EstimateReportJSON dailyEstimateList=new EstimateReportJSON();
		 		dailyEstimateList =EstimateReportLogic.DailyReportDelete(json);
		 		
		 	
		 		return Response.status(200).entity(dailyEstimateList).build();
		 		
		 	
		 	     }   
	     
		 	    /*
				 	 * API CALL FOR MONTHLY ESTIMATE  REPORT DELETE
				 	 */
				 	@POST
				 	@Path("/MonthlyEstimateReport")
				 	@Consumes(value= {"application/json"})
				 	@Produces(value={"application/json"})
				 	public Response MonthlyEstimateReport(EstimateReportJSON json)
				 	     {
				 		
				 		
				 		ArrayList <EstimateReportJSON> monthlyEstimateList=new ArrayList <EstimateReportJSON>();
				 		monthlyEstimateList =EstimateReportLogic.MonthlyReport(json);
				 		
				 		return Response.status(200).entity(monthlyEstimateList).build();
				 		
				 	
				 	     }   
	     
				 	    	/*
						 	 * API CALL FOR YEARLY ESTIMATE  REPORT DELETE
						 	 */
						 	@POST
						 	@Path("/YearlyEstimateReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response YearlyEstimateReport(EstimateReportJSON json)
						 	     {
						 	
						 		
						 		ArrayList <EstimateReportJSON> yearlyEstimateList=new ArrayList <EstimateReportJSON>();
						 		yearlyEstimateList =EstimateReportLogic.YearlyReport(json);
						 		
						 		return Response.status(200).entity(yearlyEstimateList).build();
						 		
						 	
						 	     }  
						 	     
						 			/*
								 	 * API CALL FOR DATE WISE ESTIMATE  REPORT DELETE
								 	 */
								 	@POST
								 	@Path("/DateWiseEstimateReport")
								 	@Consumes(value= {"application/json"})
								 	@Produces(value={"application/json"})
								 	public Response DateWiseEstimateReport(EstimateReportJSON json)
								 	     {
								 		
								 		
								 		ArrayList <EstimateReportJSON> dateWiseEstimateList=new ArrayList <EstimateReportJSON>();
								 		dateWiseEstimateList =EstimateReportLogic.DateWiseReport(json);
								 	
								 		return Response.status(200).entity(dateWiseEstimateList).build();
								 		
								 	
								 	     } 	     
						 	     
	     
									/*
									 * API CALL FOR DAILY SALES REPORT DATA
									*/
								    @POST
									@Path("/DailyEstimateReportData")
								    @Consumes(value= {"application/json"})
									@Produces(value={"application/json"})
								    public Response DailyEstimateReportData(EstimateReportJSON json)
								      {
								
													 		
										ArrayList<EstimateReportJSON> estimateViewList=new ArrayList<EstimateReportJSON>();
										estimateViewList =EstimateReportLogic.DailyReportView(json);
													 		
										
									    return Response.status(200).entity(estimateViewList).build();
													 		
													 	
									} 
									/*
									 * API for registering and adding new customer	
									 */
										
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/EstimateReportEdit")
										    @Consumes(value="application/json")
										 
										 public Response EstimateReportEdit(EstimateReportJSON json) throws ParseException {
									
										    	EstimateReportLogic mas=new EstimateReportLogic();
										    	mas.EstimateReportEdit(json);		
										    
										     	return Response.status(200).entity(json).build();
									}
										
										    /*
											 * API for retrieving category list 	
											 */
												  
										    
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/invoicepaymentreport")
										    @Consumes(value="application/json")
										    public Response invoicepaymentreport(EstimateReportJSON json) throws ParseException {
										   		    		    
										    	EstimateReportLogic SalesReportLogic =new EstimateReportLogic();
										    	json=SalesReportLogic.invoicepaymentreport(json);
										    	
										         	return Response.status(200).entity(json).build();
										    }
										    
										    /*
											 * API for retrieving category list 	
											 */
												  
										    
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/Estimatecustomerstatementreport")
										    @Consumes(value="application/json")
										    public Response Estimatecustomerstatementreport(EstimateReportJSON json) throws ParseException {
										    			    		    
										    	EstimateReportLogic EstimateReportLogic =new EstimateReportLogic();
										    	json=EstimateReportLogic.Estimatecustomerstatementreport(json);
										    	
										     	return Response.status(200).entity(json).build();
										    }
										    
											@POST
											@Produces(value = "application/json")
											@Path(value = "/auditReport")
											@Consumes(value = "application/json")
											public Response auditreport(EstimateReportJSON details) throws ParseException {
											
												ArrayList<EstimateReportJSON> employeeRetrievelist = new ArrayList<EstimateReportJSON>();
												employeeRetrievelist = EstimateReportLogic.AuditReportDisplay(details);

												return Response.status(200).entity(employeeRetrievelist).build();
											}
									 	     
}