/* REQUIRED CONSTANTS 

const SMART_MOVE_DISTANCE = 200;





*/


const distanceFrom = (x, y) => {
    return Math.abs(Math.sqrt(
        Math.pow(x - character.real_x, 2) + Math.pow(y - character.real_y, 2)
    ));
};

const moveTo = (x, y) => {

    draw_line(x,y,character.x,character.y);

    if(distanceFrom(x,y) > SMART_MOVE_DISTANCE){

        cm_party({action:"smart_move", x: x, y: y});

        PreviousCharState = CharState;
        CharState = "Calculating";
        smart_move({x: x, y: y}, Set_Previous_CharState);
    }else{
        move(x,y);
    }
}

function Set_Previous_CharState(){ CharState = PreviousCharState; }

//Return array containing names of all party members
function getPartyNameArray() {

    var array = [];

    for (name in parent.party) {
        array.push(name);
    }

    return array;
}

//Return array containing names of all other party members
function getOtherPartyNameArray() {

    var array = [];

    for (name in parent.party) {
        if (name != character.name) {
            array.push(name);
        }
    }

    return array;
}

window.send_cm_party = (message) => {

    for (id in parent.party) {
        var current = get_entity(id);
        if (typeof current != "undefined") {
            send_cm(current.name, message);
        }
    }
    
}