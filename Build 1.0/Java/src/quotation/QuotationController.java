package quotation;

import saleOrder.SaleOrderDao;

public class QuotationController {

	public QuotationJSON selectcustomer(QuotationJSON json) {
		
		QuotationDao dao=new QuotationDao();
		json=dao.selectCustomer(json);		
		return json;
		
	}



	public void addgstquotationorder(QuotationJSON json) {
		QuotationDao dao=new QuotationDao();
		dao.addgstquotationorder(json);	
		
	}



	public void addwithoutgstquotationorder(QuotationJSON json) {
		QuotationDao dao=new QuotationDao();
		dao.addwithoutgstquotationorder(json);	
	}

	public QuotationJSON gstquotationreport(QuotationJSON json) {
		
		QuotationDao dao=new QuotationDao();
		json=dao.gstquotationreport(json);		
		return json;
	}

	public QuotationJSON gstquotationreportmonthyear(QuotationJSON json) {
		
		QuotationDao dao=new QuotationDao();
		json=dao.gstquotationreportmonthyear(json);		
		return json;
	}
	public QuotationJSON withoutgstquotationreport(QuotationJSON json) {
		
		QuotationDao dao=new QuotationDao();
		json=dao.withoutgstquotationreport(json);		
		return json;
	}
	public QuotationJSON withoutgstquotationreportmonthyear(QuotationJSON json) {
		
		QuotationDao dao=new QuotationDao();
		json=dao.withoutgstquotationreportmonthyear(json);		
		return json;
	}


}
