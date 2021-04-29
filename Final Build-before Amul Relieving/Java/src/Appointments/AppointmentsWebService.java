package Appointments;

import java.text.ParseException;
import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import expense.ExpenseController;
import expense.ExpenseJSON;

@Path(value="/Appointments")
public class AppointmentsWebService {

	/*
	 * GENERAL INFO ABOUT APPOINTMENTS
	 * STATUS = 0 //BOOKED
	 * STATUS = 1 //DELETED/CANCELED/REJECTED BY STAFF(SALOON SIDE)
	 * STATUS = 2 //CONFIRMED (TO BE DONE IN FUTURE) -- OPERATION WILL BE PERFORMED BY STAFF (SALOON SIDE)
	 * STATUS = 3 //MISSED APPOINTMENTS
	 * STATUS = 4 //RESCHEDULED
	 * STATUS = 5 //USED APPOINTMENTS
	 */
	
	/*
	 * API FOR GETTING SALOON DETAILS FOR CUSTOEMR APPOINTMENT
	 */
		
		    @POST
		    @Produces(value="application/json" )
		    @Path(value="/GetAllSaloonDetails")
		    @Consumes(value="application/json")
		 
		 public Response GetAllSaloonDetails(AppointmentsJSON json) throws ParseException {
		    	System.out.println("GETTING ALL SALOON DETAILS \n");
		    	AppointmentsJSON saloonDetailsData=new AppointmentsJSON();
		    	saloonDetailsData=AppointmentsLogic.GetAllSaloonDetails(json);		
		    	System.out.println("GETTING ALL SALOON DETAILS COMPLETED \n");
		     	return Response.status(200).entity(saloonDetailsData).build();
	}
		    
			/*
			 * API FOR MAKING CUSTOMER / STAFF APPOINTMENTS
			 */
				
				    @POST
				    @Produces(value="application/json" )
				    @Path(value="/MakeAppointments")
				    @Consumes(value="application/json")
				 
				 public Response MakeAppointments(AppointmentsJSON json) throws ParseException {
				    	System.out.println("MAKING APPOINTMENT \n");
				    	AppointmentsJSON saloonDetailsData=new AppointmentsJSON();
				    	saloonDetailsData=AppointmentsLogic.MakeAppointment(json);		
				    	System.out.println("MAKING APPOINTMENT COMPLETED \n");
				     	return Response.status(200).entity(saloonDetailsData).build();
			}
		    
				    /*
					 * API FOR GETTING SERVICE ,EMPLOYEE   DETAILS FOR STAFF MAKING APPOINTMENT
					 */
						
						    @POST
						    @Produces(value="application/json" )
						    @Path(value="/GetSaloonDetails")
						    @Consumes(value="application/json")
						 
						 public Response GetSaloonDetails(AppointmentsJSON json) throws ParseException {
						    	System.out.println("GETTING SALOON DETAILS \n");
						    	AppointmentsJSON saloonDetailsData=new AppointmentsJSON();
						    	saloonDetailsData=AppointmentsLogic.GetSaloonDetails(json);		
						    	System.out.println("GETTING SALOON DETAILS COMPLETED \n");
						     	return Response.status(200).entity(saloonDetailsData).build();
					}
						    
				
				      /*
					   * API FOR GETTING APPOINTMENT DETAILS
					   */
								
						   @POST
						   @Produces(value="application/json" )
						   @Path(value="/GetAppointmentDetails")
						   @Consumes(value="application/json")
								 
						public Response GetAppointmentDetails(AppointmentsJSON json) throws ParseException {
							System.out.println("GETTING APPOINTMENT DETAILS \n");
							AppointmentsJSON appointmentDetailsData=new AppointmentsJSON();
							appointmentDetailsData=AppointmentsLogic.GetAppointmentDetails(json);		
						    System.out.println("GETTING APPOINTMENT DETAILS COMPLETED \n");
							return Response.status(200).entity(appointmentDetailsData).build();
							
					}
						   
						 /*
						  * API FOR GETTING APPOINTMENT DETAILS
						  */
										
							 @POST
							 @Produces(value="application/json" )
							 @Path(value="/UpdateDeleteAppointment")
							 @Consumes(value="application/json")
										 
						public Response UpdateAppointment(AppointmentsJSON json) throws ParseException {
							System.out.println("UPDATING/DELETING APPOINTMENT DETAILS \n");
							AppointmentsJSON responseData=new AppointmentsJSON();
							responseData=AppointmentsLogic.UpdateAppointment(json);		
							System.out.println("UPDATING/DELETING APPOINTMENT DETAILS COMPLETED \n");
							return Response.status(200).entity(responseData).build();
									
							}
						   
							 /*
							  * API FOR GETTING UNCONFIRMED APPOINTMENTS
							  */
											
								 @POST
								 @Produces(value="application/json" )
								 @Path(value="/UnconfirmedAppointments")
								 @Consumes(value="application/json")
											 
							public Response UnconfirmedAppointments(AppointmentsJSON json) throws ParseException {
								System.out.println("GETTING  UNCONFIRMED APPOINTMENT DETAILS \n");
								ArrayList<AppointmentsJSON> unconfirmedAppointmentList=new ArrayList<AppointmentsJSON>();
								unconfirmedAppointmentList=AppointmentsLogic.UnConfirmedAppointmentDetails(json);		
								System.out.println("GETTING UNCONFIRMED  APPOINTMENT DETAILS COMPLETED \n");
								return Response.status(200).entity(unconfirmedAppointmentList).build();
										
								}
								 
								 /*
								  * API FOR ENABLING CHANGES LIKE ACCEPT OR REJECT
								  */
												
									 @POST
									 @Produces(value="application/json" )
									 @Path(value="/AppointmentAcceptReject")
									 @Consumes(value="application/json")
												 
								public Response EnableAcceptRejectChanges(AppointmentsJSON json) throws ParseException {
									System.out.println("ENABLING ACCEPT/REJECT APPOINTMENT DETAILS \n");
									AppointmentsJSON responseData=new AppointmentsJSON();
									responseData=AppointmentsLogic.AcceptRejectAppointmentDetails(json);		
									System.out.println("ENABLING ACCEPT/REJECT APPOINTMENT COMPLETED \n");
									return Response.status(200).entity(responseData).build();
											
									}	 
								 
								 
								
									 /*
									  * API FOR RESCHEDULING AN APPOINTMENT
									  */
													
										 @POST
										 @Produces(value="application/json" )
										 @Path(value="/RescheduleAppointment")
										 @Consumes(value="application/json")
													 
									public Response RescheduleAppointment(AppointmentsJSON json) throws ParseException {
										System.out.println("RESCHEDULE APPOINTMENT DETAILS \n");
										AppointmentsJSON responseData=new AppointmentsJSON();
										responseData=AppointmentsLogic.RescheduleAppointmentDetails(json);		
										System.out.println("RESCHEDULEAPPOINTMENT COMPLETED \n");
										return Response.status(200).entity(responseData).build();
												
										}	 
								 
								 
								 
										 /*
										  * API FOR ACCEPT /REJECT ALL APPOINMENT
										  */
														
											 @POST
											 @Produces(value="application/json" )
											 @Path(value="/AcceptRejectAllAppointment")
											 @Consumes(value="application/json")
														 
										public Response AcceptRejectAllAppointment(AppointmentsJSON json) throws ParseException {
											System.out.println("ACCEPT/REJECT APPOINTMENT DETAILS \n");
											AppointmentsJSON responseData=new AppointmentsJSON();
											responseData=AppointmentsLogic.AcceptRejectAllAppointment(json);		
											System.out.println("ACCEPT/REJECT APPOINTMENT COMPLETED \n");
											return Response.status(200).entity(responseData).build();
													
											}	 
								 
											 /*
											  * API FOR UPDATING APPOINMENT VIA POPUP
											  */
															
												 @POST
												 @Produces(value="application/json" )
												 @Path(value="/UpdateAppointments")
												 @Consumes(value="application/json")
															 
											public Response UpdateAppointments(AppointmentsJSON json) throws ParseException {
												System.out.println("UPDATING APPOINTMENT DETAILS VIA POPUP\n");
												AppointmentsJSON responseData=new AppointmentsJSON();
												responseData=AppointmentsLogic.UpdateAppointments(json);		
												System.out.println("UPDATING APPOINTMENT DETAILS VIA POPUP COMPLETED \n");
												return Response.status(200).entity(responseData).build();
														
												}	 
									 
								 
								 
								 
						   
}
