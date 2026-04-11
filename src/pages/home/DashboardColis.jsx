import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import "../../assets/css/Dashboard.css";
import Topbar from "../../components/layout/Topbar.jsx";
import { PAGES_COLIS } from "../../data/dashboardData.jsx";
import LOGO from "../../assets/images/logo1.png";
import VueEnsembleColisPanel from "../../components/panels/Colis/VueEnsembleColisPanel.jsx";
import ColisPanel from "../../components/panels/Colis/ColisPanel.jsx";
import ConteneursPanel from "../../components/panels/Colis/ConteneursPanel.jsx";
import ClientsColisPanel from "../../components/panels/Colis/ClientsColisPanel.jsx";
import AdminsColisPanel from "../../components/panels/Colis/AdminsColisPanel.jsx";

export default function DashboardColis() {
  const [page, setPage]   = useState("overview");
  const [sbOpen, setSbOpen] = useState(true);
  const [toast, setToast]   = useState({ msg: "", show: false });
  const toastTimer          = useRef(null);
  const navigate            = useNavigate();

  const user = (() => {
    try {
      const raw = localStorage.getItem("utilisateur");
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  })();

  const showToastRef = useRef(null);
  showToastRef.current = (msg) => {
    setToast({ msg, show: true });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast((t) => ({ ...t, show: false })), 2500);
  };
  const showToast = useRef((msg) => showToastRef.current(msg)).current;
  const handleNav = (id) => setPage(id);

  const NAV_COLIS = [
    { section: "Tableau de bord" },
    { id: "overview", label: "Vue d'ensemble", badge: null, icon: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/></> },
    { section: "Gestion Colis" },
    { id: "demandes", label: "Colis", badge: "0", icon: <><path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-7"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></> },
    { id: "conteneurs", label: "Conteneurs", badge: null, icon: <><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><line x1="10" y1="14" x2="14" y2="14"/></> },
    { id: "clients", label: "Clients", badge: "0", icon: <><circle cx="9" cy="7" r="4"/><path d="M3 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2"/><path d="M16 3.13a4 4 0 0 1 0 7.75M21 21v-2a4 4 0 0 0-3-3.87"/></> },
    { section: "Configuration" },
    { id: "admins", label: "Administrateurs", badge: null, icon: <><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></> },
  ];

  return (
    <div className="db-app">
      <Helmet>
        <title>Yobante Colis | Dashboard</title>
        <link rel="icon" type="image/png" href={LOGO} />
      </Helmet>

      <aside className={`db-sb${sbOpen ? "" : " closed"}`}>
        <div className="db-sb-top">
          <img className="db-sb-logo" src={LOGO} alt="Yobante" />
          <div className="db-sb-brand">
            <div className="db-sb-name">Yobante</div>
            <div className="db-sb-sub">Expédition Colis</div>
          </div>
          <button className="db-sb-toggle" onClick={() => setSbOpen((o) => !o)} title="Réduire / Agrandir">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><polyline points="15 18 9 12 15 6" /></svg>
          </button>
        </div>

        <nav className="db-nav">
          {NAV_COLIS.map((item, i) =>
            item.section ? (
              <div className="db-nav-section" key={i}>{item.section}</div>
            ) : (
              <div key={item.id} className={`db-nav-item${page === item.id ? " active" : ""}`} data-label={item.label} onClick={() => handleNav(item.id)}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{item.icon}</svg>
                <span className="db-nav-label">{item.label}</span>
                {item.badge && <span className="db-nav-badge">{item.badge}</span>}
              </div>
            )
          )}
        </nav>

        <div style={{ padding: "0 0.75rem", marginBottom: "0.5rem" }}>
          <button onClick={() => navigate("/yobante/admin/selector")} style={{ width: "100%", padding: "0.6rem 0.8rem", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 8, color: "rgba(255,255,255,0.6)", fontSize: "0.78rem", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "inherit" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><polyline points="15 18 9 12 15 6"/></svg>
            Changer d'espace
          </button>
        </div>

        <div className="db-sb-foot">
          <div className="db-admin-pill">
            <div className="db-admin-ava">{user ? `${user.nom[0]}${user.prenom[0]}` : "A"}</div>
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} width="20" height="20"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
      )}

      <div className={`db-main${sbOpen ? "" : " wide"}`}>
        <Topbar pageTitle={PAGES_COLIS[page]?.t} pageSub={PAGES_COLIS[page]?.s} user={user} />
        <div className="db-content">
          <div className={`db-panel${page === "overview" ? " active" : ""}`}><VueEnsembleColisPanel /></div>
          <div className={`db-panel${page === "demandes" ? " active" : ""}`}><ColisPanel /></div>
          <div className={`db-panel${page === "conteneurs" ? " active" : ""}`}><ConteneursPanel /></div>
          <div className={`db-panel${page === "clients" ? " active" : ""}`}><ClientsColisPanel /></div>
          <div className={`db-panel${page === "admins" ? " active" : ""}`}><AdminsColisPanel /></div>
        </div>
      </div>

      <div className={`db-toast${toast.show ? " show" : ""}`}>
        <div className="db-toast-icon">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={3}><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        {toast.msg}
      </div>
    </div>
  );
}