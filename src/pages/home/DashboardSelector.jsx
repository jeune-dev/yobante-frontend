import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import LOGO from "../../assets/images/logo.png"; // adapte l'extension
import "../../assets/css/Login.css";

export default function DashboardSelector() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("utilisateur");
    navigate("/yobante/auth/login");
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Yobante | Choisir un espace</title>
        <link rel="icon" type="image/png" href={LOGO} />
      </Helmet>

      <div className="login-card" style={{ maxWidth: 560 }}>
        {/* Logo + titre */}
        <div className="login-logo-row">
          <img className="login-logo-img" src={LOGO} alt="Yobante" />
          <div>
            <div className="login-brand-name">Yobante</div>
            <div className="login-brand-sub">Administration</div>
          </div>
        </div>

        <div className="login-divider" />

        <p style={{ textAlign: "center", color: "#4a4a46", marginBottom: "1.5rem", fontSize: "0.95rem" }}>
          Choisissez l'espace que vous souhaitez administrer
        </p>

        {/* Bloc 1 — Dashboard Colis */}
        <div
          className="selector-block"
          onClick={() => navigate("/yobante/admin/colis")}
          style={blockStyle("#1a56db")}
        >
          <div style={blockIconStyle}>
            {/* Icône colis */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M21 10V7a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 7v10a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 17v-7"/>
              <polyline points="3.29 7 12 12 20.71 7"/>
              <line x1="12" y1="22" x2="12" y2="12"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111" }}>Dashboard Yobante Colis</div>
            <div style={{ fontSize: "0.82rem", color: "#666", marginTop: 3 }}>
              Demandes d'expédition · Suivi · Conteneurs · Tarifs
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1a56db" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </div>

        {/* Bloc 2 — Dashboard Boutique */}
        <div
          className="selector-block"
          onClick={() => navigate("/yobante/admin/boutique")}
          style={{ ...blockStyle("#e67e22"), marginTop: "1rem" }}
        >
          <div style={{ ...blockIconStyle, background: "#e67e22" }}>
            {/* Icône boutique */}
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: "1.1rem", color: "#111" }}>Dashboard Yobante Boutique</div>
            <div style={{ fontSize: "0.82rem", color: "#666", marginTop: 3 }}>
              Produits · Commandes · Clients · Paiements
            </div>
          </div>
          <div style={{ marginLeft: "auto" }}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e67e22" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </div>
        </div>

        {/* Bouton déconnexion */}
        <button
          onClick={handleLogout}
          style={{
            marginTop: "2rem",
            width: "100%",
            background: "transparent",
            border: "1px solid #e0e0dc",
            borderRadius: 11,
            padding: "0.75rem",
            color: "#909088",
            fontSize: "0.88rem",
            cursor: "pointer",
            fontFamily: "inherit",
          }}
        >
          Se déconnecter
        </button>
      </div>
    </div>
  );
}

// Styles partagés pour les blocs
const blockStyle = (color) => ({
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  padding: "1.2rem 1.4rem",
  border: `1.5px solid ${color}22`,
  borderRadius: 14,
  cursor: "pointer",
  transition: "background 0.18s, transform 0.12s, box-shadow 0.18s",
  background: `${color}08`,
});

const blockIconStyle = {
  width: 50,
  height: 50,
  borderRadius: 12,
  background: "#1a56db",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
};