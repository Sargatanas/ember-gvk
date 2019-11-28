import Ember from 'ember';

export default Ember.Service.extend({
    update(team, task, data) {
        for(let key in data) {
            task.set(key, data[key])
        }

        task.set('team', team);
        task.set('teamIndex', team.get('index'))
        team.get('tasks').pushObject(task);

        /* console.log(task, team); */
    }
});
