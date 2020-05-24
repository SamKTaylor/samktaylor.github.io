window.send_cm_party = (message) => {

    for (id in parent.party) {
        var current = get_entity(id);
        if (typeof current != "undefined") {
            send_cm(current.name, message);
        }
    }
    
}