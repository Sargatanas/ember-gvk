import DS from 'ember-data';
import Ember from 'ember';
import dateString from '../utils/date-string';

export default DS.Model.extend({
  index: DS.attr('number'),
  importance: DS.attr('number'),

  adress: DS.attr('object', {
    street: DS.attr('string'),
    house: DS.attr('number'),
    building: DS.attr('string'),
    flat: DS.attr('number'),
  }),
  
  targets: DS.attr(),

  planeDuration: DS.attr('object', {
    hours: DS.attr('number'),
    minutes: DS.attr('number'),
  }),

  team: DS.belongsTo('team', {async: true}),
  teamIndex: DS.attr('number'),
  timeStart: DS.attr('object', {
    hours: DS.attr('number'),
    minutes: DS.attr('number'),
  }),
  date: DS.attr(),

  fullAdress: Ember.computed('adress', function() {
    let adress = 'Ул. ';
    adress += this.get('adress').street + ', д.';
    adress += this.get('adress').house;

    let building = this.get('adress').building;
    adress += building ? ', корп.' + building : '';

    let flat = this.get('adress').flat;
    adress += flat ? ', кв.' + flat : '';

    return adress;
  }),

  planeTime: Ember.computed('planeDuration', function() {
    let minutes = this.get('planeDuration').minutes;
    minutes = minutes < 10 ? '0' + minutes: minutes;

    return `${this.get('planeDuration').hours} ч ${minutes} мин`;
  }),

  time: Ember.computed('timeStart', function() {
    let hours = this.get('timeStart').hours;
    let minutes = this.get('timeStart').minutes;
    if ((hours === '') || (minutes === '')) {
      return '';
    }

    minutes = minutes < 10 ? '0' + minutes: minutes;
    return `${hours}:${minutes}`;
  }),

  stringDate: Ember.computed('date', function() {
    let date = this.get('date');
    if (!date) {
      return '';
    }
    return dateString(date);
  }),
});
