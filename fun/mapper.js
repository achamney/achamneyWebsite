define(function(){
	var canvas = document.getElementById('mapper'),
		size = {x:canvas.width,y:canvas.height};
	var list = [];
	var scale = 20;
	var onClick = function(e){
		var element = canvas;
		var offsetX = 0, offsetY = 0

			if (element.offsetParent) {
		  do {
			offsetX += element.offsetLeft;
			offsetY += element.offsetTop;
		  } while ((element = element.offsetParent));
		}

		var pos = {x : e.pageX - offsetX,
					y : e.pageY - offsetY};
		list.push(scalePointDown(pos));
		document.getElementById("pointText").innerHTML = JSON.stringify(list);
	};
	canvas.addEventListener("click", onClick, false);
	window.paint = function(){
		var canvas = document.getElementById('mapper'),
			context = canvas.getContext('2d'),
			size = {x:canvas.width,y:canvas.height};
		context.clearRect(0,0,size.x,size.y);
		context.beginPath();
		context.moveTo(size.x/2,0);
		context.lineTo(size.x/2,size.y);
		context.moveTo(0,size.y/2);
		context.lineTo(size.x,size.y/2);
		context.stroke();
		
		for(var pos in list)
		{
			var point = scalePointUp(list[pos]);
			context.strokeRect(point.x-5,point.y-5,10,10);
		}
		context.beginPath();
		for(var pos in list)
		{
			var point = scalePointUp(list[pos]);
			context.lineTo(point.x,point.y);
		}
		context.stroke();
	};
	window.scalePointDown = function(point){
		return {x:Math.round((point.x-size.x/2)/scale),y:Math.round((point.y-size.y/2)/scale)};
	};
	window.scalePointUp = function(point){
		return {x:point.x*scale+size.x/2,y:point.y*scale+size.y/2};
	};
	window.undo = function(){
		list.pop();
	};
	window.mirror = function(){
		var size = list.length;
		for(var i=size-1;i>=0;i--)
		{
			list.push({x:-list[i].x,y:list[i].y});
		}
		document.getElementById("pointText").innerHTML = JSON.stringify(list);
	};
	window.inputPoints = function(){
		var points = document.getElementById('inputPoints').value;
		list = JSON.parse(points);
	};
	window.setInterval(paint,300);
});
