package vn.gmobile.uniboard.db;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.logging.Logger;

import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;
import com.bean.util.BeanLogger;

import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirPermission;

public class CommonDirDAO {
	private static Logger LOGGER = Logger.getLogger(CommonDirDAO.class.getName());
	private List<CommonDir> allDirs = new ArrayList<CommonDir>();
	public List<CommonDir> getCommonDir(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<CommonDir> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateCommonDir(CommonDir _dir) throws Exception {
		DbAdapter dba = new DbAdapter();	
		dba.processBeans(_dir);
		dba.close();
	}
	
	public List<CommonDirPermission> getCommonDirPermission(BeanFilter filter) throws Exception {
		DbAdapter dba = new DbAdapter();	
		List<CommonDirPermission> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public void updateCommonDirPermission(Integer _userId, Set<Integer> _set) throws Exception {
		DbAdapter dba = new DbAdapter();
		BeanFilter filter = new BeanFilter(CommonDirPermission.class);
		filter.setFilter(CommonDirPermission.USER_ID, new IntegerEqualFilter(_userId));
		dba.removeBeans(filter);
		for (Integer dirId : _set) {
			CommonDirPermission record = new CommonDirPermission();
			record.set(CommonDirPermission.USER_ID, _userId);
			record.set(CommonDirPermission.DIR_ID, dirId);
			dba.processBeans(record);
		}
		dba.close();
	}
	
	public void removeCommonDir(CommonDir _dir) throws Exception{
		DbAdapter dba = new DbAdapter();
		BeanFilter _filter = new BeanFilter(CommonDir.class);
		_filter.setFilter(CommonDir.DIR_ID, new IntegerEqualFilter(_dir.get(CommonDir.DIR_ID)));
		dba.removeBeans(_filter);
		dba.close();
	}
	
	public CommonDir getCommonDir(Integer _dirId) throws Exception {
		DbAdapter dba = new DbAdapter();	
		BeanFilter filter =  new BeanFilter(CommonDir.class);
		filter.setFilter(CommonDir.DIR_ID, new IntegerEqualFilter(_dirId));
		List<CommonDir> beans = dba.getBeans(filter);
			if(beans!=null && beans.size()>0)
			{
				dba.close();
				return beans.get(0);
			}
		dba.close();
		return (new CommonDir());
	}
	
	public void addCommonDir(Set<CommonDir> _set) throws Exception{
		DbAdapter dba = new DbAdapter();	
		List<CommonDir> records = new ArrayList<CommonDir>(_set);
		dba.processBeans(records);
		dba.close();
	}
	
	public void removeCommonDir(Set<CommonDir> _set) throws Exception{
		DbAdapter dba = new DbAdapter();
		List<CommonDir> _list = new ArrayList<CommonDir>(_set);
		for(CommonDir record : _list)
			dba.removeBean(record);
		dba.close();
	}

	public List<CommonDir> getSubCommonDir(CommonDir dir) throws Exception {
		BeanFilter _filter = new BeanFilter(CommonDir.class);
		//get only child of current dir
//		_filter.setFilter(CommonDir.PARENT_DIR_ID, new IntegerEqualFilter(dir.get(CommonDir.DIR_ID)));;
		LOGGER.info(dir.get(CommonDir.DIR_ID) + "Dir ID");
		BeanLogger.createInstance(this.getClass()).info(dir);
		_filter.setFilter(CommonDir.PARENT_DIR_ID,new IntegerEqualFilter(dir.get(CommonDir.DIR_ID)));
		return getCommonDir(_filter);
	}
	public List<CommonDir> getAllSubDir(CommonDir dir) throws Exception{
		List<CommonDir> subs	=	getSubCommonDir(dir);
		allDirs.addAll(subs);
		if(subs.size()>0){
			for (CommonDir subDir : subs) {
				getAllSubDir(subDir);
//				List<CommonDir> _subs = getSubCommonDir(subDir);
//				allDirs.addAll(_subs);
			}
		}
		return allDirs;
	}
}
