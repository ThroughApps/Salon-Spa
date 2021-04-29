package vendorOrder;

import saleOrder.SaleOrderDao;

public class VendorOrderController {
	public VendorOrderJSON selectvendor(VendorOrderJSON json) {
	
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.selectvendor(json);		
		return json;
		
	}
	
	

	public void addpurchaseorder(VendorOrderJSON json) {
		VendorOrderDao dao=new VendorOrderDao();
		dao.addpurchaseorder(json);	
		
	}

	
	public VendorOrderJSON purchaseinvoicereport(VendorOrderJSON json) {
		
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.purchaseinvoicereport(json);		
		return json;
	}

	public VendorOrderJSON updatepurchaseorder(VendorOrderJSON json) {
		VendorOrderDao dao=new VendorOrderDao();
		json=dao.updatepurchaseorder(json);		
		return json;
		
	}

	

}
