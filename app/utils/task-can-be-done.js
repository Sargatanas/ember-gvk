import dateNullable from '../utils/date-nullable';
import dateForm from '../utils/date-form';

export default function taskCanBeDone(teams, tasks) {
  let team = teams[0];

  let teamTasks = team.get('tasks');
  let lastTask = getLastTask(teamTasks);
  
  let date = lastTask === '' ? new Date() : new Date(lastTask.get('date'));
  date = dateNullable(date);

  let shiftEnd = new Date(date);
  shiftEnd.setHours(team.get('shiftEnd').hours);

  lastTask = getTaskInfo(lastTask, date);
  console.log('Последняя запланировнная заявка');
  console.log(lastTask);
  console.log('');

  let tasksPlane = [];
  tasks.forEach((task, index) => {
    console.log(`Заявка ${task.get('index')}`); 

    let taskStart = new Date(dateForm(lastTask.end));
    taskStart.setHours(lastTask.end.getHours() + 1);
    taskStart.setMinutes(lastTask.end.getMinutes());

    let taskInfo = getTaskInfo(task, date, taskStart);

    console.log(taskInfo);    
    console.log(`Окончание заявки ${index}. ${task.get('index')}`);
    console.log(taskInfo.end);
    
    if (taskInfo.end.getTime() <= shiftEnd.getTime()) {
      console.log(`Заявка подходит`);
      lastTask = taskInfo;

      tasksPlane.push(task);
    }  else {
      console.log(`Заявка не подходит`);
    }
    console.log(tasksPlane);
    console.log('');
  });
}

function getLastTask(tasks) {
  let lastTask = '';

  tasks.forEach(task => {
    lastTask = lastTask === '' ? task : lastTask;
    
    let lastTime = lastTask.get('timeStart').hours*60 + lastTask.get('timeStart').minutes;
    let currentTime = task.get('timeStart').hours*60 + task.get('timeStart').minutes;

    lastTask = currentTime > lastTime ? task : lastTask;
  });  
  
  return lastTask;
}

function getTaskInfo(task, date, start) {
  let taskDuration = task.get('planeDuration');

  let taskStart = '';
    if (start) {
    taskStart = start;
  } else {
    taskStart = new Date(date);
    taskStart.setHours(task.get('timeStart').hours);
    taskStart.setMinutes(task.get('timeStart').minutes);
  }  

  let taskEnd = new Date(date);
  taskEnd.setHours(taskStart.getHours()+ taskDuration.hours);
  taskEnd.setMinutes(taskStart.getMinutes() + taskDuration.minutes);

  return {
    task: task,
    start: taskStart,
    end: taskEnd
  }
}

