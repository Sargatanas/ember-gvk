import Ember from 'ember';
import dateShift from '../utils/date-shift';

export function getDate(params) {
  let index = params[0];  
  let date = typeof params[1] === 'string' ? new Date() : params[1];  

  return dateShift(index, date);
}

export default Ember.Helper.helper(getDate);
