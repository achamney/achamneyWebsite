define(['helper'],function(helper){
	return function(){
		this.x = 0;
		this.y = 0; 
		this.speed={x:0,y:0}; 
		this.fAngle =0; 
		this.mAngle=0;
		this.shape = [];
		this.color = "#FF0000";
		this.markedForDeletion = false;
		this.draw = function(context){
			
			if(this.shape.length >0)
			{
				/*this.drawShape = [];
				for(var i=0;i<this.shape.length;i++)
				{
					this.drawShape[i] = {x:0,y:0};
					this.drawShape[i].x = this.shape[i].mag*Math.cos(this.shape[i].angle + this.fAngle);
					this.drawShape[i].y = this.shape[i].mag*Math.sin(this.shape[i].angle + this.fAngle);
				}*/
				context.save();
				
				context.translate(this.x,this.y);
				context.rotate(this.fAngle);
				context.beginPath();
				context.moveTo(this.shape[0].x, this.shape[0].y);
				for(var i=1;i<this.shape.length;i++)
				{
					context.lineTo(this.shape[i].x, this.shape[i].y);
				}
				context.strokeStyle = this.color;
				context.stroke();
			}
		};
		this.update = function(){
			this.x += this.speed.x;
			this.y += this.speed.y;
		};
		this.wrap = function(){
			if(this.x > helper.size.x + 10) this.x = -10;
			if(this.x < -10) this.x = helper.size.x + 10;
			if(this.y > helper.size.y + 10) this.y = -10;
			if(this.y < -10) this.y = helper.size.y + 10;
		};
		this.registerShape = function(shape){
			this.shape = shape;
			this.shape.maxDist = 0;
			for(var i=0;i<shape.length;i++)
			{
				var shp = shape[i],dist = Math.sqrt(shp.x*shp.x+shp.y*shp.y);
				if(dist>this.shape.maxDist){ this.shape.maxDist = dist; }
				shp.angle = Math.atan2(shp.y,shp.x);
				shp.mag = dist;
			}
		};
		this.collide = function(obj){
			var a = this.x - obj.x, b = this.y - obj.y,
				c = Math.sqrt(a*a + b*b);
			if(c-this.shape.maxDist - obj.shape.maxDist <=0)
			{
				return true;
			}
			return false;
		};
	};
});