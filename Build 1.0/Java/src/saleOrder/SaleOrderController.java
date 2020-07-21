package saleOrder;
import saleOrder.SaleOrderDao;
import saleOrder.SaleOrderJSON;

public class SaleOrderController {

	public SaleOrderJSON selectcustomer(SaleOrderJSON json) {
		
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.selectCustomer(json);		
		return json;
		
	}


	public void addsaleorder(SaleOrderJSON json) {
		
		SaleOrderDao dao=new SaleOrderDao();
		dao.addsaleorder(json);	
		
	}

	

	public SaleOrderJSON estimateinvoiceNo(SaleOrderJSON json) {
		
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.estimateinvoiceNo(json);		
	
		return json;
	}

	public void addestimateorder(SaleOrderJSON json) {
		SaleOrderDao dao=new SaleOrderDao();
		dao.addestimateorder(json);	
	}

	public SaleOrderJSON saleinvoicereport(SaleOrderJSON json) {
	
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.saleinvoicereport(json);		
		return json;
		
	}

	public SaleOrderJSON estimateinvoicereport(SaleOrderJSON json) {

		SaleOrderDao dao=new SaleOrderDao();
		json=dao.estimateinvoicereport(json);		
		return json;
	}

	public SaleOrderJSON updatesaleorder(SaleOrderJSON json) {
		// TODO Auto-generated method stub
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.updatesaleorder(json);		
		return json;
		
	}
	public SaleOrderJSON updateestimateorder(SaleOrderJSON json) {
		// TODO Auto-generated method stub
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.updateestimateorder(json);		
		return json;
		
	}

	public SaleOrderJSON UpdateQuantityForExisting(SaleOrderJSON json) {
		
		SaleOrderDao dao=new SaleOrderDao();
		json=dao.UpdateQuantityForExistingProduct(json);		
		return json;
		
	}
}
