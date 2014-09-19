define(['ship/ship'],function(Ship){
	var ManOfWar = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":0,"y":-15},{"x":-2,"y":-15},{"x":-5,"y":-14},{"x":-7,"y":-13},{"x":-9,"y":-12},{"x":-10,"y":-10},{"x":-12,"y":-8},{"x":-13,"y":-6},{"x":-13,"y":-4},{"x":-15,"y":-4},{"x":-17,"y":-3},{"x":-19,"y":-2},{"x":-20,"y":0},{"x":-20,"y":5},{"x":-19,"y":5},{"x":-19,"y":6},{"x":-18,"y":6},{"x":-18,"y":7},{"x":-18,"y":11},{"x":-17,"y":11},{"x":-17,"y":7},{"x":-16,"y":7},{"x":-16,"y":13},{"x":-15,"y":13},{"x":-15,"y":7},{"x":-14,"y":7},{"x":-14,"y":9},{"x":-13,"y":9},{"x":-13,"y":7},{"x":-12,"y":8},{"x":-12,"y":10},{"x":-11,"y":10},{"x":-11,"y":8},{"x":-9,"y":8},{"x":-9,"y":9},{"x":-8,"y":9},{"x":-8,"y":15},{"x":-7,"y":15},{"x":-6,"y":15},{"x":-6,"y":11},{"x":-4,"y":13},{"x":-2,"y":13},{"x":-2,"y":10},{"x":2,"y":10},{"x":2,"y":13},{"x":4,"y":13},{"x":6,"y":11},{"x":6,"y":15},{"x":7,"y":15},{"x":8,"y":15},{"x":8,"y":9},{"x":9,"y":9},{"x":9,"y":8},{"x":11,"y":8},{"x":11,"y":10},{"x":12,"y":10},{"x":12,"y":8},{"x":13,"y":7},{"x":13,"y":9},{"x":14,"y":9},{"x":14,"y":7},{"x":15,"y":7},{"x":15,"y":13},{"x":16,"y":13},{"x":16,"y":7},{"x":17,"y":7},{"x":17,"y":11},{"x":18,"y":11},{"x":18,"y":7},{"x":18,"y":6},{"x":19,"y":6},{"x":19,"y":5},{"x":20,"y":5},{"x":20,"y":0},{"x":19,"y":-2},{"x":17,"y":-3},{"x":15,"y":-4},{"x":13,"y":-4},{"x":13,"y":-6},{"x":12,"y":-8},{"x":10,"y":-10},{"x":9,"y":-12},{"x":7,"y":-13},{"x":5,"y":-14},{"x":2,"y":-15},{"x":0,"y":-15}];
		this.relativeAccelRadial = [{angle:1,mag:25},{angle:-1,mag:25}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.shipName = "Man Of War";
		this.color= "pink";
		this.registerGradient = function(context){
			if(!this.grd){
					this.grd=context.createRadialGradient(0,0,1,0,0,50);
					this.grd.addColorStop(1,"#000");
					this.grd.addColorStop(0.7,"green");
					this.grd.addColorStop(0.6,"#6C6073");
					this.grd.addColorStop(0,"#436");}
		};
		this.registerWeapons=["PhotonMk2","Artemis","None","None"];
	};
	ManOfWar.extend(Ship);
	return ManOfWar;
});