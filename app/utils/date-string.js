import dateForm from './date-form';

export default function dateString(date) {
  let currentDate = new Date(dateForm(date));

  let  dateString = currentDate.getDate() <= 9 ? '0' + currentDate.getDate() : currentDate.getDate();
  dateString += '.';
  dateString += (currentDate.getMonth() + 1) <= 9 ? '0' + (currentDate.getMonth() + 1) : (currentDate.getMonth() + 1);
  dateString += '.';
  dateString += currentDate.getFullYear();
  
  return  dateString;
}
