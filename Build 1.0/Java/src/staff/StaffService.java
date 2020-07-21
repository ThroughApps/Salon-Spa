package staff;

import java.text.ParseException;



import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


import staff.StaffController;
import staff.StaffJSON;
@Path(value="/staff")
public class StaffService {
	  /*
	 * API for add staff name
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addstaff")
		    @Consumes(value="application/json")
		 
		 public Response addstaff(StaffJSON json) throws ParseException, ClassNotFoundException {
		    
		    	StaffController mas=new StaffController();
		    	mas.addstaff(json);	
		    
		     	return Response.status(200).entity(json).build();

		    }
		    
		    /*
			 * API for retrieving staff list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/selectstaff")
		    @Consumes(value="application/json")
		    public Response selectstaff(StaffJSON json) throws ParseException {
				    		    
		    	StaffController staffList =new StaffController();
		    	json=staffList.selectstaff(json);
		    	
		   
		     	return Response.status(200).entity(json).build();
		    }
		    
		    /*
		 			 * API for retrieving customer list 	
		 			 */
		 				  
		 		    
		 		    @POST
		 		    @Produces(value="application/json" )
		 		    @Path(value="/deletestaff")
		 		    @Consumes(value="application/json")
		 		    public Response deletestaff(StaffJSON json) throws ParseException {
		 		    	    		    
		 		    	StaffController deletestaffList =new StaffController();
		 		    	json=deletestaffList.deletestaff(json);
		 		    	
		 		    
		 		     	return Response.status(200).entity(json).build();
		 		    }
		 		    
		 		    
		 		   @POST
				    @Produces(value="application/json" )
				    @Path(value="/EmployeeDetailsUpdate")
				    @Consumes(value="application/json")
				    public Response updateemployee(StaffJSON json) throws ParseException {
				    		    	   
				    	StaffController updateemployeeList =new StaffController();
				    	json=updateemployeeList.updateemployee(json);
				    	
				    	return Response.status(200).entity(json).build();
				    }

		 		    
		    /*
			 * API for add salary
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/addsalary")
				    @Consumes(value="application/json")
				 
				 public Response addsalary(StaffJSON json) throws ParseException {
				    
				    	StaffController mas=new StaffController();
				    	mas.addsalary(json);	
				    	
				     	return Response.status(200).entity(json).build();
				    }
				    
				    /*
					 * API for retrieving salary report 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/salaryreport")
				    @Consumes(value="application/json")
				    public Response salaryreport(StaffJSON json) throws ParseException {
				    			    		    
				    	StaffController staffList =new StaffController();
				    	json=staffList.salaryreport(json);
				    	
				    	
				     	return Response.status(200).entity(json).build();
				    }
				    /*
				    * API for add staff name
				    */

				       @POST
				       @Produces(value="application/json" )
				       @Path(value="/addBank")
				       @Consumes(value="application/json")

				    public Response addBank(StaffJSON json) throws ParseException {
				      
				       	StaffController mas=new StaffController();
				       	mas.addBank(json);	
				       	
				        return Response.status(200).entity(json).build();

				       }
				       /*
						 * API for retrieving salary report 	
						 */
							  
					    
					    @POST
					    @Produces(value="application/json" )
					    @Path(value="/bankreport")
					    @Consumes(value="application/json")
					    public Response bankreport(StaffJSON json) throws ParseException {
					    
					    	StaffController staffList =new StaffController();
					    	json=staffList.bankreport(json);
					    	
					    	
					     	return Response.status(200).entity(json).build();
					    }
					    /*
			 			 * API for retrieving customer list 	
			 			 */
			 				  
			 		    
			 		    @POST
			 		    @Produces(value="application/json" )
			 		    @Path(value="/deleteBank")
			 		    @Consumes(value="application/json")
			 		    public Response deleteBank(StaffJSON json) throws ParseException {
			 		    		    		    
			 		    	StaffController deletestaffList =new StaffController();
			 		    	json=deletestaffList.deleteBank(json);
			 		    	
			 		     	return Response.status(200).entity(json).build();
			 		    }
			 		    
			 		   @POST
					    @Produces(value="application/json" )
					    @Path(value="/BankDetailsUpdate")
					    @Consumes(value="application/json")
					    public Response BankDetailsUpdate(StaffJSON json) throws ParseException {
					    	    		    
					    	StaffController updateemployeeList =new StaffController();
					    	json=updateemployeeList.BankDetailsUpdate(json);
					    	
					    	return Response.status(200).entity(json).build();
					    }

			 		    
			 		    
}
