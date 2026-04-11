import { useState } from "react";

// Données fictives
const FAKE_DATA = {
  jour: {
    produitsActifs: 24,
    produitsInactifs: 3,
    commandes: 5,
    ca: 125000,
    clientsActifs: 18,
    clientsInactifs: 2,
  },
  semaine: {
    produitsActifs: 24,
    produitsInactifs: 3,
    commandes: 31,
    ca: 870000,
    clientsActifs: 18,
    clientsInactifs: 2,
  },
  mois: {
    produitsActifs: 24,
    produitsInactifs: 3,
    commandes: 98,
    ca: 2340000,
    clientsActifs: 18,
    clientsInactifs: 2,
  },
  personnalise: {
    produitsActifs: 24,
    produitsInactifs: 3,
    commandes: 0,
    ca: 0,
    clientsActifs: 18,
    clientsInactifs: 2,
  },
};

export default function VueEnsembleBoutique() {
  const [periode, setPeriode] = useState("mois");
  const [dateDebut, setDateDebut] = useState("");
  const [dateFin, setDateFin] = useState("");

  const PERIODES = [
    { id: "jour", label: "Aujourd’hui" },
    { id: "semaine", label: "Cette semaine" },
    { id: "mois", label: "Ce mois" },
    { id: "personnalise", label: "Personnalisé" },
  ];

  const data = FAKE_DATA[periode];

  const kpis = [
    {
      label: "Produits actifs",
      value: data.produitsActifs,
      icon: "🟢",
    },
    {
      label: "Produits inactifs",
      value: data.produitsInactifs,
      icon: "🔴",
    },
    {
      label: "Commandes",
      value: data.commandes,
      icon: "📦",
    },
    {
      label: "Chiffre d'affaires",
      value: `${data.ca.toLocaleString()} FCFA`,
      icon: "💰",
    },
    {
      label: "Clients actifs",
      value: data.clientsActifs,
      icon: "👤",
    },
    {
      label: "Clients inactifs",
      value: data.clientsInactifs,
      icon: "🚫",
    },
  ];

  return (
    <div>
      {/* FILTRE PÉRIODE */}
      <div
        className="db-card"
        style={{ marginBottom: "1.3rem", padding: "1rem" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              fontSize: "0.85rem",
              color: "#666",
              fontWeight: 600,
            }}
          >
            Période :
          </span>

          {PERIODES.map((p) => (
            <button
              key={p.id}
              onClick={() => setPeriode(p.id)}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "20px",
                border: "none",
                cursor: "pointer",
                background: periode === p.id ? "#111" : "#eee",
                color: periode === p.id ? "#fff" : "#333",
                fontSize: "0.8rem",
              }}
            >
              {p.label}
            </button>
          ))}

          {/* Dates personnalisées */}
          {periode === "personnalise" && (
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="date"
                value={dateDebut}
                onChange={(e) => setDateDebut(e.target.value)}
              />
              <span>→</span>
              <input
                type="date"
                value={dateFin}
                onChange={(e) => setDateFin(e.target.value)}
              />
            </div>
          )}
        </div>
      </div>

      {/* KPIs */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1rem",
        }}
      >
        {kpis.map((kpi, index) => (
          <div
            key={index}
            style={{
              background: "#fff",
              padding: "1rem",
              borderRadius: "12px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.05)",
            }}
          >
            <div style={{ fontSize: "1.5rem" }}>{kpi.icon}</div>
            <div style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
              {kpi.value}
            </div>
            <div style={{ fontSize: "0.85rem", color: "#777" }}>
              {kpi.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}