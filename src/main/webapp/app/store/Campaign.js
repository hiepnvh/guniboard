Ext.define(App.path('store.Campaign'), {
	extend : 'Ext.data.Store',
	model : App.path('model.Campaign'),
	storeId : 'Campaign',
	proxy : {
		type : 'ajax',
		url : 'getcampaignlist',
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
			root : 'campaign_list',
			totalProperty : 'results'
		}
	}
});