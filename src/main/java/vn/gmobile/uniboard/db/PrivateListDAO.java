/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.PrivateList;

/**
 *
 */
public class PrivateListDAO {
	
	public List<PrivateList> getPrivateList(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<PrivateList> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public List<PrivateList> getPrivateList(Integer _userId) throws Exception {
		DbAdapter dba = new DbAdapter();	
		BeanFilter filter =  new BeanFilter(PrivateList.class);
		filter.setFilter(PrivateList.USER_ID, new IntegerEqualFilter(_userId));
		List<PrivateList> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void addPrivateList(Set<PrivateList> _set) throws Exception{
		DbAdapter dba = new DbAdapter();	
		List<PrivateList> records = new ArrayList<PrivateList>(_set);
		dba.processBeans(records);
		dba.close();
	}
	
	public void removePrivateList(Set<PrivateList> _set) throws Exception{
		DbAdapter dba = new DbAdapter();
		List<PrivateList> _list = new ArrayList<PrivateList>(_set);
		for(PrivateList record : _list)
			dba.removeBean(record);
		dba.close();
	}
}
