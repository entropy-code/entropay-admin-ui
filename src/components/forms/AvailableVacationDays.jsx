import { useEffect } from 'react';
import { TextField, useStore  } from 'react-admin'
import { GetVacationsAndAvailableDays } from "../../employeeProfiles";

export default function AvailableVacationDays({ user }) {
  const [ vacations, setVacations ] = useStore('vacations', 'None user selected');
  const { employeeId } = user;
  const { vacationAvailableDays } = GetVacationsAndAvailableDays(employeeId)

  useEffect(() => {
    if(user) setVacations(vacationAvailableDays)
  }, [user, vacationAvailableDays, setVacations])

  return (
    <TextField
      id='vacations-id'
      source='vacations'
      record={{vacations: vacations}}>
    </TextField>
  )
}
