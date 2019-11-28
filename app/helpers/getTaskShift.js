import Ember from 'ember';

export function getTaskShift(params) {
  let startTime = params[0];
  return 30 * startTime.minutes / 60;
}

export default Ember.Helper.helper(getTaskShift);
