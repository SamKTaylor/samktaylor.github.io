if(!is_on_cooldown("regen_mp") && character.mp < character.max_mp - 100){
    use_skill("regen_mp");
}

if(!is_on_cooldown("regen_hp") && character.hp < character.max_hp - 50){
    use_skill("regen_hp");
}