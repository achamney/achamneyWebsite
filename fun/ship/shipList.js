 define(['ship/Kestrel','ship/Torus','ship/Osprey','ship/Adjudicator','ship/GilaMonster','ship/Nesasio','ship/ManOfWar','ship/Bulwark'],
		function(){
	 var ships = [];
	for(var i=0;i<arguments.length;i++)
	{
		ships.push(arguments[i]);
	}
	return ships;
 });