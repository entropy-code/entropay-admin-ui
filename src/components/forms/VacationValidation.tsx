import React from "react";
import { useState, useEffect } from "react";
import { Toolbar, useStore } from "react-admin";
import { useWatch } from "react-hook-form";
import ConfirmButton from "../buttons/ConfirmButton";
import moment from "moment";

export default function VacationValidation() {
  const [visible, setVisible] = useState(false);
  const [daysDiff, setDaysDiff] = useState<number | null>(null);
  const [vacations] = useStore("vacations", 0);

  // TODO: check this watch
  // @ts-ignore
  const employee = useWatch("Employee");

  const datePtoStartTime = moment(employee?.ptoStartDate);
  const datePtoEndTime = moment(employee?.ptoEndDate);

  const calculateCleanDaysDiff = (
    startDate: moment.Moment,
    endDate: moment.Moment
  ) => {
    let days = 0;
    for (let i = 0; i <= endDate.dayOfYear() - startDate.dayOfYear(); i++) {
      if (
        moment()
          .dayOfYear(startDate.dayOfYear() + i)
          .day() >= 1 &&
        moment()
          .dayOfYear(startDate.dayOfYear() + i)
          .day() <= 5
      ) {
        days++;
      }
    }
    setDaysDiff(days);
  };

  useEffect(() => {
    if (vacations && datePtoEndTime.diff(datePtoStartTime, "days") >= 1) {
      calculateCleanDaysDiff(datePtoStartTime, datePtoEndTime);
    }

    if (daysDiff && vacations - daysDiff < 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [employee, datePtoStartTime, datePtoEndTime, daysDiff, vacations]);

  return !visible ? (
    <Toolbar />
  ) : (
    <Toolbar>
      <ConfirmButton
        daysRequested={daysDiff || 0}
        employeeData={employee}
        daysAvailable={vacations}
      />
    </Toolbar>
  );
}