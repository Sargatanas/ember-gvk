export function getDateString(params) {
    let date = getDate(params[0]);

    let fullDate = date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();
    fullDate += '.';
    fullDate += (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    fullDate += '.';
    fullDate += date.getFullYear();

    return fullDate;
};

function getDate(index) {
    let currentDate = new Date();

    currentDate.setHours(0);
    currentDate.setMinutes(0);
    currentDate.setSeconds(0);
    currentDate.setMilliseconds(0);

    let currentDay = currentDate.getDay() - 1;
    currentDay = currentDay === -1 ? 6: currentDay;

    let dateShift = index - currentDay;
    
    currentDate.setDate(currentDate.getDate() + dateShift);

    return currentDate;
};

export default Ember.Helper.helper(getDateString);