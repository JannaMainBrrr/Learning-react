import { useEffect } from "react";
import { useSessionDetails } from "../../../hooks/useSessionDetails";
import "../components/SessionDetailModal.css";
import {
  formatDurationMs,
  formatIsoDateTime,
  formatIsoRange,
  formatNumber,
  formatWithUnit,
} from "../../../utils/format/formatters";

type Props = {
  isOpen: boolean;
  sessionId: string | null;
  onClose(): void;
};

export default function SessionDetailsModal({
  isOpen,
  sessionId,
  onClose,
}: Props) {
  /* Feltétel: Csak akkor töltse le a sessiont a hook, ha a modal nyitva van
        1) isOpen ? ... : undefined --> Ha isOpen === true -> Átadja a sessionId-t, ha false, akkor undefined
        2) sessionId ?? undefined --> Ha a sessionId null VAGY undefined, akkor legyen undefined
            -Ez biztosítja, hogy a hook ne kapjon null-t, csak string-et vagy undefined-et:
                -a Props-ban a sessionId : string | null
                -a hookban pedig ez van --> useSessionDetails(sessionId?: string)    
    */
  const { session, loading, error, notFound } = useSessionDetails(
    isOpen ? (sessionId ?? undefined) : undefined,
  );

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    window.addEventListener("keydown", onKeyDown);
    //Effect clean up függvénye: Vagy az effect fut le vagy ez pl. unmountkor.
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="sessionModal">
      <div className="sessionModal__backdrop" onClick={onClose} />

      <div className="sessionModal__panel">
        <div className="sessionModal__header">
          <h2 className="sessionModal__title">Session details</h2>
          <button
            className="sessionModal__closeBtn"
            type="button"
            onClick={onClose}
          >
            ✕
          </button>
        </div>

        <div className="sessionModal__content">
          {loading && <p>Loading session...</p>}
          {error && <p>{error}</p>}
          {notFound && !loading && !error && <p>Session not found.</p>}
          return (
          <div className="sessionModal">
            <div className="sessionModal__backdrop" onClick={onClose} />

            <div className="sessionModal__panel">
              <div className="sessionModal__header">
                <h2 className="sessionModal__title">Session details</h2>
                <button
                  className="sessionModal__closeBtn"
                  type="button"
                  onClick={onClose}
                >
                  ✕
                </button>
              </div>

              <div className="sessionModal__content">
                {loading && <p>Loading session...</p>}
                {error && <p>{error}</p>}
                {notFound && !loading && !error && <p>Session not found.</p>}

                {!loading && !error && session && (
                  <div className="sessionModal__body">
                    {/* ================= META ================= */}
                    <div className="sessionModal__meta">
                      <div className="sessionModal__metaMain">
                        <div className="sessionModal__label">Name</div>
                        <div className="sessionModal__value">
                          {session.name}
                        </div>
                      </div>

                      <div className="sessionModal__metaRow">
                        <div className="sessionModal__metaItem">
                          <div className="sessionModal__label">Uploaded</div>
                          <div className="sessionModal__value">
                            {formatIsoDateTime(session.uploadedAt)}
                          </div>
                        </div>

                        <div className="sessionModal__metaItem">
                          <div className="sessionModal__label">Time window</div>
                          <div className="sessionModal__value">
                            {formatIsoDateTime(session.startedAt) ?? "—"} →{" "}
                            {formatIsoDateTime(session.endedAt) ?? "—"}
                          </div>
                        </div>

                        <div className="sessionModal__metaItem">
                          <div className="sessionModal__label">Duration</div>
                          <div className="sessionModal__value">
                            {formatDurationMs(session.durationMs) ?? "—"}
                          </div>
                        </div>
                      </div>

                      {session.sourceFilename && (
                        <div className="sessionModal__metaRow">
                          <div className="sessionModal__metaItem">
                            <div className="sessionModal__label">
                              Source file
                            </div>
                            <div className="sessionModal__value">
                              {session.sourceFilename}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* ================= QUICK SUMMARY ================= */}
                    <div className="sessionModal__section">
                      <h3 className="sessionModal__sectionTitle">
                        Quick summary
                      </h3>

                      <div className="sessionModal__cards">
                        <div className="sessionModal__card">
                          <div className="sessionModal__label">FPS</div>
                          <div className="sessionModal__value">
                            {session.fpsAvg ?? "—"}{" "}
                            <span className="sessionModal__muted">avg</span>
                          </div>
                          <div className="sessionModal__muted">
                            min {session.fpsMin ?? "—"} · max{" "}
                            {session.fpsMax ?? "—"}
                          </div>
                        </div>

                        <div className="sessionModal__card">
                          <div className="sessionModal__label">CPU Temp</div>
                          <div className="sessionModal__value">
                            {session.cpuTempAvgC ?? "—"}°C
                          </div>
                          <div className="sessionModal__muted">
                            min {session.cpuTempMinC ?? "—"} · max{" "}
                            {session.cpuTempMaxC ?? "—"}
                          </div>
                        </div>

                        <div className="sessionModal__card">
                          <div className="sessionModal__label">GPU Temp</div>
                          <div className="sessionModal__value">
                            {session.gpuTempAvgC ?? "—"}°C
                          </div>
                          <div className="sessionModal__muted">
                            min {session.gpuTempMinC ?? "—"} · max{" "}
                            {session.gpuTempMaxC ?? "—"}
                          </div>
                        </div>

                        <div className="sessionModal__card">
                          <div className="sessionModal__label">CPU Usage</div>
                          <div className="sessionModal__value">
                            {session.cpuUsageAvgPercent ?? "—"}%
                          </div>
                          <div className="sessionModal__muted">
                            min {session.cpuUsageMinPercent ?? "—"} · max{" "}
                            {session.cpuUsageMaxPercent ?? "—"}
                          </div>
                        </div>

                        <div className="sessionModal__card">
                          <div className="sessionModal__label">GPU Usage</div>
                          <div className="sessionModal__value">
                            {session.gpuUsageAvgPercent ?? "—"}%
                          </div>
                          <div className="sessionModal__muted">
                            min {session.gpuUsageMinPercent ?? "—"} · max{" "}
                            {session.gpuUsageMaxPercent ?? "—"}
                          </div>
                        </div>

                        <div className="sessionModal__card">
                          <div className="sessionModal__label">RAM</div>
                          <div className="sessionModal__value">
                            {session.ramUsedAvgMb ?? "—"} MB
                          </div>
                          <div className="sessionModal__muted">
                            max {session.ramUsedMaxMb ?? "—"} · avg{" "}
                            {session.ramUsageAvgPercent ?? "—"}%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ================= CPU COLLAPSIBLE ================= */}
                    <details className="sessionModal__collapsible">
                      <summary className="sessionModal__collapsibleSummary">
                        <div className="sessionModal__collapsibleLeft">
                          <span>CPU Metrics</span>
                        </div>

                        <div className="sessionModal__collapsibleRight">
                          Temp: {session.cpuTempAvgC ?? "—"}°C · Usage:{" "}
                          {session.cpuUsageAvgPercent ?? "—"}% · Power:{" "}
                          {session.cpuPowerAvgW ?? "—"} W
                        </div>
                      </summary>

                      <div className="sessionModal__collapsibleContent">
                        <div className="sessionModal__metricsGrid">
                          <div className="sessionModal__metric">
                            <div className="sessionModal__label">
                              Clock (MHz)
                            </div>
                            <div className="sessionModal__value">
                              {session.cpuClockAvgMhz ?? "—"}
                            </div>
                            <div className="sessionModal__muted">
                              min {session.cpuClockMinMhz ?? "—"} · max{" "}
                              {session.cpuClockMaxMhz ?? "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>

                    {/* ================= GPU COLLAPSIBLE ================= */}
                    <details className="sessionModal__collapsible">
                      <summary className="sessionModal__collapsibleSummary">
                        <div className="sessionModal__collapsibleLeft">
                          <span>GPU Metrics</span>
                        </div>

                        <div className="sessionModal__collapsibleRight">
                          Temp: {session.gpuTempAvgC ?? "—"}°C · Usage:{" "}
                          {session.gpuUsageAvgPercent ?? "—"}% · Power:{" "}
                          {session.gpuPowerAvgW ?? "—"} W
                        </div>
                      </summary>

                      <div className="sessionModal__collapsibleContent">
                        <div className="sessionModal__metricsGrid">
                          <div className="sessionModal__metric">
                            <div className="sessionModal__label">
                              Clock (MHz)
                            </div>
                            <div className="sessionModal__value">
                              {session.gpuClockAvgMhz ?? "—"}
                            </div>
                            <div className="sessionModal__muted">
                              min {session.gpuClockMinMhz ?? "—"} · max{" "}
                              {session.gpuClockMaxMhz ?? "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>

                    {/* ================= RAM COLLAPSIBLE ================= */}
                    <details className="sessionModal__collapsible">
                      <summary className="sessionModal__collapsibleSummary">
                        <div className="sessionModal__collapsibleLeft">
                          <span>RAM Metrics</span>
                        </div>

                        <div className="sessionModal__collapsibleRight">
                          Used: {session.ramUsedAvgMb ?? "—"} MB · Max:{" "}
                          {session.ramUsedMaxMb ?? "—"}
                        </div>
                      </summary>

                      <div className="sessionModal__collapsibleContent">
                        <div className="sessionModal__metricsGrid">
                          <div className="sessionModal__metric">
                            <div className="sessionModal__label">Usage (%)</div>
                            <div className="sessionModal__value">
                              {session.ramUsageAvgPercent ?? "—"}
                            </div>
                            <div className="sessionModal__muted">
                              max {session.ramUsageMaxPercent ?? "—"}
                            </div>
                          </div>
                        </div>
                      </div>
                    </details>
                  </div>
                )}
              </div>

              <div className="sessionModal__footer">
                <button
                  className="sessionModal__footerBtn"
                  type="button"
                  onClick={onClose}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
          );
        </div>

        <div className="sessionModal__footer">
          <button
            className="sessionModal__footerBtn"
            type="button"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
