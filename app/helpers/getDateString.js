import Ember from 'ember';
import dateString from '../utils/date-string';
import dateShift from '../utils/date-shift';

export function getDateString(params) {
    let date = params[1];
    let index = params[0];

    let currentDate = dateShift(index, date);
    return dateString(currentDate);
}

export default Ember.Helper.helper(getDateString);