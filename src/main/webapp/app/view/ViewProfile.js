Ext.define(App.path('view.ViewProfile'), {
    extend:'Ext.grid.Panel',
    border:false,
    id:'ViewProfile',
    xtype:'ViewProfile',
    autoScroll :true,
    initComponent:function(){
        var store = App.path('store.Profile');
        var me= this;
        Ext.apply(this, {
        	title : 'Phân quyền nhóm người dùng',
            border:false,
            store: store,
            stripeRows: true,
            columnLines: true,
            selModel : Ext.create('Ext.selection.RadioModel'),
            columns: [{
                    text     : 'STT',
                    xtype: 'rownumberer',
                    width:30
            },{
                text: 'Mã nhóm',
                flex     : 1,
                sortable:true,
                dataIndex: 'profile_id'
            },{
                text:'Tên nhóm',
                flex:1,
                dataIndex:'name',
                filter: {
			                type: 'string'
			            }
            }
        ]
//        ,bbar: Ext.create('Ext.PagingToolbar', {
//                store: store,
//                displayInfo: true,
//                pageSize: App.Constant.myPageSize,
//                displayMsg: '',
//                emptyMsg: "No topics to display"
//        })
        ,
        dockedItems: [{
                dock: 'bottom',
                height: 30,
                border: false,
                bodyStyle: 'background-color: transparent',
                items:[{
                       xtype: 'button',
                       cls: 'search_all',
                       text: 'Thêm mới',
                       margin:'5 5 0 0',
                       handler:function(){
                            me.GroupPermission_Addnew();
                        } 
                }]
                
            }]
        });
        this.callParent(arguments); 
    },
    activate: function() {
    	var profile_list = this.getStore();
    	var me = this;
    	this.getStore().load({callback : function(records, options, success) {
            if (success) {
            	me.getSelectionModel().select(0, false);
            }
		}});
    },
    GroupPermission_Addnew:function(){
         var view_center = Ext.getCmp('CenterView2');
            view_center.activateViewItem('ViewProfileAddNew', function() {
               var viewItem = Ext.create(App.path('view.ViewProfileAddNew')); 
               return viewItem;  
            },this,function(viewItem){
      
            }).activate();
    }        
    
});


  


