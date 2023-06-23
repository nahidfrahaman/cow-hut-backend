'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
exports.cowSearchableFields = exports.locations = void 0;
var locations;
(function (locations) {
  locations[(locations['Dhaka'] = 0)] = 'Dhaka';
  locations[(locations['Chattogram'] = 1)] = 'Chattogram';
  locations[(locations['barishal'] = 2)] = 'barishal';
  locations[(locations['Rajshahi'] = 3)] = 'Rajshahi';
  locations[(locations['Khulna'] = 4)] = 'Khulna';
  locations[(locations['Sylhet'] = 5)] = 'Sylhet';
  locations[(locations['Rangpur'] = 6)] = 'Rangpur';
  locations[(locations['Mymenshing'] = 7)] = 'Mymenshing';
})(locations || (exports.locations = locations = {}));
exports.cowSearchableFields = ['searchTerm', 'category', 'breed', 'location'];
