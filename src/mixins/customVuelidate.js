export const firstNumIsSeven = (val) => val[0] === '7';
export const correctDayInMonth = (year, month) => (day) => {
  if (['january', 'march', 'may', 'july', 'august', 'october', 'december'].includes(month)) {
    return day <= 31;
  }
  if (['april', 'june', 'september', 'august', 'november'].includes(month)) {
    return day <= 30;
  }
  if (year % 4 === 0 && month === 'february') return day <= 29;
  return day <= 28;
};
