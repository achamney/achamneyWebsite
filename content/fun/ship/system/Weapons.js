define(['ship/system/system'],function(System){
	var WEAPONWIDTH = 80, WEAPONHEIGHT = 40;
	var Weapons = function(){
		this.sortOrder = 5;
		this.init = function(ship,room,params)
		{
			this['super'].init.call(this,ship,room,params);
			this.weapRects = [];
			
		};
		this.update = function(){
			this.width = WEAPONWIDTH * this.ship.weapons.length+35;
		};
		this.draw = function(context,x,y)
		{
			this.power = 0;
			this.weapRects = [];
			for(var i=0;i<this.ship.weapons.length;i++)
			{
				var weapon = this.ship.weapons[i],
					weapRect = {x:x+20+i*WEAPONWIDTH,  y:y-30,  w:WEAPONWIDTH,  h:WEAPONHEIGHT};
				context.fillStyle = "#444";
				if(this.ship.attackIcon == weapon) context.fillStyle = "#884";
				else if(weapon.target) context.fillStyle = "#AA4";
				else if(weapon.powered) context.fillStyle = "#484";
				context.strokeStyle = "#999";
				context.fillRect(weapRect.x,weapRect.y,weapRect.w,weapRect.h);
				context.strokeRect(weapRect.x,weapRect.y,weapRect.w,weapRect.h);
				
				if(weapon.text.length>0){
					context.fillStyle = "#FFF";
					context.font = "12px Arial";
					drawTextInRect(weapon.text,{x:weapRect.x-18,y:weapRect.y-5,w:weapRect.w,h:weapRect.h},context);
					
					
					if(weapon.reloadTime<=0)context.fillStyle="red";
					if(weapon.reloadTime>0)context.fillStyle="#444";
					context.fillRect(x+31+i*WEAPONWIDTH,y,(weapon.reloadTimeMax-weapon.reloadTime)/5,5);
				}
				
				this.power += weapon.getPower();
				this.weapRects.push(weapRect);
			}
			this['super'].draw.call(this,context,x,y);
		};
		this.click = function(x,y,button)
		{
			for(var i=0;i<this.weapRects.length;i++)
			{
				if(isInside({x:x,y:y},this.weapRects[i]))
				{
					var weapon = this.ship.weapons[i];
					if(weapon.powered)
					{
						this.ship.attackIcon = weapon;
					}
					if(button == 0 && this.ship.power >= weapon.power)
						weapon.powered = true;
					else if(button == 2)
						weapon.powered = false;
				}
			}
		};
	};
	Weapons.extend(System);
	Weapons.letter = 'W';
	return Weapons;
});