package vn.gmobile.uniboard.message;

import org.json.JSONArray;
import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.MenuFunction;


public class MenuFunctionGetResponse extends JsonResponse {
	JSONArray _jsonFunctions;
	
	public MenuFunctionGetResponse() {
		_jsonFunctions = new JSONArray();
	}
	

	public void addFunction(MenuFunction func) throws Exception {
		JSONObject jsFunction = JsonUtils.fromBeanToJson(func);
		_jsonFunctions.put(jsFunction);		
		write(JsParams.GET_FUNCTION_RESPONSE.FUNCTION_LIST, _jsonFunctions);		
	}


}
