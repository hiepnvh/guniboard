package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.Set;
import org.json.JSONArray;
import org.json.JSONObject;
import com.bean.json.JsonUtils;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.util.SubscriberFilter;

public class CampaignSmsAddRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CampaignSmsAddRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONObject jsCampaign = jObj.getJSONObject(JsParams.CAMPAIGN_SMS_ADD_REQUEST.CAMPAIGN);
		_campaign =(Campaign) JsonUtils.fromJsonToBean(jsCampaign, Campaign.class);
		
		JSONArray jsArr = jObj.getJSONArray(JsParams.CAMPAIGN_SMS_ADD_REQUEST.SMS_HIST_LIST);
		_set = new HashSet<String>();
		for (int i=0;i<jsArr.length();i++) {
			String msisdn = jsArr.getString(i).trim();
			if(SubscriberFilter.passFormat(msisdn))
				_set.add(msisdn);
		}
	}
	
	Campaign _campaign;
	Set<String> _set;
	
	@Override
	public JsonResponse execute() {
		CampaignSmsAddResponse resp = new CampaignSmsAddResponse();
		try {
			CampaignDAO _dao = new CampaignDAO();
			_dao.addCampaign(_campaign, _set);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
