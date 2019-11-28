import Ember from 'ember';

export function getShiftBorders(params) {
  let shift = params[0];
  let shiftBorders = [];

  for (let i = shift.start; i <= shift.end; i++) {
    shiftBorders.push(i);
  }
  return shiftBorders;
}

export default Ember.Helper.helper(getShiftBorders);
