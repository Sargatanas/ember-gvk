import Ember from 'ember';
import dateForm from '../utils/date-form';
import dateShift from '../utils/date-shift';
import dateNullable from '../utils/date-nullable';
import dateString from '../utils/date-string';
import dateStringToForm from '../utils/data-string-to-form';

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

    teamList: [],
    taskList: [],
    freeTaskList: [],

    taskCount: '',
    isTasksCreated: false,

    shiftOptions: '',
    errors: {
        team: [],
        date: []
    },
    currentDateString: '',
    isShowButtons: false,
    errorsStyle: 'form-header-errors_none',

    inputTeamId: '',
    inputDate: '',
    
    actions: {
        validateInputs() {
            let teamIndex = this.get('inputTeamId');
            
            let date = this.get('inputDate');
            let reg = /\d\d[.]\d\d[.]\d\d\d\d$/;
            date = date.match(reg) ? dateStringToForm(date): date;
            date = new Date(date);

            this.setProperties({
                isShowButtons: false,
                isTasksCreated: false,
                isShowTable: false,
                errorsStyle: '',
                currentDateString: ''
            }); 

            let teamErrors = [];
            let dateErrors = [];
            let errorElement = {
                name: '',
                error: ''
            }

            if (!teamIndex) {
                errorElement.name = 'add-team-id';
                errorElement.content = 'Введите номер бригады';   
                teamErrors.push(errorElement);
                errorElement = {
                    name: '',
                    error: ''
                }             
            } else if (isNaN(teamIndex) || (Number(teamIndex) < 1)) {
                errorElement.name = 'add-team-id';
                errorElement.content = 'Номер бригады должен выражаться положительным целым числом';   
                teamErrors.push(errorElement);
                errorElement = {
                    name: '',
                    error: ''
                } 
            }

            if ((String(date) === 'Invalid Date') || !date || (Number(date) < 0)) {
                errorElement.name = 'add-date';
                errorElement.content = 'Введите корректную дату';
                dateErrors.push(errorElement);
                errorElement = {
                    name: '',
                    error: ''
                }   
            } else {
                date = new Date(date);
                this.setProperties({
                    currentDateString: `(${dateString(date)})`,
                    date: {
                        id: date.getDay() - 1,
                        value: date
                    }                    
                }); 
            }

            let context = this;
            this.store.queryRecord('team', { index: teamIndex }).then((team) => {
                if (team.length === 0) {
                    errorElement.name = 'add-team-id';
                    errorElement.content = 'Бригады с таким номером не существует';   
                    teamErrors.push(errorElement);
                    errorElement = {
                        name: '',
                        error: ''
                    }     
                }

                this.setProperties({
                    errors: {
                        team: teamErrors,
                        date: dateErrors
                    }
                });

                if ((dateErrors.length === 0) && (teamErrors.length === 0)) {
                    this.setProperties({
                        isShowButtons: true
                    });
                    this.createTask();
                }
            });            
        },

        setDefaulData() {
            this.setProperties({
                isShowButtons: true,
                inputTeamId: '101',
                inputDate: '26.11.2019',
                date: {
                    id: new Date('2019-11-26').getDay() - 1,
                    value: new Date('2019-11-26')
                } 
            });
            this.createTask();
        }
    },

    createTask() {
        this.setProperties({
            isShowTable: false
        });

        let teamIndex = this.get('inputTeamId');

        let date = this.get('date').value;
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

        let currentTeam = [];
        let selectedTasks = [];
        let nonSelectedTasks = [];

        let store = this.store;
        let context = this;

        store.queryRecord('team', { index: teamIndex }).then((team) => {
            team.forEach(function (element) {
                currentTeam.push(element);
            }); 
            context.setProperties({
                teamList: currentTeam
            });
            
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
                context.setProperties({
                    isTasksCreated: true,
                    freeTaskList: nonSelectedTasks,
                    taskList: selectedTasks,
                    taskCount: dates
                });
                context.showTable();                                  
            });         
        }); 
    },

    showTable() {
        let newDate = this.get('date').value;

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
});