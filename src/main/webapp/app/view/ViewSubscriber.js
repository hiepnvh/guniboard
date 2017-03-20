Ext.define(App.path('view.ViewSubscriber'), {
			extend : 'Ext.grid.Panel',
			border : false,
			itemId : 'ViewSubscriber',
			xtype : 'viewsubscriber',
			id : 'ViewSubscriber',
			features: [App.Constant.filters],
			autoScroll : true,
			initComponent : function(arguments) {
				var store = Ext.create('Ext.data.Store', {
			           fields: ['msisdn']
	          });
				var me = this;
				Ext.apply(this, {
							border : false,
							store : store,
							stripeRows : true,
							columnLines : true,
							selModel : Ext.create('Ext.selection.RadioModel'),
							columns : [{
										text : 'STT',
										xtype : 'rownumberer',
										width : 30
									}, {
										text : 'Số thuê bao',
										flex : 1,
										sortable : true,
										name:'msisdn',
										dataIndex : 'msisdn',
										filter: {
								                type: 'string'
								            }
									}],bbar: Ext.create('Ext.PagingToolbar', {
					                store: store,
					                displayInfo: true,
					                pageSize: App.Constant.myPageSize,
					                displayMsg: '',
					                emptyMsg: "No topics to display"
					        }),
							dockedItems : [{
										dock : 'bottom',
										height : 30,
										border : false,
										bodyStyle : 'background-color: transparent',
										items : [{
													xtype : 'button',
													text : 'Thêm mới',
													cls : 'search_all',
													margin : 5,
													handler : function() {
														me.UserAddNew();
													}
												}]

									}, {
					                    dock: 'top',
					                    height: 'fit',
					                    border: false,
					                    xtype:'form',
					                    bodyStyle: 'background-color: transparent',
					                    items: [
					                        	{
					                            xtype: 'fieldset',
					                            padding:'5 0 0 5',
					                            margin: '5 5 0 5',
					                            border: false,
					                            collapsible: false,
					                            items: [{
																xtype : 'textfield',
																fieldLabel : 'Số thuê bao',
																itemId : 'msisdn',
																anchor : '98%',
																margin : '5 0 5 0'
															}, {
																xtype : 'button',
																text : 'Tìm kiếm',
																cls : 'search_all',
																margin : 5,
																handler : function() {
																	me.UserSearch();
																}
															}]
					                        }
					                    ]
									}]
						});
				this.callParent(arguments);
			},
			activate : function() {
				var store = this.getStore();
//				console.log(store);
				store.removeAll();
//				store.add({msisdn:'0996661738',cp_code:'1234',service_code:'7899'});
			},
			UserAddNew : function() {
//				var view_center = Ext.getCmp('CenterView');
//				view_center.activateViewItem('ViewSubscriberAddNew', function() {
//						var viewItem = Ext.create(App.path('view.ViewSubscriberAddNew'));
//						return viewItem;
//				});
				var win = new Ext.Window({
					id:'AddSubPopup'
					,x:200
					,y:100
					,width:300
					,height:200
					,modal:true
					,stateful :false
					,closable:true
					,loadMask:true
					,maximizable:true
					,title:'Thêm mới thuê bao'
					,buttonAlign:'center'
					,items:[{
									border : false,
									layout : 'hbox',
									defaultType : 'textfield',
									items : [{
												flex : 1,
												itemId : 'new_msisdn',
												fieldLabel : 'Số thuê bao'
											}]
								}, {
									border : false,
								layout : 'hbox',
								defaultType : 'textfield',
								items : [{
											flex : 1,
											xtype : 'combobox',
											itemId : 'service_id',
											store: App.path('store.Service'),
	                                        displayField: 'name',
	                                        valueField: 'service_id',
											fieldLabel : 'Dịch vụ đăng ký'
										}]
							},{border : false,
									buttons : [{
										text : 'Lưu thông tin',
										handler : function() {
											Ext.getCmp('ViewSubscriber').AddSub();
										}
								}]}]
				});
				win.show();
			},
			AddSub: function()
			{
				var msisdn = "" + Ext.getCmp('AddSubPopup').down('#new_msisdn').getValue();
				var user_id = App.Session.user_id;
				var service_id ="" + Ext.getCmp('AddSubPopup').down('#service_id').getValue();
				var me = this;
				var sub_service = Ext.encode({
					msisdn:msisdn
				});
				Ext.Ajax.request({
					method: 'POST',
					url: 'addsubservice',
					params:{user_id:user_id,msisdn:msisdn,service_id:service_id},
					success:function(response,opts){
						response = Ext.decode(response.responseText);
//						console.log(response);
						Ext.MessageBox.alert('Thông báo', 'Thêm mới thành công');
						Ext.getCmp('AddSubPopup').close();
						Ext.getCmp('ViewSubscriber').UserSearch();
					},
					failure:function(response,opts){
						Ext.MessageBox.alert('Thông báo', 'Thêm mới thất bại');
						},
						scope:me
				});
				
				
			},
			
			UserSearch : function() {
				var store = this.getStore();
				var msisdn = this.down('#msisdn').getValue();
				store.removeAll();
				var storeSubs = Ext.getStore(App.path('store.Subscriber'));
				storeSubs.getProxy().extraParams.user_id = App.Session.user_id;
				storeSubs.getProxy().extraParams.msisdn = msisdn;
				console.log(storeSubs);
				storeSubs.load({
					scope : this,
					callback : function(records, ops, success)
					{
						if(success)
						{
//							var responseText = ops.response.responseText;
//							var results = Ext.decode(responseText).results;
//							console.log(Ext.decode(responseText).results);
//							store.load({params:{
//						        start:0,
//						        limit: App.Constant.myPageSize
//						    }});
//							store.setProxy({reader : {
//								totalProperty : results
//							}});
							var mapSubscriber = new Ext.util.HashMap();
	//						console.log(records);
							for(var i=0;i<records.length;i++)
							{
								var service_arr = [];
								var sub = {service_id:records[i].data.service_id, 
								            reg_date: records[i].data.reg_date,
								            end_date: records[i].data.end_date};
								if(!mapSubscriber.containsKey(records[i].data.msisdn)){
									service_arr.push(sub);
									var objMsisdn = {msisdn : records[i].data.msisdn};
									store.add(objMsisdn);
								}
								else{
									var obj = mapSubscriber.get(records[i].data.msisdn).subs;
									
//									console.log(obj);
//									console.log(obj.length);
									for(var j=0;j<obj.length;j++){
										
//										console.log(obj[j]);
										service_arr.push(obj[j]); 
									}
//									console.log(service_arr);
									service_arr.push(sub);
								}
								
//								console.log(service_arr);
								var value = {
									subs: service_arr
								};
								mapSubscriber.add(records[i].data.msisdn, value);
							}
							App.MapValue.setMapSubscriber(mapSubscriber);
								}
							}
					});
				

//				store.setProxy({
//					type : 'ajax',
//					url : 'getsubservice',
//					actionMethods : {
//						create : 'POST',
//						read : 'POST',
//						update : 'POST',
//						destroy : 'POST'
//					},
//					extraParams : {
//						user_id : App.Session.user_id,
//						msisdn : msisdn
//					},
//					reader : {
//						type : 'json',
//						root : 'sub_service_list',
//						totalProperty : 'totalCount'
//					}
//				});
//		store.load({
//    		scope : this,
//			callback : function(records, ops, success)
//			{
//				if(success)
//				{
//					var mapSubscriber = new Ext.util.HashMap();
////					console.log(records);
//					for(var i=0;i<records.length;i++)
//					{
//						var service_arr = [];
//						var sub = {service_id:records[i].data.service_id, 
//						            reg_date: records[i].data.reg_date,
//						            end_date: records[i].data.end_date};
//						if(!mapSubscriber.containsKey(records[i].data.msisdn)){
//							service_arr.push(sub);
//						}
//						else{
//							var obj = mapSubscriber.get(records[i].data.msisdn).subs;
//							console.log(obj);
//							console.log(obj.length);
//							for(var j=0;j<obj.length;j++){
//								
//								console.log(obj[j]);
//								service_arr.push(obj[j]); 
//							}
//							console.log(service_arr);
//							service_arr.push(sub);
//						}
//						
//						console.log(service_arr);
//						var value = {
//							subs: service_arr
//						};
//						mapSubscriber.add(records[i].data.msisdn, value);
//					}
//					App.MapValue.setMapSubscriber(mapSubscriber);
//				}
//			}
//		});
			}
		});
