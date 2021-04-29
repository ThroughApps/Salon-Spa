package inventoryreport;

public interface InventoryReportQueryConstants {

	/*QUERY FOR AVAILABLE STOCK REPORT */
	String GET_PRODUCT_DETAILS = "SELECT ProductName,ProductId,Quantity,QuantityLimit,"
			+ "ProductCategory,ProductType FROM ProductTable WHERE CompanyId = ? AND Status = '0' and productType='product' ";

	/*QUERY FOR UPDATING STOCK OF OWN PRODUCTS */
	String UPDATE_OWN_PRODUCT_DETAILS = "UPDATE ProductTable SET Quantity = Quantity + ? WHERE CompanyId = ? AND ProductId = ? ";

	/*QUERY FOR GENERATING INVENTORY SUMMARY REPORT */
	String INVENTORY_SUMMARY_REPORT = "SELECT ProductId,ProductName,Quantity,ProductCategory,saleRate,"
			+ "purchaseRate,producttype FROM ProductTable WHERE CompanyId = ? AND Status = '0' ";
	

}
