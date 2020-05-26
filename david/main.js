const LOOP_SPEED = 300;
const LOGGING = false;

let AUTO_DEPOSIT = true;
const DEPOSIT_THRESHOLD = 40000;
const DEPOSIT_KEEP = 5000;
const DEPOSIT_CHARACTER = "KnossosSells";
let merchant = {};

const HP_REGEN_AMOUNT = 50;
const MP_REGEN_AMOUNT = 100;
const HP_POTION_AMOUNT = 200;
const MP_POTION_AMOUNT = 300;

const FOLLOW_DISTANCE = 100;
const CLOSE_FOLLOW_DISTANCE = 10;

let ATTACKING = true;
let PRIEST_ATTACKING = true;

let HP_THRESHOLD = 0;
let MP_THRESHOLD = 0;
let HP_REGEN_THRESHOLD = 0;
let MP_REGEN_THRESHOLD = 0;

let HEAL_THRESHOLD = 0.95;
let PARTY_HEAL_THRESHOLD = 0.5;

const CRABS = {
  "x": -1195.2656321693682,
  "y": -156.6394604905829,
  "map": "main"
};
const BANK = {
  "x": 164.42326127218746,
  "y": -137.7273980939667,
  "map": "main"
};
const BANK_INTERNAL = {
  "x": 1.026189346389918,
  "y": -72.89611622120091,
  "map": "bank"
};
let LAST_LOCATION = CRABS;

const COOLDOWNS = {
  "invis": 12100,
  "charge": 40100,
  "heal": 200,
  "partyheal": 10000,
  "revive": 200,
  "quickpunch": 2600,
  "curse": 5100,
  "darkblessing": 60100,
  "regen_hp": 3000,
  "regen_mp": 3000
}

let targetLastX = 0;
let targetLastY = 0;

let state = "NONE";
let ATTACK_MTYPE = "crab";
let CALLER = false;

let cooldownMap = {};

const l = (s) => {
  console.log("LOG", s);
  if (LOGGING) {
    log(s);
  }
};

function on_party_request(name) {
  if (
    name.startsWith("Knossos") ||
    name.startsWith("McGreeb") ||
    name.startsWith("Movian") ||
    name.startsWith("Movien")
  ) {
    accept_party_invite(name);
  }
}

function on_party_invite(name) {
  if (
    name.startsWith("Knossos") ||
    name.startsWith("McGreeb") ||
    name.startsWith("Movian") ||
    name.startsWith("Movien")
  ) {
    accept_party_request(name);
  }
}

const isDead = () => {
  if (character.rip) {
    state = "DEAD";
  }
  return character.rip;
};

const updateStatistics = () => {
  HP_THRESHOLD = Math.max(character.max_hp - HP_POTION_AMOUNT * 2, character.max_hp * 0.5);
  MP_THRESHOLD = Math.max(character.max_mp - MP_POTION_AMOUNT * 2, character.max_mp * 0.5);
  HP_REGEN_THRESHOLD = Math.max(character.max_hp - HP_REGEN_AMOUNT, character.max_hp * 0.8);
  MP_REGEN_THRESHOLD = Math.max(character.max_mp - MP_REGEN_AMOUNT, character.max_mp * 0.8);
};

const isMerchant = () => {
  return character.ctype == "merchant";
}
const isRogue = () => {
  return character.ctype == "rogue";
}
const isWarrior = () => {
  return character.ctype == "warrior";
}
const isPriest = () => {
  return character.ctype == "priest";
}

const isMpHigher = (factor) => {
  return (character.mp / character.max_mp > factor);
}

const healing = () => {
  if (isDead()) return;

  // console.log(is_on_cooldown("use_hp"), is_on_cooldown("use_mp"));
  // console.log(character.hp, HP_THRESHOLD);
  // console.log(character.mp, MP_THRESHOLD);

  if (!is_on_cooldown("use_hp") && character.hp < HP_THRESHOLD) {
    l("Drink healing potion");
    use_skill("use_hp");
    setCooldown("use_hp");
  } else if (isPriest() && !is_on_cooldown("use_mp") && character.mp < MP_THRESHOLD) {
    l("Drink mana potion");
    use_skill("use_mp");
    setCooldown("use_mp");
  } else if (canUse("regen_hp") && character.hp < HP_REGEN_THRESHOLD) {
    l("Regenerate health");
    use_skill("regen_hp");
    setCooldown("regen_hp");
  } else if (canUse("regen_mp") && character.mp < MP_REGEN_THRESHOLD) {
    l("Regenerate mana");
    use_skill("regen_mp");
    setCooldown("regen_mp");
  }
};

const checkShouldDepositGold = () => {
  if (state.startsWith("TOWN")) return;

  merchant = get_player(DEPOSIT_CHARACTER);
  if (!isMerchant() && merchant && distanceFrom(merchant) < 500) {
    if (character.gold > DEPOSIT_KEEP * 2) {
      send_gold(DEPOSIT_CHARACTER, character.gold - DEPOSIT_KEEP);
    }

    character.items.forEach((item, i) => {
      if (!item || item.name.startsWith("hpot") || item.name.startsWith("mpot")) return;
      console.log(i, item);
      send_item(DEPOSIT_CHARACTER, i, item.q || 1);
    });
  }

  if (!AUTO_DEPOSIT) return;

  if (character.gold > DEPOSIT_THRESHOLD) {
    set_message("Depositing");
    if (!state.startsWith("TOWN")) {
      goHome();
    }
    return;
  }
};

const goHome = () => {
  state = "TOWN_NEXT";
  use_skill("use_town", character);
};

const canUse = (skill, standardCooldownTime) => {
  if (!isRogue() && (
      skill == "invis" ||
      skill == "quickpunch"
    ) ||
    !isWarrior() && (
      skill == "charge" ||
      skill == "taunt"
    ) ||
    !isPriest() && (
      skill == "heal" ||
      skill == "curse" ||
      skill == "partyheal" ||
      skill == "revive"
    )) return false;
  let timeNow = (new Date()).getTime();

  if (!is_on_cooldown(skill) && can_use(skill) && timeNow > (cooldownMap[skill] || 0)) {
    return true;
  }

  return false;
};

const setCooldown = (skill, standardCooldownTime) => {
  let timeNow = (new Date()).getTime();
  cooldownMap[skill] = timeNow + (standardCooldownTime || COOLDOWNS[skill]);
}

const distanceFrom = (location) => {
  location.x = location.x || location.real_x;
  location.y = location.y || location.real_y;
  return Math.abs(Math.sqrt(
    Math.pow(location.x - character.real_x, 2) + Math.pow(location.y - character.real_y, 2)
  ));
};

let CACHED_MEMBERS = [];
const getPartyMembers = () => {
  return new Promise((resolve, reject) => {
    let members = CACHED_MEMBERS;
    if (members.length != 0) {
      resolve(members);
      return;
    }
    parent.party_list.forEach((item, i) => {
      const entity = get_entity(item);
      if (entity) {
        members.push(entity);
      }
    });
    resolve(members);
  });
};

const getPartyMembersArray = () => {
  let members = CACHED_MEMBERS;
  if (members.length != 0) {
    resolve(members);
    return;
  }
  parent.party_list.forEach((item, i) => {
    const entity = get_entity(item);
    if (entity) {
      members.push(entity);
    }
  });
  return members;
};

const membersNotMe = (members) => {
  return new Promise((resolve, reject) => {
    resolve(members.filter(member => !member.me));
  });
};

const isAMemberBelow = (members, factor) => {
  return new Promise((resolve, reject) => {
    let isDanger = false;
    members.forEach((item, i) => {
      if(item && (item.hp / item.max_hp) < factor) {
        isDanger = true;
      }
    });

    resolve(isDanger);
  });
};

const findHealingTarget = async () => {
  // console.log("----------------------------------------");
  let partyMembers = await getPartyMembers()
    .then(members => sortByLowestHealth(members));

  partyMembers.forEach((item, i) => {
    if (!item) return;

    // console.log(i + ". " + item.id + " " + (item.hp / item.max_hp));

    if (!item.rip && item.hp < (item.max_hp * PARTY_HEAL_THRESHOLD)) {
      if (canUse("partyheal")) {
        l("Danger! Heal party!");
        use_skill("partyheal");
        setCooldown("partyheal");
      }
    }

    if (can_heal(item) && !item.rip && item.hp < (item.max_hp * HEAL_THRESHOLD)) {
      l("Heal party member " + item.id);
      heal(item);
      setCooldown("heal");
    }

    if (item.rip) {
      if (canUse("revive")) {
        l("Member dead. Revive!");
        use("revive", item);
        setCooldown("revive");
      }
    }

  });
};

let CACHED_MONSTERS = [];
const getMonsters = () => {
  return new Promise((resolve, reject) => {
    let entities = CACHED_MONSTERS;
    if (entities.length != 0) {
      resolve(entities);
      return;
    }
    Object.keys(parent.entities).forEach((item, i) => {
      entities.push(parent.entities[item]);
    });
    resolve(
      entities.filter(entity => entity.type == "monster" && entity.mtype != "target" && !entity.dead && entity.visible)
    )
  });
};

const filterByType = (monsters, mtype) => {
  return new Promise((resolve, reject) => {
    resolve(
      monsters.filter(entity => entity.mtype == (mtype || ATTACK_MTYPE))
    )
  });
};

const filterByMaxAttack = (monsters, maxAttack) => {
  return new Promise((resolve, reject) => {
    resolve(
      monsters.filter(entity => entity.attack < (maxAttack || 99999999))
    )
  });
};

const filterByTargetting = (monsters, names) => {
  return new Promise((resolve, reject) => {
    resolve(
      monsters.filter(entity => !entity.dead && entity.visible && names.includes(entity.target))
    )
  });
};

const sortMonstersByDanger = (monsters) => {
  return new Promise((resolve, reject) => {
    resolve(
      monsters.sort((a, b) => {
        return b.attack - a.attack
      })
    )
  });
};

const sortByLowestHealth = (entities) => {
  return new Promise((resolve, reject) => {
    resolve(entities.sort((a, b) => {
      return ((a.hp / a.max_hp) * 100) - ((b.hp / b.max_hp) * 100)
    }))
  });
};

const sortMonsters = (monsters) => {
  return new Promise((resolve, reject) => {
    resolve(
      monsters.sort((a, b) => {
        return (distanceFrom(a)) - (distanceFrom(b))
      })
    )
  });
};

const first = (items) => {
  return new Promise((resolve, reject) => {
    if (!items || items.length == 0) {
      resolve(false);
    } else {
      resolve(items[0]);
    }
  });
};

const random = (items) => {
  return new Promise((resolve, reject) => {
    if (!items || items.length == 0) {
      resolve(false);
    } else {
      resolve(items[Math.floor(Math.random() * items.length)]);
    }
  });
};

parent.combatStart = () => {
  l("Starting combat");
  localStorage.setItem("ATTACKING", 1);
};

parent.combatStop = () => {
  l("Stopping combat");
  localStorage.setItem("ATTACKING", 0);
};

parent.combatFocus = (type) => {
  l("Attack focus: " + type);
  localStorage.setItem("ATTACK_MTYPE", type);
};

parent.combatCaller = (caller) => {
  l("Target caller: " + caller);
  localStorage.setItem("CALLER", caller);
};

parent.combatPriest = (enabled) => {
  l("Priest attacking: " + enabled);
  localStorage.setItem("PRIEST_ATTACKING", enabled);
};

parent.autoDeposit = (enabled) => {
  l("Auto deposit: " + enabled);
  localStorage.setItem("AUTO_DEPOSIT", enabled);
};

const moveWithin = (entity, bounds) => {
  if (distanceFrom(entity) <= (bounds + 20)) return;
  const distance = distanceFrom(entity) - bounds;
  const diffX = character.real_x - entity.real_x;
  const diffY = character.real_y - entity.real_y;
  const angle = Math.atan2(diffY, diffX);
  const newDiffX = Math.cos(angle) * distance;
  const newDiffY = Math.sin(angle) * distance;

  move(character.real_x - newDiffX, character.real_y - newDiffY);
};




const combat = async () => {
  set_message("Combat");

  if (character.rip || is_moving(character)) return;

  let callerTarget = localStorage.getItem("CALLER_TARGET") || false;
  let caller = get_player(CALLER);

  let target = get_targeted_monster();

  if (caller && !caller.me) {
    if (isPriest() || !ATTACKING) {
      moveWithin(caller, ATTACKING ? FOLLOW_DISTANCE : CLOSE_FOLLOW_DISTANCE);
    }

    target = get_monster(caller.target);
    if (target && target != get_targeted_monster()) {
      l("Target from caller (" + CALLER + "): " + target.mtype + "(" + target.id + ") " + parseInt(distanceFrom(target)) + "px");
    }
  }

  if (!target) {
    if (caller && !caller.me) {
      if (callerTarget && !callerTarget.dead) {
        target = callerTarget;
      }
    } else {
      target = await getMonsters()
        .then(monsters => ATTACK_MTYPE == false ? monsters : filterByType(monsters, ATTACK_MTYPE))
        .then(monsters => filterByMaxAttack(monsters, 200))
        .then(monsters => sortMonsters(monsters))
        .then(monsters => first(monsters));
      //target = get_nearest_monster();
    }


    if (target) {
      l("Targetting " + target.mtype + "(" + target.id + ") " + parseInt(distanceFrom(target)) + "px");
      targetLastX = target.x;
      targetLastY = target.y;
    }
  }

  if (character.rip || is_moving(character)) return;

  if (isPriest()) {
    findHealingTarget();

    let inDanger = await getPartyMembers()
      .then(members => isAMemberBelow(members, 0.7));
    if(inDanger) return;
  }

  if (!target) {
    return;
  }

  change_target(target, true);
  localStorage.setItem("TARGET", target);

  if (!ATTACKING || (isPriest() && !PRIEST_ATTACKING)) return;

  if (canUse("invis")) {
    l("Go invisible for attack.");
    use_skill("invis");
    setCooldown("invis");
  }

  if (isWarrior()) {
    let partyMembers = await getPartyMembers()
      .then(members => membersNotMe(members));

    let dangerTargets = await getMonsters()
      .then(monsters => filterByTargetting(monsters, partyMembers.map(member => member.id)))
      .then(monsters => sortMonstersByDanger(monsters));
    //.then(monsters => first(monsters));

    if (dangerTargets.length > 0) {
      let dangerTarget = await first(dangerTargets);
      if (dangerTarget) {
        l("Danger found: " + dangerTarget.mtype + "(" + dangerTarget.id + ") (atk: " + dangerTarget.attack + ", hp: " + dangerTarget.hp + ", target: " + dangerTarget.target + ")");

        //target = dangerTarget;

        let randomTarget = await random(dangerTargets);
        if (canUse("taunt")) {
          l("Taunting " + dangerTarget.mtype + "(" + dangerTarget.id + ") (atk: " + dangerTarget.attack + ", hp: " + dangerTarget.hp + ", target: " + dangerTarget.target + ")");
          use_skill("taunt", randomTarget);
          setCooldown("taunt");
        }
      }
    }
  }

  if (!is_in_range(target)) {
    l("Attacking creature at x=" + target.x + ", y=" + target.y);

    if (canUse("charge")) {
      l("Go charge for attack.");
      use_skill("charge");
      setCooldown("charge");
    }

    move(
      target.x,
      target.y
    );
  } else if (can_attack(target)) {
    if (canUse("quickpunch")) {
      l("Attack with quickpunch.");
      use_skill("quickpunch");
      setCooldown("quickpunch");
    }

    if (canUse("curse") && isMpHigher(0.7)) {
      l("Attack with curse.");
      use_skill("curse");
      setCooldown("curse");
    }

    state = "ATTACKING";
    attack(target);
  }
}





setInterval(async () => {
  CACHED_MEMBERS = [];
  CACHED_MONSTERS = [];

  AUTO_DEPOSIT = localStorage.getItem("AUTO_DEPOSIT") == 1;
  ATTACK_MTYPE = localStorage.getItem("ATTACK_MTYPE") || "crab";
  ATTACKING = localStorage.getItem("ATTACKING") == 1;
  PRIEST_ATTACKING = localStorage.getItem("PRIEST_ATTACKING") == 1;
  CALLER = localStorage.getItem("CALLER") || false;

  if (isDead()) {
    setTimeout(() => {
      if (isDead()) {
        state = "GO_LAST_LOCATION";
        respawn();
      }
    }, 5000);
  }

  if (is_transporting(character)) {
    l("Transporting home. Do nothing.");
    return;
  }
  if (is_moving(character)) {
    // l("Moving. Do nothing.");
    return;
  }

  updateStatistics();
  healing();

  loot();
  checkShouldDepositGold();

  switch (state) {
    case "TOWN_GO":
      l("Go to home");
      use_skill("use_town", character);
      break;
    case "TOWN_NEXT":
      l("What do we need to do in town?");
      if (character.gold > DEPOSIT_THRESHOLD) {
        set_message("Go Bank")
        state = "TOWN_GO_TO_BANK";
      }
      break;
    case "TOWN_GO_TO_BANK":
      l("Going to bank");
      set_message("Enter Bank")
      smart_move(BANK_INTERNAL, () => {
        l("Now inside bank");
        state = "TOWN_BANK_DEPOSIT";
      });
      break;
    case "TOWN_BANK_DEPOSIT":
      l("Depositing in bank");
      set_message("Deposit")
      bank_deposit(character.gold - DEPOSIT_KEEP);
      state = "TOWN_EXIT_BANK";
      break;
    case "TOWN_EXIT_BANK":
      l("Exiting the bank");
      set_message("Exit Bank")
      smart_move(BANK, () => {
        state = "GO_LAST_LOCATION";
      });
      break;
    case "GO_LAST_LOCATION":
      l("Moving to last location");
      set_message("Go Last Loc")
      smart_move(LAST_LOCATION, () => {
        state = "ATTACKING";
      });
      break;
    case "ATTACK_CRABS":
      l("Moving to crabs");
      set_message("Go Crabs")
      smart_move(CRABS, () => {
        state = "ATTACKING";
      });
      break;
    case "ATTACKING":
    default:
      LAST_LOCATION = {
        "x": character.real_x,
        "y": character.real_y,
        "map": character.map
      }

      /*if (distanceFrom(CRABS) > 200) {
        smart_move(CRABS);
      } else {*/
      combat();
      //}

      break;
  }

  if (merchant && distanceFrom(merchant) < 500) {
    let items = {};
    character.items.forEach((item, i) => {
      if (!item) return;
      items[item.name] = item.q || 1;
    });
    if (items["hpot0"] < 600) {
      buy("hpot0", 600 - items["hpot0"]);
    }
    if (items["mpot0"] < 600) {
      buy("mpot0", 600 - items["mpot0"]);
    }
  }

}, LOOP_SPEED);
