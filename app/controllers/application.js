import Ember from 'ember';

export default Ember.Controller.extend({
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    week: [
        {
            id: 0,
            rus: 'пн',
            en: 'mon'
        },
        {
            id: 1,
            rus: 'вт',
            en: 'tue'
        },
        {
            id: 2,
            rus: 'ср',
            en: 'wed'
        },
        {
            id: 3,
            rus: 'чт',
            en: 'thu'
        },
        {
            id: 4,
            rus: 'пт',
            en: 'fri'
        },
        {
            id: 5,
            rus: 'сб',
            en: 'sat'
        },
        {
            id: 6,
            rus: 'вс',
            en: 'sun'
        }
    ],
    isShow: false,
    date: {
        id: new Date().getDay() - 1,
        value: new Date(),
    },
    currentDate: '',
    actions: {
        showTable(e) {
            let newDate = new Date(document.getElementById('add-date').value);

            let newDateId = newDate.getDay() - 1;
            newDateId = newDateId === -1 ? 6: newDateId;

            this.setProperties({
                isShow: true,
                date: {
                    id: newDateId,
                    value: newDate
                }
            });

            if (this.currentDate === '') {
                this.setProperties({
                    currentDate: this.date.value,                
                });
            }
        }
    }
});

