Ext.define(App.path('view.ViewSendSmsHistoryDetail'), {
	extend : 'Ext.form.Panel',
	itemId : 'ViewSendSmsHistoryDetail',
	bodyStyle : 'background-color: transparent',
	border : false,
	layout : {
		type : 'hbox',
		pack : 'start',
		align : 'stretch'
	},
	config : {
		data : null,
		first : null,
		addRelation : [],
		removeRelation : [],
		record : null,
		fieldDefaults : {
			margin : '5'
		},
		items : [{
			flex : 1,
			width : '100%',
			xtype : 'grid',
			itemId : 'grid',
			title : 'D/s tin nhắn đã gửi',
			stripeRows : true,
			// plugins : [rowEditing],
			columnLines : true,
			autoScroll : true,
//			selModel : Ext.create('Ext.selection.RadioModel'),
			store : App.path('store.Campaign'),
			columns : [{
						text : 'STT',
						xtype : 'rownumberer',
						width : 30
					}/*, {
						text : 'Campaign ID',
						dataIndex : 'campaign_id',
						flex : 1
					}*/, {
						text : 'Đầu số',
						dataIndex : 'shortcode',
						flex : 1
					}, {
						text : 'Tiêu đề',
						dataIndex : 'title',
						flex : 1
					}, {
						text : 'Ngày gửi',
						dataIndex : 'send_date',
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
								me.down('#delete').setDisabled(me.selections()==0);
//								//Check cancel condition
//								var store = me.down('#grid').getStore();
//								var items = store.getRange();
//								var send_date = items[recordIndex].data.send_date;
//								console.log(send_date);
								
								me.down('#cancel').setDisabled(me.selections()==0);
							}
						}
					}],/*bbar: Ext.create('Ext.PagingToolbar', {
		                store: App.path('store.Campaign'),
		                displayInfo: true,
		                pageSize:25,
		                displayMsg: '',
		                emptyMsg: "No topics to display"
		        }),*/
			listeners : {
				itemclick : function(dv, record, item, index, e) {
//					var me = this.up('form');
					// me.LoadGroupMember(record.data.group_name);
				},
//				viewready : function(){
//					var me = this.up('form');
//					me.getSelectionModel().selectFirstRow();
//				},
				selectionchange : function(selModel, selections) {
					var me = this.up('form');
					// me.down('#delete').setDisabled(selections.length === 0);
					if (selections.length > 0) {
						me.data = selections[0].data;
						me.down('#text').setValue(selections[0].data.text);
						me.CampaignHistory(selections[0].data.campaign_id, selections[0].data.send_date);
					} else
						me.down('#text').setValue('');
				}
			},
			dockedItems : [{
				dock : 'top',
				height : 'fit',
				border : true,
				xtype : 'form',
				bodyStyle : 'background-color: transparent',
				items : [{
					xtype : 'fieldset',
					padding : '5 0 0 5',
					margin : '5 5 0 5',
					border : false,
					collapsible : false,
					items : [{
								xtype : 'textfield',
								fieldLabel : 'Người gửi',
								itemId : 'sender',
								anchor : '98%',
								margin : '5 0 5 0'
							}, {
								xtype : 'textfield',
								fieldLabel : 'Số nhận',
								itemId : 'receiver',
								anchor : '98%',
								margin : '5 0 5 0'
							}, {
//								flex : 1,
								xtype : 'datefield',
								format : 'd/m/Y',
								itemId : 'start_date',
								fieldLabel : 'Ngày bắt đầu',
//								margin : '5 0 5 0',
//								width : '100%',
//								value : new Date()
							},
							{
//								flex : 1,
								xtype : 'datefield',
								format : 'd/m/Y',
								itemId : 'end_date',
								fieldLabel : 'Ngày kết thúc',
//								margin : '5 0 5 0',
//								width : '100%',
//								value : new Date()
							}, {
								xtype : 'button',
								text : 'Tìm kiếm',
								cls : 'search_all',
								margin : 5,
								handler : function() {
//									var me= Ext.getCmp('ViewSendSmsHistoryDetail');
									var me = this.up('form').up('form');
									console.log(me);
									me.Search();
								}
							}]
				}]
			},{
						xtype : 'toolbar',
						items : [{
									xtype : 'tbfill'
								}, {
									itemId : 'cancel',
									text : 'Hủy lịch gửi',
									iconCls : 'icon-del',
									disabled : true,
									handler : function() {
										var me = this.up('form');
										console.log(me);
										Ext.MessageBox.confirm('Thông báo', 'Xác nhận hủy lịch gửi này?', function(btn){
											if(btn=='yes')
												me.Cancel();
										} );
										
									}
								}, {
									itemId : 'delete',
									text : 'Xóa',
									iconCls : 'icon-del',
									disabled : true,
									handler : function() {
										var me = this.up('form');
										console.log(me);
										Ext.MessageBox.confirm('Thông báo', 'Xác nhận xóa?', function(btn){
											if(btn=='yes')
												me.Remove();
										} );
										
									}
								}, {
									xtype : 'checkbox',
									boxLabel : 'Tất cả',
									itemId : 'markall',
									name : 'markall',
									margin : '0 5 0 0',
									listeners : {
										change : function(cbx, newValue,
												oldValue) {
											var me = this.up('form');
											me.MarkAll(newValue);
											me.down('#delete').setDisabled(me.selections()==0);
											me.down('#cancel').setDisabled(me.selections()==0);
//											me.down('#delete').setDisabled();
										}
									}
								}]
					}]
		}, {
			flex : 2,
			border : false,
			layout : {
				type : 'vbox',
				pack : 'start',
				align : 'stretch'
			},
			items : [{
						flex : 1,
						xtype : 'textarea',
						itemId : 'text',
						fieldLabel : 'Nội dung tin nhắn',
						readOnly : true,
						fieldStyle : 'background-color: #ddd; background-image: none;'
					}, {
						flex : 3,
						width : '100%',
						xtype : 'grid',
						itemId : 'grid2',
						border : false,
						title : 'Danh sách người nhận',
						stripeRows : true,
						columnLines : true,
						autoScroll : true,
//						selModel : Ext.create('Ext.selection.RadioModel'),
						store : App.path('store.CampaignHistory'),
						columns : [{
									text : 'STT',
									xtype : 'rownumberer',
									width : 30
								}, {
									text : 'Người gửi',
									dataIndex : 'name',
									flex : 1
								}, {
									text : 'Người nhận',
									dataIndex : 'receive_name',
									flex : 1
								}, {
									text : 'MSISDN',
									dataIndex : 'msisdn',
									flex : 1
								}, {
									text : 'Trạng thái',
									dataIndex : 'status',
									flex : 1
								}
						// , {
						// text : 'Phản hồi',
						// dataIndex : 'reply',
						// flex : 1
						// }
						], 
			        dockedItems: [{
		                    dock: 'bottom',
		                    height: 50,
		                    border: false,
		                    bodyStyle: 'background-color: transparent',
		                    items: [{
		                            xtype: 'button',
		                            text: 'Xuất báo cáo',
		                            itemId: 'buttonExport',
		                            handler: function() {
		                            	var me = this.up('form');
		                                me.exportXls();
		                            }
		                        }]
		                }],
						listeners : {
							itemclick : function(dv, record, item, index, e) {
								var me = this.up('form');
								me.LoadMemberPrivateList(record.data.list_id);
								me.list_id = record.data.list_id;

								var me = this.up('form');
								me.down('#name_of_list')
										.setValue(record.data.name);
								me.down('#description')
										.setValue(record.data.description);
								me.down('#repair3').enable();
							},
							selectionchange : function(selModel, selections) {
								var me = this.up('form');
//								me.down('#delete3')
//										.setDisabled(selections.length === 0);
							}
						}
					}, {
						height : 30,
						layout : {
							type : 'hbox',
							pack : 'start',
							align : 'stretch'
						},
						items : [{
									margin:'5',
									xtype : 'label',
									itemId : 'report',
									style: 'font-weight:bold;'
								}, {
									xtype : 'tbfill'
								}, {
									margin:'5',
				                    xtype: 'button',
				                    cls: 'search_all',
				                    text: 'Gửi lại',
				                    hidden: true,
				                    handler:function(){
				                       		var me = this.up('form');
				                            me.ReSendSMS();
				                        } 
				                }]
					}

			]
		}]
	},
	activate : function() {
		console.log('history active');
		Ext.get(document.body).mask('Chờ giây lát..');
		if(Ext.getCmp('ViewCommonDirTree'))
			Ext.getCmp('ViewCommonDirTree').deactive();
		if(Ext.getCmp('ViewCommonDirTree2'))
			Ext.getCmp('ViewCommonDirTree2').deactive();
		Ext.getStore(App.path('store.CampaignHistory')).removeAll();
		var me = this;
		var store = this.down('#grid').getStore();
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.load({callback : function(records, options, success) {
            if (success) {
            	me.down('#grid').getSelectionModel().select(0, false);
            }
		}}
		);
            
		Ext.get(document.body).unmask();
	},
	CampaignHistory : function(campaign_id,send_date) {
		var me = this; 
		me.campaign_id = campaign_id;
		me.send_date = send_date;
		var total = 0;
		var delivered = 0;
		var store = Ext.getStore(App.path('store.CampaignHistory'));
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.campaign_id = campaign_id;
		store.getProxy().extraParams.send_date = send_date;
		store.load({callback : function(records, options, success) {
            if (success) {
            	total = store.getCount();
                store.each(function(rec) {
					if (rec.get('status') == 'Đã nhận được') {
						delivered += 1;
					}
				});
				
				me.down('#report').setText('Báo cáo: '+delivered+' thuê bao nhận tin / '+total+' thuê bao.');
            }
        }});
	},
	Add : function() {
		var me = this;
		var username = this.down('#username').getValue();
		var store = this.down('#grid').getStore();
		if (this.down('#username').getValue()) {
			App.Action.UserGet(App.Session.user_id, username, function(options,
							success, response) {
						Ext.get(document.body).unmask();
						if (success) {
							var response = Ext.decode(response.responseText);
							if (response.success) {
								if (response.user_list) {
									var user = response.user_list[0];
									store.add({
												user_id : user.user_id,
												username : user.username
											});

									var items = store.data.items;
								} else {
									Ext.MessageBox.alert('Thông báo',
											'Không tồn tại User:' + username);
								}
								me.down('#username').setValue('');
							} else {
							}
						} else {
						}
					});
		} else {
			Ext.MessageBox.alert('Thông báo', 'Nhập Username');
		}
	},
	selections : function(){
		var me = this;
		var selections = 0;
		var store = me.down('#grid').getStore();
		var grid = me.down('#grid');
		store.each(function(rec) {
					if (rec.get('active') == true) {
						selections++;
					}
				});
		console.log(selections);
		return selections;
	},
	Search : function() {
		Ext.get(document.body).mask('Chờ giây lát..');
		var me = this;
		
		var sender = this.down('#sender').getValue();
		var receiver = this.down('#receiver').getValue();
		var start_date = App.ActionMe.DateToDBExactly(this.down('#start_date').getValue());
		console.log(App.ActionMe.DateToDBExactly(this.down('#start_date').getValue()));
		var end_date = App.ActionMe.DateToDBExactly(this.down('#end_date').getValue(),"to");
		
		Ext.getStore(App.path('store.CampaignHistory')).removeAll();
		var store = this.down('#grid').getStore();
		store.getProxy().extraParams.user_id = App.Session.user_id;
		store.getProxy().extraParams.sender = sender;
		store.getProxy().extraParams.receiver = receiver;
		store.getProxy().extraParams.end_date = end_date;
		store.getProxy().extraParams.start_date = start_date;
		store.load({callback : function(records, options, success) {
            if (success) {
            	me.down('#grid').getSelectionModel().select(0, false);
            }
		}}
		);
            
		Ext.get(document.body).unmask();

	},
	Cancel : function() {
		//huy campaign
		var me = this;
//		var selections = [];
		var map = new Ext.util.HashMap();
		var store = me.down('#grid').getStore();
		var grid = me.down('#grid');
		var continueToCancel = false;
		store.each(function(rec) {
			var send_date = new Date(rec.get('send_date'));
//			console.log(send_date);
			var now = new Date();
			console.log(map);
			if ((rec.get('active') == true)&&(send_date>now)) {
				var campaign_id = rec.data.campaign_id;
				map.add(campaign_id , campaign_id);
				continueToCancel = true;
//						selections.push({
//									campaign_id : rec.data.campaign_id,
//									user_id : rec.data.user_id,
//									shortcode : rec.data.shortcode,
//									send_date : rec.data.send_date,
//									title : rec.data.title,
//									text : rec.data.text
//								});
			}
			else{
				Ext.MessageBox.alert('Thông báo', 'Bạn không có quyền hủy các lịch gửi này');
			}
		});
		//check if continue to cancel
		console.log('continueToCancel ' + continueToCancel);
		if(continueToCancel){
			var i = store.getCount() - 1;
			for (i; i >= 0; i--) {
				if (store.getAt(i).get('active') == true) {
					store.removeAt(i);
				}
			}
			grid.getView().refresh();
			var mesText = 'Hủy ';
			App.Action.CampaignCancel(App.Session.user_id, Ext.encode(map.getValues()),
					function(options, success, response) {
						if (success) {
							response = Ext.decode(response.responseText);
							if (response.success) {
								Ext.MessageBox.alert('Thông báo', mesText
												+ 'thành công');
								var store = me.down('#grid2').getStore();
								store.removeAll();
							} else {
								Ext.MessageBox.alert('Thông báo', mesText
												+ 'thất bại');
							}
						} else {
							Ext.MessageBox.alert('Thông báo', mesText + 'thất bại');
						}
					});
		}
		
	},
	Remove : function() {
		var me = this;
//		var selections = [];
		var map = new Ext.util.HashMap();
		var store = me.down('#grid').getStore();
		var grid = me.down('#grid');
		store.each(function(rec) {
					if (rec.get('active') == true) {
						var campaign_id = rec.data.campaign_id;
						map.add(campaign_id , campaign_id);
//						selections.push({
//									campaign_id : rec.data.campaign_id,
//									user_id : rec.data.user_id,
//									shortcode : rec.data.shortcode,
//									send_date : rec.data.send_date,
//									title : rec.data.title,
//									text : rec.data.text
//								});
					}
				});
		var i = store.getCount() - 1;
		for (i; i >= 0; i--) {
			if (store.getAt(i).get('active') == true) {
				store.removeAt(i);
			}
		}
		grid.getView().refresh();
		var mesText = 'Xóa ';
		App.Action.CampaignRemove(App.Session.user_id, Ext.encode(map.getValues()),
				function(options, success, response) {
					if (success) {
						response = Ext.decode(response.responseText);
						if (response.success) {
							Ext.MessageBox.alert('Thông báo', mesText
											+ 'thành công');
							var store = me.down('#grid2').getStore();
							store.removeAll();
						} else {
							Ext.MessageBox.alert('Thông báo', mesText
											+ 'thất bại');
						}
					} else {
						Ext.MessageBox.alert('Thông báo', mesText + 'thất bại');
					}
				});

	},
	exportXls : function(){
		Ext.get(document.body).mask('Chờ giây lát..');
		var me = this;
		var campaign_id = me.campaign_id;
		var send_date = me.send_date;
		console.log(campaign_id);
		
		Ext.Ajax.request({
			url : 'getreport',
			actionMethods : {
			create : 'POST',
			read : 'POST',
			update : 'POST',
			destroy : 'POST'
			},
			params : {
				campaign_id : campaign_id,
				send_date: send_date
			},
			scope : this,
			timeout : 60000,
			callback : function(options, success, response) {
				if (success) {
					Ext.get(document.body).unmask();
					response = Ext.decode(response.responseText);
					console.log(response.url);
					if (response.success) {
						//Download
						var hiddenIFrameID = 'hiddenDownloader',
				        iframe = document.getElementById(hiddenIFrameID);
					    if (iframe === null) {
					        iframe = document.createElement('iframe');
					        iframe.id = hiddenIFrameID;
					        iframe.style.display = 'none';
					        document.body.appendChild(iframe);
					    }
					    iframe.src = response.url;
					} else {
						Ext.MessageBox.alert('Thông báo',
								'Tải file thất bại '+ response.info);
					}
				} else {
					Ext.get(document.body).unmask();
					Ext.MessageBox.alert('Thông báo',
							'Tải file thất bại. Vui lòng thử sau '+ response.info);
				}
			}
		
		});
		},
	MarkAll : function(ischeckAll) {
		var store = this.down('#grid').getStore();
		store.suspendEvents(); // avoid view update after each row
		store.each(function(rec) {
					rec.set('active', ischeckAll)
				});
		store.resumeEvents();
		this.down('#grid').getView().refresh();
	},
	ReSendSMS : function() {
		var me = this;
		var map = new Ext.util.HashMap();
		var store = this.down('#grid2').getStore();
		store.suspendEvents(); // avoid view update after each row
		store.each(function(rec) {
			if(rec.get('status') != App.Constant.DELIVERED_TEXT)
			var msisdn = rec.get('msisdn');
			if (msisdn != null & msisdn != '')
				map.add(msisdn, msisdn);
				
				});
		store.resumeEvents();
		this.down('#grid2').getView().refresh();
		var sms = Ext.encode({
						user_id : App.Session.user_id,
						shortcode : me.data.shortcode,
						title : me.data.title,
						text : me.data.text,
						parent_campaign_id : me.data.campaign_id
					});
		
		var MB = Ext.MessageBox;
//		MB.buttonText={
//			cancel: 'Hủy',
//			no: 'Hủy',
//			ok: 'Chấp nhận',
//			yes: 'Chắc chắn'
//			};

		MB.confirm('Gửi lại',
				'Chắc chắn gửi lại tin nhắn này ?', function(btn) {
					if (btn == 'yes') {
					App.Action.SendSMSCampaign(App.Session.user_id,sms,
							Ext.encode(map.getValues()),
							function(options, success,
									response) {
								if (success) {
									response = Ext
											.decode(response.responseText);
									if (response.success) {
										Ext.MessageBox.alert('Thông báo','Tin nhắn đang được gửi đi');
									} else {
										Ext.MessageBox.alert('Thông báo','Tin nhắn lỗi không gửi đi được');
									}
								} else {
									Ext.MessageBox.alert('Thông báo','Tin nhắn lỗi không gửi đi được');
								}
								Ext.get(document.body).unmask();
							});
		} else {
		}
	}, this);
				
	}
});
