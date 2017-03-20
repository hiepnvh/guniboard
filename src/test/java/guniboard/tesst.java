package guniboard;

import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.json.JSONObject;

import com.base.filter.DateGreaterThanOrEqualFilter;
import com.base.filter.DateLessThanOrEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.db.SndDAO;
import vn.gmobile.uniboard.db.SndSchedulerDAO;
import vn.gmobile.uniboard.message.CampaignGetRequest;
import vn.gmobile.uniboard.message.CampaignSmsHistoryGetRequest;
import vn.gmobile.uniboard.message.CommonDirMemberAddFromExcelRequest;
import vn.gmobile.uniboard.message.PrivateListAddRequest;
import vn.gmobile.uniboard.message.PrivateListGetRequest;
import vn.gmobile.uniboard.message.PrivateListMemberGetRequest;
import vn.gmobile.uniboard.message.SendSmsCampaignRequest;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.Snd;
import vn.gmobile.uniboard.model.SndScheduler;

public class tesst {

	public static void main(String[] args) throws Exception {
//		System.out.println("sdfsdf");
//		JSONObject jObj = new JSONObject("{'user_id':'1','private_list':[{'user_id':'1','name':'xxx','description':'xxxx'}]}");
//		PrivateListAddRequest req = new PrivateListAddRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'list_id':[10],'user_id':'1','format':'json','start':'0','limit':'25','page':'1','_dc':'1467188900752'}");
//		PrivateListMemberGetRequest req = new PrivateListMemberGetRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'end_date':'30-Jun-2016 00:00:00','receiver':'1819','user_id':'1','sender':'adm','format':'json','start':'0','limit':'25','page':'1','_dc':'1467293150456','start_date':'31-May-2016 00:00:00'}");
//		CampaignGetRequest req = new CampaignGetRequest(jObj);
//		req.execute();
//		JSONObject jObj = new JSONObject("{'file_path':'1467360494354_Book1.xls','user_id':'1','dir_id':'38'}");
//		CommonDirMemberAddFromExcelRequest req = new CommonDirMemberAddFromExcelRequest(jObj);
//		req.execute();
		
//		JSONObject jObj = new JSONObject("{'user_id':'1','campaign':{'user_id':'1','text':'nguyễn viết','shortcode':'test1','title':'ssssssss'},'dir_list':[],'msisdn':['84996660008']}");
//		SendSmsCampaignRequest req = new SendSmsCampaignRequest(jObj);
//		req.execute();
		String s = "hiệp nguyễn";
		System.out.println(URLEncoder.encode(s,"UTF-8"));
//		Date now = new Date();
//		String s = "6-Jul-2016 18:35:00";
//		SimpleDateFormat sdf = new SimpleDateFormat("dd-MMM-yyyy HH:mm:ss");
//		Date dnow = sdf.parse(s);
//	
//		SndSchedulerDAO dao = new SndSchedulerDAO();
//		BeanFilter filter = new BeanFilter(SndScheduler.class);
//		filter.setFilter(SndScheduler.sentat, new DateLessThanOrEqualFilter(dnow));
////		filter.setFilter(SndScheduler.campaign_id, new IntegerEqualFilter(campaign_id));
//		List<SndScheduler> sches = dao.getBeans(filter);
//		System.out.println(sches.size());
//		List<Snd> snds = new ArrayList<Snd>();
//		for (SndScheduler sndScheduler : sches) {
//			System.out.println(sndScheduler.get(SndScheduler.sentat));
//			Snd snd = new Snd();
//			snd.set(Snd.snd_from, sndScheduler.get(SndScheduler.from));
//			snd.set(Snd.snd_to, sndScheduler.get(SndScheduler.to));
//			snd.set(Snd.snd_txt, sndScheduler.get(SndScheduler.txt));
//			snd.set(Snd.snd_last, 0);
//			snd.set(Snd.snd_batch_id, sndScheduler.get(SndScheduler.campaign_id));
//			snds.add(snd);
//		}*/
		//insert pending sms to kannel
//		SndDAO sndDao = new SndDAO();
//		sndDao.updateBeans(snds);
		//remove sndscheduler
//		dao.removeBeans(filter);
	}

}
