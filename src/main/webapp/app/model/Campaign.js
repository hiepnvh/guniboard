Ext.define(App.path('model.Campaign'), {
			extend : 'Ext.data.Model',
			fields : ['campaign_id', 'create_date', 'campaign_code',
					'send_date', 'shortcode', 'title', 'text', 'user_id',
					'parent_campaign_id']
		});