import { useState } from "react";
import { useOutletContext } from "react-router-dom";
import type { GameDetailsOutletContext } from "../GameDetailsPage";
import { useSessions } from "../../../hooks/useSessions";
import SessionDetailsModal from "../components/SessionDetailModal";
import {
  formatDurationMs,
  formatNumber,
  timeAgoFromIso,
} from "../../../utils/format/formatters";
import "./GameSessionsTab.css";

export default function GameSessionsTab() {
  const { game } = useOutletContext<GameDetailsOutletContext>();
  const { sessions, loading, error, notFound } = useSessions(game?.id);

  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [selectedSessionId, setSelectedSessionId] = useState<string | null>(
    null,
  );

  function openDetails(sessionId: string) {
    setSelectedSessionId(sessionId);
    setIsDetailsOpen(true);
  }

  function closeDetails() {
    setIsDetailsOpen(false);
    setSelectedSessionId(null);
  }

  return (
    <div className="sessionsTab">
      <div className="sessionsTab__header">
        <h1 className="sessionsTab__title">{game.title}</h1>
      </div>

      {notFound && <p>Missing game id.</p>}
      {loading && <p>Loading sessions...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && sessions.length === 0 && (
        <p>No sessions yet for this game.</p>
      )}

      {!loading && !error && sessions.length > 0 && (
        <div className="sessionsTab__tableContainer">
          <table className="sessionsTab__table">
            <thead>
              <tr>
                <th>Time ago</th>
                <th>Name</th>
                <th>Duration</th>

                <th>GPU avg</th>
                <th>CPU avg</th>
                <th>FPS avg</th>

                <th>GPU min</th>
                <th>GPU max</th>

                <th>CPU min</th>
                <th>CPU max</th>

                <th>FPS min</th>
                <th>FPS max</th>

                <th>Details</th>
              </tr>
            </thead>

            <tbody>
              {sessions.map((s) => (
                <tr key={s.id}>
                  <td>{timeAgoFromIso(s.uploadedAt)}</td>
                  <td>{s.name}</td>
                  <td>{formatDurationMs(s.durationMs)}</td>

                  <td>{formatNumber(s.gpuTempAvgC)}</td>
                  <td>{formatNumber(s.cpuTempAvgC)}</td>
                  <td>{formatNumber(s.fpsAvg)}</td>

                  <td>{formatNumber(s.gpuTempMinC)}</td>
                  <td>{formatNumber(s.gpuTempMaxC)}</td>

                  <td>{formatNumber(s.cpuTempMinC)}</td>
                  <td>{formatNumber(s.cpuTempMaxC)}</td>

                  <td>{formatNumber(s.fpsMin)}</td>
                  <td>{formatNumber(s.fpsMax)}</td>

                  <td>
                    <button
                      className="sessionsTab__detailsBtn"
                      type="button"
                      onClick={() => openDetails(s.id)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <SessionDetailsModal
        isOpen={isDetailsOpen}
        sessionId={selectedSessionId}
        onClose={closeDetails}
      />
    </div>
  );
}
