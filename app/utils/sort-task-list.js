export default function sortTaskList(taskList) {
  let sortTaskList = [];

  taskList.forEach((task, index) => {
    let duration = task.get('planeDuration');
    let time = Number(duration.hours) * 60 + Number(duration.minutes);

    sortTaskList.push({
      index: index,
      importance: task.get('importance'),
      time: time
    });
  });

  sortTaskList.sort((a, b) => {
    return b.importance === a.importance ? a.time - b.time : b.importance - a.importance;
  });

  let newTaskList = [];
  sortTaskList.forEach(sortTask => {
    newTaskList.push(taskList[sortTask.index]);
  });

  return newTaskList;
}

