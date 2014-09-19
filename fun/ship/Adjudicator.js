define(['ship/ship'],function(Ship){
	var Adjudicator = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":0,"y":-14},{"x":-2,"y":-14},{"x":-4,"y":-13},{"x":-6,"y":-12},{"x":-7,"y":-10},{"x":-8,"y":-6},{"x":-9,"y":-4},{"x":-8,"y":-3},{"x":-9,"y":-3},{"x":-10,"y":0},{"x":-9,"y":1},{"x":-11,"y":2},{"x":-12,"y":3},{"x":-12,"y":6},{"x":-12,"y":12},{"x":-11,"y":13},{"x":-8,"y":14},{"x":-7,"y":13},{"x":-7,"y":12},{"x":-9,"y":11},{"x":-9,"y":5},{"x":-6,"y":8},{"x":-6,"y":4},{"x":-4,"y":3},{"x":-3,"y":6},{"x":-2,"y":8},{"x":-1,"y":9},{"x":0,"y":8},{"x":0,"y":13},{"x":2,"y":13},{"x":2,"y":15},{"x":3,"y":15},{"x":4,"y":15},{"x":5,"y":14},{"x":6,"y":13},{"x":7,"y":12},{"x":8,"y":10},{"x":9,"y":8},{"x":10,"y":5},{"x":11,"y":2},{"x":12,"y":2},{"x":12,"y":-1},{"x":11,"y":-3},{"x":8,"y":-4},{"x":8,"y":-6},{"x":7,"y":-8},{"x":6,"y":-10},{"x":4,"y":-12},{"x":3,"y":-13},{"x":0,"y":-14}];
		this.relativeAccelRadial = [{angle:0.7,mag:10}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.shipName = "Adjudicator";
		this.color= "green";
		this.registerGradient = function(context)
		{
			if(!this.grd){
				this.grd=context.createLinearGradient(0,-30,0,30);
				this.grd.addColorStop(0.1,"black");
				this.grd.addColorStop(0.5,"green");
				this.grd.addColorStop(0.9,"black");}
		};
		this.initialWeaponList=["PhotonMk2","Artemis","None","None"];
	};
	Adjudicator.extend(Ship);
	return Adjudicator;
});