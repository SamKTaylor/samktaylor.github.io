const LOGGING = true;

const l = (s) => {
  console.log("LOG", s);
  if (LOGGING) {
    log(s);
  }
};

function on_party_request(name) {
  l("Party request from " + name);
  if (
    name.startsWith("Knossos") ||
    name.startsWith("McGreeb") ||
    name.startsWith("Movian") ||
    name.startsWith("Movien")
  ) {
    l("Accept request from " + name);
    accept_party_invite(name);
    setTimeout(() => accept_party_invite(name), 1000);
    setTimeout(() => accept_party_invite(name), 2000);
  }
}

function on_party_invite(name) {
  l("Party invite from " + name);
  if (
    name.startsWith("Knossos") ||
    name.startsWith("McGreeb") ||
    name.startsWith("Movian") ||
    name.startsWith("Movien")
  ) {
    l("Accept invite from " + name);
    accept_party_request(name);
    setTimeout(() => accept_party_request(name), 1000);
    setTimeout(() => accept_party_request(name), 2000);
  }
}

setInterval(function() {
  let upgradeScrollSlot = -1;
  let compoundableScrollSlot = -1;
  let consumable = {};
  let upgradable = {};
  character.items.forEach((item, i) => {
    if (!item) return;

    if (item.q) {
      // Quantity exists, must be consumable.
      consumable[item.name] = item.q;

      if (item.name == "scroll0") upgradeScrollSlot = i;
      if (item.name == "cscroll0") compoundableScrollSlot = i;
    } else {
      // console.log(item);
      // Level exists, must be upgradable.
      if (!upgradable[item.name]) {
        upgradable[item.name] = [];
      }
      if (!upgradable[item.name][item.level]) {
        upgradable[item.name][item.level] = [];
      }
      upgradable[item.name][item.level].push(i);
    }
  });
  if (consumable["scroll0"] < 50) {
    buy("scroll0", 50 - consumable["scroll0"]);
  }
  if (consumable["cscroll0"] < 50) {
    buy("cscroll0", 50 - consumable["cscroll0"]);
  }

  // console.log("upgradable", JSON.stringify(upgradable));

  let keys = Object.keys(upgradable);
  keys.forEach((key, i1) => {
    let item = upgradable[key];
    for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
      if(itemIndex > 4) {
        // DONT AUTO UPGRADE HIGHER LEVEL STUFF
        return;
      }

      let level = item[itemIndex];

      if (level && level.length >= 3) {
        // console.log("Compound", "->", key);

        let item0 = level.splice(0, 1);
        let item1 = level.splice(0, 1);
        let item2 = level.splice(0, 1);

        compound(item0, item1, item2, compoundableScrollSlot);
      } else if (level && level.length == 1) {
        // console.log("Upgrade", "->", key);

        let item0 = level.splice(0, 1);

        upgrade(item0, upgradeScrollSlot);
      }
    }

    // console.log("item", key, item);
    // item.forEach((levelKey, i2) => {
    //   let level = item[i2];
    //   console.log("level", levelKey, level);
    //   level.forEach((slotKey, i3) => {
    //     let slot = level[i3];
    //     console.log("slot", slotKey, slot);
    //   });
    // });
  });


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

  // if(Object.keys(parent.party).length == 0) {
  //     log("Not in a party, trying to accept request");
  //     accept_party_invite("KnossosTanks");
  // }

}, 5000); // Loops every 1/4 seconds.

// Learn Javascript: https://www.codecademy.com/learn/introduction-to-javascript
// Write your own CODE: https://github.com/kaansoral/adventureland
// NOTE: If the tab isn't focused, browsers slow down the game
// NOTE: Use the performance_trick() function as a workaround
