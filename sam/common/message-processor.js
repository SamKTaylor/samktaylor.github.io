/* REQUIRED CONSTANTS 

const TARGET_CALLER = "McGreebTanks";

*/


function on_cm(from, message){

    log("Message Recived.");
    if(from == TARGET_CALLER){
		processMessage(message);
    }
    
}

const processMessage = (message) => {

    switch (message.action) {
        case "smart_move":
            smart_move({x: message.x, y: message.y});
            break;
        case "attack_this":
            //TODO

            break;
        default:
            //unknown message
    }

}