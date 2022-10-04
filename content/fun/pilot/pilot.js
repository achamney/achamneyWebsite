define(['jquery','ship/ship','asteroid','debris','planets','ship/shipList','helper'],function($,Ship,Asteroid,Debris,Planet,shipList,helper){
	var Pilot = function(){
		this.canvas = $('#pilot')[0].getContext('2d');
		this.canvas.font = '20pt Arial';
		this.canSize = {x:helper.size.x,y:helper.size.y}; 
		this.asteroids = [];
		var shipTotal = 0,ships={};for(var name in shipList){ships[shipTotal] = name;shipTotal++;}
		var shipNum = 0; // 'Kestrel','Torus','Osprey','Adjudicator','GilaMonster','Nesasio','ManOfWar','Bulwark'
		this.shipScale = 2;
		this.ship = new shipList[ships[shipNum]]();
		this.ship.init(this);
		this.drawLoop = function(){
			this.canvas.fillStyle = "#000000";
			this.canvas.fillRect(0,0,this.canSize.x,this.canSize.y);
			Planet.draw(this.canvas);
			this.ship.draw(this.canvas);
			for(var i=0;i<this.asteroids.length;i++)
			{
				this.asteroids[i].draw(this.canvas);
			}
			Debris.draw(this.canvas);
			this.drawControls(this.canvas);
			this.drawHUD(this.canvas);
		};
		this.updateLoop = function(){
			this.ship.update();
			for(var i=0;i<this.asteroids.length;i++)
			{
				this.asteroids[i].update();
				this.ship.collide(this.asteroids[i]);
			}
			for(var i=0;i<this.asteroids.length;i++)
			{
				if(this.asteroids[i].markedForDeletion)
				{
					this.asteroids.splice(i,1);
				}
			}
			Debris.update();
		}
		this.init = function(levelDesign){
			this.ship.x = helper.size.x/2;
			this.ship.y = helper.size.y/2;
			for(var i=0;i<10;i++)
			{
				this.asteroids[i] = new Asteroid();
			}
			for(var i=0;i<3;i++)
			{
				Planet.add(Math.random()*helper.size.x,Math.random()*helper.size.y);
			}
			this.ship.registerKeyPress();
			game.loadImage("images/joyBase.png",20,helper.size.y - 206);
			game.loadImage("images/joyKnob.png",40,helper.size.y - 190);
			levelDesign.initPilot(this.ship);
			if(!mobilecheck()) this.drawControls = function(){};
			
		};
		this.drawControls = function(context)
		{
			context.save();
			context.globalAlpha=0.3;

			context.fillStyle="#FF0000";
			context.fillRect(helper.size.x-75,helper.size.y-75,75,75);
			
			context.fillStyle="#00FF00";
			context.fillRect(0,helper.size.y-75,75,75);
			game.drawImage('joyBase.png',context);
			game.drawImage('joyKnob.png',context);
			
			context.restore();
			context.strokeStyle="#FF0000";
			context.strokeRect(helper.size.x-75,0,75,50);
			context.strokeText("Exit",helper.size.x-65,10);
		};
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
			for(var i =0;i< this.ship.weapons.length;i++)
			{
				var weap = this.ship.weapons[i];
				if(weap.reloadTime<=0)context.fillStyle="green";
				if(weap.reloadTime>0)context.fillStyle="red";
				context.fillRect(10+i*120,helper.size.y - 75,(1- weap.reloadTime/weap.reloadTimeMax) * 120,60);
				context.fillStyle="white";
				context.fillText("W"+(i+1)+" : "+weap.text,10 + i*120,helper.size.y - 50);
			}
		};
		this.drawStart(this.canvas);
	};
	return new Pilot();
});