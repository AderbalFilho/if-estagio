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

function configHour(hour: Dayjs | null | undefined): string {
  if (!hour) {
    return '';
  }

  return `${addBeginningZero(hour.hour())}:${addBeginningZero(hour.minute())}`;
}

export function configHourFromTo(
  hourBegin1: Dayjs | null | undefined,
  hourEnd1: Dayjs | null | undefined,
  hourBegin2: Dayjs | null | undefined,
  hourEnd2: Dayjs | null | undefined,
  showAnyway = false
): string {
  if (showAnyway) {
    return showHourAnyway(hourBegin1, hourEnd1, hourBegin2, hourEnd2);
  }

  if (!hourBegin1 || !hourEnd1) {
    return '_____ às _____ e de _____ às _____';
  }

  let hourString = `${configHour(hourBegin1)} às ${configHour(hourEnd1)}`;

  if (hourBegin2 && hourEnd2) {
    hourString += ` e de ${configHour(hourBegin2)} às ${configHour(hourEnd2)}`;
  }

  return hourString;
}

function showHourAnyway(
  hourBegin1: Dayjs | null | undefined,
  hourEnd1: Dayjs | null | undefined,
  hourBegin2: Dayjs | null | undefined,
  hourEnd2: Dayjs | null | undefined
): string {
  let hourString = '';

  hourString += hourBegin1 ? configHour(hourBegin1) : '_____';
  hourString += ' às ';
  hourString += hourEnd1 ? configHour(hourEnd1) : '_____';
  hourString += ' e de ';
  hourString += hourBegin2 ? configHour(hourBegin2) : '_____';
  hourString += ' às ';
  hourString += hourEnd2 ? configHour(hourEnd2) : '_____';

  return hourString;
}
