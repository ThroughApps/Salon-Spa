package taskmapping;

import java.text.ParseException;



import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


@Path(value="/taskmapping")

public class TaskMappingWebservice {
	/*
	    * API for specifying permission for each role
	    */
	    
	    @POST
	    @Produces(value="application/json" )
	    @Path(value="/retrievePermission")
	    @Consumes(value="application/json")
	    
	    public Response retreivePermission(TaskMappingJSON config) throws ParseException {
	    	TaskMappingJSON retreivepermission=new TaskMappingJSON();
		    
	    	
	    	retreivepermission=TaskMappingLogic.RetreivePermission(config);
	    	
	    	
	    	
	    
	     	return Response.status(200).entity(retreivepermission).build();
}	   

	  	/*
		    * API for specifying permission for each role
		    */
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/employeePermission")
		    @Consumes(value="application/json")
		    
		    public Response employeepermission(TaskMappingJSON config) throws ParseException {
		    	
		    	
		    	config=TaskMappingLogic.SetPermission(config);
		    	
		    	
		     	return Response.status(200).entity(config).build();
	}	   
		    
			/*
			 * API for specifying permision for each role by jeeva
			 */

			@POST
			@Produces(value = "application/json")
			@Path(value = "/taskMappingPermission")
			@Consumes(value = "application/json")

			public Response taskMappingPermission(TaskMappingJSON config) throws ParseException {

				System.out
						.println("entering new taskMappingPermission into process of setting permission for each role......." + config.getPermission());
				config = TaskMappingLogic.taskMappingPermission(config);

			

			
				return Response.status(200).entity(config).build();
			}
			

			/*
			 * API for specifying permision for each role 
			 * retrievePermission
			 */

			@POST
			@Produces(value = "application/json")
			@Path(value = "/retrievePermissionNew")
			@Consumes(value = "application/json")

			public Response retrievePermissionNew(TaskMappingJSON config) throws ParseException {
		
				System.out
						.println("entering  into process of setting permission for each role......." + config.getPermission());
				config = TaskMappingLogic.RetreivePermissionNew(config);

				

		
				return Response.status(200).entity(config).build();
			}
			
			


}
