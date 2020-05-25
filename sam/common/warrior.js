
window.warrior = {}

window.warrior.announce_my_location = () => {
    window.helpers.send_cm_party({action:"my_location", x: character.x, y: character.x, map: character.map});
};

//check the target of all nearby monsters, if they are targeting a party memeber set state to assist and target to that monster
window.warrior.check_agro() = () => {

    var us = window.helpers.getOtherPartyNameArray();

    target = null;
    for (id in parent.entities) {
        var current = parent.entities[id];
        if (current.type != "monster" || !current.visible || current.dead) continue;

        if ('target' in current) {
            if (us.includes(current.target)) {
                target = current;
                change_target(target);
                character.state = "Assist";
                set_message(character.state);
            }

        }
    }
}