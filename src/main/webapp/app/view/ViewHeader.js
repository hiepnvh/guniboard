Ext.define(App.path('view.ViewHeader'), {
	extend : 'Ext.panel.Panel',
	xtype : 'viewheader',
	itemId : 'viewheader',
	bodyStyle : 'background-color: transparent',
	border : false,
	layout : 'fit',
	config : {
		first : null,
		addRelation : [],
		removeRelation : [],
		record : null,
		fieldDefaults : {
			margin : '5'
		},
		items : [{
			minHeight : 70,
			layout : 'hbox',
			border : false,
			items : [{
//				html : '<img src="./resources/img/hvcsndlogo-vi.png" alt="logo" class="logo_img"/>',
				height : '100%',
				width : '20%',
				layout : 'fit',
				border : false,
				listeners : {
					click : {
						element : 'el',
						fn : function() {
							Ext.Router.redirect('home');
						}
					}
				}
			}, {
				border : false,
				height : '100%',
				width : '60%',
				html : '<p class="name_title_app"> Hệ thống gửi tin nhắn</p>',
				// bodyStyle: "background-image:url(./resources/img/background-hvcsnd.JPG) !important",
				cls : 'title_app'
			}, {
				html : '<img src="./resources/img/gmobilelogo-vi.png" alt="logo" class="logo_img"/>',
				height : '100%',
				width : '20%',
				layout : 'fit',
				border : false,
				listeners : {
					click : {
						element : 'el',
						fn : function() {
							Ext.Router.redirect('home');
						}
					}
				}
			}]
		}]
	}
});
