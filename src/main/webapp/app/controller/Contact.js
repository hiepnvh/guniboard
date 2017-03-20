Ext.define(App.path('controller.Contact'), {
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
			showContact : function() {
		        if (App.Session.isLoggedIn()) {
		            this.getMainView().activateViewItem('ViewIndex100', function() {// tuong tu getCmp thay vao day la get vao mot khung view da dung san co id de dai dien cho view do
		            	var viewItem = Ext.create(App.path('view.ViewIndex100'));
		            	viewItem.activate();
		                return viewItem;
		            }, this).showWhat('ViewContactDetail', App.path('view.ViewContactDetail'));
		            Ext.getCmp('ViewIndex4').down('#Content1').setTitle('Chi tiết danh bạ');
		        } else {
		            Ext.Router.redirect('');
		        }
		    }
		});