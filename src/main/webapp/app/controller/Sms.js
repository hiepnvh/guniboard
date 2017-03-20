Ext.define(App.path('controller.Sms'), {
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
			showSendSms : function() {
				if (App.Session.isLoggedIn()) {
					var view = this.getMainView().activateViewItem('ViewIndex100',
							function() {
								var viewItem = Ext.create(App.path('view.ViewIndex100'));
								return viewItem;
							}, this).showWhat('ViewSendSmsDetail',App.path('view.ViewSendSmsDetail'));
					view.on('select', function(me, record) {
							});
				} else {
					Ext.Router.redirect('');
				}
			}, 
			showSendSmsHistory : function() {
//				console.log('controler ok');
				if (App.Session.isLoggedIn()) {
					var view = this.getMainView().activateViewItem('ViewIndex100',
							function() {
								var viewItem = Ext.create(App.path('view.ViewIndex100'));
								return viewItem;
							}, this).showWhat('ViewSendSmsHistoryDetail',App.path('view.ViewSendSmsHistoryDetail'));
					view.on('select', function(me, record) {
							});
				} else {
					Ext.Router.redirect('');
				}
			}
		});