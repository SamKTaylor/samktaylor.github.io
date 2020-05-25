const SMART_MOVE_DISTANCE = 200;
const TARGET_CALLER = "McGreebTanks";

import("https://samktaylor.github.io/sam/common/helpers.js?v=7")
  .then((module) => {
     import("https://samktaylor.github.io/sam/common/party-member.js?v=17");
  });

var CharState="Combat"
var TargetCaller = "McGreebTanks"
var CurseCooldown = 0
var CanCurse=true;

var PartyHealPercentage=70

var PreviousCharState="Combat"

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


function Get_Party_Target()
{
	Tank = get_player(TargetCaller);
	var target=get_monster(Tank.target);
    return target;
}

function Stay_Near_Tank(target)
{
	if(!is_in_range(target))
	{
		move(target.real_x -30,target.real_y);
	}
}

function Heal_Party()
{
	var HealFlag=0;
	for(id in parent.party)
	{
		var current = get_entity(id);
		var PartyMember = get_player(current.name);
		
		if ((PartyMember.hp / PartyMember.max_hp)*100 > 500 || (PartyMember.hp / PartyMember.max_hp) * 100 <= 30)
		{
			HealFlag++;
		}
    }
	
	if(HealFlag >= 2)
	{
		if(character.mp >= 400)
		{
			use_skill("partyheal");
		}
	}
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

function DoCombat()
{
	var Tank=get_player(TargetCaller);
	
	CheckHpMP();
	if(Tank)
	{
		Stay_Near_Tank(Tank);
	}
	
	Heal_Party();
	
	var target = get_targeted_monster();
	
	if(!target)
	{ 
		target=Get_Party_Target();
	}
	if(target)
	{
		if(character.mp > 850 && CanCurse)
		{
			use_skill('curse', target);
			CanCurse=false;
		}
	}
}

function UpdateCurse()
{
	if(CanCurse == false)
	{
		CurseCooldown++;
		if(CurseCooldown == 21)
		{
			CurseCooldown=0;
			CanCurse=true;
		}
	}
}
var CharState="Combat"
var TargetCaller = "McGreebTanks"
var CurseCooldown = 0
var CanCurse=true;

var PartyHealPercentage=70

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
		move(target.real_x -30,target.real_y);
	}
}

function target_hp_percent(target)
{
	var percent = (target.hp / target.max_hp) * 100
	if (target.name == "McGreebTanks")
	{
		percent = percent -10;
	}
	return percent
}

function Heal_Party()
{
	var HealFlag=0;
	var lowestHealth;
	
	for(id in parent.party)
	{
		var current = get_entity(id);
		var PartyMember = get_player(current.name);
		if(!lowestHealth)
		{
			lowestHealth = PartyMember;
		}else{
			if (target_hp_percent(PartyMember) < target_hp_percent(lowestHealth))
			{
				lowestHealth = PartyMember;
			}
		}
		if ((PartyMember.hp / PartyMember.max_hp)*100 < PartyHealPercentage)
		{
			HealFlag++;
		}
    }
	
	
	if(HealFlag >= 2)
	{
		if(character.mp >= 400)
		{
			use_skill("partyheal");
		}
	}
	
	if (lowestHealth.max_hp - lowestHealth.hp > 270)
	{
		heal(lowestHealth);
	}
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

function DoCombat()
{
	var Tank=get_player(TargetCaller);
	
	CheckHpMP();
	if(Tank)
	{
		Stay_Near_Tank(Tank);
	}
	
	Heal_Party();
	
	var target = get_targeted_monster();
	
	if(!target)
	{ 
		target=Get_Party_Target();
	}
	if(target)
	{
		if(character.mp > 850 && CanCurse)
		{
			use_skill('curse', target);
			CanCurse=false;
		}
	}
}

function UpdateCurse()
{
	if(CanCurse == false)
	{
		CurseCooldown++;
		if(CurseCooldown == 21)
		{
			CurseCooldown=0;
			CanCurse=true;
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
		default:
		CharState = "Combat";
	}
	UpdateCurse();

},1000/4); // Loops every 1/4 seconds.

