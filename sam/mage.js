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

setInterval(function () {
    
    Stay_Near_Tank(TARGET_CALLER);
    
}, 1000 / 4); // Loops every 1/4 seconds.

function on_cm(from, message){
    window.cm_processor.processMessage(from, message);
}