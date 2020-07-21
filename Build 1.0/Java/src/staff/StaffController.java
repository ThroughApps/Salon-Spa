package staff;



public class StaffController {	
	
	public void addstaff(StaffJSON json) throws ClassNotFoundException {
		
		StaffDao dao=new StaffDao();
		 dao.addstaff(json);
	}

	public StaffJSON selectstaff(StaffJSON json) {
		
		StaffDao dao=new StaffDao();
		json=dao.selectstaff(json);		
		return json;
	}

	public void addsalary(StaffJSON json) {
	
		StaffDao dao=new StaffDao();
		 dao.addsalary(json);
		
	}

	public StaffJSON salaryreport(StaffJSON json) {
		StaffDao dao=new StaffDao();
		json=dao.salaryreport(json);		
		return json;
	}

	public StaffJSON deletestaff(StaffJSON json) {
		// TODO Auto-generated method stub
		StaffDao dao=new StaffDao();
		json=dao.deletestaff(json);		
		return json;
	
	}

	public StaffJSON updateemployee(StaffJSON json) {
		StaffDao dao=new StaffDao();
		json=dao.updateemployee(json);		
		return json;
	}

	public void addBank(StaffJSON json) {
		
		StaffDao dao=new StaffDao();
		dao.addBank(json);

		}

	public StaffJSON bankreport(StaffJSON json) {
		StaffDao dao=new StaffDao();
		json=dao.bankreport(json);		
		return json;
	}

	public StaffJSON deleteBank(StaffJSON json) {
		StaffDao dao=new StaffDao();
		json=dao.deleteBank(json);		
		return json;
	}

	public StaffJSON BankDetailsUpdate(StaffJSON json) {
		StaffDao dao=new StaffDao();
		json=dao.BankDetailsUpdate(json);		
		return json;
	}

}
