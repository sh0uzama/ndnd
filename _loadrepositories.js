var uuid = require('uuid');
var fb = require('./firebase.config');

// PERKS
var perkList = require("./data/perks/perks.json");
var perks = {};

perkList.forEach(p => perks[uuid.v4()] = p);

fb.child('perks').set(perks);

// EFFECTS
var boonList = require('./data/effects/boons.json');
var condiList = require('./data/effects/condis.json');
var statusList = require('./data/effects/status.json');
var effects = {};

boonList.forEach(b => b.type = 'boon');
condiList.forEach(b => b.type = 'condition');
statusList.forEach(b => b.type = 'status');

boonList.forEach(e => effects[uuid.v4()] = e);
condiList.forEach(e => effects[uuid.v4()] = e);
statusList.forEach(e => effects[uuid.v4()] = e);

fb.child('effects').set(effects);

// POWERS
var powerList = require('./data/powers/_base.json')
      .concat(require('./data/powers/arms.json'))
      .concat(require('./data/powers/elemental-magic.json'))
      .concat(require('./data/powers/shadow-arts.json'));
var powers = {};

powerList.forEach(p => powers[uuid.v4()] = p);

fb.child('powers').set(powers);

console.log('all set');
