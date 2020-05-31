import { initialize_graph, find_path } from './common/adventure-finder' ;

var sams_node_tree = initialize_graph("main");

console.log(sams_node_tree);

const TEST_LOCATIONS = [
    {"x": 614,"y": 663,"map": "main", name: "mansion enterance"},
    {"x": 108,"y": 793,"map": "main", name: "spawn"},
    {"x": 0,"y": 0,"map": "main", name: "town"},
    {"x": -1195,"y": -156,"map": "main", name: "crabs"},
    {"x": 476,"y": 1927,"map": "main", name: "armadillos"},
    {"x": -850,"y": 1880,"map": "main", name: "huge crabs"},
    {"x": -1499,"y": 585,"map": "main", name: "pier"},
    //{"x": 1381,"y": 160,"map": "main", name: "cave of darkness entrance"},
    {"x": -705,"y": 1147,"map": "main", name: "pets"},
    {"x": -1195,"y": -156,"map": "main", name: "crabs2"},
    {"x": 614,"y": 663,"map": "main", name: "mansion enterance2"},
]


const TEST_LOCATION_1 = {
    "x": 614,
    "y": 663,
    "map": "main"
};

const TOWN = {
    "min_x": -100,
    "max_x": 100,
    "min_y": -100,
    "max_y": 100,
    "map": "main"
};

var state = "CalculateMovement"
var path_checklist = null;
var failures = 0;
var move_failures = 0;
var move_index = 0;

setInterval(function () {
    //set_message(state);

    if (!is_on_cooldown("regen_hp") && character.hp < character.max_hp - 100) {
        use_skill("regen_hp");
    }

    if (is_moving(character)) return;

    switch(state) {
        case "Traverse":
            TRAVERSE("CalculateMovement");
            break;
        case "Town":
            if(character.real_x > TOWN.min_x && character.real_x < TOWN.max_x && character.real_y > TOWN.min_y && character.real_y < TOWN.max_y){
                state = "CalculateMovement";
                //set_message(state);
            }else{
                use_skill("use_town");
            }

            break;

        case "CalculateMovement":
            var test_location = Math.floor(Math.random() * 10);
            set_message(TEST_LOCATIONS[test_location].name);
            CALCULATE_MOVEMENT(TEST_LOCATIONS[test_location].x, TEST_LOCATIONS[test_location].y);
            break;

        default:
          // code block
      } 


}, 1000 / 4); // Loops every 1/4 seconds.

const CALCULATE_MOVEMENT = (x,y) => {

    log("Looking for path");
    var path = get_path(x,y);
    
    if(path.length == 0){
        log("No result found.");
        //no result, try smart move
        console.log(path);
        smart_move(x, y);

    }else if(path.length == 1){
        log("Only one result, just moving there.");
        //1 result, just go there.
        move(path[0].x, path[0].y);

    }else{
        log("Creating checklist.");
        path_checklist = create_path_checklist(path);

        render_path(path_checklist);        
        move_index = 0;
        state = "Traverse"
        //set_message(state);
        failures = 0;
    }
}

const TRAVERSE = (DONE_STATE) => {

    console.log(path_checklist);
    //find next distination in list we have reached desired location
    var i;
    for (i = 0; i < path_checklist.length; i++) {
        if(path_checklist[i].visited == false){
            move_index = i;
            log('Next target ' + path_checklist[move_index].x + ',' + path_checklist[move_index].y + '.');
            break;
        }
    } 

    console.log(path_checklist[move_index]);

    //are we there yet
    if(path_checklist[move_index].x == character.real_x && path_checklist[move_index].y == character.real_y){
        path_checklist[move_index].visited = true;
        move_failures = 0;
        log('Target ' + path_checklist[move_index].x + ',' + path_checklist[move_index].y + ' reached.');

        move_index++;

        if(typeof path_checklist[move_index] === 'undefined'){
            log("End of path.");
            state = DONE_STATE;
            set_message(state);
            move_index = 0;
            return;
        }else{
            log('Next target ' + path_checklist[move_index].x + ',' + path_checklist[move_index].y + '.');
        }
    }else{
        //stoped mid path?
        log("Not there yet. I'm at: " + character.x + "," + character.y);
        move_failures++
    }

    console.log(path_checklist[move_index]);

    if(move_failures > 10){
        //stuck?
        try_unstuck();
        move_failures = 0;
    }else{
        move(path_checklist[move_index].x, path_checklist[move_index].y);
        log("Moving " + move_index);
    }

}

const get_path = (x,y) => {

    var source = sams_node_tree.get(character.x, character.y);
    var target = sams_node_tree.get(x,y);

    return find_path(source, target);
 
}

const get_furthest_entirty = () => {

    var furthest = null;

    for (var id in parent.entities) {

        var current = parent.entities[id];
            
        if (furthest != null) {
            if (distanceFrom(current.x, current.y) > distanceFrom(furthest.x, furthest.y)) {
                furthest = current;
            }
        } else {
            furthest = current;
        }
    }

    return furthest;

}

const create_path_checklist = (path) => {

    var path_checklist = [];

    path.forEach((node) => {
        path_checklist.push({x: node.x, y: node.y, visited: false});
    });

    return path_checklist;
}

const try_unstuck = () => {

    log("Trying unstuck.");
    var jitter_x = character.x + ((Math.floor(Math.random() * 100) + 1) - 50);
    var jitter_y = character.y + ((Math.floor(Math.random() * 100) + 1) - 50);

    draw_line(character.x,character.y,jitter_x,jitter_y, 1, 0xFF0000);

    move(jitter_x, jitter_y);

}

const distanceFrom = (x, y) => {
    return Math.abs(Math.sqrt(
        Math.pow(x - character.real_x, 2) + Math.pow(y - character.real_y, 2)
    ));
};

const render_path = (path) => {
    log("Drawing path checklist.");
    draw_line(character.x, character.y,path[0].x,path[0].y, 1, 0x0033FF);
    var i;
    for (i = 0; i < path.length - 1; i++) {
        draw_line(path[i].x,path[i].y,path[i+1].x,path[i+1].y, 1, 0x0033FF);
    } 
}

/*
function draw_all_quads(node){

    if(node.quads != null){

        node.quads.forEach((quad) => {

            setTimeout(() => draw_all_quads(quad), 100);

            if(quad.is_leaf == true && quad.crossable == true){
                quad.get_neighbors().forEach((neighbor) => {
                    console.log("Drawing line")
                    draw_line(quad.x,quad.y,neighbor.x,neighbor.y, 1, 0x0033FF);
                });
            }
        });

    }else{
        return;
    }
}*/

//draw_all_quads(sams_node_tree);