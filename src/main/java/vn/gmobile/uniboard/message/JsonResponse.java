package vn.gmobile.uniboard.message;


import org.json.JSONObject;

import vn.gmobile.uniboard.conf.JsParams;


public  class JsonResponse  {
	JSONObject _jObj;
	Boolean _success;
	String _info;
	
	public JsonResponse() {
		_jObj = new JSONObject();
	}
	
	public void setSuccess(Boolean val)  {
		_success = val;
		try {
			write(JsParams.GENERAL_RESPONSE.SUCCESS,val);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


	
	public void setInfo(String val)  {
		_info = val;
		try {
			write(JsParams.GENERAL_RESPONSE.INFO,val);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}


	
	protected final void  write(String name,Object val) throws Exception {
		_jObj.put(name, val);
	}
	
	protected final void  write(String name,JSONObject val) throws Exception {
		_jObj.put(name, val);
	}
	
	public JSONObject getJsonObject() {
		return _jObj;
	}
}
