define(['vectorSprite','debris','helper','weapon/weaponList','crew/room','crew/person','ship/system/systemList'],
	function(Vs,Debris,helper,weaponList,Room,Person,systemList){
	var Ship = function(){
		this.init = function(context){
			this.keys = [];
			this.rooms = []; this.crew = []; this.systems = [];
			this.health = 30; this.scrap = 10; this.power = 8; this.maxPower = 8;
			this.magSpeed = 0.2; this.maxSpeed=5;
			this.x = helper.size.x/2; this.y = helper.size.y/2;
			this.accelerating = false;
			this.context = context;
			this.weaponList = weaponList; this.weaponCount = 0;
			this.registerWeapons(this.initialWeaponList);
			this.relativeAccelRadial = [{angle:0,mag:13}];
			for(var i in this.shipRestShape){this.shipRestShape[i] = {x:this.shipRestShape[i].x*context.shipScale,y:this.shipRestShape[i].y*context.shipScale}}
			this['super'].registerShape.call(this,this.shipRestShape);
			this.debugString = "fdsafds";
		}; 
		this.initRooms = function(){
	
			for(var i=0;i<this.roomPositions.length;i++)
			{
				var room = new Room(),
					roomPos = this.roomPositions[i];
				roomPos.x *= this.context.shipScale; roomPos.y *= this.context.shipScale;
				room.init(roomPos.type,{x:roomPos.x,y:roomPos.y},roomPos.doors,this.context,this);
				this.rooms.push(room);
			}
			for(var i=0;i<this.startingSystems.length;i++)
			{
				var systemParams = this.startingSystems[i],
					sysRoom = this.rooms[this.systemRooms[systemParams.letter]],
					system = new systemList[systemParams.letter]();
				system.init(this,sysRoom,systemParams);
				sysRoom.registerSystem(system);
				this.systems.push(system);
			}
			this.systems.sort(function(a,b){
				return a.sortOrder>b.sortOrder;
			});
			for(var i=0;i<this.rooms.length;i++)
			{
				this.rooms[i].registerNeighbours(this.rooms);
			}
			for(var i=0;i<3;i++)
			{
				var person = new Person(this.rooms,this.context);
				person.registerRoom(this.rooms[i]);
				this.crew.push(person);
			}
		};
		this.draw = function(context){
			context.font = 'italic 15px Calibri';
			for(var i =0;i< this.weapons.length;i++)
			{
				var shipPoint = this.shape[this.weaponSlotIndicies[i]],
					weap = this.weapons[i];
				weap.x = Math.cos(shipPoint.angle+this.fAngle)*shipPoint.mag + this.x;
				weap.y = Math.sin(shipPoint.angle+this.fAngle)*shipPoint.mag + this.y;
				weap.draw(context);
				context.restore();
			}
			this.registerGradient(context);
			context.fillStyle = this.grd;
			context.strokeStyle = this.color;
			this['super'].draw.call(this,context);
			context.fill();
			for(var i=0;i<this.rooms.length;i++)
			{
				this.rooms[i].draw(context);
				context.restore();
			}
			for(var i=0;i<this.crew.length;i++)
			{
				this.crew[i].draw(context);
			}
			context.restore();
			
		};
		this.update = function(){
			//this.mAngle = this.fAngle;
			this['super'].update.call(this);
			//this.updateKeys();
			for(var i =0;i< this.weapons.length;i++)
			{
				this.weapons[i].update(this);
			}
			for(var i=0;i<this.rooms.length;i++)
			{
				this.rooms[i].update();
			}
			for(var i=0;i<this.crew.length;i++)
			{
				this.crew[i].update();
			}
			for(var i=0;i<this.crew.length;i++)
			{
				if(this.crew[i].deleteFlag)
				{
					this.crew.splice(i,1);
				}
			}
			this.power = this.maxPower;
			for(var i=0;i<this.systems.length;i++)
			{
				var system = this.systems[i];
				this.power -= system.power;
				system.update();
			}
			if(this.fAngle > Math.PI*2) this.fAngle -= Math.PI*2;
			if(this.fAngle < -Math.PI*2) this.fAngle += Math.PI*2;
		};
		this.registerWeapons = function(weapons){
			this.weapons = [];
			for(var i=0;i<weapons.length;i++)
			{
				var weap = new this.weaponList[weapons[i]]();
				weap.ship = this;
				this.weapons.push(weap);
			}
		};
		this.registerKeyPress = function(key){
			var ship = this;
			$(document).keydown(function(e) {
				var key = e.which;
				ship.keys[key] = true;
				if(key == 17)
				{
					ship.changeWeapon();
				}
				if(ship.keys[49]){
					ship.attackIcon = ship.weapons[0];}
				if(ship.keys[50]){
					ship.attackIcon = ship.weapons[1];}
				if(ship.keys[51]){
					ship.attackIcon = ship.weapons[2];}
				if(ship.keys[52]){
					ship.attackIcon = ship.weapons[3];}
			});
		   $(document).keyup(function(e) {
			   var key = e.which;
			   ship.keys[key] = false;
			});
			this.registerTouch();
		};
		this.click = function(x,y,button){
			for(var i=0;i<this.rooms.length;i++)
			{
				this.rooms[i].click(x-this.x,y-this.y,button); // subtract ship pos due to draw context
			}
			for(var i=0;i<this.crew.length;i++)
			{
				this.crew[i].click(x-this.x,y-this.y,button); // subtract ship pos due to draw context
			}
			for(var i=0;i<this.enemy.rooms.length;i++) 
			{
				if(this.attackIcon)
				{
					var pos = {x:x-this.enemy.x,y:y-this.enemy.y}, room = this.enemy.rooms[i], // subtract enemy ship pos due to draw context
						rect = {x:room.x-room.shape.w/2,y:room.y-room.shape.h/2,w:room.shape.w,h:room.shape.h};
					if(button == 0 && isInside(pos,rect))
						this.enemy.rooms[i].markForAttack(this.attackIcon);
				}
			}
		};
		this.updateKeys = function(){
			if(this.keys[39]) // Right
			{
				this.fAngle += 0.1;
			}
			else if(this.keys[37]) // Left
			{
				this.fAngle -= 0.1;
			}
			if(this.keys[38]) // Up
			{
				this.speed.x -= Math.cos(this.fAngle + Math.PI/2) * this.magSpeed;
				this.speed.y -= Math.sin(this.fAngle + Math.PI/2) * this.magSpeed;
				if(this.speed.x*this.speed.x+this.speed.y*this.speed.y > this.maxSpeed*this.maxSpeed)
				{
					this.speed.x += Math.cos(this.fAngle + Math.PI/2) * this.magSpeed;
					this.speed.y += Math.sin(this.fAngle + Math.PI/2) * this.magSpeed;	
				}
				var angle = this.fAngle+ Math.PI/2;
				for(var i in this.relativeAccelRadial)
				{
					var rad = this.relativeAccelRadial[i];
					Debris.add(this.x+Math.cos(angle+rad.angle)*rad.mag,this.y + Math.sin(angle+rad.angle)*rad.mag
						,'#FF0000',Math.cos(angle)*5,Math.sin(angle)*5, Math.random()*20);
				}
			}
			else if(this.keys[40]) // Down
			{
				this.speed.x += Math.cos(this.fAngle + Math.PI/2) * this.magSpeed;
				this.speed.y += Math.sin(this.fAngle + Math.PI/2) * this.magSpeed;
				if(this.speed.x*this.speed.x+this.speed.y*this.speed.y > this.maxSpeed*this.maxSpeed)
				{
					this.speed.x -= Math.cos(this.fAngle + Math.PI/2) * this.magSpeed;
					this.speed.y -= Math.sin(this.fAngle + Math.PI/2) * this.magSpeed;	
				} 
			}
			if(this.keys[32])
			{
				//this.weapon.fire(this);
			}
			/*if(this.keys[49]){
				this.attackIcon = this.weapons[0];}
			if(this.keys[50]){
				this.attackIcon = this.weapons[1];}
			if(this.keys[51]){
				this.attackIcon = this.weapons[2];}
			if(this.keys[52]){
				this.attackIcon = this.weapons[3];}*/
			
		};
		this.changeWeapon = function(){
			this.weaponCount ++;
			if(this.weaponCount >= this.weaponList.length)
			{
				this.weaponCount =0;
			}
			//this.weapon = new this.weapons[this.weaponCount]();
		}
		this.collide = function(asteroid){
			if(this['super'].collide.call(this,asteroid))
			{  }
			for(var i =0;i< this.weapons.length;i++){
				this.weapons[i].collide(asteroid);
			}
		};
		this.registerTouch = function(){
			if(mobilecheck())
			{
				var canvas = $('canvas')[0];
				
				var handleStart = function(e){
					//var directions = game.images['directions.png'];
					
					for(var i=0;i<e.touches.length;i++)
					{
						var x = e.touches[i].pageX, y = e.touches[i].pageY;
						//ship.debugString = "inStart Mouse : "+x +" "+ y + "     Img : "+directions.x+" " +directions.y;
						if(x < 75)
						{
							if(y> helper.size.y-75){
								this.changeWeapon();
							}
						}
						if(x > helper.size.x-75)
						{
							if(y > helper.size.y-75)
								this.keys[32] = true;
							else if(y < 75)
								exitFullscreen();
						}
					}
					e.preventDefault(); 
				};
				var handleEnd = function(e){
					//var directions = game.images['directions.png'];
					//ship.debugString += "inEnd "+e.touches.length +" "+ e.changedTouches.length;
					var joyKnob = game.images['joyKnob.png'],
							joyBase = game.images['joyBase.png'];
							
					for(var i=0;i<e.changedTouches.length;i++)
					{
						var x = e.changedTouches[i].pageX, y = e.changedTouches[i].pageY;
						//ship.debugString = x + " "+y + "    "+ directions.width;
						if(x < helper.size.x/2)
						{
							this.keys[37] = false;
							this.keys[39] = false;
							this.keys[38] = false;
							this.keys[40] = false;
						}
						if(e.changedTouches[i].pageX > helper.size.x-100)
						{
							if(e.changedTouches[i].pageY > helper.size.y-100)
								this.keys[32] = false;
						}
						joyKnob.x = joyBase.x + joyBase.width/2 - joyKnob.width/2;
						joyKnob.y = joyBase.y + joyBase.height/2 - joyKnob.height/2;
					}
					e.preventDefault(); 
				};
				var handleMove = function(e){
					for(var i=0;i<e.changedTouches.length;i++)
					{
						var x = e.changedTouches[i].pageX, y = e.changedTouches[i].pageY;
						var joyKnob = game.images['joyKnob.png'],
							joyBase = game.images['joyBase.png'],
							joyRadius = joyBase.width/2 - 10;
						if(x<helper.size.x/2)
						{
							var a = x - (joyBase.x + joyBase.width/2),
								b = y - (joyBase.y + joyBase.height/2),
								dist = Math.sqrt(a*a+b*b),
								angle = Math.atan2(b,a);
								//ship.debugString = "Dist : "+dist;
							this.fAngle = angle+Math.PI/2;
							if(dist < joyRadius)
							{
								joyKnob.x = x - joyKnob.width/2;
								joyKnob.y = y - joyKnob.height/2;
								this.keys[38] = false;
							}
							else
							{
								
								this.keys[38] = true;
								joyKnob.x = joyBase.x+joyBase.width/2 - joyKnob.width/2 + Math.cos(angle)*joyRadius;
								joyKnob.y = joyBase.y+joyBase.height/2 - joyKnob.height/2 + Math.sin(angle)*joyRadius;
							}
						}
					}
				};
				canvas.addEventListener("touchstart", handleStart, false);
				canvas.addEventListener("touchend", handleEnd, false);
				canvas.addEventListener("touchcancel", handleEnd, false);
				canvas.addEventListener("touchleave", handleEnd, false);
				canvas.addEventListener("touchmove", handleMove, false);
			}
		};
		this.ai = function(){};
	};
	
	
	Ship.extend(Vs);
	return Ship;
});