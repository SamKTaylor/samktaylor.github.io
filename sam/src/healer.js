const SMART_MOVE_DISTANCE = 200;
const TARGET_CALLER = "McGreebTanks";

const VERSION = 103; 
import("https://samktaylor.github.io/sam/common/helpers.js?v=" + VERSION)
  .then((module) => {
    import("https://samktaylor.github.io/sam/common/party-member.js?v=" + VERSION);
    import("https://samktaylor.github.io/sam/common/respawn.js?v=" + VERSION);
	import("https://samktaylor.github.io/sam/common/message-processor.js?v=" + VERSION);
  });

function Stay_Near_Tank(target)
{
    if (is_moving(character)) return;
    
    if(!is_in_range(target))
    {
        move(target.real_x -30,target.real_y);
    }
}

function Heal_Player(player)
{
    if( (player.max_hp - player.hp) > character.HealAmount)
    {
        if( (player.max_hp - player.hp) > character.HealAmount + 500){
            use_skill('partyheal');
            heal(player);
        }else{
            heal(player);
        }
    }
}


setInterval(function () {

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
	
	Tank = get_player(TARGET_CALLER);
	Stay_Near_Tank(Tank);
	
    for(id in parent.party)
    {
        var current = get_entity(id);
		if(typeof current != "undefined"){
			Heal_Player(current);
		}

    }

	
}, 1000 / 4); // Loops every 1/4 seconds.

function on_cm(from, message){
    window.cm_processor.processMessage(from, message);
}
