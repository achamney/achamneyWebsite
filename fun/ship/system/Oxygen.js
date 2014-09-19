define(['ship/system/system'],function(System){
	var Oxygen = function(){
		this.sortOrder = 3;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			for(var i=0;i<this.ship.rooms.length;i++)
			{
				var room = this.ship.rooms[i];
				if(room.o2 <100)
					room.o2 += this.power/5;
			}
		};
	};
	Oxygen.extend(System);
	Oxygen.letter = 'O2';
	return Oxygen;
});