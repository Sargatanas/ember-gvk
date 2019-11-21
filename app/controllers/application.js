import Ember from 'ember';

export default Ember.Controller.extend({
    times: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    week: [
        {
            rus: 'пн',
            en: 'mon'
        },
        {
            rus: 'вт',
            en: 'tue'
        },
        {
            rus: 'ср',
            en: 'wed'
        },
        {
            rus: 'чт',
            en: 'thu'
        },
        {
            rus: 'пт',
            en: 'fri'
        },
        {
            rus: 'сб',
            en: 'sat'
        },
        {
            rus: 'вс',
            en: 'sun'
        }
    ]
});