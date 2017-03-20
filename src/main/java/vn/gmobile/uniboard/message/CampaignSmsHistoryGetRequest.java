package vn.gmobile.uniboard.message;

import java.util.List;
import org.json.JSONObject;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.db.CampaignHistoryDAO;
import vn.gmobile.uniboard.model.CampaignHistory;

public class CampaignSmsHistoryGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CampaignSmsHistoryGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_filter =  new BeanFilter(CampaignHistory.class);
		if (jObj.has(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID))
			_filter.setFilter(CampaignHistory.CAMPAIGN_ID, new IntegerEqualFilter(jObj.getInt(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID)));
		if (jObj.has(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID))
			campaignId = jObj.getInt(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID);
	}

	BeanFilter _filter;
	Integer campaignId;
	
	@Override
	public JsonResponse execute() {
		CampaignSmsHistoryGetResponse resp = new CampaignSmsHistoryGetResponse();
		try {
			CampaignHistoryDAO dao = new CampaignHistoryDAO();
			List<CampaignHistory> smsBeans = dao.getCampaignSmsHistory(campaignId);
			resp.setCampaignList(smsBeans);
		resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
