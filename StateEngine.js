//Movian - 2020-05-22

var attack_mode=true

var TargetLastX=0
var TargetLastY=0

var CharState="Combat"
var PreviousCharState="Idle"

var MerchantX=-288;
var MerchantY=-34;
var MerchantCharName = "Thelandra";

var BattleX=643;
var BattleY=1819;

var HealthSafetyPercentage=70;

var DepositLimit=51000;

function Kite(target)
{
	var newX = target.x - TargetLastX;
	var newY = target.y - TargetLastY;
	
	move(character.x+newX,character.y+newY);
	
	TargetLastX = target.x;
	TargetLastY = target.y;
}

function CheckHpMP()
{
	if(!character.rip)	
	{
		if(character.max_hp - character.hp > 150 || character.max_mp - character.mp > 150)
		{
			use_hp_or_mp();
		}
	}
}

function Get_New_Target()
{
	target = null;
	for(id in parent.entities)
    {
        var current=parent.entities[id];
        if(current.type!="monster" || !current.visible || current.dead) continue;       
		if(current.max_hp > 10000) continue;
		var c_dist=parent.distance(character,current);
        if(c_dist > 200) continue;
        target=current;
    }
    return target;
}

function DoCombat()
{
	
	CheckHpMP();
	
	
	if(!attack_mode || character.rip || is_moving(character)) return;
	
	var target=get_targeted_monster();
	
	if(!target)
	{ //no current target, lets check if we should heal or go back to town
		if (character.gold > DepositLimit)
		{
			CharState = "DepositGoods";
			return;
		}else if((character.hp / character.max_hp) * 100 < HealthSafetyPercentage)
		{
			CharState = "HealthRegen";
			return;
		}
		// no need to deposit or heal, so lets get a new target.
		target = Get_New_Target();
		if (target)
		{
			TargetLastX = target.x;
			TargetLastY = target.y;
		}
	}
	
	if(!target)
	{
		CharState="ReturnToBattle";
		return;
	}
	
	if(!is_in_range(target))
	{
		move(
			character.x+(target.x-character.x)/2,
			character.y+(target.y-character.y)/2
			);
	}
	else if(can_attack(target))
	{
		Kite(target);
		if (character.mp > 20)
		{
			attack(target);
		}
		if(target.hp > (character.mp * 0.555))
		{
			if(character.mp > 800)
			{
				use_skill("burst", target);
			}
		}
		
	}
}

function DoHeal()
{
	if ((character.hp / character.max_hp) * 100 > HealthSafetyPercentage)
	{
		CharState = "Combat";
	}else{
		CheckHpMP();
	}
}

function Trade()
{
	if (character.gold > 50000)
	{
		send_gold(MerchantCharName, character.gold - 50000)
	}

	for(slot=0; slot<42; slot++)
	{
		var item = character.items[slot];
		if (!item) continue;
		send_item(MerchantCharName,slot,item.q);
	}
}

function Set_Previous_CharState()
{
	CharState = PreviousCharState;
}

function GoToMerchant()
{
	if (!character.moving)
	{
		if (Math.round(character.real_x) == MerchantX && Math.round(character.real_y)== MerchantY){
		{
			Trade();
			CharState="ReturnToBattle";
		}
		else if (Math.round(character.real_x) == 0 && Math.round(character.real_y)== 0){
		{ 
			PreviousCharState = CharState;
			CharState = "Calculating";
			smart_move({x: MerchantX, y: MerchantY}, Set_Previous_CharState);
		}
	}
}

function TeleportToTown()
{
	if (!character.moving)
	{
		if (Math.round(character.real_x) == 0 && Math.round(character.real_y) 			== 0){
			use_skill("use_town", character);
			CharState="GoToMerchant()";
		}
			
	}
}

function GoToBattle()
{
	if (!character.moving)
	{
		if (Math.round(character.real_x) == BattleX && Math.round(character.real_y) == BattleY)
		{
			CharState="Combat";
		}
		else
		{
			PreviousCharState = CharState;
			CharState = "Calculating";
			smart_move({x: BattleX, y: BattleY}, Set_Previous_CharState);
		}
	}
}

setInterval(function(){
	loot();
	set_message(CharState);
	switch(CharState){
		case "Combat":
			DoCombat();
		break;
		case "HealthRegen":
			DoHeal();
		break;
		case "DepositGoods":
			GoToTown();
		break;
		case "ReturnToBattle":
			GoToBattle();
		break;
		case "Calculating":
			CheckHpMP();
		break;
		case "TeleportToTown":
			TeleportToTown();
			break;
		default:
		CharState = "Combat";
	}

},1000/4); // Loops every 1/4 seconds.

