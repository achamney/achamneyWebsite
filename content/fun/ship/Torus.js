define(['ship/ship'],function(Ship){
	var Torus = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":0,"y":-13},{"x":-3,"y":-12},{"x":-6,"y":-12},{"x":-8,"y":-13},{"x":-12,"y":-11},{"x":-14,"y":-9},{"x":-14,"y":-3},{"x":-13,"y":-2},{"x":-14,"y":0},{"x":-13,"y":2},{"x":-15,"y":4},{"x":-15,"y":9},{"x":-14,"y":10},{"x":-12,"y":11},{"x":-10,"y":10},{"x":-8,"y":11},{"x":-5,"y":10},{"x":-2,"y":12},{"x":0,"y":11},{"x":6,"y":11},{"x":8,"y":12},{"x":12,"y":12},{"x":12,"y":9},{"x":11,"y":7},{"x":11,"y":4},{"x":12,"y":2},{"x":9,"y":0},{"x":10,"y":-2},{"x":8,"y":-5},{"x":7,"y":-7},{"x":8,"y":-10},{"x":7,"y":-12},{"x":5,"y":-12},{"x":3,"y":-11},{"x":1,"y":-12},{"x":0,"y":-13},{"x":0,"y":-7},{"x":-1,"y":-6},{"x":-2,"y":-6},{"x":-2,"y":-3},{"x":-3,"y":-3},{"x":-3,"y":-1},{"x":-5,"y":0},{"x":-4,"y":1},{"x":-3,"y":3},{"x":0,"y":1},{"x":1,"y":-1},{"x":1,"y":-3},{"x":2,"y":-3},{"x":2,"y":-4},{"x":2,"y":-6},{"x":3,"y":-6},{"x":3,"y":-7},{"x":0,"y":-7}];
		this.relativeAccelRadial = [{angle:1,mag:25},{angle:-1,mag:25}];
		this['super'].registerShape.call(this,this.shipRestShape);
		this.weaponList = this.prototype.weaponList;
		this.weaponSlotIndicies = [2,8,2,3];
		this.color= "gray";
		this.shipName = "Torus";
		this.registerGradient = function(context){
			if(!this.grd){
					this.grd=context.createRadialGradient(0,0,1,0,0,60);
					this.grd.addColorStop(1,"#555");
					this.grd.addColorStop(0.5,"#AAA");
					this.grd.addColorStop(0,"#000");}
		};
		this.initialWeaponList = ["PhotonMk2","Artemis","None","None"];
	};
	Torus.extend(Ship);
	return Torus;
});