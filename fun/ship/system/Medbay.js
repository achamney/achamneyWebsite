define(['ship/system/system'],function(System){
	var Medbay = function(){
		this.sortOrder = 4;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
		};
		this.update = function(){
			for(var i=0;i<this.room.crew.length;i++)
			{
				var person = this.room.crew[i];
				if(person.health <100)
				{
					person.health += this.power/4;
				}
			}
		};
	};
	Medbay.extend(System);
	Medbay.letter = '+';
	return Medbay;
});