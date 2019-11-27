import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'tr',
    classNames: ['element-body__row'],
    
    hasTask: false,

    actions: {
       showTask() {
           this.setProperties({
               hasTask: true
           });       
        } 
    }
});
