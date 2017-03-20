Ext.define(App.path('view.ViewCommonDirTree'), {
			extend : 'Ext.tree.Panel',
			xtype : 'viewcommondirtree',
			itemId : 'ViewCommonDirTree',
			id : 'ViewCommonDirTree',
			title : 'Danh bạ chung',
			height : 270,
			autoScroll : true,
			initComponent : function() {
				var store = App.path('store.CommonDirTree');
				var responseThis = null;
				var me = this;
				var config = {
					store : store,
					border : false,
					rootVisible : false,
					useArrows : true,
					frame : true,
					viewConfig : {
						listeners : {
							itemcontextmenu : {
								fn : me.onViewItemContextMenu,
								scope : me
							}
						}
					},
					dockedItems : [{
						hidden : true,
						xtype : 'toolbar',
						items : {
							text : 'Get checked nodes',
							handler : function() {

//								var store = Ext.getStore(App
//										.path('store.CommonDirTree'));
//								console.log('store');
							}
						}
					}] ,
					listeners : {
						beforeitemexpand : function(node){
							if(!node.get('loadedChildren'))
								this.processBeforeEvent(node);
						},
						afteritemexpand : function(node){
							if(!node.get('loadedChildren'))
								this.processAfterEvent(node);
						},
						itemclick : function(dv, record, item, index, e) {
							console.log("itemclick");
							Ext.getCmp('ViewContactDetail')
									.SendCommonDirId(record.data.dir_id);
							Ext.getCmp('ViewContactDetail')
									.LoadCommonDirMember(record.data.dir_id);
						},
						selectionchange : function(selModel, selections) {
						},
						checkchange : function(record, ischecked, options) {
							console.log(record);
							console.log(ischecked);
							console.log(options);
							if (ischecked) {
								Ext
										.getCmp('ViewUserDetail')
										.CommonDirPermissonAdd(record.data.dir_id);
							}
						}
					}
				};
				Ext.apply(this, config);
				this.callParent(arguments);
			},
			activate : function() {
				console.log('tree active');
				if(Ext.getCmp('ViewCommonDirTree2'))
					Ext.getCmp('ViewCommonDirTree2').deactive();
//				console.log(Ext.getCmp('ViewCommonDirTree2'));
				console.log("Common dir tree activate");
				var store = Ext.getStore(App.path('store.CommonDirTree'));
		    	store.getProxy().extraParams.user_id = App.Session.user_id;
		    	store.getProxy().extraParams.tree_type = App.Constant.TREE_NO_CHECKBOX;
		        store.load();
//				this.expandAll();
			},
			deactive : function(){
				console.log(this);
				this.removeAll();
				console.log(this);
			},
			processBeforeEvent : function(node){
				console.log('processBeforeEvent');
				var dir_id = node.data.dir_id;
				var tree_type = App.Constant.TREE_NO_CHECKBOX;
				console.log(dir_id);
				App.Action.LoadSubCommonDir(App.Session.user_id, dir_id,tree_type,
						function(options, success, response) {
							Ext.get(document.body).unmask();
							if (success) {
								response = Ext.decode(response.responseText);
								console.log(response.dir_list);
								if (response.success) {
									responseThis = response.dir_list.dir_list[0].dir_list;
									if(dir_id==0)
										responseThis = response.dir_list.dir_list;
								} else {
									Ext.MessageBox.alert('Thông báo','Tải dữ liệu thất bại ' + response.info);
								}
							} else {
								Ext.MessageBox.alert('Thông báo', 'Tải dữ liệu thất bại, thử lại sau' + response.info);
							}
						});
////				console.log(node.data.dir_id);
//				//remove all child nodes
//				var childs = node.childNodes;
//				console.log(childs);
				while(node.firstChild){
					node.removeChild(node.firstChild);
				}
////
//				for(i=0;i<childs.length;i++){
//					childs[i].remove(true);
////					node.removeChild(childs[c]);
//				}
//				for(c in childs)
//					node.removeChild(childs[c]);
//					
////				while (node.hasChildNodes()) {
////			        node.removeChild(node.item(0));
////			    }
				
			},
			processAfterEvent : function(node){
				if(node.childNodes.length>0){
//					var childs = node.childNodes;
//					for(c in childs)
//						node.removeChild(childs[c]);
					Ext.MessageBox.alert('Thông báo','Tải danh sách lỗi. Click lại vào node "' + node.data.text + '" để tải lại');
				}
					
				else{
					console.log("afteritemexpand");

					//// add on tree
					console.log(responseThis);
					var results = responseThis;
					if(results.length>0)
		        		node.set('leaf', false);
		        	for(var i=0;i<results.length;i++){
		        		var data = results[i];
		        		// add on tree
				        var childNode = node.createNode({
//				        	checked: false,
					        text: data.text,
					        parent_dir_id: data.parent_dir_id,
//					        member_id: data.member_id,
					        dir_id: data.dir_id, // c in child
					        leaf: false
						});
				        var temp = childNode.createNode({
					        text: 'temp',
					        leaf: true
						});
				        childNode.appendChild(temp);
				        node.appendChild(childNode);
		        		///// end add on tree
		        	}
		        	node.set('loadedChildren', true);
				}
			},
			onViewItemContextMenu : function(dataview, record, item, index, e,eOpts) {
				var hasEditPermission = false;
				for (var i = 0; i < App.Session.functionlist.length; i++) {
					if(App.Session.functionlist[i].function_id == 23){
						console.log(App.Session.functionlist[i].function_id);
						hasEditPermission = true;
						break;
					}
				}
				console.log(hasEditPermission);
				if(hasEditPermission) {
					e.stopEvent();
					if (!this.menu) {
						this.menu = Ext.create(App.path('view.TreeContextMenu'));
					}
					this.menu.showAt(e.getXY());
				}
			},
			ContentAddNew : function() {
				var view_center = Ext.getCmp('CenterView');
				view_center.activateViewItem('ViewContentAddNew', function() {
					var viewItem = Ext.create(App
							.path('view.ViewContentAddNew'));
					return viewItem;
				}).activate();
			}
		});
