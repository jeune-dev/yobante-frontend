import { useState } from "react";

const PERIODES = [
  { id: "jour",         label: "Aujourd'hui" },
  { id: "semaine",      label: "Cette semaine" },
  { id: "mois",         label: "Ce mois" },
  { id: "personnalise", label: "Personnalisé" },
];

const FAKE_DATA = {
  jour:         { total: 3,  franceSenegal: 2,  senegalFrance: 1,  enAttente: 1 },
  semaine:      { total: 18, franceSenegal: 12, senegalFrance: 6,  enAttente: 4 },
  mois:         { total: 64, franceSenegal: 42, senegalFrance: 22, enAttente: 9 },
  personnalise: { total: 0,  franceSenegal: 0,  senegalFrance: 0,  enAttente: 0 },
};

export default function VueEnsembleColisPanel() {
  const [periode, setPeriode]     = useState("mois");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin]     = useState("");

  const data = FAKE_DATA[periode];

  const kpis = [
    {
      label: "Total colis envoyés",
      value: data.total,
      color: "blue",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-7"/>
          <polyline points="3.29 7 12 12 20.71 7"/>
          <line x1="12" y1="22" x2="12" y2="12"/>
        </svg>
      ),
    },
    {
      label: "France → Sénégal",
      value: data.franceSenegal,
      color: "green",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      label: "Sénégal → France",
      value: data.senegalFrance,
      color: "gold",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      label: "En attente de validation",
      value: data.enAttente,
      color: "red",
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
      ),
    },
  ];

  return (
    <div>
      {/* ── Filtre période ── */}
      <div className="db-card" style={{ marginBottom: "1.3rem" }}>
        <div className="db-card-body" style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexWrap: "wrap" }}>
          <span style={{ fontSize: "0.82rem", color: "#888", fontWeight: 600, marginRight: 4 }}>Période :</span>
          {PERIODES.map((p) => (
            <button
              key={p.id}
              className={`db-chip${periode === p.id ? " active" : ""}`}
              onClick={() => setPeriode(p.id)}
            >
              {p.label}
            </button>
          ))}
          {periode === "personnalise" && (
            <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginLeft: "0.5rem" }}>
              <input type="date" value={dateDebut} onChange={(e) => setDateDebut(e.target.value)} className="db-form-input" style={{ width: 160, padding: "0.4rem 0.7rem", fontSize: "0.85rem" }} />
              <span style={{ color: "#888", fontSize: "0.85rem" }}>→</span>
              <input type="date" value={dateFin} onChange={(e) => setDateFin(e.target.value)} className="db-form-input" style={{ width: 160, padding: "0.4rem 0.7rem", fontSize: "0.85rem" }} />
            </div>
          )}
        </div>
      </div>

      {/* ── KPIs ── */}
      <div className="db-stats-grid">
        {kpis.map((kpi, i) => (
          <div className="db-stat-card" key={i}>
            <div className={`db-stat-icon ${kpi.color}`}>{kpi.icon}</div>
            <div className="db-stat-value">{kpi.value}</div>
            <div className="db-stat-label">{kpi.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}