define(['vectorSprite'],function(Vs){
	var bullShape=[{x:-2,y:-2},{x:2,y:-2},{x:2,y:2},{x:-2,y:2},{x:-2,y:-2}];
	var Bullet = function(){
		this.maxSpeed = Math.random()*6 + 2;
		this.lifetime = 200;
		this.fAngle = Math.random()*Math.PI*2;
		this.rotSpeed = 0.17-Math.random()*0.25;
		this.x = 0; this.y = 0;
		this['super'].registerShape.call(this,bullShape);
		this.speed={x:0,y:0};
		this.damage = 1;
		this.color= "#00FF00";
		this.draw = function(context){
			this['super'].draw.call(this,context);
			context.restore();
			
			//
			//context.fillRect(this.x,this.y,10,10);
		};
		this.update = function(){
			//this.mAngle = this.fAngle;
			this.fAngle += this.rotSpeed;
			this['super'].update.call(this);
			if(this.y < 0 && this.target){
				this.y = 400;
				this.x = this.target.x + this.target.ship.x;
				this.inEnemyField = true;
			}
			//this.lifetime -=1;
			//if(this.lifetime <=0) { this.markedForDeletion = true; }
		}; 
		
	};
	
	
	Bullet.extend(Vs);
	return Bullet;
});