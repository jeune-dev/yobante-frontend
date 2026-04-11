import { useState } from "react";

const FAKE_CLIENTS = [
  { id: 1, nom: "Diallo", prenom: "Amadou", email: "amadou@gmail.com", telephone: "+221 77 123 45 67", adresse: "Dakar, Plateau", statut: "actif", photo: null },
  { id: 2, nom: "Sow", prenom: "Fatou", email: "fatou@gmail.com", telephone: "+221 78 234 56 78", adresse: "Dakar, Parcelles", statut: "actif", photo: null },
  { id: 3, nom: "Ndiaye", prenom: "Moussa", email: "moussa@gmail.com", telephone: "+221 76 345 67 89", adresse: "Thiès, Centre", statut: "inactif", photo: null },
  { id: 4, nom: "Ba", prenom: "Aissatou", email: "aissatou@gmail.com", telephone: "+221 70 456 78 90", adresse: "Saint-Louis", statut: "actif", photo: null },
  { id: 5, nom: "Fall", prenom: "Ibrahima", email: "ibrahima@gmail.com", telephone: "+221 77 567 89 01", adresse: "Ziguinchor", statut: "inactif", photo: null },
];

const STATUT_COLORS = {
  actif:   { bg: "#d1fae5", color: "#065f46" },
  inactif: { bg: "#fee2e2", color: "#991b1b" },
};

export default function ClientsPanel() {
  const [clients, setClients]   = useState(FAKE_CLIENTS);
  const [search, setSearch]     = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [selected, setSelected] = useState(null);
  const [modal, setModal]       = useState(false);

  // ── Filtrage ──
  const filtered = clients.filter((c) => {
    const matchSearch =
      c.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.prenom.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.telephone.includes(search);
    const matchStatut = filtreStatut === "tous" || c.statut === filtreStatut;
    return matchSearch && matchStatut;
  });

  // ── Activer / Désactiver ──
  const toggleStatut = (id) => {
    setClients((prev) =>
      prev.map((c) => c.id === id ? { ...c, statut: c.statut === "actif" ? "inactif" : "actif" } : c)
    );
    if (selected?.id === id) {
      setSelected((s) => ({ ...s, statut: s.statut === "actif" ? "inactif" : "actif" }));
    }
  };

  // ── Initiales avatar ──
  const initiales = (c) => `${c.prenom[0]}${c.nom[0]}`.toUpperCase();

  return (
    <div>
      {/* ── Barre actions ── */}
      <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="db-form-input"
          placeholder="Rechercher nom, email, téléphone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 280, padding: "0.5rem 0.9rem" }}
        />
        {["tous", "actif", "inactif"].map((s) => (
          <button
            key={s}
            className={`db-chip${filtreStatut === s ? " active" : ""}`}
            onClick={() => setFiltreStatut(s)}
          >
            {s === "tous" ? "Tous" : s === "actif" ? "Actifs" : "Inactifs"}
          </button>
        ))}
        <div style={{ marginLeft: "auto", fontSize: "0.85rem", color: "#888" }}>
          {filtered.length} client{filtered.length > 1 ? "s" : ""}
        </div>
      </div>

      {/* ── Tableau ── */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Client</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Adresse</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    Aucun client trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id}>
                    {/* Client */}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "linear-gradient(135deg, #1a56db, #3b7df5)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0
                        }}>
                          {initiales(c)}
                        </div>
                        <span className="db-td-bold">{c.prenom} {c.nom}</span>
                      </div>
                    </td>
                    <td>{c.email}</td>
                    <td>{c.telephone}</td>
                    <td>{c.adresse}</td>
                    <td>
                      <span style={{
                        ...STATUT_COLORS[c.statut],
                        padding: "3px 12px", borderRadius: 20,
                        fontSize: "0.75rem", fontWeight: 600,
                      }}>
                        {c.statut}
                      </span>
                    </td>
                    <td>
                      <div className="db-actions">
                        <button className="db-btn-ghost" onClick={() => { setSelected(c); setModal(true); }}>
                          Voir
                        </button>
                        <button
                          className="db-btn-ghost"
                          style={{ color: c.statut === "actif" ? "#991b1b" : "#065f46", borderColor: c.statut === "actif" ? "#991b1b" : "#065f46" }}
                          onClick={() => toggleStatut(c.id)}
                        >
                          {c.statut === "actif" ? "Désactiver" : "Activer"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal VOIR ── */}
      {modal && selected && (
        <div onClick={() => setModal(false)} style={{
          position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
          backdropFilter: "blur(3px)", display: "flex", alignItems: "center",
          justifyContent: "center", zIndex: 1000, padding: "1rem"
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: "#fff", borderRadius: 18, width: "100%", maxWidth: 460,
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)", animation: "dbFadeIn 0.22s ease"
          }}>
            {/* Header avec avatar */}
            <div style={{
              background: "linear-gradient(135deg, #1a56db, #3b7df5)",
              borderRadius: "18px 18px 0 0", padding: "2rem 1.65rem 1.5rem",
              display: "flex", flexDirection: "column", alignItems: "center", gap: 10
            }}>
              <div style={{
                width: 72, height: 72, borderRadius: "50%",
                background: "rgba(255,255,255,0.2)", border: "3px solid rgba(255,255,255,0.6)",
                display: "flex", alignItems: "center", justifyContent: "center",
                color: "#fff", fontWeight: 700, fontSize: "1.4rem"
              }}>
                {initiales(selected)}
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: "1.1rem" }}>
                {selected.prenom} {selected.nom}
              </div>
              <span style={{
                background: "rgba(255,255,255,0.2)", color: "#fff",
                padding: "3px 14px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600
              }}>
                {selected.statut}
              </span>
            </div>

            {/* Infos */}
            <div style={{ padding: "1.4rem 1.65rem" }}>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.7rem" }}>
                <InfoRow icon="✉️" label="Email" value={selected.email} />
                <InfoRow icon="📞" label="Téléphone" value={selected.telephone} />
                <InfoRow icon="📍" label="Adresse" value={selected.adresse} />
              </div>
            </div>

            {/* Footer */}
            <div className="db-modal-footer">
              <button className="db-btn secondary" onClick={() => setModal(false)}>Fermer</button>
              <button
                className="db-btn primary"
                style={{ background: selected.statut === "actif" ? "#c94030" : "#1a56db" }}
                onClick={() => toggleStatut(selected.id)}
              >
                {selected.statut === "actif" ? "Désactiver" : "Activer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoRow({ icon, label, value }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      background: "#f7f9fc", border: "1px solid #eaecf0",
      borderRadius: 10, padding: "0.75rem 1rem"
    }}>
      <span style={{ fontSize: "1.1rem" }}>{icon}</span>
      <div>
        <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", marginBottom: 2 }}>{label}</div>
        <div style={{ fontWeight: 600, fontSize: "0.9rem", color: "#111" }}>{value}</div>
      </div>
    </div>
  );
}