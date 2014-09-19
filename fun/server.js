
define(['helper','asteroid'],function(helper,Asteroid){
	
	var Server = function(){
		var me=this;
		me.ws = new WebSocket("ws://achamney.com/TestSocket/update");
		me.ws.onClose = function(message){
			console.log(message);
		};
		window.onbeforeunload = function() {
			me.ws.onclose = function () {}; // disable onclose handler first
			me.ws.close();
		};
		this.start = function(){
			/*$.ajax({
				  url: '/TestSocket/update',
				  data: {session:2},
				  success: me.startInterval,
				  dataType: 'text'
				});*/
			this.startInterval(Math.round(Math.random()*100));
		};
		
		this.startInterval = function(id){
			me.client = id;
			me.session = 2;
			if(getParameterByName('type')=='ship')
			{
				window.setInterval(function(){
						var ship = JSON.stringify(game.ship,['keys','x','y','speed','fAngle']);
						me.sendToCrew(ship);
				},30);
				window.setInterval(function(){
					sendData = {"ship":game.ship,"asteroids":game.asteroids};
					sendData = JSON.stringify(sendData,
						function(k, v){
							if((""+k).toLowerCase().indexOf('shape')<0){
								return v;
							}
						});
					me.sendToCrew(sendData);
				},1000);
			}
		};
		this.mixin = function(obj1,obj2){
			for(var obj2Prop in obj2)
			{
				if(Object.prototype.toString.call(obj2[obj2Prop]) == '[object Array]'
					|| Object.prototype.toString.call(obj2[obj2Prop]) == '[object Object]')
				{
					this.mixin(obj1[obj2Prop],obj2[obj2Prop]);
				}
				else
				{
					obj1[obj2Prop] = obj2[obj2Prop];
				}
			}
		};
		this.dispatch = function(socketMessage){
			var gameStatus = JSON.parse(socketMessage.data);
			if(gameStatus.keys){
				me.mixin.call(me,game.ship,gameStatus);
			}
			else if(gameStatus.ship)
			{
				me.mixin.call(me,game.ship,gameStatus.ship);
				game.asteroids = [];
				for(var i=0;i<gameStatus.asteroids.length;i++)
				{
					var ast = new Asteroid();
					me.mixin(ast,gameStatus.asteroids[i]);
					game.asteroids.push(ast);
				}
			}
		};
		this.ws.onmessage = this.dispatch;
		this.sendToCrew = function(data,callback){
			/*$.ajax({
					  url: '/funServer/update',
					  data: {session:me.session,client:me.client,update:data},
					  success: function(data){
							if(getParameterByName('type') == 'crew')
							{
								if(data !=']')
								{
									var statusArray = JSON.parse(data);
									for(var i=0;i<statusArray.length;i++)
									{
										var status = JSON.parse(statusArray[i].cu);
										callback.call(me,status);
									}
								}
							}
				  },
				  dataType: 'text'
				});*/
			me.ws.send(data);
		};
		this.sendToServer = function(data,callback){
		
		};
	};
	
	return new Server();
});