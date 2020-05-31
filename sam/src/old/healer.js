//constants
const TARGET_CALLER = "McGreebTanks"

const HEAL_AMOUNT = 160;
const PARTY_HEAL_AMOUNT = 500;


var CharState="Combat"
var PreviousCharState="Idle"


function on_cm(from, message){

    if(from == TargetCaller){
		TargetCallerCommand(message);
    }
    
}


const manageParty = () => {

    party = OtherPartyNameArray();
    if (!party.includes(TargetCaller)){
        leave_party();
        accept_party_request(TargetCaller);
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
	if (is_moving(character)) return;
	
	if(!is_in_range(target))
	{
		move(target.real_x -30,target.real_y);
	}
}

function Heal_Tank(Tank)
{
	if( (Tank.max_hp - Tank.hp) > HealAmount)
	{
		if( (Tank.max_hp - Tank.hp) > HealAmount + PartyHealAmount){
			use_skill('partyheal');
			heal(Tank);
		}else{
			heal(Tank);
		}
		heal(Tank);
		//if(character.mp > 400)
		//{
			//use_skill("partyheal");
		//}
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
		Heal_Tank(Tank);
	}
	
	var target = get_targeted_monster();
	
	if(!target)
	{ 
		target=Get_Party_Target();
		if(character.mp > 400)
		{
			use_skill('curse', target);
		}
	}
		
}

setInterval(function(){
	
	
	if(!character.rip)	
	{
		if(!is_on_cooldown("regen_mp") && character.mp < character.max_mp - 100){
			use_skill("regen_mp");
		}else{
			if(!is_on_cooldown("regen_hp") && character.hp < character.max_hp - 100){
				use_skill("regen_hp");
			}
		}
	}
	
	Tank = get_player(TargetCaller);
	Stay_Near_Tank(Tank)
	
    for(id in parent.party)
    {
        var current = get_entity(id);
		if(typeof current != "undefined"){
			Heal_Tank(current);
		}

    }
    
    manageParty();
	
	loot();
	set_message(CharState);
	switch(CharState){
		case "Combat":
			//DoCombat();
		break;
		case "HealthRegen":
			//DoHeal();
		break;
		default:
		CharState = "Combat";
	}

},1000/4); // Loops every 1/4 seconds.
