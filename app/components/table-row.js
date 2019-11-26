import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'tr',
    classNames: ['element-body__row'],
    
    hasTask: false,

    store: Ember.inject.service(),
    taskServ: Ember.inject.service('task'),

    actions: {
        
    }
});
