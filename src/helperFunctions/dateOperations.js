export function dateHourDiff(dateTwo, dateOne) {
  let diff = (dateTwo.getTime() - dateOne.getTime()) / 1000;
  diff /= (60 * 60);
  return Math.abs(Math.round(diff));
}

export function returnDate(date) {
    let month = date.getMonth(), 
        monthText = getMonthText(month),
        day = date.getDate(),
        hour = date.getHours(), 
        hourFormatted = hour % 12 || 12, // hour returned in 24 hour format
        minute = date.getMinutes(), 
        minuteFormatted = minute < 10 ? "0" + minute : minute,
        morning = hour < 12 ? "am" : "pm";

    let out;
    const now = new Date();
    if(compareDates(new Date(date), new Date(now)) == 0) {
        return `Today ${hourFormatted}:${minuteFormatted} ${morning}`;
    } else if (compareDates(new Date(date), new Date(now) == 1)) {
        return `Yesterday ${hourFormatted}:${minuteFormatted} ${morning}`;
    } else {
        return `${day} ${monthText} ${hourFormatted}:${minuteFormatted} ${morning}`;
    }
}

function compareDates(dateOne, dateTwo) {
    if(dateOne.getFullYear() == dateTwo.getFullYear()) {
        if(dateOne.getMonth() == dateTwo.getMonth()) {
            return Math.abs(dateOne.getDate() - dateTwo.getDate());
        } else {
            return 404;
        }
    } else {
        return 404
    } 
}

function getMonthText(month) {
    let out;
    switch(month) {
        case 0: 
            out = 'Jan';
            break;
        case 1: 
            out = 'Feb';
            break;
        case 2: 
            out = 'Mar';
            break;
        case 3: 
            out = 'Apr';
            break;
        case 4: 
            out = 'May';
            break;
        case 5: 
            out = 'Jun';
            break;
        case 6: 
            out = 'Jul';
            break;
        case 7: 
            out = 'Aug';
            break;
        case 8: 
            out = 'Sep';
            break;
        case 9: 
            out = 'Oct';
            break;
        case 10: 
            out = 'Nov';
            break;
        case 11: 
            out = 'Dec';
            break;
        default: 
            break;
    }
    return out;
}

// Today / Yesterday (hh:mm am/pm)
// 2 Aug (hh:mm am/pm)