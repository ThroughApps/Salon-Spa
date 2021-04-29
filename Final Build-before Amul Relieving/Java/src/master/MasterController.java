package master;

import java.util.ArrayList;




import master.MasterDao;

public class MasterController {

	public void addcustomer(MasterJSON json) {
		MasterDao dao=new MasterDao();
		dao.addcustomer(json);		
	}

	public MasterJSON customerReport(MasterJSON json) {		
		MasterDao dao=new MasterDao();
		json=dao.customerReport(json);		
		return json;
	}
	
	
	public MasterJSON customerreportrough(MasterJSON json) {		
		MasterDao dao=new MasterDao();
		json=dao.customerReportrough(json);		
		return json;
	}

	public void addvendor(MasterJSON json) {		
		MasterDao dao=new MasterDao();
		dao.addvendor(json);		
		
	}

	public MasterJSON vendorReport(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.vendorReport(json);		
		return json;
	}

	public void addproduct(MasterJSON json) {
		MasterDao dao=new MasterDao();
		dao.addproduct(json);
	}

	public MasterJSON saleproductreport(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.saleproductReport(json);		
		return json;
	}

	public MasterJSON purchaseproductreport(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.purchaseproductReport(json);		
		return json;
	}

	public MasterJSON deletecustomer(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.deletecustomer(json);		
		return json;
	}

	public MasterJSON deletevendor(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.deletevendor(json);		
		return json;
	}

	public MasterJSON deletesaleproduct(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.deletesaleproduct(json);		
		return json;
	}

	public MasterJSON deletepurchaseproduct(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.deletepurchaseproduct(json);		
		return json;
	}

	public MasterJSON updatecustomer(MasterJSON json) {
	MasterDao dao=new MasterDao();
		json=dao.updatecustomer(json);		
		return json;
	}

	public MasterJSON updatevendor(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.updatevendor(json);		
		return json;
	}
	public MasterJSON updateproduct(MasterJSON json) {
		MasterDao dao=new MasterDao();
		json=dao.updateproduct(json);		
		return json;
	}


}
