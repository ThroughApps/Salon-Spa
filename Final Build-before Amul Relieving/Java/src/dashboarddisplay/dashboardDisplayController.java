package dashboarddisplay;



public class dashboardDisplayController {
	
	public dashboardDisplayJSON selectMonth_Data_ForDashboard(dashboardDisplayJSON json) {
		
		dashboardDisplayDao dao=new dashboardDisplayDao();
		json=dao.selectDashboard_Display_Data(json);		
		return json;
	}

}
