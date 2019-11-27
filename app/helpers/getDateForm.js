export function getDateForm(params) {
    let date = params[0].getFullYear() + '-' + (params[0].getMonth() + 1) + '-' + params[0].getDate();
    date = new Date(date);
    
    let formDate = date.getFullYear();
    formDate += '-';
    formDate += (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    formDate += '-';
    formDate += date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();

    return formDate;
};

export default Ember.Helper.helper(getDateForm);