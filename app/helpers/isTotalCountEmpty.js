import Ember from 'ember';

export function isTotalCountEmpty(params) {
  return params[0] !== 0;
}

export default Ember.Helper.helper(isTotalCountEmpty);
