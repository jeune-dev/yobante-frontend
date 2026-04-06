import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../assets/css/Dashboard.css";
import Topbar from "../../components/layout/Topbar.jsx";
import { PAGES_BOUTIQUE } from "../../data/dashboardData.jsx";
import LOGO from "../../assets/images/logo1.png"; // adapte l'extension


export default function DashboardBoutique() {
  const [page, setPage] = useState("overview");
  const [sbOpen, setSbOpen] = useState(true);
  const [toast, setToast] = useState({ msg: "", show: false });
  const toastTimer = useRef(null);
  const navigate = useNavigate();

  const user = (() => {
    try {
      const raw = localStorage.getItem("utilisateur");
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  })();

  const showToastRef = useRef(null);
  showToastRef.current = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(
      () => setToast((t) => ({ ...t, show: false })),
      2500
    );
  };
  const showToast = useRef((msg) => showToastRef.current(msg)).current;
  const handleNav = (id) => setPage(id);

  const NAV_BOUTIQUE = [
    { section: "Tableau de bord" },
    {
      id: "overview", label: "Vue d'ensemble", badge: null,
      icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>
    },
    { section: "Gestion Boutique" },
    {
      id: "produits", label: "Produits", badge: "0",
      icon: <><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></>
    },
    {
      id: "commandes", label: "Commandes", badge: "0",
      icon: <><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></>
    },
    {
      id: "clients", label: "Clients", badge: "0",
      icon: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></>
    },
    { section: "Configuration" },
    {
      id: "admins", label: "Administrateurs", badge: null,
      icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>
    },
  ];

  return (
     <div className="db-app boutique">
      <Helmet>
        <title>Yobante Boutique | Dashboard</title>
        <link rel="icon" type="image/png" href={LOGO} />
      </Helmet>

      {/* Sidebar Boutique */}
      <aside className={`db-sb${sbOpen ? "" : " closed"}`}>
        <div className="db-sb-top">
          <img className="db-sb-logo" src={LOGO} alt="Yobante" />
          <div className="db-sb-brand">
            <div className="db-sb-name">Yobante</div>
            <div className="db-sb-sub">Boutique</div>
          </div>
          <button className="db-sb-toggle" onClick={() => setSbOpen((o) => !o)} title="Réduire / Agrandir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        <nav className="db-nav">
          {NAV_BOUTIQUE.map((item, i) =>
            item.section ? (
              <div className="db-nav-section" key={i}>{item.section}</div>
            ) : (
              <div
                key={item.id}
                className={`db-nav-item${page === item.id ? " active" : ""}`}
                data-label={item.label}
                onClick={() => handleNav(item.id)}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{item.icon}</svg>
                <span className="db-nav-label">{item.label}</span>
                {item.badge && <span className="db-nav-badge">{item.badge}</span>}
              </div>
            )
          )}
        </nav>

        {/* Bouton retour sélecteur */}
        <div style={{ padding: "0 0.75rem", marginBottom: "0.5rem" }}>
          <button
            onClick={() => navigate("/yobante/admin/selector")}
            style={{
              width: "100%",
              padding: "0.6rem 0.8rem",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: 8,
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.78rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontFamily: "inherit",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <polyline points="15 18 9 12 15 6"/>
            </svg>
            Changer d'espace
          </button>
        </div>

        <div className="db-sb-foot">
          <div className="db-admin-pill">
            <div className="db-admin-ava">
              {user ? `${user.nom[0]}${user.prenom[0]}` : "A"}
            </div>
            <div className="db-admin-info">
              <div className="db-admin-name">{user ? `${user.nom} ${user.prenom}` : "Administrateur"}</div>
              <div className="db-admin-role">{user?.role || "Admin"}</div>
            </div>
            <button className="db-logout-btn" onClick={() => navigate("/yobante/auth/login")} title="Déconnexion">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                <polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
              </svg>
            </button>
          </div>
        </div>
      </aside>

      {!sbOpen && (
        <button className="db-sb-mini-toggle" onClick={() => setSbOpen(true)} title="Ouvrir le menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="20" height="20">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
        </button>
      )}

      {/* Contenu principal */}
      <div className={`db-main${sbOpen ? "" : " wide"}`}>
        <Topbar
          pageTitle={PAGES_BOUTIQUE[page]?.t}
          pageSub={PAGES_BOUTIQUE[page]?.s}
          user={user}
        />

        <div className="db-content">
         <div className={`db-panel${page === "overview" ? " active" : ""}`}>
  <div className="db-stats-grid">

    <div className="db-stat-card">
      <div className="db-stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Commandes du jour</div>
    </div>

    <div className="db-stat-card">
      <div className="db-stat-icon gold">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Produits en attente</div>
    </div>

    <div className="db-stat-card">
      <div className="db-stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="9" cy="7" r="4"/>
          <path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/>
          <path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Clients total</div>
    </div>

    <div className="db-stat-card">
      <div className="db-stat-icon red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="1" x2="12" y2="23"/>
          <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      </div>
      <div className="db-stat-value">0 FCFA</div>
      <div className="db-stat-label">Revenus total</div>
    </div>

  </div>
</div>
          <div className={`db-panel${page === "produits" ? " active" : ""}`}>
            <PlaceholderBoutique title="Produits" description="Validation des produits soumis, gestion du catalogue." />
          </div>
          <div className={`db-panel${page === "commandes" ? " active" : ""}`}>
            <PlaceholderBoutique title="Commandes" description="Gestion des commandes classiques et commandes avec expédition Sénégal (code couleur vert/rouge)." />
          </div>
          <div className={`db-panel${page === "clients" ? " active" : ""}`}>
            <PlaceholderBoutique title="Clients Boutique" description="Liste des clients de la boutique e-commerce." />
          </div>
          <div className={`db-panel${page === "admins" ? " active" : ""}`}>
            <PlaceholderBoutique title="Administrateurs" description="Gestion des comptes administrateurs." />
          </div>
        </div>
      </div>

      <div className={`db-toast${toast.show ? " show" : ""}`}>
        <div className="db-toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}>
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        {toast.msg}
      </div>
    </div>
  );
}

function PlaceholderBoutique({ title, description }) {
  return (
    <div style={{
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", minHeight: 400, gap: "1rem", opacity: 0.6,
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 16, background: "#e67e2220",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="1.5">
          <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
          <line x1="3" y1="6" x2="21" y2="6"/>
          <path d="M16 10a4 4 0 0 1-8 0"/>
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111", marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: "0.88rem", color: "#666", maxWidth: 360 }}>{description}</div>
      </div>
    </div>
  );
}