import { ValidateForm } from "react-admin";

const validateEntity: ValidateForm = async (values) => {
  const errors: Record<string, string> = {};
  if (values.endDate <= values.startDate && values.endDate) {
    errors.endDate = "End Date can't be previous or equals to Start Date";
  }

  if (values.ptoEndDate < values.ptoStartDate) {
    errors.ptoEndDate = "End Date can't be previous Start Date";
  }
  return errors;
};

export default validateEntity;
