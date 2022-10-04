define(['vectorSprite'],function(Vs){
	
	var Debris = function(){
		this.maxSpeed = Math.random()*6 + 2;
		this.lifetime = 100;
		this.fAngle = Math.random()*Math.PI*2;
		this.rotSpeed = 0.17-Math.random()*0.25;
		this.x = 0; this.y = 0;
		this.shape=[];
		for(var i=0;i<6;i++){ this.shape.push({x:Math.random()*10-5,y:Math.random()*10-5}); }
		this['super'].registerShape.call(this,this.shape);
		this.speed={};
		this.speed.x = 0;
		this.speed.y = 0;
		this.color= "#00AAAA";
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
			this.lifetime -=1;
			if(this.lifetime <=0) { this.markedForDeletion = true; }
		}; 
		
	};
	Debris.extend(Vs);
	Debris.dList = [];
	Debris.draw = function(context){
		for(var i=0;i<Debris.dList.length;i++)
		{
			Debris.dList[i].draw(context);
		}
	};
	Debris.update = function(){
		for(var i=0;i<Debris.dList.length;i++)
		{
			Debris.dList[i].update();
		}
		for(var i=0;i<Debris.dList.length;i++)
		{
			if(Debris.dList[i].markedForDeletion)
			{ Debris.dList.splice(i,1); }
		}
	};
	Debris.add = function(x,y,col,sx,sy,life){
		var debr = new Debris();
		debr.x = x;
		debr.y = y;
		debr.lifetime = life || debr.lifetime;  
		debr.speed.x = sx || Math.random()*10-5;
		debr.speed.y = sy || Math.random()*10-5;
		debr.color= col || debr.color;
		Debris.dList.push(debr);	
	};
	return Debris;
});