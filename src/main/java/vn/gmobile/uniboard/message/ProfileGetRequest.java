package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONObject;

import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.ProfileDAO;
import vn.gmobile.uniboard.model.Profile;


public class ProfileGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public ProfileGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_filter =  new BeanFilter(Profile.class);
		if (jObj.has(JsParams.GET_PROFILE_REQUEST.PROFILE_ID))
			_filter.setFilter(Profile.PROFILE_ID, new IntegerEqualFilter(jObj.getInt(JsParams.GET_PROFILE_REQUEST.PROFILE_ID)));
	}

	BeanFilter  _filter;
	


	@Override
	public JsonResponse execute() {
		ProfileGetResponse resp = new ProfileGetResponse();
		try {
			ProfileDAO dao = new ProfileDAO();
			List<Profile> beans = dao.getProfile(_filter);
			resp.setSuccess(true);
			for (Profile bean : beans) {
				resp.addProfile(bean);
			}
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}
	

}
