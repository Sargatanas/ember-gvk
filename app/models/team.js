import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  index: DS.attr('number'),
  shiftStart: DS.attr('object', {
      hours: DS.attr('number'),
      minutes: DS.attr('number'),
  }),
  shiftEnd: DS.attr('object', {
    hours: DS.attr('number'),
    minutes: DS.attr('number'),
  }),

  timeStart: Ember.computed('shiftStart', function() {
    let minutes = this.get('shiftStart').minutes;
    minutes = minutes < 10 ? '0' + minutes: minutes;

    return `${this.get('shiftStart').hours}:${minutes}`;
  }),

  timeEnd: Ember.computed('shiftEnd', function() {
    let minutes = this.get('shiftEnd').minutes;
    minutes = minutes < 10 ? '0' + minutes: minutes;

    return `${this.get('shiftEnd').hours}:${minutes}`;
  }),

  tasks: DS.hasMany('task', {async: true}),
  date: DS.attr()
});
