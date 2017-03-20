package vn.gmobile.uniboard.model;



import java.util.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



@Entity(name = "private_list_member")
public class PrivateListMember extends Bean {
	@Attribute(name = "list_id")
	@ExternalKey
	public static final BeanProperty<Integer> LIST_ID =  BeanProperty.integerType();
	@Attribute(name = "member_id")
	@ExternalKey
	public static final BeanProperty<Integer> MEMBER_ID =  BeanProperty.integerType();
}
