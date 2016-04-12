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
      this.powers = [];
      this.perks = [];
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