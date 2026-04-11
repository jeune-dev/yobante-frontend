import { useState } from "react";

const FAKE_CONTENEURS = [
  { id: 1, numero: "CONT-001", statut: "ouvert",    date_depart: "2026-04-15", date_arrivee: "2026-04-22" },
  { id: 2, numero: "CONT-002", statut: "en_transit", date_depart: "2026-04-08", date_arrivee: "2026-04-15" },
  { id: 3, numero: "CONT-003", statut: "arrive",     date_depart: "2026-03-28", date_arrivee: "2026-04-04" },
  { id: 4, numero: "CONT-004", statut: "ferme",      date_depart: "2026-04-20", date_arrivee: "2026-04-27" },
];

const STATUTS = {
  ouvert:     { label: "Ouvert",       bg: "#d1fae5", color: "#065f46" },
  ferme:      { label: "Fermé",        bg: "#fee2e2", color: "#991b1b" },
  en_transit: { label: "En transit",   bg: "#e0f2fe", color: "#075985" },
  arrive:     { label: "Arrivé",       bg: "#dcfce7", color: "#166534" },
};

export default function ConteneursPanel() {
  const [conteneurs, setConteneurs] = useState(FAKE_CONTENEURS);
  const [modal, setModal]           = useState(false);
  const [form, setForm]             = useState({ numero: "", statut: "ouvert", date_depart: "", date_arrivee: "" });

  const handleAjouter = () => {
    if (!form.numero) return;
    const nouveau = { id: Date.now(), ...form };
    setConteneurs((prev) => [nouveau, ...prev]);
    setModal(false);
    setForm({ numero: "", statut: "ouvert", date_depart: "", date_arrivee: "" });
  };

  const changerStatut = (id, newStatut) => {
    setConteneurs((prev) => prev.map((c) => c.id === id ? { ...c, statut: newStatut } : c));
  };

  return (
    <div>
      {/* ── Barre actions ── */}
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "1rem" }}>
        <button className="db-btn primary" onClick={() => setModal(true)}>
          + Nouveau conteneur
        </button>
      </div>

      {/* ── Tableau ── */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Numéro</th>
                <th>Statut</th>
                <th>Date de départ</th>
                <th>Date d'arrivée prévue</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {conteneurs.map((c) => (
                <tr key={c.id}>
                  <td className="db-td-bold">{c.numero}</td>
                  <td>
                    <select
                      value={c.statut}
                      onChange={(e) => changerStatut(c.id, e.target.value)}
                      style={{ ...STATUTS[c.statut], border: "none", borderRadius: 20, padding: "3px 10px", fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", outline: "none" }}
                    >
                      {Object.entries(STATUTS).map(([key, val]) => (
                        <option key={key} value={key}>{val.label}</option>
                      ))}
                    </select>
                  </td>
                  <td>{c.date_depart || "—"}</td>
                  <td>{c.date_arrivee || "—"}</td>
                  <td>
                    <span style={{ fontSize: "0.82rem", color: "#888" }}>
                      {c.statut === "ouvert" ? "✅ Accepte des colis" : c.statut === "ferme" ? "🔒 Fermé" : c.statut === "en_transit" ? "🚢 En route" : "📦 Arrivé"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── Modal CRÉER ── */}
      {modal && (
        <div onClick={() => setModal(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
          <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 460, boxShadow: "0 24px 60px rgba(0,0,0,0.18)", animation: "dbFadeIn 0.22s ease" }}>
            <div className="db-modal-head">
              <div className="db-modal-title">Nouveau conteneur</div>
              <button className="db-modal-close" onClick={() => setModal(false)}>✕</button>
            </div>
            <div style={{ padding: "0 1.65rem" }}>
              <div className="db-form-group">
                <label className="db-form-label">Numéro du conteneur</label>
                <input className="db-form-input" value={form.numero} onChange={(e) => setForm({ ...form, numero: e.target.value })} placeholder="Ex: CONT-005" />
              </div>
              <div className="db-form-group">
                <label className="db-form-label">Statut</label>
                <select className="db-form-input db-form-select" value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value })}>
                  {Object.entries(STATUTS).map(([key, val]) => (
                    <option key={key} value={key}>{val.label}</option>
                  ))}
                </select>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
                <div className="db-form-group">
                  <label className="db-form-label">Date de départ</label>
                  <input className="db-form-input" type="date" value={form.date_depart} onChange={(e) => setForm({ ...form, date_depart: e.target.value })} />
                </div>
                <div className="db-form-group">
                  <label className="db-form-label">Date d'arrivée prévue</label>
                  <input className="db-form-input" type="date" value={form.date_arrivee} onChange={(e) => setForm({ ...form, date_arrivee: e.target.value })} />
                </div>
              </div>
            </div>
            <div className="db-modal-footer">
              <button className="db-btn secondary" onClick={() => setModal(false)}>Annuler</button>
              <button className="db-btn primary" onClick={handleAjouter}>Créer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}