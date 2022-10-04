define(['helper','crew/door'],function(helper,Door){
	var Room = function(){
		this.o2 = 0;
		this.init = function(type,point,doorArray,context,ship){
			this.x = 0; this.y = 0;
			this.shape = []; this.crew = []; this.crewLocs = [];
			this.letter = '';
			this.type = type;
			this.ship = ship;
			this.marked = false;
			this.o2 = 100;
			this.FOW = false;
			this.context = context;
			
			Room.types = {"Vertical":{"x":-0.9*context.shipScale,"y":-1.8*context.shipScale,"w":1.8*context.shipScale,"h":3.6*context.shipScale},
				"Horizontal":{"x":-1.8*context.shipScale,"y":-0.9*context.shipScale,"w":3.6*context.shipScale,"h":1.8*context.shipScale},
				"Square":{"x":-1.8*context.shipScale,"y":-1.8*context.shipScale,"w":3.6*context.shipScale,"h":3.6*context.shipScale}};
			this.shape = Room.types[type];
			this.x = point.x; this.y = point.y;
			this.doors = [];
			this.neighbours = [];
			this.color= "#444";
			for(var i=0;i<doorArray.length;i++)
			{
				doorArray[i].type=type;
				this.doors.push(new Door(doorArray[i],context));
			}
			if(type == "Vertical"){this.crewLocs.push({x:0,y:-0.9*context.shipScale});this.crewLocs.push({x:0,y:0.9*context.shipScale});}
			if(type == "Horizontal"){this.crewLocs.push({x:-0.9*context.shipScale,y:0});this.crewLocs.push({x:0.9*context.shipScale,y:0});}
			if(type == "Square"){
				this.crewLocs.push({x:-0.9*context.shipScale,y:-0.9*context.shipScale});
				this.crewLocs.push({x:-0.9*context.shipScale,y:0.9*context.shipScale});
				this.crewLocs.push({x:0.9*context.shipScale,y:-0.9*context.shipScale});
				this.crewLocs.push({x:0.9*context.shipScale,y:0.9*context.shipScale});
			}
		};
		this.registerNeighbours = function(rooms)
		{
			for(var j=0;j<this.doors.length;j++)
			{
				var door = this.doors[j];
				door.id = j;
				if(door.linkIndex == -1)
					door.link = Room.vacuum;
				else
					door.link = rooms[door.linkIndex];
				door.link.id = door.linkIndex;
			}
		};
		
		this.draw = function(context){
			if(!this.FOW)
			{
				var o2Index = Math.floor(15*(this.o2/100));
				context.fillStyle = "#D"+hexMap[o2Index]+hexMap[o2Index];
				context.strokeStyle = "#444";
			}
			else
			{
				context.fillStyle = "#555";
				context.strokeStyle = "#444";
			}
			context.save();
			context.translate(this.x,this.y);
			context.fillRect(this.shape.x,this.shape.y,this.shape.w,this.shape.h);
			context.strokeRect(this.shape.x,this.shape.y,this.shape.w,this.shape.h);

			context.fillStyle = "#777";
			context.font = '12px Arial';
			context.fillText(this.letter,-6,1);
			if(this.marked){
				context.fillStyle = "#E33";
				context.font = '14px Arial';
				context.fillText("<'>",-8,2);}
			for(var i=0;i<this.doors.length;i++)
			{
				this.doors[i].draw(context);
			}
		};
		this.update = function(){
			for(var j=0;j<this.doors.length;j++)
			{
				var door = this.doors[j];
				if(door.open)
				{
					var diff = (this.o2 - door.link.o2)/40;
					this.o2 -= diff;
					if(door.linkIndex != -1)
						door.link.o2 += diff;
				}
			}
			if(this.o2>0)
				this.o2 -=0.1;
		}; 
		this.hurt = function(dmg){
			this.ship.health -= dmg;
		};
		this.markForAttack = function(attack){
			if(attack.target)
				attack.target.marked = false;
			attack.target = this;
			this.marked = true;
			delete attack.ship.attackIcon;
		};
		this.waitForCollision = function(weapon){
			this.marked = false;
			for(var i=0;i<weapon.bullets.length;i++)
			{
				weapon.bullets[i].target = this;
			}
		};
		this.getFreePosition = function(person)
		{
			if(this.crew.length< this.crewLocs.length)
			{
				var ind = this.crew.length,
					locPos = this.crewLocs[ind];
				var pos = {x:locPos.x+this.x,y:locPos.y+this.y}
				this.crew.push(person);
				return pos;
			}
		};
		this.hasFreePosition = function(){return this.crew.length< this.crewLocs.length};
		this.unregister = function(person)
		{
			this.crew.pop(person);
		};
		this.click = function(x,y,button){
			for(var i=0;i<this.doors.length;i++)
			{
				this.doors[i].click(x-this.x,y-this.y,button); // subtract room pos due to draw context
			}
		};
		this.registerSystem = function(system){
			this.letter = system.letter;
			this.system = system;
		};
		
	};
	
	Room.letters = ['E','W','S','Sen','||','P','T','Ar','C','O2','+'];
	Room.vacuum = new Room();
	return Room;
});
