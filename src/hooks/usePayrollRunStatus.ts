import { useEffect, useState } from "react";
import { useDataProvider } from "react-admin";

const POLL_INTERVAL_MS = 2000;

/**
 * Polls /payroll-runs/{id} every 2s until the run leaves the RUNNING state. We don't have a
 * websocket layer in Entroteam yet, so this is the cheapest way to update the FE when the async
 * job finishes. Each poll decides whether to schedule the next one from its own fresh response,
 * so polling stops as soon as the run reaches a terminal status (no stale-closure leak).
 */
export function usePayrollRunStatus(runId: string | undefined): {
  data: any;
  isPolling: boolean;
} {
  const dataProvider = useDataProvider();
  const [data, setData] = useState<any>(null);
  const [isPolling, setIsPolling] = useState<boolean>(false);

  useEffect(() => {
    if (!runId) {
      setData(null);
      setIsPolling(false);
      return;
    }

    let cancelled = false;
    let timeout: number | undefined;

    const poll = async () => {
      try {
        const response = await dataProvider.getOne("payroll-runs", { id: runId });
        if (cancelled) return;
        setData(response.data);
        if (response.data?.status === "RUNNING") {
          timeout = window.setTimeout(poll, POLL_INTERVAL_MS);
        } else {
          setIsPolling(false);
        }
      } catch (e) {
        if (!cancelled) setIsPolling(false);
      }
    };

    setIsPolling(true);
    poll();

    return () => {
      cancelled = true;
      if (timeout !== undefined) window.clearTimeout(timeout);
    };
  }, [runId, dataProvider]);

  return { data, isPolling };
}
