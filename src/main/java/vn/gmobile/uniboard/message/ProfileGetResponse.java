package vn.gmobile.uniboard.message;

import org.json.JSONArray;
import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.Profile;


public class ProfileGetResponse extends JsonResponse {
	JSONArray _jsonProfiles;
	
	public ProfileGetResponse() {
		_jsonProfiles = new JSONArray();
	}
	

	public void addProfile(Profile profile) throws Exception {
		JSONObject jsProfile = JsonUtils.fromBeanToJson(profile);
		_jsonProfiles.put( jsProfile);
		write(JsParams.GET_PROFILE_RESPONSE.PROFILE_LIST, _jsonProfiles);
	}


}
