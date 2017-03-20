Ext.define(App.path('view.ViewMenuLeft'), {
			extend : 'Ext.form.Panel',
			xtype : 'viewmenuleft',
			itemId : 'viewmenuleft',
			border : true,
			autoScroll : true,
//			title : 'Danh mục chức năng',
			lbar : [{
						html : 'Quản lý hệ thống',
						itemId : 'user',
						iconCls : 'icon-user'
					}, {
						text : 'Quản lý danh bạ',
						itemId : 'contact',
						iconCls : 'icon-member'
					}, {
						text : 'Gửi tin nhắn',
						itemId : 'sendsms',
						iconCls : 'icon-sms'
					}, {
						text : 'Lịch sử tin nhắn',
						itemId : 'sendsmshistory',
						iconCls : 'icon-history'
					}, '-', {
						xtype : 'tbfill',
						width : App.Constant.MENU_LEFT_WIDTH - 5
					}, '-', {
						text : App.Session.name,
						itemId : 'username',
						menu : [{
									text : 'Thông tin người dùng',
									itemId : 'userinformation'
								}, {
									text : 'Đổi mật khẩu',
									itemId : 'changepassword'
								}, {
									text : 'Thoát',
									name : 'logout',
									itemId : 'logout',
									iconCls : 'icon-exit',
									handler : function() {
										location.reload();
//										this.up('form').logout();
									}
								}]

					}, '-'],
			logout : function() {
				App.Session.setUser_id(null);
				App.Session.setName(null);
				App.Session.setPassword(null);
				App.Session.setFunctionlist(null);
				App.Session.setAgentId(null);
				App.Session.setAgentname(null);
				App.Session.setInfoUser(null);

				Ext.Router.redirect('');
			},
			activate : function() {
				this.down('#user').setVisible(false);
				this.down('#contact').setVisible(false);

				this.down('#sendsms').setVisible(false);
				this.down('#sendsmshistory').setVisible(false);

				this.down('#username').setText('<span style="color: red;">'
						+ App.Session.name + '</span>');
				for (var i = 0; i < App.Session.functionlist.length; i++) {
					this.FunctionMap(App.Session.functionlist[i].function_id);
				}
			},
			FunctionMap : function(itemId) {
				switch (itemId) {
					case 11 :
						this.ShowBoolean('user', true);
						break;
					case 21 :
						this.ShowBoolean('contact', true);
						break;
					case 31 :
						this.ShowBoolean('sendsms', true);
						break;
					case 32 :
						this.ShowBoolean('sendsmshistory', true);
						break;
				}
			},
			ShowBoolean : function(itemId, show) {
				var item = '#' + itemId;
				if (show) {
					this.down(item).setVisible(true);
				} else {
					this.down(item).setVisible(false);
				}
			}
		});
