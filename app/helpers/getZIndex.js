import Ember from 'ember';

export function getZIndex(params) {
  let currentHour = params[0];
  let lastHour = params[1];
  let dayIndex = params[2];
  
  return dayIndex * (lastHour - currentHour) + 100
}

export default Ember.Helper.helper(getZIndex);
