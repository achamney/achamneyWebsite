define(['ship/system/system'],function(System){
	var Drones = function(){
		this.sortOrder = 7;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			
		};
	};
	Drones.extend(System);
	Drones.letter = 'Dr';
	return Drones;
});