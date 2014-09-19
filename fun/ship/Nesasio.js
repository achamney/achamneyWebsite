define(['ship/ship'],function(Ship){
	var Nesasio = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":-1,"y":-14},{"x":-3,"y":-12},{"x":-5,"y":-4},{"x":-7,"y":-2},{"x":-9,"y":0},{"x":-8,"y":0},{"x":-11,"y":3},{"x":-13,"y":5},{"x":-14,"y":8},{"x":-14,"y":11},{"x":-12,"y":8},{"x":-8,"y":6},{"x":-8,"y":8},{"x":-7,"y":8},{"x":-5,"y":5},{"x":-4,"y":4},{"x":-3,"y":5},{"x":-2,"y":9},{"x":-1,"y":9},{"x":-1,"y":10},{"x":0,"y":10},{"x":0,"y":10},{"x":1,"y":10},{"x":1,"y":9},{"x":2,"y":9},{"x":3,"y":5},{"x":4,"y":4},{"x":5,"y":5},{"x":7,"y":8},{"x":8,"y":8},{"x":8,"y":6},{"x":12,"y":8},{"x":14,"y":11},{"x":14,"y":8},{"x":13,"y":5},{"x":11,"y":3},{"x":8,"y":0},{"x":9,"y":0},{"x":7,"y":-2},{"x":5,"y":-4},{"x":3,"y":-12},{"x":1,"y":-14},{"x":-1,"y":-14}];
		this.relativeAccelRadial = [{angle:0,mag:20}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.shipName = "Nesasio";
		this.color= "gray";
		this.registerGradient = function(context){
			if(!this.grd){
					this.grd=context.createLinearGradient(0,-30,0,30);
					this.grd.addColorStop(0.0,"gray");
					this.grd.addColorStop(0.5,"black");
					this.grd.addColorStop(1,"gray");}
		};
		this.initialWeaponList=["PhotonMk2","Artemis","None","None"];
	};
	Nesasio.extend(Ship);
	return Nesasio;
});