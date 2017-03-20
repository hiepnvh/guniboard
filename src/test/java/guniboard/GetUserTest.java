package guniboard;

import org.json.JSONObject;

import vn.gmobile.uniboard.message.UserGetRequest;

public class GetUserTest {

	public static void main(String[] args) throws Exception {
		JSONObject jObj = new JSONObject("{'user_id':'1','start':'0','limit':'25','page':'1','_dc':'1466995280954'}");
		UserGetRequest req = new UserGetRequest(jObj);
		req.execute();

	}

}
