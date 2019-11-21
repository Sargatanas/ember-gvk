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

