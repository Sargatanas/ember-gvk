import Ember from 'ember';

export default Ember.Service.extend({    
    store: Ember.inject.service(),

    findTask(filter) {
        let store = this.get('store');
        /* console.log(store);
        console.log(filter); */
        return store;
    }
});
