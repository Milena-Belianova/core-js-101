/* *******************************************************************************************
 *                                                                                           *
 * Please read the following tutorial before implementing tasks:                              *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#Date_object
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date     *
 *                                                                                           *
 ******************************************************************************************* */


/**
 * Parses a rfc2822 string date representation into date value
 * For rfc2822 date specification refer to : http://tools.ietf.org/html/rfc2822#page-14
 *
 * @param {string} value
 * @return {date}
 *
 * @example:
 *    'December 17, 1995 03:24:00'    => Date()
 *    'Tue, 26 Jan 2016 13:48:02 GMT' => Date()
 *    'Sun, 17 May 1998 03:00:00 GMT+01' => Date()
 */
function parseDataFromRfc2822(value) {
  return Date.parse(value);
}

/**
 * Parses an ISO 8601 string date representation into date value
 * For ISO 8601 date specification refer to : https://en.wikipedia.org/wiki/ISO_8601
 *
 * @param {string} value
 * @return {date}
 *
 * @example :
 *    '2016-01-19T16:07:37+00:00'    => Date()
 *    '2016-01-19T08:07:37Z' => Date()
 */
function parseDataFromIso8601(value) {
  return Date.parse(value);
}


/**
 * Returns true if specified date is leap year and false otherwise
 * Please find algorithm here: https://en.wikipedia.org/wiki/Leap_year#Algorithm
 *
 * @param {date} date
 * @return {bool}
 *
 * @example :
 *    Date(1900,1,1)    => false
 *    Date(2000,1,1)    => true
 *    Date(2001,1,1)    => false
 *    Date(2012,1,1)    => true
 *    Date(2015,1,1)    => false
 */
function isLeapYear(date) {
  const year = date.getFullYear();
  return ((year % 4 === 0 && year % 100 !== 0)
  || (year % 4 === 0 && year % 100 === 0 && year % 400 === 0));
}


/**
 * Returns the string representation of the timespan between two dates.
 * The format of output string is "HH:mm:ss.sss"
 *
 * @param {date} startDate
 * @param {date} endDate
 * @return {string}
 *
 * @example:
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,11,0,0)   => "01:00:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,30,0)       => "00:30:00.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,20)        => "00:00:20.000"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,10,0,0,250)     => "00:00:00.250"
 *    Date(2000,1,1,10,0,0),  Date(2000,1,1,15,20,10,453)   => "05:20:10.453"
 */
function timeSpanToString(startDate, endDate) {
  // const dayIn = 1000 * 60 * 60 * 24;

  const startDateMs = startDate.getTime();
  const endDateMs = endDate.getTime();

  let differenceMs = endDateMs - startDateMs;

  const millisec = Math.floor(differenceMs % 1000).toString().padStart(3, 0);
  differenceMs /= 1000;
  const sec = Math.floor(differenceMs % 60).toString().padStart(2, 0);
  differenceMs /= 60;
  const min = Math.floor(differenceMs % 60).toString().padStart(2, 0);
  differenceMs /= 60;
  const hours = Math.floor(differenceMs % 24).toString().padStart(2, 0);

  return `${hours}:${min}:${sec}.${millisec}`;
}


/**
 * Returns the angle (in radians) between the hands of an analog clock
 * for the specified Greenwich time.
 * If you have problem with solution please read: https://en.wikipedia.org/wiki/Clock_angle_problem
 *
 * SMALL TIP: convert to radians just once, before return in order to not lost precision
 *
 * @param {date} date
 * @return {number}
 *
 * @example:
 *    Date.UTC(2016,2,5, 0, 0) => 0
 *    Date.UTC(2016,3,5, 3, 0) => Math.PI/2
 *    Date.UTC(2016,3,5,18, 0) => Math.PI
 *    Date.UTC(2016,3,5,21, 0) => Math.PI/2
 */
function angleBetweenClockHands(date) {
  let h = date.getUTCHours();
  let m = date.getUTCMinutes();

  function min(x, y) {
    return x < y ? x : y;
  }

  if (h === 12) h = 0;
  if (m === 60) {
    m = 0;
    h += 1;
    if (h > 12) h -= 12;
  }
  // Basically:
  // The hour hand moves at the rate of 0.5 degrees per minute
  // The minute hand moves at the rate of of 6 degrees per minute
  // Calculate the angles moved
  // by hour and minute hands
  // with reference to 12:00
  const hourAngle = 0.5 * (h * 60 + m);
  const minuteAngle = 6 * m;

  // Find the difference between two angles
  let angle = Math.abs(hourAngle - minuteAngle) % 360;

  // Return the smaller angle of two possible angles
  angle = min(360 - angle, angle);

  // convert to radians
  return Math.abs(angle * (Math.PI / 180));
}


module.exports = {
  parseDataFromRfc2822,
  parseDataFromIso8601,
  isLeapYear,
  timeSpanToString,
  angleBetweenClockHands,
};
