package admin;

import java.text.ParseException;


import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

@Path(value="/admin")
public class AdminService {
	/*
	 * API for registering and adding new category	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addrole")
		    @Consumes(value="application/json")
		 
		 public Response addrole(AdminJSON json) throws ParseException {
		
		    	AdminController adm=new AdminController();
		    	adm.addrole(json);		
		    	
		     	return Response.status(200).entity(json).build();
	}
		    /*
			 * API for retrieving category list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/rolereport")
		    @Consumes(value="application/json")
		    public Response rolereport(AdminJSON json) throws ParseException {
		    	
		    	AdminController roleList =new AdminController();
		    	json=roleList.roleReport(json);
		    	
		    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
		    	*/
		      
		        return Response.status(200).entity(json).build();
		    }
		    
		    /*
			 * API for registering and adding new user	
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/addadminuser")
				    @Consumes(value="application/json")
				 
				 public Response addadminuser(AdminJSON json) throws ParseException {
				    	
				    	AdminController adm=new AdminController();
				    	adm.addadminuser(json);		
				    	
				     	return Response.status(200).entity(json).build();
			}
				    /*
					 * API for retrieving category list 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/userreport")
				    @Consumes(value="application/json")
				    public Response userreport(AdminJSON json) throws ParseException {
	    		    
				    	AdminController roleList =new AdminController();
				    	json=roleList.userreport(json);
				    	
				    	/*reportAndCount.setEmployeeRetrievelist(employeeRetrievelist);
				    	*/
				       
				     	return Response.status(200).entity(json).build();
				    }
				    
					/*
					 * API CALL FOR UPDATING THE NEW PASSWORD
					 */
					@POST
					@Path("/updatePassword")
					@Consumes(value= {"application/json"})
					public Response updatepswd(AdminJSON json) {
						
						
						AdminController adm=new AdminController();
				    	int update=adm.updatePassword(json);	
					   // int  update =EmployeeLogic.updatePassword(json);
					 
					    String result=Integer.toString(update);
					  
						return Response.status(200).entity(result).build();
						
					}
					
				    
		
}
