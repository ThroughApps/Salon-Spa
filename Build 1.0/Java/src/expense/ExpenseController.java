package expense;
import expense.ExpenseJSON;

public class ExpenseController {

	public void addcategory(ExpenseJSON json) {
		// TODO Auto-generated method stub
		ExpenseDao dao=new ExpenseDao();
		dao.addcategory(json);
		
	}

	public void adduser(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		dao.adduser(json);		
	}

	public void addexpense(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		dao.addexpense(json);	
		
	}

	public ExpenseJSON categoryReport(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		json=dao.categoryReport(json);		
		return json;
		
	}

	public ExpenseJSON userreport(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		json=dao.userreport(json);		
		return json;
	}

	public ExpenseJSON expensereport(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		json=dao.expensereport(json);		
		return json;
	}

	public ExpenseJSON deletecategory(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		json=dao.deletecategory(json);		
		return json;
	}

	public ExpenseJSON deleteuser(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		json=dao.deleteuser(json);		
		return json;
	}

	public ExpenseJSON deleteexpense(ExpenseJSON json) {
		ExpenseDao dao=new ExpenseDao();
		json=dao.deleteexpense(json);		
		return json;
	}


	
}
