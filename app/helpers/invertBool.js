import Ember from 'ember';

export function invertBool(params) {
  return !params[0];
}

export default Ember.Helper.helper(invertBool);
