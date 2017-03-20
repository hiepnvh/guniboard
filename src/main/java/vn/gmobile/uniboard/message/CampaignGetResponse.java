package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;

import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.model.Campaign;

public class CampaignGetResponse extends JsonResponse {
	
	public CampaignGetResponse() {
	}

	public void setCampaignList(List<Campaign> list) throws Exception {
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(list);		
		write(JsParams.CAMPAIGN_GET_RESPONSE.CAMPAIGN_LIST, jArr);
		System.out.println(jArr);
	}

	public void setResults(Integer results) throws Exception {
//		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(moList);		
		write(JsParams.CAMPAIGN_GET_RESPONSE.RESULTS, results);

	}
}
