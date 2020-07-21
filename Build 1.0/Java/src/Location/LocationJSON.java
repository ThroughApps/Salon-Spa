package Location;

import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonInclude;

public class LocationJSON {

	private String location;
	private String address;
	private String companyId;
	private String status;
	private String oldLocation;
	private String oldAddress;
	ArrayList<LocationJSON> locationList;
	private String city;
	private String state;
	private String oldCity;
	private String oldState;
	private String flatNo;
	private String streetName;
	private String area;
	private String oldFlatNo;
	private String oldStreetName;
	private String oldArea;
	
	public String getLocation() {
		return location;
	}
	public void setLocation(String location) {
		this.location = location;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getOldLocation() {
		return oldLocation;
	}
	public void setOldLocation(String oldLocation) {
		this.oldLocation = oldLocation;
	}
	public String getOldAddress() {
		return oldAddress;
	}
	public void setOldAddress(String oldAddress) {
		this.oldAddress = oldAddress;
	}
	public ArrayList<LocationJSON> getLocationList() {
		return locationList;
	}
	public void setLocationList(ArrayList<LocationJSON> locationList) {
		this.locationList = locationList;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getState() {
		return state;
	}
	public void setState(String state) {
		this.state = state;
	}
	public String getOldCity() {
		return oldCity;
	}
	public void setOldCity(String oldCity) {
		this.oldCity = oldCity;
	}
	public String getOldState() {
		return oldState;
	}
	public void setOldState(String oldState) {
		this.oldState = oldState;
	}
	public String getFlatNo() {
		return flatNo;
	}
	public void setFlatNo(String flatNo) {
		this.flatNo = flatNo;
	}
	public String getStreetName() {
		return streetName;
	}
	public void setStreetName(String streetName) {
		this.streetName = streetName;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getOldFlatNo() {
		return oldFlatNo;
	}
	public void setOldFlatNo(String oldFlatNo) {
		this.oldFlatNo = oldFlatNo;
	}
	public String getOldStreetName() {
		return oldStreetName;
	}
	public void setOldStreetName(String oldStreetName) {
		this.oldStreetName = oldStreetName;
	}
	public String getOldArea() {
		return oldArea;
	}
	public void setOldArea(String oldArea) {
		this.oldArea = oldArea;
	}
	
}
