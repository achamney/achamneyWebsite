define(['jquery','ship/ship','asteroid','debris','planets','ship/shipList','helper'],function($,Ship,Asteroid,Debris,Planet,shipList,helper){
	var Crew = function(){
		this.canvas = $('#crew')[0].getContext('2d');
		this.canvas.font = '20pt Arial';
		this.canSize = {x:helper.size.x,y:helper.size.y}; 
		this.asteroids = [];
		this.buttons = [];
		var shipTotal = 0,ships={};for(var name in shipList){ships[shipTotal] = name;shipTotal++;}
		var shipNum = Math.round(Math.random()*shipTotal);
		this.shipScale = 15; 
		this.ship = new shipList[ships[0]]();
		this.ship.init(this);
		this.ship.initRooms();
		var me = this;
		this.drawLoop = function(){
			this.canvas.fillStyle = "#000000";
			this.canvas.fillRect(0,0,this.canSize.x,this.canSize.y);
			Planet.draw(this.canvas);
			this.levelDesign.encounter.drawShip(this.canvas);
			this.ship.draw(this.canvas);
			
			
			for(var i=0;i<this.buttons.length;i++)
			{
				var but = this.buttons[i];
				this.canvas.fillStyle = "#555";
				this.canvas.strokeStyle = "#999";
				this.canvas.font = '13px Calibri';
				this.canvas.fillRect(but.x,but.y,but.w,but.h);
				this.canvas.strokeRect(but.x,but.y,but.w,but.h);
				this.canvas.strokeText(but.text,but.x+6,but.y+but.h/2);
			}
			this.drawHUD(this.canvas);
			this.levelDesign.encounter.drawWindow(this.canvas);
		};
		this.updateLoop = function(){
			if(!this.levelDesign.encounter.windowOpen)
				this.ship.update();
			this.levelDesign.encounter.update();
		}
		this.init = function(levelDesign){
			this.ship.x = helper.size.x/2;
			this.ship.y = helper.size.y/2;
			
			this.levelDesign = levelDesign.initCrew(this.ship);
			for(var i=0;i<10;i++)
			{
				this.asteroids[i] = new Asteroid();
			}
			for(var i=0;i<3;i++)
			{
				Planet.add(Math.random()*helper.size.x,Math.random()*helper.size.y);
			}
			this.ship.registerKeyPress();
			this.buttons.push({text:"Open",x:helper.size.x - 50,y:helper.size.y-40,w:40,h:20,action:function(){
				for(var i=0;i<me.ship.rooms.length;i++)
				{
					var room = me.ship.rooms[i];
					for(var j=0;j<room.doors.length;j++)
					{
						if(room.doors[j].linkIndex>=0)
						{
							room.doors[j].open = true;
						}
					}
				}
			}});
			this.buttons.push({text:"Close",x:helper.size.x - 110,y:helper.size.y-40,w:40,h:20,action:function(){
				for(var i=0;i<me.ship.rooms.length;i++)
				{
					var room = me.ship.rooms[i];
					for(var j=0;j<room.doors.length;j++)
					{
						room.doors[j].open = false;
					}
				}
			}});
			game.loadImage("images/joyBase.png",20,helper.size.y - 206);
			game.loadImage("images/joyKnob.png",40,helper.size.y - 190);
			
		};
		var handleClick = function(event)
		{
			var x = event.pageX - $('#crew').position().left,
				y = event.pageY - $('#crew').position().top,
				button = event.button;
			// Collision detection between clicked offset and element.
			if(me.levelDesign.encounter.click(x,y,button))
				return;
			me.ship.click(x,y,button);
			for(var i=0;i<me.buttons.length;i++)
			{
				var but = me.buttons[i];
				if(isInside({x:x,y:y},but)) {but.action(event);}
			}
			for(var i=0;i<me.ship.systems.length;i++)
			{
				me.ship.systems[i].click(x,y,button);
			}
		};
		$('body').on('contextmenu', '#crew', function(e){ handleClick(e);return false; });
		this.canvas.canvas.addEventListener('click', handleClick, false);
		
		this.drawStart = function(context){
				helper.resizeMobile(function(){
					var	width = 150, height = 90
						x = helper.size.x/2-width/2, y = helper.size.y/2-height/2;
					
					context.fillStyle = "#000000";
					context.fillRect(0,0,helper.size.x,helper.size.y);
					var grd=context.createLinearGradient(x,y,x,width/2+y);
					grd.addColorStop(0,"#200");
					grd.addColorStop(0.5,"red");
					grd.addColorStop(1,"#200");
					context.fillStyle = grd;
					context.strokeStyle = "red";
					context.fillRect(x,y,width,height);
					context.strokeRect(x-1,y-1,width+1,height+1);
					context.fillStyle = "#000";
					context.fillText("Begin",x+width/2-32,y+height/2);
				});
		};
		this.drawHUD = function(context){
			context.font = 'italic 30px Calibri';
			context.strokeText(this.ship.shipName,10,25);
			context.fillStyle = "#0A0";
			context.strokeStyle = "#0F0";
		    for(var i=0;i<this.ship.health;i++)
			{
				context.fillRect(10+i*12,40,10,20);
				context.strokeRect(10+i*12,40,10,20);
			}
			context.font = '15px Calibri';
			for(var i=0;i<this.ship.crew.length;i++)
			{
				var crew = this.ship.crew[i];
				context.fillStyle = "#444";
				context.strokeStyle = "#999";
				context.fillRect(10,100+i*50,100,40);
				context.strokeRect(10,100+i*50,100,40);
				context.strokeStyle = "#FFF";
				context.strokeText(crew.id,40,115+i*50);
				context.fillStyle = "#0F0";
				context.fillRect(40,125+i*50,crew.health/2,5);
				crew.drawIcon(context,22,120+i*50);
			}
			context.fillStyle = "#0F0";
			context.strokeStyle = "#AAA";
		    for(var i=0;i<this.ship.power;i++)
			{
				context.fillRect(10,helper.size.y - 30 - i*12,20,10);
			}
			for(var i=0;i<this.ship.maxPower;i++)
			{
				context.strokeRect(10,helper.size.y - 30 - i*12,20,10);
			}
			var lastX=50, lastWidth = 0, systemY = helper.size.y - 30;
			for(var i=0;i<this.ship.systems.length;i++)
			{
				var system = this.ship.systems[i],
					thisX = lastX+5+lastWidth;
				
				
				context.strokeStyle = "#999";
				context.beginPath();
				context.moveTo(lastX-10, systemY+20);
				context.lineTo(thisX-10,systemY+20);
				context.lineTo(thisX,systemY+10);
				context.stroke();
				system.draw(context,thisX,systemY);
				lastX = thisX;
				lastWidth = system.width;
			}
		};
		this.drawStart(this.canvas);
	};
	return new Crew();
});