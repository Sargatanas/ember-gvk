export function formDate(date) {
    let formDate = date.getFullYear();
    formDate += '-';
    formDate += (date.getMonth() + 1) <= 9 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
    formDate += '-';
    formDate += date.getDate() <= 9 ? '0' + date.getDate() : date.getDate();

    return formDate;
}