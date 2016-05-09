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

    this._id = null;
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
        },
        _energies: function _energies(energies) {
          return energies.promise;
        },
        _resources: function _resources(resources) {
          return resources.promise;
        },
        _user: function _user(user) {
          return user.promise;
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

  ndnd.factory('resources', ['$q', 'attributes', 'effects', 'energies', 'equipments', 'perks', 'powers', 'skills', 'specializations', function ($q, attributes, effects, energies, equipments, perks, powers, skills, specializations) {

    var promises = [attributes.promise, effects.promise, energies.promise, equipments.promise, perks.promise, powers.promise, skills.promise, specializations.promise];

    var resources = {

      attributes: null,
      effects: null,
      energies: null,
      equipments: null,
      perks: null,
      powers: null,
      skills: null,
      specializations: null,

      promise: null

    };

    function initialize() {
      return $q.all(promises).then(function () {
        resources.attributes = attributes;
        resources.effects = effects;
        resources.energies = energies;
        resources.equipments = equipments;
        resources.perks = perks;
        resources.powers = powers;
        resources.skills = skills;
        resources.specializations = specializations;
      });
    }

    resources.promise = initialize();

    return resources;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  ndnd.factory('user', ['$http', '$q', function ($http, $q) {

    var user = {
      profile: null,
      promise: null
    };

    function initialize() {

      var deferred = $q.defer();

      var req = {
        url: 'api/profile',
        method: 'GET'
      };

      $http(req).then(function (result) {

        user.profile = result.data;
        deferred.resolve(user);
      }, deferred.reject);

      return deferred.promise;
    }

    user.promise = initialize();

    return user;
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
/*globals angular */
(function (ndnd) {

  ndnd.factory('dialogService', ['$mdDialog', function ($mdDialog) {

    function choosePowersDialog($ev, powersToExclude) {
      return $mdDialog.show({
        controller: 'addNewPowerCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'client/angular/ctrl/addNewPower/addNewPowerTmpl.html',
        parent: angular.element(document.body),
        targetEvent: $ev,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {
          powersToExclude: powersToExclude
        }
      });
    }

    function choosePerksDialog($ev, perksToExclude) {
      return $mdDialog.show({
        controller: 'addNewPerkCtrl',
        controllerAs: 'ctrl',
        templateUrl: 'client/angular/ctrl/addNewPerk/addNewPerkTmpl.html',
        parent: angular.element(document.body),
        targetEvent: $ev,
        clickOutsideToClose: true,
        fullscreen: true,
        locals: {
          perksToExclude: perksToExclude
        }
      });
    }

    return {
      choosePowersDialog: choosePowersDialog,
      choosePerksDialog: choosePerksDialog
    };
  }]);
})(angular.module('ndnd'));
/*globals angular Models*/
(function (ndnd) {

  ndnd.factory('heroes', ['$q', '$http', 'user', 'resources', function ($q, $http, user, resources) {

    var _rootUrl = 'api/heroes';

    var Api = function () {
      function Api() {
        _classCallCheck(this, Api);
      }

      _createClass(Api, [{
        key: 'fetch',
        value: function fetch(id) {

          if (id) {

            return $http.get(_rootUrl + '/' + id).then(function (response) {
              return toObject(response.data);
            });
          } else {

            return $http.get(_rootUrl).then(function (response) {
              if (response.data) {
                return response.data.map(toObject);
              }
              return [];
            });
          }
        }
      }, {
        key: 'save',
        value: function save(hero) {

          var model = toModel(hero);

          if (hero._id) {

            return $http.put(_rootUrl + '/' + hero._id, model).then(function (response) {
              return response.data;
            });
          } else {

            return $http.post(_rootUrl, model).then(function (response) {
              return response.data;
            });
          }
        }
      }, {
        key: 'remove',
        value: function remove(id) {

          return $http.delete(_rootUrl + '/' + id).then(function (response) {
            return response.data;
          });
        }
      }]);

      return Api;
    }();

    function flattenArray(sourceArray) {
      var fieldName = arguments.length <= 1 || arguments[1] === undefined ? "id" : arguments[1];

      return sourceArray.map(function (item) {
        return item[fieldName];
      });
    }

    function inflateArray(sourceArray, resourceName) {
      return sourceArray.map(function (item) {
        return resources[resourceName].byId(item);
      });
    }

    function toModel(hero) {

      var model = angular.copy(hero);
      model.userId = user.profile._id;
      model.powers = flattenArray(hero.powers);
      model.perks = flattenArray(hero.perks);
      model.wieldables = flattenArray(hero.wieldables);
      model.armor = hero.armor.id;
      return model;
    }

    function toObject(model) {

      var hero = new Models.Hero();
      hero = angular.merge(hero, model);
      hero.powers = inflateArray(model.powers, "powers");
      hero.perks = inflateArray(model.perks, "perks");
      hero.wieldables = inflateArray(model.wieldables, "equipments");
      hero.armor = resources.equipments.byId(model.armor);
      return hero;
    }

    var api = new Api();

    return api;
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

      return '<a class="hint-link" ng-click="ctrl.openHint(\'' + pieces[0] + '\',\'' + pieces[1] + '\')">' + pieces[2] + '</a>';
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
/*globals angular */
(function (ndnd) {

  ndnd.controller('addNewPerkCtrl', ['$mdDialog', 'perks', 'perksToExclude', function ($mdDialog, perks, perksToExclude) {

    var ctrl = this;

    // filter out perks used by the hero
    var filteredPerks = perks.list.filter(function (p) {
      var found = perksToExclude.find(function (pte) {
        return pte.id === p.id;
      });
      return !found;
    });

    ctrl.perks = angular.copy(filteredPerks);

    ctrl.okEnabled = false;
    ctrl.ok = function () {
      var selectedPerks = ctrl.perks.filter(function (p) {
        return p.selected;
      });
      $mdDialog.hide(selectedPerks);
    };

    ctrl.cancel = function () {
      $mdDialog.cancel();
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
/*globals angular */
(function (ndnd) {

  ndnd.controller('addNewPowerCtrl', ['$mdDialog', 'powers', 'powersToExclude', function ($mdDialog, powers, powersToExclude) {

    var ctrl = this;

    // filter out powers already selected
    var filteredPowers = powers.list.filter(function (p) {
      var found = powersToExclude.find(function (pte) {
        return pte.id === p.id;
      });
      return !found;
    });

    ctrl.powers = angular.copy(filteredPowers);

    console.log(ctrl.powers);

    ctrl.okEnabled = false;
    ctrl.ok = function () {
      var selectedPowers = ctrl.powers.filter(function (p) {
        return p.selected;
      });
      $mdDialog.hide(selectedPowers);
    };

    ctrl.cancel = function () {
      $mdDialog.cancel();
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
/*globals angular Models _ */
(function (ndnd) {

  var basePath = 'client/angular/ctrl/createNewHero/';

  ndnd.controller('createNewHeroCtrl', ['$timeout', 'resources', 'dialogService', 'hint', 'heroes', function ($timeout, resources, dialogService, hint, heroes) {

    var ctrl = this;
    var hero = new Models.Hero();

    ctrl.currentStepTitle = null;
    ctrl.currentStepTemplate = null;
    ctrl.hero = hero;

    ctrl.specChange = specChange;
    ctrl.goToStep = goToStep;
    ctrl.changeAttribute = changeAttribute;
    ctrl.changeSkill = changeSkill;
    ctrl.chooseNewPowers = chooseNewPowers;
    ctrl.removePower = removePower;
    ctrl.chooseNewPerks = chooseNewPerks;
    ctrl.removePerk = removePerk;
    ctrl.removeWieldable = removeWieldable;
    ctrl.addWieldable = addWieldable;
    ctrl.getWieldableType = getWieldableType;
    ctrl.confirm = confirm;

    ctrl.openHint = openHint;

    ctrl.resources = getResources();

    var steps = ['undetermined', 'Class and Energy', 'Attributes', 'Skills', 'Powers', 'Perks', 'Equipment'];

    goToStep(1);

    function getResources() {
      return {
        attributes: resources.attributes.list,
        specializations: resources.specializations.list,
        skills: resources.skills.list,
        powers: resources.powers.list,
        perks: resources.perks.list,
        energies: resources.energies.list,
        equipments: resources.equipments.list
      };
    }

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
      ctrl.currentStepTitle = steps[idx];
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

    function chooseNewPowers($ev) {

      var alreadySelectedPowers = ctrl.hero.powers;
      var notPertainingPowers = resources.powers.list.filter(function (p) {
        return p.source !== ctrl.hero.primarySpec && p.source !== ctrl.hero.secondarySpec;
      });

      dialogService.choosePowersDialog($ev, alreadySelectedPowers.concat(notPertainingPowers)).then(addPowers);

      function addPowers(selectedPowers) {
        if (selectedPowers && selectedPowers.length) {
          selectedPowers.forEach(function (p) {
            ctrl.hero.powers.unshift(resources.powers.byId(p.id));
          });
        }
      }
    }

    function removePower(power, $ev) {

      var idx = _.indexOf(ctrl.hero.powers, power);
      ctrl.hero.powers.splice(idx, 1);
    }

    function chooseNewPerks($ev) {

      dialogService.choosePerksDialog($ev, angular.copy(ctrl.hero.perks)).then(addPerks);

      function addPerks(selectedPerks) {
        if (selectedPerks && selectedPerks.length) {
          selectedPerks.forEach(function (p) {
            ctrl.hero.perks.unshift(resources.perks.byId(p.id));
          });
        }
      }
    }

    function removePerk(perk, $ev) {

      var idx = _.indexOf(ctrl.hero.perks, perk);
      ctrl.hero.perk.splice(idx, 1);
    }

    function openHint(source, id) {
      hint.openHint(source, id);
    }

    function addWieldable() {
      ctrl.hero.wieldables.push(null);
    }

    function removeWieldable($index) {
      ctrl.hero.wieldables.splice($index, 1);
    }

    function getWieldableType(w) {
      if (w) {
        return '(' + w.type.charAt(0).toUpperCase() + w.type.slice(1) + ')';
      }
      return null;
    }

    function confirm() {
      heroes.save(ctrl.hero);
    }
  }]);
})(angular.module('ndnd'));
/*globals angular */
(function (ndnd) {

  ndnd.controller('profileCtrl', ['$state', 'user', 'heroes', function ($state, user, heroes) {

    var ctrl = this;

    ctrl.profile = null;
    ctrl.heroes = [];
    ctrl.addNewHero = addNewHero;
    ctrl.profile = user.profile;
    ctrl.select = select;

    heroes.fetch().then(function (data) {
      return ctrl.heroes = data;
    });

    function addNewHero() {
      $state.go('ndnd.newhero');
    }

    function select(id) {
      heroes.fetch(id).then(function (hero) {
        console.log(hero);
      });
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

  ndnd.controller('sheetCtrl', ['$mdDialog', '$mdToast', 'powers', 'perks', 'effects', 'character', 'hint', 'key2label', 'dialogService', function ($mdDialog, $mdToast, powers, perks, effects, character, hint, key2label, dialogService) {

    var ctrl = this;

    ctrl.powers = powers.list;
    ctrl.effects = effects.all;
    ctrl.hero = character.hero;
    ctrl.dictionary = key2label.dictionary;

    ctrl.chooseNewPowers = function ($ev) {

      dialogService.choosePowersDialog($ev, angular.copy(ctrl.hero.powers)).then(addPowersAndPersist);

      function addPowersAndPersist(selectedPowers) {
        if (selectedPowers && selectedPowers.length) {
          selectedPowers.forEach(function (p) {
            ctrl.hero.powers.unshift(powers.byId(p.id));
          });
          character.persist();
        }
      }
    };

    ctrl.chooseNewPerks = function ($ev) {
      dialogService.choosePerksDialog($ev, angular.copy(ctrl.hero.perks)).then(addPerksAndPersist);

      function addPerksAndPersist(selectedPerks) {
        if (selectedPerks && selectedPerks.length) {
          selectedPerks.forEach(function (p) {
            ctrl.hero.perks.unshift(perks.byId(p.id));
          });
          character.persist();
        }
      }
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

  var _energy = [{
    id: 'adrenaline',
    name: 'Adrenaline'
  }, {
    id: 'initiative',
    name: 'Initiative'
  }, {
    id: 'focus',
    name: 'Focus'
  }];

  ndnd.factory('energies', ['$http', '$q', function ($http, $q) {

    var energies = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return energies.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {
      return $q.when(_energy).then(function (result) {
        energies.list = result;
        return result;
      });
    }

    energies.promise = initialize();

    return energies;
  }]);
})(angular.module('ndnd'));
/*globals angular*/
(function (ndnd) {

  ndnd.factory('equipments', ['$http', '$q', function ($http, $q) {

    var equipments = {
      list: [],
      promise: null,
      byId: byId
    };

    function byId(id) {
      return equipments.list.find(function (p) {
        return p.id === id;
      });
    }

    function initialize() {

      var deferred = $q.defer();

      var req = {
        url: 'api/equipments',
        method: 'GET'
      };

      $http(req).then(function (result) {

        equipments.list = result.data;
        deferred.resolve(equipments.list);
      }, deferred.reject);

      return deferred.promise;
    }

    equipments.promise = initialize();

    return equipments;
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