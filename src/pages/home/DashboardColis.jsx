import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../assets/css/Dashboard.css";
import Topbar from "../../components/layout/Topbar.jsx";
import { PAGES_COLIS } from "../../data/dashboardData.jsx";
import LOGO from "../../assets/images/logo.png"; // adapte l'extension

// ─── Panels Colis (à créer progressivement) ───
// import VueEnsembleColisPanel from "../../components/panels/colis/VueEnsembleColisPanel.jsx";
// import DemandesPanel from "../../components/panels/colis/DemandesPanel.jsx";

export default function DashboardColis() {
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

  // NAV ITEMS pour le Dashboard Colis
  const NAV_COLIS = [
    { section: "Tableau de bord" },
    {
      id: "overview", label: "Vue d'ensemble", badge: null,
      icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></>
    },
    { section: "Gestion Colis" },
    {
      id: "demandes", label: "Demandes", badge: "0",
      icon: <><path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-7"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></>
    },
    {
      id: "conteneurs", label: "Conteneurs", badge: null,
      icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></>
    },
    {
      id: "clients", label: "Clients", badge: "0",
      icon: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></>
    },
    { section: "Configuration" },
    {
      id: "tarifs", label: "Tarifs", badge: null,
      icon: <><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></>
    },
    {
      id: "admins", label: "Administrateurs", badge: null,
      icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></>
    },
  ];

  return (
    <div className="db-app">
      <Helmet>
        <title>Yobante Colis | Dashboard</title>
        <link rel="icon" type="image/png" href={LOGO} />
      </Helmet>

      {/* Sidebar adaptée Colis */}
      <SidebarColis
        sbOpen={sbOpen}
        setSbOpen={setSbOpen}
        page={page}
        handleNav={handleNav}
        navigate={navigate}
        user={user}
        navItems={NAV_COLIS}
        brandSub="Expédition Colis"
      />

      <div className={`db-main${sbOpen ? "" : " wide"}`}>
        <Topbar
          pageTitle={PAGES_COLIS[page]?.t}
          pageSub={PAGES_COLIS[page]?.s}
          user={user}
        />

        <div className="db-content">
          {/* Panel Vue d'ensemble */}
         <div className={`db-panel${page === "overview" ? " active" : ""}`}>
  <div className="db-stats-grid">

    <div className="db-stat-card">
      <div className="db-stat-icon blue">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-7"/>
          <polyline points="3.29 7 12 12 20.71 7"/>
          <line x1="12" y1="22" x2="12" y2="12"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Demandes en cours</div>
    </div>

    <div className="db-stat-card">
      <div className="db-stat-icon gold">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="1" y="3" width="15" height="13" rx="1"/>
          <path d="M16 8h4l3 3v5h-7V8z"/>
          <circle cx="5.5" cy="18.5" r="2.5"/>
          <circle cx="18.5" cy="18.5" r="2.5"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Colis en transit</div>
    </div>

    <div className="db-stat-card">
      <div className="db-stat-icon green">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Arrivés à Dakar</div>
    </div>

    <div className="db-stat-card">
      <div className="db-stat-icon red">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
      </div>
      <div className="db-stat-value">0</div>
      <div className="db-stat-label">Livrés</div>
    </div>

  </div>
</div>

          {/* Panel Demandes */}
          <div className={`db-panel${page === "demandes" ? " active" : ""}`}>
            <PlaceholderPanel
              title="Demandes d'expédition"
              description="Liste des demandes Cat 1 / Cat 2 / Cat 3 avec validation admin, suivi statut, photos."
              color="#1a56db"
            />
          </div>

          {/* Panel Conteneurs */}
          <div className={`db-panel${page === "conteneurs" ? " active" : ""}`}>
            <PlaceholderPanel
              title="Conteneurs"
              description="Création et gestion des conteneurs, ajout de colis, statuts complets."
              color="#1a56db"
            />
          </div>

          {/* Panel Clients */}
          <div className={`db-panel${page === "clients" ? " active" : ""}`}>
            <PlaceholderPanel
              title="Clients Colis"
              description="Liste et gestion des clients utilisant l'application d'expédition."
              color="#1a56db"
            />
          </div>

          {/* Panel Tarifs */}
          <div className={`db-panel${page === "tarifs" ? " active" : ""}`}>
            <PlaceholderPanel
              title="Gestion des Tarifs"
              description="Modification des prix par kilo, tarifs fixes Cat 1, tarification admin Cat 2 & 3."
              color="#1a56db"
            />
          </div>

          {/* Panel Admins */}
          <div className={`db-panel${page === "admins" ? " active" : ""}`}>
            <PlaceholderPanel
              title="Administrateurs"
              description="Gestion des comptes administrateurs et de leurs droits d'accès."
              color="#1a56db"
            />
          </div>
        </div>
      </div>

      {/* Toast notification */}
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

// ─── Sidebar générique réutilisable pour les deux dashboards ───
function SidebarColis({ sbOpen, setSbOpen, page, handleNav, navigate, user, navItems, brandSub }) {
  

  return (
    <>
      <aside className={`db-sb${sbOpen ? "" : " closed"}`}>
        <div className="db-sb-top">
          <img className="db-sb-logo" src={LOGO} alt="Yobante" onError={(e) => { e.target.style.display = 'none'; }} />
          <div className="db-sb-brand">
            <div className="db-sb-name">Yobante</div>
            <div className="db-sb-sub">{brandSub}</div>
          </div>
          <button className="db-sb-toggle" onClick={() => setSbOpen((o) => !o)} title="Réduire / Agrandir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        </div>

        <nav className="db-nav">
          {navItems.map((item, i) =>
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
              {user?.photo ? <img src={user.photo} alt="avatar" /> : (user ? `${user.nom[0]}${user.prenom[0]}` : "A")}
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
    </>
  );
}

// ─── Panel placeholder (à remplacer par les vrais panels) ───
function PlaceholderPanel({ title, description, color }) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: 400,
      gap: "1rem",
      opacity: 0.6,
    }}>
      <div style={{
        width: 60, height: 60, borderRadius: 16,
        background: `${color}20`,
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5">
          <rect x="3" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="3" width="7" height="7" rx="1"/>
          <rect x="14" y="14" width="7" height="7" rx="1"/>
          <rect x="3" y="14" width="7" height="7" rx="1"/>
        </svg>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111", marginBottom: 6 }}>{title}</div>
        <div style={{ fontSize: "0.88rem", color: "#666", maxWidth: 360 }}>{description}</div>
      </div>
    </div>
  );
}