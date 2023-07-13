import { Dayjs } from 'dayjs';

function addBeginningZero(dateNumber: number): string {
  return dateNumber.toString().padStart(2, '0');
}

export function configDate(date: Dayjs | null | undefined): string {
  if (!date) {
    return '';
  }

  return `${addBeginningZero(date.date())}/${addBeginningZero(
    date.month() + 1
  )}/${addBeginningZero(date.year())}`;
}

export function configHour(hour: Dayjs | null | undefined): string {
  if (!hour) {
    return '';
  }

  return `${addBeginningZero(hour.hour())}:${addBeginningZero(hour.minute())}`;
}
