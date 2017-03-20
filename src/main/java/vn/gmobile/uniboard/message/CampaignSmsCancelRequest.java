package vn.gmobile.uniboard.message;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import com.base.filter.IntegerInFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.SystemParamGroup;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.db.CampaignHistoryDAO;
import vn.gmobile.uniboard.db.SndSchedulerDAO;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.CampaignHistory;
import vn.gmobile.uniboard.model.SndScheduler;



public class CampaignSmsCancelRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CampaignSmsCancelRequest(JSONObject jObj) throws Exception {
		super(jObj);
		JSONArray jsArr = jObj.getJSONArray(JsParams.CAMPAIGN_SMS_REMOVE_REQUEST.CAMPAIGN_LIST);
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
		CampaignSmsCancelResponse resp = new CampaignSmsCancelResponse();
		try {
			//remove campaign
			CampaignDAO _dao = new CampaignDAO();
			BeanFilter cFilter = new BeanFilter(Campaign.class);
			cFilter.setFilter(Campaign.CAMPAIGN_ID, new IntegerInFilter(_set));
			_dao.removeBeans(cFilter);
			//remove scheduler
			SndSchedulerDAO scheDao = new SndSchedulerDAO();
			BeanFilter sFilter = new BeanFilter(SndScheduler.class);
			sFilter.setFilter(SndScheduler.campaign_id, new IntegerInFilter(_set));
			scheDao.removeBeans(sFilter);
			//set campaign history, set status to "hủy"
			CampaignHistoryDAO hDao = new CampaignHistoryDAO();
			BeanFilter hFilter = new BeanFilter(CampaignHistory.class);
			hFilter.setFilter(CampaignHistory.CAMPAIGN_ID, new IntegerInFilter(_set));
			List<CampaignHistory> histories = hDao.getBeans(hFilter);
			for(CampaignHistory h : histories)
				h.set(CampaignHistory.STATUS, SystemParamGroup.CANCEL_CAMPAIGN);
			hDao.updateBeans(histories);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
	}
	return resp;
	}

}
