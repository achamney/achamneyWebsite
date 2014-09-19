define(['ship/system/system'],function(System){
	var Engines = function(){
		this.sortOrder = 2;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			
		};
	};
	Engines.extend(System);
	Engines.letter = 'E';
	return Engines;
});