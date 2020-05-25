//Movian - 2020-05-22

const SMART_MOVE_DISTANCE = 200;
const TARGET_CALLER = "McGreebTanks";

import("https://samktaylor.github.io/sam/common/helpers.js?v=7")
  .then((module) => {
     import("https://samktaylor.github.io/sam/common/party-member.js?v=17");
  });

var attack_mode=true

var TargetLastX=0
var TargetLastY=0

var CharState="Combat"
var PreviousCharState="Idle"

var MerchantX=-288;
var MerchantY=-34;
var MerchantCharName = "Thelandra";

var TargetCaller = "McGreebTanks"

var BattleX=643;
var BattleY=1819;

var HealthSafetyPercentage=70;

var DepositLimit=200000;

var SupershotCoolDown=0;
var CanSuperShot=true;

function on_cm(from, message){

    if(from == TargetCaller){
        TargetCallerCommand(message);
    }
    
}

const TargetCallerCommand = (message) => {

    switch (message.action) {
        case "smart_move":
            smart_move({x: message.x, y: message.y}, Set_Previous_CharState);
            break;
 
        default:
            //unknown message
    }

}

function Set_Previous_CharState(){ CharState = PreviousCharState; }

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

function Get_Party_Target()
{
	var target;
	Tank = get_player(TargetCaller);
	if(Tank)
	{
		var target=get_monster(Tank.target);
	}
    return target;
}

function Stay_Near_Tank(target)
{
	if (is_moving(character)) return;
	if(!is_in_range(target))
	{
		move(target.real_x -22,target.real_y -15);
	}
}

function DoCombat()
{
	
	var Tank=get_player(TargetCaller);
	
	CheckHpMP();
	if(Tank)
	{
		Stay_Near_Tank(Tank);
	}
	
	if(!attack_mode || character.rip || is_moving(character)) return;
	
	var target = get_targeted_monster();
	
	if(!target)
	{ 
		target=Get_Party_Target();
			
		if (target)
		{
			TargetLastX = target.x;
			TargetLastY = target.y;
		}
	}
	
	if(can_attack(target))
	{
		attack(target);
		if (character.mp > 400 && CanSuperShot)
		{
			use_skill("supershot", target);
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
		if (Math.round(character.real_x) == MerchantX && Math.round(character.real_y)== MerchantY)
		{
			Trade();
			CharState="ReturnToBattle";
		}
		else if (Math.round(character.real_x) == 0 && Math.round(character.real_y)== 0)
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
		use_skill("use_town", character);
		CharState="DepositGoods";
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

function UpdateSuperShot()
{
	if(CanSuperShot == false)
	{
		SupershotCoolDown++;
		if(SupershotCoolDown == 121)
		{
			SupershotCoolDown=0;
			CanSuperShot=true;
		}
	}
}

function handle_death() {
  setTimeout(respawn,15000); // respawn current has a 12 second cooldown, best wait 15 seconds before respawning [24/11/16]
  return true;
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
			GoToMerchant();
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
	
	UpdateSuperShot();

},1000/4); // Loops every 1/4 seconds.

