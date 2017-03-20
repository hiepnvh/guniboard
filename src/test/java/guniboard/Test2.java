package guniboard;

import java.util.ArrayList;
import java.util.List;

import org.json.JSONObject;

import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import com.gtel.kannel.db.SendSmsDAO;
import com.gtel.kannel.model.SendSms;

import vn.gmobile.uniboard.db.CommonDirDAO;
import vn.gmobile.uniboard.message.CampaignSmsCancelRequest;
import vn.gmobile.uniboard.message.CampaignSmsHistoryGetRequest;
import vn.gmobile.uniboard.message.CommonDirMemberAddFromExcelRequest;
import vn.gmobile.uniboard.message.CommonDirTreeGetRequest;
import vn.gmobile.uniboard.message.SendSmsCampaignRequest;
import vn.gmobile.uniboard.message.UserUpdateRequest;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirPermission;


public class Test2 {

	public static void main(String[] args) throws Exception {
		System.out.println("agag");
		// TODO Auto-generated method stub
//		JSONObject jObj = new JSONObject("{'dir':{'parent_dir_id':'40','name':'test3'}}");
//		CommonDirAddRequest req = new CommonDirAddRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'campaign_id':'171'}");
//		CampaignSmsHistoryGetRequest req = new CampaignSmsHistoryGetRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'user_id':'12','dir_id':'0','tree_type' : '2'}");
//		CommonDirTreeGetRequest req = new CommonDirTreeGetRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'common_dir_id_arr':['23'],'user_id':'1','user':{'user_id':'39','password':'e10adc3949ba59abbe56e057f20f883e','signature':'','profile_id':'1','mobile':'','name':'test test','active':'1','title':'','brandname':'','create_date':'13-Jul-2016','email':'','username':'test'}}");
//		UserUpdateRequest req = new UserUpdateRequest(jObj);
//		req.execute();
//		List<Integer> dirs = new ArrayList<>();
//		dirs.add(1);
//		
//		List<CommonDir> allDirAndSubs = new ArrayList<>();
//		for(int i = 0; i <dirs.size(); i++) {
//			List<CommonDir> dirAndSubs = getAllSubDirs(dirs.get(i));
//			allDirAndSubs.addAll(dirAndSubs);
//		}
//		for(CommonDir c : allDirAndSubs)
//			System.out.println(c.get(CommonDir.NAME));
//		JSONObject jObj = new JSONObject("{'user_id':'1','campaign_list':[219]}");
//		CampaignSmsCancelRequest req = new CampaignSmsCancelRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'dir_id':'64','file_path':'Members.xls','user_id':'1'}");
//		CommonDirMemberAddFromExcelRequest req = new CommonDirMemberAddFromExcelRequest(jObj);
//		req.execute();
//		SendSms ss = new SendSms();
//		ss.set(SendSms.SENDER, "test");
//		ss.set(SendSms.RECEIVER, "84996660008");
//		ss.set(SendSms.MSGDATA, "sdfsf");
//		SendSmsDAO d = new SendSmsDAO();
//		d.updateSendSms(ss);
//		ss.set(SendSms., val);
	}
	
	private static List<CommonDir> getAllSubDirs(int dirId) throws Exception{
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

	private static List<CommonDir> getSub(CommonDir dir) throws Exception {
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
