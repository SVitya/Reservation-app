export function closestHour() {
    return new Date().getHours() + 1;
}

export function currentDate() {
    return dateFormatting(new Date());
}

export function tomorrowDate() {
    return dateFormatting(new Date(new Date().getTime() + 24 * 60 * 60 * 1000));
}

function dateFormatting(date) {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = '' + date.getDate();

    if (month.toString.length < 2) {
        month = '0' + month;
    }
    if (day.length < 2) {
        day = '0' + day;
    }
    
    return `${year}-${month}-${day}`;
}