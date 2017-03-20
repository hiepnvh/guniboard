package vn.gmobile.uniboard.web.listener;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.logging.Logger;

import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

import com.base.filter.DateLessThanOrEqualFilter;
import com.base.filter.IntegerEqualFilter;
import com.bean.base.BeanFilter;

import vn.gmobile.uniboard.db.SndDAO;
import vn.gmobile.uniboard.db.SndSchedulerDAO;
import vn.gmobile.uniboard.model.Snd;
import vn.gmobile.uniboard.model.SndScheduler;



public  class OnSendEvent implements Job {
	private static final Logger LOGGER = Logger.getLogger(OnSendEvent.class.getName());


	public void execute(JobExecutionContext arg0)
			throws JobExecutionException {
//		JobDataMap dataMap = arg0.getJobDetail().getJobDataMap();
//		Integer campaign_id = (Integer)dataMap.get("campaign_id");
		try {
			LOGGER.info("OnSendEvent!");
			Date now = new Date();
			SndSchedulerDAO dao = new SndSchedulerDAO();
			BeanFilter filter = new BeanFilter(SndScheduler.class);
			filter.setFilter(SndScheduler.sentat, new DateLessThanOrEqualFilter(now));
//			filter.setFilter(SndScheduler.campaign_id, new IntegerEqualFilter(campaign_id));
			List<SndScheduler> sches = dao.getBeans(filter);
			List<Snd> snds = new ArrayList<Snd>();
			for (SndScheduler sndScheduler : sches) {
				Snd snd = new Snd();
				snd.set(Snd.snd_from, sndScheduler.get(SndScheduler.from));
				snd.set(Snd.snd_to, sndScheduler.get(SndScheduler.to));
				snd.set(Snd.snd_txt, sndScheduler.get(SndScheduler.txt));
				snd.set(Snd.snd_last, 0);
				snd.set(Snd.snd_batch_id, sndScheduler.get(SndScheduler.campaign_id));
				snds.add(snd);
			}
			//insert pending sms to kannel
			SndDAO sndDao = new SndDAO();
			sndDao.updateBeans(snds);
			
			//remove sent sms in sndscheduler
			dao.removeBeans(filter);
			
//			BroadcastManager scheduler = new BroadcastManager();
//			scheduler.perform(Consts.BROADCAST_EVENT_TYPE.CANCEL, taskId);
		} catch (Exception exc) {
			LOGGER.info("OnBroadcastExpiredEvent Broadcast Exception "+exc);
		}
	}
	

	
}