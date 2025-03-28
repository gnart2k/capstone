/**
 * Converts a time in "HH:MM" format to a float in the form "HH.F"
 * where "F" is the fractional part of the hour.
 * @param time - The time string in "HH:MM" format
 * @returns The time as a float where the minutes are represented as a fraction of an hour.
 */
export function convertTimeToFloat(time: string): number {
  // Split the input string by the colon
  const [hours, minutes] = time.split(":").map(Number);

  // Check if the split values are valid numbers
  if (!(typeof hours === "number" && typeof minutes === "number")) {
    throw new Error("Invalid time format");
  }

  if (time.split(":").some(str => str.length == 0)) {
    throw new Error("Invalid time format");
  }

  if (hours == 24 && minutes == 0) {
    throw new Error("Invalid time format");
  }
  if (isNaN(hours) || isNaN(minutes) || hours < 0 || minutes < 0 || minutes >= 60) {
    throw new Error("Invalid time format");
  }

  // Convert the time to a float with two decimal places for minutes
  const floatTime = hours + minutes / 60.0; // Ensure 60.0 for precise division

  // Return the float directly without using toFixed and parseFloat
  return floatTime;
}


// Example usage:


/**
 * Converts a float in the form "HH.F" back to a time string in "HH:MM" format,
 * ensuring the hours wrap around if they exceed 24.
 * @param floatTime - The float time where the fractional part represents minutes as a fraction of an hour
 * @returns The time string in "HH:MM" format
 */
export function convertFloatToTime(floatTime: number): string {
  const inputTimeString: string = floatTime + ""
  const stringArr = inputTimeString.split(".")

  const hours = stringArr[0].length == 1 ? `0${stringArr[0]}` : `${stringArr[0]}`
  let minutes
  if (stringArr.length < 2) {
    minutes = "00"
  } else {
    minutes = +stringArr[1] * 60 / 10;
  }




  // Format minutes to always have two digits
  const minutesString = minutes.toString().slice(0, 2);

  // Combine hours and minutes into the "HH:MM" format
  const timeString = `${hours}:${minutesString}`;

  return timeString;
}

// Example usage:


