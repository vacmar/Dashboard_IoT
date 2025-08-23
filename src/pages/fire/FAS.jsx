import React, { useMemo, useState } from "react";

export default function FAS() {
  // ---------- Data ----------
  const modes = [
    "Fire",
    "Pre-Alarm",
    "Verify",
    "Supervisory",
    "Maintenance",
    "Test Mode",
    "Disable",
    "Power",
  ];

  const faults = [
    "Fault",
    "Battery Fault",
    "System Fault",
    "Ground Fault",
    "Sounder Fault",
    "Sounder Disable",
    "Delay Mode",
  ];

  const zones = useMemo(
    () => Array.from({ length: 70 }, (_, i) => `Zone ${i + 1}`),
    []
  );

  // Dummy logs (Date, Time, Zone)
  const allLogs = useMemo(() => {
    const base = [
      { date: "2025-08-23", time: "09:12", zone: "Zone 5" },
      { date: "2025-08-23", time: "10:41", zone: "Zone 12" },
      { date: "2025-08-23", time: "11:22", zone: "Zone 33" },
      { date: "2025-08-23", time: "12:07", zone: "Zone 47" },
      { date: "2025-08-23", time: "13:55", zone: "Zone 1" },
      { date: "2025-08-23", time: "14:10", zone: "Zone 58" },
      { date: "2025-08-23", time: "15:39", zone: "Zone 22" },
      { date: "2025-08-23", time: "16:02", zone: "Zone 66" },
      { date: "2025-08-23", time: "16:44", zone: "Zone 19" },
      { date: "2025-08-23", time: "17:08", zone: "Zone 40" },
      { date: "2025-08-23", time: "17:55", zone: "Zone 7" },
      { date: "2025-08-23", time: "18:11", zone: "Zone 14" },
      { date: "2025-08-23", time: "18:29", zone: "Zone 29" },
      { date: "2025-08-23", time: "18:47", zone: "Zone 63" },
      { date: "2025-08-23", time: "19:03", zone: "Zone 54" },
      { date: "2025-08-23", time: "19:22", zone: "Zone 9" },
      { date: "2025-08-23", time: "19:31", zone: "Zone 32" },
      { date: "2025-08-23", time: "19:40", zone: "Zone 70" },
      { date: "2025-08-23", time: "19:48", zone: "Zone 25" },
      { date: "2025-08-23", time: "19:55", zone: "Zone 2" },
    ];
    const more = Array.from({ length: 30 }, (_, k) => ({
      date: "2025-08-22",
      time: `${String(8 + (k % 10)).padStart(2, "0")}:${String(
        10 + (k * 3) % 50
      ).padStart(2, "0")}`,
      zone: `Zone ${((k * 7) % 70) + 1}`,
    }));
    return [...base, ...more];
  }, []);

  // ---------- State ----------
  const [selectedZone, setSelectedZone] = useState(null);
  const [search, setSearch] = useState("");

  const filteredLogs = useMemo(() => {
    let logs = allLogs;
    if (selectedZone) logs = logs.filter((l) => l.zone === selectedZone);
    return logs.slice(0, 20);
  }, [selectedZone, allLogs]);

  const filteredZones = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? zones.filter((z) => z.toLowerCase().includes(q)) : zones;
  }, [search, zones]);

  // ---------- Render ----------
  return (
    <div className="page">
      <div className="container">
        <header className="header">
          <h1>⚡ TNEB GRID POWER</h1>
          <p className="sub">Centralized view of Modes, Faults, Logs & Zones</p>
        </header>

        {/* Top cards */}
        <section className="top">
          <div className="card">
            <div className="card-header">
              <span className="card-icon">🔧</span>
              <h2>Modes</h2>
            </div>
            <div className="chip-grid">
              {modes.map((m) => (
                <button key={m} className="chip chip-mode" type="button">
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <span className="card-icon">⚠️</span>
              <h2>Faults</h2>
            </div>
            <div className="chip-grid">
              {faults.map((f) => (
                <button key={f} className="chip chip-fault" type="button">
                  {f}
                </button>
              ))}
            </div>
          </div>

          <div className="card logs-card">
            <div className="card-header">
              <span className="card-icon">📜</span>
              <h2>Logs</h2>
              <div className="logs-actions">
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="search"
                  placeholder="Search zones…"
                />
                {selectedZone && (
                  <button
                    className="clear"
                    onClick={() => setSelectedZone(null)}
                    type="button"
                    title="Show all zones in logs"
                  >
                    Clear Filter
                  </button>
                )}
              </div>
            </div>

            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Zone</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((row, idx) => (
                    <tr key={`${row.date}-${row.time}-${idx}`}>
                      <td>{row.date}</td>
                      <td>{row.time}</td>
                      <td>{row.zone}</td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan="3" className="empty">
                        No logs for this selection.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Zones */}
        <section className="zones">
          <div className="zones-head">
            <div className="card-header">
              <span className="card-icon">🗂️</span>
              <h2>Zones</h2>
            </div>
            <p className="hint">
              Click a zone to filter logs · {filteredZones.length} shown
            </p>
          </div>

          <div className="zones-grid">
            {filteredZones.map((z) => {
              const active = selectedZone === z;
              return (
                <button
                  key={z}
                  className={`zone ${active ? "active" : ""}`}
                  onClick={() => setSelectedZone(active ? null : z)}
                  type="button"
                  title={`Filter logs by ${z}`}
                >
                  <span className="zone-label">{z}</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* ---------- Styles (same file) ---------- */}
      <style>{`
        /* Page & container */
        .page {
          min-height: 100vh;
          background: #121212;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 20px;
          color: #eaeef5;
        }
        .container {
          width: 100%;
          max-width: 1200px;
        }

        /* Header */
        .header {
          text-align: center;
          margin-bottom: 24px;
        }
        .header h1 {
          margin: 0;
          font-size: 28px;
          letter-spacing: 0.4px;
        }
        .sub {
          margin-top: 6px;
          color: #aeb6c1;
          font-size: 14px;
        }

        /* Top grid */
        .top {
          display: grid;
          grid-template-columns: 1fr 1fr 2fr;
          gap: 18px;
          margin-bottom: 22px;
        }

        /* Cards */
        .card {
          background: #1b1b1f;
          border-radius: 14px;
          padding: 18px;
          box-shadow: 0 8px 24px rgba(0,0,0,0.35);
          border: 1px solid #2a2d34;
        }
        .card:hover {
          box-shadow: 0 10px 28px rgba(0,0,0,0.45);
        }
        .card-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .card-header h2 {
          font-size: 18px;
          margin: 0;
        }
        .card-icon {
          font-size: 18px;
          opacity: 0.9;
        }

        /* Chips (Modes & Faults) */
        .chip-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 10px;
        }
        .chip {
          border: 1px solid transparent;
          padding: 10px 12px;
          border-radius: 10px;
          font-size: 14px;
          font-weight: 600;
          letter-spacing: 0.2px;
          transition: transform .16s ease, box-shadow .16s ease, border-color .2s ease;
          text-align: center;
        }
        .chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.35);
        }

        /* Mode chips - bluish */
        .chip-mode {
          background: #334155;
          color: #f1f5f9;
          border: 1px solid #475569;
        }
        .chip-mode:hover {
          background: #475569;
          border-color: #64748b;
        }

        /* Fault chips - reddish */
        .chip-fault {
          background: #7f1d1d;
          color: #fee2e2;
          border: 1px solid #991b1b;
        }
        .chip-fault:hover {
          background: #991b1b;
          border-color: #ef4444;
        }

        /* Logs */
        .logs-card .logs-actions {
          margin-left: auto;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-right: 2px;
        }
        .search {
          background: #0e0f13;
          border: 1px solid #2c3139;
          color: #e9eef7;
          padding: 8px 10px;
          border-radius: 8px;
          width: 170px;
          outline: none;
        }
        .search::placeholder { color: #8891a0; }
        .clear {
          background: #23262d;
          border: 1px solid #394252;
          color: #d7deea;
          padding: 8px 10px;
          border-radius: 8px;
          cursor: pointer;
        }
        .clear:hover { background: #2a2e37; }

        .table-wrap {
          overflow: auto;
          border-radius: 10px;
          border: 1px solid #2a2d34;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          min-width: 420px;
        }
        thead th {
          background: #16181d;
          color: #ff914d;
          text-align: left;
          padding: 12px 14px;
          font-weight: 700;
          font-size: 13px;
          border-bottom: 1px solid #2a2d34;
        }
        tbody td {
          padding: 12px 14px;
          border-bottom: 1px solid #22262d;
          color: #d7deea;
          font-size: 14px;
        }
        tbody tr:hover td { background: #181b21; }
        .empty { text-align: center; padding: 18px; color: #97a1b1; }

        /* Zones */
        .zones {
          background: #1b1b1f;
          border-radius: 14px;
          padding: 18px;
          border: 1px solid #2a2d34;
        }
        .zones-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 6px 12px;
          margin-bottom: 10px;
        }
        .zones .hint {
          margin: 0;
          font-size: 12px;
          color: #9aa5b5;
        }
        .zones-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(110px, 1fr));
          gap: 10px;
          justify-items: center;
        }
        .zone {
          position: relative;
          width: 100%;
          max-width: 140px;
          border: 1px solid #2a6bff33;
          background: linear-gradient(180deg, #21232a, #181a20);
          color: #e8edf6;
          padding: 12px 10px;
          border-radius: 12px;
          font-weight: 700;
          letter-spacing: 0.2px;
          cursor: pointer;
          transition: transform .14s ease, box-shadow .14s ease, border-color .2s ease;
          display: grid;
          place-items: center;
        }
        .zone:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,.35);
          border-color: #2a6bff88;
        }
        .zone.active {
          border-color: #2a6bff;
          box-shadow: 0 0 0 2px #2a6bff55 inset, 0 12px 24px rgba(0,0,0,.4);
        }
        .zone-label {
          font-size: 14px;
          white-space: nowrap;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .top { grid-template-columns: 1fr; }
        }
      `}</style>
    </div>
  );
}
