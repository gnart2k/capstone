export function datesAreInSameDay(date1: Date, date2: Date) {
  // Set both dates to the same time to ignore the time component

  let startDate = new Date(date1)
  let endDate = new Date(date2)

  // date1.setHours(0, 0, 0, 0);
  // date2.setHours(0, 0, 0, 0);
  // // Get the difference between the two dates in milliseconds
  // const diffInMilliseconds = Math.abs(date1.getTime() - date2.getTime());
  //
  // // Number of milliseconds in a day
  // const millisecondsInDay = 24 * 60 * 60 * 1000;
  //
  // Check if the difference is less than or equal to the number of milliseconds in a day
  // return diffInMilliseconds <= millisecondsInDay;
  const result = startDate.getFullYear() === endDate.getFullYear() &&
    startDate.getMonth() === endDate.getMonth() &&
    startDate.getDate() === endDate.getDate()

  return (
    result
  );

}

