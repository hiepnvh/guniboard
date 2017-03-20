Ext.define(App.path('controller.BrandAccount'), {
			extend : 'Ext.app.Controller',
			refs : [{
						ref : 'MainView',
						selector : '#MainView'
					}, {
						ref : 'WestView',
						selector : '#west'
					}, {
						ref : 'CenterView',
						selector : '#CenterView'
					}],
			showBrandAccount : function() {
				if (App.Session.isLoggedIn()) {
					var store = App.path('store.BrandAccount');
					var view = this.getMainView().activateViewItem('ViewIndex',
							function() {
								var viewItem = Ext.create(App
										.path('view.ViewIndex'));
								return viewItem;
							}, this).showWhats('ViewBrandAccount',
							App.path('view.ViewBrandAccount'), 'ViewBlank',
							App.path('view.ViewBlank'), store,
							'ViewBrandAccountDetail',
							App.path('view.ViewBrandAccountDetail'));
					this.getWestView().setTitle('Thông tin tìm kiếm');
					view.on('select', function(me, record) {
							});
				} else {
					Ext.Router.redirect('');
				}
			},
			showMember : function() {
				if (App.Session.isLoggedIn()) {
					var store = App.path('store.BrandAccount');
					var view = this.getMainView().activateViewItem('ViewIndex',
							function() {
								var viewItem = Ext.create(App
										.path('view.ViewIndex'));
								return viewItem;
							}, this).showWhats('ViewMember',
							App.path('view.ViewMember'), 'ViewBlank',
							App.path('view.ViewBlank'), store,
							'ViewMemberDetail',
							App.path('view.ViewMemberDetail'));
					this.getWestView().setTitle('D/s account');
					view.on('select', function(me, record) {
							});
				} else {
					Ext.Router.redirect('');
				}
			}
			
//			showMember : function() {
//				if (App.Session.isLoggedIn()) {
//					this.getMainView().activateViewItem('ViewIndex100',
//							function() {
//								var viewItem = Ext.create(App.path('view.ViewIndex100'));
////								viewItem.activate();
//								return viewItem;
//							}, this, function(viewItem) {
//							}).showWhat('ViewMemberDetail', App.path('view.ViewMemberDetail'));
//				} else {
//					Ext.Router.redirect('');
//				}
//			}
		});