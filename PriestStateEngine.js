var CharState="Combat"
var TargetCaller = "McGreebTanks"

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

function Heal_Tank(Tank)
{
	if( (Tank.max_hp - Tank.hp) > 500)
	{
		if(character.mp > 400)
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

},1000/4); // Loops every 1/4 seconds.
