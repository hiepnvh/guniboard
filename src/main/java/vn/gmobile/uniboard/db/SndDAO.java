package vn.gmobile.uniboard.db;

import java.util.List;
import com.bean.base.BeanFilter;
import vn.gmobile.uniboard.model.Snd;

public class SndDAO {
	
	public List<Snd> getBeans(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<Snd> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateBean(Snd bean) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.processBeans(bean);
		dba.close();
	}
	
	public void updateBeans(List<Snd> beans) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.processBeans(beans);
		dba.close();
	}
}
