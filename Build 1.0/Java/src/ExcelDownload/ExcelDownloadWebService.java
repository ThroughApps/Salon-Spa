package ExcelDownload;

import java.text.ParseException;

import java.util.ArrayList;

import javax.ws.rs.Consumes;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import ReportsPaging.ReportsPagingLogic;


@Path(value="/excelDownload")
public class ExcelDownloadWebService {
	
	/*
	 * API for employee maintenance report
	 */

	@POST
	@Produces(value = "application/json")
	@Path(value = "/employeeMaintenance")
	@Consumes(value = "application/json")

	public Response employeemaintenance(ExcelDownloadJSON details) throws ParseException {
		System.out.println("GENERATING EMPLOYEE MAINTENNANCE REPORT FOR DOWNLOAD \n");
		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		employeeRetrievelist = ExcelDownloadLogic.EmployeeMaintenanceReport(details);
		
		System.out.println("GENERATING EMPLOYEE MAINTENNANCE REPORT FOR DOWNLOAD COMPLETED \n");
		return Response.status(200).entity(employeeRetrievelist).build();
	}

	/*
	 * API FOR AUDIT REPORT
	 */
	@POST
	@Produces(value = "application/json")
	@Path(value = "/auditReport")
	@Consumes(value = "application/json")
	public Response auditreport(ExcelDownloadJSON details) throws ParseException {
		System.out.println("GENERATING AUDIT REPORT FOR DOWNLOAD \n");
		ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		employeeRetrievelist = ExcelDownloadLogic.AuditReportDisplay(details);
		System.out.println("GENERATING AUDIT REPORT FOR DOWNLOAD COMPLETED \n");
		return Response.status(200).entity(employeeRetrievelist).build();
	}
	
	
	/*
	  * API FOR GENERATING DEVICE REPORT 
	  */
		
		@POST
		@Path(value="/DeviceReportIndividual")
		@Consumes(value= {"application/json"})
		@Produces(value={"application/json"})
		public Response DeviceReport(ExcelDownloadJSON json)throws ParseException
		{  
			
			System.out.println("GENERATIG DEVICE REPORT FOR DOWNLOAD \n");
			ArrayList <ExcelDownloadJSON> List=new ArrayList <ExcelDownloadJSON> ();
			List=ExcelDownloadLogic.DeviceReportIndividual(json);
			System.out.println("GENERATIG DEVICE REPORT FOR DOWNLOAD COMPLETED \n");
		   	return Response.status(200).entity(List).build();
			 
			}
	
	
		/*
		 * API FOR GENERATING MESSAGE CENTER EMAIL REPORT
		 */
		 @POST
		 @Produces(value="application/json" )
		 @Path(value="/MessageCenterReportEmail")
		 @Consumes(value="application/json")
		 public Response MessageCenterReportEmail(ExcelDownloadJSON details) throws ParseException {
		   System.out.println("GENERATING MESSAGE CENTER EMAIL REPORT FOR DOWNLOAD \n");
		   ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		   employeeRetrievelist=ExcelDownloadLogic.MessageCenterReportEmail(details);
		   System.out.println("GENERATING MESSAGE CENTER EMAIL REPORT FOR DOWNLOAD COMPLETED \n");
		     	return Response.status(200).entity(employeeRetrievelist).build();
		    }
		 
		 /*
		  * API FOR GENERATING MESSAGE CENTER SMS REPORT
		  */
		 
		 @POST
		 @Produces(value="application/json" )
		 @Path(value="/MessageCenterReportSMS")
		 @Consumes(value="application/json")
		 public Response MessageCenterReportSMS(ExcelDownloadJSON details) throws ParseException {
		    System.out.println("GENERATING MESSAGE CENTER SMS REPORT FOR DOWNLOAD \n");
		    ArrayList<ExcelDownloadJSON> employeeRetrievelist = new ArrayList<ExcelDownloadJSON>();
		    ExcelDownloadJSON reportAndCount=new ExcelDownloadJSON();
		    reportAndCount=ExcelDownloadLogic.MessageCenterReportSMS(details);
		    System.out.println("GENERATING MESSAGE CENTER SMS REPORT FOR DOWNLOAD COMPLETED \n");
		     	return Response.status(200).entity(reportAndCount).build();
		    }
		 
		 /*
		  * API FOR GENERATING Trip History REPORT WITH PAGING CONCEPT
		  */
			@POST
			@Produces(value = "application/json")
			@Path(value = "/TripHistoryReport")
			@Consumes(value = "application/json")
			public Response TripHistoryReport(ExcelDownloadJSON details) throws ParseException {
				System.out.println("GENERATING TRIP HISTORY REPORT FOR DOWNLOAD \n");
				details = ExcelDownloadLogic.TripHistoryReport(details);
		
				System.out.println("GENERATING TRIP HISTORY REPORT FOR DOWNLOAD COMPLETED \n");
				return Response.status(200).entity(details).build();
			}
		 
		 
			 /*
			  * API FOR GENERATING SHIFT WISE REPORT FOR DOWNLOAD
			  */
				@POST
				@Produces(value = "application/json")
				@Path(value = "/ShiftWiseReport")
				@Consumes(value = "application/json")
				public Response ShiftWiseReport(ExcelDownloadJSON details) throws ParseException {
					System.out.println("GENERATING SHIFTWISE REPORT FOR DOWNLOAD \n");
					details = ExcelDownloadLogic.ShiftWiseReport(details);
			
					System.out.println("GENERATING SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
					return Response.status(200).entity(details).build();
				}
		 
		 
				 /*
				  * API FOR GENERATING DATE WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
				  */
					@POST
					@Produces(value = "application/json")
					@Path(value = "/DateWiseShiftWiseReport")
					@Consumes(value = "application/json")
					public Response DateWiseShiftWiseReport(ExcelDownloadJSON details) throws ParseException {
						System.out.println("GENERATING DATE WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
						details = ExcelDownloadLogic.DateWiseShiftWiseReport(details);
				
						System.out.println("GENERATING DATE SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
						return Response.status(200).entity(details).build();
					}
		 
					 /*
					  * API FOR GENERATING PERIOD WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
					  */
						@POST
						@Produces(value = "application/json")
						@Path(value = "/PeriodWiseShiftWiseReport")
						@Consumes(value = "application/json")
						public Response PeriodWiseShiftWiseReport(ExcelDownloadJSON details) throws ParseException {
							System.out.println("GENERATING PERIOD  WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
							details = ExcelDownloadLogic.PeriodWiseShiftWiseReport(details);
					
							System.out.println("GENERATING PERIOD SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
							return Response.status(200).entity(details).build();
						}
		 
						 /*
						  * API FOR GENERATING MONTH WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
						  */
							@POST
							@Produces(value = "application/json")
							@Path(value = "/MonthWiseShiftWiseReport")
							@Consumes(value = "application/json")
							public Response MonthWiseShiftWiseReport(ExcelDownloadJSON details) throws ParseException {
								System.out.println("GENERATING MONTH  WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
								details = ExcelDownloadLogic.MonthWiseShiftWiseReport(details);
						
								System.out.println("GENERATING MONTH SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
								return Response.status(200).entity(details).build();
							}
							
							 /*
							  * API FOR GENERATING PERIOD WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
							  */
								@POST
								@Produces(value = "application/json")
								@Path(value = "/vacancyReport")
								@Consumes(value = "application/json")
								public Response vacancyReport(ExcelDownloadJSON details) throws ParseException {
									System.out.println("GENERATING PERIOD  WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
									details = ExcelDownloadLogic.VacancyReport(details);
							
									System.out.println("GENERATING PERIOD SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
									return Response.status(200).entity(details).build();
								}
							
							 /*
							  * API FOR GENERATING DATE WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
							  */
								@POST
								@Produces(value = "application/json")
								@Path(value = "/expiredShiftReport")
								@Consumes(value = "application/json")
								public Response expiredShiftReport(ExcelDownloadJSON details) throws ParseException {
									System.out.println("GENERATING DATE WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
									details = ExcelDownloadLogic.expiredShiftReport(details);
							
									System.out.println("GENERATING DATE SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
									return Response.status(200).entity(details).build();
								}
								
								 /*
								  * API FOR GENERATING DATE WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
								  */
									@POST
									@Produces(value = "application/json")
									@Path(value = "/deletedShiftReport")
									@Consumes(value = "application/json")
									public Response deletedShiftReport(ExcelDownloadJSON details) throws ParseException {
										System.out.println("GENERATING DATE WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
										details = ExcelDownloadLogic.deletedShiftReport(details);
								
										System.out.println("GENERATING DATE SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
										return Response.status(200).entity(details).build();
									}
									
									 /*
									  * API FOR GENERATING PERIOD WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
									  */
										@POST
										@Produces(value = "application/json")
										@Path(value = "/supervisorbasedReport")
										@Consumes(value = "application/json")
										public Response supervisorbasedReport(ExcelDownloadJSON details) throws ParseException {
											System.out.println("GENERATING PERIOD  WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
											details = ExcelDownloadLogic.supervisorbasedReport(details);
									
											System.out.println("GENERATING PERIOD SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
											return Response.status(200).entity(details).build();
										}
										
										 /*
										  * API FOR GENERATING DATE WISE SHIFT HISTORY  REPORT FOR DOWNLOAD
										  */
											@POST
											@Produces(value = "application/json")
											@Path(value = "/ScheduledShiftReport")
											@Consumes(value = "application/json")
											public Response ScheduledShiftReport(ExcelDownloadJSON details) throws ParseException {
												System.out.println("GENERATING DATE WISE SHIFTWISE REPORT FOR DOWNLOAD \n");
												details = ExcelDownloadLogic.ScheduledShiftReport(details);
										
												System.out.println("GENERATING DATE SHIFTWISE REPORT FOR DOWNLOAD COMPLETED \n");
												return Response.status(200).entity(details).build();
											}
}
