export default function taskCanBeDone(teams, tasks) {
  let team = teams[0];

  let teamTasks = team.get('tasks');
  let latestTask = '';
  teamTasks.forEach(teamTask => {
    latestTask = latestTask === '' ? teamTask : latestTask;
    
    let latestTime = latestTask.get('timeStart').hours*60 + latestTask.get('timeStart').minutes;
    let currentTime = teamTask.get('timeStart').hours*60 + teamTask.get('timeStart').minutes;

    latestTask = currentTime > latestTime ? teamTasks : latestTask;
  });
  console.log(latestTask);
}
