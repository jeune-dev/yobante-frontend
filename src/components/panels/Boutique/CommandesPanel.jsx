import { useState } from "react";

const FAKE_COMMANDES = [
  { id: "CMD001", client: { nom: "Diallo", prenom: "Amadou" }, montant: 45000, statut: "en_attente", adresse: "Dakar, Plateau", date: "2026-04-01", produits: [{ nom: "Huile de palme", qte: 3, prix: 3500 }, { nom: "Savon karité", qte: 5, prix: 1500 }] },
  { id: "CMD002", client: { nom: "Sow", prenom: "Fatou" }, montant: 12000, statut: "en_preparation", adresse: "Dakar, Parcelles", date: "2026-04-02", produits: [{ nom: "Tissu wax 6m", qte: 1, prix: 12000 }] },
  { id: "CMD003", client: { nom: "Ndiaye", prenom: "Moussa" }, montant: 25000, statut: "livree", adresse: "Thiès, Centre", date: "2026-04-03", produits: [{ nom: "Boubou homme", qte: 1, prix: 25000 }] },
  { id: "CMD004", client: { nom: "Ba", prenom: "Aissatou" }, montant: 8000, statut: "annulee", adresse: "Saint-Louis", date: "2026-04-04", produits: [{ nom: "Thé Kinkeliba", qte: 4, prix: 2000 }] },
];

const STATUTS = {
  en_attente:    { label: "En attente",    bg: "#fef3c7", color: "#92400e" },
  en_preparation:{ label: "En préparation",bg: "#dbeafe", color: "#1e40af" },
  livree:        { label: "Livrée",        bg: "#d1fae5", color: "#065f46" },
  annulee:       { label: "Annulée",       bg: "#fee2e2", color: "#991b1b" },
};

export default function CommandesPanel() {
  const [commandes, setCommandes] = useState(FAKE_COMMANDES);
  const [search, setSearch]       = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [selected, setSelected]   = useState(null);
  const [modal, setModal]         = useState(false);

  // ── Filtrage ──
  const filtered = commandes.filter((c) => {
    const matchSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.client.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.client.prenom.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filtreStatut === "tous" || c.statut === filtreStatut;
    return matchSearch && matchStatut;
  });

  // ── Changer statut ──
  const changerStatut = (id, newStatut) => {
    setCommandes((prev) =>
      prev.map((c) => c.id === id ? { ...c, statut: newStatut } : c)
    );
    if (selected?.id === id) setSelected((s) => ({ ...s, statut: newStatut }));
  };

  return (
    <div>
      {/* ── Barre actions ── */}
      <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="db-form-input"
          placeholder="Rechercher ID, client..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 260, padding: "0.5rem 0.9rem" }}
        />
        {["tous", "en_attente", "en_preparation", "livree", "annulee"].map((s) => (
          <button
            key={s}
            className={`db-chip${filtreStatut === s ? " active" : ""}`}
            onClick={() => setFiltreStatut(s)}
          >
            {s === "tous" ? "Toutes" : STATUTS[s]?.label}
          </button>
        ))}
      </div>

      {/* ── Tableau ── */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Client</th>
                <th>Montant</th>
                <th>Statut</th>
                <th>Adresse</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    Aucune commande trouvée
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="db-td-bold">{c.id}</td>
                    <td>{c.client.prenom} {c.client.nom}</td>
                    <td>{c.montant.toLocaleString()} FCFA</td>
                    <td>
                      <span style={{
                        ...STATUTS[c.statut],
                        padding: "3px 12px",
                        borderRadius: 20,
                        fontSize: "0.75rem",
                        fontWeight: 600,
                      }}>
                        {STATUTS[c.statut]?.label}
                      </span>
                    </td>
                    <td>{c.adresse}</td>
                    <td>{c.date}</td>
                    <td>
                      <div className="db-actions">
                        <button className="db-btn-ghost" onClick={() => { setSelected(c); setModal(true); }}>
                          Voir
                        </button>
                        {c.statut === "en_attente" && (
                          <>
                            <button className="db-btn-ghost" style={{ color: "#065f46", borderColor: "#065f46" }} onClick={() => changerStatut(c.id, "en_preparation")}>
                              Valider
                            </button>
                            <button className="db-btn-danger" onClick={() => changerStatut(c.id, "annulee")}>
                              Rejeter
                            </button>
                          </>
                        )}
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
            background: "#fff", borderRadius: 18, width: "100%", maxWidth: 500,
            boxShadow: "0 24px 60px rgba(0,0,0,0.18)", animation: "dbFadeIn 0.22s ease",
            maxHeight: "90vh", overflowY: "auto"
          }}>
            {/* Header */}
            <div className="db-modal-head">
              <div className="db-modal-title">Commande {selected.id}</div>
              <button className="db-modal-close" onClick={() => setModal(false)}>✕</button>
            </div>

            <div style={{ padding: "0 1.65rem 1.65rem" }}>
              {/* Statut */}
              <div style={{ marginBottom: "1rem" }}>
                <span style={{
                  ...STATUTS[selected.statut],
                  padding: "4px 14px", borderRadius: 20,
                  fontSize: "0.8rem", fontWeight: 600
                }}>
                  {STATUTS[selected.statut]?.label}
                </span>
              </div>

              {/* Infos client */}
              <div style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
                Informations client
              </div>
              <div style={{ background: "#f7f9fc", border: "1px solid #eaecf0", borderRadius: 10, padding: "0.9rem 1rem", marginBottom: "1rem" }}>
                <div style={{ fontWeight: 600, fontSize: "0.95rem" }}>{selected.client.prenom} {selected.client.nom}</div>
                <div style={{ color: "#666", fontSize: "0.85rem", marginTop: 4 }}>📍 {selected.adresse}</div>
                <div style={{ color: "#666", fontSize: "0.85rem", marginTop: 2 }}>📅 {selected.date}</div>
              </div>

              {/* Produits commandés */}
              <div style={{ fontWeight: 700, fontSize: "0.8rem", textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>
                Produits commandés
              </div>
              <div style={{ border: "1px solid #eaecf0", borderRadius: 10, overflow: "hidden", marginBottom: "1rem" }}>
                {selected.produits.map((p, i) => (
                  <div key={i} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "0.75rem 1rem",
                    borderBottom: i < selected.produits.length - 1 ? "1px solid #eaecf0" : "none"
                  }}>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>{p.nom}</div>
                      <div style={{ color: "#888", fontSize: "0.8rem" }}>Qté : {p.qte}</div>
                    </div>
                    <div style={{ fontWeight: 700, color: "#111" }}>{(p.prix * p.qte).toLocaleString()} FCFA</div>
                  </div>
                ))}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "0.75rem 1rem", background: "#f7f9fc", fontWeight: 700 }}>
                  <span>Total</span>
                  <span>{selected.montant.toLocaleString()} FCFA</span>
                </div>
              </div>

              {/* Actions statut */}
              {selected.statut === "en_attente" && (
                <div style={{ display: "flex", gap: "0.6rem" }}>
                  <button className="db-btn primary" style={{ flex: 1 }} onClick={() => changerStatut(selected.id, "en_preparation")}>
                    ✓ Valider
                  </button>
                  <button className="db-btn confirm" style={{ flex: 1 }} onClick={() => changerStatut(selected.id, "annulee")}>
                    ✕ Rejeter
                  </button>
                </div>
              )}
              {selected.statut === "en_preparation" && (
                <button className="db-btn primary" style={{ width: "100%" }} onClick={() => changerStatut(selected.id, "livree")}>
                  Marquer comme livrée
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}