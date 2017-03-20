Ext.define(App.path('controller.BrandAccountAdmin'), {
	extend : 'Ext.app.Controller',
	refs : [ {
		ref : 'MainView',
		selector : '#MainView'
	}, {
		ref : 'WestView',
		selector : '#west'
	}, {
		ref : 'CenterView',
		selector : '#CenterView'
	} ],
	showBrandAccountAdmin : function() {
		if (App.Session.isLoggedIn()) {
			var store = App.path('store.BrandAccountAdmin');
			var view = this.getMainView().activateViewItem('ViewIndex',
					function() {
						var viewItem = Ext.create(App.path('view.ViewIndex'));
						return viewItem;
					}, this).showWhats('ViewBrandAccountAdmin',
					App.path('view.ViewBrandAccountAdmin'), 'ViewBlank',
					App.path('view.ViewBlank'), store,
					'ViewBrandAccountAdminDetail',
					App.path('view.ViewBrandAccountAdminDetail'));
			this.getWestView().setTitle('Thông tin tìm kiếm');
			view.on('select', function(me, record) {
			});
		} else {
			Ext.Router.redirect('');
		}
	},
	showBrandAccountAdminAddNew : function() {
		if (App.Session.isLoggedIn()) {
			var store = App.path('store.BrandAccountAdminAddNew');
			var view = this.getMainView().activateViewItem('ViewIndex',
					function() {
						var viewItem = Ext.create(App.path('view.ViewIndex'));
						return viewItem;
					}, this).showWhats('ViewBrandAccountAdminAddNew',
					App.path('view.ViewBrandAccountAdminAddNew'), 'ViewBlank',
					App.path('view.ViewBlank'), store,
					'ViewBrandAccountAdminAddNewDetail',
					App.path('view.ViewBrandAccountAdminAddNewDetail'));
			this.getWestView().setTitle('Thông tin tìm kiếm');
			view.on('select', function(me, record) {
			});
		} else {
			Ext.Router.redirect('');
		}
	}
});