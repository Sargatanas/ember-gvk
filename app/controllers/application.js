import Ember from 'ember';
import Task from '../models/task'

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

    taskList: '',
    
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

        createTask(hour) {
            this.setProperties({
                isShowTable: false
            });

            let teamIndex = document.getElementById('add-team-id').value;

            let date = new Date(document.getElementById('add-date').value);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);

            let tasks = [];

            let store = this.store;
            for (let i = 0; i < 7; i++) {
                let formDate = date.getFullYear();
                formDate += '-';
                formDate += (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
                formDate += '-';
                formDate += date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();

                let currentDate = new Date(formDate);
                let currentDay = currentDate.getDay() - 1;
                currentDay = currentDay === -1 ? 6: currentDay;

                let dateShift = i - currentDay;
                
                currentDate.setDate(currentDate.getDate() + dateShift);

                formDate = currentDate.getFullYear();
                formDate += '-';
                formDate += (currentDate.getMonth() + 1) <= 9 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
                formDate += '-';
                formDate += currentDate.getDate() <= 9 ? '0' + currentDate.getDate() : currentDate.getDate();


                store.queryRecord('task', { date: formDate, teamIndex: teamIndex }).then(function(task) {
                    task.forEach(function (element) {
                        tasks.push(element);  
                    });                                     
                });
            }

            console.log(`Список задач на неделю для бригады ${teamIndex}`, tasks);
            this.setProperties({
                taskList: tasks
            });       
        }
    }
});

