define(function(){
	var helper = {};
	helper.size = {x:800,y:600};
	helper.resizeMobile = function(callback){
		if (mobilecheck())
		{
			launchFullscreen(document.documentElement);
			window.setTimeout(function(){
				var canvas = $('#pilot');
				canvas[0].width = $(window).width();
				canvas[0].height = $(window).height();
				helper.size = {x:canvas[0].width,y:canvas[0].height};
				callback();
			},1000);
			$('#controls').remove();
		}
		else
		{
			callback();
		}
	};
	return helper;
});
Function.prototype.extend = function(parent) {
  var child = this, parentImpl = new parent();
  child.prototype = parent;
  child.prototype['super'] = parentImpl;
  child.prototype = new child(Array.prototype.slice.call(arguments,1));
  for(var param in parentImpl) {child.prototype[param] = parentImpl[param];}
  child.prototype.constructor = child
};
/*Array.prototype.deepCopy = function() {
    if (Object.prototype.toString.call(this) === '[object Array]') {
        var out = [], i = 0, len = this.length;
        for ( ; i < len; i++ ) {
            out[i] = arguments.callee.call(this[i]);
        }
        return out;
    }
    if (typeof this === 'object') {
        var out = {}, i;
		if(this.length >0)
		{
			for ( i in this ) {
				out[i] = arguments.callee.call(this[i]);
			}
		}
		else {return JSON.parse(JSON.stringify(this));}
        return out;
    }
    return this;
};*/
window.mobilecheck = function() {
	try{
		document.createEvent('TouchEvent');
		return true;
	}
	catch(e){
		return false;
	}
}
window.launchFullscreen = function(element) {
  if(element.requestFullscreen) {
    element.requestFullscreen();
  } else if(element.mozRequestFullScreen) {
    element.mozRequestFullScreen();
  } else if(element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  } else if(element.msRequestFullscreen) {
    element.msRequestFullscreen();
  }
};
window.exitFullscreen = function() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
};
window.getParameterByName = function(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
};
window.isInside = function(pos,rect)
{
	if(pos.x>rect.x && pos.x<rect.x+rect.w)
		if(pos.y>rect.y && pos.y<rect.y+rect.h)
			return true;
	return false;
};
window.hexMap = {0:0,1:1,2:2,3:3,4:4,5:5,6:6,7:7,8:8,9:9,10:"A",11:"B",12:"C",13:"D",14:"E",15:"F"};
window.findPath = function(rooms, startIndex, endIndex) {
	var visitedIndicies = {},
		roomStack = [],
		toVisitStack = [],
		currentRoom = rooms[startIndex], 
		currentId;
	visitedIndicies[startIndex] = rooms[startIndex];
	while(currentId != endIndex)
	{
		var j=0;
		for(j=0;j<currentRoom.doors.length;j++)
		{
			var door = currentRoom.doors[j];
			if(!visitedIndicies[door.linkIndex] && door.linkIndex != -1)
			{
				toVisitStack.push(door.link);
				door.link.parentNode = currentRoom;
				visitedIndicies[door.linkIndex] = door.link;
			}
		}
		currentRoom = toVisitStack.shift();
		currentId = currentRoom.id;
		/*if(j==currentRoom.doors.length) // Dead end
		{
			roomStack.pop();
			currentRoom = roomStack[roomStack.length-1];
		}*/
		if(currentId == endIndex)
		{
			roomStack = [currentRoom];
			while(currentId != startIndex)
			{
				roomStack.unshift(currentRoom.parentNode);
				currentRoom = currentRoom.parentNode;
				currentId = currentRoom.id;
			}
			break;
		}
	}
	return roomStack;
}
window.drawTextInRect = function(text,rect,context)
{
	var avgFontFactor = 7,
		curWidth = text.length * avgFontFactor,
		textArray = [text],
		i=0;
	while(curWidth > rect.w)
	{
		var lastText = textArray[textArray.length-1],
			textChunks = lastText.split(' '),
			textRow = '',
			textChunkInd = 0;
		while(textRow.length*avgFontFactor < rect.w)
		{
			if(textRow.length >0)
				textRow += ' ';
			textRow += textChunks[textChunkInd];
			textChunkInd+=1;
		}
		
		textArray[textArray.length-1] = textRow;
		textArray.push(lastText.substr(textRow.length+1,lastText.length));
		curWidth = textArray[textArray.length-1].length * avgFontFactor;
	}
	for(i=0;i<textArray.length;i++)
	{
		context.fillText(textArray[i],rect.x+20,rect.y+20+i*avgFontFactor*3);
	}
}
