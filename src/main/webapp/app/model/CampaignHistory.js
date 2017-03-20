function decode(v, record){
	switch(v)
		{
			case -1 : return 'Chưa gửi đến SMSC'; break;
			case 1 : return 'Đã nhận được'; break;
			case 2 : return 'Thất bại'; break;
			case 8 : return 'Đã gửi đến SMSC'; break;
			case 16 : return 'Bị từ chối'; break;
		}
}

Ext.define(App.path('model.CampaignHistory'), {
			extend : 'Ext.data.Model',
			fields : ['username','name', 'receive_name', 'campaign_id', 'msisdn', {name:'status',convert:decode}, 'reply']
		});