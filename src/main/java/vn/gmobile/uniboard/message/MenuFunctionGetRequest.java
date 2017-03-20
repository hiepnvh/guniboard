package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONObject;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.MenuFunctionDAO;
import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.ProfileFunctionRelation;


public class MenuFunctionGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public MenuFunctionGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_filter =  new BeanFilter(MenuFunction.class);
		if (jObj.has(JsParams.GET_FUNCTION_REQUEST.PROFILE_ID)) {
			BeanFilter reFilter = new BeanFilter(ProfileFunctionRelation.class);
			reFilter.setFilter(ProfileFunctionRelation.PROFILE_ID, new IntegerEqualFilter(jObj.getInt(JsParams.GET_FUNCTION_REQUEST.PROFILE_ID)));
			_filter.setFilter(MenuFunction.FUNCTION_ID, new BeanInnerJoinFilter(reFilter));
		}
	}

	BeanFilter _filter;
	


	@Override
	public JsonResponse execute() {
		MenuFunctionGetResponse resp = new MenuFunctionGetResponse();
		try {
			MenuFunctionDAO dao = new MenuFunctionDAO();
			List<MenuFunction> beans = dao.getFunction(_filter);
			resp.setSuccess(true);
			for (MenuFunction bean : beans) {
				resp.addFunction(bean);
			}
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}
	

}
