package vn.gmobile.uniboard.model;

import com.bean.annot.*;
import com.bean.base.*;



@Entity(name = "profile_function_relation")
public class ProfileFunctionRelation extends Bean {
	
	@Attribute(name = "function_id")
	public static final BeanProperty<Integer> FUNCTION_ID =  BeanProperty.integerType();
	@Attribute(name = "profile_id")
	public static final BeanProperty<Integer> PROFILE_ID =  BeanProperty.integerType();



}
