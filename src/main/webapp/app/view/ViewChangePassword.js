Ext.define(App.path('view.ViewChangePassword'), {
    extend: 'Ext.form.Panel',
    xtype: 'ViewChangePassword',
    bodyStyle: 'background-color: transparent',
    border: false,
    itemId: 'ViewChangePassword',
    id: 'ViewChangePassword',
    layout: {
    	thisPassword : null,
        type: 'hbox',
        align: 'stretch'
    },
    items: [{
            border: false,
            xtype: 'panel',
            flex: 1,
            frame: false
        }, {
            
            border:false,
            layout: {
                type: 'vbox',
                align: 'stretch'
            },
            
            items: [{
                    xtype: 'panel',
                    flex: 1,
                    frame: false,
                    border:false
                }, {
                    cls:'index',
                    width: 350,
                    height: 200,
                    frame: true,
                    fieldDefaults: {
                        border: false
                    },
                    items: [
                        {
                            xtype: 'textfield',
                            itemId: 'password_old',
                            name: 'password_old',
                            fieldLabel: 'Mật khẩu cũ<span style="color: red;">(*)</span>',
                            labelWidth : 150,
                            inputType: 'password'
                        }, {
                            xtype: 'textfield',
                            name: 'password',
                            itemId: 'password',
                            fieldLabel: 'Mật khẩu mới<span style="color: red;">(*)</span>',
                            labelWidth : 150,
                            inputType: 'password'
                        }, {
                            xtype: 'textfield',
                            name: 'repassword',
                            itemId: 'repassword',
                            labelWidth : 150,
                            fieldLabel: 'Nhập lại mật khẩu mới<span style="color: red;">(*)</span>',
                            inputType: 'password'
                        }, {
                            xtype: 'button',
                            text: 'Đổi mật khẩu',
                            cls: 'bt_login',
                            itemId: 'btchangepass',
                            name: 'btchangepass',
                            handler: function() {
                                var form = this.up('form');
                                var myPassOld = Ext.util.MD5(form.getValues().password_old);
                                var myPassNew = Ext.util.MD5(form.getValues().password);
                                var remyPassNew = Ext.util.MD5(form.getValues().repassword);
                                form.ChangePass(myPassOld, myPassNew, remyPassNew);
                            }
                        }]
                }, {
                    border: false,
                    xtype: 'panel',
                    flex: 1,
                    frame: false
                }
            ]

        }, {
            border: false,
            xtype: 'panel',
            flex: 1,
            frame: false
        }],
    ChangePass: function(myPassOld, myPassNew, remyPassNew) {
        if(this.IsValidForm(myPassOld, myPassNew, remyPassNew))
        {
        	var loadMask = new Ext.LoadMask(Ext.getCmp('ViewChangePassword'), {msg:'Chờ giây lát..'});
				loadMask.show();
			var user_id = App.Session.user_id;
			var user = {user_id: user_id.toString(), password:myPassNew};
				
			Ext.Ajax.request({
						url : 'updateuser',
						actionMethods : {
							create : 'POST',
							read : 'POST',
							update : 'POST',
							destroy : 'POST'
						},
						params : {
							user_id : user_id,
							user : Ext.encode(user)
						},
						scope : this,
						timeout : 40000,
						callback : function(options, success, response) {
							if (success) {
								response = Ext.decode(response.responseText);
								if (response.success) {
									Ext.MessageBox.alert('Thông báo','Đổi mật khẩu thành công ' + (response.info ? response.info : ''));
									this.getForm().reset();
								} else {
									Ext.MessageBox.alert('Thông báo',
											'Đổi mật khẩu thất bại '+ response.info);
								}
							} else {
								Ext.MessageBox.alert('Thông báo',
										'Đổi mật khẩu thất bại. Vui lòng thử sau '
												+ response.info);
							}
							loadMask.hide();
						}
					});
        }
    },
    activate: function() {
    	this.getForm().reset();
    },
    IsValidForm : function(myPassOld, myPassNew, remyPassNew){
    	var user_id = App.Session.user_id;
     
    	if(this.down('#password_old').getValue() == ''){
    		Ext.MessageBox.alert('Thông báo', 'Nhập mật khẩu cũ');
    		return false;
    	} else if(this.down('#password').getValue() == ''){
    		Ext.MessageBox.alert('Thông báo', 'Nhập mật khẩu mới');
    		return false;
    	} else if(this.down('#repassword').getValue() == ''){
    		Ext.MessageBox.alert('Thông báo', 'Nhập lại mật khẩu mới');
    		return false;
    	} else if(myPassNew != remyPassNew){
    		Ext.MessageBox.alert('Thông báo', '"Mật khẩu mới"&"Nhập lại mật khẩu mới" khác nhau');
    		return false;
    	} else if(myPassOld != App.Session.password){
    		Ext.MessageBox.alert('Thông báo', '"Mật khẩu cũ không chính xác');
    		return false;
    	}
    	return true;
    }
    
});