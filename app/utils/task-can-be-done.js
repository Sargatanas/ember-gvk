import dateNullable from './date-nullable';
import dateForm from './date-form';

export default function taskCanBeDone(teams, tasks, date) {
  let team = teams[0];

  let teamTasks = team.get('tasks');
  let lastTask = getLastTask(teamTasks, date);

  let currentDate = date;
  currentDate = dateNullable(currentDate);

  let shiftEnd = new Date(currentDate);
  shiftEnd.setHours(team.get('shiftEnd').hours);

  lastTask = lastTask ? getTaskInfo(lastTask, currentDate) : getTaskInfo(lastTask, currentDate, currentDate);
  let isEmptyDay = lastTask ? false : true;

  let tasksPlane = [];
  tasks.forEach(task => {

    let taskStart = dateNullable(new Date(dateForm(currentDate)));
    taskStart.setHours(lastTask.end.getHours())
    if (!isEmptyDay) {
      taskStart.setHours(taskStart.getHours() + 1);
    }
    taskStart.setMinutes(lastTask.end.getMinutes());

    let taskInfo = getTaskInfo(task, currentDate, taskStart);
    
    if (taskInfo.end.getTime() <= shiftEnd.getTime()) {
      lastTask = taskInfo;
      isEmptyDay = false;

      task.set('currentDate', dateForm(currentDate));
      task.set('startTime', {
        hours: taskInfo.start.getHours(),
        minutes: taskInfo.start.getMinutes(),
      });

      tasksPlane.push(task);
    }
  });

  return tasksPlane;
}

function getLastTask(tasks, date) {
  let lastTask = '';

  tasks.forEach(task => {
    let taskDate = new Date(task.get('date'));
    taskDate = dateNullable(taskDate);

    if (taskDate.getTime() === date.getTime()) {
      lastTask = lastTask === '' ? task : lastTask;
    
      let lastTime = lastTask.get('timeStart').hours*60 + lastTask.get('timeStart').minutes;
      let currentTime = task.get('timeStart').hours*60 + task.get('timeStart').minutes;

      lastTask = currentTime > lastTime ? task : lastTask;
    }  
  });  
  
  return lastTask;
}

function getTaskInfo(task, currentDate, start) {
  let durationDefault = {
    hours: 0,
    minutes: 0
  }
  let taskDuration = task ? task.get('planeDuration') : durationDefault;

  let taskStart = '';
    if (start) {
    taskStart = start;
  } else {
    taskStart = new Date(currentDate);
    taskStart.setHours(task.get('timeStart').hours);
    taskStart.setMinutes(task.get('timeStart').minutes);
  }  

  let taskEnd = new Date(currentDate);
  taskEnd.setHours(taskStart.getHours()+ taskDuration.hours);
  taskEnd.setMinutes(taskStart.getMinutes() + taskDuration.minutes);

  return {
    task: task,
    start: taskStart,
    end: taskEnd
  }
}

