define(['weapon/bullet','debris','vectorSprite'],
		function(Bullet,Debris,Vs){
	var weaponShape=[{x:-2,y:-2}];
	var Weapon = function(){
		this.reloadTime = 999999999; this.reloadTimeMax = 999999999;
		this.numShots = 1;
		this.power = 0;
		this.x = 0; this.y = 0;
		this['super'].registerShape.call(this,weaponShape);
		this.bullets = [];
		this.text = "";
		this.fire = function(ship){
			// virtual method...
		}
		
		this.draw = function(context){
			this['super'].draw.call(this,context);
			context.restore(); // context not restored from the ship draw
			context.restore(); // weapon context
			for(var i=0;i<this.bullets.length;i++)
			{
				this.bullets[i].draw(context);
			}
		};
		this.update = function(ship){
			this.fAngle = ship.fAngle;
			
			for(var i=0;i<this.bullets.length;i++)
			{
				this.bullets[i].update();
			}
			for(var i=0;i<this.bullets.length;i++)
			{
				if(this.bullets[i].markedForDeletion)
				{
					this.bullets.splice(i,1);
				}
			}
			if(this.reloadTime == 0 && this.target)
			{
				this.target.waitForCollision(this);
				this.fire(this.ship,this.target);
				delete this.target;
			}
			if(this.reloadTime >0 && this.powered){this.reloadTime-=1;}
		};
		this.collide = function(asteroid)
		{
			for(var i=0;i<this.bullets.length;i++)
			{
				var bull = this.bullets[i];
				if(bull.y < bull.target.y + bull.target.ship.y && bull.inEnemyField && !bull.markedForDeletion)
				{
					bull.markedForDeletion = true;
					bull.target.hurt(this.damage);
				}
			}
		};
		this.getPower = function()
		{
			if(this.powered)
				return this.power;
			return 0;
		};
	}
	Weapon.extend(Vs);
	return Weapon;
});