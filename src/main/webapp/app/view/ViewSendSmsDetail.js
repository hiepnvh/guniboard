Ext.define(App.path('view.ViewSendSmsDetail'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewSendSmsDetail',
	id : 'ViewSendSmsDetail',
	title : 'Chi tiết gửi tin nhắn',
	border : false,
	layout : {
		type : 'fit'
	},
	requires : [App.path('view.ViewCommonDirTree2')],
	config : {
		map : new Ext.util.HashMap(),
		account_id : null,
		member_list : [],
		member_selection : null,
		group_selection : null,
		
		common_dir_id_selected : [],
//		shortcode_prefix : App.Session.shortcode_prefix,
		items : [{
			flex : 1,
			border : true,
			layout : {
				type : 'vbox',
				align : 'stretch',
				pack : 'start'
			},
			items : [{
				flex : 1,
				border : true,
				layout : 'hbox',
				items : [{
//					flex : 1,
					width : '50%',
					height : 270,
					border : true,
					layout : {
						type : 'vbox',
						align : 'stretch',
						pack : 'start'
					},
					items : [
					         {
								border : false,
								layout : 'hbox',
								defaultType : 'textfield',
								items : [{
										width : 105,
										xtype : 'label'
									}, {
									xtype : 'radiogroup',
									defaultType : 'radiofield', // each item will be
									itemId : 'radio_send',							// a radio button
									border : true,
									layout : 'anchor',
									items : [{
												
												// fieldLabel: 'Agent Type',
												boxLabel : 'Gửi ngay',
												name : 'send_type',
												checked : true,
												inputValue : true
											}, {
												boxLabel : 'Gửi vào ngày',
												name : 'send_type',
												inputValue : false
											}],
									listeners : {
										change : function(field, newValue, oldValue) {
											var form = this.up('form');
											if(newValue.send_type) {
												form.down('#send_datepicker').setVisible(false);
//												form.shortcode_prefix = form.down('#shortcode_prefix').getValue();
											} else {
												form.down('#send_datepicker').setVisible(true);
//												form.shortcode_prefix = '';
											} 
										}
									}
								}]
							}, {
								xtype : 'datetimefield',
//								border : false,
								layout : 'hbox',
								format : 'd/m/Y',
								itemId : 'send_datepicker',
								fieldLabel : 'Ngày gửi',
								value : new Date()
							},
							{
						margin : '5 0 5 0',
						border : false,
						layout : {
							type : 'hbox',
							align : 'stretch',
							pack : 'start'
						},
						items : [{
							width : 105,
							xtype : 'label',
							text : 'Đầu số gửi'
						},/*,{
							width : 50,
							xtype : 'textfield',
							itemId : 'shortcode_prefix',
							value : App.Session.shortcode_prefix,
							readOnly : true,
							fieldStyle : 'background-color: #ddd; background-image: none;'
						},{
							flex : 1,
							xtype : 'textfield',
							itemId : 'shortcode',
							maxLength : 12,
							fieldStyle : 'background-color: #fff; background-image: none;',
							listeners : {
								change : function(shortcode, newValue, oldValue, eOpts ){
									if(newValue.length>12)
									shortcode.setValue(newValue.substring(0,12));
								}
							}
						}*/{
							xtype : 'combo',
//							fieldLabel : 'Chọn đầu số gửi',
//							id: 'shortcode',
							displayField: 'name',
							valueField: 'name',
							forceSelection : true,
//							selectOnFocus: true,
							editable : false,
//							value : 'sdfs',
							itemId: 'shortcode',
							store:  Ext.create('Ext.data.Store', {
						        fields: ['name'],
						        data : App.Session.brandname
						    }) 
						}
						]
					}, {
						xtype : 'textfield',
						itemId : 'title',
						fieldLabel : 'Tiêu đề<span style="color: red;">(*)</span>',
						// readOnly : true,
						fieldStyle : 'background-color: #fff; background-image: none;'
					}, {
						flex : 1,
						xtype : 'textarea',
						itemId : 'text',
						fieldLabel : 'Nội dung<span style="color: red;">(*)</span>'
					}, {
						border : false,
						layout : 'hbox',
						items : [{
									xtype : 'tbfill'
								}, {
									width : 100,
									border : false,
									buttons : [{
												itemId : 'send',
												text : 'Gửi đi',
												iconCls : 'icon-accept',
												handler : function() {
													var form = this.up('form');
													
													var send_type = form.down('#radio_send').getValue().send_type;
										             var send_date = new Date(form.down('#send_datepicker').getValue());
										             console.log(form.down('#send_datepicker').getValue());
										             var now = new Date();
										             if(send_date<now && !send_type)
										              Ext.MessageBox.alert('Thông báo' , 'Thời gian gửi phải lớn hơn thời gian hiện tại');
										             else
										              Ext.MessageBox.confirm('Thông báo', 'Xác nhận gửi tin nhắn?', function(btn){
										               if(btn=='yes')
										                form.Send();
										              } );
//										             form.Send();
												}
											}]
								}]
					}]
				}, {
//					flex : 1,
					html : '<div id ="tree_space2"></div>',
					id : 'component_space2',
//					xtype : 'container',
					height : 270,
					width: '50%',
//					frame : true,
//					border : true
//					allowBlank : false
				},/*{
					flex : 1,
					itemId : 'viewcommondirtree2',
					xtype : 'viewcommondirtree2',
//					width : '100%',
					height : '100%'
					}*/]
			}, {
				flex : 1,
				border : true,
				layout : 'hbox',
				items : [{
					flex : 1,
					height : '100%',
					xtype : 'grid',
					itemId : 'grid2',
					border : true,
					title : 'D/s nhận tin nhắn',
					stripeRows : true,
					columnLines : true,
					autoScroll : true,
//					selModel : Ext.create('Ext.selection.RadioModel'),
					store : Ext.create('Ext.data.Store', {
								storeId : 'simpsonsStore',
								fields : ['create_date', 'name', 'msisdn',
										'member_id', 'dir_id']
							}),
					columns : [{
								text : 'STT',
								xtype : 'rownumberer',
								width : 30
							}, {
								text : 'Tên (Tên nhóm)',
								dataIndex : 'name',
								flex : 1
							}, {
								text : 'SĐT',
								dataIndex : 'msisdn',
								flex : 1
							}, {
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
										me.down('#delete2').setDisabled(me.selections()==0);
//										me.down('#delete2').setDisabled();
									}
								}
					}],
					dockedItems : [{
						xtype : 'toolbar',
						items : [{
									xtype : 'textfield',
									itemId : 'msisdn',
									fieldLabel : 'Số ngoài danh bạ',
									maskRe : /[0-9,]/
								}, {
									itemId : 'addout',
									text : 'Thêm',
									iconCls : 'icon-add',
									handler : function() {
										var me = this.up('form');
										if (me.down('#msisdn').getValue().length > 0) {
											var storeReceiv = me.down('#grid2')
													.getStore();
											var list_msisdn = me
													.down('#msisdn').getValue();
											var arr_msisdn = list_msisdn
													.split(',');
											for (var i = 0; i < arr_msisdn.length; i++) {
												storeReceiv.add({
													name : 'Chưa có tên',
													msisdn : App.ActionMe
															.FormatMsisdn(arr_msisdn[i]),
													type : 1
												});
											}
											me.down('#msisdn').setValue('');
										}
									}
								}, {
									xtype : 'tbfill'
								}, {
									itemId : 'delete2',
									text : 'Xóa',
									iconCls : 'icon-del',
									disabled : true,
									handler : function() {
										var me = this.up('form');
										Ext.MessageBox.confirm('Thông báo', 'Xác nhận xóa?', function(btn){
											if(btn=='yes')
												me.Remove2();
										} );
									}
								}, '-', {
									xtype : 'checkbox',
									boxLabel : 'Tất cả',
									itemId : 'markall2',
									margin : '0 5 0 0',
									listeners : {
										change : function(cbx, newValue,oldValue) {
											var me = this.up('form');
											me.MarkAll2(newValue);
											me.down('#delete2').setDisabled(me.selections()==0);
//											me.down('#delete2').setDisabled(!newValue);
										}
									}
								
										}]
					}],
					listeners : {
						itemclick : function(dv, record, item, index, e) {
							var me = this.up('form');
							// me.LoadDataFormMember(record.data);
							// me.LoadGroupMember(record.data.group_name);
						},
						selectionchange : function(selModel, selections) {
							var me = this.up('form');
//							me.down('#delete2')
//									.setDisabled(selections.length === 0);
						}
					}
				}, {
					title : 'Danh bạ riêng',
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
						itemId : 'grid3',
						border : false,
						// title : 'Danh bạ riêng',
						stripeRows : true,
						columnLines : true,
						autoScroll : true,
//						selModel : Ext.create('Ext.selection.RadioModel'),
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
								}, {
									xtype : 'checkcolumn',
									width : 30,
									sortable : false,
									dataIndex : 'active',
									editor : {
										xtype : 'checkbox'
									},
									stopSelection : false,
									listeners : {
										checkchange : function(column,
												recordIndex, ischecked) {
											var me = this.up('form');
											me.Check_PrivateList(recordIndex,
													ischecked);
											// // var me = this.up('form');
											// var store =
											// Ext.getStore(App.path('store.InventoryList'));
											// //
											// store.data.items[recordIndex].data.active
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
								// me.LoadDataFormGroup(record.data);
								// me.LoadMemberPrivateList(record.data.list_id);
								// me.list_id = record.data.list_id;
							},
							selectionchange : function(selModel, selections) {
								// var me = this.up('form');
								// me.down('#delete3').setDisabled(selections.length
								// === 0);
							}
						},
						dockedItems : [{
							xtype : 'toolbar',
							items : [{
										xtype : 'tbfill'
									}, '-', {
										xtype : 'checkbox',
										boxLabel : 'Tất cả',
										itemId : 'markall3',
										margin : '0 5 0 0',
										listeners : {
											change : function(cbx, newValue,
													oldValue) {
												var me = this.up('form');
												me.MarkAll3(newValue);

											}
										}

									}]
						}]
					}, {
						border : false,
						layout : 'hbox',
						items : [{
									xtype : 'tbfill'
								}/*
									 * , { width : 100, border : false, buttons : [{
									 * itemId : 'save3', text : 'Lưu', iconCls :
									 * 'icon-accept', handler : function() { var
									 * form = this.up('form'); form.Save3(); } }] }
									 */]
					}]
				}]
			}]
		}]
	},
	activate : function() {
		var send_type = this.down('#radio_send').getValue().send_type;
		console.log(this.down('#radio_send').getValue().send_type);
		if(!send_type)
			this.down('#send_datepicker').setVisible(true);
		else
			this.down('#send_datepicker').setVisible(false);
//		Ext.getCmp('ViewContactDetail').down('#viewcommondirtree').destroy();
//		console.log(this.down('#viewcommondirtree2'));
		Ext.getCmp('component_space2').update('<div id ="tree_space2"></div>');
		if(Ext.getCmp('ViewCommonDirTree'))
			Ext.getCmp('ViewCommonDirTree').deactive();
		/*console.log(Ext.getCmp('component_space2').down('#tree_space2'));*/
		var form = new Ext.FormPanel({
		    renderTo: 'tree_space2',
		    id : 'tree_form2',
		    items:[{
				itemId : 'viewcommondirtree2',
				xtype : 'viewcommondirtree2',
//				text : 'xxxxxxxxxxxxxx',
				width : '100%',
				border : false,
			}]

		});
		form.down('#viewcommondirtree2').activate();
		this.LoadPrivateList();
		this.ResetSendSmsForm();
		
		this.SetDefaultTextSms();
		/*console.log(App.Session.brandname[0].name);*/
		this.down('#shortcode').store.on('load', this.down('#shortcode').select(App.Session.brandname[0].name, true));

	},
	getUserBrandName : function(){
		var str = App.Session.brandname;
    	console.log(str);
    	var brandList = str.trim().split(',');
    	return brandList;
	},
	SetDefaultTextSms : function(){
		if(App.Session.infoUser.signature!='')
			this.down('#text').setValue('\n----------------\n' +App.Session.infoUser.signature);
		else
			this.down('#text').setValue('');
	},
	LoadPrivateList : function(dirId) {
		var store = Ext.getStore(App.path('store.PrivateList'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.load();
	},
	SendCommonDirId : function(dir_id) {
		this.dir_id = dir_id;
	},
	LoadCommonDirMember : function(dirId) {
		var store = Ext.getStore(App.path('store.Member'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.dir_id = dirId;
		store.load();
	},
//	LoadMemberPrivateList : function(listId) {
//		var store = Ext.getStore(App.path('store.MemberPrivateList'));
//		store.getProxy().extraParams.user_id = App.Session.user_id;
//		store.getProxy().extraParams.list_id = listId;
//		store.load();
//	},
	CheckboxProcess: function(storeMemberPrivateList,ischecked){
		var selections = [];
		var storeReceiv = this.down('#grid2').getStore();
		storeMemberPrivateList.each(function(rec) {
			selections.push({
						name : rec.data.name,
						msisdn : rec.data.msisdn,
						member_id : rec.data.member_id
					});
		});
		if(ischecked){
			for (var i = 0; i < selections.length; i++) {
				storeReceiv.add({
							name : selections[i].name,
							msisdn : selections[i].msisdn,
							member_id : selections[i].member_id
						});
			}
		}else{
			for (var i = 0; i < selections.length; i++) {
				var j = storeReceiv.getCount()-1; 
				var mem_id = selections[i].member_id;
			    for (j; j>=0; j--) {
			        if (storeReceiv.getAt(j).data.member_id==mem_id) {
			        	
			        	storeReceiv.removeAt(j);
			        }
			    }
			}
		}
	},
	Check_PrivateList : function(recordIndex, ischecked) {
		var me = this;
		var store = this.down('#grid3').getStore();
		var items = store.getRange();
		var listId = items[recordIndex].data.list_id;
		var lists = [];
		lists.push(listId);
		var storeMemberPrivateList = Ext.getStore(App.path('store.MemberPrivateList'));
		storeMemberPrivateList.getProxy().extraParams.user_id = App.Session.user_id;
		storeMemberPrivateList.getProxy().extraParams.list_ids =  Ext.encode(lists);
		storeMemberPrivateList.load({
			callback : function(records, options, success) {
				if (success) {
					me.CheckboxProcess(storeMemberPrivateList,ischecked);
				}
			}
		});
		
	},
	CheckAll_PrivateList : function(ischecked) {
		var me = this;
		var storeReceiv = this.down('#grid2').getStore();
		var storeMemberPrivateList = Ext.getStore(App.path('store.MemberPrivateList'));
		storeMemberPrivateList.getProxy().extraParams.user_id = App.Session.user_id;
		storeMemberPrivateList.getProxy().extraParams.list_ids = 0;
		storeMemberPrivateList.load({
			callback : function(records, options, success) {
				if (success) {
					if(storeReceiv.getCount()>0)
						me.CheckboxProcess(storeMemberPrivateList,false);
					me.CheckboxProcess(storeMemberPrivateList,ischecked);
				}
			}
		});
	},
	Check_CommonList : function(dir_id, ischecked) {
		var me = this;
		var storeCommonMember = Ext.getStore(App.path('store.Member'));
		storeCommonMember.getProxy().extraParams.user_id = App.Session.user_id;
		storeCommonMember.getProxy().extraParams.dir_id = dir_id;
		storeCommonMember.load({
			callback : function(records, options, success) {
				if (success) {
					me.CheckboxProcess(storeCommonMember,ischecked);
				}
			}
		});
		
	},
	Send : function() {
		Ext.get(document.body).mask('Chờ giây lát..');

		var me = this;
		var common_dir_id_selected =  new Ext.util.HashMap();

		var map = new Ext.util.HashMap();

		// var msisdn_member = this.down("#member").getValue();
		// if (msisdn_member)
		// this.map.add(msisdn_member, msisdn_member);

		var text = this.down('#text').getValue();

		var store = this.down('#grid2').getStore();
		store.suspendEvents(); // avoid view update after each row
		store.each(function(rec) {
					var msisdn = rec.get('msisdn');
					if (msisdn != null & msisdn != '')
						map.add(msisdn, msisdn);
					else {
						var dir_id = rec.get('dir_id');
						common_dir_id_selected.add(dir_id,dir_id);
					}
				});

		store.resumeEvents();
		this.down('#grid2').getView().refresh();

		if (me.IsValidForm(store)) {
//			var shortcode = this.shortcode_prefix
//					+ this.down('#shortcode').getValue();
			var shortcode = this.down('#shortcode').getValue();
			var title = this.down('#title').getValue();
			var send_type = this.down('#radio_send').getValue().send_type;
			var send_date = null;
			
			var sms = Ext.encode({
				user_id : App.Session.user_id.toString(),
				shortcode : shortcode,
				title : title,
				text : text
			});
			if(!send_type){
				send_date = App.ActionMe.DateToDBExactly(this.down('#send_datepicker').getValue());
				sms = Ext.encode({
							user_id : App.Session.user_id.toString(),
							shortcode : shortcode,
							title : title,
							text : text,
							send_date : send_date
//							,parent_campaign_id : null
						});
			}
			console.log(Ext.encode(common_dir_id_selected.getValues()));
			App.Action.SendSMSCampaign(
					App.Session.user_id,
					sms,
					Ext.encode(map.getValues()), 
					Ext.encode(common_dir_id_selected.getValues()),
					function(options, success,
							response) {
						if (success) {
							response = Ext
									.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox
										.alert(
												'Thông báo',
												'Tin nhắn đang được gửi đi');
								// Ext.MessageBox.confirm('Lưu',
								// 'Lưu danh bạ
								// mới ?',
								// function(btn){
								// if(btn ==
								// 'yes') {
								// me.ShowDialogAddMember();
								// }
								// else {
								// me.down('#msisdn').setValue('');
								// }
								// });

							} else {
								Ext.MessageBox
										.alert(
												'Thông báo',
												'Tin nhắn lỗi không gửi đi được');
							}
						} else {
							Ext.MessageBox
									.alert(
											'Thông báo',
											'Tin nhắn lỗi không gửi đi được');
						}
						Ext.get(document.body)
								.unmask();
						me.ResetSendSmsForm();
					});
				
//			if (me.common_dir_id_selected.length > 0) {
//				App.Action.CommonDirMemberGet(App.Session.user_id, Ext
//								.encode(me.common_dir_id_selected), function(
//								options, success, response) {
//							if (success) {
//								response = Ext.decode(response.responseText);
//								if (response.success) {
//									var items = response.member_list;
//									Ext.Array.each(items, function(rec) {
//												map.add(rec.msisdn, rec.msisdn);
//											});
//
//									
//								} else {
//									Ext.MessageBox.alert('Thông báo',
//											'Không lấy được dữ liệu');
//								}
//							} else {
//								Ext.MessageBox.alert('Thông báo',
//										'Không lấy được dữ liệu');
//							}
//							Ext.get(document.body).unmask();
//						});
//			} else {
//				App.Action.SendSMSCampaign(App.Session.user_id, sms, Ext
//								.encode(map.getValues()), function(options,
//								success, response) {
//							if (success) {
//								response = Ext.decode(response.responseText);
//								if (response.success) {
//									Ext.MessageBox.alert('Thông báo',
//											'Tin nhắn đang được gửi đi');
//									me.down('#msisdn').setValue('');
//								} else {
//									Ext.MessageBox.alert('Thông báo',
//											'Tin nhắn lỗi không gửi đi được');
//								}
//							} else {
//								Ext.MessageBox.alert('Thông báo',
//										'Tin nhắn lỗi không gửi đi được');
//							}
//							Ext.get(document.body).unmask();
//							me.ResetSendSmsForm();
//						});
//			}
			this.ResetAllMark();
		} else {
			Ext.get(document.body).unmask();
		}
	},
	IsValidForm : function() {
		if (this.down('#shortcode').getValue().trim() == '') {
			Ext.MessageBox.alert('Thông báo', 'Chưa nhập đầu số');
			return false;
		} else if (this.down('#title').getValue().trim() == '') {
			Ext.MessageBox.alert('Thông báo', 'Chưa nhập tiêu đề');
			return false;
		} else if (this.down('#text').getValue().trim() == '') {
			Ext.MessageBox.alert('Thông báo', 'Chưa nhập nội dung');
			return false;
		} else if (this.down('#grid2').getStore().getCount() == 0) {
			Ext.MessageBox.alert('Thông báo', 'Danh sách nhận tin nhắn trống');
			return false;
		}
		return true;
	},
	ResetSendSmsForm : function() {
		var me = this;
		this.down('#grid2').getStore().removeAll();
		me.member_list = [];
		me.down('#title').setValue('');
//		me.down('#shortcode').setValue('');
		me.map.clear();
		this.SetDefaultTextSms();
		//untick all tree node
		var treeForm = Ext.getCmp('tree_form2');
		var tree = treeForm.down('#viewcommondirtree2');
		console.log(tree.getRootNode());
		tree.getRootNode().cascadeBy(function(n){n.set('checked', false);} );
		
	},
	Remove2 : function() {

		var selections = [];
		var store = this.down('#grid2').getStore();
		var grid = this.down('#grid2');
		
		store.each(function(rec) {
			if (rec.get('active') == true) {
						selections.push({
							member_id : rec.data.member_id,
				  			name : rec.data.name,
				  			msisdn : rec.data.msisdn
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
				member_id : selections[i].member_id,
				name : selections[i].name,
				msisdn : selections[i].msisdn
			});
		}
		grid.getView().refresh();
	},
	selections : function(){
		var me = this;
		var selections = 0;
		var store = me.down('#grid2').getStore();
		var grid = me.down('#grid2');
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
		this.CheckAll_PrivateList(ischeckAll);
	},
	ResetAllMark : function() {
		this.down('#markall2').setValue(false);
		this.down('#markall3').setValue(false);
		this.MarkAll3(false);
	},
	SelectCommonDir : function(node){
		console.log("Run SelectCommonDir");
		var me = this;
		var treeForm = Ext.getCmp('tree_form2');
		var storeReceiv = this.down('#grid2').getStore();
		var dir_id = node.data.dir_id;
		
//		Remove all old data
		var i = storeReceiv.getCount()-1; 
            for (i; i>=0; i--) {
                if (storeReceiv.getAt(i).get('dir_id') != null && storeReceiv.getAt(i).get('dir_id') != '') {
                    storeReceiv.removeAt(i);
                }
            }
		
//			All items checked!
			var items = treeForm.down('#viewcommondirtree2').getChecked();
			/*console.log("All items checked:");
			console.log(items);*/
	        
			Ext.Array.each(items, function(rec) {
				var storeReceiv = me.down('#grid2').getStore();
				if(rec.data.dir_id=='temp_dir'){
					var smallest_dir = rec.parentNode;
//					console.log(smallest_dir.data.text);
					
					storeReceiv.add({
						name: smallest_dir.data.text,
						dir_id: smallest_dir.data.dir_id,
						msisdn: smallest_dir.raw.msisdn
					});
				}
				if(rec.data.dir_id.toString().indexOf('c')>-1){
					console.log('add mem to list');
					storeReceiv.add({
						name: rec.data.text,
						dir_id: rec.data.dir_id,
						msisdn: rec.raw.msisdn
					});
				}
			});
			
//			Ext.Array.each(items, function(rec) {
//				if(rec.data.parent_dir_id == dir_id){
//					var storeReceiv = me.down('#grid2').getStore();
//					storeReceiv.add({
//						name: rec.data.text,
//						dir_id: rec.data.dir_id,
//						msisdn: rec.raw.msisdn
//					});
//				}
//	        });
	},
	/* Expand a node */
	ExpandCommonDir : function(node) {
		var me = this;
		/*Get store Receive Message*/
		var storeReceiv = me.down('#grid2').getStore();
		var dir_id = node.data.dir_id;
		
		/*Remove node was expended*/
		var i = storeReceiv.getCount()-1; 
        for (i; i>=0; i--) {
        	if(storeReceiv.getAt(i).get('dir_id') == node.data.dir_id) {
        		storeReceiv.removeAt(i);
        	}
        }
        
        /*Get children of node just be removed and add to list*/
        var children = node.childNodes;
        for(var i=0;i<children.length;i++){
        	var rec = children[i];
        	storeReceiv.add({
						name: rec.data.text,
						dir_id: rec.data.dir_id,
						msisdn: rec.raw.msisdn
					});
        }
	},
	/* Expand a node */
	RemoveCommonDirAndChildren : function(node) {
		var me = this;
		/*Get store Receive Message*/
		var storeReceiv = me.down('#grid2').getStore();
		var dir_id = node.data.dir_id;
		
		/*Remove current node from old data*/
		var i = storeReceiv.getCount()-1; 
        for (i; i>=0; i--) {
        	if(storeReceiv.getAt(i).get('dir_id') == node.data.dir_id) {
        		storeReceiv.removeAt(i);
        	}
        }
        
        /*Get children of node just be removed and remove from list*/
        var children = node.childNodes;
        var childrenIdArr = [];
        for(var i=0;i<children.length;i++){
        	childrenIdArr.push(children[i].data.dir_id)
        }
        
        console.log("childrenIdArr");
        console.log(childrenIdArr);
        
        var i = storeReceiv.getCount()-1; 
        for (i; i>=0; i--) {
        	if(childrenIdArr.indexOf(storeReceiv.getAt(i).get('dir_id'))>=0) {
        		storeReceiv.removeAt(i);
        	}
        }
        
        console.log("storeReceiv");
        console.log(storeReceiv);
	}
});