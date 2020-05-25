/* REQUIRED CONSTANTS 

const CHARICTER_LIST = ["McGreebHeals","McGreebMage","MovienHeals","MovianShoots","Movien"];

*/
const CHARICTER_LIST = ["McGreebHeals","McGreebMage","MovienHeals","MovianShoots","Movien"];

window.party.check = () => {

    var party = window.helpers.getOtherPartyNameArray();

    CHARICTER_LIST.forEach(function(name){
        if (!party.includes(name)){
            if(get_player(name) != null){
                send_party_invite(name);
            }
        }
	});
}