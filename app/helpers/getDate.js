import Ember from 'ember';

export function getDate(params) {
  let index = params[0];

  let date = params[1];
  let currentDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  currentDate = new Date(currentDate);

  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  let currentDay = currentDate.getDay() - 1;
  currentDay = currentDay === -1 ? 6: currentDay;

  let dateShift = index - currentDay;
   
  currentDate.setDate(currentDate.getDate() + dateShift);
       
  return currentDate;
}

export default Ember.Helper.helper(getDate);
