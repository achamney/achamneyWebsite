define([

"dojo/_base/declare",
"dojo/dom-geometry", 
"dojo/query", 
"dojo/dom-construct", 
"/maps/screenshot/canvg.js", 
"/maps/screenshot/html2canvas.js", 
"/maps/screenshot/rgbcolor.js", 
"dojo/request/xhr",
"dojo/_base/lang",
'dojo/NodeList-manipulate'
], function (declare,domGeo,$,construct,
		canvg,
		Html2Canvas, 
		dummy2,
		xhr,
		lang) 
{
	
	return declare("esriScreenshot",null,{
		svgRendered : false,
		popupsRendered : false,
		window : null, document : null, staging : null,
		constructor : function(options)
		{
			this.window = options.window || window;
			this.document = options.document || document;
			this.staging = options.staging || document;
			this.proxyUrl = options.proxyUrl || 'http://achamney.com/proxy/base64?url=%URL%&callback=%CALLBACK%';
			this.saveImageUrl = options.saveImageUrl || '../../em4c/cgi-bin/em4c.cgi?/em4c/util/save/';
			this.canvasUrl = options.canvasUrl || '../../em4c/cgi-bin/em4c.cgi?/em4c/canvas/save/';
			this.base64 = options.base64 || { encode:function (input){ return input; } };
		},
		snap : function (contextId,mapId,myDefer) {
			
			this.contextId = contextId;
			this.mapId = mapId;
			this.deferScreenshot = myDefer; 
			myDefer.isLoaded = false;
			this.fixLegend();
			if(this.isVml())
				this.proxyUrl = "defer";
			this.h2c = new Html2Canvas(this.window,this.document,this.staging);
			this.h2c.loadOptsAndRun([this.document.body], {
				onrendered: lang.hitch(this,function (canvasHtml) {
					this.createLoadingGif(); // Put here so the loading gif does not get rendered on the screenshot
					this.canvasHtml = canvasHtml;
					this.canvasSvg = this.staging.createElement('canvas');
					//canReplace(this.canvasSvg);
					this.canvasHtmlContext = canvasHtml.getContext('2d');
					
					this.renderSvg(this.document.getElementById('map_gc'),
							this.canvasSvg,
							lang.hitch(this,function(){
								this.drawBaseSvg();
					}));
				}),
				proxy: this.proxyUrl
			});
			
			return this.deferScreenshot;
		},
		drawBaseSvg : function()
		{
			var canvasSvgContext = this.canvasSvg.getContext('2d');
			// remove the sides of the svg canvas as to not overlap the menus
			//var sidePannel = $('.esriMapsSidePanel')[0];
			//var removeLeft = domGeo.position(sidePannel).x;
			//var topBarHeight = this.getTopBarHeight();
			//canvasSvgContext.clearRect(0, 0, removeLeft + domGeo.position(sidePannel).w, 1000);
			// draw the svg canvas onto the html2canvas canvas
			this.canvasHtmlContext.drawImage(this.canvasSvg, 0, 0);
			this.drawLegend();
			
		},
		drawLegend : function()
		{
			
			var legendSvg = $('.esriLegendLayer svg');
			if(this.isVml())
				legendSvg =$('.esriLegendLayer div[style^="CLIP"]');
			var processedSvgIcons = 0;
			var finishFunc = function(){
				if(processedSvgIcons >= legendSvg.length)
				{
					if($('.esriPopup')[0].style.visibility != "hidden")
					{
						this.renderPopups();
					}
					else
					{
						this.sendPic();
					}
				}
			};
			finishFunc.call(this);
			for(var i=0;i<legendSvg.length;i++)
			{
				var thisSvg = legendSvg[i];
				if(thisSvg.parentNode.offsetHeight>0) // is visible
				{
					var legendCanvasSvg = this.staging.createElement('canvas');
					canReplace(legendCanvasSvg);
					legendCanvasSvg.myPosition = domGeo.position(thisSvg);
					this.renderSvg(thisSvg,
						legendCanvasSvg,
						lang.hitch(this,function(drawnCanvas){
							this.canvasHtmlContext.drawImage(drawnCanvas, drawnCanvas.myPosition.x, drawnCanvas.myPosition.y);
							processedSvgIcons ++;
							finishFunc.call(this);
						}));
				}
				else
				{
					processedSvgIcons ++;
					finishFunc.call(this);
				}
			}
			
		},
		renderSvg : function(svgDom,svgCan,callback)
		{
			var svgText = svgDom;
		
			//Put the SVG data onto a canvas
			
				var tmp = this.document.createElement("div");
				tmp.appendChild(svgText.cloneNode(true));
				svgText = tmp.innerHTML;
				var regex = new RegExp("xlink:", "g");
				svgText = svgText.replace(regex, "");
				canvg(svgCan, svgText, {
					proxyUrl:this.proxyUrl,
					ignoreMouse: true,
					ignoreAnimation: true,
					renderCallback: lang.hitch(this,function () {
						
						callback(svgCan);
					})
				});
			
		},
		renderPopups : function()
		{
			var popups = $('.esriPopup');
			for(var i in popups)
			{
				var pop = popups[i];
				var rect = domGeo.position(pop);
				this.h2c.loadOptsAndRun([pop],{
					onrendered:lang.hitch(this,function(popupCanvas)
					{
						popupCanvas.rect = rect;
						this.canvasHtmlContext.drawImage(popupCanvas, 0, 0);
						//send canvas to the server 
						this.sendPic();
					}),
					proxy: this.proxyUrl,
					noImages: true
				});
			}     
		},
		
		sendPic : function(){
			
			//convert the canvas to a base64 image
			var imgData = this.canvasHtml.toDataURL();
			document.getElementById('screenImg').src = imgData;
		},
		createLoadingGif : function()
		{
			/*var img = this.document.createElement('img');
			img.id="screenLoadingGif";
			var a = document.createElement('a');
			a.href = "../admin/images/ajaxloading.gif";
			img.src = a.href;
			img.setAttribute("style","position:absolute;z-index:100;margin:auto;left:50%;top:50%;");
			this.document.body.appendChild(img);*/
		},
		removeLoadingGif : function()
		{
			var loadingGif = this.document.getElementById('screenLoadingGif');
			loadingGif.parentNode.removeChild(loadingGif);
		},
		getTopBarHeight : function()
		{
			var topBarHeight = 0;
			
			if(this.window.getComputedStyle)
			{
				var computedStyle0, computedStyle1;
				computedStyle0 = getComputedStyle(this.document.getElementById('dijit_layout_ContentPane_0'));
				computedStyle1 = getComputedStyle(this.document.getElementById('dijit_layout_ContentPane_1'));
				if (computedStyle1.display != "none")
					topBarHeight += parseInt(computedStyle1.height,10);
				if (computedStyle0.display != "none")
					topBarHeight += parseInt(computedStyle0.height,10);
			}
			else 
			{
				computedStyle0 = this.document.getElementById('dijit_layout_ContentPane_0').currentStyle;
				computedStyle1 = this.document.getElementById('dijit_layout_ContentPane_1').currentStyle;
				if (computedStyle1.display != "none")
					topBarHeight += parseInt(computedStyle1.height,10);
				if (computedStyle0.display != "none")
					topBarHeight += parseInt(computedStyle0.height,10);
			}
			return topBarHeight;
		},
		fixLegend : function(dom)
		{

			var genFeatMonitor = $(".generateFeaturesMonitor");
			if(genFeatMonitor.length > 0)
				genFeatMonitor.innerHTML("");
			
		},
		revertLegend : function(dom)
		{

		},
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
		}
	});

});