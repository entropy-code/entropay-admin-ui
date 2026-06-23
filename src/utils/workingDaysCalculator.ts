/**
 * Utilities for calculating working days excluding weekends and holidays
 */

export const toIsoDate = (date: Date): string => date.toISOString().split("T")[0];

export const toUtcDateOnly = (value: Date | string | undefined | null): Date | null => {
  if (!value) {
    return null;
  }

  if (value instanceof Date) {
    return new Date(Date.UTC(value.getFullYear(), value.getMonth(), value.getDate()));
  }

  const datePart = String(value).split("T")[0];
  if (!datePart) {
    return null;
  }

  const [year, month, day] = datePart.split("-").map(Number);
  if (!year || !month || !day) {
    return null;
  }

  return new Date(Date.UTC(year, month - 1, day));
};

export const getDateRangeByPeriod = (
  period?: string,
  year?: number
): { start: Date; end: Date } | null => {
  if (!period) {
    return null;
  }

  const targetYear = year ?? new Date().getFullYear();

  switch (period) {
    case "last_month": {
      const now = new Date();
      const currentMonth = now.getMonth();
      const start = new Date(targetYear, currentMonth - 1, 1);
      const end = new Date(targetYear, currentMonth, 0);
      return { start, end };
    }
    case "this_month": {
      const now = new Date();
      const currentMonth = now.getMonth();
      const start = new Date(targetYear, currentMonth, 1);
      const end = new Date(targetYear, currentMonth + 1, 0);
      return { start, end };
    }
    case "last_year": {
      const start = new Date(targetYear - 1, 0, 1);
      const end = new Date(targetYear - 1, 11, 31);
      return { start, end };
    }
    case "this_year": {
      const start = new Date(targetYear, 0, 1);
      const end = new Date(targetYear, 11, 31);
      return { start, end };
    }
    default:
      return null;
  }
};

export const getFilterRange = (
  filterValues: Record<string, any>
): { start: Date; end: Date } | null => {
  const directDateFrom = filterValues?.dateFrom;
  const directDateTo = filterValues?.dateTo;
  const period = filterValues?.period;
  const customStartDate = filterValues?.startDate;
  const customEndDate = filterValues?.endDate;
  const year = Number(filterValues?.year ?? new Date().getFullYear());

  // Current PTO filters use dateFrom/dateTo directly.
  if (directDateFrom || directDateTo) {
    const normalizedFrom = toUtcDateOnly(directDateFrom ?? directDateTo);
    const normalizedTo = toUtcDateOnly(directDateTo ?? directDateFrom);

    if (!normalizedFrom || !normalizedTo) {
      return null;
    }

    return normalizedFrom <= normalizedTo
      ? { start: normalizedFrom, end: normalizedTo }
      : { start: normalizedTo, end: normalizedFrom };
  }

  if (period === "custom" && customStartDate && customEndDate) {
    const customStart = toUtcDateOnly(customStartDate);
    const customEnd = toUtcDateOnly(customEndDate);
    if (!customStart || !customEnd) {
      return null;
    }
    return {
      start: customStart,
      end: customEnd,
    };
  }

  if (period && period !== "custom") {
    const range = getDateRangeByPeriod(period, year);
    if (!range) {
      return null;
    }

    const rangeStart = toUtcDateOnly(range.start);
    const rangeEnd = toUtcDateOnly(range.end);
    if (!rangeStart || !rangeEnd) {
      return null;
    }

    return {
      start: rangeStart,
      end: rangeEnd,
    };
  }

  // If no period but year is selected, use full year as filter range
  if (!period && filterValues?.year) {
    const range = getDateRangeByPeriod("this_year", year);
    if (!range) {
      return null;
    }

    const rangeStart = toUtcDateOnly(range.start);
    const rangeEnd = toUtcDateOnly(range.end);
    if (!rangeStart || !rangeEnd) {
      return null;
    }

    return {
      start: rangeStart,
      end: rangeEnd,
    };
  }

  return null;
};

export const calculateWorkingDays = (
  startDate: Date | string | undefined | null,
  endDate: Date | string | undefined | null,
  filterValues: Record<string, any>,
  holidayDateSet: Set<string>
): number => {
  if (!startDate || !endDate) {
    return 0;
  }

  const start = toUtcDateOnly(startDate);
  const end = toUtcDateOnly(endDate);

  if (!start || !end) {
    return 0;
  }

  const selectedRange = getFilterRange(filterValues);

  const filterStart = selectedRange ? selectedRange.start : start;
  const filterEnd = selectedRange ? selectedRange.end : end;

  // Calculate intersection
  const intersectionStart = new Date(Math.max(start.getTime(), filterStart.getTime()));
  const intersectionEnd = new Date(Math.min(end.getTime(), filterEnd.getTime()));

  // If no overlap
  if (intersectionStart > intersectionEnd) {
    return 0;
  }

  let workingDays = 0;
  const cursor = new Date(intersectionStart);

  while (cursor <= intersectionEnd) {
    const dayOfWeek = cursor.getUTCDay();
    const isoDate = toIsoDate(cursor);
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const isHoliday = holidayDateSet.has(isoDate);

    if (!isWeekend && !isHoliday) {
      workingDays += 1;
    }

    cursor.setUTCDate(cursor.getUTCDate() + 1);
  }

  return workingDays;
};
