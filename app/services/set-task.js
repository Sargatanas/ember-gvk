import Ember from 'ember';

export default Ember.Service.extend({
    setTask(task, date, hour) {
        let rows = document.getElementsByClassName(`query-hour-${hour}`);

        let formDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
        for(let i = 0; i < rows.length; i++) {
            if (rows[i].dataset.name === formDate) {
                console.log(rows[i])
            }
        }
    }

});
