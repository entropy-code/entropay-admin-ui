import { FilterList, FilterListItem } from "react-admin";
import { Card, CardContent, Typography, Divider } from "@mui/material";
import DateIcon from "@mui/icons-material/DateRange";
import React from "react";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
  format,
  subYears,
  subMonths,
  subWeeks,
} from "date-fns";

const getThisWeekFilter = () => {
  const startDate = startOfWeek(new Date());
  const endDate = endOfWeek(new Date());
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getLastWeekFilter = () => {
  const LastWeek = subWeeks(new Date(), 1);
  const startDate = startOfWeek(LastWeek);
  const endDate = endOfWeek(LastWeek);
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getNextWeekFilter = () => {
  const nextWeek = subWeeks(new Date(), -1);
  const startDate = startOfWeek(nextWeek);
  const endDate = endOfWeek(nextWeek);
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getThisMonthFilter = () => {
  const startDate = startOfMonth(new Date());
  const endDate = endOfMonth(new Date());
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getLastMonthFilter = () => {
  const nextMonth = subMonths(new Date(), 1);
  const startDate = startOfMonth(nextMonth);
  const endDate = endOfMonth(nextMonth);
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getNextMonthFilter = () => {
  const nextMonth = subMonths(new Date(), -1);
  const startDate = startOfMonth(nextMonth);
  const endDate = endOfMonth(nextMonth);
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getThisYearFilter = () => {
  const startDate = startOfYear(new Date());
  const endDate = endOfYear(new Date());
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

const getLastYearFilter = () => {
  const lastYear = subYears(new Date(), 1);
  const startDate = startOfYear(lastYear);
  const endDate = endOfYear(lastYear);
  return {
    dateFrom: format(startDate, "yyyy-MM-dd"),
    dateTo: format(endDate, "yyyy-MM-dd"),
  };
};

export const FilterSidebar = () => (
  <Card
    sx={{ order: -1, mr: 2, mt: 9, width: 240, borderRadius: 2, boxShadow: 3 }}
  >
    <CardContent>
      <Typography variant="h6" component="div" gutterBottom>
        Filters
      </Typography>
      <Divider />
      <FilterList label="Date" icon={<DateIcon />}>
        <FilterListItem label="This Month" value={getThisMonthFilter()} />
        <FilterListItem label="Last Month" value={getLastMonthFilter()} />
        <FilterListItem label="Next Month" value={getNextMonthFilter()} />
        <FilterListItem label="This Week" value={getThisWeekFilter()} />
        <FilterListItem label="Last Week" value={getLastWeekFilter()} />
        <FilterListItem label="Next Week" value={getNextWeekFilter()} />
        <FilterListItem label="This Year" value={getThisYearFilter()} />
        <FilterListItem label="Last Year" value={getLastYearFilter()} />
      </FilterList>
    </CardContent>
  </Card>
);
