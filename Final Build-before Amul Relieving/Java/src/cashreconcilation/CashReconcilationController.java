package cashreconcilation;



public class CashReconcilationController {

	public void addCashReconcilation(CashReconcilationJSON json) {
		// TODO Auto-generated method stub
		CashReconcilationDao dao=new CashReconcilationDao();
		dao.addCashReconcilation(json);
	}

}
