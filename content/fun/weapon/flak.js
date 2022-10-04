define(['weapon/weapon','weapon/bullet'],function(Weapon,Bullet){
	var Flak = function(){
		this.reloadTime = 0; this.reloadTimeMax = 40;
		this.numShots = 5;
		this['super'].registerShape.call(this,[{x:3,y:-5},{x:3,y:0},{x:6,y:0},{x:6,y:-5}]);
		this.text = "Flak";
		this.fire = function(ship){
			if(this.reloadTime<=0)
			{
				this.reloadTime = this.reloadTimeMax;
				for(var i=0;i<this.numShots;i++)
				{
					var bull = new Bullet();
					bull.x = ship.x;
					bull.y = ship.y;
					bull.speed.x = -bull.maxSpeed * Math.cos(ship.fAngle + Math.PI/2 + Math.random()*0.3-0.15) + ship.speed.x;
					bull.speed.y = -bull.maxSpeed * Math.sin(ship.fAngle + Math.PI/2 + Math.random()*0.3-0.15) + ship.speed.y;
					this.bullets.push(bull);
				}
			}
		};
	}
	Flak.extend(Weapon);
	return Flak;
});