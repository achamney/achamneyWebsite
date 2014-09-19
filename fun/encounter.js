define(['helper'],function(helper){
	var Encounter = function(params,context){
		this.windowOpen = true;
		this.window = {x:100,w:helper.size.x-200,y:100,h:helper.size.y-200};
		this.init = function(params){
			this.params = params;
			this.enemy = params.enemy;
			for(var i=0;i<params.options.length;i++)
			{
				var option = this.params.options[i];
				option.x = this.window.x + 20;
				option.w = option.text.length*12;
				option.y = this.window.y + this.window.h - 100 + i*30;
				option.h = 25;
			}
		};
		this.init(params);
		this.drawShip = function(context){
		
			if(this.enemy)
			{
				context.fillStyle = "#955";
				var enemyBoxSize = 190;
				context.fillRect(this.enemy.x - enemyBoxSize,this.enemy.y - enemyBoxSize,enemyBoxSize*2,enemyBoxSize*2);
				context.fillStyle = "#0A0";
				context.strokeStyle = "#0F0";
				for(var i=0;i<this.enemy.health;i++)
				{
					context.fillRect(this.enemy.x - enemyBoxSize+10+i*12,this.enemy.y - enemyBoxSize+10,10,20);
					context.strokeRect(this.enemy.x - enemyBoxSize+10+i*12,this.enemy.y - enemyBoxSize+10,10,20);
				}
				this.enemy.draw(context);
			}
		};
		this.drawWindow = function(context){
			if(this.windowOpen)
			{
				context.fillStyle="#DDD";
				context.fillRect(this.window.x,this.window.y,this.window.w,this.window.h);
				context.fillStyle="#333";
				drawTextInRect(this.params.text,{x:this.window.x,y:this.window.y,w:this.window.w,h:this.window.h},context);
				for(var i=0;i<this.params.options.length;i++)
				{
					var option = this.params.options[i];
					context.fillStyle="#333";
					context.strokeRect(option.x,option.y,option.w,option.h);
					context.fillText(option.text, option.x+3, option.y+15);
				}
			}
		};
		this.closeWindow = function(){
			this.windowOpen = false;
		};
		this.update = function(){
			if(this.params.enemy)
			{
				this.params.enemy.ai();
			}
		};
		this.click = function(x,y,button){
			var pos = {x:x,y:y};
			if(this.windowOpen)
			{
				for(var i=0;i<this.params.options.length;i++)
				{
					var option = this.params.options[i];
					var rect = {x:option.x,y:option.y,w:option.w,h:option.h};
					if(isInside(pos,rect))
					{
						option.resolve(this);
					}
				}
				return true;
			}
			return false;
		};
	};
	return Encounter;
});
		