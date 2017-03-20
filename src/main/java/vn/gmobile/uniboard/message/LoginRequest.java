/**
 * 
 */
package vn.gmobile.uniboard.message;

import java.util.logging.Logger;

import org.json.JSONObject;

import vn.gmobile.uniboard.conf.Consts;
import vn.gmobile.uniboard.conf.JsParams;
import vn.gmobile.uniboard.conf.MessageGroup;
import vn.gmobile.uniboard.db.UserDAO;
import vn.gmobile.uniboard.model.User;

/**
 * @author QuangN
 *
 */
public class LoginRequest extends JsonRequest{
	private static Logger LOGGER = Logger.getLogger(LoginRequest.class.getName());

	String _username;
	String _password;

	public LoginRequest(JSONObject jObj) throws Exception {
		super(jObj);
		_username = jObj.getString(JsParams.LOGIN_REQUEST.USERNAME);
		_password = jObj.getString(JsParams.LOGIN_REQUEST.PASWORD);
	}
	


	@Override
	public JsonResponse execute() {
		LoginResponse resp = new LoginResponse();
		try {
			UserDAO dao = new UserDAO();
			User user = dao.getUser(_username, _password);
			if (user==null) {
				LOGGER.info("Cannot find user id=" + _username +" password=" +_password  );
				resp.setSuccess(false);
				resp.setInfo(MessageGroup.INVALID_USERNAME_PASSWORD);
				return resp;
			}
			if (user.get(User.ACTIVE).intValue() != Consts.STATE.ACTIVE) {
				LOGGER.info("User inactive");
				resp.setSuccess(false);
				resp.setInfo(MessageGroup.USER_INACTIVE);
				return resp;
			}
			resp.setSuccess(true);
			resp.setUser(user,dao.getProfileOfUser(user),dao.getFunctionOfUser(user));
		} catch (Exception exc) {
			exc.printStackTrace();
			resp.setSuccess(false);
			resp.setInfo(exc.getMessage());
			
		}
		return resp;
	}

}
