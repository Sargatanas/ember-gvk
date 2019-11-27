import getDateForm from './date-form';
import getDateNullable from './date-nullable';

export default function dateShift(index, date) {
  let currentDate = new Date(getDateForm(date));
  currentDate = getDateNullable(currentDate);
                
  let currentDay = currentDate.getDay() - 1;
  currentDay = currentDay === -1 ? 6: currentDay;

  let dateShift = index - currentDay;
                
  currentDate.setDate(currentDate.getDate() + dateShift);
  return currentDate;
}
