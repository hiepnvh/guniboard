package vn.gmobile.uniboard.report;

import static net.sf.dynamicreports.report.builder.DynamicReports.col;
import static net.sf.dynamicreports.report.builder.DynamicReports.report;
import static net.sf.dynamicreports.report.builder.DynamicReports.type;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.logging.Logger;

import org.eclipse.jdt.internal.compiler.lookup.CaptureBinding;

import vn.gmobile.uniboard.db.CampaignDAO;
import vn.gmobile.uniboard.db.CampaignHistoryDAO;
import vn.gmobile.uniboard.db.DbAdapter;
import vn.gmobile.uniboard.db.MemberDAO;
import vn.gmobile.uniboard.model.Campaign;
import vn.gmobile.uniboard.model.CampaignHistory;
import vn.gmobile.uniboard.model.Member;
import vn.gmobile.uniboard.model.User;
import net.sf.dynamicreports.jasper.builder.JasperReportBuilder;
import net.sf.dynamicreports.report.builder.DynamicReports;
import net.sf.jasperreports.engine.JRDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.olap.mapping.MemberDepth;

import com.base.filter.BeanInnerJoinFilter;
import com.base.filter.Filter;
import com.base.filter.IntegerEqualFilter;
import com.base.filter.StringEqualFilter;
import com.bean.base.BeanFilter;


public class CampaignHistoryReportBuilder extends ReportBuilder {
	
	int  _campaignId;
	String _send_date;
	
	public CampaignHistoryReportBuilder(int campaignId, String send_date) {
		this._campaignId = campaignId;
		this._send_date = send_date;
	}

	protected static final Logger LOGGER = Logger.getLogger(CampaignHistoryReportBuilder.class.getName());

	@Override
	protected JRDataSource createDataSource() {
		try {
			
			CampaignHistoryDAO dao = new CampaignHistoryDAO();
			List<CampaignHistory> smsBeans = dao.getCampaignSmsHistory(_campaignId);
			
			DbAdapter dba = new DbAdapter();

			List<Data> dataList = new ArrayList<Data>();
			
			for(CampaignHistory emRC : smsBeans){
								
				Data data = new Data();
				//get sender name
				BeanFilter  relFilter = new BeanFilter(Campaign.class);
				relFilter.setFilter(Campaign.CAMPAIGN_ID, new IntegerEqualFilter(_campaignId));
				BeanFilter filter = new BeanFilter(User.class);
				filter.setFilter(User.USER_ID, new BeanInnerJoinFilter(relFilter));
				List<User> beans = dba.getBeans(filter);
				User u = beans.get(0);
				data.name = u.get(User.NAME);
				
				data.msisdn = emRC.get(CampaignHistory.MSISDN);
				data.status = setStatus(emRC.get(CampaignHistory.STATUS));
				
				//send_date format 21-06-2016 10:46:25
//				SimpleDateFormat sdf = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss");
				data.sent_date = _send_date;
				
				//get receiver name
				MemberDAO mDao = new MemberDAO();
				Member mem = mDao.getMemByMsisdn(data.msisdn);
				data.receive_name = mem.get(Member.NAME);
				
				dataList.add(data);
			}
			
			return new JRBeanCollectionDataSource(dataList);
		} catch (Exception exc) {
			exc.printStackTrace();
			return null;
		}
	}

	public class Data {
		private String name;
		private String msisdn;
		private String status;
		private String sent_date;
		private String receive_name;

		public String getReceive_name() {
			return receive_name;
		}
		public void setReceive_name(String receive_name) {
			this.receive_name = receive_name;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public String getMsisdn() {
			return msisdn;
		}
		public void setMsisdn(String msisdn) {
			this.msisdn = msisdn;
		}
		public String getStatus() {
			return status;
		}
		public void setStatus(String status) {
			this.status = status;
		}
		public String getSent_date() {
			return sent_date;
		}
		public void setSent_date(String sent_date) {
			this.sent_date = sent_date;
		}
		
	}
	
	private String setStatus(int status){
		String _status;
		switch(status)
		{
			case -1 : _status = "Chưa gửi đến SMSC"; break;
			case 1 : _status = "Đã nhận được"; break;
			case 2 : _status = "Thất bại"; break;
			case 8 : _status = "Đã gửi đến SMSC"; break;
			case 16 : _status = "Bị từ chối"; break;
			default : _status = "";
		}
		return _status;
	}
	
	@Override
	protected JasperReportBuilder buildReport() { 
		DynamicReports.report();
		//get campaign content
		CampaignDAO cDao = new CampaignDAO();
		Campaign campaign;
		try {
			campaign = cDao.getCampaignById(_campaignId);
			String content = campaign.get(Campaign.TEXT);
			String shortcode = campaign.get(Campaign.SHORTCODE);
			
			return  report()
					.setTemplate(ReportTemplates.reportTemplate)
					.ignorePagination()
					.ignorePageWidth()
					  .columns(
					  	col.column("Người gửi", "name", type.stringType()).setWidth(180),
					  	col.column("Ngày gửi", "sent_date", type.stringType()).setWidth(150),
					  	col.column("Người nhận", "receive_name", type.stringType()).setWidth(180),
					  	col.column("Số nhận",   "msisdn",  type.stringType()).setWidth(100),
					  	col.column("Trạng thái", "status", type.stringType()).setWidth(100)
					  	)
					    .title(ReportTemplates.createTitleComponent("Báo cáo danh sách nhận tin nhắn"))
					    .title(ReportTemplates.createTextField("Nội dung:"))
					    .title(ReportTemplates.createTextField(content))
					    .title(ReportTemplates.createTextField("\n"))
					    .title(ReportTemplates.createTextField("Đầu số gửi:"))
					    .title(ReportTemplates.createTextField(shortcode))
					    .title(ReportTemplates.createTextField("\n"));
		} catch (Exception e) {
			e.printStackTrace();
			return report();
		}
		
	}
}