define(['ship/ship'],function(Ship){
	var Bulwark = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":-1,"y":-9},{"x":-3,"y":-9},{"x":-3,"y":-11},{"x":-5,"y":-11},{"x":-5,"y":-13},{"x":-7,"y":-13},{"x":-9,"y":-15},{"x":-11,"y":-15},{"x":-14,"y":-8},{"x":-13,"y":-6},{"x":-8,"y":-5},{"x":-8,"y":-2},{"x":-10,"y":0},{"x":-9,"y":1},{"x":-12,"y":4},{"x":-11,"y":5},{"x":-13,"y":9},{"x":-11,"y":9},{"x":-11,"y":12},{"x":-10,"y":12},{"x":-9,"y":15},{"x":-7,"y":15},{"x":-6,"y":13},{"x":-5,"y":13},{"x":-5,"y":11},{"x":-4,"y":11},{"x":-3,"y":10},{"x":-2,"y":9},{"x":-1,"y":12},{"x":1,"y":12},{"x":2,"y":9},{"x":3,"y":10},{"x":4,"y":11},{"x":5,"y":11},{"x":5,"y":13},{"x":6,"y":13},{"x":7,"y":15},{"x":9,"y":15},{"x":10,"y":12},{"x":11,"y":12},{"x":11,"y":9},{"x":13,"y":9},{"x":11,"y":5},{"x":12,"y":4},{"x":9,"y":1},{"x":10,"y":0},{"x":8,"y":-2},{"x":8,"y":-5},{"x":13,"y":-6},{"x":14,"y":-8},{"x":11,"y":-15},{"x":9,"y":-15},{"x":7,"y":-13},{"x":5,"y":-13},{"x":5,"y":-11},{"x":3,"y":-11},{"x":3,"y":-9},{"x":1,"y":-9},{"x":-1,"y":-9}];
		this.relativeAccelRadial = [{angle:0.5,mag:35},{angle:-0.5,mag:35}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.shipName = "Bulwark";
		this.color= "orange";
		this.registerGradient = function(context){
			if(!this.grd){
				this.grd=context.createLinearGradient(0,-30,0,30);
				this.grd.addColorStop(0.1,"black");
				this.grd.addColorStop(0.5,"orange");
				this.grd.addColorStop(0.9,"#FFAAAA");}
		};
		this.initialWeaponList=["PhotonMk2","Artemis","None","None"];
	};
	Bulwark.extend(Ship);
	return Bulwark;
});