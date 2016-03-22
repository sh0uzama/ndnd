/*globals angular LZString _*/
(function(ndnd) {


  function selectiveMerge(target, source) {
    for (var p in target) {
      if (source.hasOwnProperty(p)) {
        target[p] = source[p];
      }
    }
  }

  function HeroStats() {
    this.strength = 0;
    this.agility = 0;
    this.willpower = 0;
    this.toughness = 0;
    this.maxWounds = 15;
    this.permanentWounds = 0;
    this.armor = 0;
    this.movement = 4;

  }
  HeroStats.Deflate = function(source) {
    return angular.copy(source);
  };
  HeroStats.Inflate = function(source, toBeInflated) {
    if (toBeInflated) {
      selectiveMerge(source, toBeInflated);
    }
  };

  function HeroEffects() {

    this.boons = {};
    this.conditions = {};
    this.status = {};

  }
  HeroEffects.Deflate = function(source) {
    return angular.copy(source);
  };
  HeroEffects.Inflate = function(source, toBeInflated) {
    if (toBeInflated) {
      selectiveMerge(source, toBeInflated);
    }
  };

  function Hero() {

    this.name = null;
    this.wounds = 0;
    this.energy = 0;
    this.inTurn = false;
    this.hasInstant = false;

    this.powers = [];
    this.effects = new HeroEffects();
    this.stats = new HeroStats();
  }
  Hero.Deflate = function(source) {
    var deflated = angular.copy(source);
    deflated.effects = HeroEffects.Deflate(source.effects);
    deflated.stats = HeroStats.Deflate(source.stats);
    deflated.powers = source.powers.filter(p => p.source !== 'base').map(p => p.id);
    return deflated;
  };
  Hero.Inflate = function(source, toBeInflated, powers, basePowers) {
    source.name = toBeInflated.name;
    source.wounds = toBeInflated.wounds || 0;
    source.energy = toBeInflated.energy || 0;
    source.inTurn = !!toBeInflated.inTurn;
    source.hasInstant = !!toBeInflated.hasInstant;

    source.powers = (toBeInflated.powers || [])
      .map(id => powers.byId(id))
      .concat(basePowers);

    HeroEffects.Inflate(source.effects, toBeInflated.effects);
    HeroStats.Inflate(source.stats, toBeInflated.stats);
  };

  ndnd.factory('character', [
    'localStorageService', 'powers',
    function(storage, powers) {

      var basePowers = powers.list.filter(p => p.source === 'base');

      const heroKey = '_hero';
      var hero = new Hero();

      function persist() {

        // deflate model
        var deflated = Hero.Deflate(hero);
        // to json
        var string = angular.toJson(deflated);
        // compress
        string = LZString.compress(string);
        // persist
        storage.set(heroKey, string);

      }

      function load() {
        // load
        var string = storage.get(heroKey);

        if (string) {
          // decompress
          string = LZString.decompress(string);
          // fromJson
          var deflated = angular.fromJson(string);
          // inflate model
          Hero.Inflate(hero, deflated, powers, basePowers);
        }

      }

      // first thing, try and load from repository
      load();

      return {
        persist: persist,
        load: load,
        hero: hero
      };

    }
  ]);

})(angular.module('ndnd'));