
require(['jquery','helper','pilot/pilot','crew/crew','server','levelDesign'],
	function(jq,helper,pilot,crew,server,levelDesign){
	$('body').css('margin','0px');
	window.game = {pilot:pilot,crew:crew};
	game.images = {};
	game.loadImage = function(src,x,y)
	{
		var imageObj = {img:new Image()};
		imageObj.img.onload = function() { 
			imageObj.width = imageObj.img.width;
			imageObj.height = imageObj.img.height;
		}
		imageObj.img.src = src;
		imageObj.x = x ;
		imageObj.y = y ;
		game.images[src] = imageObj;
	};
	game.drawImage = function(src,context)
	{
		var imgObj = game.images[src];
		context.drawImage(imgObj.img,imgObj.x,imgObj.y);
	};
	window.startGame = function(){
		$('#startButton').remove();
		$('canvas').attr('onclick','');
		helper.resizeMobile(function(){
			pilot.init.call(pilot,levelDesign);
			crew.init.call(crew,levelDesign);
			window.setInterval(function(){
				pilot.updateLoop.call(pilot);
				crew.updateLoop.call(crew);
			},30);

			var animFrame = window.requestAnimationFrame ||
					window.webkitRequestAnimationFrame ||
					window.mozRequestAnimationFrame    ||
					window.oRequestAnimationFrame      ||
					window.msRequestAnimationFrame     ||
					null ;

			if ( animFrame !== null ) {
				var canContainer = $('#pilot')[0],
					cCanContainer = $('#crew')[0];
				var recursiveAnim = function() {
					pilot.drawLoop.call(pilot);
					animFrame( recursiveAnim, canContainer );
				};
				var crecursiveAnim = function(){
					crew.drawLoop.call(crew);
					animFrame( crecursiveAnim, cCanContainer );
				};

				// start the drawLoop
				animFrame( recursiveAnim, canContainer );
				animFrame( crecursiveAnim, cCanContainer );
			} else {
				var ONE_FRAME_TIME = 30 ;
				setInterval( recursiveAnim, ONE_FRAME_TIME );
			}
		});
		server.start();
	}
	
});
