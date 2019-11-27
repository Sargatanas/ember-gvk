import Ember from 'ember';

export default Ember.Component.extend({
    isOpen: false,
    class: 'element-body-task_resize',

    actions: {
        toggleTask() {
            if (this.get('class') === 'element-body-task_resize') {
                this.setProperties({
                    isOpen: true,
                    class: 'element-body-task_open'
                });
            } else {
                this.setProperties({
                    isOpen: false,
                    class: 'element-body-task_resize'
                });
            }
        }
    }
});
