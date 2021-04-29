package gst;



public class GSTController {

	public GSTJSON salereport(GSTJSON json) {
		GSTDao dao=new GSTDao();
		json=dao.salereport(json);		
		return json;
	}
	public GSTJSON purchasereport(GSTJSON json) {
		GSTDao dao=new GSTDao();
		json=dao.purchasereport(json);		
		return json;
	}
	public GSTJSON businesstobusinessreport(GSTJSON json) {
		GSTDao dao=new GSTDao();
		json=dao.businesstobusinessreport(json);		
		return json;
	}
	public GSTJSON businesstocustomerreport(GSTJSON json) {
		GSTDao dao=new GSTDao();
		json=dao.businesstocustomerreport(json);		
		return json;
	}

}
