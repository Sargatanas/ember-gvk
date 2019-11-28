import Ember from 'ember';

export default Ember.Component.extend({
    isOpen: false,
    taskClass: '',

    taskServ: Ember.inject.service('task'),

    actions: {
        toggleTask() {
            switch (this.get('taskClass')) {
                case 'element-body-task_resize':
                    this.setProperties({
                        isOpen: true,
                        taskClass: 'element-body-task_open'
                    });
                    break;
                case 'element-body-task_open':
                    this.setProperties({
                        isOpen: false,
                        taskClass: 'element-body-task_resize'
                    });
                    break;
                default:
                    break;
            }
        },

        setTask(teamList, date, hours, minutes) {
            let task = this.get('tasks');
            task = task[0];
            let team = teamList[0];

            let details = {
                date: date,
                timeStart: {
                    hours: hours,
                    minutes: minutes
                }
            }

            this.get('taskServ').update(team, task, details);
        }
    }
});
