import Ember from 'ember';

export default Ember.Controller.extend({
    hours: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17],
    week: [{
            id: 0,
            rus: 'пн',
            en: 'mon'
        },{
            id: 1,
            rus: 'вт',
            en: 'tue'
        },{
            id: 2,
            rus: 'ср',
            en: 'wed'
        },{
            id: 3,
            rus: 'чт',
            en: 'thu'
        },{
            id: 4,
            rus: 'пт',
            en: 'fri'
        },{
            id: 5,
            rus: 'сб',
            en: 'sat'
        },{
            id: 6,
            rus: 'вс',
            en: 'sun'
        }
    ],

    isShowTable: false,
    
    isShowTasks: false,
    currentTeam: '',

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
                isShowTable: true,
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
        },

        showTasks(e) {
           let teamIndex = document.getElementById('add-team-id').value;
           let context = this;

            this.store.queryRecord('team', { index: teamIndex }).then(function(team) {
                context.setProperties({
                    isShowTasks: true,
                    currentTeam: team
                });
            }); 
        },

        createTask(hour) {
            let teamIndex = document.getElementById('add-team-id').value;


            let currentDate = new Date(document.getElementById('add-date').value);
            currentDate.setHours(0);
            currentDate.setMinutes(0);
            currentDate.setSeconds(0);
            currentDate.setMilliseconds(0);

            let currentDay = currentDate.getDay() - 1;
            currentDay = currentDay === -1 ? 6: currentDay;

            let dateShift = index - currentDay;
            
            currentDate.setDate(currentDate.getDate() + dateShift);


            console.log(hour, teamIndex, currentDate);
            this.setProperties({
                hasTask: true
            });

            let formDate = currentDate.getFullYear();
            formDate += '-';
            formDate += (currentDate.getMonth() + 1) <= 9 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
            formDate += '-';
            formDate += currentDate.getDate() <= 9 ? '0' + currentDate.getDate() : currentDate.getDate();

            let context = this;
            let store = this.get('taskServ').findTask({ date : formDate });
            console.log(store);
            store.find('task', { date : formDate }).then(function(task) {
                console.log(task);
            });
        }
    }
});

