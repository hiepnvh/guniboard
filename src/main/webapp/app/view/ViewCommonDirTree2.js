Ext.define(App.path('view.ViewCommonDirTree2'), {
	extend : 'Ext.tree.Panel',
	xtype : 'viewcommondirtree2',
	itemId : 'ViewCommonDirTree2',
	id : 'ViewCommonDirTree2',
	height : 270,
	title : 'Danh bạ chung',
	autoScroll : true,
	initComponent : function() {
//        var store = this.store;
		var store = App.path('store.CommonDirTree');
		var me = this;
		var responseThis2 = null;
		var responseThis2_Member = null;
		var firstLoad = true;
//		var store = Ext.create('Ext.data.TreeStore', {
//					root : {
//						expanded : true,
//						children : [{
//									text : 'detention',
//									agentId : 'detention',
////									icon : 'resources/css/img/up2.gif',
//									leaf : true
//								}, {
//									text : 'homework',
//									agentId : 'homework',
////									icon : 'resources/css/img/top2.gif',
//									expanded : true,
//									children : [{
//												text : 'book report',
//												agentId : 'bookreport',
////												icon : 'resources/css/img/right2.gif',
//												leaf : true
//											}, {
//												text : 'algebra',
//												agentId : 'algebra',
//												leaf : true
//											}]
//								}, {
//									text : 'buy lottery tickets',
//									leaf : true
//								}]
//					}
//				});
		var config = {
					store : App.path('store.CommonDirTree'),
					border : false,
					rootVisible: false,
			        useArrows: true,
			        frame: true,
//			        title: 'Check Tree',
//					viewConfig : {
//						listeners : {
//							itemcontextmenu : {
//								fn : me.onViewItemContextMenu,
//								scope : me
//							}
//						}
//					},
//					dockedItems : [{
//			hidden : false,
//            xtype: 'toolbar',
//            items: [{
//					xtype : 'tbfill'
//				}, {
//					hidden : true,
//					itemId : 'select',
//					text : 'Chọn',
//					iconCls : 'icon-accept',
//					handler : function() {
//						Ext.getCmp('ViewSendSmsDetail').SelectCommonDir();
//					}
//				}, {
//            	hidden : true,
//                text: 'Get checked nodes',
//                handler: function(){
//                	Ext.getCmp('ViewSendSmsDetail').SelectCommonDir();
//                	var store = Ext.getStore(App.path('store.CommonDirTree'));
//                	console.log(store);
//                	
//                	store.each(function(rec) {
//					if (rec.get('checked') == true) {
//							console.log(rec.get('checked'));
////								selections.push({
////											account_id : rec.data.account_id,
////											name : rec.data.name,
////											msisdn : rec.data.msisdn,
////											department : rec.data.department,
////											company : rec.data.company
////										});
//							}
//						});
//                	
////                    var records = this.getView().getChecked(),
////                        names = [];
////                    
////                    Ext.Array.each(records, function(rec){
////                        names.push(rec.get('text'));
////                    });
////                    
////                    Ext.MessageBox.show({
////                        title: 'Selected Nodes',
////                        msg: names.join('<br />'),
////                        icon: Ext.MessageBox.INFO
////                    });
//                }
//            
//            }]
//        }],
		listeners : {
			beforeitemexpand : function(node){
				console.log(node);
				console.log(node.get('loadedChildren'));
				if(!node.get('loadedChildren'))
					me.processBeforeEvent_CB(node);
			},
			afteritemexpand : function(node){
				if(!node.get('loadedChildren'))
					this.processAfterEvent_CB(node);
			},
			checkchange : function(node, checked, options) {
				/*console.log(node);
				console.log(checked);
				console.log(options);*/
				
				if(!checked) { // uncheck parent by parent id
					/*loop for uncheck*/
					var parentNode = node.parentNode;
					while(parentNode){
						if(parentNode.data.dir_id==0)
							break;
						parentNode.set('checked', false);
						parentNode = parentNode.parentNode;
					}
					Ext.getCmp('ViewSendSmsDetail').RemoveCommonDirAndChildren(node);
				}
				
				 if(!node.get('loadedChildren') && (node.data.dir_id.toString().indexOf('c')==-1))
					this.loadMember(node,checked);
				 else {
					 node.cascadeBy(function(n){n.set('checked', checked);} );
					 Ext.getCmp('ViewSendSmsDetail').SelectCommonDir(node);
				 }
			},
			itemclick : function(node, record, item, index, e, eOpts) {
//					console.log('ss');
//					if(!record.get('loadedChildren') && (record.data.dir_id.toString().indexOf("c") == -1)){
//						// Get all Member
//						var dirArr = [];
//						dirArr.push(record.data.dir_id);
//						var store = Ext.getStore(App.path('store.Member'));
//						store.getProxy().extraParams.user_id = App.Session.user_id;
//						store.getProxy().extraParams.dir_id = Ext.encode(dirArr);
//						store.load({
//							callback: function(results, operation, success) {
//						        if (success) {
//						        	if(results.length>0)
//						        		record.set('leaf', false);
//						        	for(var i=0;i<results.length;i++){
//						        		var data = results[i].data;
//						        		// add on tree
//								        var childNode = record.createNode({
//								        	checked: false,
//									        text: data.name,
//									        msisdn: data.msisdn.toString(),
//									        member_id: data.member_id,
//									        dir_id: record.data.dir_id+'c', // c in child
//									        leaf: true
//										});
//						        		record.appendChild(childNode);
//						        		///// end add on tree
//						        	}
//						        } else {
//						            console.log('error');
//						        }
//						        record.set('loadedChildren', true);
//						    }
//						});
//					}
				//end item click
			}
			}
		};
		Ext.apply(this, config);
		this.callParent(arguments);
	},
	activate : function() {
		console.log('tree active');
//		console.log(Ext.getCmp('ViewContactDetail').down('#tree_space'));
//		if(Ext.getCmp('ViewCommonDirTree'))
//			Ext.getCmp('ViewContactDetail').down('#tree_space').removeAll();
//		console.log(Ext.getCmp('ViewContactDetail').down('#tree_space'));
		var store = Ext.getStore(App.path('store.CommonDirTree'));
    	store.getProxy().extraParams.user_id = App.Session.user_id;
    	store.getProxy().extraParams.tree_type = App.Constant.TREE_UNCHECK;
        store.load();
	},
	deactive : function(){
		this.removeAll();
	},
	loadMember : function(node, checked){
		//remove existed child node
		var me = this;
		var childs = node.childNodes;
		for(c in childs)
			node.removeChild(childs[c]);
		//load then add childs, mems to node
		dir_id = node.data.dir_id;
		console.log(dir_id);
		var tree_type = App.Constant.TREE_UNCHECK;
		App.Action.LoadSubCommonDir(App.Session.user_id, dir_id,tree_type,
				function(options, success, response) {
					Ext.get(document.body).unmask();
					if (success) {
						response = Ext.decode(response.responseText);
//						console.log(response.dir_list);
						if (response.success) {
							responseThis2 = response.dir_list.dir_list[0].dir_list;
							responseThis2_Member = response.dir_list.dir_list[0].dir_member;
							me.processAfterEvent_CB(node);
							node.cascadeBy(function(n){n.set('checked', checked);} );
							/* Load sub dir */
//							Ext.getCmp('ViewSendSmsDetail').SelectCommonDir(node);
						} else {
							Ext.MessageBox.alert('Thông báo','Tải dữ liệu thất bại ' + response.info);
						}
					} else {	
						Ext.MessageBox.alert('Thông báo', 'Tải dữ liệu thất bại, thử lại sau' + response.info);
					}
				});
		
	},
	processBeforeEvent_CB :function(node){
		console.log('processBeforeEvent_CB');
		dir_id = node.data.dir_id;
		console.log(dir_id);
		var tree_type = App.Constant.TREE_UNCHECK;
//		console.log(dir_id);
		App.Action.LoadSubCommonDir(App.Session.user_id, dir_id,tree_type,
				function(options, success, response) {
					Ext.get(document.body).unmask();
					if (success) {
						response = Ext.decode(response.responseText);
//						console.log(response.dir_list);
						if (response.success) {
							responseThis2 = response.dir_list.dir_list[0].dir_list;
							responseThis2_Member = response.dir_list.dir_list[0].dir_member;
							if(dir_id==0){
								responseThis2 = response.dir_list.dir_list;
								responseThis2_Member = [];
							}
							
						} else {
							Ext.MessageBox.alert('Thông báo','Tải dữ liệu thất bại ' + response.info);
						}
					} else {
						Ext.MessageBox.alert('Thông báo', 'Tải dữ liệu thất bại, thử lại sau' + response.info);
					}
				});
////		console.log(node.data.dir_id);
//		//remove all child nodes
//		var childs = node.childNodes;
		while(node.firstChild){
			node.removeChild(node.firstChild);
		}
//		console.log(childs);
////
//		for(i=0;i<childs.length;i++){
//			childs[i].remove(true);
////			node.removeChild(childs[c]);
//		}
//		for(c in childs)
//			node.removeChild(childs[c]);
//			
////		while (node.hasChildNodes()) {
////	        node.removeChild(node.item(0));
////	    }
	},
	processAfterEvent_CB : function(node){
		console.log('processAfterEvent tree with checkbox');
		if(node.childNodes.length>0){
//			var childs = node.childNodes;
//			for(c in childs)
//				node.removeChild(childs[c]);
			Ext.MessageBox.alert('Thông báo','Tải danh sách lỗi. Click lại vào node "' + node.data.text + '" để tải lại');
		}
			
		else{
			console.log("afteritemexpand");

			//// add on tree
			console.log(responseThis2);
			var results = responseThis2;
			var mems = responseThis2_Member;
			console.log(mems);
			if(results.length>0 || mems.length>0)
	    		node.set('leaf', false);
			//add mems to node
			for(var j=0;j<mems.length;j++){
	    		var data_mem = mems[j];
	    		console.log(data_mem);
	    		// add on tree
		        var childNode2_mem = node.createNode({
//				        	checked: false,
			        text: data_mem.name,
			        member_id: data_mem.member_id,
			        parent_dir_id: node.data.dir_id,
			        checked: false,
			        msisdn: data_mem.msisdn,
			        dir_id: node.data.dir_id+'c',// c in child
			        leaf: true
				});

		        node.appendChild(childNode2_mem);
	    		///// end add on tree
	    	}
        	for(var i=0;i<results.length;i++){
        		var data = results[i];
        		// add on tree
		        var childNode = node.createNode({
//		        	checked: false,
			        text: data.text,
			        parent_dir_id: data.parent_dir_id,
			        checked: data.checked,
			        dir_id: data.dir_id, // c in child
			        leaf: false
				});
		        var temp = childNode.createNode({
			        text: 'temp',
			        dir_id : 'temp_dir',
			        leaf: true
				});
		        childNode.appendChild(temp);
		        node.appendChild(childNode);
        		///// end add on tree
        	}
        	console.log(node);
        	/*if node checked==true, set all children checked=true*/
        	if(node.data.checked)
        		node.cascadeBy(function(n) {n.set('checked', true);});
        	node.set('loadedChildren', true);
        	
        	/*Action after expend tree node*/
        	if(node.data.checked)
        		Ext.getCmp('ViewSendSmsDetail').ExpandCommonDir(node);
		}
	},
	onViewItemContextMenu : function(dataview, record, item, index, e, eOpts) {
		e.stopEvent();
		if (!this.menu) {
			this.menu = Ext.create(App.path('view.TreeContextMenu'));
		}
		this.menu.showAt(e.getXY());
//		console.log(dataview);
//		console.log(record);
//		console.log(item);
//		console.log(index);
//		console.log(e);
//		console.log(eOpts);
	},
	ContentAddNew : function(){
			var view_center = Ext.getCmp('CenterView');
			view_center.activateViewItem('ViewContentAddNew', function() {
						var viewItem = Ext.create(App
								.path('view.ViewContentAddNew'));
						return viewItem;
					}).activate();
		}
});
