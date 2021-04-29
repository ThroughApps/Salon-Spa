package report.purchase;

import java.text.ParseException;


import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;




@Path(value="/PurchaseReport")
public class PurchaseReportWebservice {

	/*
	 * API CALL FOR DAILY SALES REPORT
	 */
	@POST
	@Path("/DailyPurchaseReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailyPurchaseReport(PurchaseReportJSON json)
	     {
	
		
		ArrayList <PurchaseReportJSON> dailyEstimateList=new ArrayList <PurchaseReportJSON>();
		dailyEstimateList =PurchaseReportLogic.DailyReport(json);
		
		return Response.status(200).entity(dailyEstimateList).build();
		
	
	     }   
	
	     
	     /*
	 	 * API CALL FOR DAILY PURCHASE REPORT DELETE
	 	 */
	 	@POST
	 	@Path("/DailyPurchaseReportDelete")
	 	@Consumes(value= {"application/json"})
	 	@Produces(value={"application/json"})
	 	public Response DailyPurchaseReportDelete(PurchaseReportJSON json)
	 	     {
	 		
	 		
	 		PurchaseReportJSON dailyEstimateList=new PurchaseReportJSON();
	 		dailyEstimateList =PurchaseReportLogic.DailyReportDelete(json);
	 		
	 		return Response.status(200).entity(dailyEstimateList).build();
	 		
	 	
	 	     }  
	 	     
	 	    /*
	 	 	 * API CALL FOR MONTHLY PURCHASE REPORT DELETE
	 	 	 */
	 	 	@POST
	 	 	@Path("/MonthlyPurchaseReport")
	 	 	@Consumes(value= {"application/json"})
	 	 	@Produces(value={"application/json"})
	 	 	public Response MonthlyPurchaseReport(PurchaseReportJSON json)
	 	 	     {
	 	 
	 	 		
	 	 		ArrayList <PurchaseReportJSON> monthlyEstimateList=new ArrayList <PurchaseReportJSON>();
	 	 		monthlyEstimateList =PurchaseReportLogic.MonthlyReport(json);
	 	 	
	 	 		return Response.status(200).entity(monthlyEstimateList).build();
	 	 		
	 	 	
	 	 	     }  
	 	     
	 	     
	 	 	   /*
	 	 	 	 * API CALL FOR YEARLY PURCHASE REPORT DELETE
	 	 	 	 */
	 	 	 	@POST
	 	 	 	@Path("/YearlyPurchaseReport")
	 	 	 	@Consumes(value= {"application/json"})
	 	 	 	@Produces(value={"application/json"})
	 	 	 	public Response YearlyPurchaseReport(PurchaseReportJSON json)
	 	 	 	     {
	 	 	 		
	 	 	 		
	 	 	 		ArrayList <PurchaseReportJSON> yearlyEstimateList=new ArrayList <PurchaseReportJSON>();
	 	 	 		yearlyEstimateList =PurchaseReportLogic.YearlyReport(json);
	 	 	 		
	 	 	 		return Response.status(200).entity(yearlyEstimateList).build();
	 	 	 		
	 	 	 	
	 	 	 	     }  
	 	     
	 	 	 	   /*
	 	 	 	 	 * API CALL FOR YEARLY PURCHASE REPORT DELETE
	 	 	 	 	 */
	 	 	 	 	@POST
	 	 	 	 	@Path("/DateWisePurchaseReport")
	 	 	 	 	@Consumes(value= {"application/json"})
	 	 	 	 	@Produces(value={"application/json"})
	 	 	 	 	public Response DateWisePurchaseReport(PurchaseReportJSON json)
	 	 	 	 	     {
	 	 	 	 		
	 	 	 	 		
	 	 	 	 		ArrayList <PurchaseReportJSON> yearlyEstimateList=new ArrayList <PurchaseReportJSON>();
	 	 	 	 		yearlyEstimateList =PurchaseReportLogic.DateWiseReport(json);
	 	 	 	 		
	 	 	 	 		
	 	 	 	 		return Response.status(200).entity(yearlyEstimateList).build();
	 	 	 	 		
	 	 	 	 	
	 	 	 	 	     }  
	 	 	 	 	     
	 	 	 	 	     
	 	 	 	 	     
				 	     

				/*
				 * API CALL FOR DAILY PURCHASE REPORT DATA
				*/
			    @POST
				@Path("/DailyPurchaseReportData")
			    @Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
			    public Response DailyPurchaseReportData(PurchaseReportJSON json)
			      {
					
								 		
					ArrayList<PurchaseReportJSON> purchaseViewList=new ArrayList<PurchaseReportJSON>();
					purchaseViewList =PurchaseReportLogic.DailyReportView(json);
				
				    return Response.status(200).entity(purchaseViewList).build();
								 		
								 	
				} 
				 	     
			    
				/*
				 * API for registering and adding new customer	
				 */
					
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/PurchaseReportEdit")
					    @Consumes(value="application/json")
					 
					 public Response PurchaseReportEdit(PurchaseReportJSON json) throws ParseException {
					    
					    	PurchaseReportLogic mas=new PurchaseReportLogic();
					    	mas.PurchaseReportEdit(json);		
					  
					     	return Response.status(200).entity(json).build();
				}
	
	 	 	 	 	     
					    /*
						 * API for retrieving category list 	
						 */
							  
					    
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/invoicepaymentreport")
					    @Consumes(value="application/json")
					    public Response invoicepaymentreport(PurchaseReportJSON json) throws ParseException {
					    			    		    
					    	PurchaseReportLogic SalesReportLogic =new PurchaseReportLogic();
					    	json=SalesReportLogic.invoicepaymentreport(json);
					    	
					 
					     	return Response.status(200).entity(json).build();
					    }
				 	     
					    /*
						 * API for retrieving category list 	
						 */
							  
					    
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/vendorstatementreport")
					    @Consumes(value="application/json")
					    public Response vendorstatementreport(PurchaseReportJSON json) throws ParseException {
					   		    		    
					    	PurchaseReportLogic SalesReportLogic =new PurchaseReportLogic();
					    	json=SalesReportLogic.vendorstatementreport(json);
				
					     	return Response.status(200).entity(json).build();
					    }
				 	     
	 	     
	 	 	 	 	     
	 	 	 	 	     
	 	 	 	 	     
	 	     
}