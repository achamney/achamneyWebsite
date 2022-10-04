define(['ship/ship'],function(Ship){
	var GilaMonster = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":-1,"y":-15},{"x":-3,"y":-14},{"x":-3,"y":-13},{"x":-4,"y":-13},{"x":-4,"y":-12},{"x":-8,"y":-11},{"x":-8,"y":-10},{"x":-5,"y":-10},{"x":-5,"y":-9},{"x":-8,"y":-7},{"x":-8,"y":-6},{"x":-5,"y":-6},{"x":-6,"y":-4},{"x":-3,"y":-3},{"x":-3,"y":-1},{"x":-5,"y":1},{"x":-7,"y":2},{"x":-9,"y":2},{"x":-9,"y":3},{"x":-11,"y":4},{"x":-11,"y":5},{"x":-9,"y":5},{"x":-9,"y":6},{"x":-12,"y":7},{"x":-12,"y":8},{"x":-9,"y":8},{"x":-10,"y":9},{"x":-9,"y":9},{"x":-7,"y":15},{"x":-6,"y":15},{"x":-6,"y":9},{"x":-4,"y":8},{"x":-3,"y":8},{"x":-2,"y":10},{"x":-1,"y":10},{"x":-2,"y":8},{"x":2,"y":8},{"x":1,"y":10},{"x":2,"y":10},{"x":3,"y":8},{"x":4,"y":8},{"x":6,"y":9},{"x":6,"y":15},{"x":7,"y":15},{"x":9,"y":9},{"x":10,"y":9},{"x":9,"y":8},{"x":12,"y":8},{"x":12,"y":7},{"x":9,"y":6},{"x":9,"y":5},{"x":11,"y":5},{"x":11,"y":4},{"x":9,"y":3},{"x":9,"y":2},{"x":7,"y":2},{"x":5,"y":1},{"x":3,"y":-1},{"x":3,"y":-3},{"x":6,"y":-4},{"x":5,"y":-6},{"x":8,"y":-6},{"x":8,"y":-7},{"x":5,"y":-9},{"x":5,"y":-10},{"x":8,"y":-10},{"x":8,"y":-11},{"x":4,"y":-12},{"x":4,"y":-13},{"x":3,"y":-13},{"x":3,"y":-14},{"x":1,"y":-15},{"x":-1,"y":-15}];
		this.relativeAccelRadial = [{angle:0,mag:20}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.shipName = "Gila Monster";
		this.color= "red";
		this.registerGradient = function(context){
			if(!this.grd){
					this.grd=context.createLinearGradient(0,-30,0,30);
					this.grd.addColorStop(0.1,"black");
					this.grd.addColorStop(0.5,"red");
					this.grd.addColorStop(0.9,"black");}
		};
		this.initialWeaponList=["PhotonMk2","Artemis","None","None"];
	};
	GilaMonster.extend(Ship);
	return GilaMonster;
});