define(function(){
	var System = function(){
		this.init = function(ship){
			this.ship = ship;
		};
		this.draw = function(context){};
		this.update = function(){};
		this.click = function(x,y,button){};
	};
	return System;
});