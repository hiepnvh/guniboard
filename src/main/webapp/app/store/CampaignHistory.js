Ext.define(App.path('store.CampaignHistory'), {
			extend : 'Ext.data.Store',
			model : App.path('model.CampaignHistory'),
			storeId : 'CampaignHistory',
			proxy : {
				type : 'ajax',
				url : 'getcampaignsmshistory',
				actionMethods : {
					create : 'POST',
					read : 'POST',
					update : 'POST',
					destroy : 'POST'
				},
				extraParams : {
					format : 'json'
				},
				reader : {
					type : 'json',
					root : 'sms_hist_list'
				}
			}
		});