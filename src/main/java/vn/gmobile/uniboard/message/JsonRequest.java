package vn.gmobile.uniboard.message;


import org.json.JSONObject;

import vn.gmobile.uniboard.conf.JsParams;

public  abstract class JsonRequest  {
	
	Integer _userId;
	
	public JsonRequest(JSONObject jObj) throws Exception {
		if (jObj.has(JsParams.GENERAL_REQUEST.USER_ID)) {
			_userId = jObj.getInt(JsParams.GENERAL_REQUEST.USER_ID);
		} else
			_userId = null;
	}
	
	public final Integer getUserId()  {
		return _userId;
	}
	
	public abstract JsonResponse execute() ;

	
}
