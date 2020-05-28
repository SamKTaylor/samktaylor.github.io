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
  let compoundable = {};
  character.items.forEach((item, i) => {
    if (!item) return;

    if (item.q) {
      // Quantity exists, must be consumable.
      consumable[item.name] = item.q;

      if (item.name == "scroll0") upgradeScrollSlot = i;
      if (item.name == "cscroll0") compoundableScrollSlot = i;
    } else {
      // console.log(item);
      // Level exists, must be upgradable / compoundable.

      let def = G.items[item.name];
      if (def.compound) {
        if (!compoundable[item.name]) {
          compoundable[item.name] = [];
          // for (let i = 0; i < 10; i++) {
          //   compoundable[item.name][i] = [];
          // }
        }
        if (!compoundable[item.name][item.level]) {
          compoundable[item.name][item.level] = [];
        }
        compoundable[item.name][item.level].push(i);
      }
      if (def.upgrade) {
        if (!upgradable[item.name]) {
          upgradable[item.name] = [];
          // for (let i = 0; i < 10; i++) {
          //   upgradable[item.name][i] = [];
          // }
        }
        if (!upgradable[item.name][item.level]) {
          upgradable[item.name][item.level] = [];
        }
        upgradable[item.name][item.level].push(i);
      }
    }
  });
  if (consumable["scroll0"] < 50) {
    buy("scroll0", 50 - consumable["scroll0"]);
  }
  if (consumable["cscroll0"] < 50) {
    buy("cscroll0", 50 - consumable["cscroll0"]);
  }

  // console.log("upgradable", JSON.stringify(upgradable));
  // console.log("compoundable", JSON.stringify(compoundable));

  let keys = Object.keys(upgradable);
  keys.forEach((key, i1) => {
    let item = upgradable[key];
    for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
      if (itemIndex >= 4 || item_grade(key) > 0) {
        // DONT AUTO UPGRADE HIGHER LEVEL STUFF
        continue;
      }

      let level = item[itemIndex];

      if (level && level.length >= 1) {
        console.log("Upgrade", "->", key);

        let item0 = level.splice(0, 1);

        upgrade(item0, upgradeScrollSlot);
      }
    }
  });

  keys = Object.keys(compoundable);
  keys.forEach((key, i1) => {
    let item = compoundable[key];
    for (let itemIndex = 0; itemIndex < item.length; itemIndex++) {
      if (itemIndex >= 4 || item_grade(key) > 0) {
        // DONT AUTO COMPOUND HIGHER LEVEL STUFF
        continue;
      }

      let level = item[itemIndex];

      if (level && level.length >= 3) {
        console.log("Compound", "->", key);

        let item0 = level.splice(0, 1);
        let item1 = level.splice(0, 1);
        let item2 = level.splice(0, 1);

        compound(item0, item1, item2, compoundableScrollSlot);
      }
    }
  });

}, 5000);
