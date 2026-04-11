import { useState } from "react";

const FAKE_ADMINS = [
  { id: 1, nom: "Ndiaye", prenom: "Papa Moussa", email: "admin@yobante.com", telephone: "+33 7 61 05 07 94", statut: "actif" },
  { id: 2, nom: "Diop", prenom: "Cheikh", email: "cheikh@yobante.com", telephone: "+221 77 111 22 33", statut: "actif" },
  { id: 3, nom: "Sarr", prenom: "Mariama", email: "mariama@yobante.com", telephone: "+221 78 222 33 44", statut: "inactif" },
];

const STATUT_COLORS = {
  actif:   { bg: "#d1fae5", color: "#065f46" },
  inactif: { bg: "#fee2e2", color: "#991b1b" },
};

export default function AdminsPanel() {
  const [admins, setAdmins]         = useState(FAKE_ADMINS);
  const [search, setSearch]         = useState("");
  const [modal, setModal]           = useState(null); // null | "voir" | "ajouter" | "modifier"
  const [selected, setSelected]     = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [form, setForm]             = useState({ nom: "", prenom: "", email: "", telephone: "", statut: "actif" });

  // ── Filtrage ──
  const filtered = admins.filter((a) =>
    a.nom.toLowerCase().includes(search.toLowerCase()) ||
    a.prenom.toLowerCase().includes(search.toLowerCase()) ||
    a.email.toLowerCase().includes(search.toLowerCase())
  );

  // ── Initiales ──
  const initiales = (a) => `${a.prenom[0]}${a.nom[0]}`.toUpperCase();

  // ── Ouvrir ajouter ──
  const openAjouter = () => {
    setForm({ nom: "", prenom: "", email: "", telephone: "", statut: "actif" });
    setModal("ajouter");
  };

  // ── Ouvrir modifier ──
  const openModifier = (admin) => {
    setSelected(admin);
    setForm({ nom: admin.nom, prenom: admin.prenom, email: admin.email, telephone: admin.telephone, statut: admin.statut });
    setModal("modifier");
  };

  // ── Ajouter ──
  const handleAjouter = () => {
    if (!form.nom || !form.prenom || !form.email) return;
    const nouveau = { id: Date.now(), ...form };
    setAdmins((prev) => [nouveau, ...prev]);
    setModal(null);
  };

  // ── Modifier ──
  const handleModifier = () => {
    setAdmins((prev) =>
      prev.map((a) => a.id === selected.id ? { ...a, ...form } : a)
    );
    setModal(null);
  };

  // ── Supprimer ──
  const handleSupprimer = (id) => {
    setAdmins((prev) => prev.filter((a) => a.id !== id));
    setConfirmDelete(null);
    setModal(null);
  };

  // ── Activer / Désactiver ──
  const toggleStatut = (id) => {
    setAdmins((prev) =>
      prev.map((a) => a.id === id ? { ...a, statut: a.statut === "actif" ? "inactif" : "actif" } : a)
    );
    if (selected?.id === id) {
      setSelected((s) => ({ ...s, statut: s.statut === "actif" ? "inactif" : "actif" }));
    }
  };

  return (
    <div>
      {/* ── Barre actions ── */}
      <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="db-form-input"
          placeholder="Rechercher nom, email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 280, padding: "0.5rem 0.9rem" }}
        />
        <div style={{ marginLeft: "auto" }}>
          <button className="db-btn primary" onClick={openAjouter}>
            + Ajouter un admin
          </button>
        </div>
      </div>

      {/* ── Tableau ── */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Administrateur</th>
                <th>Email</th>
                <th>Téléphone</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    Aucun administrateur trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((a) => (
                  <tr key={a.id}>
                    {/* Admin */}
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{
                          width: 36, height: 36, borderRadius: "50%",
                          background: "linear-gradient(135deg, #1a56db, #3b7df5)",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          color: "#fff", fontWeight: 700, fontSize: "0.75rem", flexShrink: 0
                        }}>
                          {initiales(a)}
                        </div>
                        <span className="db-td-bold">{a.prenom} {a.nom}</span>
                      </div>
                    </td>
                    <td>{a.email}</td>
                    <td>{a.telephone}</td>
                    <td>
                      <span style={{
                        ...STATUT_COLORS[a.statut],
                        padding: "3px 12px", borderRadius: 20,
                        fontSize: "0.75rem", fontWeight: 600,
                      }}>
                        {a.statut}
                      </span>
                    </td>
                    <td>
                      <div className="db-actions">
                        <button className="db-btn-ghost" onClick={() => { setSelected(a); setModal("voir"); }}>
                          Voir
                        </button>
                        <button className="db-btn-ghost" onClick={() => openModifier(a)}>
                          Modifier
                        </button>
                        <button
                          className="db-btn-ghost"
                          style={{ color: a.statut === "actif" ? "#991b1b" : "#065f46", borderColor: a.statut === "actif" ? "#991b1b" : "#065f46" }}
                          onClick={() => toggleStatut(a.id)}
                        >
                          {a.statut === "actif" ? "Désactiver" : "Activer"}
                        </button>
                        <button className="db-btn-danger" onClick={() => setConfirmDelete(a)}>
                          Supprimer
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
      {modal === "voir" && selected && (
        <ModalOverlay onClose={() => setModal(null)}>
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
          <div style={{ padding: "1.4rem 1.65rem", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            <InfoRow icon="✉️" label="Email" value={selected.email} />
            <InfoRow icon="📞" label="Téléphone" value={selected.telephone} />
          </div>
          <div className="db-modal-footer">
            <button className="db-btn-danger" onClick={() => setConfirmDelete(selected)}>Supprimer</button>
            <button className="db-btn secondary" onClick={() => setModal(null)}>Fermer</button>
            <button className="db-btn primary" onClick={() => openModifier(selected)}>Modifier</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Modal AJOUTER / MODIFIER ── */}
      {(modal === "ajouter" || modal === "modifier") && (
        <ModalOverlay onClose={() => setModal(null)}>
          <div className="db-modal-head">
            <div className="db-modal-title">
              {modal === "ajouter" ? "Ajouter un administrateur" : "Modifier l'administrateur"}
            </div>
            <button className="db-modal-close" onClick={() => setModal(null)}>✕</button>
          </div>
          <div style={{ padding: "0 1.65rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <FormGroup label="Prénom">
                <input className="db-form-input" value={form.prenom} onChange={(e) => setForm({ ...form, prenom: e.target.value })} placeholder="Prénom" />
              </FormGroup>
              <FormGroup label="Nom">
                <input className="db-form-input" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Nom" />
              </FormGroup>
            </div>
            <FormGroup label="Email">
              <input className="db-form-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="email@yobante.com" />
            </FormGroup>
            <FormGroup label="Téléphone">
              <input className="db-form-input" value={form.telephone} onChange={(e) => setForm({ ...form, telephone: e.target.value })} placeholder="+221 77 000 00 00" />
            </FormGroup>
            <FormGroup label="Statut">
              <select className="db-form-input db-form-select" value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value })}>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </FormGroup>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn secondary" onClick={() => setModal(null)}>Annuler</button>
            <button className="db-btn primary" onClick={modal === "ajouter" ? handleAjouter : handleModifier}>
              {modal === "ajouter" ? "Ajouter" : "Enregistrer"}
            </button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Modal CONFIRMER SUPPRESSION ── */}
      {confirmDelete && (
        <ModalOverlay onClose={() => setConfirmDelete(null)}>
          <div className="db-modal-head">
            <div className="db-modal-title">Confirmer la suppression</div>
            <button className="db-modal-close" onClick={() => setConfirmDelete(null)}>✕</button>
          </div>
          <div style={{ padding: "0 1.65rem 1.65rem", color: "#444" }}>
            Voulez-vous vraiment supprimer <strong>{confirmDelete.prenom} {confirmDelete.nom}</strong> ? Cette action est irréversible.
          </div>
          <div className="db-modal-footer">
            <button className="db-btn secondary" onClick={() => setConfirmDelete(null)}>Annuler</button>
            <button className="db-btn confirm" onClick={() => handleSupprimer(confirmDelete.id)}>Supprimer</button>
          </div>
        </ModalOverlay>
      )}
    </div>
  );
}

// ── Composants utilitaires ──
function ModalOverlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)",
      backdropFilter: "blur(3px)", display: "flex", alignItems: "center",
      justifyContent: "center", zIndex: 1000, padding: "1rem"
    }}>
      <div onClick={(e) => e.stopPropagation()} style={{
        background: "#fff", borderRadius: 18, width: "100%", maxWidth: 480,
        boxShadow: "0 24px 60px rgba(0,0,0,0.18)", animation: "dbFadeIn 0.22s ease"
      }}>
        {children}
      </div>
    </div>
  );
}

function FormGroup({ label, children }) {
  return (
    <div className="db-form-group">
      <label className="db-form-label">{label}</label>
      {children}
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