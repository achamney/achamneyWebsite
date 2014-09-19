define(['weapon/weapon','weapon/bullet'],function(Weapon,Bullet){
	var Photon = function(){
		this.reloadTime = 0; this.reloadTimeMax = 30;
		this.numShots = 1;
		this['super'].registerShape.call(this,[{x:3,y:-5},{x:3,y:0},{x:4,y:0},{x:4,y:-5}]);
		this.text = "Basic Laser";
		this.fire = function(ship){
			if(this.reloadTime<=0)
			{
				this.reloadTime = this.reloadTimeMax;
				var bull = new Bullet();
				bull.x = ship.x;
				bull.y = ship.y;
				bull.maxSpeed = 20;
				bull.speed.x = -bull.maxSpeed * Math.cos(ship.fAngle + Math.PI/2) + ship.speed.x;
				bull.speed.y = -bull.maxSpeed * Math.sin(ship.fAngle + Math.PI/2) + ship.speed.y;
				this.bullets.push(bull);
			}
		};
	}
	Photon.extend(Weapon);
	return Photon;
});