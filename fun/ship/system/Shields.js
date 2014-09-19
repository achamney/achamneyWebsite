define(['ship/system/system'],function(System){
	var Shields = function(){
		this.sortOrder = 1;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			
		};
	};
	Shields.extend(System);
	Shields.letter = 'S';
	return Shields;
});