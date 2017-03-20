package vn.gmobile.uniboard.message;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.json.JSONObject;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.ServerConfig;
import vn.gmobile.uniboard.model.CampaignHistory;
import vn.gmobile.uniboard.report.CampaignHistoryReportBuilder;

import com.base.filter.DateGreaterThanOrEqualFilter;
import com.base.filter.DateLessThanOrEqualFilter;
import com.base.filter.FilterCriteria;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.StringEqualFilter;
import com.base.filter.StringLikeFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;



public class CampaignHistoryReportGetRequest extends JsonRequest {

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	BeanFilter _filter;
	Integer campaignId;
	String _send_date;
	
	private static Logger LOGGER = Logger.getLogger(CampaignHistoryReportGetRequest.class.getName());
	
	public CampaignHistoryReportGetRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_filter = new BeanFilter(CampaignHistory.class); 
		if(jObj.has(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID)){
			_filter.setFilter(CampaignHistory.CAMPAIGN_ID, new IntegerEqualFilter(jObj.getInt(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID)));
			campaignId = jObj.getInt(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.CAMPAIGN_ID);
		}
		if(jObj.has(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.SEND_DATE)){
			_send_date = jObj.getString(JsParams.CAMPAIGN_SMS_HISTORY_GET_REQUEST.SEND_DATE);
		}
	}
	
	
	@Override
	public JsonResponse execute() {
		CampaignHistoryReportGetResponse resp = new CampaignHistoryReportGetResponse();
		
		try {
			String filename = "Baocao-" + campaignId + ".xlsx";
			CampaignHistoryReportBuilder builder = new CampaignHistoryReportBuilder(campaignId,_send_date);
			builder.buildExcelReport(ServerConfig.getPhysicalDir() +filename);
			String url = ServerConfig.getVirtualDir()+filename;
			resp.setUrl(url);
			resp.setSuccess(true);
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}

}
