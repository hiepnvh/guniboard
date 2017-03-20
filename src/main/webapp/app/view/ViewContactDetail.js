Ext.define(App.path('view.ViewContactDetail'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewContactDetail',
	id : 'ViewContactDetail',
	bodyStyle : 'background-color: transparent',
	title : 'Chi tiết danh bạ',
	border : false,
	layout : {
		type : 'hbox',
		align : 'stretch',
		pack : 'start'
	},
	requires : [App.path('view.ViewCommonDirTree')],
	config : {
		me : this,
		dir_id : null,
		list_id : null,
		data : null,
		first : null,
		member_list_add : [],
		member_list_update : [],
		member_id_update : null,
		member_list_remove : [],
		
		private_list_add : [],
		private_list_id_update : [],
		private_list_update : [],
		private_list_remove : [],

		member_private_list_add : [],
		member_private_list_remove : [],
		
		member_id_move : null,

		record : null,
		file_link : null,
		fieldDefaults : {
			margin : '5'
		},
		items : [{
			flex : 1,
			layout : {
				type : 'vbox',
				align : 'stretch',
				pack : 'start'
			},
			items : [{
//				flex : 1,
				html : '<div id ="tree_space"></div>',
				id : 'component_space',
//				xtype : 'container',
				height : 270,
//				frame : true,
//				border : true
//				allowBlank : false
			}, {
				html : 'panel 3',
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch',
					pack : 'start'
				},
				items : [{
				title : 'Danh bạ riêng',
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch',
					pack : 'start'
				},
				items : [{
							border : false,
							layout : 'hbox',
							items : [{
										flex : 1,
										xtype : 'textfield',
										itemId : 'name_of_list',
										fieldLabel : 'Tên'
									},{
										flex : 1,
										xtype : 'textfield',
										itemId : 'description',
										fieldLabel : 'Mô tả'
									}]
						}, {
							flex : 1,
							width : '100%',
							width : '100%',
							xtype : 'grid',
							itemId : 'grid3',
							border : false,
							stripeRows : true,
							columnLines : true,
							autoScroll : true,
//							selModel : Ext.create('Ext.selection.RadioModel'),
							store : App.path('store.PrivateList'),
							columns : [{
										text : 'STT',
										xtype : 'rownumberer',
										width : 30
									}, {
										text : 'Tên',
										dataIndex : 'name',
										flex : 1
									}, {
										text : 'Mô tả',
										dataIndex : 'description',
										flex : 1
									},{
										xtype : 'checkcolumn',
										width : 30,
										sortable : false,
										dataIndex : 'active',
										editor : {
											xtype : 'checkbox'
										},
										stopSelection : false,
										listeners : {
											checkchange : function(column, recordIndex,
													ischecked) {
												var me = this.up('form');
												me.down('#delete3').setDisabled(me.selections('#grid3')==0);
				//									me.LoadMsisdn(recordIndex,ischecked);
												// // var me = this.up('form');
												// var store =
												// Ext.getStore(App.path('store.InventoryList'));
												// // store.data.items[recordIndex].data.active
												// = checked;
												// var value =
												// store.data.items[recordIndex].data;
												// value.active ? value.active = 1 :
												// value.active = 0;
												// this.arrayGoods.push(value);
											}
										}
					}],
							listeners : {
								itemclick : function(dv, record, item, index, e) {
									var me = this.up('form');
									if(me.down('#name_of_list').disabled == true)//dang click vao 1 record roi click Add
									{
										me.LoadMemberPrivateList(record.data.list_id);
										me.list_id = record.data.list_id;
										
										var me = this.up('form');
										me.down('#name_of_list').setValue(record.data.name);
										me.down('#description').setValue(record.data.description);
										me.down('#repair3').enable();
										me.down('#name_of_list').setDisabled(true);
										me.down('#description').setDisabled(true);
									}
								},
								selectionchange : function(selModel, selections) {
//									var me = this.up('form');
//									me.down('#delete3').setDisabled(selections.length === 0);
								}
							},
							dockedItems : [{
											xtype : 'toolbar',
											items : [{
														itemId : 'add3',
														text : 'Thêm',
														iconCls : 'icon-add',
														handler : function() {
															var me = this.up('form');
															if(me.ActionNotFinished() && this.text == 'Thêm'){
																Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
															} else {
																this.setText('Đưa vào D/s');
																me.down('#repair3').setDisabled(true);
																if(me.down('#name_of_list').disabled)//dang click vao 1 record roi click Add
																{
																	me.down('#name_of_list').setDisabled(false);
																	me.down('#description').setDisabled(false);
																	var me = this.up('form');
																	me.down('#name_of_list').setValue('');
																	me.down('#description').setValue('');
																	me.down('#name_of_list').focus(true);
																} else{// add
																	me.Add3();
																}	
															}
														}
													},'-', {
														itemId : 'repair3',
														text : 'Sửa',
														iconCls : 'icon-repair',
														handler : function() {
														var me = this.up('form');
														if(me.ActionNotFinished()){
															Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
														} else {
															this.disable(true);
															me.Repair3();
														}
														}
													}, '-', {
														itemId : 'delete3',
														text : 'Xóa',
														iconCls : 'icon-del',
														disabled : true,
														handler : function() {
															var me = this.up('form');
															var privateMemCount = me.getPrivateMemCount();
			//												console.log('sdf ' + privateMemCount);
															if(privateMemCount>0)
																Ext.MessageBox.alert('Thông báo','Bạn chỉ có thể xóa nếu nhóm trống');
															else
																Ext.MessageBox.confirm('Thông báo', 'Xác nhận xóa?', function(btn){
																	if(btn=='yes')
																		me.Remove3();
																} );
											}
													}, '-', {
														itemId : 'save3',
														text : 'Lưu',
														iconCls : 'icon-accept',
														handler : function() {
															var form = this.up('form');
															form.Save3();
														}
													}, {
														xtype : 'tbfill'
													}, {
												xtype : 'checkbox',
												boxLabel : 'Tất cả',
												itemId : 'markall3',
												margin : '0 5 0 0',
												listeners : {
													change : function(cbx, newValue,oldValue) {
														var me = this.up('form');
														me.MarkAll3(newValue);
														me.down('#delete3').setDisabled(me.selections('#grid3')==0);
			//											me.down('#delete3').setDisabled(!newValue);
													}
												}
											
													}]
										}]
						}]
			}]
			}]
		}, {
			html : 'panel 3',
			flex : 1,
			layout : {
				type : 'vbox',
				align : 'stretch',
				pack : 'start'
			},
			items : [{
				html : 'panel 1',
//				flex : 1,
				height : 270,
				layout : {
					type : 'vbox',
					align : 'stretch',
					pack : 'start'
				},
				items : [{
							border : false,
							layout : 'hbox',
							items : [{
										flex : 1,
										xtype : 'textfield',
										itemId : 'name',
										fieldLabel : 'Tên'
									},{
										flex : 1,
										xtype : 'textfield',
										maskRe: /[0-9]/,
										itemId : 'msisdn',
										fieldLabel : 'SĐT'
									}]
						}, {
							flex : 1,
							width : '100%',
							xtype : 'grid',
							itemId : 'grid2',
							border : false,
							title : 'D/s thành viên (Danh bạ chung)',
							stripeRows : true,
							columnLines : true,
							autoScroll : true,
//							selModel : Ext.create('Ext.selection.RadioModel'),
							store : App.path('store.Member'),
							columns : [{
										text : 'STT',
										xtype : 'rownumberer',
										width : 30
									}, {
										text : 'Tên',
										dataIndex : 'name',
										flex : 1
									}, {
										text : 'Số điện thoại',
										dataIndex : 'msisdn',
										flex : 1
									},{
										xtype : 'checkcolumn',
										width : 30,
										sortable : false,
										dataIndex : 'active',
										editor : {
											xtype : 'checkbox'
										},
										stopSelection : false,
										listeners : {
											checkchange : function(column, recordIndex,
													ischecked) {
												var me = this.up('form');
												me.down('#delete2').setDisabled(me.selections('#grid2')==0);
												me.down('#add4').setDisabled(me.selections('#grid2')==0);
				//									me.LoadMsisdn(recordIndex,ischecked);
												// // var me = this.up('form');
												// var store =
												// Ext.getStore(App.path('store.InventoryList'));
												// // store.data.items[recordIndex].data.active
												// = checked;
												// var value =
												// store.data.items[recordIndex].data;
												// value.active ? value.active = 1 :
												// value.active = 0;
												// this.arrayGoods.push(value);
											}
										}
					}],
							listeners : {
								itemclick : function(dv, record, item, index, e) {
									var me = this.up('form');
									if(me.down('#name').disabled == true) {
										me.down('#name').setValue(record.data.name);
										me.down('#msisdn').setValue(record.data.msisdn);
										me.down('#repair2').enable();
										me.down('#name').setDisabled(true);
										me.down('#msisdn').setDisabled(true);
									}
								},
								selectionchange : function(selModel, selections) {
//									var me = this.up('form');
//									me.down('#delete2').setDisabled(selections.length === 0);
								}
							},
							dockedItems : [{
								xtype : 'toolbar',
								items : [{
											itemId : 'add2',
											text : 'Thêm',
											iconCls : 'icon-add',
											handler : function() {
												var me = this.up('form');
												if(me.ActionNotFinished() && this.text == 'Thêm'){
													Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
												} else {
													if(Ext.getCmp('tree_form').down('#viewcommondirtree').getSelectionModel().getSelection().length == 0){
														Ext.MessageBox.alert('Thông báo', 'Chọn thư mục trong <b>Danh bạ chung</b> bạn muốn thêm thành viên.');
													} else {
														var me = this.up('form');
														/*change and disable somethings*/
														this.setText('Đưa vào D/s');
														me.down('#form_upload_from_excel').setDisabled(true);
														me.down('#repair2').setDisabled(true);
														
														if(me.down('#name').disabled) { //dang click vao 1 record roi click Add
															me.down('#name').setDisabled(false);
															me.down('#msisdn').setDisabled(false);
															me.down('#name').setValue('');
															me.down('#msisdn').setValue('');
															me.down('#name').focus(true);
														} else { //check msisdn then add
															//Check if existed phone number
															var numberExist = me.numberExist();
															console.log(numberExist);
															if(numberExist)
																Ext.MessageBox.alert('Thông báo', 'Đã có thành viên sử dụng số ĐT này');
															else
																me.Add2();
														}
													}
												}
											}
										}, '-', {
											itemId : 'repair2',
											text : 'Sửa',
											iconCls : 'icon-repair',
											handler : function() {
											var me = this.up('form');
											if(me.ActionNotFinished()){
												Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
											} else {
												this.disable(true);
												me.Repair2();
											}
											}
										}, '-', {
											itemId : 'delete2',
											text : 'Xóa',
											iconCls : 'icon-del',
											disabled : true,
											handler : function() {
												var me = this.up('form');
												if(me.ActionNotFinished()){
													Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
												} else {
													Ext.MessageBox.confirm('Thông báo', 'Xác nhận xóa?', function(btn){
														if(btn=='yes')
															me.Remove2();
													} );
												}
											}
										}, '-', {
												itemId : 'save2',
												text : 'Lưu',
												iconCls : 'icon-accept',
												handler : function() {
													var form = this.up('form');
													form.Save2();
												}
											}, {
											xtype : 'tbfill'
										}, {
									xtype : 'checkbox',
									boxLabel : 'Tất cả',
									itemId : 'markall2',
									margin : '0 5 0 0',
									listeners : {
										change : function(cbx, newValue,oldValue) {
											var me = this.up('form');
											me.MarkAll2(newValue);
											me.down('#delete2').setDisabled(me.selections('#grid2')==0);
//											me.down('#delete2').setDisabled(!newValue);
										}
									}
								
										}]
							}],
//							viewConfig: {
//					            stripeRows: true,
//					            listeners: {
//					                itemcontextmenu: function(view, rec, node, index, e) {
//					                    e.stopEvent();
//					                    if (!this.menu) {
//											this.menu = Ext.create(App.path('view.GridContextMenu'));
//										}
//										this.menu.showAt(e.getXY());
//					                    return false;
//					                }
//					            }
//					        }
						}, {
							border : false,
							layout : 'hbox',
							itemId: 'form_upload_from_excel',
							items : [{
										xtype : 'form',
										itemId : 'form_add_excel_2',
	//											width : '60%',
										border : false,
										items : [{
	//													margin : '5 5 5 5',
												xtype : 'filefield',
//												buttonOnly: true,
												itemId : 'file_link',
												fieldLabel : 'D/s thành viên',
												hideLabel : true,
												msgTarget : 'side',
												buttonText : 'Nhập từ file Excel',
												listeners : {
													change : function(field, value) {
														var mainForm = this.up('form').up('form');
														mainForm.down('#save2').setDisabled(false);
//																mainForm.down('#file_name').setValue(value);
													}
												}
											}
//											,{
//											width : 100,
//											itemId : 'file_name',
//											fieldLabel : 'đường dẫn',
//											readOnly : true,
//											fieldStyle: 'background-color: #ddd; background-image: none;'
//											}
											]
									}, {
										width : 100,
										border : false,
										buttons : [{
													itemId : 'downTempFile',
													text : 'Tải file mẫu',
//													iconCls : 'icon-accept',
													handler : function() {
														var linkfile = window.location.href.split("#")[0] +'files/DS-Nhan-Vien.xls';
														var win = window.open(App.ActionMe.ReplaceAll(linkfile,'undefined/',''), '_blank');
													}
												}]
									}, {
										xtype : 'tbfill'
									}]
						}]
			}, {
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch',
					pack : 'start'
				},
				items : [{
				html : 'panel 1',
				flex : 1,
				layout : {
					type : 'vbox',
					align : 'stretch',
					pack : 'start'
				},
				items : [{
							flex : 1,
							width : '100%',
							width : '100%',
							xtype : 'grid',
							itemId : 'grid4',
							border : false,
							title : 'D/s thành viên (Danh bạ riêng)',
							stripeRows : true,
							columnLines : true,
							autoScroll : true,
//							selModel : Ext.create('Ext.selection.RadioModel'),
							store : App.path('store.MemberPrivateList'),
							columns : [{
										text : 'STT',
										xtype : 'rownumberer',
										width : 30
									}, {
										text : 'Tên',
										dataIndex : 'name',
										flex : 1
									}, {
										text : 'Số điện thoại',
										dataIndex : 'msisdn',
										flex : 1
									},{
										xtype : 'checkcolumn',
										width : 30,
										sortable : false,
										dataIndex : 'active',
										editor : {
											xtype : 'checkbox'
										},
										stopSelection : false,
										listeners : {
											checkchange : function(column, recordIndex,
													ischecked) {
												var me = this.up('form');
												me.down('#delete4').setDisabled(me.selections('#grid4')==0);
				//									me.LoadMsisdn(recordIndex,ischecked);
												// // var me = this.up('form');
												// var store =
												// Ext.getStore(App.path('store.InventoryList'));
												// // store.data.items[recordIndex].data.active
												// = checked;
												// var value =
												// store.data.items[recordIndex].data;
												// value.active ? value.active = 1 :
												// value.active = 0;
												// this.arrayGoods.push(value);
											}
										}
					}],
							listeners : {
								itemclick : function(dv, record, item, index, e) {
									var me = this.up('form');
//									me.LoadCommonDirMember(record.data.group_name);
								},
								selectionchange : function(selModel, selections) {
//									var me = this.up('form');
//									me.down('#delete4').setDisabled(selections.length === 0);
								}
							},
							dockedItems : [{
								xtype : 'toolbar',
								items : [{
											itemId : 'add4',
											text : 'Thêm từ danh bạ chung',
											iconCls : 'icon-add',
											handler : function() {
											var me = this.up('form');
											if(me.ActionNotFinished()){
												Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
											} else {
												me.Add4();
											}
											}
										}, '-', {
											itemId : 'delete4',
											text : 'Xóa',
											iconCls : 'icon-del',
											disabled : true,
											handler : function() {
												var me = this.up('form');
												if(me.ActionNotFinished()){
													Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
												} else {
													Ext.MessageBox.confirm('Thông báo', 'Xác nhận xóa?', function(btn){
														if(btn=='yes')
															me.Remove4();
													} );
												}
								}
										}, '-', {
											itemId : 'save4',
											text : 'Lưu',
											iconCls : 'icon-accept',
											handler : function() {
												var form = this.up('form');
												form.Save4();
											}
										}, {
											xtype : 'tbfill'
										}, {
									xtype : 'checkbox',
									boxLabel : 'Tất cả',
									itemId : 'markall4',
									margin : '0 5 0 0',
									listeners : {
										change : function(cbx, newValue,oldValue) {
											var me = this.up('form');
											me.MarkAll4(newValue);
											me.down('#delete4').setDisabled(me.selections('#grid4')==0);
//											me.down('#delete4').setDisabled(!newValue);
										}
									}
								
										}]
							}]
						}]
			}]
			}]
		}]
	},
	activate : function() {
		var me = this;
		/*some action when form load*/
		me.DisableItemsWhenActivate();
		me.ResetValueOfItems();
		
		Ext.getCmp('component_space').update('<div id ="tree_space"></div>');
		if(Ext.getCmp('ViewCommonDirTree2'))
			Ext.getCmp('ViewCommonDirTree2').deactive();
		console.log(Ext.getCmp('component_space').down('#tree_space'));
		var form = new Ext.FormPanel({
//			height : '300px',
		    renderTo: 'tree_space', 
		    id : 'tree_form',
		    items:[{
				itemId : 'viewcommondirtree',
				xtype : 'viewcommondirtree',
//				text : 'xxxxxxxxxxxxxx',
				width : '100%',
				border : false,
//				height : '300px'
			}]

		});
		console.log(form.down('#viewcommondirtree'));
//		Ext.getCmp('ViewSendSmsDetail').down('#viewcommondirtree2').destroy();
		form.down('#viewcommondirtree').activate();
		this.LoadPrivateList();
		
		this.getForm().reset();
		this.down('#grid3').getStore().removeAll();
		
		this.down('#grid2').getStore().removeAll();
		this.down('#grid4').getStore().removeAll();
		
		this.member_list_add = [];
		this.group_list_remove = [];
		this.member_list_add = [];
		this.member_list_remove = [];
		this.member_list_update = [];
		this.private_list_add = [];
		this.private_list_remove = [];
		this.group_member_name = null;

		this.dir_id = this.data.dir_id;

//		this.LoadMember();
	},
	DisableItemsWhenActivate: function() {
		this.down('#add4').setDisabled(true);
		
		this.down('#repair2').setDisabled(true);
		this.down('#repair3').setDisabled(true);
		
		this.down('#save2').setDisabled(true);
		this.down('#save3').setDisabled(true);
		this.down('#save4').setDisabled(true);
		
		this.down('#delete2').setDisabled(true);
		this.down('#delete3').setDisabled(true);
		this.down('#delete4').setDisabled(true);
		
		/*form add memmber to group*/
		this.down('#name').setDisabled(true);
		this.down('#msisdn').setDisabled(true); 
		this.down('#form_upload_from_excel').setDisabled(false);
		
		/*form add new private list*/
		this.down('#name_of_list').setDisabled(true);
		this.down('#description').setDisabled(true); 
		
		console.log('button disabled');
	},
	ResetValueOfItems: function(){
		this.down('#add2').setText("Thêm");
		this.down('#add3').setText("Thêm");
		
		this.down('#form_add_excel_2').getForm().reset();
	},
	ActionNotFinished: function(){
		if(this.down('#save2').disabled
				&& this.down('#save3').disabled
				&& this.down('#save4').disabled) {
			// all action finished
			return false;
		} else {
			// at least one action not finished
			return true;
		}
		// Ext.MessageBox.alert('Thông báo', 'Có hành động chưa hoàn thành. Lưu lại trước khi tiếp tục.');
	},
	SendCommonDirId : function(dir_id) {
		this.dir_id = dir_id;
	},
	LoadMember : function() {
		var store = Ext.getStore(App.path('store.BrandMember'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.account_id = this.data.account_id;
		store.load();
	},
	LoadCommonDirMember : function(dirId) {
		/*some action when form load*/
		this.DisableItemsWhenActivate();
		this.ResetValueOfItems();
		
//		var store = Ext.getStore(App.path('store.Member'));
//		var memJS = [];
//		Ext.each(mems, function (item) {
//			memJS.push(item);
//        });
//        Ext.encode(memJS);
//        console.log(memJS);
//        store.loadData(memJS,false);
		this.down('#msisdn').setValue('');
		this.down('#name').setValue('');
		var dirArr = [];
		dirArr.push(dirId);
		var store = Ext.getStore(App.path('store.Member'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.dir_id = Ext.encode(dirArr);
		store.load();
	},
	LoadMemberPrivateList : function(listId) {
		var listArr = [];
		listArr.push(listId);
		var store = Ext.getStore(App.path('store.MemberPrivateList'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.list_ids = Ext.encode(listArr);
		store.load();
	},
	LoadPrivateList : function(dirId) {
		var store = Ext.getStore(App.path('store.PrivateList'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.load();
	},
	Add1 : function() {
		if (this.down('#msisdn').getValue() && this.down('#name').getValue()) {
			var store = this.down('#grid1').getStore();
			var member = {
				account_id : this.account_id,
				name : this.down('#name').getValue(),
				msisdn : App.ActionMe.FormatMsisdn(this.down('#msisdn').getValue()),
				department : this.down('#department').getValue(),
				company : this.down('#company').getValue()
			};
			store.add(member);
			this.member_list_add.push(member);
			this.ResetFormMember();
		}
	},
	numberExist : function(){
		var store = this.down('#grid2').getStore();
		var number = this.down('#msisdn').getValue();
		//check if number is exist
		for(i=0;i<store.data.length;i++){
			if(store.data.items[i].get('msisdn') == number){
//		console.log(store.data.items[0]);
//		store.each(function(rec) {
//			if (rec.get('msisdn') == number) {
				console.log('existed');
				return true;
			}
//		});
		}
		return false;
	},
	Add2 : function() {
		
		if (this.down('#name').getValue()) {
			var store = this.down('#grid2').getStore();
			var member = {
				name : this.down('#name').getValue(),
				msisdn : App.ActionMe.FormatMsisdn(this.down('#msisdn').getValue().toString())
			};
			store.add(member);
			this.member_list_add.push(member);
			
			/*enable save button and focus name field*/
			this.down('#save2').setDisabled(false);
			this.down('#name').focus(true);
			
			this.ResetForm2();
		}
	},
	ResetForm2 : function() {
		this.down('#name').setValue('');
		this.down('#msisdn').setValue('');
	},
	AddExcel2 : function(){
		
	},
	Add3 : function() {
		if (this.down('#name_of_list').getValue()) {
			var store = this.down('#grid3').getStore();
			var member = {
				name : this.down('#name_of_list').getValue(),
				description : this.down('#description').getValue(),
				user_id : App.Session.user_id + ''
			};
			store.add(member);
			this.private_list_add.push(member);
			this.ResetFormGroup();
			
			/*enable save button and focus name field*/
			this.down('#save3').setDisabled(false);
			this.down('#name_of_list').focus(true);
		}
	},
	Add4 : function() {
		this.member_private_list_add = [];
		if(this.list_id) {
			var selections = [];
			var store = this.down('#grid2').getStore();
			var grid = this.down('#grid2');
			
			store.each(function(rec) {
				if (rec.get('active') == true) {
							selections.push({
								member_id : rec.data.member_id.toString(),
					  			name : rec.data.name,
					  			msisdn : rec.data.msisdn.toString()
									});
						}
					});
	         
	        for (var i = 0; i < selections.length; i++) {
				this.member_private_list_add.push({
					member_id : selections[i].member_id.toString(),
					name : selections[i].name,
					msisdn : selections[i].msisdn.toString()
				});
			}
			grid.getView().refresh();
	
	//		Add to grid 4
			var store = this.down('#grid4').getStore();
			store.add(this.member_private_list_add);
			
			/*enable save button*/
			this.down('#save4').setDisabled(false);
		} else {
			Ext.MessageBox.alert('Thông báo', 'Chọn nhóm trong danh bạ riêng');
		}
	},
	ResetForm4 : function() {
		this.down('#name2').setValue('');
		this.down('#msisdn2').setValue('');
	},
	Remove1 : function() {
		
		var selections = [];
		var store = this.down('#grid1').getStore();
		var grid = this.down('#grid1');
		
		store.each(function(rec) {
			if (rec.get('active') == true) {
						selections.push({
									account_id : rec.data.account_id,
									name : rec.data.name,
									msisdn : rec.data.msisdn.toString(),
									department : rec.data.department,
									company : rec.data.company
								});
					}
				});
		var i = store.getCount()-1; 
            for (i; i>=0; i--) {
                if (store.getAt(i).get('active')==true) {
                    store.removeAt(i);
                }
            }
            
		for (var i = 0; i < selections.length; i++) {
			var member = {
			  			account_id : selections[i].account_id,
						name : selections[i].name,
						msisdn : selections[i].msisdn.toString(),
						department : selections[i].department,
						company : selections[i].company
			  		};
	  		this.member_list_remove.push(member);
		}
		grid.getView().refresh();
		this.ResetFormGroupMember();
	},
	Remove2 : function() {
		
		var selections = [];
		var store = this.down('#grid2').getStore();
		var grid = this.down('#grid2');
		
		store.each(function(rec) {
			if (rec.get('active') == true) {
						selections.push({
							member_id : rec.data.member_id.toString()
								});
					}
				});
				
		var i = store.getCount()-1; 
            for (i; i>=0; i--) {
                if (store.getAt(i).get('active')==true) {
                    store.removeAt(i);
                }
            }
        
        for (var i = 0; i < selections.length; i++) {
			this.member_list_remove.push({
				member_id : selections[i].member_id.toString()
			});
		}
		
		grid.getView().refresh();
		
		/*enable save button and set blank fields*/
		this.down('#save2').setDisabled(false);
		this.down('#delete2').setDisabled(true);
		this.down('#name').setValue('');
		this.down('#msisdn').setValue('');
	},
	getPrivateMemCount : function(){
//		var record = this.down('#grid3').getSelectionModel().getSelection()[0];
//		console.log(record.data.list_id);
		var store = this.down('#grid3').getStore();
		var count = 0;
		for(i=0;i<store.data.length;i++){
			if(store.data.items[i].get('active') == true){
				count += store.data.items[i].data.memcount;
			}
		}
			
		return count;

	},
	Remove3 : function() {

		var selections = [];
		var store = this.down('#grid3').getStore();
		var grid = this.down('#grid3');
		
		store.each(function(rec) {
			if (rec.get('active') == true) {
						selections.push({
							list_id : rec.data.list_id.toString()
								});
					}
				});
		var i = store.getCount()-1; 
            for (i; i>=0; i--) {
                if (store.getAt(i).get('active')==true) {
                    store.removeAt(i);
                }
            }
         
        for (var i = 0; i < selections.length; i++) {
			this.private_list_remove.push({
				list_id : selections[i].list_id.toString()
			});
		}
		grid.getView().refresh();
		this.ResetFormGroupMember();
		
		/*enable save button and set blank fields*/
		this.down('#save3').setDisabled(false);
		this.down('#delete3').setDisabled(true);
		
		this.down('#name_of_list').setValue('');
		this.down('#description').setValue('');
		
		this.down('#name_of_list').setDisabled(true);
		this.down('#description').setDisabled(true);
	},
	Remove4 : function() {

		var selections = [];
		var store = this.down('#grid4').getStore();
		var grid = this.down('#grid4');
		
		store.each(function(rec) {
			if (rec.get('active') == true) {
						selections.push({
							member_id : rec.data.member_id.toString(),
				  			name : rec.data.name,
				  			msisdn : rec.data.msisdn.toString()
								});
					}
				});
		var i = store.getCount()-1; 
            for (i; i>=0; i--) {
                if (store.getAt(i).get('active')==true) {
                    store.removeAt(i);
                }
            }
         
        for (var i = 0; i < selections.length; i++) {
			this.member_private_list_remove.push({
				member_id : selections[i].member_id.toString(),
				name : selections[i].name,
				msisdn : selections[i].msisdn.toString()
			});
		}
		grid.getView().refresh();
//		this.ResetForm4();
		/*enable save button and set blank fields*/
		this.down('#save4').setDisabled(false);
		this.down('#delete4').setDisabled(true);
	},
	Save1 : function() {
		var me = this;
		
//		var grid = this.down('#grid1');
//		grid.store.suspendEvents(); // avoid view update after each row
//		grid.store.each(function(rec) {
//			if(rec.get('active') == true)
//					console.log(rec.data);
//				});
//		grid.store.resumeEvents();
		
		if (this.member_list_add.length > 0)
			this.BrandMemberAdd();
		if (this.member_list_remove.length > 0)
			this.BrandMemberRemove();
		this.ResetAllMark();
	},
	Save2 : function() {
		var me = this;
//		var currMsisdn = me.down('#msisdn').getValue().toString();
//		console.log(me.down('#msisdn').getValue().toString());
		
		var treeForm = Ext.getCmp('tree_form');
		if (treeForm.down('#viewcommondirtree').getSelectionModel().getSelection().length != 0) {
			if (this.down('#file_link').getValue() != '') {
				var form1 = this.down('#form_add_excel_2');
				if (form1.isValid()) {
					form1.submit({
								url : 'uploadfile',
								actionMethods : {
									create : 'POST',
									read : 'POST',
									update : 'POST',
									destroy : 'POST'
								},
								success : function(form1, action) {
									me.file_link = action.result.url;
									if (me.file_link != null
											&& me.file_link != '') {
										me.CommonDirMemberAddFromExcel();
									}
//									me.down('#repair2').enable();
//									me.ResetAllMark();
//									
//									/*Reset form after save done*/
//									me.DisableItemsWhenActivate();
//									me.ResetValueOfItems();
								}
								
							});
				};
			} else {
				if (this.member_list_add.length > 0)//add
					this.CommonDirMemberAdd(this.member_list_add);
				console.log(this.member_list_remove.length);
				if (this.member_list_remove.length > 0) {//remove
					this.CommonDirMemberRemove();
					console.log('remove');
				}
				if (this.member_id_update != null) {//update
					var numberExist = me.numberExist();
					console.log(numberExist);
					if(numberExist){
						Ext.MessageBox.alert('Thông báo', 'Đã có thành viên sử dụng số ĐT này');
						var store = this.down('#grid2').getStore();
						store.load();
					}
					else{
						var member = {
							member_id : this.member_id_update.toString(),
							name : this.down('#name').getValue().toString(),
							msisdn : this.down('#msisdn').getValue().toString()
						}
						this.member_list_update.push(member);
						this.CommonDirMemberAdd(this.member_list_update);
					}
				}
			}
		} else {
			Ext.MessageBox.alert('Thông báo', 'Chọn thư mục trong danh bạ chung');
		}

		this.down('#repair2').enable();
		this.ResetAllMark();
		
		/*Reset form after save done*/
		me.DisableItemsWhenActivate();
		me.ResetValueOfItems();
		
	},
	CommonDirMemberAddFromExcel : function(){
		var me = this;
		Ext.get(document.body).mask('Chờ giây lát..');
		App.Action.CommonDirMemberAddFromExcel(App.Session.user_id, this.dir_id, me.file_link , function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo','Cập nhật thành công');
							me.LoadCommonDirMember(me.dir_id);
						} else {
							Ext.MessageBox.alert('Thông báo',
									'Cập nhật thất bại ' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', 'Cập nhật thất bại '
										+ response.info);
					}
					Ext.get(document.body).unmask();
				});
		this.file_link = [];
	},
	
	Save3 : function() {
		var me = this;
//		console.log(this.private_list_add);
		if (this.private_list_add.length > 0){
			this.PrivateListAdd(this.private_list_add);
//			alert('sdf');
		}
			
		if (this.private_list_remove.length > 0)
			this.PrivateListRemove();
		console.log(this.private_list_id_update);
		if (this.private_list_id_update != null) {
//			console.log('sdfzzz');
			var list = {
				list_id : this.private_list_id_update,
				name : this.down('#name_of_list').getValue(),
				description : this.down('#description').getValue()
			}
			this.private_list_update.push(list);
			this.PrivateListAdd(this.private_list_update);
		}
		this.down('#repair3').enable();
		this.ResetAllMark();
	},
	Save4 : function() {
		var me = this;
		if (this.member_private_list_add.length > 0)
			this.PrivateListMemberAdd();
		if (this.member_private_list_remove.length > 0) {
			console.log('remove');
			this.PrivateListMemberRemove();
		}
		this.ResetAllMark();
		this.LoadPrivateList();
	},
	Search : function(type) {
		switch (type) {
			case 1 :
				this.Search1();
				break;
			case 2 :
				this.Search2();
				break;
		}
	},
	Search1 : function() {
		var store = Ext.getStore(App.path('store.BrandMember'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.account_id = this.data.account_id;
		store.getProxy().extraParams.keyword = this.down('#keyword1').getValue();
		store.load();
		store.getProxy().extraParams.keyword = null;
		this.down('#keyword1').setValue('');
	},
	Search2 : function() {
		var store = Ext.getStore(App.path('store.BrandGroup'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.account_id = this.data.account_id;
		store.getProxy().extraParams.keyword = this.down('#keyword2').getValue();
		store.load();
		store.getProxy().extraParams.keyword = null;
		this.down('#keyword2').setValue('');
	},
	Update : function() {
		// Ext.get(document.body).mask('Chờ giây lát..');
		var me = this;

		if (this.member_list_add.length > 0)
			this.BrandMemberAdd();
		if (this.member_list_remove.length > 0)
			this.BrandMemberRemove();
		if (this.member_list_add.length > 0)
			this.CommonDirMemberAdd();
		if (this.group_list_remove.length > 0)
			this.BrandGroupRemove();
		if (this.private_list_add.length > 0)
			this.BrandGroupMemberAdd();
		if (this.private_list_remove.length > 0)
			this.BrandGroupMemberRemove();
	},
	Repair2 : function() {
		var me = this;
		var value = this.down('#grid2').getSelectionModel().getSelection();
		var store = this.down('#grid2').getStore();
		store.remove(value);
		store.sync();
		this.down('#name').focus(true);
		me.down('#name').setDisabled(false);
		me.down('#msisdn').setDisabled(false);
		this.member_id_update = value[0].data.member_id.toString();
		
		/*enable save button and focus name field*/
		this.down('#save2').setDisabled(false);
		this.down('#form_upload_from_excel').setDisabled(true);
	},
	Repair3 : function() {
		var me = this;
		var value = this.down('#grid3').getSelectionModel().getSelection();
		this.down('#name_of_list').focus(true);
		me.down('#name_of_list').setDisabled(false);
		me.down('#description').setDisabled(false);
		this.private_list_id_update = value[0].data.list_id.toString();
		
		/*enable save button and focus name field*/
		this.down('#save3').setDisabled(false);
	},
	Repair : function() {
		var me = this;
		var member = {
			account_id : this.account_id,
			name : this.down('#name').getValue(),
			msisdn : App.ActionMe.FormatMsisdn(this.down('#msisdn').getValue()),
			position : this.down('#position').getValue(),
			department : this.down('#department').getValue(),
			company : this.down('#company').getValue(),
			more_info : this.down('#more_info').getValue()
		};
		this.member_list_update.push(member);
		App.Action.BrandMemberAdd(App.Session.user_id, this.account_id, Ext
						.encode(this.member_list_update), function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo',
									'Cập nhật thành công');
							me.LoadMember();
						} else {
							Ext.MessageBox.alert('Thông báo',
									'Cập nhật thất bại ' + response.info);
						}
					} else {
						ViewIndex.setLoading(false);
						Ext.MessageBox.alert('Thông báo', 'Cập nhật thất bại '
										+ response.info);
					}
				});
		this.member_list_update = [];
	},
	CommonDirMemberAdd : function(memberlist) {
		var me = this;
		var msg = 'Cập nhật ';
		App.Action.CommonDirMemberAdd(App.Session.user_id, this.dir_id, Ext
						.encode(memberlist), function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo', msg + 'thành công.');
							me.LoadCommonDirMember(me.dir_id);
							
							/*some action when form load*/
							me.DisableItemsWhenActivate();
							me.ResetValueOfItems();
							
						} else {
							Ext.MessageBox.alert('Thông báo', msg + 'thất bại.' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', msg + 'thất bại.' + response.info);
					}
				});
		this.member_list_add = [];
		this.member_list_update = [],
		this.member_id_update = null;
	},
	CommonDirMemberRemove : function() {
		var msg = 'Cập nhật ';
		App.Action.CommonDirMemberRemove(App.Session.user_id, this.dir_id, 
				Ext .encode(this.member_list_remove), function(options, success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo',msg + 'thành công.');
							
							/*some action when form load*/
							me.DisableItemsWhenActivate();
							me.ResetValueOfItems();
						} else {
							Ext.MessageBox.alert('Thông báo', msg + 'thất bại.' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', msg + 'thất bại.' + response.info);
					}
				});
		this.member_list_remove = [];
	},
	PrivateListAdd : function(privatelist) {
		var me = this;
		var msg = 'Cập nhật ';
		App.Action.PrivateListAdd(App.Session.user_id, Ext.encode(privatelist), 
					function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo',msg + 'thành công.');
							me.LoadPrivateList();
							
							/*some action when form load*/
							me.DisableItemsWhenActivate();
							me.ResetValueOfItems();
						} else {
							Ext.MessageBox.alert('Thông báo',msg + 'thất bại.' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', msg + 'thất bại.'+ response.info);
					}
				});
		this.private_list_update = [],
		this.private_list_add = [];
	},
	PrivateListRemove : function() {
		var msg = 'Cập nhật ';
		App.Action.PrivateListRemove(App.Session.user_id, Ext.encode(this.private_list_remove), 
					function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo',msg + 'thành công.');
							
							/*some action when form load*/
							me.DisableItemsWhenActivate();
							me.ResetValueOfItems();
						} else {
							Ext.MessageBox.alert('Thông báo',msg + 'thất bại.' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', msg + 'thất bại.'+ response.info);
					}
				});
		this.private_list_remove = [];
	},
	PrivateListMemberAdd : function() {
		var me = this;
		var msg = 'Cập nhật ';
		App.Action.PrivateListMemberAdd(App.Session.user_id, this.list_id, Ext.encode(this.member_private_list_add), 
					function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo', msg + 'thành công.');
							/*some action when form load*/
							me.DisableItemsWhenActivate();
							me.ResetValueOfItems();
						} else {
							Ext.MessageBox.alert('Thông báo', msg + 'thất bại.' + response.info);
						}
					} else {
						ViewIndex.setLoading(false);
						Ext.MessageBox.alert('Thông báo', msg + 'thất bại.'+ response.info);
					}
				});
		this.member_private_list_add = [];
	},
	PrivateListMemberRemove : function() {
		var msg = 'Cập nhật ';
		var me = this;
		App.Action.PrivateListMemberRemove(App.Session.user_id, this.list_id, Ext.encode(this.member_private_list_remove), 
					function(options,
						success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo', msg + 'thành công.');
							/*some action when form load*/
							me.DisableItemsWhenActivate();
							me.ResetValueOfItems();
						} else {
							Ext.MessageBox.alert('Thông báo', msg + 'thất bại.' + response.info);
						}
					} else {
						ViewIndex.setLoading(false);
						Ext.MessageBox.alert('Thông báo', msg + 'thất bại.'+ response.info);
					}
				});
		this.member_private_list_remove = [];
	},
	BrandGroupMemberAdd : function() {
		App.Action.BrandGroupMemberAdd(App.Session.user_id, this.account_id,
				this.group_member_name, Ext.encode(this.private_list_add),
				function(options, success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo','Cập nhật thành công');

						} else {
							Ext.MessageBox.alert('Thông báo','Cập nhật thất bại ' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', 'Cập nhật thất bại ' + response.info);
					}
				});
		this.private_list_add = [];	
	},
	BrandGroupMemberRemove : function() {
		App.Action.BrandGroupMemberRemove(App.Session.user_id, this.account_id,
				this.group_member_name, Ext
						.encode(this.private_list_remove), function(
						options, success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo','Cập nhật thành công');
						} else {
							Ext.MessageBox.alert('Thông báo', 'Cập nhật thất bại ' + response.info);
						}
					} else {
						ViewIndex.setLoading(false);
						Ext.MessageBox.alert('Thông báo', 'Cập nhật thất bại ' + response.info);
					}
				});
		this.private_list_remove = [];
	},
	ResetFormMember : function() {
		this.down('#msisdn').setValue('');
		this.down('#name').setValue('');
		this.down('#department').setValue('');
		this.down('#company').setValue('');
	},
	LoadDataFormMember : function(data) {
		this.down('#msisdn').setValue(data.msisdn);
		this.down('#name').setValue(data.name);
		this.down('#department').setValue(data.department);
		this.down('#company').setValue(data.company);
	},
	ResetFormGroup : function() {
		this.down('#name_of_list').setValue('');
		this.down('#description').setValue('');
	},
	ResetFormGroupMember : function() {
//		this.down('#member').setValue('');
	},
	selections : function(grid){
		var me = this;
		var selections = 0;
		var store = me.down(grid).getStore();
		var grid = me.down(grid);
		store.each(function(rec) {
					if (rec.get('active') == true) {
						selections++;
					}
				});
		console.log(selections);
		return selections;
	},
	MarkAll2 : function(ischeckAll) {
		var grid = this.down('#grid2');
		grid.store.suspendEvents(); // avoid view update after each row
		grid.store.each(function(rec) {
					rec.set('active', ischeckAll)
				});
		grid.store.resumeEvents();
		grid.getView().refresh();
	},
	MarkAll3 : function(ischeckAll) {
		var grid = this.down('#grid3');
		grid.store.suspendEvents(); // avoid view update after each row
		grid.store.each(function(rec) {
					rec.set('active', ischeckAll)
				});
		grid.store.resumeEvents();
		grid.getView().refresh();		
	},
	MarkAll4 : function(ischeckAll) {
		var grid = this.down('#grid4');
		grid.store.suspendEvents(); // avoid view update after each row
		grid.store.each(function(rec) {
					rec.set('active', ischeckAll)
				});
		grid.store.resumeEvents();
		grid.getView().refresh();
		
	},
	ResetAllMark : function() {
		this.down('#markall2').setValue(false);
		this.down('#markall3').setValue(false);
		this.down('#markall4').setValue(false);
		this.MarkAll2(false);
		this.MarkAll3(false);
		this.MarkAll4(false);
	}
});
