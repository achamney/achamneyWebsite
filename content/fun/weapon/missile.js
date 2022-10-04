define(['weapon/weapon','weapon/bullet','debris'],function(Weapon,Bullet,Debris){
	var Missile = function(){
		this.reloadTime = 0; this.reloadTimeMax = 20;
		this.numShots = 3;
		this.text = "Missile";
		this['super'].registerShape.call(this,[{x:-1,y:-5},{x:-1,y:-9},{x:1,y:-9},{x:1,y:-5},{x:-1,y:-5}]);
		this.fire = function(ship){
			if(this.reloadTime<=0)
			{
				this.reloadTime = this.reloadTimeMax;

				var bull = new Bullet();
				bull.maxSpeed = 7;
				bull.x = this.x;
				bull.y = this.y;
				bull.damage = 5;
				bull.speed.x = -bull.maxSpeed * Math.cos(ship.fAngle + Math.PI/2) + ship.speed.x;
				bull.speed.y = -bull.maxSpeed * Math.sin(ship.fAngle + Math.PI/2) + ship.speed.y;
				this.bullets.push(bull);
				
			}
		};
		this.collide = function(asteroid)
		{
			for(var i=0;i<this.bullets.length;i++)
			{
				var bull = this.bullets[i],
					saveShapeSize = bull.shape.maxDist;
				if(bull['super'].collide.call(bull,asteroid))
				{
					bull.markedForDeletion = true;
					asteroid.x += bull.speed.x *2;
					asteroid.y += bull.speed.y *2;
					asteroid.hurt(Math.sqrt(bull.speed.x*bull.speed.x)+Math.sqrt(bull.speed.y * bull.speed.y) + bull.damage);
					Debris.add(bull.x,bull.y);
				}
				if(bull.lifetime <=180) // home after 1 second
				{
					bull.shape.maxDist = 100; // radius of bullet home
					if(bull['super'].collide.call(bull,asteroid))
					{
						bull.speed.x += (-bull.x + asteroid.x)/200;
						bull.speed.y += (-bull.y + asteroid.y)/200;
						
						var angle = Math.atan2(bull.speed.y,bull.speed.x) + Math.PI/2;
						Debris.add(bull.x,bull.y
							,'#999',Math.cos(angle)*5,Math.sin(angle)*5, Math.random()*20);
					}
					bull.shape.maxDist = saveShapeSize;
				}
			}
		}
	}
	Missile.extend(Weapon);
	return Missile;
});