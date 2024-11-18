export function convertDateFormat(input: any) {
  if (!input) return '';
  const parts = input.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
  if (!parts) throw new Error('Invalid date format');
  const day = parts[1];
  const month = parts[2];
  const year = parts[3];
  const hours = parts[4];
  const minutes = parts[5];
  const seconds = parts[6];
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

export function convertDateObject(input: any) {
  if (!input) return '';
  const parts = input.match(/(\d{2})\/(\d{2})\/(\d{4}) (\d{2}):(\d{2}):(\d{2})/);
  if (!parts) throw new Error('Invalid date format');
  const day = parts[1];
  const month = parts[2] - 1;
  const year = parts[3];
  const hours = parts[4];
  const minutes = parts[5];
  const seconds = parts[6];
  return new Date(year, month, day, hours, minutes, seconds);
}

export function calculateAge(dateString: string): number {
  // Chuyển chuỗi ngày sinh sang Date object
  const birthDate = new Date(convertDateFormat(dateString));
  const today = new Date();
  // Tính số năm chênh lệch giữa năm hiện tại và năm sinh
  let age = today.getFullYear() - birthDate.getFullYear();
  // Kiểm tra xem tháng/ngày của năm hiện tại có trùng hoặc vượt quá tháng/ngày của năm sinh không
  const monthDifference = today.getMonth() - birthDate.getMonth();
  const dayDifference = today.getDate() - birthDate.getDate();
  // Điều chỉnh tuổi nếu sinh nhật của người đó chưa đến trong năm nay
  if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
    age--;
  }
  return age;
}

export function calculateAgeInMonthsOrYears(dateString: string): number {
  const ageInYears = calculateAge(dateString);
  if (ageInYears <= 3) {
    const birthDate = new Date(convertDateFormat(dateString));
    const today = new Date();
    let months = ageInYears * 12 + today.getMonth() - birthDate.getMonth();
    if (today.getDate() < birthDate.getDate()) {
      months--;
    }
    return months;
  } else {
    return ageInYears;
  }
}

export function getAgeUnit(dateString: string): string {
  const ageInYears = calculateAge(dateString);
  return ageInYears <= 3 ? 'Month' : 'Age';
}

export function calculateDayFromDateRange(fromDate: any, toDate: any): number {
  let from = fromDate ? new Date(convertDateFormat(fromDate)) : new Date();
  let to = toDate ? new Date(convertDateFormat(toDate)) : new Date();
  const diffTime = to.getTime() - from.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function extractYear(birthDate: string): number {
  const datePart = birthDate.split(' ')[0];
  const [day, month, year] = datePart.split('/');
  return parseInt(year, 10);
}
