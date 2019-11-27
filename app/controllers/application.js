import Ember from 'ember';
import dateForm from '../utils/date-form';
import dateShift from '../utils/date-shift';
import dateNullable from '../utils/date-nullable';

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
    isTasksCreated: false,
    
    actions: {
        showTable() {
            

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

        createTasks() {
            this.setProperties({
                isShowTable: false
            });

            let teamIndex = document.getElementById('add-team-id').value;

            let date = new Date(document.getElementById('add-date').value);
            date = dateNullable(date);

            let tasks = [];

            let store = this.store;
            for (let i = 0; i < 7; i++) {                
                let currentDate = dateShift(i, date);
                let formDate = dateForm(currentDate);

                store.queryRecord('task', { date: formDate, teamIndex: teamIndex }).then(function(task) {
                    task.forEach(function (element) {
                        tasks.push(element);  
                    });                                     
                });
            }
            this.setProperties({
                taskList: tasks,
                isTasksCreated: true
            });       
        },

        changeData() {
            this.setProperties({
                isTasksCreated: false,
                isShowTable: false
            }); 
        }
    }
});