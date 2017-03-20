Ext.define(App.path('model.CommonDirTree'), {
    extend: 'Ext.data.Model',
    fields:[
    	'dir_id',
		'parent_dir_id',
		'text',
		'leaf',
		'dir_list',
		'root'
//		,
//		'checked'
    ]
});