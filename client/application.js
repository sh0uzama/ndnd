'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

  'use strict';

  if (!Array.prototype.find) {
    Array.prototype.find = function (predicate) {
      if (this === null) {
        throw new TypeError('Array.prototype.find called on null or undefined');
      }
      if (typeof predicate !== 'function') {
        throw new TypeError('predicate must be a function');
      }
      var list = Object(this);
      var length = list.length >>> 0;
      var thisArg = arguments[1];
      var value;

      for (var i = 0; i < length; i++) {
        value = list[i];
        if (predicate.call(thisArg, value, i, list)) {
          return value;
        }
      }
      return undefined;
    };
  }
})();

/*globals angular*/
(function () {
  angular.module('LoginApp', ['ngMaterial']);
})();
/*globals angular*/
(function () {

  var dependencies = ['ngSanitize', 'ngMaterial', 'ui.router', 'LocalStorageModule'];

  var ndnd = angular.module('ndnd', dependencies);

  ndnd.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //ROOT
    $stateProvider.state('ndnd', {
      url: '/',
      templateUrl: 'client/angular/ctrl/root/rootTmpl.html',
      controller: 'rootCtrl',
      controllerAs: 'ctrl',
      resolve: {
        _powers: function _powers(powers) {
          return powers.promise;
        },
        _effects: function _effects(effects) {
          return effects.promise;
        },
        _perks: function _perks(perks) {
          return perks.promise;
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  }]);

  ndnd.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ndnd');
  }]);
})();
/*globals angular*/
(function (ndnd) {

  // ndnd.directive('compileHtml', [
  //   '$compile',
  //   function($compile) {
  //     return function(scope, element, attrs) {
  //       var ensureCompileRunsOnce = scope.$watch(
  //         function(scope) {
  //           // watch the 'compile' expression for changes
  //           return scope.$eval(attrs.compile);
  //         },
  //         function(value) {
  //           console.log(value);
  //           // when the 'compile' expression changes
  //           // assign it into the current DOM
  //           element.html(value);

  //           // compile the new DOM and link it to the current
  //           // scope.
  //           // NOTE: we only compile .childNodes so that
  //           // we don't get into infinite loop compiling ourselves
  //           $compile(element.contents())(scope);

  //           // Use Angular's un-watch feature to ensure compilation only happens once.
  //           ensureCompileRunsOnce();
  //         }
  //       );
  //     };
  //   }
  // ]);

  ndnd.directive('compile', function ($compile) {
    // directive factory creates a link function
    return function (scope, element, attrs) {
      scope.$watch(function (scope) {
        // watch the 'compile' expression for changes
        return scope.$eval(attrs.compile);
      }, function (value) {
        // when the 'compile' expression changes
        // assign it into the current DOM
        element.html(value);

        // compile the new DOM and link it to the current
        // scope.
        // NOTE: we only compile .childNodes so that
        // we don't get into infinite loop compiling ourselves
        $compile(element.contents())(scope);
      });
    };
  });
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  ndnd.factory('effects', ['$http', '$q', function ($http, $q) {

    var _allEffects;
    var effects = {
      all: {},
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return _allEffects.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {

      var deferred = $q.defer();

      var req = {
        url: 'api/effects',
        method: 'GET'
      };

      $http(req).then(function (result) {

        _allEffects = [];
        effects.all = result.data;
        _allEffects = _allEffects.concat(effects.all.boons);
        _allEffects = _allEffects.concat(effects.all.conditions);
        _allEffects = _allEffects.concat(effects.all.status);

        _allEffects.forEach(function (e) {
          return e.icon = 'effects/' + e.id;
        });

        effects.list = _allEffects;

        deferred.resolve(effects.all);
      }, deferred.reject);

      return deferred.promise;
    }

    effects.promise = initialize();

    return effects;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  ndnd.factory('perks', ['$http', '$q', function ($http, $q) {

    var perks = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return perks.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {

      var deferred = $q.defer();

      var req = {
        url: 'api/perks',
        method: 'GET'
      };

      $http(req).then(function (result) {

        perks.list = result.data;
        deferred.resolve(perks.list);
      }, deferred.reject);

      return deferred.promise;
    }

    perks.promise = initialize();

    return perks;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  function chooseIcon(power) {

    switch (power.source) {
      case 'arms':
        return 'battle-axe';
      case 'elemental-magic':
        return 'frostfire';
      case 'shadow-arts':
        return 'domino-mask';
    }

    return 'private';
  }

  ndnd.factory('powers', ['$http', '$q', function ($http, $q) {

    var powers = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return powers.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {

      var deferred = $q.defer();

      var req = {
        url: 'api/powers',
        method: 'GET'
      };

      $http(req).then(function (result) {

        powers.list = result.data;
        powers.list.forEach(function (p) {
          return p.icon = chooseIcon(p);
        });

        deferred.resolve(powers.list);
      }, deferred.reject);

      return deferred.promise;
    }

    powers.promise = initialize();

    return powers;
  }]);
})(angular.module('ndnd'));
/*globals angular LZString _*/
(function (ndnd) {

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
  HeroStats.Deflate = function (source) {
    return angular.copy(source);
  };
  HeroStats.Inflate = function (source, toBeInflated) {
    if (toBeInflated) {
      selectiveMerge(source, toBeInflated);
    }
  };

  function HeroEffects() {

    this.boons = {};
    this.conditions = {};
    this.status = {};
  }
  HeroEffects.Deflate = function (source) {
    return angular.copy(source);
  };
  HeroEffects.Inflate = function (source, toBeInflated) {
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
    this.perks = [];

    this.effects = new HeroEffects();
    this.stats = new HeroStats();
  }
  Hero.Deflate = function (source) {
    var deflated = angular.copy(source);
    deflated.effects = HeroEffects.Deflate(source.effects);
    deflated.stats = HeroStats.Deflate(source.stats);
    deflated.powers = source.powers.filter(function (p) {
      return p.source !== 'base';
    }).map(function (p) {
      return p.id;
    });
    deflated.perks = source.perks.map(function (p) {
      return p.id;
    });
    return deflated;
  };
  Hero.Inflate = function (source, toBeInflated, powers, basePowers, perks) {
    source.name = toBeInflated.name;
    source.wounds = toBeInflated.wounds || 0;
    source.energy = toBeInflated.energy || 0;
    source.inTurn = !!toBeInflated.inTurn;
    source.hasInstant = !!toBeInflated.hasInstant;

    source.powers = (toBeInflated.powers || []).map(function (id) {
      return powers.byId(id);
    }).concat(basePowers);

    source.perks = (toBeInflated.perks || []).map(function (id) {
      return perks.byId(id);
    });

    HeroEffects.Inflate(source.effects, toBeInflated.effects);
    HeroStats.Inflate(source.stats, toBeInflated.stats);
  };

  ndnd.factory('character', ['localStorageService', 'powers', 'perks', function (storage, powers, perks) {

    var basePowers = powers.list.filter(function (p) {
      return p.source === 'base';
    });

    var heroKey = '_hero';
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
      var deflated = {};

      if (string) {
        // decompress
        string = LZString.decompress(string);
        // fromJson
        deflated = angular.fromJson(string);
      }

      // inflate model
      Hero.Inflate(hero, deflated, powers, basePowers, perks);
    }

    // first thing, try and load from repository
    load();

    return {
      persist: persist,
      load: load,
      hero: hero
    };
  }]);
})(angular.module('ndnd'));
/*globals angular LZString _*/
(function (ndnd) {
  var HintHistoryEntry = function HintHistoryEntry(source, obj) {
    _classCallCheck(this, HintHistoryEntry);

    this.source = source;
    this.obj = angular.copy(obj);
  };

  ndnd.controller('hintDialogController', ['$mdDialog', 'hint', function ($mdDialog, hint) {

    var ctrl = this;

    var _hintHistory = [];

    function setView() {
      ctrl.hintView = 'client/angular/svc/hintSvc-' + ctrl.hintSource + '.html';
    }

    setView();

    function refresh(source, obj) {
      ctrl.hintSource = source;
      ctrl.hintObj = obj;
      setView();
    }

    ctrl.openHint = function (source, id) {
      _hintHistory.push(new HintHistoryEntry(ctrl.hintSource, ctrl.hintObj));
      var obj = hint.getHintObject(source, id);
      refresh(source, obj);
    };

    ctrl.cancel = function () {
      if (_hintHistory.length) {
        var hhe = _hintHistory.pop();
        refresh(hhe.source, hhe.obj);
      } else {
        $mdDialog.hide();
      }
    };
  }]);

  ndnd.factory('hint', ['$mdDialog', 'effects', 'powers', function ($mdDialog, effects, powers) {

    function getHintObject(source, id) {

      var obj;

      switch (source) {
        case 'power':
          obj = powers.byId(id);
          break;
        case 'effect':
          obj = effects.byId(id);
          break;
      }

      return obj;
    }

    function openHint(source, id) {

      $mdDialog.show({
        controller: 'hintDialogController',
        controllerAs: 'ctrl',
        templateUrl: 'client/angular/svc/hintSvc.html',
        parent: angular.element(document.body),
        locals: {
          hintSource: source,
          hintObj: getHintObject(source, id)
        },
        bindToController: true,
        clickOutsideToClose: true
      });
    }

    return {
      getHintObject: getHintObject,
      openHint: openHint
    };
  }]);
})(angular.module('ndnd'));
/*globals angular LZString _*/
(function (ndnd) {

  ndnd.factory('key2label', ['effects', 'powers', function (effects, powers) {

    var dictionary = {
      strength: "Strength",
      agility: "Agility",
      willpower: "Willpower",
      toughness: "Toughness",
      maxWounds: "Wounds (Max)",
      permanentWounds: "Perm. Wounds",
      armor: "Armor",
      movement: "Movement Speed"
    };

    effects.list.forEach(function (e) {
      return dictionary[e.id] = e.name;
    });
    powers.list.forEach(function (p) {
      return dictionary[p.id] = p.name;
    });

    return {
      dictionary: dictionary
    };
  }]);
})(angular.module('ndnd'));
/*globals angular _*/
(function (ndnd) {

  ndnd.controller('addNewPerkCtrl', ['$mdDialog', 'perks', 'character', function ($mdDialog, perks, character) {

    var ctrl = this;

    ctrl.hero = character.hero;

    // filter out perks used by the hero
    var filteredPerks = _.difference(perks.list, ctrl.hero.perks, function (p) {
      return p.id;
    });
    ctrl.perks = angular.copy(filteredPerks);

    ctrl.okEnabled = false;
    ctrl.ok = function () {
      var selectedPerks = ctrl.perks.filter(function (p) {
        return p.selected;
      });
      selectedPerks.forEach(function (p) {
        ctrl.hero.perks.unshift(perks.byId(p.id));
      });
      $mdDialog.hide();
    };

    ctrl.cancel = function () {
      $mdDialog.hide();
    };

    ctrl.selectPerk = function (perk, $event) {
      perk.selected = !perk.selected;
      ctrl.okEnabled = ctrl.perks.some(function (p) {
        return p.selected;
      });
      $event.stopPropagation();
    };
  }]);
})(angular.module('ndnd'));
/*globals angular _*/
(function (ndnd) {

  ndnd.controller('addNewPowerCtrl', ['$mdDialog', 'powers', 'character', function ($mdDialog, powers, character) {

    var ctrl = this;

    ctrl.hero = character.hero;

    // filter out powers used by the hero
    var filteredPowers = _.difference(powers.list, ctrl.hero.powers, function (p) {
      return p.id;
    });
    ctrl.powers = angular.copy(filteredPowers);

    ctrl.okEnabled = false;
    ctrl.ok = function () {
      var selectedPowers = ctrl.powers.filter(function (p) {
        return p.selected;
      });
      selectedPowers.forEach(function (p) {
        ctrl.hero.powers.unshift(powers.byId(p.id));
      });
      $mdDialog.hide();
    };

    ctrl.cancel = function () {
      $mdDialog.hide();
    };

    ctrl.selectPower = function (power, $event) {
      power.selected = !power.selected;
      ctrl.okEnabled = ctrl.powers.some(function (p) {
        return p.selected;
      });
      $event.stopPropagation();
    };
  }]);
})(angular.module('ndnd'));
/*globals angular _*/
(function (ndnd) {

  ndnd.controller('rootCtrl', ['$mdSidenav', '$mdDialog', '$mdToast', 'powers', 'effects', 'character', 'hint', 'key2label', function ($mdSidenav, $mdDialog, $mdToast, powers, effects, character, hint, key2label) {

    var ctrl = this;

    ctrl.powers = powers.list;
    ctrl.effects = effects.all;
    ctrl.hero = character.hero;
    ctrl.dictionary = key2label.dictionary;

    ctrl.toggleSidenav = function (id) {
      $mdSidenav(id || 'left').toggle();
    };

    ctrl.chooseNewPowers = function ($ev) {
      $mdDialog.show({
        controller: 'addNewPowerCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'client/angular/ctrl/addNewPower/addNewPowerTmpl.html',
        parent: angular.element(document.body),
        targetEvent: $ev,
        clickOutsideToClose: true,
        fullscreen: true
      }).then(function () {
        character.persist();
      });
    };

    ctrl.chooseNewPerks = function ($ev) {
      $mdDialog.show({
        controller: 'addNewPerkCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'client/angular/ctrl/addNewPerk/addNewPerkTmpl.html',
        parent: angular.element(document.body),
        targetEvent: $ev,
        clickOutsideToClose: true,
        fullscreen: true
      }).then(function () {
        character.persist();
      });
    };

    ctrl.removePower = function (power, $ev) {

      var confirm = $mdDialog.confirm().title('Delete ' + power.name + '?').textContent('Do you want to remove ' + power.name + ' from your list?').ariaLabel('Delete ' + power.name + '?').targetEvent($ev).ok('Yes').cancel('No');

      $mdDialog.show(confirm).then(function () {
        var idx = _.indexOf(ctrl.hero.powers, power);
        ctrl.hero.powers.splice(idx, 1);
        character.persist();
      });
    };

    ctrl.removePerk = function (perk, $ev) {

      var confirm = $mdDialog.confirm().title('Delete ' + perk.name + '?').textContent('Do you want to remove ' + perk.name + ' from your list?').ariaLabel('Delete ' + perk.name + '?').targetEvent($ev).ok('Yes').cancel('No');

      $mdDialog.show(confirm).then(function () {
        var idx = _.indexOf(ctrl.hero.perks, perk);
        ctrl.hero.perks.splice(idx, 1);
        character.persist();
      });
    };

    ctrl.usePower = function (power, $evt) {};

    ctrl.changeWounds = function (amount) {
      ctrl.hero.wounds += amount;
      character.persist();
    };

    ctrl.changeEnergy = function (amount) {
      ctrl.hero.energy += amount;
      character.persist();
    };

    ctrl.changeEffect = function (group, effect) {

      var message;
      var e = effects.byId(effect);

      if (ctrl.hero.effects[group][effect]) {
        delete ctrl.hero.effects[group][effect];
        message = 'Removed ' + e.name;
      } else {
        ctrl.hero.effects[group][effect] = 1;
        message = 'Added ' + e.name;
      }

      character.persist();

      // var toast = $mdToast.simple().textContent(message);
      // toast.position = 'top left';

      // $mdToast.show(toast);
    };

    ctrl.switchTurn = function () {

      ctrl.hero.inTurn = !ctrl.hero.inTurn;

      if (ctrl.hero.inTurn) {
        ctrl.hero.hasInstant = true;
      }

      character.persist();
    };

    ctrl.switchInstant = function () {

      ctrl.hero.hasInstant = !ctrl.hero.hasInstant;
      character.persist();
    };

    ctrl.openHint = function (source, id) {
      hint.openHint(source, id);
    };
  }]);
})(angular.module('ndnd'));