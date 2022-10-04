 define(['ship/system/Drones','ship/system/Engines','ship/system/Medbay','ship/system/Oxygen','ship/system/Pilot',
		'ship/system/Sensors','ship/system/Shields','ship/system/Weapons','ship/system/Doors'],
		function(){
	 var systems = {};
	for(var i=0;i<arguments.length;i++)
	{
		systems[arguments[i].letter]=arguments[i];
	}
	return systems;
 });