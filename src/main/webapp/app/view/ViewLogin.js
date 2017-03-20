Ext.define(App.path('view.ViewLogin'), {
	extend : 'Ext.form.Panel',
	xtype : 'viewlogin',
	bodyStyle : 'background-color: transparent',
	border : false,
	itemId : 'ViewLogin',
	layout : {
		type : 'hbox',
		align : 'stretch'
	},
	items : [{
				border : false,
				xtype : 'panel',
				flex : 1,
				frame : false
			}, {

				border : false,
				layout : {
					type : 'vbox',
					align : 'stretch'
				},

				items : [{
							xtype : 'panel',
							flex : 1,
							frame : false,
							border : false
						}, {
							hidden : true,
							border : false,
							layout : {
								type : 'hbox',
								align : 'stretch'
							},
							items : [{
										border : false,
										flex : 1
									}, {
										border : false,
										html : '<img src="./resources/img/logo_hvcsnd.jpg" width="200" height="240" align="middle"/>',
										width : 200,
										height : 240
									}, {
										border : false,
										flex : 1
									}]
						}, {
							cls : 'index',
							width : 350,
							height : 200,
							frame : true,
							fieldDefaults : {
								border : false
							},
							items : [{
								xtype : 'textfield',
								itemId : 'username',
								name : 'username',
								fieldLabel : 'Tên đăng nhập',
								listeners : {
									specialkey : function(fiel, e) {
										if (e.getKey() == e.ENTER) {
											var form = this.up('form');
											var username = form.getValues().email;
											var password = Ext.util.MD5(form
													.getValues().password);
											form.login(username, password);
										}
									}
								}
							}, {
								xtype : 'textfield',
								name : 'password',
								itemId : 'password',
								fieldLabel : 'Mật khẩu',
								inputType : 'password',
								listeners : {
									specialkey : function(fiel, e) {
										if (e.getKey() == e.ENTER) {
											var form = this.up('form');
											var username = form.getValues().username;
											var password = Ext.util.MD5(form
													.getValues().password);
											form.login(username, password);
										}
									}
								}
							}, {
								xtype : 'checkbox',
								boxLabel : 'Lưu mật khẩu?',
								itemId : 'checkbox'
							}, {
								xtype : 'button',
								text : 'Đăng nhập',
								cls : 'bt_login',
								itemId : 'login',
								name : 'login',
								handler : function() {
									var form = this.up('form');
									var username = form.getValues().username;
									var password = Ext.util.MD5(form
											.getValues().password);
									form.login(username, password);
								}
							}
							// ,{
							// xtype: 'button',
							// itemId: 'forgetpass',
							// text: '<h6 class="lb_bt_Login_resgister">Quên mật
							// khẩu?</h6>',
							// baseCls: 'bt_forgetpass',
							// handler: function() {
							// this.up('form').forgetpass();
							// }
							// }
							]
						}, {
							border : false,
							xtype : 'panel',
							flex : 1,
							frame : false
						}]

			}, {
				border : false,
				xtype : 'panel',
				flex : 1,
				frame : false
			}],
    login: function(username, password) {
    	
    	username = username.toLowerCase();
        var me = this;
        var checkbox= this.down('#checkbox').getValue();
        if (username == '') {
            Ext.MessageBox.alert('Thông báo', 'Bạn chưa nhập tài khoản.');
        } else {
        	
// var funclist = [];
// for(var i=0;i<100;i++)
// {
// funclist.push(i);
// }
//        	
// me.fireEvent('loggedin');
// App.Session.setFunctionlist(funclist);
// App.Session.setUser_id(1);
// App.Session.setEmail('Tuan Anh');
// App.Session.setUsername('Tuan Anh');
// Ext.ux.ActivityMonitor.start();
        	
            if(checkbox){
                var now = new Date();
                var expiry = new Date(now.getTime() + 30*24 * 60 * 60 * 1000);
                Ext.util.Cookies.set('username',username,expiry);
                Ext.util.Cookies.set('password',me.down('#password').getValue(),expiry);
            }
        	
            App.Action.UserLogin(username, password, function(options, success, response) {
                if (success) {
                    response = Ext.decode(response.responseText);
                    if (response.success) {
                        App.Session.setUser_id(response.user.user_id);
                        App.Session.setUsername(response.user.username);
                        App.Session.setName(response.user.name);
                        App.Session.setPassword(response.user.password);
                        App.Session.setFunctionlist(response.function_list);
                        App.Session.setInfoUser(response.user);
                        App.Session.setShortcode_prefix(response.shortcode_prefix);
                        var brandnameArr = response.user.brandname.trim().split(',');
                        brandnameJS = [];
                        Ext.each(brandnameArr, function (item) {

                        	brandnameJS.push({
                                  'name': item.trim()
                           });
                        });
                        Ext.encode(brandnameJS);
                        console.log(brandnameJS);
                        App.Session.setBrandname(brandnameJS);
                        
                        me.fireEvent('loggedin');
                        Ext.ux.ActivityMonitor.start();
                        if(checkbox){
                            var now = new Date();
                            var expiry = new Date(now.getTime() + 30*24 * 60 * 60 * 1000);
                            Ext.util.Cookies.set('username',username,expiry);
                            Ext.util.Cookies.set('password',me.down('#password').getValue(),expiry);
                        }

                    } else {
                        Ext.MessageBox.alert('Thông báo', 'Đăng nhập không thành công '+ (response.info ? response.info : ''));
                    }
                } else {
                    Ext.MessageBox.alert('Thông báo', 'Đường truyền lỗi vui lòng thử lại sau');
                }
            });
        	
        }
    },
    forgetpass: function() {
        Ext.MessageBox.alert('Thông báo', 'Để lấy lại mật khẩu vui lòng liên hệ Quản trị hệ thống');
    },
    activate: function() {
        var username = Ext.util.Cookies.get('username');
        if(username){
            this.down('#username').setValue(username);
            this.down('#password').setValue(Ext.util.Cookies.get('password'));
        }else{
            this.down('#username').setValue(null);
            this.down('#password').setValue(null);
        }
        this.down('#username').focus(true);
//        this.someTest();
    },
    someTest : function(){
    	var map = new Ext.util.HashMap();
			map.add(1,'key1');
			map.add(2,'key2');
			map.add(3,'key3');
			
			map.each(function(key, value, length){
			    console.log(key, value, length);
			});
			if(map.containsKey(0))
				map.removeAtKey(2);
			map.each(function(key, value, length){
			    console.log(key, value, length);
			});
    }

});