// Hey there!
// This is CODE, lets you control your character with code.
// If you don't know how to code, don't worry, It's easy.
// Just set attack_mode to true and ENGAGE!

//var attack_mode = false



function on_party_request(name) {
  console.log("on_party_request", name);
  if (
    name.startsWith("Knossos") ||
    name.startsWith("McGreeb") ||
    name.startsWith("Movian") ||
    name.startsWith("Movien")
  ) {
    accept_party_request(name);
  }
}

function on_party_invite(name) {
  console.log("on_party_invite", name);
  if (
    name.startsWith("Knossos") ||
    name.startsWith("McGreeb") ||
    name.startsWith("Movian") ||
    name.startsWith("Movien")
  ) {
    accept_party_invite(name);
  }
}

setInterval(function() {
  let items = {};
  character.items.forEach((item, i) => {
    if (!item) return;
    items[item.name] = item.q || 1;
  });
  if(items["scroll0"] < 50) {
    buy("scroll0", 50 - items["scroll0"]);
  }
  if(items["cscroll0"] < 50) {
    buy("cscroll0", 50 - items["cscroll0"]);
  }

  /*use_hp_or_mp();
  loot();

  if (!attack_mode || character.rip || is_moving(character)) return;

  var target = get_targeted_monster();
  if (!target) {
    target = get_nearest_monster({
      min_xp: 100,
      max_att: 120
    });
    if (target) change_target(target);
    else {
      set_message("No Monsters");
      return;
    }
  }

  if (!is_in_range(target)) {
    move(
      character.x + (target.x - character.x) / 2,
      character.y + (target.y - character.y) / 2
    );
    // Walk half the distance
  } else if (can_attack(target)) {
    set_message("Attacking");
    attack(target);
  }*/

}, 1000 / 4); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
