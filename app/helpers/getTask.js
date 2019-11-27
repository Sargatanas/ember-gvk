import Ember from 'ember';

export function getTask(params) {
  let task = params[0];
  let taskDate = params[1];
  let currentDate = params[2];
  let taskHour = Number(params[3]);
  let currentHour = Number(params[4]);

  /* console.log('Это при выборе задач на день', task);
  console.log(taskDate, currentDate);
  console.log(taskHour, currentHour);
  console.log(''); */

  if ((currentDate === taskDate) && (currentHour === taskHour)) {
    return [task];
  }

  return '';
}

export default Ember.Helper.helper(getTask);
