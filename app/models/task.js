import DS from 'ember-data';
import Ember from 'ember';

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
    let time = this.get('timeStart');
    if (!time) {
      return '';
    }

    let hours = this.get('timeStart').hours;
    let minutes = this.get('timeStart').minutes;

    minutes = minutes < 10 ? '0' + minutes: minutes;
    return `${this.get('timeStart').hours} ч ${minutes} мин`;
  }),

  stringDate: Ember.computed('date', function() {
    let date = this.get('date');
    if (!date) {
      return '';
    }

    date = new Date(date);
    let fullDate = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    fullDate += '.';
    fullDate += (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    fullDate += '.';
    fullDate += date.getFullYear();

    return fullDate;
  }),
});
