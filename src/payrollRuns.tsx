import * as React from "react";
import {
  Datagrid,
  DateField,
  Edit,
  Identifier,
  List,
  NumberField,
  NumberInput,
  RaRecord,
  SimpleForm,
  TextField,
  TextInput,
  TopToolbar,
  useDataProvider,
  useGetOne,
  useNotify,
  useRecordContext,
  useRedirect,
  useRefresh,
} from "react-admin";
import { useNavigate, useParams } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import PaymentsIcon from "@mui/icons-material/Payments";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import ReplayIcon from "@mui/icons-material/Replay";
import { exporter } from "./utils/exporter";
import { usePayrollRunStatus } from "./hooks/usePayrollRunStatus";

const STATUS_COLORS: Record<string, "default" | "info" | "warning" | "success" | "error"> = {
  RUNNING: "info",
  DRAFT: "default",
  APPROVED: "success",
  CLOSED: "default",
  FAILED: "error",
};

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

// ---------- List screen + trigger dialog ---------------------------------------------------------

const TriggerDialog: React.FC<{
  open: boolean;
  onClose: () => void;
  onTriggered: (newRunId: string) => void;
}> = ({ open, onClose, onTriggered }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const today = new Date();
  const [year, setYear] = React.useState<number>(today.getFullYear());
  const [month, setMonth] = React.useState<number>(today.getMonth() + 1);
  const [submitting, setSubmitting] = React.useState(false);

  const trigger = async () => {
    setSubmitting(true);
    try {
      const period = `${year}-${String(month).padStart(2, "0")}-01`;
      const response = await dataProvider.create("payroll-runs", { data: { period } });
      notify("Payroll run started", { type: "success" });
      onTriggered((response.data as any).id);
      onClose();
    } catch (e: any) {
      notify(`Could not start payroll run: ${e?.message ?? "unknown error"}`, { type: "error" });
    } finally {
      setSubmitting(false);
    }
  };

  const yearOptions = React.useMemo(() => {
    const options: number[] = [];
    for (let y = today.getFullYear() + 1; y >= today.getFullYear() - 4; y--) options.push(y);
    return options;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Run Payroll Liquidation</DialogTitle>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <Stack direction="row" spacing={2}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select label="Year" value={year} onChange={e => setYear(Number(e.target.value))}>
                {yearOptions.map(y => <MenuItem key={y} value={y}>{y}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select label="Month" value={month} onChange={e => setMonth(Number(e.target.value))}>
                {MONTHS.map((name, idx) => <MenuItem key={idx} value={idx + 1}>{name}</MenuItem>)}
              </Select>
            </FormControl>
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={submitting}>Cancel</Button>
        <Button onClick={trigger} variant="contained" disabled={submitting}>
          {submitting ? "Starting…" : "Liquidar Sueldos"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const PayrollRunsListActions: React.FC<{ onClickTrigger: () => void }> = ({ onClickTrigger }) => (
  <TopToolbar>
    <Button startIcon={<PaymentsIcon />} onClick={onClickTrigger} variant="contained">
      Liquidar Sueldos
    </Button>
  </TopToolbar>
);

const StatusChip: React.FC = () => {
  const record = useRecordContext();
  if (!record) return null;
  return (
    <Chip
      label={record.status}
      color={STATUS_COLORS[record.status as string] || "default"}
      size="small"
    />
  );
};

const isAdmin = (): boolean => {
  try {
    const cfg = JSON.parse(localStorage.getItem("config") || "{}");
    return cfg?.role === "ROLE_ADMIN";
  } catch {
    return false;
  }
};

const RowActions: React.FC = () => {
  const record = useRecordContext();
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const navigate = useNavigate();
  const [busy, setBusy] = React.useState(false);

  if (!record) return null;

  const admin = isAdmin();
  const status = record.status as string;
  const canDelete = status === "DRAFT" || status === "FAILED"
    || (admin && (status === "APPROVED" || status === "CLOSED"));
  const canRecalculate = status === "DRAFT" || status === "FAILED";

  const stop = (e: React.MouseEvent) => e.stopPropagation();

  const handleRecalculate = async (e: React.MouseEvent) => {
    stop(e);
    if (!window.confirm(`Recalculate payroll run for ${record.period}? Existing items will be replaced.`)) return;
    setBusy(true);
    try {
      const response = await dataProvider.create("payroll-runs", { data: { period: record.period } });
      notify("Payroll run recalculation started", { type: "success" });
      const newId = (response.data as any)?.id;
      if (newId) {
        navigate(`/payroll-runs/${newId}/show`);
      } else {
        refresh();
      }
    } catch (err: any) {
      notify(`Recalculate failed: ${err?.message ?? "unknown error"}`, { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    stop(e);
    if (!window.confirm(`Delete payroll run for ${record.period}?`)) return;
    setBusy(true);
    try {
      await dataProvider.delete("payroll-runs", { id: record.id, previousData: record });
      notify("Payroll run deleted", { type: "success" });
      refresh();
    } catch (err: any) {
      notify(`Delete failed: ${err?.message ?? "unknown error"}`, { type: "error" });
    } finally {
      setBusy(false);
    }
  };

  return (
    <Stack direction="row" spacing={0.5} onClick={stop}>
      {canRecalculate && (
        <Tooltip title="Recalculate">
          <span>
            <IconButton size="small" onClick={handleRecalculate} disabled={busy}>
              <ReplayIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}
      {canDelete && (
        <Tooltip title="Delete">
          <span>
            <IconButton size="small" color="error" onClick={handleDelete} disabled={busy}>
              <DeleteIcon fontSize="small" />
            </IconButton>
          </span>
        </Tooltip>
      )}
    </Stack>
  );
};

export const PayrollRunsList: React.FC = () => {
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const navigate = useNavigate();

  return (
    <>
      <List
        actions={<PayrollRunsListActions onClickTrigger={() => setDialogOpen(true)} />}
        sort={{ field: "period", order: "DESC" }}
        empty={false}
      >
        <Datagrid
          rowClick={(id) => { navigate(`/payroll-runs/${id}/show`); return false; }}
          bulkActionButtons={false}
        >
          <DateField source="period" />
          <StatusChip />
          <TextField source="triggeredByEmail" label="Triggered by" />
          <DateField source="completedAt" showTime />
          <NumberField source="employeeCount" label="Employees" />
          <NumberField source="totalAmount" options={{ style: "currency", currency: "USD" }} />
          <RowActions />
        </Datagrid>
      </List>
      <TriggerDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onTriggered={(id) => navigate(`/payroll-runs/${id}/show`)}
      />
    </>
  );
};

// ---------- Show screen (status banner + items table) --------------------------------------------

const itemsExportHeaders = [
  "internalId", "firstName", "lastName", "clientName", "modality",
  "baseSalary", "proportionalSalary", "billableHoursInMonth", "overtimeHours", "overtimeAmount",
  "reimbursementsAmount", "vacationCashout", "hardwareClawback",
  "adjustment", "previousBalance", "totalAmount", "notes",
];
const itemsExportLabels = [
  "Internal ID", "First Name", "Last Name", "Client", "Modality",
  "Base", "Proportional", "Billable Hours", "OT Hours", "OT Amount",
  "Reimbursements", "Vacation Cashout", "Hardware Clawback",
  "Adjustment", "Previous Balance", "Total", "Notes",
];

const PayrollRunHeader: React.FC<{ run: any }> = ({ run }) => {
  if (!run) return null;
  return (
    <Box mb={2}>
      <Typography variant="h5">Payroll · {run.period}</Typography>
      <Stack direction="row" spacing={2} mt={1} alignItems="center">
        <Chip label={run.status} color={STATUS_COLORS[run.status] || "default"} />
        <Typography variant="body2">Employees: {run.employeeCount ?? "–"}</Typography>
        <Typography variant="body2">Total: {run.totalAmount ?? "–"}</Typography>
        {run.errorMessage && (
          <Alert severity="error" sx={{ ml: 2 }}>
            {run.errorMessage}
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

const RunActions: React.FC<{ run: any; onChange: () => void }> = ({ run, onChange }) => {
  const dataProvider = useDataProvider();
  const notify = useNotify();
  const refresh = useRefresh();
  const redirect = useRedirect();
  const admin = isAdmin();

  const callAction = async (path: string, successMsg: string) => {
    try {
      await dataProvider.update("payroll-runs", {
        id: `${run.id}/${path}`,
        data: {},
        previousData: run,
      });
      notify(successMsg, { type: "success" });
      onChange();
      refresh();
    } catch (e: any) {
      notify(`Action failed: ${e?.message ?? "unknown"}`, { type: "error" });
    }
  };

  const deleteRun = async () => {
    if (!window.confirm(`Delete payroll run for ${run.period}?`)) return;
    try {
      await dataProvider.delete("payroll-runs", { id: run.id, previousData: run });
      notify("Payroll run deleted", { type: "success" });
      redirect("/payroll-runs");
    } catch (e: any) {
      notify(`Delete failed: ${e?.message ?? "unknown"}`, { type: "error" });
    }
  };

  return (
    <Stack direction="row" spacing={1} mb={2}>
      {run.status === "DRAFT" && (
        <>
          <Button variant="contained" color="primary" onClick={() => callAction("approve", "Approved")}>
            Approve
          </Button>
          <Button color="error" onClick={deleteRun}>Delete</Button>
        </>
      )}
      {run.status === "APPROVED" && (
        <>
          <Button onClick={() => callAction("unapprove", "Reverted to DRAFT")}>Un-approve</Button>
          <Button variant="contained" onClick={() => callAction("close", "Closed")}>Close</Button>
        </>
      )}
      {admin && (run.status === "APPROVED" || run.status === "CLOSED" || run.status === "FAILED") && (
        <Button color="error" onClick={deleteRun}>Delete</Button>
      )}
    </Stack>
  );
};

export const PayrollRunShow: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: initial, refetch } = useGetOne("payroll-runs", { id: id! });
  const { data: live } = usePayrollRunStatus(
    initial?.status === "RUNNING" ? id : undefined
  );
  const run = (live || initial) as any;
  const items: any[] = run?.items || [];
  const isEditable = run?.status === "DRAFT";

  if (!run) return <Box p={2}>Loading…</Box>;

  return (
    <Box p={2}>
      <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
        <Button startIcon={<ArrowBackIcon />} onClick={() => navigate("/payroll-runs")}>
          Back
        </Button>
        <Button onClick={() => exporter(`payroll-${run.period}`, itemsExportHeaders, itemsExportLabels)(items)}>
          Export CSV
        </Button>
      </Stack>
      <PayrollRunHeader run={run} />
      <RunActions run={run} onChange={refetch} />
      {run.status === "RUNNING" && (
        <Alert severity="info" sx={{ mb: 2 }}>
          Calculation in progress — this view auto-refreshes every 2 seconds.
        </Alert>
      )}
      <Datagrid
        data={items}
        total={items.length}
        bulkActionButtons={false}
        rowClick={isEditable ? (recordId: Identifier) => `/payroll-items/${recordId}` : false}
        sort={{ field: "internalId", order: "ASC" }}
        isRowSelectable={() => false}
      >
        <TextField source="internalId" label="ID" />
        <TextField source="firstName" label="First Name" />
        <TextField source="lastName" label="Last Name" />
        <TextField source="clientName" label="Client" />
        <TextField source="modality" />
        <NumberField source="baseSalary" label="Base" />
        <NumberField source="proportionalSalary" label="Proportional" />
        <NumberField source="billableHoursInMonth" label="Billable Hrs" />
        <NumberField source="overtimeHours" label="OT Hrs" />
        <NumberField source="overtimeAmount" label="OT $" />
        <NumberField source="reimbursementsAmount" label="Reimb" />
        <NumberField source="vacationCashout" label="Vacation" />
        <NumberField source="hardwareClawback" label="HW Clawback" />
        <NumberField source="adjustment" label="Adjustment" />
        <NumberField source="previousBalance" label="Prev Bal" />
        <NumberField source="totalAmount" label="Total" />
        <TextField source="notes" />
        <TextField source="calculationError" label="Error" />
      </Datagrid>
    </Box>
  );
};

// ---------- Per-item edit (adjustment + previousBalance + notes) ---------------------------------

export const PayrollItemEdit: React.FC = () => {
  return (
    <Edit redirect={(_resource?: string, _id?: Identifier, data?: Partial<RaRecord>) =>
      data?.payrollRunId ? `payroll-runs/${data.payrollRunId}/show` : "payroll-runs"
    }>
      <SimpleForm>
        <TextField source="internalId" />
        <TextField source="firstName" />
        <TextField source="lastName" />
        <NumberInput source="adjustment" />
        <NumberInput source="previousBalance" />
        <TextInput source="notes" multiline fullWidth />
      </SimpleForm>
    </Edit>
  );
};
