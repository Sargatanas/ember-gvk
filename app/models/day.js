import DS from 'ember-data';

export default DS.Model.extend({
    dayOfWeek: {
        rus: DS.attr('string'),
        en: DS.attr('string'),
    },    
    date: DS.attr('date'),
    totalTasks: DS.attr('number', {defaultValue: 0})
});
