/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.IntegerInFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.model.Member;
import vn.gmobile.uniboard.model.PrivateList;
import vn.gmobile.uniboard.model.PrivateListMember;


/**
 * @author QuangN
 *
 */
public class PrivateListMemberDAO {
	
	public List<PrivateListMember> getPrivateListMember(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<PrivateListMember> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public List<Member> getPrivateListMember(Set<Integer> lists) throws Exception {
		DbAdapter dba = new DbAdapter();	
		BeanFilter relFilter =  new BeanFilter(PrivateListMember.class);
		relFilter.setFilter(PrivateListMember.LIST_ID, new IntegerInFilter(lists));
		BeanFilter filter = new BeanFilter(Member.class);
		filter.setFilter(Member.MEMBER_ID, new BeanInnerJoinFilter(relFilter));
		List<Member> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public List<Member> getPrivateListMember(Integer _listId) throws Exception {
		DbAdapter dba = new DbAdapter();	
		BeanFilter relFilter =  new BeanFilter(PrivateListMember.class);
		relFilter.setFilter(PrivateListMember.LIST_ID, new IntegerEqualFilter(_listId));
		BeanFilter filter = new BeanFilter(Member.class);
		filter.setFilter(Member.MEMBER_ID, new BeanInnerJoinFilter(relFilter));
		List<Member> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void addPrivateListMember(Integer _listId, Set<Member> _set) throws Exception{
		DbAdapter dba = new DbAdapter();	
		List<PrivateListMember> records = new ArrayList<PrivateListMember>();
		for (Member mem : _set) {
			PrivateListMember record = new PrivateListMember();
			record.set(PrivateListMember.LIST_ID, _listId);
			record.set(PrivateListMember.MEMBER_ID, mem.get(Member.MEMBER_ID));
			records.add(record);
		}
		dba.processBeans(records);
		dba.close();
	}
	
	public void removePrivateListMember(Integer _listId, Set<Member> _set) throws Exception{
		DbAdapter dba = new DbAdapter();	
//		List<PrivateListMember> records = new ArrayList<PrivateListMember>();
		for (Member mem : _set) {
//			dba.processBeans(mem);
			PrivateListMember record = new PrivateListMember();
			record.set(PrivateListMember.LIST_ID, _listId);
			record.set(PrivateListMember.MEMBER_ID, mem.get(Member.MEMBER_ID));
			dba.removeBean(record);
//			records.add(record);
		}
//		dba.processBeans(records);
		dba.close();
	}

	public List<Member> getAllPrivateListMember(Integer _userId) throws Exception {
		DbAdapter dba = new DbAdapter();
		PrivateListDAO dao = new PrivateListDAO();
		BeanFilter relFilter =  new BeanFilter(PrivateList.class);
		relFilter.setFilter(PrivateList.USER_ID, new IntegerEqualFilter(_userId));
		List<PrivateList> list = dao.getPrivateList(relFilter);
		
		Set<Integer> _set = new HashSet<Integer>();
		for (PrivateList i : list) {
			_set.add(i.get(PrivateList.LIST_ID));
		}
		
		BeanFilter relFilterM =  new BeanFilter(PrivateListMember.class);
		relFilterM.setFilter(PrivateListMember.LIST_ID, new IntegerInFilter(_set));
		
		BeanFilter filter = new BeanFilter(Member.class);
		filter.setFilter(Member.MEMBER_ID, new BeanInnerJoinFilter(relFilterM));
		List<Member> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
}
