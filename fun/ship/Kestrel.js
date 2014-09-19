define(['ship/ship'],function(Ship){
	var Kestrel = function(){
		this.speed = {x:0,y:0};
		this.shipRestShape = [{"x":-1,"y":-14},{"x":-3,"y":-13},{"x":-5,"y":-7},{"x":-5,"y":-3},{"x":-7,"y":0},{"x":-8,"y":0},{"x":-8,"y":2},{"x":-9,"y":1},{"x":-10,"y":2},{"x":-10,"y":10},{"x":-9,"y":11},{"x":-8,"y":10},{"x":-8,"y":9},{"x":-7,"y":10},{"x":-6,"y":13},{"x":-4,"y":14},{"x":-1,"y":15},{"x":1,"y":15},{"x":4,"y":14},{"x":6,"y":13},{"x":7,"y":10},{"x":8,"y":9},{"x":8,"y":10},{"x":9,"y":11},{"x":10,"y":10},{"x":10,"y":2},{"x":9,"y":1},{"x":8,"y":2},{"x":8,"y":0},{"x":7,"y":0},{"x":5,"y":-3},{"x":5,"y":-7},{"x":3,"y":-13},{"x":1,"y":-14},{"x":-1,"y":-14}];
		this.relativeAccelRadial = [{angle:1,mag:25},{angle:-1,mag:25}];
		this.weaponSlotIndicies = [2,8,2,3];
		this.roomInt = 0.9;
		this.fuel = 16; this.missiles = 8; this.droneParts = 2;
		this.roomPositions = [{"x":0,"y":-13*this.roomInt,"type":"Horizontal","doors":[{pos:3,link:1}]},
								{"x":0,"y":-10*this.roomInt,"type":"Square","doors":[{pos:1,link:0},{pos:4,link:3},{pos:5,link:2}]},
								{"x":-1*this.roomInt,"y":-6*this.roomInt,"type":"Vertical","doors":[{pos:0,link:1},{pos:3,link:4}]},
								{"x":1*this.roomInt,"y":-6*this.roomInt,"type":"Vertical","doors":[{pos:0,link:1},{pos:3,link:5}]},
								{"x":-2*this.roomInt,"y":-2*this.roomInt,"type":"Square","doors":[{pos:1,link:2},{pos:3,link:5},{pos:5,link:6}]},
								{"x":2*this.roomInt,"y":-2*this.roomInt,"type":"Square","doors":[{pos:0,link:3},{pos:4,link:7},{pos:6,link:4}]},
								{"x":-2*this.roomInt,"y":2*this.roomInt,"type":"Square","doors":[{pos:0,link:4},{pos:4,link:10},{pos:7,link:8}]},
								{"x":2*this.roomInt,"y":2*this.roomInt,"type":"Square","doors":[{pos:1,link:5},{pos:2,link:9},{pos:5,link:10}]},
								{"x":-5*this.roomInt,"y":2*this.roomInt,"type":"Vertical","doors":[{pos:1,link:6},{pos:4,link:-1},{pos:5,link:-1}]},
								{"x":5*this.roomInt,"y":2*this.roomInt,"type":"Vertical","doors":[{pos:1,link:-1},{pos:2,link:-1},{pos:5,link:7}]},
								{"x":0,"y":6*this.roomInt,"type":"Square","doors":[{pos:0,link:6},{pos:1,link:7},{pos:3,link:12},{pos:6,link:11}]},
								{"x":-3*this.roomInt,"y":8*this.roomInt,"type":"Vertical","doors":[{pos:1,link:10},{pos:3,link:13}]},
								{"x":3*this.roomInt,"y":8*this.roomInt,"type":"Vertical","doors":[{pos:3,link:14},{pos:5,link:10}]},
								{"x":-3*this.roomInt,"y":12*this.roomInt,"type":"Vertical","doors":[{pos:0,link:11},{pos:1,link:15}]},
								{"x":3*this.roomInt,"y":12*this.roomInt,"type":"Vertical","doors":[{pos:0,link:12},{pos:5,link:15}]},
								{"x":0,"y":12*this.roomInt,"type":"Square","doors":[{pos:2,link:14},{pos:4,link:16},{pos:5,link:16},{pos:7,link:13}]},
								{"x":0,"y":15*this.roomInt,"type":"Horizontal","doors":[{pos:0,link:15},{pos:1,link:15},{pos:3,link:-1},{pos:4,link:-1}]}];
		this.systemRooms = {'P':0,'Dr':1,'||':2,'Sen':3,'+':4,'S':5,'W':10,'O2':13,'E':15};
		this.startingSystems = [{letter:'P',power:1},{letter:'||',power:1},{letter:'Sen',power:1},{letter:'+',power:1},
								{letter:'S',power:2},{letter:'W',power:3},{letter:'E',power:2},{letter:'O2',power:1}];
		this.shipName = "Kestrel";
		this.color= "orange"; 
		this.registerGradient = function(context)
		{
			if(!this.grd){
				this.grd=context.createLinearGradient(0,-15*this.context.shipScale,0,15*this.context.shipScale);
				this.grd.addColorStop(0.1,"gray");
				this.grd.addColorStop(0.2,"orange");
				this.grd.addColorStop(0.3,"gray");
				this.grd.addColorStop(0.7,"gray");
				this.grd.addColorStop(0.8,"orange");
				this.grd.addColorStop(0.9,"gray");}
		};
		this.initialWeaponList=["PhotonMk2","Artemis","None","None"];
	};
	Kestrel.extend(Ship);
	return Kestrel;
});