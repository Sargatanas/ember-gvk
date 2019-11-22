import DS from 'ember-data';

export default DS.Model.extend({
  index: DS.attr(),
  importance: DS.attr(),
  adress: {
      street: DS.attr(),
      house: DS.attr(),
      building: DS.attr(),
      flat: DS.attr()
  },
  targets: DS.attr(),
  planDuration: {
    hours: DS.attr(),
    minutes: DS.attr()
  }
});
