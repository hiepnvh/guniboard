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

public class CampaignDAO {
	protected static final Logger LOGGER = Logger.getLogger(CampaignDAO.class.getName());
	
	public List<Campaign> getBean(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<Campaign> beans =  dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public Campaign getCampaign(Integer accId) throws Exception {
		BeanFilter  filter = new BeanFilter(Campaign.class);
//		filter.setFilter(Campaign.ACCOUNT_ID, new IntegerEqualFilter(accId));
		List<Campaign> beans = getBean(filter);
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return (new Campaign());
	}
	
	public Campaign getCampaignById(Integer id) throws Exception {
		BeanFilter  filter = new BeanFilter(Campaign.class);
		filter.setFilter(Campaign.CAMPAIGN_ID, new IntegerEqualFilter(id));
		List<Campaign> beans = getBean(filter);
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return (new Campaign());
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
	
	public void updateCampaign(Campaign campaign) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(campaign);
		dba.close();
	}
	
	public void updateCampaignHistory(CampaignHistory campaignHis) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(campaignHis);
		dba.close();
	}
	
	public void updateCampaignHistory(List<CampaignHistory> list) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(list);
		dba.close();
	}
	
	public void removeCampaign(Campaign Campaign) throws Exception{
		DbAdapter dba = new DbAdapter();
		dba.removeBean(Campaign);
		dba.close();
	}
	
	public void removeCampaign(Set<Campaign> _set) throws Exception{
		DbAdapter dba = new DbAdapter();
		for (Campaign bean : _set) {
			BeanFilter filter = new BeanFilter(CampaignHistory.class);
			filter.setFilter(CampaignHistory.CAMPAIGN_ID, new IntegerEqualFilter(bean.get(Campaign.CAMPAIGN_ID)));
			dba.removeBeans(filter);
			dba.removeBean(bean);
			
		}
		dba.close();
	}

	public void removeBeans(BeanFilter cFilter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.removeBeans(cFilter);
		dba.close();
	}
}
