import DS from 'ember-data';

export default DS.Model.extend({
  startWork: DS.attr({
    hours: DS.attr(),
    minutes: DS.attr()
  }),
  endWork: DS.attr({
    hours: DS.attr(),
    minutes: DS.attr()
  }),
  tasks: DS.hasMany('task')
});
