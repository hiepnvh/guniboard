package vn.gmobile.uniboard.test;

import org.json.JSONObject;

import vn.gmobile.uniboard.message.CommonDirAddRequest;

public class Test {

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		JSONObject jObj = new JSONObject("{'parent_dir_id':'40','name':'test3'}");
		CommonDirAddRequest req = new CommonDirAddRequest(jObj);
		req.execute();
	}

}
