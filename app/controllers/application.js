import Ember from 'ember';
import dateForm from '../utils/date-form';
import dateShift from '../utils/date-shift';
import dateNullable from '../utils/date-nullable';

export default Ember.Controller.extend({
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
    freeTaskList: '',
    taskCount: '',
    isTasksCreated: false,
    isnotTableTask: false,
    isTableTask: true,

    shiftOptions: '',
    errors: [],
    isShowButtons: false,
    errorsStyle: 'form-header-errors_none',
    
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
            let dates = [];

            for (let i = 0; i < 7; i++) {
                let currentDate = dateShift(i, date);
                let formDate = dateForm(currentDate);
                let content = {};
                content['date'] = formDate;
                content['count'] = 0;
                dates.push(content);
            }

            let selectedTasks = [];
            let nonSelectedTasks = [];

            let store = this.store;
            let context = this;
            for (let i = 0; i < 7; i++) {                
                let currentDate = dateShift(i, date);
                let formDate = dateForm(currentDate);

                store.queryRecord('task', { date: formDate, teamIndex: teamIndex }).then((task) => {
                    task.forEach(function (element) {
                        let date = element.get('date');
                        for (let i = 0; i < 7; i++) {
                            dates[i].count = dates[i].date === date ? dates[i].count + 1 : dates[i].count;
                        }
                        selectedTasks.push(element);
                        
                        let team = element.get('team');
                        context.setProperties({
                            shiftOptions: {
                                start: team.get('shiftStart').hours,
                                end: team.get('shiftEnd').hours
                            }
                        });
                    });                                     
                });
            }

            store.queryRecord('task', { teamIndex: '' }).then(function(task) {
                task.forEach(function (element) {
                   let id = element.get('id');
                   nonSelectedTasks.push(element);  
                });                                  
            });

            this.setProperties({
                taskList: selectedTasks,
                freeTaskList: nonSelectedTasks,
                taskCount: dates,
                isTasksCreated: true
            });       
        },
});