define(['helper'],function(helper){
	var Room = function(params,context){
		this.open = false;
		this.draw = function(context){
			context.strokeStyle="orange"
			if(this.open){
				if(this.type == "v"){
					context.strokeRect(this.x-this.w,this.y-this.h,this.w*2,this.w*2);
					context.strokeRect(this.x-this.w,this.y+this.h,this.w*2,this.w*2);
				}
				if(this.type == "h"){
					context.strokeRect(this.x+this.w,this.y-this.h,this.h*2,this.h*2);
					context.strokeRect(this.x-this.w,this.y-this.h,this.h*2,this.h*2);
				}
			}
			else{
				context.strokeRect(this.x-this.w,this.y-this.h,this.w*2,this.h*2);
			}
		};
		this.update = function(){
		
		};
		this.registerPos = function(){
			if(params.type=="Vertical")
			{
				this.x = Room.vPosMap[params.pos].x*context.shipScale;
				this.y = Room.vPosMap[params.pos].y*context.shipScale;
				this.type = Room.vPosMap[params.pos].type;
			}
			if(params.type=="Horizontal")
			{
				this.x = Room.hPosMap[params.pos].x*context.shipScale;
				this.y = Room.hPosMap[params.pos].y*context.shipScale;
				this.type = Room.hPosMap[params.pos].type;
			}
			if(params.type=="Square")
			{
				this.x = Room.sPosMap[params.pos].x*context.shipScale;
				this.y = Room.sPosMap[params.pos].y*context.shipScale;
				this.type = Room.sPosMap[params.pos].type;
			}
			this.linkIndex = params.link;
			if(this.type == "v") {this.w = 3; this.h = 7;}
			if(this.type == "h") {this.w = 7; this.h = 3;}
		};
		this.registerPos();
		this.click = function(x,y,button){
			var pos = {x:x,y:y},
				rect = {x:this.x-this.w,y:this.y-this.h,w:this.w*2,h:this.h*2};
			if(isInside(pos,rect))
				this.open = !this.open;
		};
	};
	var ratio = 0.9;
	Room.vPosMap = {0:{x:0*ratio,y:-2*ratio,type:"h"},1:{x:1*ratio,y:-1*ratio,type:"v"},2:{x:1*ratio,y:1*ratio,type:"v"},3:{x:0*ratio,y:2*ratio,type:"h"},4:{x:-1*ratio,y:1*ratio,type:"v"},5:{x:-1*ratio,y:-1*ratio,type:"v"}};
	Room.hPosMap = {0:{x:-1*ratio,y:-1*ratio,type:"h"},1:{x:1*ratio,y:-1*ratio,type:"h"},2:{x:2*ratio,y:0*ratio,type:"v"},3:{x:1*ratio,y:1*ratio,type:"h"},4:{x:-1*ratio,y:1*ratio,type:"h"},5:{x:-2*ratio,y:0*ratio,type:"v"}};
	Room.sPosMap = {0:{x:-1*ratio,y:-2*ratio,type:"h"},1:{x:1*ratio,y:-2*ratio,type:"h"},2:{x:2*ratio,y:-1*ratio,type:"v"},3:{x:2*ratio,y:1*ratio,type:"v"},4:{x:1*ratio,y:2*ratio,type:"h"},5:{x:-1*ratio,y:2*ratio,type:"h"},6:{x:-2*ratio,y:1*ratio,type:"v"},7:{x:-2*ratio,y:-1*ratio,type:"v"}};
	return Room;
});
		