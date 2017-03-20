/**
 * 
 */
package vn.gmobile.uniboard.model;

import java.sql.Date;

import com.bean.annot.*;
import com.bean.base.Bean;
import com.bean.base.BeanProperty;



/**
 * @author QuangN
 *
 */
@Entity(name = "menu_function")
public class MenuFunction extends Bean{
	@Attribute(name = "function_id")
	public static final BeanProperty<Integer> FUNCTION_ID = BeanProperty.integerType();
	@Attribute(name = "name")
	public static final BeanProperty<String> NAME =  BeanProperty.stringType();

}
