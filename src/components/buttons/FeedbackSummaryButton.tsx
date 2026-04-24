import * as React from "react";
import {
  Button,
  useNotify,
  useRefresh,
  useDataProvider,
  Confirm,
  useGetManyReference,
  useGetRecordId,
  useListContext,
} from "react-admin";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

const canGenerateSummary = (
  feedbackList: any[],
  summaryList: any[]
): boolean => {

  if (!feedbackList || feedbackList.length === 0) {
    return false;
  }

  if (!summaryList || summaryList.length === 0) {
    return true;
  }


  const latestSummary = summaryList[0];
  const latestSummaryDate = new Date(latestSummary.createdAt);

  const hasNewerFeedback = feedbackList.some((feedback) => {
    const feedbackDate = new Date(feedback.modifiedAt);
    return feedbackDate > latestSummaryDate;
  });

  return hasNewerFeedback;
};

export const FeedbackSummaryButton: React.FC = () => {
  const employeeId = useGetRecordId();
  const notify = useNotify();
  const refresh = useRefresh();
  const dataProvider = useDataProvider();
  const [showConfirm, setShowConfirm] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { data: summaryList = [] } = useListContext();

  const { data: feedbackList = [] } = useGetManyReference("feedback/employee", {
    target: "employeeId",
    id: employeeId,
    sort: { field: "modifiedAt", order: "DESC" },
  });

  const canGenerate = canGenerateSummary(feedbackList, summaryList);

  const handleGenerateSummary = async () => {
    try {
      setLoading(true);
      await dataProvider.create(
        `feedback-summary/employee/${employeeId}/generate`,
        {
          data: {},
        }
      );
      notify("Summary generated successfully", { type: "success" });
      refresh();
    } catch (error: any) {
      notify("Error generating summary", { type: "error" });
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <>
      <Button
        label={loading ? "Generating..." : "Generate Summary"}
        onClick={() => setShowConfirm(true)}
        disabled={!canGenerate || loading}
        style={{
          opacity: !canGenerate || loading ? 0.5 : 1,
        }}
      >
        <AutoAwesomeIcon />
      </Button>
      <Confirm
        isOpen={showConfirm}
        title="Confirm Summary Generation"
        content="Are you sure you want to generate a new feedback summary?"
        onConfirm={handleGenerateSummary}
        onClose={() => setShowConfirm(false)}
      />
    </>
  );
};
