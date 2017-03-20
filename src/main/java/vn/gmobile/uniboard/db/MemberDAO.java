/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.List;
import java.util.logging.Logger;

import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.Member;

public class MemberDAO {
	protected static final Logger LOGGER = Logger.getLogger(MemberDAO.class.getName());
	
	public List<Member> getBean(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<Member> beans =  dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public Member getMemByMsisdn(String s) throws Exception {
		BeanFilter  filter = new BeanFilter(Member.class);
		filter.setFilter(Member.MSISDN, new StringEqualFilter(s));
		filter.setFieldOrder(Member.CREATE_DATE, "DESC");
		List<Member> beans = getBean(filter);
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return (new Member());
	}
	
}
