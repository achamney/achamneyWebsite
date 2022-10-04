define(['ship/system/system'],function(System){
	var Doors = function(){
		this.sortOrder = 100;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			
		};
	};
	Doors.extend(System);
	Doors.letter = '||';
	return Doors;
});