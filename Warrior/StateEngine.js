var attack_mode=true

var TargetLastX=0
var TargetLastY=0

var CharState="Combat"
var PreviousCharState="Idle"

var AssistTarget = null

var MerchantX=-288;
var MerchantY=-34;
var MerchantCharName = "Thelandra";

var BattleX=643;
var BattleY=1819;

var HealthSafetyPercentage=60;

var DepositLimit=200000;

var log = true;

function RegenSkills(){
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
    return get_nearest_monster();
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
			CharState = "TeleportToTown";
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
        if(!is_on_cooldown("charge")){
            use_skill("charge");
        }
		move(
			target.x,
			target.y
			);
	} else if(can_attack(target)) {
        if(!is_on_cooldown("taunt")){
            //use_skill("taunt", target);
        }
        attack(target);
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


function TeleportToTown()
{
	if (!character.moving)
	{
		use_skill("use_town", character);
		CharState="DepositGoods";
	}
}

function partyNameArray(){

    var array = [];

    for(id in parent.party)
    {
        var current = get_entity(id);
		if(!current.me){
            array.push(character.name);
        }
    }

    return array;
}


function CheckAgro(){

    target = null;
	for(id in parent.entities)
    {
        var current=parent.entities[id];
        if(current.type!="monster" || !current.visible || current.dead) continue;

        if(current.hasOwnProperty("target")){
            var is_us = false;

            var us = partyNameArray();

            for(var i=0; i<us.length; i++){
                if(current.target = us[i]){
                    target = current;
                    CharState = "Assist";
                }
            }
        }
    }
    return target;

}

function DoAssist(){
	
	
	if(!is_on_cooldown("charge")){
		use_skill("charge");
	}
	move(
		target.x,
		target.y
	);

    if(can_attack(target)) {
        if(!is_on_cooldown("taunt")){
            use_skill("taunt", target);
        }
        attack(target);
        CharState = "Combat";
    }
    CharState = "Combat";
}

setInterval(function(){
	
	CheckAgro();
	
    loot();
    RegenSkills();
	set_message(CharState);
	switch(CharState){
		case "Assist":
			DoAssist();
		break;
		case "Combat":
			DoCombat();
		break;
		case "HealthRegen":
			DoHeal();
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
	
	RegenSkills();

},1000/4); // Loops every 1/4 seconds.

