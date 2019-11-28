export default function dataStringToForm(dateString) {
  let date = dateString.slice(0, 2);
  let month = dateString.slice(3, 5);
  let yaer = dateString.slice(6, 10);

  return `${yaer}-${month}-${date}`;
}
