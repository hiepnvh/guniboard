/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import vn.gmobile.uniboard.conf.Consts.SMS_STATUS;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.CampaignHistory;
import vn.gmobile.uniboard.model.Snd;

public class CampaignHistoryDAO {
	protected static final Logger LOGGER = Logger.getLogger(CampaignHistoryDAO.class.getName());
	
	public List<CampaignHistory> getBeans(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<CampaignHistory> beans =  dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateBean(CampaignHistory bean) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(bean);
		dba.close();
	}
	
	public void updateBeans(List<CampaignHistory> beans) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(beans);
		dba.close();
	}
	
	public void removeBean(CampaignHistory bean) throws Exception{
		DbAdapter dba = new DbAdapter();
		dba.removeBean(bean);
		dba.close();
	}
	
	public void addCampaign(Campaign campaign, Set<String> set) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(campaign);
		int campaign_id = campaign.get(Campaign.CAMPAIGN_ID);
		List<CampaignHistory> beans = new ArrayList<CampaignHistory>();
		for (String msisdn : set) {
			CampaignHistory record = new CampaignHistory();
			record.set(CampaignHistory.CAMPAIGN_ID, campaign_id);
			record.set(CampaignHistory.MSISDN, msisdn);
			record.set(CampaignHistory.STATUS, SMS_STATUS.UNKNOW);
			beans.add(record);
		}
		dba.processBeans(beans);
		dba.close();
	}
	
	public List<CampaignHistory> getCampaignSmsHistory(Integer campaignId) throws Exception {
		DbAdapter dba = new DbAdapter();
		
		BeanFilter filter = new BeanFilter(Snd.class);
		filter.setFilter(Snd.snd_batch_id, new IntegerEqualFilter(campaignId));
		List<Snd> sndList = dba.getBeans(filter);
		
		List<CampaignHistory> chList = new ArrayList<CampaignHistory>();
		for (Snd snd : sndList) {
			CampaignHistory bean = new CampaignHistory();
			bean.set(CampaignHistory.CAMPAIGN_ID, snd.get(Snd.snd_batch_id));
			bean.set(CampaignHistory.MSISDN, snd.get(Snd.snd_to));
			bean.set(CampaignHistory.STATUS, snd.get(Snd.snd_status));
			chList.add(bean);
		}
		dba.processBeans(chList);
		
		
		// get camgpaign by campaign id
//		BeanFilter filter = new BeanFilter(Campaign.class);
//		filter.setFilter(Campaign.CAMPAIGN_ID, new IntegerEqualFilter(campaignId));
//		
//		// get children campaign
//		BeanFilter filterChildren = new BeanFilter(Campaign.class);
//		filterChildren.setFilter(Campaign.PARENT_CAMPAIGN_ID, new IntegerEqualFilter(campaignId));
//		List<Campaign> beanChildren =  dba.getBeans(filterChildren);
//		
//		List<CampaignHistory> beansHis =  new ArrayList<CampaignHistory>();
//		
//		// have at least one child
//		// find newest child
//		if(beanChildren.size()>0) {
//			Campaign newestChild = new Campaign();
//			newestChild.set(Campaign.CAMPAIGN_ID, 0);
//			for (Campaign child : beanChildren) {
//				if(child.get(Campaign.CAMPAIGN_ID) > newestChild.get(Campaign.CAMPAIGN_ID))
//					newestChild = child;
//			}
//			// get campaign data newest child
//		}
		
		List<CampaignHistory> beansHis =  new ArrayList<CampaignHistory>();
		BeanFilter filterHis = new BeanFilter(CampaignHistory.class);
		filterHis.setFilter(CampaignHistory.CAMPAIGN_ID, new IntegerEqualFilter(campaignId));
		beansHis = dba.getBeans(filterHis);
		
		dba.close();
		return beansHis;
	}
}
