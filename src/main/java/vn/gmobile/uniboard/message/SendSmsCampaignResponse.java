package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.SmsHistory;

public class SendSmsCampaignResponse extends JsonResponse {
	
	public SendSmsCampaignResponse() {
	}

	public void setSmsList(List<SmsHistory> smsList) throws Exception {
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(smsList);		
		write(JsParams.SEND_SMS_CAMPAIGN_RESPONSE.SMS_LIST, jArr);
	}
}
