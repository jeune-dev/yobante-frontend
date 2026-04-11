import { useState } from "react";

const FAKE_COLIS = [
  { id: "YB-MDFS10042026C14KX", expediteur: { nom: "Diallo", prenom: "Amadou", telephone: "+33 6 12 34 56 78" }, destinataire: { nom: "Diallo", prenom: "Fatou", telephone: "+221 77 123 45 67", adresse: "Dakar, Plateau" }, categorie: "1", direction: "france_senegal", mode_depot: "depot", statut: "en_attente", date: "2026-04-01" },
  { id: "YB-SFFS11042026C24KY", expediteur: { nom: "Sow", prenom: "Ibrahima", telephone: "+33 7 23 45 67 89" }, destinataire: { nom: "Sow", prenom: "Mariama", telephone: "+221 78 234 56 78", adresse: "Thiès, Centre" }, categorie: "2", direction: "france_senegal", mode_depot: "collecte", statut: "valide", date: "2026-04-02" },
  { id: "YB-NDSF12042026C34KZ", expediteur: { nom: "Ndiaye", prenom: "Moussa", telephone: "+221 76 345 67 89" }, destinataire: { nom: "Ndiaye", prenom: "Cheikh", telephone: "+33 6 34 56 78 90", adresse: "Paris, 75001" }, categorie: "3", direction: "senegal_france", mode_depot: "collecte", statut: "en_transit", date: "2026-04-03" },
  { id: "YB-BAFS13042026C14KA", expediteur: { nom: "Ba", prenom: "Aissatou", telephone: "+33 6 45 67 89 01" }, destinataire: { nom: "Ba", prenom: "Oumar", telephone: "+221 70 456 78 90", adresse: "Saint-Louis" }, categorie: "1", direction: "france_senegal", mode_depot: "depot", statut: "livre", date: "2026-04-04" },
];

const STATUTS = {
  en_attente:    { label: "En attente",    bg: "#fef3c7", color: "#92400e" },
  valide:        { label: "Validé",        bg: "#dbeafe", color: "#1e40af" },
  paye:          { label: "Payé",          bg: "#e0e7ff", color: "#3730a3" },
  collecte:      { label: "Collecté",      bg: "#ede9fe", color: "#5b21b6" },
  en_transit:    { label: "En transit",    bg: "#e0f2fe", color: "#075985" },
  arrive_dakar:  { label: "Arrivé Dakar",  bg: "#dcfce7", color: "#166534" },
  livre:         { label: "Livré",         bg: "#d1fae5", color: "#065f46" },
  annule:        { label: "Annulé",        bg: "#f3f4f6", color: "#6b7280" },
  refuse:        { label: "Refusé",        bg: "#fee2e2", color: "#991b1b" },
};

const CATEGORIES = { "1": "Document", "2": "Colis moyen", "3": "Gros colis" };
const DIRECTIONS = { france_senegal: "France → Sénégal", senegal_france: "Sénégal → France" };

export default function ColisPanel() {
  const [colis, setColis]               = useState(FAKE_COLIS);
  const [search, setSearch]             = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [filtreDirection, setFiltreDirection] = useState("tous");
  const [filtreCategorie, setFiltreCategorie] = useState("tous");
  const [selected, setSelected]         = useState(null);
  const [modal, setModal]               = useState(false);
  const [raisonRefus, setRaisonRefus]   = useState("");
  const [modalRefus, setModalRefus]     = useState(null);

  const filtered = colis.filter((c) => {
    const matchSearch =
      c.id.toLowerCase().includes(search.toLowerCase()) ||
      c.expediteur.nom.toLowerCase().includes(search.toLowerCase()) ||
      c.destinataire.nom.toLowerCase().includes(search.toLowerCase());
    const matchStatut    = filtreStatut === "tous" || c.statut === filtreStatut;
    const matchDirection = filtreDirection === "tous" || c.direction === filtreDirection;
    const matchCategorie = filtreCategorie === "tous" || c.categorie === filtreCategorie;
    return matchSearch && matchStatut && matchDirection && matchCategorie;
  });

  const changerStatut = (id, newStatut) => {
    setColis((prev) => prev.map((c) => c.id === id ? { ...c, statut: newStatut } : c));
    if (selected?.id === id) setSelected((s) => ({ ...s, statut: newStatut }));
  };

  const handleRefuser = () => {
    if (!raisonRefus.trim()) return;
    changerStatut(modalRefus.id, "refuse");
    setModalRefus(null);
    setRaisonRefus("");
    setModal(false);
  };

  return (
    <div>
      {/* ── Barre recherche ── */}
      <div style={{ display: "flex", gap: "0.7rem", marginBottom: "0.8rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="db-form-input"
          placeholder="Rechercher numéro, expéditeur, destinataire..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 320, padding: "0.5rem 0.9rem" }}
        />
      </div>

      {/* ── Filtres ── */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem", flexWrap: "wrap" }}>
        <span style={{ fontSize: "0.8rem", color: "#888", alignSelf: "center" }}>Direction :</span>
        {["tous", "france_senegal", "senegal_france"].map((d) => (
          <button key={d} className={`db-chip${filtreDirection === d ? " active" : ""}`} onClick={() => setFiltreDirection(d)}>
            {d === "tous" ? "Toutes" : DIRECTIONS[d]}
          </button>
        ))}
        <span style={{ fontSize: "0.8rem", color: "#888", alignSelf: "center", marginLeft: 8 }}>Catégorie :</span>
        {["tous", "1", "2", "3"].map((c) => (
          <button key={c} className={`db-chip${filtreCategorie === c ? " active" : ""}`} onClick={() => setFiltreCategorie(c)}>
            {c === "tous" ? "Toutes" : CATEGORIES[c]}
          </button>
        ))}
        <span style={{ fontSize: "0.8rem", color: "#888", alignSelf: "center", marginLeft: 8 }}>Statut :</span>
        <select
          className="db-form-input db-form-select"
          value={filtreStatut}
          onChange={(e) => setFiltreStatut(e.target.value)}
          style={{ width: 160, padding: "0.4rem 0.7rem", fontSize: "0.85rem" }}
        >
          <option value="tous">Tous</option>
          {Object.entries(STATUTS).map(([key, val]) => (
            <option key={key} value={key}>{val.label}</option>
          ))}
        </select>
      </div>

      {/* ── Tableau ── */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr>
                <th>N° Suivi</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
                <th>Cat.</th>
                <th>Direction</th>
                <th>Statut</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    Aucun colis trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((c) => (
                  <tr key={c.id}>
                    <td className="db-td-bold" style={{ fontSize: "0.78rem" }}>{c.id}</td>
                    <td>{c.expediteur.prenom} {c.expediteur.nom}</td>
                    <td>{c.destinataire.prenom} {c.destinataire.nom}</td>
                    <td>
                      <span style={{ background: "#f0f4ff", color: "#1a56db", padding: "2px 8px", borderRadius: 20, fontSize: "0.73rem", fontWeight: 600 }}>
                        Cat. {c.categorie}
                      </span>
                    </td>
                    <td style={{ fontSize: "0.82rem" }}>{DIRECTIONS[c.direction]}</td>
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
                    <td style={{ fontSize: "0.82rem" }}>{c.date}</td>
                    <td>
                      <div className="db-actions">
                        <button className="db-btn-ghost" onClick={() => { setSelected(c); setModal(true); }}>Voir</button>
                        {(c.categorie === "2" || c.categorie === "3") && c.statut === "en_attente" && (
                          <>
                            <button className="db-btn-ghost" style={{ color: "#065f46", borderColor: "#065f46" }} onClick={() => changerStatut(c.id, "valide")}>Valider</button>
                            <button className="db-btn-danger" onClick={() => setModalRefus(c)}>Refuser</button>
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
        <ModalOverlay onClose={() => setModal(false)}>
          <div className="db-modal-head">
            <div className="db-modal-title">Colis {selected.id}</div>
            <button className="db-modal-close" onClick={() => setModal(false)}>✕</button>
          </div>
          <div style={{ padding: "0 1.65rem 1.65rem", maxHeight: "70vh", overflowY: "auto" }}>
            {/* Statut */}
            <div style={{ marginBottom: "1rem" }}>
              <span style={{ ...STATUTS[selected.statut], padding: "4px 14px", borderRadius: 20, fontSize: "0.8rem", fontWeight: 600 }}>
                {STATUTS[selected.statut]?.label}
              </span>
            </div>

            {/* Infos générales */}
            <SectionLabel label="Informations générales" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginBottom: "1rem" }}>
              <InfoBox label="Catégorie" value={CATEGORIES[selected.categorie]} />
              <InfoBox label="Direction" value={DIRECTIONS[selected.direction]} />
              <InfoBox label="Mode dépôt" value={selected.mode_depot === "depot" ? "Dépôt en agence" : "Collecte à domicile"} />
              <InfoBox label="Date" value={selected.date} />
            </div>

            {/* Expéditeur */}
            <SectionLabel label="Expéditeur" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginBottom: "1rem" }}>
              <InfoBox label="Nom" value={`${selected.expediteur.prenom} ${selected.expediteur.nom}`} />
              <InfoBox label="Téléphone" value={selected.expediteur.telephone} />
            </div>

            {/* Destinataire */}
            <SectionLabel label="Destinataire" />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.7rem", marginBottom: "1rem" }}>
              <InfoBox label="Nom" value={`${selected.destinataire.prenom} ${selected.destinataire.nom}`} />
              <InfoBox label="Téléphone" value={selected.destinataire.telephone} />
              <InfoBox label="Adresse" value={selected.destinataire.adresse} />
            </div>

            {/* Actions */}
            {(selected.categorie === "2" || selected.categorie === "3") && selected.statut === "en_attente" && (
              <div style={{ display: "flex", gap: "0.6rem", marginTop: "1rem" }}>
                <button className="db-btn primary" style={{ flex: 1 }} onClick={() => changerStatut(selected.id, "valide")}>✓ Valider</button>
                <button className="db-btn confirm" style={{ flex: 1 }} onClick={() => { setModalRefus(selected); setModal(false); }}>✕ Refuser</button>
              </div>
            )}

            {/* Changer statut */}
            <div style={{ marginTop: "1rem" }}>
              <div style={{ fontSize: "0.75rem", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", marginBottom: 6 }}>Changer le statut</div>
              <select
                className="db-form-input db-form-select"
                value={selected.statut}
                onChange={(e) => changerStatut(selected.id, e.target.value)}
              >
                {Object.entries(STATUTS).map(([key, val]) => (
                  <option key={key} value={key}>{val.label}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn secondary" onClick={() => setModal(false)}>Fermer</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Modal REFUS ── */}
      {modalRefus && (
        <ModalOverlay onClose={() => { setModalRefus(null); setRaisonRefus(""); }}>
          <div className="db-modal-head">
            <div className="db-modal-title">Refuser le colis</div>
            <button className="db-modal-close" onClick={() => { setModalRefus(null); setRaisonRefus(""); }}>✕</button>
          </div>
          <div style={{ padding: "0 1.65rem 1.65rem" }}>
            <p style={{ color: "#444", marginBottom: "1rem", fontSize: "0.9rem" }}>
              Veuillez indiquer la raison du refus pour le colis <strong>{modalRefus.id}</strong>.
            </p>
            <div className="db-form-group">
              <label className="db-form-label">Raison du refus</label>
              <textarea
                className="db-form-input"
                rows={4}
                value={raisonRefus}
                onChange={(e) => setRaisonRefus(e.target.value)}
                placeholder="Ex: Contenu non conforme..."
                style={{ resize: "vertical" }}
              />
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn secondary" onClick={() => { setModalRefus(null); setRaisonRefus(""); }}>Annuler</button>
            <button className="db-btn confirm" onClick={handleRefuser}>Confirmer le refus</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

function ModalOverlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, padding: "1rem" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#fff", borderRadius: 18, width: "100%", maxWidth: 520, boxShadow: "0 24px 60px rgba(0,0,0,0.18)", animation: "dbFadeIn 0.22s ease" }}>
        {children}
      </div>
    </div>
  );
}

function SectionLabel({ label }) {
  return <div style={{ fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", marginBottom: 8 }}>{label}</div>;
}

function InfoBox({ label, value }) {
  return (
    <div style={{ background: "#f7f9fc", border: "1px solid #eaecf0", borderRadius: 10, padding: "0.75rem 1rem" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 600, fontSize: "0.88rem", color: "#111" }}>{value}</div>
    </div>
  );
}