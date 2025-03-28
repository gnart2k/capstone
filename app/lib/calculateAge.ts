export default function calculateAge(birthDate: string | Date): string {
  // If birthDate is a string, convert it to a Date object
  if (!birthDate) {
    return '';
  }
  let birthDateObj: Date;
  if (typeof birthDate === 'string') {
    birthDateObj = new Date(birthDate);
  } else {
    birthDateObj = birthDate;
  }

  // Get the current date
  const today = new Date();

  // Calculate the difference in years
  let age = today.getFullYear() - birthDateObj.getFullYear();

  // Adjust age if the birth date has not occurred yet this year
  const monthDifference = today.getMonth() - birthDateObj.getMonth();
  const dayDifference = today.getDate() - birthDateObj.getDate();

  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age -= 1;
  }

  return age + '';
}

