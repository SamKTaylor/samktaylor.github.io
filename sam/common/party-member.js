/* REQUIRED CONSTANTS 

const TARGET_CALLER = McGreebTanks;

*/

const manageParty = () => {

    party = window.helpers.getOtherPartyNameArray();
    if (!party.includes(TARGET_CALLER)){
        leave_party();
        accept_party_request(TARGET_CALLER);
    }
	
}
