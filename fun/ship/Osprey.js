define(['ship/ship'],function(Ship){
	var Osprey = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":-2,"y":-14},{"x":-3,"y":-15},{"x":-4,"y":-15},{"x":-6,"y":-13},{"x":-7,"y":-12},{"x":-7,"y":-11},{"x":-6,"y":-10},{"x":-6,"y":-9},{"x":-5,"y":-8},{"x":-4,"y":-8},{"x":-4,"y":6},{"x":-6,"y":8},{"x":-7,"y":9},{"x":-8,"y":8},{"x":-10,"y":8},{"x":-11,"y":7},{"x":-12,"y":8},{"x":-12,"y":15},{"x":-10,"y":14},{"x":-8,"y":15},{"x":-8,"y":12},{"x":-7,"y":12},{"x":0,"y":11},{"x":0,"y":11},{"x":7,"y":12},{"x":8,"y":12},{"x":8,"y":15},{"x":10,"y":14},{"x":12,"y":15},{"x":12,"y":8},{"x":11,"y":7},{"x":10,"y":8},{"x":8,"y":8},{"x":7,"y":9},{"x":6,"y":8},{"x":4,"y":6},{"x":4,"y":-8},{"x":5,"y":-8},{"x":6,"y":-9},{"x":6,"y":-10},{"x":7,"y":-11},{"x":7,"y":-12},{"x":6,"y":-13},{"x":4,"y":-15},{"x":3,"y":-15},{"x":2,"y":-14},{"x":-2,"y":-14}];
		this.relativeAccelRadial = [{angle:0.7,mag:35},{angle:-0.7,mag:35}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.shipName = "Osprey";
		this.color= "orange";
		this.registerGradient = function(context){
			if(!this.grd){
					this.grd=context.createLinearGradient(0,-30,0,30);
					this.grd.addColorStop(0.35,"gray");
					this.grd.addColorStop(0.4,"orange");
					this.grd.addColorStop(0.45,"gray");
					this.grd.addColorStop(0.55,"gray");
					this.grd.addColorStop(0.6,"orange");
					this.grd.addColorStop(0.65,"gray");}
		};
		this.initialWeaponList=["PhotonMk2","Artemis","None","None"];
	};
	Osprey.extend(Ship);
	return Osprey;
});