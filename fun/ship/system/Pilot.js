define(['ship/system/system'],function(System){
	var Pilot = function(){
		this.sortOrder = 98;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			
		};
	};
	Pilot.extend(System);
	Pilot.letter = 'P';
	return Pilot;
});