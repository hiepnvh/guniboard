Ext.define(App.path('view.TreeContextMenu'), {
	extend : 'Ext.menu.Menu',
	hidden : true,
	hideMode : 'display',
	id : 'TreeContextMenu',
	width : 138,
	frameHeader : false,
	initComponent : function() {
		var me = this;
		Ext.applyIf(me, {
			items : [{
						xtype : 'menuitem',
						id : 'addnew',
						icon : 'resources/img/Add.png',
						text : 'Thêm mới',
						// tooltip : 'Add Task',
						handler : function() {
							me.AddFolder();
						}
					}, {
						xtype : 'menuitem',
						id : 'rename',
						icon : 'resources/img/Edit.png',
						text : 'Đổi tên',
						tooltip : 'Edit selected task',
						handler : function() {
							me.RenameFolder();
						}
					}, {
						xtype : 'menuitem',
						id : 'delete',
						icon : 'resources/img/Delete.png',
						text : 'Xóa',
						// tooltip : 'Delete selected task',
						handler : function() {
							var memCount = me.getMemCount();
							var childCount = me.getChildCount();
							if(memCount>0 || childCount>0)
								Ext.MessageBox.alert('Thông báo','Bạn chỉ có thể xóa nếu thư mục trống');
							else
								me.RemoveFolder();
						}
					}
//					, {
//						xtype : 'menuitem',
////						id : 'rename',
//						icon : 'resources/img/log-in.png',
//						text : 'Chuyển đến',
//						handler : function() {
//							me.RemoveTo();
//						}
//					}
		]
		});
		me.callParent(arguments);
	},
	AddFolder : function() {
		var record = Ext.getCmp('ViewCommonDirTree').getSelectionModel().getSelection()[0];
		console.log(record);
	    if (record) {
	    	var dlg = Ext.MessageBox.prompt('Thêm mới', 'Nhập tên:', function(btn, text){
	    		if (btn == 'ok'){
	    		var new_common_dir_name = text;
	    		
	    		var dir = Ext.encode({
										parent_dir_id : record.data.dir_id.toString(),
										name : new_common_dir_name
									});
	    		
	    		App.Action.AddCommonDir(App.Session.user_id, dir,
					function(options, success, response) {
						Ext.get(document.body).unmask();
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox.alert('Thông báo','Thêm mới thành công');
								console.log(response.reponse.dir_id);
								
								//// add on tree
						    	record.set('leaf', false);
						        var childNode = record.createNode({
						        	dir_id: response.reponse.dir_id,
							        text: text,
							        leaf: true
								});
				        		record.appendChild(childNode);
				        		///// end add on tree
				        		
							} else {
								Ext.MessageBox.alert('Thông báo',
										'Thêm mới thất bại ' + response.info);
							}
						} else {
							Ext.MessageBox.alert('Thông báo', 'Thêm mới thất bại thử lại sau' + response.info);
						}
					});
	    		}}
	    	);
	    }
	 },
	 RemoveFolder : function(){
		var record = Ext.getCmp('ViewCommonDirTree').getSelectionModel().getSelection()[0];
		var dir = Ext.encode({
							dir_id : record.data.dir_id.toString()
						});
			
		Ext.MessageBox.confirm('Xóa',
				'Chắc chắn xóa ?', function(btn) {
					if (btn == 'yes') {
						
						App.Action.RemoveCommonDir(App.Session.user_id, dir,
						function(options, success, response) {
							Ext.get(document.body).unmask();
							if (success) {
								response = Ext.decode(response.responseText);
								if (response.success) {
									Ext.MessageBox.alert('Thông báo','Xóa thành công');
									//// remove on tree
									var tree = Ext.getCmp('ViewCommonDirTree');
									var record = tree.getSelectionModel().getSelection()[0];
									record.remove(true);
									//// end remove on tree
								} else {
									Ext.MessageBox.alert('Thông báo','Xóa thất bại ' + response.info);
								}
							} else {
								Ext.MessageBox.alert('Thông báo', 'Xóa thất bại thử lại sau' + response.info);
							}
						});
					} else {
					}
				}, this);
	},
	RenameFolder : function(){
		var record = Ext.getCmp('ViewCommonDirTree').getSelectionModel().getSelection()[0];
		
		var dlg = Ext.MessageBox.prompt('Đổi tên',
				'Nhập tên mới:', function(btn, text) {
//			text='sdf';
					if (btn == 'ok') {
						
						var dir = Ext.encode({
							dir_id : record.data.dir_id.toString(),
							name : text
						});
			    		
						App.Action.UpdateCommonDir(App.Session.user_id, dir,
						function(options, success, response) {
							Ext.get(document.body).unmask();
							if (success) {
								response = Ext.decode(response.responseText);
								if (response.success) {
									Ext.MessageBox.alert('Thông báo','Đổi tên thành công');
									
									//// rename on tree
									var tree = Ext.getCmp('ViewCommonDirTree');
									var record = tree.getSelectionModel().getSelection()[0];
									record.set('text', text);
									//// end rename on tree
								} else {
									Ext.MessageBox.alert('Thông báo','Đổi tên thất bại ' + response.info);
								}
							} else {
								Ext.MessageBox.alert('Thông báo', 'Đổi tên bại thử lại sau' + response.info);
							}
						});
					}
				}, this, false, record.data.text.toString());
	},
	getMemCount : function(){
		var record = Ext.getCmp('ViewCommonDirTree').getSelectionModel().getSelection()[0];
		var dir_id = record.data.dir_id.toString();
		var dirArr = [];
		dirArr.push(dir_id);
		var store = Ext.getStore(App.path('store.Member'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.dir_id = Ext.encode(dirArr);
		store.load();
		console.log(store.data.length);
		console.log(record);
		return store.data.length;
	},
	getChildCount : function(){
		var record = Ext.getCmp('ViewCommonDirTree').getSelectionModel().getSelection()[0];
		console.log(record.childNodes.length);
		return record.childNodes.length;
	},
	RemoveTo : function(){
		var record = Ext.getCmp('ViewCommonDirTree').getSelectionModel().getSelection()[0];
		var new_dir_id = record.data.dir_id.toString();
		var member = {
			member_id : Ext.getCmp('ViewContactDetail').member_id_move
		};
		
		var member_list = [];
		member_list.push(member);
		
		Ext.MessageBox.confirm('Chuyển lớp',
				'Chắc chắn chuyển lớn cho học viên này ?', function(btn) {
					if (btn == 'yes') {
						
						App.Action.CommonDirMemberMove(App.Session.user_id, new_dir_id.toString(), Ext.encode(member_list),
							function(options, success, response) {
								Ext.get(document.body).unmask();
								if (success) {
									response = Ext.decode(response.responseText);
									if (response.success) {
										Ext.MessageBox.alert('Thông báo','Chuyển lớp thành công');
										Ext.getCmp('ViewContactDetail').LoadCommonDirMember(new_dir_id.toString());
										//// remove on tree
//										var tree = Ext.getCmp('ViewCommonDirTree');
//										var record = tree.getSelectionModel().getSelection()[0];
//										record.remove(true);
//										//// end remove on tree
									} else {
										Ext.MessageBox.alert('Thông báo','Chuyển lớp thất bại ' + response.info);
									}
								} else {
									Ext.MessageBox.alert('Thông báo', 'Chuyển lớp thất bại thử lại sau' + response.info);
								}
							});
					} else {
					}
				}, this);
	}
});