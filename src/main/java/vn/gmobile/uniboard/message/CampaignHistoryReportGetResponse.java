package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;

import vn.gmobile.uniboard.conf.JsParams;

import com.bean.json.JsonUtils;


public class CampaignHistoryReportGetResponse extends JsonResponse {

	public CampaignHistoryReportGetResponse() {
	}
	
	public void setUrl(String url) throws Exception {
		write("url", url);
	}
	
}
