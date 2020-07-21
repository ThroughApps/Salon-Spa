package master;

import java.io.IOException;

import java.sql.SQLException;
import java.text.ParseException;


import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;


import master.MasterController;
import master.MasterJSON;

@Path(value="/master")
public class MasterService {
	/*
	 * API for registering and adding new customer	
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/addcustomer")
		    @Consumes(value="application/json")
		 
		 public Response addcustomer(MasterJSON json) throws ParseException {
		    
		    	MasterController mas=new MasterController();
		    	mas.addcustomer(json);		
		 
		     	return Response.status(200).entity(json).build();
	}
		    /*
			 * API for retrieving customer list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/customerreport")
		    @Consumes(value="application/json")
		    public Response customerreport(MasterJSON json) throws ParseException {
		    	    		    
		    	MasterController customerList =new MasterController();
		    	json=customerList.customerReport(json);
		    	
		    	
		     	return Response.status(200).entity(json).build();
		    }
		   
		    
		    /*
		 			 * API for retrieving customer list 	
		 			 */
		 				  
		 		    
		 		    @POST
		 		    @Produces(value="application/json" )
		 		    @Path(value="/customerreportrough")
		 		    @Consumes(value="application/json")
		 		    public Response customerreportrough(MasterJSON json) throws ParseException {
		 		        		    
		 		    	MasterController customerList =new MasterController();
		 		    	json=customerList.customerreportrough(json);
		 		    	
		 		     	return Response.status(200).entity(json).build();
		 		    }
		 		    
		    
		    
		    /*
			 * API for retrieving customer list 	
			 */
				  
		    
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/deletecustomer")
		    @Consumes(value="application/json")
		    public Response deletecustomer(MasterJSON json) throws ParseException {
		    		    
		    	MasterController deletecustomerList =new MasterController();
		    	json=deletecustomerList.deletecustomer(json);
		    	
		     	return Response.status(200).entity(json).build();
		    }

		    /*
			 * API for updating customer details	
			 */

		    
		    
		   @POST
		    @Produces(value="application/json" )
		    @Path(value="/CustomerDetailsUpdate")
		    @Consumes(value="application/json")
		    public Response updatecustomer(MasterJSON json) throws ParseException {
		    		    		    
		    	MasterController updatecustomerList =new MasterController();
		    	json=updatecustomerList.updatecustomer(json);
		    	
		    	
		    	return Response.status(200).entity(json).build();
		    }

		    
		    /*
			 * API for registering and adding new vendor	
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/addvendor")
				    @Consumes(value="application/json")
				 
				 public Response addvendor(MasterJSON json) throws ParseException {
				    	
				    	MasterController mas=new MasterController();
				    	mas.addvendor(json);		
				    	
				     	return Response.status(200).entity(json).build();
			}
				
				    /*
					 * API for retrieving vendor list 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/vendorreport")
				    @Consumes(value="application/json")
				    public Response vendorreport(MasterJSON json) throws ParseException {
				    	    		    
				    	MasterController vendorList =new MasterController();
				    	json=vendorList.vendorReport(json);				    	
				        
				     	return Response.status(200).entity(json).build();
				    }
				    
				    
				    /*
					 * API for retrieving customer list 	
					 */
						  
				    
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/deletevendor")
				    @Consumes(value="application/json")
				    public Response deletevendor(MasterJSON json) throws ParseException {
				    	    		    
				    	MasterController deletevendorList =new MasterController();
				    	json=deletevendorList.deletevendor(json);
				    	
				    	
				     	return Response.status(200).entity(json).build();
				    }
				    
				    /*
					 * API for updating vendor details	
					 */

				    
				    
				   @POST
				    @Produces(value="application/json" )
				    @Path(value="/VendorDetailsUpdate")
				    @Consumes(value="application/json")
				    public Response updatevendor(MasterJSON json) throws ParseException {
				    		    		    
				    	MasterController updatecustomerList =new MasterController();
				    	json=updatecustomerList.updatevendor(json);
				    	
				    	
				    	return Response.status(200).entity(json).build();
				    }

				    /*
					 * API for registering and adding new product	
					 */
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/addproduct")
						    @Consumes(value="application/json")
						 
						 public Response addproduct(MasterJSON json) throws ParseException {
						    	
						    	MasterController mas=new MasterController();
						    	mas.addproduct(json);		
						    	
						     	return Response.status(200).entity(json).build();
					}

						    /*
							 * API for retrieving sale product list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/saleproductreport")
						    @Consumes(value="application/json")
						    public Response saleproductreport(MasterJSON json) throws ParseException {
						    	
						    	MasterController saleproductList =new MasterController();
						    	json=saleproductList.saleproductreport(json);				    	
						      
						     	return Response.status(200).entity(json).build();
						    }
						    
						    /*
							 * API for retrieving customer list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deletesaleproduct")
						    @Consumes(value="application/json")
						    public Response deletesaleproduct(MasterJSON json) throws ParseException {
						    
						    	MasterController deletesaleproductList =new MasterController();
						    	json=deletesaleproductList.deletesaleproduct(json);
						    	
						     	return Response.status(200).entity(json).build();
						    }
						    
						    /*
							 * API for retrieving purchase product list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/purchaseproductreport")
						    @Consumes(value="application/json")
						    public Response purchaseproductreport(MasterJSON json) throws ParseException {
						    	
						    	MasterController purchaseproductList =new MasterController();
						    	json=purchaseproductList.purchaseproductreport(json);				    	
						      
						     	return Response.status(200).entity(json).build();
						    }
						    
						    /*
							 * API for retrieving customer list 	
							 */
								  
						    
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/deletepurchaseproduct")
						    @Consumes(value="application/json")
						    public Response deletepurchaseproduct(MasterJSON json) throws ParseException {
						    	
						    	MasterController deletepurchaseproductList =new MasterController();
						    	json=deletepurchaseproductList.deletepurchaseproduct(json);
						    	
						    	
						     	return Response.status(200).entity(json).build();
						    }
						    /*
							 * API for updating customer details	
							 */

						    
						    
						   @POST
						    @Produces(value="application/json" )
						    @Path(value="/ProductDetailsUpdate")
						    @Consumes(value="application/json")
						    public Response updateproduct(MasterJSON json) throws ParseException {
						    			    		    
						    	MasterController updatecustomerList =new MasterController();
						    	json=updatecustomerList.updateproduct(json);
						    	
						    	
						    	return Response.status(200).entity(json).build();
						    }

						
						    
}
