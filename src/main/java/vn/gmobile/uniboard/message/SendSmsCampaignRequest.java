package vn.gmobile.uniboard.message;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONArray;
import org.json.JSONObject;

import java.util.logging.Logger;

import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import com.bean.json.JsonUtils;

import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.db.CommonDirMemberDAO;
import vn.gmobile.uniboard.db.SndDAO;
import vn.gmobile.uniboard.db.SndSchedulerDAO;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirPermission;
import vn.gmobile.uniboard.model.Member;
import vn.gmobile.uniboard.model.Snd;
import vn.gmobile.uniboard.model.SndScheduler;
import vn.gmobile.uniboard.util.SubscriberFilter;
import vn.gmobile.uniboard.web.ActionServlet;

public class SendSmsCampaignRequest extends JsonRequest {
	
	protected static final Logger LOGGER = Logger.getLogger(ActionServlet.class
			.getName());

	/**
	 * @param jObj
	 * @throws Exception 
	 */
	public SendSmsCampaignRequest(JSONObject jObj) throws Exception {
		super(jObj);
		if (jObj.has(JsParams.SEND_SMS_CAMPAIGN_REQUEST.USER_ID))
			userId = jObj.getInt(JsParams.SEND_SMS_CAMPAIGN_REQUEST.USER_ID);
		JSONObject jsCampaign = jObj.getJSONObject(JsParams.SEND_SMS_CAMPAIGN_REQUEST.CAMPAIGN);
		_campaign =(Campaign) JsonUtils.fromJsonToBean(jsCampaign, Campaign.class);
		
		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
		if (jsCampaign.has(JsParams.SEND_SMS_CAMPAIGN_REQUEST.send_date)){
			_send_date = sdf.parse(jsCampaign.getString(JsParams.SEND_SMS_CAMPAIGN_REQUEST.send_date));
			_campaign.set(Campaign.SEND_DATE, _send_date);
		}
		
		JSONArray jsDirArr = jObj.getJSONArray(JsParams.SEND_SMS_CAMPAIGN_REQUEST.DIR_LIST);
		dir_list = new ArrayList<Integer>();
		_set = new HashSet<String>();
		for(int i = 0; i <jsDirArr.length();i ++){
			dir_list.add(jsDirArr.getInt(i));
		}
		//Load all member from dir list given
		///////Load all sub dirs of given dirs
		List<CommonDir> allDirAndSubs = new ArrayList<CommonDir>();
		for(int i = 0; i <dir_list.size(); i++) {
			List<CommonDir> dirAndSubs = getAllSubDirs(dir_list.get(i));
			allDirAndSubs.addAll(dirAndSubs);
		}
		Set<Integer> dirSet = new HashSet<Integer>();
		for(CommonDir c : allDirAndSubs)
			dirSet.add(c.get(CommonDir.DIR_ID));
		///////Load all mems
		CommonDirMemberDAO _dao = new CommonDirMemberDAO();
		List<Member> memList = _dao.getCommonDirMember(dirSet);
		///////Add all to set
		if(memList.size()>0){
			for(Member mem : memList)
				_set.add(mem.get(Member.MSISDN));
		}		
		
		JSONArray jsArr = jObj.getJSONArray(JsParams.SEND_SMS_CAMPAIGN_REQUEST.MSISDN);
		
		for (int i=0;i<jsArr.length();i++) {
			String msisdnTmp = jsArr.getString(i).trim();
			if(SubscriberFilter.passFormat(msisdnTmp))
				_set.add(msisdnTmp);
		}
		
		
	}

	Campaign _campaign;
	Set<String> _set;
	Date _send_date;
	List<Integer> dir_list;
	Integer userId;
	
	@Override
	public JsonResponse execute() {
		SendSmsCampaignResponse resp = new SendSmsCampaignResponse();
		try {
			/* ADD CAMPAIGN REQUEST */
			CampaignDAO _dao = new CampaignDAO();
			_dao.addCampaign(_campaign, _set);
			
			String from = _campaign.get(Campaign.SHORTCODE);
//			String text = TextUtils.stripAccents(_campaign.get(Campaign.TEXT));
			String text = _campaign.get(Campaign.TEXT);
			int campaign_id = _campaign.get(Campaign.CAMPAIGN_ID);
			
			//Check input date, send to kannel if null or create schedulde else
			if(_send_date == null){
				/*INSERT INTO DATABASE KANNEL*/
				SndDAO dao = new SndDAO();
				List<Snd> beans = new ArrayList<Snd>();
				for (String msisdn : _set) {
					Snd bean = new Snd();
					bean.set(Snd.snd_from, from);
					bean.set(Snd.snd_to, msisdn);
					bean.set(Snd.snd_txt, text);
					bean.set(Snd.snd_last, 0);
					bean.set(Snd.snd_batch_id, campaign_id);
					beans.add(bean);
				}
				dao.updateBeans(beans);
			}
			else {
				/*create schedule*/
				SndSchedulerDAO dao = new SndSchedulerDAO();
				
				List<SndScheduler> beans = new ArrayList<SndScheduler>();
				
				//insert into scheduler table
				for (String msisdn : _set) {
					SndScheduler bean = new SndScheduler();
					bean.set(SndScheduler.campaign_id,campaign_id);
					bean.set(SndScheduler.from, from);
					bean.set(SndScheduler.to, msisdn);
					bean.set(SndScheduler.txt, text);
					bean.set(SndScheduler.sentat, _send_date);
//					bean.set(Snd.snd_last, 0);
//					bean.set(Snd.snd_batch_id, campaign_id);
					beans.add(bean);
				}
				dao.updateBeans(beans);
			}
			
			
//			SendSmsDAO dao = new SendSmsDAO();
//			List<String> msisdnList = new ArrayList<String>();
//			for (String msisdn : _set) {
//				msisdnList.add(msisdn);
//			}
//			SendSms sms = new SendSms();
//			sms.set(SendSms.SENDER, _campaign.get(Campaign.SHORTCODE));
//			sms.set(SendSms.MSGDATA, TextUtils.stripAccents(_campaign.get(Campaign.TEXT)));
//			dao.updateSendSms(sms, msisdnList);
			
			resp.setSuccess(true);
	} catch (Exception exc) {
		exc.printStackTrace();
		resp.setSuccess(false);
		resp.setInfo(exc.getMessage());
		
	}
	return resp;
	}
	
	private List<CommonDir> getAllSubDirs(int dirId) throws Exception{
		List<CommonDir> allDirs = new ArrayList<CommonDir>();
		BeanFilter _filter = new BeanFilter(CommonDir.class);
		_filter.setFilter(CommonDir.DIR_ID, new IntegerEqualFilter(dirId));
		//load common dirs have parent is current dir
		CommonDirDAO dao = new CommonDirDAO();
		List<CommonDir> list = dao.getCommonDir(_filter);
		allDirs.addAll(list);
		for (CommonDir dir : list) {
			List<CommonDir> subs = getSub(dir);
			allDirs.addAll(subs);
		}
		return allDirs;
		
	}

	private List<CommonDir> getSub(CommonDir dir) throws Exception {
		List<CommonDir> allSubDirs = new ArrayList<CommonDir>();
		CommonDirDAO dirDao = new CommonDirDAO();
		List<CommonDir> subDirList = dirDao.getSubCommonDir(dir);
		allSubDirs.addAll(subDirList);
		for (CommonDir subDir : subDirList) {
			List<CommonDir> subs = getSub(subDir);
			allSubDirs.addAll(subs);
		}
		return allSubDirs;
	}

}

