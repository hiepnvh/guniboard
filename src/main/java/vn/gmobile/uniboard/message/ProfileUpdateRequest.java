package vn.gmobile.uniboard.message;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.ProfileDAO;
import vn.gmobile.uniboard.model.Profile;



public class ProfileUpdateRequest extends JsonRequest {

	public ProfileUpdateRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONObject jsProfile = jObj.getJSONObject(JsParams.UPDATE_PROFILE_REQUEST.PROFILE);
		_profile =(Profile) JsonUtils.fromJsonToBean(jsProfile, Profile.class);
		JSONArray jsFunctions = jObj.getJSONArray(JsParams.UPDATE_PROFILE_REQUEST.FUNCTION_LIST);
		_functionIds =new  ArrayList<Integer>();
		for (int i=0;i<jsFunctions.length();i++) {
			_functionIds.add(jsFunctions.getInt(i));
		}
		
	}

	Profile  _profile;
	List<Integer> _functionIds;


	@Override
	public JsonResponse execute() {
		ProfileUpdateResponse resp = new ProfileUpdateResponse();
		try {
			ProfileDAO dao = new ProfileDAO();
			dao.updateProfile(_profile,_functionIds);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}
}
