define(['ship/system/system'],function(System){
	var Sensors = function(){
		this.sortOrder = 99;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			if(this.ship.inNebula)
				return;
			if(this.maxPower == 1)
			{
				for(var i=0;i<this.ship.rooms.length;i++)
				{
					this.ship.rooms[i].FOW = false;
				}
				if(this.ship.enemy)
				for(var i=0;i<this.ship.enemy.rooms.length;i++)
				{
					this.ship.enemy.rooms[i].FOW = true;
				}
			}
			else if(this.maxPower == 2)
			{
				for(var i=0;i<this.ship.rooms.length;i++)
				{
					this.ship.rooms[i].FOW = false;
				}
				if(this.ship.enemy)
				for(var i=0;i<this.ship.enemy.rooms.length;i++)
				{
					this.ship.enemy.rooms[i].FOW = false;
				}
			}
		};
	};
	Sensors.extend(System);
	Sensors.letter = 'Sen';
	return Sensors;
});