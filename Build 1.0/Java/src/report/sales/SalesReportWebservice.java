package report.sales;

import java.text.ParseException;



import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;





@Path(value="/SalesReport")
public class SalesReportWebservice {

	
	
	/*
	 * API CALL FOR DAILY SALES REPORT
	 */
	@POST
	@Path("/DailySalesReport")
	@Consumes(value= {"application/json"})
	@Produces(value={"application/json"})
	public Response DailySalesReport(SalesReportJSON json)
	     {
		
		
		ArrayList <SalesReportJSON> dailySalesList=new ArrayList <SalesReportJSON>();
		dailySalesList =SalesReportLogic.DailyReport(json);
	
		return Response.status(200).entity(dailySalesList).build();
		
	
	     }  
	
	
	   		/*
		 	 * API CALL FOR DAILY SALES REPORT DELETE
		 	 */
		 	@POST
		 	@Path("/DailySalesReportDelete")
		 	@Consumes(value= {"application/json"})
		 	@Produces(value={"application/json"})
		 	public Response DailySalesReportDelete(SalesReportJSON json)
		 	     {
		 	
		 		
		 		SalesReportJSON dailySalesList=new SalesReportJSON();
		 		dailySalesList =SalesReportLogic.DailyReportDelete(json);
		
		 		return Response.status(200).entity(dailySalesList).build();
		 		
		 	
		 	     } 
		
		  			/*
				 	 * API CALL FOR MONTHLY SALES REPORT 
				 	 */
				 	@POST
				 	@Path("/MonthlySalesReport")
				 	@Consumes(value= {"application/json"})
				 	@Produces(value={"application/json"})
				 	public Response MonthlySalesReport(SalesReportJSON json)
				 	     {
				
				 		
				 		ArrayList <SalesReportJSON> monthlySalesList=new ArrayList <SalesReportJSON>();
				 		monthlySalesList =SalesReportLogic.MonthlyReport(json);
				 	
				 		return Response.status(200).entity(monthlySalesList).build();
				 		
				 	
				 	     }  
				
	
				 	     
				 	     	/*
						 	 * API CALL FOR YEARLY SALES REPORT 
						 	 */
						 	@POST
						 	@Path("/YearlySalesReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response YearlySalesReport(SalesReportJSON json)
						 	     {
						 
						 		
						 		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
						 		yearlySalesList =SalesReportLogic.YearlyReport(json);
						 		
						 	
						 		return Response.status(200).entity(yearlySalesList).build();
						 		
						 	
						 	     }  
				 	     

					     	/*
						 	 * API CALL FOR DATE_WISE SALES REPORT 
						 	 */
						 	@POST
						 	@Path("/DateWiseSalesReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response DateWiseSalesReport(SalesReportJSON json)
						 	     {
						 	
						 		
						 		ArrayList <SalesReportJSON> yearlySalesList=new ArrayList <SalesReportJSON>();
						 		yearlySalesList =SalesReportLogic.DateWiseReport(json);
						 		
						 	
						 		return Response.status(200).entity(yearlySalesList).build();
						 		
						 	
						 	     }
						 	
						 	
					     	/*
						 	 * API CALL FOR CUSTOMER STATEMENT SALES REPORT 
						 	 */
						 	@POST
						 	@Path("/CustomerStmtSalesReport")
						 	@Consumes(value= {"application/json"})
						 	@Produces(value={"application/json"})
						 	public Response CustomerStmtSalesReport(SalesReportJSON json)
						 	     {
						 	
						 		
						 		ArrayList <SalesReportJSON> customerSalesList=new ArrayList <SalesReportJSON>();
						 		customerSalesList =SalesReportLogic.CustomerStatementReport(json);
						 		
						 		return Response.status(200).entity(customerSalesList).build();
						 		
						 	
						 	     }  
								 	
								 	
		
						 	     

				/*
				 * API CALL FOR DAILY SALES REPORT DATA
				*/
			    @POST
				@Path("/DailySalesReportData")
			    @Consumes(value= {"application/json"})
				@Produces(value={"application/json"})
			    public Response DailySalesReportData(SalesReportJSON json)
			      {
				
								 		
					ArrayList<SalesReportJSON> salesViewList=new ArrayList<SalesReportJSON>();
					salesViewList =SalesReportLogic.DailyReportView(json);
								 		
				
				    return Response.status(200).entity(salesViewList).build();
								 		
								 	
				} 
			    
				/*
				 * API for registering and adding new customer	
				 */
					
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/SalesReportEdit")
					    @Consumes(value="application/json")
					 
					 public Response SalesReportEdit(SalesReportJSON json) throws ParseException {
					    	
					    	SalesReportLogic mas=new SalesReportLogic();
					    	mas.SalesReportEdit(json);		
					
					     	return Response.status(200).entity(json).build();
				}
					    /*
						 * API for retrieving category list 	
						 */
							  
					    
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/invoicepaymentreport")
					    @Consumes(value="application/json")
					    public Response invoicepaymentreport(SalesReportJSON json) throws ParseException {
					    		    		    
					    	SalesReportLogic SalesReportLogic =new SalesReportLogic();
					    	json=SalesReportLogic.invoicepaymentreport(json);
					    	
					    
					     	return Response.status(200).entity(json).build();
					    }
					    /*
						 * API for retrieving category list 	
						 */
							  
					    
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/salescustomerstatementreport")
					    @Consumes(value="application/json")
					    public Response salescustomerstatementreport(SalesReportJSON json) throws ParseException {
					    		    		    
					    	SalesReportLogic SalesReportLogic =new SalesReportLogic();
					    	json=SalesReportLogic.salescustomerstatementreport(json);
					   
					     	return Response.status(200).entity(json).build();
					    }
				 	     
	
}