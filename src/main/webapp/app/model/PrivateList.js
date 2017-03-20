Ext.define(App.path('model.PrivateList'), {
			extend : 'Ext.data.Model',
			fields : ['list_id', 'name', 'create_date','active', 'description','user_id', 'memcount']
		});