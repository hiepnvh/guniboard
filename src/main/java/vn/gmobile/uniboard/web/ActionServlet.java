package vn.gmobile.uniboard.web;

import java.lang.reflect.Constructor;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;
import com.bean.json.JsonUtils;
import vn.gmobile.uniboard.conf.Consts;
import vn.gmobile.uniboard.message.JsonRequest;
import vn.gmobile.uniboard.message.JsonResponse;

/** * Servlet implementation class LoginServlet */
public class ActionServlet extends HttpServlet {
	protected static final Logger LOGGER = Logger.getLogger(ActionServlet.class
			.getName());

	Map<String,Class> _messageClassMap; 
	
	
	public synchronized void doPost(HttpServletRequest request,
			HttpServletResponse response) {

		_messageClassMap =  new HashMap<String,Class> ();
		Enumeration<String> initNames = this.getInitParameterNames();
		while (initNames.hasMoreElements()) {
			String initName = initNames.nextElement();
			String messageClassName = this.getInitParameter(initName);
			try {
				_messageClassMap.put(initName, Class.forName(messageClassName));
			} catch (Exception exc) {
				LOGGER.info("Cannot create message class of parameter " + initName +" class =" + messageClassName +" error "+ exc);
			}
		}
		JsonUtils.setDateFormat(Consts.DATE_FORMAT);
		try {
			JsonUtils.setDateFormat(Consts.DATE_FORMAT);
			JSONObject jObj = JsonUtils.fromMapToJson(request.getParameterMap());
			String pathInfo = request.getServletPath();
			LOGGER.info("Servlet "+ pathInfo + " input :"+jObj.toString());
			Class messageClass = _messageClassMap.get(pathInfo);
			if (messageClass==null) {
				LOGGER.info("Cannot find message class for path " + pathInfo);
				throw new Exception("System error");
			}
			Class[] paramsArray = {JSONObject.class};
			Constructor constrc = messageClass.getConstructor(paramsArray);
			Object[] input  = {jObj};
			LOGGER.info("Input :"+input.toString());
			JsonRequest jRequest = (JsonRequest) constrc.newInstance(input);
			JsonResponse jResponse  =  jRequest.execute();
			response.setHeader("Access-Control-Allow-Origin", "*");
			response.setContentType("text/html; charset=UTF-8");
			response.setCharacterEncoding("UTF-8");
			LOGGER.info("Output :"+jResponse.getJsonObject().toString());
			response.getWriter().write(jResponse.getJsonObject().toString());

		} catch (Exception theException) {
			LOGGER.info("Action servlet " + theException.getMessage());
			theException.printStackTrace();
		} 

	}

}
