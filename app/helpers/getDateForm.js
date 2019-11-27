import Ember from 'ember';
import dateForm from '../utils/date-form';

export function getDateForm(params) {
    let date = params[0];
    return dateForm(date);
}

export default Ember.Helper.helper(getDateForm);