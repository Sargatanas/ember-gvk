import Ember from 'ember';

export default Ember.Component.extend({
    isOpen: false,
    taskClass: '',

    actions: {
        toggleTask() {
            switch (this.get('taskClass')) {
                case 'element-body-task_resize':
                    this.setProperties({
                        isOpen: true,
                        taskClass: 'element-body-task_open'
                    })
                    break;
                case 'element-body-task_open':
                    this.setProperties({
                        isOpen: false,
                        taskClass: 'element-body-task_resize'
                    })
                    break;
                default:
                    break;
            }
        }
    }
});
