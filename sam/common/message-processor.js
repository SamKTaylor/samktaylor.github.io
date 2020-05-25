function on_cm(from, message){

    if(from == TargetCaller){
		TargetCallerCommand(message);
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