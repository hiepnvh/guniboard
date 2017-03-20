package vn.gmobile.uniboard.web.listener;

import java.util.logging.Logger;

import javax.servlet.ServletContextEvent;




 
public class ContextListner extends  org.quartz.ee.servlet.QuartzInitializerListener{
	private static final Logger LOGGER = Logger.getLogger(ContextListner.class.getName());
	SendScheduler _scheduler;
 
	@Override
	public void contextDestroyed(ServletContextEvent arg0) {
		LOGGER.info("ContextListner finish");
		if (_scheduler!=null)
			_scheduler.stop();
		
	}
 
	@Override
	public void contextInitialized(ServletContextEvent arg0) {
		LOGGER.info("ContextListner start");
//		_scheduler = SendScheduler.createInstance();
//		_scheduler.start();
	}
}