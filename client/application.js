'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

(function () {

  window.Models = window.Models || {};

  var Hero = function Hero() {
    _classCallCheck(this, Hero);

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
  };

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
/*globals angular*/
(function () {
  var ndndLogin = angular.module('ndndLogin', ['ngMaterial']);

  // ndndLogin.config([
  //   '$mdThemingProvider',
  //   function($mdThemingProvider) {
  //     $mdThemingProvider.theme('default')
  //       .dark();
  //   }
  // ]);
})();
/*globals angular*/
(function () {

  var dependencies = ['ngSanitize', 'ngMessages', 'ngMaterial', 'ui.router', 'LocalStorageModule'];

  var ndnd = angular.module('ndnd', dependencies);

  // ndnd.config([
  //   '$mdThemingProvider',
  //   function($mdThemingProvider) {
  //     $mdThemingProvider.theme('default')
  //       .dark();
  //   }
  // ]);

  ndnd.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
    //ROOT

    $stateProvider.state('ndnd', {
      url: '/',
      templateUrl: 'client/angular/ctrl/root/rootTmpl.html',
      controller: 'rootCtrl',
      abstract: true,
      resolve: {
        _powers: function _powers(powers) {
          return powers.promise;
        },
        _effects: function _effects(effects) {
          return effects.promise;
        },
        _perks: function _perks(perks) {
          return perks.promise;
        },
        _attributes: function _attributes(attributes) {
          return attributes.promise;
        },
        _specializations: function _specializations(specializations) {
          return specializations.promise;
        },
        _skills: function _skills(skills) {
          return skills.promise;
        }
      }
    });

    $stateProvider.state('ndnd.sheet', {
      url: 'sheet',
      templateUrl: 'client/angular/ctrl/sheet/sheetTmpl.html',
      controller: 'sheetCtrl',
      controllerAs: 'ctrl',
      sectionClass: 'section-sheet'
    });

    $stateProvider.state('ndnd.profile', {
      url: 'profile',
      templateUrl: 'client/angular/ctrl/profile/profileTmpl.html',
      controller: 'profileCtrl',
      controllerAs: 'ctrl',
      sectionClass: 'section-profile'
    });

    $stateProvider.state('ndnd.newhero', {
      url: 'newhero',
      templateUrl: 'client/angular/ctrl/createNewHero/createNewHeroTmpl.html',
      controller: 'createNewHeroCtrl',
      controllerAs: 'ctrl',
      sectionClass: 'section-newhero'
    });

    $urlRouterProvider.otherwise('/profile');
  }]);

  ndnd.config(['localStorageServiceProvider', function (localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('ndnd');
  }]);

  ndnd.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
    // It's very handy to add references to $state and $stateParams to the $rootScope
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }]);
})();
/*globals angular*/
(function (ndnd) {

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

  var _attributes = [{
    id: 'strength',
    name: 'Strength'
  }, {
    id: 'agility',
    name: 'Agility'
  }, {
    id: 'willpower',
    name: 'Willpower'
  }, {
    id: 'toughness',
    name: 'Toughness'
  }];

  ndnd.factory('attributes', ['$http', '$q', function ($http, $q) {

    var attributes = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return attributes.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {
      return $q.when(_attributes).then(function (result) {
        attributes.list = result;
        return result;
      });
    }

    attributes.promise = initialize();

    return attributes;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  ndnd.factory('effects', ['$http', '$q', 'htmlifyer', function ($http, $q, htmlifyer) {

    var _allEffects;
    var effects = {
      all: {},
      list: [],
      promise: null,
      byId: byId
    };

    function textToHtml(obj) {
      if (obj.description) {
        obj.description = htmlifyer.textToHtml(obj.description);
      }
    }

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

        effects.all.boons.forEach(textToHtml);
        effects.all.conditions.forEach(textToHtml);
        effects.all.status.forEach(textToHtml);

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

  ndnd.factory('perks', ['$http', '$q', 'htmlifyer', function ($http, $q, htmlifyer) {

    var perks = {
      list: [],
      promise: null,
      byId: byId
    };

    function textToHtml(p) {

      if (p.requirements) {
        p.requirements = htmlifyer.textToHtml(p.requirements);
      }

      if (p.effect) {
        p.effect = htmlifyer.textToHtml(p.effect);
      }
    }

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
        perks.list.forEach(textToHtml);
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

  ndnd.factory('powers', ['$http', '$q', 'htmlifyer', function ($http, $q, htmlifyer) {

    var powers = {
      list: [],
      promise: null,
      byId: byId
    };

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

    function textToHtml(power) {

      if (power.requirements) {
        power.requirements = htmlifyer.textToHtml(power.requirements);
      }

      if (power.effect) {
        power.effect = htmlifyer.textToHtml(power.effect);
      }
    }

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
          p.icon = chooseIcon(p);
          textToHtml(p);
        });

        deferred.resolve(powers.list);
      }, deferred.reject);

      return deferred.promise;
    }

    powers.promise = initialize();

    return powers;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  var _skills = [{
    id: 'arcana',
    name: 'Arcana'
  }, {
    id: 'athletics',
    name: 'Athletics'
  }, {
    id: 'lore',
    name: 'Lore'
  }, {
    id: 'perception',
    name: 'Perception'
  }, {
    id: 'stealth',
    name: 'Stealth'
  }, {
    id: 'survival',
    name: 'Survival'
  }, {
    id: 'thievery',
    name: 'Thievery'
  }, {
    id: 'wits',
    name: 'Wits'
  }];

  ndnd.factory('skills', ['$http', '$q', function ($http, $q) {

    var skills = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return skills.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {
      return $q.when(_skills).then(function (result) {
        skills.list = result;
        return result;
      });
    }

    skills.promise = initialize();

    return skills;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  var _specializations = [{
    id: 'arms',
    name: 'Arms'
  }, {
    id: 'shadow-arts',
    name: 'Shadow Arts'
  }, {
    id: 'elemental-magic',
    name: 'Elemental Magic'
  }];

  ndnd.factory('specializations', ['$http', '$q', function ($http, $q) {

    var specializations = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return specializations.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {
      return $q.when(_specializations).then(function (result) {
        specializations.list = result;
        return result;
      });
    }

    specializations.promise = initialize();

    return specializations;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  ndnd.factory('api', ['$q', '$http', function ($q, $http) {

    var _rootUrl = 'api';
    var _get = function _get(url) {
      return $http.get(_rootUrl + url).then(function (response) {
        return response.data;
      });
    };

    var Api = function () {
      function Api() {
        _classCallCheck(this, Api);
      }

      _createClass(Api, [{
        key: 'fetchProfile',
        value: function fetchProfile() {
          return _get('/profile');
        }
      }, {
        key: 'fetchHeroes',
        value: function fetchHeroes() {
          return _get('/heroes');
        }
      }]);

      return Api;
    }();

    var api = new Api();

    return api;
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

  ndnd.factory('htmlifyer', [function () {

    var hintRegex = /\{.*?\}/g;
    var newlineRegex = /(?:\r\n|\r|\n)/g;

    function hintToHtml(hint) {

      hint = hint.substring(1, hint.length - 1);
      var pieces = hint.split(':');

      if (pieces.length == 2) {
        var label = pieces[1];
        label = label.charAt(0).toUpperCase() + label.slice(1);
        pieces.push(label);
      }

      return '<a href="#" ng-click="ctrl.openHint(\'' + pieces[0] + '\',\'' + pieces[1] + '\')">' + pieces[2] + '</a>';
    }

    function textToHtml(aString) {

      var result = String(aString).replace(newlineRegex, '<br />');
      result = result.replace(hintRegex, hintToHtml);
      return result;
    }

    return {
      textToHtml: textToHtml
    };
  }]);
})(angular.module('ndnd'));
/*globals angular */
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
/*globals angular Models */
(function (ndnd) {

  var basePath = 'client/angular/ctrl/createNewHero/';

  ndnd.controller('createNewHeroCtrl', ['$timeout', 'api', 'attributes', 'specializations', 'skills', function ($timeout, api, attributes, specializations, skills) {

    var ctrl = this;
    var hero = new Models.Hero();

    ctrl.currentStepTemplate = basePath + '_step1.html';
    ctrl.resources = {
      attributes: attributes.list,
      specializations: specializations.list,
      skills: skills.list
    };
    ctrl.hero = hero;

    ctrl.specChange = specChange;
    ctrl.goToStep = goToStep;
    ctrl.changeAttribute = changeAttribute;
    ctrl.changeSkill = changeSkill;

    function specChange(idx) {

      if (hero.primarySpec === hero.secondarySpec) {
        if (idx === 1) {
          hero.secondarySpec = null;
        }
        if (idx === 2) {
          hero.primarySpec = null;
        }
      }
    }

    function goToStep(idx) {
      ctrl.currentStepTemplate = basePath + '_step' + idx + '.html';
    }

    function changeAttribute(id, amount) {

      ctrl.hero.attributes[id] += amount;

      if (ctrl.hero.attributes[id] > 3) {
        ctrl.hero.attributes[id] = 3;
      }

      if (ctrl.hero.attributes[id] < 0) {
        ctrl.hero.attributes[id] = 0;
      }
    }
    function changeSkill(id, amount) {

      ctrl.hero.skills[id] += amount;

      if (ctrl.hero.skills[id] > 3) {
        ctrl.hero.skills[id] = 3;
      }

      if (ctrl.hero.skills[id] < -1) {
        ctrl.hero.skills[id] = -1;
      }
    }
  }]);
})(angular.module('ndnd'));
/*globals angular */
(function (ndnd) {

  ndnd.controller('rootCtrl', ['$rootScope', '$scope', '$mdSidenav', function ($rootScope, $scope, $mdSidenav) {

    $scope.toggleSidenav = function () {
      $mdSidenav('left').toggle();
    };
  }]);
})(angular.module('ndnd'));
/*globals angular _*/
(function (ndnd) {

  ndnd.controller('sheetCtrl', ['$mdDialog', '$mdToast', 'powers', 'effects', 'character', 'hint', 'key2label', function ($mdDialog, $mdToast, powers, effects, character, hint, key2label) {

    var ctrl = this;

    ctrl.powers = powers.list;
    ctrl.effects = effects.all;
    ctrl.hero = character.hero;
    ctrl.dictionary = key2label.dictionary;

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

      if (ctrl.hero.effects[group][effect]) {
        delete ctrl.hero.effects[group][effect];
      } else {
        ctrl.hero.effects[group][effect] = 1;
      }

      character.persist();
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
/*globals angular */
(function (ndnd) {

  ndnd.controller('profileCtrl', ['$state', 'api', function ($state, api) {

    var ctrl = this;

    ctrl.profile = null;
    ctrl.heroes = [];
    ctrl.addNewHero = addNewHero;

    api.fetchProfile().then(function (data) {
      return ctrl.profile = data;
    });
    api.fetchHeroes().then(function (data) {
      return ctrl.heroes = data;
    });

    function addNewHero() {
      $state.go('ndnd.newhero');
    }
  }]);
})(angular.module('ndnd'));