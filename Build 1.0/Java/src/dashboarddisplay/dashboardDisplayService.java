package dashboarddisplay;

import java.text.ParseException;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;



@Path(value="/DashboardDisplay")
public class dashboardDisplayService {
		
								    /*
									 * API for dashboard display Full data 
									 */
										
										    @POST
										    @Produces(value="application/json" )
										    @Path(value="/DashboardDisplayFrontpage")
										    @Consumes(value="application/json")
										 
										 public Response DashboardDisplayFrontpage(dashboardDisplayJSON json) throws ParseException {
										    	
										    	dashboardDisplayController mas=new dashboardDisplayController();
										    	json = mas.selectMonth_Data_ForDashboard(json);	
										   
										    	

										    	
										     	
										    	return Response.status(200).entity(json).build();
									}
}








