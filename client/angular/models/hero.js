(function() {

  window.Models = window.Models || {};

  class Hero {
    constructor() {
      this.name = null;
      this.primarySpec = null;
      this.secondarySpec = null;
      this.avatar = null;
      this.attributes = {
        strength: 0,
        agility: 0,
        willpower: 0,
        toughness: 0
      };
      this.skills = {
        arcana: -1,
        athletics: -1,
        lore: -1,
        perception: -1,
        stealth: -1,
        survival: -1,
        thievery: -1,
        wits: -1
      };
      this.powers = [];
      this.perks = [];
      this.armor = 'no-armor';
      this.wieldables = [];
    }
  }

  window.Models.Hero = Hero;

})();

/*

{
  userId: ObjectId,
  name: String,
  primarySpec: String,
  secondarySpec: String,
  avatar: String,
  powers: [String],
  perks: [String]
}

*/