import Ember from 'ember';

export default Ember.Component.extend({
    task: Ember.inject.service('set-task'),

    actions: {
        placeTask() {
            let date = new Date();
            let hour = 10;

            let task = Ember.get(this, 'task');
            task.setTask(task, date, hour);
        }
    }
});
