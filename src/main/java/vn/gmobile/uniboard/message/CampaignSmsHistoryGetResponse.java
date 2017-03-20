package vn.gmobile.uniboard.message;

import java.util.List;

import org.json.JSONArray;
import org.json.JSONObject;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.db.DbAdapter;
import vn.gmobile.uniboard.db.MemberDAO;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.CampaignHistory;
import vn.gmobile.uniboard.model.Member;
import vn.gmobile.uniboard.model.User;

public class CampaignSmsHistoryGetResponse extends JsonResponse {
	
	public CampaignSmsHistoryGetResponse() {
	}

	public void setCampaignList(List<CampaignHistory> list) throws Exception {
		JSONArray jArr = JsonUtils.fromBeanListToJsonArray(list);
		DbAdapter dba = new DbAdapter();
		
		JSONArray _jArr = new JSONArray();
		for(int i = 0;i<jArr.length();i++){
			JSONObject jObj = jArr.getJSONObject(i);
			int campaignId = jObj.getInt("campaign_id");
//			CampaignDAO cdao = new CampaignDAO();
//			Campaign c = cdao.getCampaignById(campaignId);
//			int userid = c.get(Campaign.USER_ID);
			
			//get sender name
			BeanFilter  relFilter = new BeanFilter(Campaign.class);
			relFilter.setFilter(Campaign.CAMPAIGN_ID, new IntegerEqualFilter(campaignId));
			BeanFilter filter = new BeanFilter(User.class);
			filter.setFilter(User.USER_ID, new BeanInnerJoinFilter(relFilter));
			List<User> beans = dba.getBeans(filter);
			User u = beans.get(0);
			
			//get receiver name
			MemberDAO mDao = new MemberDAO();
			Member mem = mDao.getMemByMsisdn(jObj.getString("msisdn"));
			
			jObj.put("username", u.get(User.USERNAME));
			jObj.put("name", u.get(User.NAME));
			jObj.put("receive_name", mem.get(Member.NAME));
			
			_jArr.put(jObj);
		}
		System.out.println(_jArr);
		write(JsParams.CAMPAIGN_SMS_HISTORY_GET_RESPONSE.SMS_HIST_LIST, _jArr);
		dba.close();
	}
}
