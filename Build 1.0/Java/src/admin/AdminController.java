package admin;



public class AdminController {

	public void addrole(AdminJSON json) {
	
		AdminDao dao=new AdminDao();
		dao.addrole(json);
		
	}

	public AdminJSON roleReport(AdminJSON json) {
		AdminDao dao=new AdminDao();
		json=dao.roleReport(json);		
		return json;
		
	}

	public void addadminuser(AdminJSON json) {
		AdminDao dao=new AdminDao();
		dao.addadminuser(json);
		
	}

	public AdminJSON userreport(AdminJSON json) {
		AdminDao dao=new AdminDao();
		json=dao.userreport(json);		
		return json;
	}

	public int updatePassword(AdminJSON json) {
		AdminDao dao= new AdminDao();
		int update=dao.updatePassword(json);
		return update;
	}

}
