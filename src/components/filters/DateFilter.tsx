import { Filter, SelectInput } from "react-admin";
import {
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";
import React from "react";

const DateFilter = (props: any) => {
  const handleSelectChange = (event: any) => {
    const newOption = event.target.value === "none" ? null : event.target.value;
    props.setFilter(getDateRange(newOption));
  };

  const getDateRange = (option: any) => {
    const today = new Date();
    switch (option) {
      case "thisWeek":
        return { startDate: startOfWeek(today), endDate: endOfWeek(today) };
      case "thisMonth":
        return { startDate: startOfMonth(today), endDate: endOfMonth(today) };
      case "thisYear":
        return { startDate: startOfYear(today), endDate: endOfYear(today) };
      default:
        return {};
    }
  };

  return (
    <Filter {...props}>
      <SelectInput
        label="Date Filter"
        source="dateRange"
        choices={[
          { id: "none", name: "No Filter" },
          { id: "thisWeek", name: "This Week" },
          { id: "thisMonth", name: "This Month" },
          { id: "thisYear", name: "This Year" },
        ]}
        onChange={handleSelectChange}
      />
    </Filter>
  );
};

export default DateFilter;
