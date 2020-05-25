/* REQUIRED CONSTANTS 

const TARGET_CALLER = "McGreebTanks";

*/

const PARTY_INTERVAL = 30 * 100;
log("Loading Party Member Script");

setInterval(function () {

    log("Doing Party Check");

    if(Object.keys(parent.party).length > 0){
        log("In A party!");

        var party = window.helpers.getOtherPartyNameArray();
        if (!party.includes(TARGET_CALLER)){
            log(TARGET_CALLER + " Not here, leaving");
            leave_party();
        }
    }else{
        log("Not in a party, trying to accept request");
    
        accept_party_invite(TARGET_CALLER);
    }
	
}, PARTY_INTERVAL);
