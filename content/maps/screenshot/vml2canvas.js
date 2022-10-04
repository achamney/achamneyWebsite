/*
         
         * Austin Chamney (achamney@gmail.com)
         * http://code.google.com/p/canvg/
         *
         */
define([
"dojo/_base/declare",
"dojo/_base/lang",
"dojo/dom-geometry"
], function (declare,lang, domGeo) 
{
	return function(){
		var myVml = {
			isVml : function()
			{
				try
				{
					document.createElement("canvas").getContext("2d");
					return false;
				}
				catch(e)
				{
					return true;
				}
			},
			render : function (canvas,vml,options)
			{
				this.init();
	
				this.renderObj = new this.Element[vml.nodeName](vml);
				this.imageHrefs = 0;
				this.imagesLoaded = 0;
				if(!this.scriptCalls)
					this.scriptCalls = 0;
				vml.hasRendered = false;
				this.uniqueUrls = this.uniqueUrls || [];
				this.options = options;
				this.imageTransferCheck = function()
				{
					if(this.imagesLoaded >= this.imageHrefs && !vml.hasRendered)
					{
						vml.hasRendered = true;
						this.renderObj.render(canvas.getContext("2d"));
						this.options.callback();
					}
					else
					{
						//window.setTimeout(lang.hitch(this,function(){
						//	imageTransferCheck();
						//}),50);
					}
				};
				this.findChildren(this.renderObj,vml);
				var me = this;
				window.setTimeout(function(){me.imageTransferCheck.call(me);},10);
			},
			findChildren :function(renderObj,el)
			{
				
				renderObj.children = [];
				for(var i=0;i< el.childNodes.length;i++)
				{
					var cDom = el.childNodes[i];
					cDom.toPx = this.toPx;
					var ObjClazz = this.Element[cDom.nodeName];
					if(ObjClazz && cDom.style.display != "none")
					{
						var cObj = new ObjClazz(cDom);
						cObj.parent = renderObj;
						if(cObj)
						{
							renderObj.children.push(cObj);
							this.findChildren(cObj,cDom);
						}
					}
				}
			},
			init : function ()
			{
				this.Element = {};
				var me = this;
				this.Element.group = function(dom){
					this.dom = dom;
					this.x = dom.toPx(dom,"left");
					this.y = dom.toPx(dom,"top");
					this.w = dom.toPx(dom,"width");
					this.h = dom.toPx(dom,"height");
					this.print = function()
					{
						console.log(this.dom);
					};
					this.render = function(ctx)
					{
						for (var i=0;i<this.children.length;i++)
						{
							this.children[i].render(ctx);
						}
					};
				};
				this.Element.rect = function(dom){
					this.dom = dom;
					this.x = dom.toPx(dom,"left");
					this.y = dom.toPx(dom,"top");
					this.w = dom.toPx(dom,"width");
					this.h = dom.toPx(dom,"height");
					this.fillStyle = dom.currentStyle["fillStyle"];
					this.print = function()
					{
						console.log(this.dom);
					};
					this.render = function(ctx)
					{
						if(this.fillStyle)
						{
							ctx.drawRect(this.x,this.y,this.w,this.h);
						}
						else
						{
							if(this.children.length > 0)
							{
								this.children[0].setRelative(this.x,this.y,this.w,this.h);
								this.children[0].render(ctx);
							}
							
						}
					};
				};
				this.Element.oval = function(dom){
					this.dom = dom;
					this.opacity = dom.fill.opacity;
					this.x = dom.toPx(dom,"left");
					this.y = dom.toPx(dom,"top");
					this.w = dom.toPx(dom,"width");
					this.h = dom.toPx(dom,"height");
					this.fillStyle = dom.fillcolor.value;
					this.print = function()
					{
						console.log(this.dom);
					};
					this.render = function(ctx)
					{
						ctx.fillStyle = {color:this.fillStyle,opacity:this.opacity,
										strokeWeight:this.dom.strokeweight};
						ctx.beginPath();
						ctx.arc(this.x,this.y,this.w/2);
						ctx.stroke();
					};
				};
				this.Element.imagedata = function(dom){
					this.dom = dom;
					this.yOffset =  0;//domGeo.position(me.renderObj.dom.firstChild).y - 25; // to fix the images in the header problem
					this.src = dom.src;
					me.imageHrefs++;
					this.print = function()
					{
						console.log(this.dom);
					};
					this.render = function(ctx)
					{
						//this.dom.src = this.qualifyURL(this.dom.src);
						
						this.dom.scaled= true;
						this.dom.mySrc = this.src; // to avoid setting image src to base64
						ctx.fillStyle = {};
						ctx.drawImage(this.dom,
								0,0,this.w,this.h,
								this.x,parseInt(this.y)+parseInt(this.yOffset),this.w,this.h);	
					};
					this.setRelative = function(x,y,w,h)
					{
						this.x = x;
						this.y = y;
						this.w = w;
						this.h = h;
					};
					this.qualifyURL = function (url) {
						var a = document.createElement('a');
						a.href = url;
						return a.href;
					};
					this.src = this.qualifyURL(this.src);
					//me.proxyGetImage.call(me,this.src,this);
					me.imagesLoaded ++;
					
				};
				this.Element.DIV = function(dom){
					this.dom = dom;
					this.print = function()
					{
						console.log(this.dom);
					};
					this.render = function(ctx)
					{
						for(var i =0;i< this.children.length; i++)
						{
							this.children[i].render(ctx);
						}
					};
					
				};
				this.Element.textpath = function(dom){
					this.dom = dom;
					this.path = dom.parentNode.path.value;
					this.fillcolor = dom.parentNode.fillcolor.value;
					this.string = dom.string;
					this.curStyle = dom.parentNode.currentStyle;
					this.fontString = "normal normal normal "+this.curStyle.fontSize+" "+this.curStyle.fontFamily;
					this.print = function()
					{
						console.log(this.dom);
					};
					this.render = function(ctx)
					{
						ctx.font = this.fontString;
						var pathArray = this.path.split(/[\s,]+/);
						var x = pathArray[0].replace("m","");
						var y = pathArray[1];
						ctx.fillStyle = this.fillcolor;
						ctx.fillText(this.string,x,y);
						
					};
					
				};
				
				 this.Element.shape = function(node) {
	
						this.dom = node;
				        this.path = node.path.value;
				        this.fillColor = node.fillColor.value;
				        this.strokeColor = node.stroke.color.value;
				        this.fOpacity = node.fill.opacity;
				        this.sOpacity = node.stroke.opacity;
				        this.borderColor = node.currentStyle.borderColor;
				        this.render = function(ctx)
						{
				        	if(this.children.length<=0)
				        	{
				        		
				        		if(this.dom.filled)
				        		{
				        			ctx.fillStyle = {color:this.fillColor,
				        					fOpacity:this.fOpacity,
				        					sOpacity:this.sOpacity,
				        					strokeWeight:this.dom.strokeweight,
				        					dashStyle:this.dom.stroke.dashstyle.value,
				        					offsetx:this.dom.skew.offset.x,
				        					offsety:this.dom.skew.offset.y,
				        					strokeColor:this.strokeColor};
						        	ctx.fillShape(this.path);		        			
				        		}
				        		else
				        		{
				        			ctx.fillStyle = {color:this.strokeColor,
				        								strokeWeight:this.dom.strokeweight,
				        								fOpacity:this.fOpacity,
				        								sOpacity:this.sOpacity,
							        					dashStyle:this.dom.stroke.dashstyle.value,
							        					offsetx:this.dom.skew.offset.x,
							        					offsety:this.dom.skew.offset.y};
				        			ctx.drawShape(this.path);
				        		}
				        	}
				        	for(var i =0;i< this.children.length; i++)
							{
								this.children[i].render(ctx);
							}
						};
			        };
		        
				this.toPx = function(el, attribute ) {
					if(!attribute)
						return domGeo.position(el);
					var val = el.currentStyle[attribute];
			        var rsLeft = el.runtimeStyle && el.runtimeStyle[ attribute ],
			        left,
			        style = el.style;
	
			        // Check if we are not dealing with pixels, (Opera has issues with this)
			        // Ported from jQuery css.js
			        // From the awesome hack by Dean Edwards
			        // http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291
	
			        // If we're not dealing with a regular pixel number
			        // but a number that has a weird ending, we need to convert it to pixels
	
			       /* if ( !/^-?[0-9]+\.?[0-9]*(?:px)?$/i.test( val ) && /^-?\d/.test( val ) ) {
	
			            // Remember the original values
			            left = style.left;
	
			            // Put in the new values to get a computed value out
			            if ( rsLeft ) {
			                el.runtimeStyle.left = el.currentStyle.left;
			            }
			            style.left = attribute === "fontSize" ? "1em" : (val || 0);
			            val = style.pixelLeft + "";
	
			            // Revert the changed values
			            style.left = left;
			            if ( rsLeft ) {
			                el.runtimeStyle.left = rsLeft;
			            }
	
			        }*/
	
			        if (!/^(thin|medium|thick)$/i.test( val )) {
			            return Math.round(parseFloat( val )) + "";
			        }
	
			        return val;
	
			    };
			},
			printObjs: function(obj)
			{
				obj.print();
				for(var cObj in obj.children)
				{
					this.printObjs(obj.children[cObj]);
				} 
			},
			proxyGetImage : function(url, imageObj) {
				var callback_name,
				scriptUrl = this.options.proxyUrl, 
				script,
				me = this;
				
				if(!this.uniqueUrls[url])
				{
					this.uniqueUrls[url] = {imgDoms:[],base64:""};
					this.uniqueUrls[url].imgDoms.push(imageObj);
					callback_name = 'vml2canvas_' + (this.scriptCalls++);
					imageObj.callbackname = callback_name;
		
					scriptUrl = scriptUrl.replace('%URL%',encodeURIComponent(url));
					scriptUrl = scriptUrl.replace('%CALLBACK%',callback_name);
					script = document.createElement("script");
		
					window[callback_name] = function (a) {
						//imageObj.src = a;
						me.uniqueUrls[url].base64 = a;
						for(var k = 0;k<me.uniqueUrls[url].imgDoms.length;k++)
						{
							me.uniqueUrls[url].imgDoms[k].src = a;
							me.imagesLoaded ++;
						}
						me.imageTransferCheck.call(me);
					
						window[callback_name] = undefined; // to work with IE<9  // NOTE: that the undefined callback property-name still exists on the window object (for IE<9)
						try {
							delete window[callback_name];  // for all browser that support this
						} catch (ex) { }
						script.parentNode.removeChild(script);
						script = null;
					};
		
					script.setAttribute("type", "text/javascript");
					script.setAttribute("src", scriptUrl);
					window.setTimeout(function(){
						try {
							window.document.body.appendChild(script);
						}
						catch (e)
						{ console.log(e+":("); }
					},1);
					
				}
				else if(this.uniqueUrls[url].base64.length >0)
				{
					me.imagesLoaded++;
					imageObj.src = me.uniqueUrls[imageObj.src].base64;
				}
				else
				{
					me.uniqueUrls[imageObj.src].imgDoms.push(imageObj);
				}
				
				
			}
		};
		return myVml;
	};
});