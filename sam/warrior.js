var attack_mode = true

var TargetLastX = 0
var TargetLastY = 0

var CharState = "Combat"
var PreviousCharState = "Idle"

var AssistTarget = null

var BattleX = 643;
var BattleY = 1819;

var HealthSafetyPercentage = 60;

var DepositLimit = 200000;

var log = true;

var max_attack = 400;

const SMART_MOVE_DISTANCE = 200;

const CRABS = {
    "x": -1195.2656321693682,
    "y": -156.6394604905829,
    "map": "main"
};

const BANK = {
    "x": 164.42326127218746,
    "y": -137.7273980939667,
    "map": "main"
};

const BANK_INTERNAL = {
    "x": 1.026189346389918,
    "y": -72.89611622120091,
    "map": "bank"
};

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

const cm_party = (message) => {

    for (id in parent.party) {
        var current = get_entity(id);
        if (typeof current != "undefined") {
            send_cm(McGreebHeals, message);
        }
    }
    
}

function RegenSkills() {
    if (!character.rip) {
        if (!is_on_cooldown("regen_mp") && character.mp < character.max_mp - 100) {
            use_skill("regen_mp");
        } else {
            if (!is_on_cooldown("regen_hp") && character.hp < character.max_hp - 100) {
                use_skill("regen_hp");
            }
        }
    }
}


function Get_New_Target() {
    //Check for enemys attacking the group allready

    var highest_xp = null;

    for (id in parent.entities) {
        var current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;

        if (highest_xp != null) {
            if (current.xp > highest_xp.xp) {
                if (current.attack < max_attack) {
                    highest_xp = current;
                }
            }
        } else {
            highest_xp = current;
        }

        if ('target' in current) {
            var us = AllPartyNameArray();
            if (us.includes(current.target)) {
                return current;
            }
        }
    }

    //non found get_nearest_monster
    if (highest_xp != null) {
        return highest_xp;
    } else {
        return get_nearest_monster();
    }

}

function DoCombat() {

    if (!attack_mode || character.rip || is_moving(character)) return;

    var target = get_targeted_monster();

    change_target(target);

    if (!target) {
        target = Get_New_Target();
        if (target) {
            TargetLastX = target.x;
            TargetLastY = target.y;
        }
    }

    if (!target) {
        CharState = "ReturnToBattle";
        return;
    }

    if (!is_in_range(target)) {
        if (!is_on_cooldown("charge")) {
            use_skill("charge");
        }
        moveTo(
            target.x,
            target.y
        );
    } else if (can_attack(target)) {
        if (!is_on_cooldown("taunt")) {
            use_skill("taunt", target);
        }
        attack(target);
    }
}

//Return array containing names of all party members
function AllPartyNameArray() {

    var array = [];

    for (id in parent.party) {
        var current = get_entity(id);
        if (typeof current != "undefined") {
            array.push(current.name);
        }

    }

    return array;
}

//Return array containing names of all other party members
function OtherPartyNameArray() {

    var array = [];

    for (id in parent.party) {
        var current = get_entity(id);
        if (typeof current != "undefined") {
            if (!current.me) {
                array.push(current.name);
            }
        }
    }

    return array;
}

//check the target of all nearby monsters, if they are targeting a party memeber set state to assist and target to that monster
function CheckAgro() {

    var us = OtherPartyNameArray();
    target = null;
    for (id in parent.entities) {
        var current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;

        if ('target' in current) {
            if (us.includes(current.target)) {
                console.log(current.target + " Needs Help!");
                target = current;

                change_target(target);

                setCharState("Assist");
            }

        }
    }
}

//Charge down the monster and taunt it of you can, the go back to combat mode.
function DoAssist() {

    if(target == null){
        setCharState("Combat");
        exit;
    }

    if (!is_on_cooldown("charge")) {
        use_skill("charge");
    }

    moveTo(
        target.x,
        target.y
    );

    if (can_attack(target)) {
        if (!is_on_cooldown("taunt")) {
            use_skill("taunt", target);
        }
        attack(target);

        setCharState("Combat");
    }

}

function setCharState(state) {
    CharState = state;
    set_message(CharState);
}

setInterval(function () {

    CheckAgro();

    send_cm("McGreebHeals", ["arse"]);

    loot();

    switch (CharState) {

        case "Assist":
            DoAssist();
            break;

        case "Combat":
            DoCombat();
            break;

        default:
            setCharState("Combat");
    }

    RegenSkills();

}, 1000 / 4); // Loops every 1/4 seconds.