package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.base.filter.IntegerInFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.model.Campaign;



public class CampaignSmsRemoveRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CampaignSmsRemoveRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONArray jsArr = jObj.getJSONArray(JsParams.CAMPAIGN_SMS_REMOVE_REQUEST.CAMPAIGN_LIST);
//		_set = new HashSet<Campaign>();
//		for (int i=0;i<jsArr.length();i++) {
//			JSONObject jsObj = new JSONObject(jsArr.get(i).toString());
//			Campaign _record =(Campaign) JsonUtils.fromJsonToBean(jsObj, Campaign.class);
//			_set.add(_record);
//		}
		_set = new HashSet<Integer>();
		for (int i=0;i<jsArr.length();i++) {
//			JSONObject jsObj = new JSONObject(jsArr.get(i).toString());
//			Campaign _record =(Campaign) JsonUtils.fromJsonToBean(jsObj, Campaign.class);
			_set.add(jsArr.getInt(i));
		}
	}
	
	Set<Integer> _set;
	
	@Override
	public JsonResponse execute() {
		CampaignSmsAddResponse resp = new CampaignSmsAddResponse();
		try {
//			CampaignDAO _dao = new CampaignDAO();
//			_dao.removeCampaign(_set);
			CampaignDAO _dao = new CampaignDAO();
			BeanFilter cFilter = new BeanFilter(Campaign.class);
			cFilter.setFilter(Campaign.CAMPAIGN_ID, new IntegerInFilter(_set));
			_dao.removeBeans(cFilter);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
