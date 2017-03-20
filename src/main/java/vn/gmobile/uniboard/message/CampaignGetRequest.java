package vn.gmobile.uniboard.message;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

import org.json.JSONObject;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.DateGreaterThanOrEqualFilter;
import com.base.filter.DateLessThanOrEqualFilter;
import com.base.filter.FilterCriteria;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.IsNullFilter;
import com.base.filter.StringLikeFilter;
import com.bean.base.BeanFilter;
import com.bean.db.DbParams;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.CampaignHistory;
import vn.gmobile.uniboard.model.MenuFunction;
import vn.gmobile.uniboard.model.ProfileFunctionRelation;
import vn.gmobile.uniboard.model.User;

public class CampaignGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public CampaignGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_filter =  new BeanFilter(Campaign.class);
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
		FilterCriteria dateCriteria = new FilterCriteria();
		if (jObj.has(JsParams.CAMPAIGN_GET_REQUEST.USER_ID))
			_filter.setFilter(Campaign.USER_ID, new IntegerEqualFilter(jObj.getInt(JsParams.CAMPAIGN_GET_REQUEST.USER_ID)));
		if (jObj.has(JsParams.CAMPAIGN_GET_REQUEST.sender)){
			BeanFilter  reFilter = new BeanFilter (User.class);
			reFilter.setFilter(User.USERNAME, new StringLikeFilter(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.sender)));
			BeanFilter filter = new BeanFilter (Campaign.class);
			_filter.setFilter(Campaign.USER_ID, new BeanInnerJoinFilter(reFilter));
//			_filter.setFilter(Campaign.USER_ID, new StringLikeFilter(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.sender)));
		}
		if (jObj.has(JsParams.CAMPAIGN_GET_REQUEST.receiver)){
			BeanFilter  reFilter = new BeanFilter (CampaignHistory.class);
			reFilter.setFilter(CampaignHistory.MSISDN, new StringLikeFilter(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.receiver)));
			BeanFilter filter = new BeanFilter (Campaign.class);
			_filter.setFilter(Campaign.CAMPAIGN_ID, new BeanInnerJoinFilter(reFilter));
//			_filter.setFilter(Campaign., new StringLikeFilter(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.receiver)));
		}
		if (jObj.has(JsParams.CAMPAIGN_GET_REQUEST.start_date)) {
			Date fromDate = sdf.parse(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.start_date));
			dateCriteria.addFilter(new DateGreaterThanOrEqualFilter(fromDate));
		}
		if (jObj.has(JsParams.CAMPAIGN_GET_REQUEST.end_date)) {
			Date toDate = sdf.parse(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.end_date));
			dateCriteria.addFilter(new DateLessThanOrEqualFilter(toDate));
		}
		_filter.setFilter(Campaign.PARENT_CAMPAIGN_ID,new IsNullFilter());
		_filter.setFilterCriteria(Campaign.SEND_DATE, dateCriteria);
		_start = Integer.parseInt(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.START));
		_limit = Integer.parseInt(jObj.getString(JsParams.CAMPAIGN_GET_REQUEST.LIMIT));
	}

	BeanFilter _filter;
	int _start, _limit;
	
	@Override
	public JsonResponse execute() {
		CampaignGetResponse resp = new CampaignGetResponse();
		try {
			CampaignDAO CampaignDAO = new CampaignDAO();
//			int count = CampaignDAO.getBean(_filter).size();
//			resp.setResults(count);
//			_filter.setFieldOrder(Campaign.CAMPAIGN_ID, DbParams.ORDER_TYPE.DESC);
//			_filter.setLimit(_start, _limit);
			_filter.setFieldOrder(Campaign.SEND_DATE, DbParams.ORDER_TYPE.DESC);
			_filter.setLimit(200);
			List<Campaign> smsBeans = CampaignDAO.getBean(_filter);
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
