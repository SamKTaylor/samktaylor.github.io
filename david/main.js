const LOOP_SPEED = 500;
const LOGGING = false;

const DEPOSIT_LIMIT = 20000;

const HP_REGEN_AMOUNT = 50;
const MP_REGEN_AMOUNT = 100;
const HP_POTION_AMOUNT = 200;
const MP_POTION_AMOUNT = 300;

let ATTACKING = true;

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

const COOLDOWNS = {
  "invis": 12500,
  "charge": 40500,
  "heal": 200,
  "partyheal": 200,
  "revive": 200
}

let targetLastX = 0;
let targetLastY = 0;

let state = "NONE";

let cooldownMap = {};

const l = (s) => {
  console.log(s);
  if (LOGGING) {
    log(s);
  }
};

const isDead = () => {
  if (character.rip) {
    state = "DEAD";
  }
  return character.rip;
};

const updateStatistics = () => {
  HP_THRESHOLD = Math.max(character.max_hp - HP_POTION_AMOUNT, character.max_hp * 0.5);
  MP_THRESHOLD = Math.max(character.max_mp - MP_POTION_AMOUNT, character.max_mp * 0.5);
  HP_REGEN_THRESHOLD = Math.max(character.max_hp - HP_REGEN_AMOUNT, character.max_hp * 0.8);
  MP_REGEN_THRESHOLD = Math.max(character.max_mp - MP_REGEN_AMOUNT, character.max_mp * 0.8);
};

const healing = () => {
  if (isDead()) return;

  if (!is_on_cooldown("use_hp") && character.hp < HP_THRESHOLD) {
    l("Drink healing potion");
    use_skill("use_hp");
  } else if (!is_on_cooldown("use_mp") && character.mp < MP_THRESHOLD) {
    l("Drink mana potion");
    use_skill("use_mp");
  }

  if (!is_on_cooldown("regen_hp") && character.hp < HP_REGEN_THRESHOLD) {
    l("Regenerate health");
    use_skill("regen_hp");
  } else if (!is_on_cooldown("regen_mp") && character.mp < MP_REGEN_THRESHOLD) {
    l("Regenerate mana");
    use_skill("regen_mp");
  }
};

const checkShouldDepositGold = () => {
  if (state.startsWith("TOWN")) return;

  if (character.gold > DEPOSIT_LIMIT) {
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
  if (character.ctype != "rogue" && (
      skill == "invis"
    ) ||
    character.ctype != "warrior" && (
      skill == "charge"
    ) ||
    character.ctype != "priest" && (
      skill == "heal" ||
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
  return Math.abs(Math.sqrt(
    Math.pow(location.x - character.real_x, 2) + Math.pow(location.y - character.real_y, 2)
  ));
};

const getPartyMembers = () => {
  let members = {};
  parent.party_list.forEach((item, i) => {
    const entity = get_entity(item);
    members[item] = entity;
  });
  return members;
};

const getPartyMembersArray = () => {
  let members = [];
  parent.party_list.forEach((item, i) => {
    const entity = get_entity(item);
    members.push(entity);
  });
  return members;
};

const findHealingTarget = () => {
  getPartyMembersArray().forEach((item, i) => {
    if(item.hp < (item.max_hp * HEAL_THRESHOLD)) {
      l("Heal party member "+item.id);
      heal(item);
      setCooldown("heal");
    } else if(item.hp < (item.max_hp * PARTY_HEAL_THRESHOLD)) {
      if (canUse("partyheal")) {
        l("Danger! Heal party!");
        use_skill("partyheal");
        setCooldown("partyheal");
      }
    } else if(item.rip) {
      if (canUse("revive")) {
        l("Member dead. Revive!");
        use("revive", item);
        setCooldown("revive");
      }
    }

  });
};









const combat = () => {
  set_message("Combat");

  if (!ATTACKING || character.rip || is_moving(character)) return;

  var target = get_targeted_monster();

  if (!target) {
    target = get_nearest_monster();
    if (target) {
      targetLastX = target.x;
      targetLastY = target.y;
    }
  }

  if (!target) {
    return;
  }

  if (canUse("invis")) {
    l("Go invisible for attack.");
    use_skill("invis");
    setCooldown("invis");
  }

  if (canUse("charge")) {
    l("Go charge for attack.");
    use_skill("charge");
    setCooldown("charge");
  }

  if (canUse("partyheal")) {
    findHealingTarget();
  }

  if (!is_in_range(target)) {
    console.log("Attacking creature at ", "x", target.x, "y", target.y);
    move(
      target.x,
      target.y
    );
  } else if (can_attack(target)) {
    /*if(!is_on_cooldown("taunt")){
        //use_skill("taunt", target);
    }*/
    state = "ATTACKING";
    attack(target);
  }
}





setInterval(() => {
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
      if (character.gold > DEPOSIT_LIMIT) {
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
      bank_deposit(character.gold - 2000);
      state = "TOWN_EXIT_BANK";
      break;
    case "TOWN_EXIT_BANK":
      l("Exiting the bank");
      set_message("Exit Bank")
      smart_move(BANK, () => {
        state = "ATTACK_CRABS";
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
      if (distanceFrom(CRABS) > 200) {
        smart_move(CRABS);
      } else {
        combat();
      }

      break;
  }

}, LOOP_SPEED);
