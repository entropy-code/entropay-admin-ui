import * as React from "react";
import ViewForm from "./components/forms/ViewForm";

const formData = [
  {
    title: "Summary Information",
    inputsList: [
      {
        name: "Employee",
        type: "selectInput",
        referenceValues: {
          source: "employeeId",
          reference: "employees",
          optionText: null,
          multiselect: false,
          required: true,
          disabledCheck: () => true,
        },
      },
      { name: "createdAt", type: "date", required: true },
      { name: "summary", type: "string", required: true },
    ],
  },
];

export const FeedbackSummaryView = () => (
  <ViewForm formData={formData} title="Feedback Summary" resource="feedback-summary" />
);
