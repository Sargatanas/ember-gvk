import Ember from 'ember';

export default Ember.Controller.extend({
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    week: [
        {
            index: 0,
            rus: 'пн',
            en: 'mon'
        },
        {
            index: 1,
            rus: 'вт',
            en: 'tue'
        },
        {
            index: 2,
            rus: 'ср',
            en: 'wed'
        },
        {
            index: 3,
            rus: 'чт',
            en: 'thu'
        },
        {
            index: 4,
            rus: 'пт',
            en: 'fri'
        },
        {
            index: 5,
            rus: 'сб',
            en: 'sat'
        },
        {
            index: 6,
            rus: 'вс',
            en: 'sun'
        }
    ]
});