define(['weapon/weapon','weapon/bullet'],function(Weapon,Bullet){
	var PhotonMk2 = function(){
		this.reloadTime = 200; this.reloadTimeMax = 200;
		this.power = 2;
		this.damage = 1;
		this.text = "Burst Mk 2";
		this.smallShape = [{"x":-1,"y":2},{"x":-2,"y":1},{"x":-2,"y":-1},{"x":-3,"y":-1},{"x":-3,"y":-2},{"x":-2,"y":-2},{"x":-2,"y":-3},{"x":-3,"y":-3},{"x":-3,"y":-4},{"x":-2,"y":-4},{"x":-2,"y":-5},{"x":-1,"y":-5},{"x":0,"y":-5},{"x":0,"y":-6},{"x":1,"y":-6},{"x":1,"y":-5},{"x":2,"y":-5},{"x":1,"y":-2},{"x":1,"y":-1},{"x":2,"y":0},{"x":1,"y":1},{"x":3,"y":3},{"x":-1,"y":2}];
		for(var i in this.smallShape){this.smallShape[i] = {x:this.smallShape[i].x*2,y:this.smallShape[i].y*2}}
		this['super'].registerShape.call(this,this.smallShape);
		this.fire = function(ship,target){
			if(this.reloadTime<=0)
			{
				var me = this;
				me.reloadTime = me.reloadTimeMax;
				var fireOne = function(){
					var shipAngle = ship.fAngle + Math.PI/2;
					
					var bull = new Bullet();
					bull.x = me.x ;
					bull.y = me.y ;
					bull.target = target;
					bull.maxSpeed = 20;
					bull.speed.x = -bull.maxSpeed * Math.cos(shipAngle) + ship.speed.x;
					bull.speed.y = -bull.maxSpeed * Math.sin(shipAngle) + ship.speed.y;
					me.bullets.push(bull);
				};
				fireOne();
				setTimeout(fireOne,200);
				setTimeout(fireOne,400);
			}
		};
	}
	PhotonMk2.extend(Weapon);
	return PhotonMk2;
});