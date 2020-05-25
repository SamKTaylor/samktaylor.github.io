/* REQUIRED CONSTANTS 

const CHARICTER_LIST = ["McGreebHeals","McGreebMage","MovienHeals","MovianShoots","Movien"];

*/
const PARTY_INTERVAL = 30 * 100;
const CHARICTER_LIST = ["McGreebHeals","McGreebMage","MovienHeals","MovianShoots","Movien"];

setInterval(function () {
    
    log("Doing Party Check");

    var party = window.helpers.getOtherPartyNameArray();

    CHARICTER_LIST.forEach(function(name){
        if (!party.includes(name)){
            if(get_player(name) != null){
                log("Sending Invite to: " + name);
                send_party_invite(name);
            }
        }
    });
    
}, PARTY_INTERVAL);