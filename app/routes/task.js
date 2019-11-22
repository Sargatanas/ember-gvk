import Ember from 'ember';

export default Ember.Route.extend({
    model() {
        /* return this.store.findAll('task'); */

        return fetch('http://localhost:3000/tasks')
          .then((response) => response.json());
    }
});
