define([
"dojo/_base/declare",
"dojo/request/xhr",
"dojo/_base/lang"
], function (declare,Base64,xhr,lang) 
{
	var CanReplace = function(canvas){
		this.drawSequence = [];
		this.drawStack = [];
		this.saveStack = [];
		this.fillStyle = "";
		this.base64 = {};
		this.font = "";
		this.canvas = canvas;
		this.imageData;
		this.translatePos = {x:0,y:0};
		this.drawLinePos = {x:0,y:0};
		this.fillRect = function(x,y,w,h)
		{
			if(this.drawSequence.length>52)
			{
				console.log("Filling Rect : "+x+" "+y + " "+this.fillStyle);
			}
			this.drawSequence.push({type:"fillRect",
								x:parseInt(x)+parseInt(this.translatePos.x),
								y:parseInt(y)+parseInt(this.translatePos.y),
								w:w,h:h,
								fillStyle:this.fillStyle});
		};
		this.save = function()
		{
			this.saveStack.push(this);
		};
		this.restore = function()
		{
			var old = this.saveStack.pop();
			this.fillStyle = old.fillStyle;
			this.translatePos = old.translatePos;
			
		};
		this.beginPath = function()
		{
			this.drawStack = [];
		};
		this.rect = function(x,y,w,h)
		{
			this.drawStack.push({type:"rect",
				x:x+this.translatePos.x,y:y+this.translatePos.y,
				w:w,h:h,
				fillStyle:this.fillStyle});
		};
		this.arc = function(x,y,r,sangle,eangle,cc)
		{
			/*x	The x-coordinate of the center of the circle
			y	The y-coordinate of the center of the circle
			r	The radius of the circle	
			sAngle	The starting angle, in radians (0 is at the 3 o'clock position of the arc's circle)	
			eAngle	The ending angle, in radians	
			counterclockwise	Optional. Specifies whether the drawing should be counterclockwise or clockwise. False=clockwise, true=counter-clockwise*/
			this.drawStack.push({type:"arc",
				x:parseInt(x)+parseInt(this.translatePos.x),
				y:parseInt(y)+parseInt(this.translatePos.y),
				r:r,
				fillStyle:this.fillStyle});
		};
		this.stroke = function()
		{
			for(var i = 0;i<this.drawStack.length;i++)
			{
				this.drawSequence.push(this.drawStack[i]);
			}
			this.drawStack = [];
		};
		this.clip = function()
		{
			this.drawStack = [];
			this.translatePos.x = 0;
			this.translatePos.y = 0;
		};
		this.drawImage = function()
		{
			var args = arguments;
			if(args[0].context )
			{
				var rect = args[0].rect;
				this.drawSequence.push({type:"newCanvas",
					x:parseInt(args[1]),
					y:parseInt(args[2]),
					w:rect.w||1024,
					h:rect.h||800,
					drawSequence:args[0].context.drawSequence}); // Marker to switch rendering devices
			}
			else
			{
				var scaled = args[0].scaled || false;
				this.drawSequence.push({type:"img",src: args[0].mySrc || args[0].src,
					x:args[5]||0+this.translatePos.x,y:args[6]||0+this.translatePos.y,
					w:args[3]||0,h:args[4]||0,
					cX:args[1]||0,cY:args[2]||0,
					fillStyle:this.fillStyle,
					scaled:scaled});
			}
		};
		this.fillText = function(text,x,y)
		{
			this.drawSequence.push({type:"text",text:text,
				x:parseInt(x)+parseInt(this.translatePos.x),
				y:parseInt(y)+parseInt(this.translatePos.y),
				fillStyle:this.fillStyle,
				font:this.font});
		};
		this.clearRect = function(x,y,w,h)
		{
			this.drawSequence.push({type:"clearRect",
				x:x||0+this.translatePos.x,y:y||0+this.translatePos.y,
				w:w||0,h:h||0});
		}; 
		this.fillShape = function(shapeData)
		{
			this.drawSequence.push({type:"fillShape",
				shapeData:shapeData,
				fillStyle:this.fillStyle});
		}; 
		this.drawShape = function(shapeData)
		{
			this.drawSequence.push({type:"drawShape",
				shapeData:shapeData,
				fillStyle:this.fillStyle});
		}; 
		this.translate = function(x,y)
		{
			this.translatePos.x += x;
			this.translatePos.y += y;
		};
		this.moveTo = function(x,y)
		{
			this.drawLinePos.x = x||0;
			this.drawLinePos.y = y||0;
		};
		this.lineTo = function(x,y)
		{
			this.drawSequence.push({type:"drawLine",
				x1:this.drawLinePos.x,y1:this.drawLinePos.y,
				x2:x||0,y2:y||0});
			this.moveTo(x,y);
		}; 
		this.quadraticCurveTo = function(x,y)
		{
			this.lineTo(x,y);
		};
		this.fill = function(fillStyle)
		{
			this.fillStyle = fillStyle || this.fillStyle;
			for(var i = 0;i<this.drawStack.length;i++)
			{
				this.drawStack[i].fillStyle = this.fillStyle;
				this.drawSequence.push(this.drawStack[i]);
			}
			this.drawStack = [];
		};
		this.closePath = function(x,y)
		{
			//draw a line back to the original position of begin path
		};
		this.transform = function(a,b,c,d,e,f)
		{
//          a	c	e
//			b	d	f
//			0	0	1

		};
		this.scale = function(a,b)
		{
//          a	b	0
//			0	1	0
//			0	0	1

		};
		this.createLinearGradient = function(x,y,w,h)
		{
			return {
				x:x,y:y,w:w,h:h,
				colorStops: [],
				addColorStop: function(ind,color)
				{
					this.colorStops.push({index:ind,color:color});
				}
			};
		};
		this.createRadialGradient = function(x1,y1,r1,x2,y2,r2)
		{
			/*x0	The x-coordinate of the starting circle of the gradient
			y0	The y-coordinate of the starting circle of the gradient
			r0	The radius of the starting circle
			x1	The x-coordinate of the ending circle of the gradient
			y1	The y-coordinate of the ending circle of the gradient
			r1	The radius of the ending circle*/
			return {
				x1:x1,y1:y1,r1:r1,
				x2:x2,y2:y2,r2:r2,
				colorStops: [],
				addColorStop: function(ind,color)
				{
					this.colorStops.push({index:ind,color:color});
				}
			};
		};
		this.getImageData = function(x,y,w,h)
		{
			return {
				data:this.imageData || [255,255,255,255] //?
			};
		};
		this.putImageData = function(data,x,y)
		{
			this.imageData = data;
		};
		this.saveCanvas = function(url,imgData,callback)
		{
			var GUID = ""+Math.random();
			GUID = GUID.replace(".","");
			var xhrArgs = {
					data: "image=" + imgData+"&contextId="+GUID+"&mapId=heatmap",
					method: "POST",
					sync: true,
					handleAs: "text"
				};
			xhr(url,xhrArgs).then(lang.hitch(this,function (data) {
									// return the name of the image saved to the server
									callback({contextId:GUID,imageName:"heatmap.png"});
								}),
								lang.hitch(this,function (error) {
									callback({contextId:error,imageName:error});
								})
							);
		};
		
	};
	return function(canvas,_window,_document){
		
		
		if(!canvas.saveContext)
			canvas.saveContext = canvas.getContext;
		canvas.getContext = function(dimension)
		{
			try{
				var origCtx = canvas.saveContext('2d');
				return origCtx;
			}
			catch(e)
			{
				if(canvas['context'])
					return canvas['context'];
				else
				{
					var ctx = new CanReplace(canvas);
					canvas['context'] = ctx;
					canvas.toDataURL = function(dataType)
					{
						canvas.context.canvas = null;
						var b64Data = ctx.base64.encode(JSON.stringify(canvas.context));
						if(!dataType)
							return b64Data;
						
						var defer = {onSuccess:function(){},onError:function(){}};
						ctx.saveCanvas("../../em4c/cgi-bin/em4c.cgi?/em4c/canvas/save/",b64Data,function(returnData){
							defer = "http://localhost/images/"+returnData.contextId+"/"+returnData.imageName;
						});
						return  defer;
					};
					return ctx;
				}
			}
		};
		return canvas;
	};
	
});
