define(['encounter','ship/shipList','helper'],function(Encounter,shipList,helper){
	var levelDesign = {};
	levelDesign.init = function(ship){
		var level = {},
		params = {};
		params.options = [{text:'Yes',resolve:function(encounter){
							encounter.closeWindow();
						}},
						{text:'No',resolve:function(encounter){
							encounter.closeWindow();
						}}];
		params.ship = ship;
		params.enemy = new shipList[0]();
		params.enemy.init({shipScale:10});
		params.enemy.x = helper.size.x - 200;
		params.enemy.y = 200;
		params.enemy.initRooms();
		params.enemy.ai = function(){

		};
		ship.enemy = params.enemy;
		params.text = "The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog The quick brown fox jumped over the lazy dog";
		var encounter = new Encounter(params);
		level.encounter = encounter;
		return level;
	};
	levelDesign.initPilot = function(ship){return levelDesign.init(ship);};
	levelDesign.initCrew = function(ship){
		ship.x = 200;
		return levelDesign.init(ship);
	};
	return levelDesign;
});