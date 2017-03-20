package vn.gmobile.uniboard.web.listener;

import java.util.*;
import java.util.logging.Logger;

import org.quartz.DateBuilder;
import org.quartz.Job;
import org.quartz.JobBuilder;
import org.quartz.JobDataMap;
import org.quartz.JobDetail;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.quartz.Scheduler;
import org.quartz.SchedulerException;
import org.quartz.SimpleTrigger;
import org.quartz.Trigger;
import org.quartz.ee.servlet.QuartzInitializerListener;
import org.quartz.impl.StdSchedulerFactory;

import vn.gmobile.uniboard.conf.SystemParamGroup;
import vn.gmobile.uniboard.db.SndSchedulerDAO;
import vn.gmobile.uniboard.model.SndScheduler;
import static org.quartz.SimpleScheduleBuilder.simpleSchedule;
import static org.quartz.TriggerBuilder.*;
import static org.quartz.CronScheduleBuilder.*;

import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;




public class SendScheduler {
	
	private static final Logger LOGGER = Logger.getLogger(SndScheduler.class.getName());
	
	private static SendScheduler _instance;
	
	private SendScheduler() {
		try {
			StdSchedulerFactory factory = new StdSchedulerFactory();
			factory = new StdSchedulerFactory();
			_scheduler = factory.getScheduler();
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	
	public static SendScheduler createInstance() {
		if (_instance==null)
			_instance =  new SendScheduler();
		return _instance;
	}
	
	private  Scheduler _scheduler;
	
//	private void setSendingSchedule(SndScheduler task) throws Exception {
//		Date scheduleDate = task.get(SndScheduler.sentat);
//		Calendar cal = Calendar.getInstance();
//		cal.setTime(scheduleDate);
//		int hour = cal.get(Calendar.HOUR_OF_DAY);
//		int minute = cal.get(Calendar.MINUTE);
//		int sec = cal.get(Calendar.SECOND);
//		int day = cal.get(Calendar.DAY_OF_MONTH);
//		int month = cal.get(Calendar.MONTH)+1;
//		int year = cal.get(Calendar.YEAR);
//		String cronExpr = String.format("%d %d %d %d %d ? %d", sec,minute,hour,day,month,year);
//		Trigger trigger = newTrigger()
//			    .withIdentity(  task.get(SndScheduler.campaign_id) +"", "groupSend")
//			    .withSchedule(cronSchedule(cronExpr))
//			    .build();
////		Job job = new MtJob(appService);
//		JobDetail job =  JobBuilder.newJob(OnSendEvent.class)
//				 .withIdentity(  task.get(SndScheduler.campaign_id) +"", "groupSend")
//				 .build();
//		job.getJobDataMap().put("campaign_id", task.get(SndScheduler.campaign_id));
////		LOGGER.info("Start sending scheduler at " + cronExpr);
//		_scheduler.scheduleJob(job, trigger);
//	}
//	
	private void startBroadcastMonitor() throws Exception {
		LOGGER.info("BroadcastScheduler Start monitor scheduler ");
		Trigger trigger  = newTrigger()
				    .withIdentity("trigger", "groupMonitor")
				    .withSchedule(simpleSchedule()
				        .withIntervalInSeconds(SystemParamGroup.SCAN_TIME)
				        .repeatForever())
				    .build();
		JobDetail job =  JobBuilder.newJob(OnSendEvent.class)
				.withIdentity("trigger", "groupMonitor")
				 .build();
		
		_scheduler.scheduleJob(job, trigger);
	}
	
	public  void start() {
		LOGGER.info("BroadcastScheduler Start scheduler ");
		try {
			_scheduler.start();
			startBroadcastMonitor();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}	
//		try {	
//			SndSchedulerDAO taskDao = new SndSchedulerDAO();	
//			 _scheduler.start();
//			BeanFilter filter = new BeanFilter(SndScheduler.class);
////			pendingFilter.setFilter(SndScheduler.TASK_STATUS, new IntegerEqualFilter(Consts.BROADCAST_TASK_STATUS.PENDING));
//			List<SndScheduler> tasks = taskDao.getBeans(filter);
//			for (SndScheduler task:tasks) {
//				try {
//					setSendingSchedule(task);
//				} catch (Exception e) {
//					// TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//			}
//			
//		} catch (Exception e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		
		
		
	}
	
	public  void stop() {
		try {
			LOGGER.info("BroadcastScheduler Stop scheduler ");
			_scheduler.shutdown(false);
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public  void reload() {
		stop();
		StdSchedulerFactory factory = new StdSchedulerFactory();
		factory = new StdSchedulerFactory();
		try {
			_scheduler = factory.getScheduler();
		} catch (SchedulerException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		start();
	}


}
