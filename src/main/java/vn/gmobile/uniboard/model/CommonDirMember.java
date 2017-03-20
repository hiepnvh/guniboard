package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "common_dir_member")
public class CommonDirMember extends Bean {
	@Attribute(name = "dir_id")
	@ExternalKey
	public static final BeanProperty<Integer> DIR_ID =  BeanProperty.integerType();
	@Attribute(name = "member_id")
	@ExternalKey
	public static final BeanProperty<Integer> MEMBER_ID =  BeanProperty.integerType();
	@Attribute(name = "msisdn")
	public static final BeanProperty<String> MSISDN =  BeanProperty.stringType();
}
