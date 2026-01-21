import * as React from "react";
import {
  FunctionField,
  EditButton,
  useLocaleState,
} from "react-admin";
import { Avatar, Box, Typography, SxProps, Theme, IconButton, Tooltip } from "@mui/material";
import { ContentCopy } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { HasPermissions } from "./layout/CustomActions";

interface EmployeeProfileHeaderProps {
  vacationAvailableDays: number;
}

// Shared styles
const metricBoxSx: SxProps<Theme> = {
  height: 80,
  display: "flex",
  flexDirection: "column",
};

const labelSx: SxProps<Theme> = {
  textTransform: "uppercase",
  fontWeight: 600,
  mb: 0.5,
  fontSize: "0.7rem",
};

const largeValueSx: SxProps<Theme> = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  fontWeight: 700,
};

// Helper function to format tenure
const formatTenure = (timeSinceStart: string | undefined): string => {
  if (!timeSinceStart) return "-";

  // Convert "2 years, 10 months" to "2y 10m"
  return timeSinceStart
    .replace(/\s*years?/gi, "y")
    .replace(/\s*months?/gi, "m")
    .replace(/,\s*/g, " ");
};

// Reusable metric box component
interface MetricBoxProps {
  label: string;
  value: React.ReactNode;
  minWidth?: number;
  valueColor?: string;
}

const MetricBox: React.FC<MetricBoxProps> = ({ label, value, minWidth = 100, valueColor }) => (
  <Box sx={{ ...metricBoxSx, minWidth }}>
    <Typography variant="caption" color="text.secondary" sx={labelSx}>
      {label}
    </Typography>
    <Typography variant="h4" sx={{ ...largeValueSx, color: valueColor }}>
      {value}
    </Typography>
  </Box>
);

export const EmployeeProfileHeader: React.FC<EmployeeProfileHeaderProps> = ({
  vacationAvailableDays,
}) => {
  const { palette } = useTheme();
  const [locale] = useLocaleState();

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 4,
        p: 2,
        bgcolor: palette?.mode === "dark" ? "background.paper" : "#fafafa",
        borderRadius: 1,
      }}
    >
      {/* Avatar with initials */}
      <FunctionField
        label=""
        render={(record) => (
          <Avatar
            sx={{
              width: 56,
              height: 56,
              bgcolor: "#3f51b5",
              fontSize: "1.25rem",
              fontWeight: 600,
              mt: 1,
            }}
          >
            {record.firstName?.[0]?.toUpperCase() || ""}
            {record.lastName?.[0]?.toUpperCase() || ""}
          </Avatar>
        )}
      />

      {/* Name and Email */}
      <Box sx={{ ...metricBoxSx, minWidth: 220, justifyContent: "center" }}>
        <FunctionField
          label=""
          render={(record) => (
            <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.2, mb: 0.5 }}>
              {record.firstName} {record.lastName}
            </Typography>
          )}
        />
        <FunctionField
          label=""
          render={(record) => (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
          render={(record) => {
            const labourEmail = record?.labourEmail ?? "-";
            const canCopy = !!record?.labourEmail;

            return (
              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontSize: "0.875rem" }}
                >
                  {labourEmail}
                </Typography>
                <Tooltip title="Copy email">
                  <IconButton
                    size="small"
                    disabled={!canCopy}
                    onClick={() => {
                      if (record?.labourEmail) {
                        navigator.clipboard.writeText(record.labourEmail);
                      }
                    }}
                    sx={{ padding: 0.25 }}
                  >
                    <ContentCopy sx={{ fontSize: "0.875rem" }} />
                  </IconButton>
                </Tooltip>
              </Box>
            );
          }}
        />
      </Box>

      {/* Rate */}
      <FunctionField
        label=""
        render={(record) => (
          <MetricBox
            label="Rate"
            value={`$${record.rate || 0}/h`}
            minWidth={110}
          />
        )}
      />

      {/* Salary */}
      <FunctionField
        label=""
        render={(record) => (
          <MetricBox
            label="Salary"
            value={`$${(record.salary || 0).toLocaleString()}`}
            minWidth={130}
          />
        )}
      />

      {/* Margin */}
      <FunctionField
        label=""
        render={(record) => {
          const marginColor = record.margin && record.margin >= 30 ? "#4caf50" : "#f44336";
          return (
            <MetricBox
              label="Margin"
              value={record.margin ? `${record.margin}%` : "-"}
              minWidth={100}
              valueColor={marginColor}
            />
          );
        }}
      />

      {/* Tenure */}
      <Box sx={{ ...metricBoxSx, minWidth: 180 }}>
        <Typography variant="caption" color="text.secondary" sx={labelSx}>
          Tenure
        </Typography>
        <FunctionField
          label=""
          render={(record) => (
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <Typography variant="h5" fontWeight={700} sx={{ lineHeight: 1.3 }}>
                {formatTenure(record.timeSinceStart)}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                {record.startDate ? `Since ${new Date(record.startDate).toLocaleDateString(locale, {
                  month: "numeric",
                  day: "numeric",
                  year: "2-digit",
                })}` : ""}
              </Typography>
            </Box>
          )}
        />
      </Box>

      {/* Vacation Days */}
      <MetricBox
        label="Vacation"
        value={`${vacationAvailableDays} Days`}
        minWidth={120}
      />

      {/* Edit Button */}
      <Box sx={{ ml: "auto", mt: 2.5 }}>
        {HasPermissions("employees", "update") && <EditButton />}
      </Box>
    </Box>
  );
};
