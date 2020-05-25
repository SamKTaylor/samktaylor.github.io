/* REQUIRED CONSTANTS 

const TARGET_CALLER = "McGreebTanks";

*/

log("Loading Party Member Script");

setInterval(function () {

    log("Doing Party Check");

    party = window.helpers.getOtherPartyNameArray();
    if (!party.includes(TARGET_CALLER)){
        log(TARGET_CALLER + " Not here");
        leave_party();
        accept_party_request(TARGET_CALLER);
    }
	
}, 30000); // Loops every 30 seconds.
