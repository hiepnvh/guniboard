/**
 * 
 */
package vn.gmobile.uniboard.db;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import java.util.Set;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.IntegerInFilter;
import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.conf.ServerConfig;
import vn.gmobile.uniboard.model.CommonDir;
import vn.gmobile.uniboard.model.CommonDirMember;
import vn.gmobile.uniboard.model.Member;
import vn.gmobile.uniboard.model.PrivateListMember;
import vn.gmobile.uniboard.util.SubscriberFilter;

public class CommonDirMemberDAO {

	public List<CommonDirMember> getCommonDirMember(BeanFilter filter)
			throws Exception {
		DbAdapter dba = new DbAdapter();
		List<CommonDirMember> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}

	public void updateCommonDir(CommonDir _dir) throws Exception {
		DbAdapter dba = new DbAdapter();
		dba.processBeans(_dir);
		dba.close();
	}

	public List<Member> getCommonDirMember(Integer _dirId) throws Exception {
		DbAdapter dba = new DbAdapter();
		BeanFilter relFilter = new BeanFilter(CommonDirMember.class);
		relFilter.setFilter(CommonDirMember.DIR_ID, new IntegerEqualFilter(
				_dirId));
		BeanFilter filter = new BeanFilter(Member.class);
		filter.setFilter(Member.MEMBER_ID, new BeanInnerJoinFilter(relFilter));
		List<Member> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}
	
	public List<Member> getCommonDirMember(Set<Integer> dirIds) throws Exception {
		if(dirIds.size()==0)
			return new ArrayList<Member>();
		DbAdapter dba = new DbAdapter();
		BeanFilter relFilter = new BeanFilter(CommonDirMember.class);
		relFilter.setFilter(CommonDirMember.DIR_ID, new IntegerInFilter(dirIds));
		BeanFilter filter = new BeanFilter(Member.class);
		filter.setFilter(Member.MEMBER_ID, new BeanInnerJoinFilter(relFilter));
		List<Member> beans = dba.getBeans(filter);
		dba.close();
		return beans;
	}

	public void addCommonDirMember(Integer _dirId, Set<Member> _set) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<CommonDirMember> records = new ArrayList<CommonDirMember>();
		for (Member mem : _set) {
			dba.processBeans(mem);
			CommonDirMember record = new CommonDirMember();
			record.set(CommonDirMember.DIR_ID, _dirId);
			record.set(CommonDirMember.MEMBER_ID, mem.get(Member.MEMBER_ID));
			record.set(CommonDirMember.MSISDN, mem.get(Member.MSISDN));
			records.add(record);

		}
		dba.processBeans(records);
		dba.close();
//		
//		if (mem.get(Member.MEMBER_ID) != null) {
//			//update mem, dir_mem
//			mem.set(Member.CREATE_DATE, new Date());
//			dba.processBeans(mem);
//			CommonDirMemberDAO cmdDao = new CommonDirMemberDAO();
//			BeanFilter cmdFilter = new BeanFilter(Member.class);
//			cmdFilter.setFilter(Member.MEMBER_ID, new IntegerEqualFilter(mem.get(Member.MEMBER_ID)));
//			cmdFilter.setFilter(Member., new IntegerEqualFilter(mem.get(Member.MEMBER_ID)));
//			CommonDirMember cdm = cmdDao.getByMsisdnAndDir(mem.get(Member.MSISDN), _dirId);
//			cdm.set
//		} else {
//			//new mem, dir_mem
//			dba.processBeans(mem);
//			List<CommonDirMember> records = new ArrayList<CommonDirMember>();
//			CommonDirMember record = new CommonDirMember();
//			record.set(CommonDirMember.DIR_ID, _dirId);
//			record.set(CommonDirMember.MEMBER_ID, mem.get(Member.MEMBER_ID));
//			record.set(CommonDirMember.MSISDN, mem.get(Member.MSISDN));
////			record.set(CommonDirMember.MSISDN, mem.get(Member.MSISDN));
//			records.add(record);
//			dba.processBeans(records);
//			dba.close();
//		}
	}

	public void removeCommonDirMember(Integer _dirId, Set<Member> _set) throws Exception {
		DbAdapter dba = new DbAdapter();
		for (Member mem : _set) {
//			Remove from Common Dir
			BeanFilter _filterCDMem = new BeanFilter(CommonDirMember.class);
			_filterCDMem.setFilter(CommonDirMember.MEMBER_ID, new IntegerEqualFilter(mem.get(Member.MEMBER_ID)));
			dba.removeBeans(_filterCDMem);
			
//			Remove from Private List
			BeanFilter _filterPLMem = new BeanFilter(PrivateListMember.class);
			_filterPLMem.setFilter(PrivateListMember.MEMBER_ID, new IntegerEqualFilter(mem.get(Member.MEMBER_ID)));
			dba.removeBeans(_filterPLMem);
			
//			Remove from Member
			BeanFilter _filterMem = new BeanFilter(Member.class);
			_filterMem.setFilter(Member.MEMBER_ID, new IntegerEqualFilter(mem.get(Member.MEMBER_ID)));
			dba.removeBeans(_filterMem);
		}
		dba.close();
	}

	public String addCommonDirMemberFromExcel(Integer _dirId, String _filePath) {
		try {

			DbAdapter dba = new DbAdapter();
			List<CommonDirMember> records = new ArrayList<CommonDirMember>();

			FileInputStream file = new FileInputStream(new File(ServerConfig.getPhysicalDir()+_filePath));
			
			System.out.println(ServerConfig.getPhysicalDir()+_filePath);

			// Get the workbook instance for XLS file
			HSSFWorkbook workbook = new HSSFWorkbook(file);

			// Get first sheet from the workbook
			HSSFSheet sheet = workbook.getSheetAt(0);
			System.out.println("sheet.getLastRowNum()"+sheet.getLastRowNum());

			// Pass first row
			Iterator<Row> rowIterator = sheet.iterator();
			if (rowIterator.hasNext())
				rowIterator.next();
			while (rowIterator.hasNext()) {
				Row row = rowIterator.next();

				// For each row, iterate through each columns
				Iterator<Cell> cellIterator = row.cellIterator();

				String name = getValueCell(cellIterator.next());
				String msisdn = getValueCell(cellIterator.next());
				
				if(SubscriberFilter.passFormat(msisdn)) {
//					//Check if member had this msisdn
//					MemberDAO mDao = new MemberDAO();
//					Member mem = mDao.getMemByMsisdn(msisdn);
////					System.out.println(_mem.get(Member.MEMBER_ID));
//					
//					if(mem.get(Member.MEMBER_ID) == null){
//						//Add new member
////						Member mem = new Member();
//						mem.set(Member.NAME, name);
//						mem.set(Member.MSISDN, msisdn);
//						dba.processBeans(mem);
//					}
//					else{
//						//update mem info
//						mem.set(Member.NAME, name);
//						dba.processBeans(mem);
//					}
//					
					
					//Check if member exist in common member dir
					CommonDirMember cMem = getByMsisdnAndDir(msisdn, _dirId);
					System.out.println(cMem.get(CommonDirMember.MSISDN));
					if(cMem.get(CommonDirMember.MSISDN)==null){
//						Add new member
						Member mem = new Member();
						mem.set(Member.NAME, name);
						mem.set(Member.MSISDN, msisdn);
						dba.processBeans(mem);	
						//add to commondirmember
						CommonDirMember record = new CommonDirMember();
						record.set(CommonDirMember.DIR_ID, _dirId);
						record.set(CommonDirMember.MEMBER_ID, mem.get(Member.MEMBER_ID));
						record.set(CommonDirMember.MSISDN, mem.get(Member.MSISDN));
						records.add(record);
					}
					else{
						//return err msg
						return cMem.get(CommonDirMember.MSISDN);
					}
					
				}
			}
			file.close();

			dba.processBeans(records);
			dba.close();

		} catch (FileNotFoundException e) {
			e.printStackTrace();
			return e.toString();
		} catch (IOException e) {
			e.printStackTrace();
			return e.toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return e.toString();
		}
		return "";

	}
	
	private CommonDirMember getByMsisdnAndDir(String msisdn, int dirId) throws Exception {
		BeanFilter  filter = new BeanFilter(CommonDirMember.class);
		filter.setFilter(CommonDirMember.MSISDN, new StringEqualFilter(msisdn));
		filter.setFilter(CommonDirMember.DIR_ID, new IntegerEqualFilter(dirId));
		List<CommonDirMember> beans = getCommonDirMember(filter);
		if (beans!=null && beans.size()>0)
			return beans.get(0);
		return (new CommonDirMember());
	}

	public static String getValueCell(Cell cell){
		switch (cell.getCellType()) {
		  case Cell.CELL_TYPE_BOOLEAN:
		  	return String.valueOf(cell.getBooleanCellValue());
		  case Cell.CELL_TYPE_NUMERIC:
			return String.valueOf((BigDecimal.valueOf(cell.getNumericCellValue())));
		  case Cell.CELL_TYPE_STRING:
			return String.valueOf(cell.getStringCellValue());
		  }
		return "";
	}

	public void moveCommonDirMember(Integer _dirId, Set<Member> _set) throws Exception {
		DbAdapter dba = new DbAdapter();
		List<CommonDirMember> records = new ArrayList<CommonDirMember>();
		for (Member mem : _set) {
			// Remove from old class
			BeanFilter _filter = new BeanFilter(CommonDirMember.class);
			_filter.setFilter(CommonDirMember.MEMBER_ID, new IntegerEqualFilter(mem.get(Member.MEMBER_ID)));
			dba.removeBeans(_filter);
			
			// Add to new class
			CommonDirMember record = new CommonDirMember();
			record.set(CommonDirMember.DIR_ID, _dirId);
			record.set(CommonDirMember.MEMBER_ID, mem.get(Member.MEMBER_ID));
			record.set(CommonDirMember.MSISDN, mem.get(Member.MSISDN));
			records.add(record);
		}
		dba.processBeans(records);
		dba.close();
	}
}
