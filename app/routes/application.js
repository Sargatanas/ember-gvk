import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        return Ember.RSVP.hash({
          tasks: this.store.findAll('task'),
          teams: this.store.findAll('team')
        });
      },
    
      setupController(controller, model) {
        this._super(...arguments);
        Ember.set(controller, 'tasks', model.tasks);
        Ember.set(controller, 'teams', model.teams);
      },

    dateStart: '',
    dateEnd: ''  
});