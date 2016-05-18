(function() {

  window.Models = window.Models || {};

  class Sheet {
    constructor() {
      this._id = null;
      this.heroId = null;
      this.wounds = 0;
      this.permanentWounds = 0;
      this.armor = 0;
      this.movement = 4;
      this.energy = 0;
      this.inTurn = false;
      this.hasInstant = false;
      this.effects = {};
    }
  }

  window.Models.Sheet = Sheet;

})();