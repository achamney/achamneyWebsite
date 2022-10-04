define(function(){
	var System = function(){
		this.width = 30;
		this.maxPower = 2; this.power = 1;
		this.radius = 12;
		this.init = function(ship,room,params){
			this.ship = ship;
			this.subSystem = System.subSystems[params.letter];
			this.room = room;
			this.letter = params.letter;
			this.maxPower = params.power || 0;
			this.color = "#0F0";
			if(this.subSystem){
				this.color = "#00F";
				this.power = 0;
			}
		};
		this.draw = function(context,x,y){
			this.x = x; this.y = y;
			context.fillStyle = this.color;
			context.beginPath();
			context.arc(x, y, this.radius, 0, 2 * Math.PI, false);
			context.fill();
			
			context.font = "12px arial";
			context.strokeStyle = "#000";
			context.strokeText(this.letter,x-this.letter.length*3,y+4);
			
			context.fillStyle = "#0F0";
			context.strokeStyle = "#AAA";
			if(!this.subSystem)
			{
				for(var i=0;i<this.power;i++)
				{
					context.fillRect(x-7,y-4- i*10 - 20,14,8);
				}
				for(var i=0;i<this.maxPower;i++)
				{
					context.strokeRect(x-7,y-4- i*10 - 20,14,8);
				}
			}
			else
			{
				context.fillStyle = "#090";
				for(var i=0;i<this.maxPower;i++)
				{
					context.fillRect(x-7,y-4- i*10 - 20,14,8);
				}
			}
		};
		this.update = function(){};
		this.click = function(x,y,button){
			if(!this.subSystem){
				var a = x - this.x, b = y - this.y,
					c = Math.sqrt(a*a+b*b);
				if(c < this.radius)
				{
					if(button == 0 && this.ship.power>0 && this.power < this.maxPower)
					{
						this.power+=1;
					}
					else if(button == 2 && this.power>0)
					{
						this.power -=1;
					}
				}
			}
		};
	};
	System.subSystems = {'P':true,'||':true,'Sen':true,'Bat':true};
	return System;
});