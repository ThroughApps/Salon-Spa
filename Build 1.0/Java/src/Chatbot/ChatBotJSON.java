package Chatbot;


import java.util.ArrayList;

import Excel.ExcelJSON;

public class ChatBotJSON {
	private String emailId;
	private String userName;
	/*private Long mobileNo;*/
	private String mobileNo;
	private String city;
	private String country;
	private String comments;
	private String hardware;
	private String trial;
	private String software;
	private String id;
	private String date;
	private String fromDate;
	private String toDate;
	private String fileName;
	private String chatBotFileName;
	private String companyId;
	private String origin;
	private String sendTo;
	private String message;
	private int msgCount;
	private String type;
	
	private ArrayList<ChatBotJSON> chatbotList;
	private ArrayList<ChatBotJSON> countryList;
	private ArrayList<ChatBotJSON> originList;
	ArrayList<ChatBotJSON> returnXl = new ArrayList<ChatBotJSON>();
	
	
	
	public String getSendTo() {
		return sendTo;
	}
	public void setSendTo(String sendTo) {
		this.sendTo = sendTo;
	}
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public int getMsgCount() {
		return msgCount;
	}
	public void setMsgCount(int msgCount) {
		this.msgCount = msgCount;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public ArrayList<ChatBotJSON> getOriginList() {
		return originList;
	}
	public void setOriginList(ArrayList<ChatBotJSON> originList) {
		this.originList = originList;
	}
	public String getOrigin() {
		return origin;
	}
	public void setOrigin(String origin) {
		this.origin = origin;
	}
	public ArrayList<ChatBotJSON> getReturnXl() {
		return returnXl;
	}
	public void setReturnXl(ArrayList<ChatBotJSON> returnXl) {
		this.returnXl = returnXl;
	}
	public String getChatBotFileName() {
		return chatBotFileName;
	}
	public void setChatBotFileName(String chatBotFileName) {
		this.chatBotFileName = chatBotFileName;
	}
	public String getCompanyId() {
		return companyId;
	}
	public void setCompanyId(String companyId) {
		this.companyId = companyId;
	}
	public String getEmailId() {
		return emailId;
	}
	public void setEmailId(String emailId) {
		this.emailId = emailId;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getCity() {
		return city;
	}
	public void setCity(String city) {
		this.city = city;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getComments() {
		return comments;
	}
	public void setComments(String comments) {
		this.comments = comments;
	}
	public String getHardware() {
		return hardware;
	}
	public void setHardware(String hardware) {
		this.hardware = hardware;
	}
	public String getTrial() {
		return trial;
	}
	public void setTrial(String trial) {
		this.trial = trial;
	}
	public String getSoftware() {
		return software;
	}
	public void setSoftware(String software) {
		this.software = software;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public ArrayList<ChatBotJSON> getChatbotList() {
		return chatbotList;
	}
	public void setChatbotList(ArrayList<ChatBotJSON> chatbotList) {
		this.chatbotList = chatbotList;
	}
	public ArrayList<ChatBotJSON> getCountryList() {
		return countryList;
	}
	public void setCountryList(ArrayList<ChatBotJSON> countryList) {
		this.countryList = countryList;
	}
	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getFromDate() {
		return fromDate;
	}
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}
	public String getToDate() {
		return toDate;
	}
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}
	public String getFileName() {
		return fileName;
	}
	public void setFileName(String fileName) {
		this.fileName = fileName;
	}
	
	
}