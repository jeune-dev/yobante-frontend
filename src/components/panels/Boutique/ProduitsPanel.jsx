import { useState } from "react";

const FAKE_PRODUITS = [
  { id: 1, nom: "Huile de palme", prix: 3500, stock: 50, statut: "actif", categorie: "Alimentation", image: null },
  { id: 2, nom: "Tissu wax 6m", prix: 12000, stock: 15, statut: "actif", categorie: "Textile", image: null },
  { id: 3, nom: "Savon karité", prix: 1500, stock: 0, statut: "inactif", categorie: "Cosmétique", image: null },
  { id: 4, nom: "Thé Kinkeliba", prix: 2000, stock: 30, statut: "actif", categorie: "Alimentation", image: null },
  { id: 5, nom: "Boubou homme", prix: 25000, stock: 8, statut: "inactif", categorie: "Textile", image: null },
];

const STATUT_COLORS = {
  actif:   { bg: "#d1fae5", color: "#065f46" },
  inactif: { bg: "#fee2e2", color: "#991b1b" },
};

export default function ProduitsPanel() {
  const [produits, setProduits]         = useState(FAKE_PRODUITS);
  const [search, setSearch]             = useState("");
  const [filtreStatut, setFiltreStatut] = useState("tous");
  const [modal, setModal]               = useState(null);
  const [selected, setSelected]         = useState(null);
  const [form, setForm]                 = useState({ nom: "", prix: "", stock: "", categorie: "", statut: "actif" });
  const [confirmDelete, setConfirmDelete] = useState(null);

  const filtered = produits.filter((p) => {
    const matchSearch = p.nom.toLowerCase().includes(search.toLowerCase()) ||
      p.categorie.toLowerCase().includes(search.toLowerCase());
    const matchStatut = filtreStatut === "tous" || p.statut === filtreStatut;
    return matchSearch && matchStatut;
  });

  const toggleStatut = (id) => {
    setProduits((prev) =>
      prev.map((p) => p.id === id ? { ...p, statut: p.statut === "actif" ? "inactif" : "actif" } : p)
    );
  };

  const openAjouter = () => {
    setForm({ nom: "", prix: "", stock: "", categorie: "", statut: "actif" });
    setModal("ajouter");
  };

  const openModifier = (produit) => {
    setSelected(produit);
    setForm({ nom: produit.nom, prix: produit.prix, stock: produit.stock, categorie: produit.categorie, statut: produit.statut });
    setModal("modifier");
  };

  const handleAjouter = () => {
    if (!form.nom || !form.prix) return;
    const nouveau = { id: Date.now(), ...form, prix: Number(form.prix), stock: Number(form.stock), image: null };
    setProduits((prev) => [nouveau, ...prev]);
    setModal(null);
  };

  const handleModifier = () => {
    setProduits((prev) =>
      prev.map((p) => p.id === selected.id ? { ...p, ...form, prix: Number(form.prix), stock: Number(form.stock) } : p)
    );
    setModal(null);
  };

  const handleSupprimer = (id) => {
    setProduits((prev) => prev.filter((p) => p.id !== id));
    setConfirmDelete(null);
    setModal(null);
  };

  return (
    <div>
      {/* ── Barre actions ── */}
      <div style={{ display: "flex", gap: "0.7rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          className="db-form-input"
          placeholder="Rechercher nom, catégorie..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ width: 260, padding: "0.5rem 0.9rem" }}
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
        <button className="db-btn primary" onClick={openAjouter} style={{ marginLeft: "auto" }}>
          + Ajouter un produit
        </button>
      </div>

      {/* ── Tableau ── */}
      <div className="db-card">
        <div className="db-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Nom</th>
                <th>Catégorie</th>
                <th>Prix</th>
                <th>Stock</th>
                <th>Statut</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "2rem", color: "#888" }}>
                    Aucun produit trouvé
                  </td>
                </tr>
              ) : (
                filtered.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <div style={{ width: 42, height: 42, borderRadius: 10, background: "#f0f0ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.3rem" }}>
                        🛍️
                      </div>
                    </td>
                    <td className="db-td-bold">{p.nom}</td>
                    <td>{p.categorie}</td>
                    <td>{Number(p.prix).toLocaleString()} FCFA</td>
                    <td>{p.stock}</td>
                    <td>
                      <span
                        onClick={() => toggleStatut(p.id)}
                        style={{ ...STATUT_COLORS[p.statut], padding: "3px 12px", borderRadius: 20, fontSize: "0.75rem", fontWeight: 600, cursor: "pointer", userSelect: "none" }}
                        title="Cliquer pour changer le statut"
                      >
                        {p.statut}
                      </span>
                    </td>
                    <td>
                      <div className="db-actions">
                        <button className="db-btn-ghost" onClick={() => { setSelected(p); setModal("voir"); }}>Voir</button>
                        <button className="db-btn-ghost" onClick={() => openModifier(p)}>Modifier</button>
                        <button className="db-btn-danger" onClick={() => setConfirmDelete(p)}>Supprimer</button>
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
          <div className="db-modal-head">
            <div className="db-modal-title">Détails du produit</div>
            <button className="db-modal-close" onClick={() => setModal(null)}>✕</button>
          </div>
          <div style={{ padding: "0 1.65rem 1.65rem" }}>
            <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 80, height: 80, borderRadius: 14, background: "#f0f0ee", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2.5rem" }}>
                🛍️
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: "1.1rem" }}>{selected.nom}</div>
                <div style={{ color: "#888", fontSize: "0.85rem", marginTop: 4 }}>{selected.categorie}</div>
                <span style={{ ...STATUT_COLORS[selected.statut], padding: "2px 10px", borderRadius: 20, fontSize: "0.73rem", fontWeight: 600, marginTop: 6, display: "inline-block" }}>
                  {selected.statut}
                </span>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <InfoBox label="Prix" value={`${Number(selected.prix).toLocaleString()} FCFA`} />
              <InfoBox label="Stock" value={selected.stock} />
            </div>
          </div>
          <div className="db-modal-footer">
            <button className="db-btn secondary" onClick={() => setModal(null)}>Fermer</button>
            <button className="db-btn primary" onClick={() => openModifier(selected)}>Modifier</button>
          </div>
        </ModalOverlay>
      )}

      {/* ── Modal AJOUTER / MODIFIER ── */}
      {(modal === "ajouter" || modal === "modifier") && (
        <ModalOverlay onClose={() => setModal(null)}>
          <div className="db-modal-head">
            <div className="db-modal-title">{modal === "ajouter" ? "Ajouter un produit" : "Modifier le produit"}</div>
            <button className="db-modal-close" onClick={() => setModal(null)}>✕</button>
          </div>
          <div style={{ padding: "0 1.65rem" }}>
            <FormGroup label="Nom du produit">
              <input className="db-form-input" value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} placeholder="Ex: Huile de palme" />
            </FormGroup>
            <FormGroup label="Catégorie">
              <input className="db-form-input" value={form.categorie} onChange={(e) => setForm({ ...form, categorie: e.target.value })} placeholder="Ex: Alimentation" />
            </FormGroup>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.8rem" }}>
              <FormGroup label="Prix (FCFA)">
                <input className="db-form-input" type="number" value={form.prix} onChange={(e) => setForm({ ...form, prix: e.target.value })} placeholder="3500" />
              </FormGroup>
              <FormGroup label="Stock">
                <input className="db-form-input" type="number" value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} placeholder="10" />
              </FormGroup>
            </div>
            <FormGroup label="Statut">
              <select className="db-form-input db-form-select" value={form.statut} onChange={(e) => setForm({ ...form, statut: e.target.value })}>
                <option value="actif">Actif</option>
                <option value="inactif">Inactif</option>
              </select>
            </FormGroup>
          </div>
          <div className="db-modal-footer">
            {modal === "modifier" && (
              <button className="db-btn confirm" onClick={() => setConfirmDelete(selected)}>Supprimer</button>
            )}
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
            Voulez-vous vraiment supprimer <strong>{confirmDelete.nom}</strong> ? Cette action est irréversible.
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

function InfoBox({ label, value }) {
  return (
    <div style={{ background: "#f7f9fc", border: "1px solid #eaecf0", borderRadius: 10, padding: "0.8rem 1rem" }}>
      <div style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", color: "#9ca3af", marginBottom: 4 }}>{label}</div>
      <div style={{ fontWeight: 700, fontSize: "0.95rem", color: "#111" }}>{value}</div>
    </div>
  );
}