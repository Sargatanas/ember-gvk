import Ember from 'ember';

export function getTotalTask(params) {
  let date = params[0];
  let tasksCount = params[1];

  let count = 0;
  tasksCount.forEach(function (element) {
    count = element.date === date ? element.count: count;
  });
  
  return count;
}

export default Ember.Helper.helper(getTotalTask);
