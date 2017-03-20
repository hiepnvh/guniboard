Ext.define(App.path('Constant'), {
			alternateClassName : 'App.Constant',
			statics : {
				// CSS config Value
//				menu left
				MENU_LEFT_WIDTH : 130,
				WEST_VIEW_WIDTH : 280,
				
				TREE_UNCHECK : 0,
				TREE_PERMISSION : 1,
				TREE_NO_CHECKBOX : 2,
				TREE_UNCHECK_ALL : 3,
				
				DELIVERED_TEXT : 'Đã nhận được',
				
				// date from database
				ConvertDate : function(date_old) // string date
				{
					var dd = date_old.substring(0, 2);
					var mm = ('JanFebMarAprMayJunJulAugSepOctNovDec')
							.indexOf(date_old.substring(3, 6))
							/ 3;
					var yyyy = date_old.substring(7, 11);
					var date_new = new Date();
					date_new.setDate(dd);
					date_new.setMonth(mm);
					date_new.setFullYear(yyyy);
					return date_new;
				},
				FormatDate : function(date_old) // date
				{
					var date = new Date(date_old);

					var month_names_short = ['Jan', 'Feb', 'Mar', 'Apr', 'May',
							'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

					var dd = date.getDate();
					var mm = month_names_short[date.getMonth()];
					var yyyy = date.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					var date_new = dd + '-' + mm + '-' + yyyy;

					return date_new;
				},
				GetDateNow : function() {
					/* Get Date */
					var today = new Date();
					var dd = today.getDate();
					var mm = today.getMonth() + 1; // January is 0!

					var yyyy = today.getFullYear();
					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					today = dd + '/' + mm + '/' + yyyy;
					return today;
					/**/
				},
				FormatToCurrency : function(num) {
					num = num.toString().replace(/\$|\,/g, '');
					if (isNaN(num))
						num = "0";
					sign = (num == (num = Math.abs(num)));
					num = Math.floor(num * 100 + 0.50000000001);
					cents = num % 100;
					num = Math.floor(num / 100).toString();
					if (cents < 10)
						cents = "0" + cents;
					for (var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
						num = num.substring(0, num.length - (4 * i + 3)) + ','
								+ num.substring(num.length - (4 * i + 3));
					return (((sign) ? '' : '-') + num);
					// return (((sign) ? '' : '-') + num + '.' + cents);
				},
				ReplaceAll : function(myString, oldString, repString) {
					return myString.split(oldString).join(repString);
				}
			}
		});
