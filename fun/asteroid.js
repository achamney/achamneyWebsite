define(['vectorSprite','helper'],function(Vs,helper){
	var Asteroid = function(){
		this.magSpeed = Math.random()*3;
		this.fAngle = Math.random()*Math.PI*2;
		this.rotSpeed = 0.17-Math.random()*0.25;
		this.x = Math.random()*helper.size.x; this.y = Math.random()*helper.size.y;
		this['super'].registerShape.call(this,
			[{x:-15,y:5},{x:-10,y:6},{x:-11,y:12},
				{x:Math.random()*17,y:5},{x:6,y:0},{x:3,y:-2},
				{x:0,y:Math.random()*-12},{x:-3,y:-10},{x:-5,y:0},{x:-15,y:5}]);
		this.health = this.shape.maxDist*3;
		this.speed={};
		this.speed.x = Math.cos(this.fAngle) * this.magSpeed;
		this.speed.y = Math.sin(this.fAngle) * this.magSpeed;
		this.color= "#0000FF";
		this.draw = function(context){
			if(!Asteroid.grd){
				Asteroid.grd=context.createLinearGradient(0,-15,0,15);
				Asteroid.grd.addColorStop(0,"black");
				Asteroid.grd.addColorStop(0.5,"blue");
				Asteroid.grd.addColorStop(1,"black");}
	
			context.fillStyle = Asteroid.grd;
			this['super'].draw.call(this,context);
			context.fill();
			context.restore();
		};
		this.update = function(){
			this.fAngle += this.rotSpeed;
			this['super'].update.call(this);
			this.wrap();
		}; 
		this.hurt = function(dmg){
			this.health -= dmg;
			if(this.health <=0)
			{
				this.markedForDeletion = true;
			}
		};
		
	};
	
	Asteroid.extend(Vs);
	return Asteroid;
});