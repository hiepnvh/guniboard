package vn.gmobile.uniboard.db;

import java.util.List;

import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.SndScheduler;

public class SndSchedulerDAO {
	
	public List<SndScheduler> getBeans(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<SndScheduler> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateBean(SndScheduler bean) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.processBeans(bean);
		dba.close();
	}
	
	public void updateBeans(List<SndScheduler> beans) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.processBeans(beans);
		dba.close();
	}
	
	public void removeBeans(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.removeBeans(filter);
		dba.close();
	}
}
