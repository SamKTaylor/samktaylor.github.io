/* REQUIRED CONSTANTS 

const SMART_MOVE_DISTANCE = 200;

*/

window.helpers = {}

window.helpers.distanceFrom = (x, y) => {
    return Math.abs(Math.sqrt(
        Math.pow(x - character.real_x, 2) + Math.pow(y - character.real_y, 2)
    ));
};

window.helpers.moveTo = (x, y) => {

    draw_line(x,y,character.x,character.y);

    if(window.helpers.distanceFrom(x,y) > SMART_MOVE_DISTANCE){

        window.helpers.send_cm_party({action:"smart_move", x: x, y: y});
        smart_move({x: x, y: y});

    }else{
        move(x,y);
    }
}

window.helpers.moveWithin = (entity, bounds) => {
    if (window.helpers.distanceFrom(entity) <= (bounds + 20)) return;
    const distance = window.helpers.distanceFrom(entity) - bounds;
    const diffX = character.real_x - entity.real_x;
    const diffY = character.real_y - entity.real_y;
    const angle = Math.atan2(diffY, diffX);
    const newDiffX = Math.cos(angle) * distance;
    const newDiffY = Math.sin(angle) * distance;
  
    move(character.real_x - newDiffX, character.real_y - newDiffY);
  };

//Return array containing names of all party members
window.helpers.getPartyNameArray = () => {

    var array = [];

    for (name in parent.party) {
        array.push(name);
    }

    return array;
}

//Return array containing names of all other party members
window.helpers.getOtherPartyNameArray = () => {

    var array = [];

    for (name in parent.party) {
        if (name != character.name) {
            array.push(name);
        }
    }

    return array;
}

//send a message to everyone in the party
window.helpers.send_cm_party = (message) => {

    for (name in parent.party) {
        if (name != character.name) {
            log("Messaging " + name);
            send_cm(name, message);
        }
    }
    
}