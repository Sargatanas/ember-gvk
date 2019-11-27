import getDateForm from './date-form';

export default function dateNullable(date) {
  let currentDate = new Date(getDateForm(date));

  currentDate.setHours(0);
  currentDate.setMinutes(0);
  currentDate.setSeconds(0);
  currentDate.setMilliseconds(0);

  return currentDate;
}
