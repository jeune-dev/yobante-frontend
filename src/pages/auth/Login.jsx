import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/Login.css";
import LOGO from "../../assets/images/logo.png"; // ← change en logo.jpeg si tu gardes l'extension jpeg
import { login, validateLoginForm, handleApiError } from "../../service/auth/authService";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateLoginForm(email, password);
    if (Object.keys(validationErrors).length > 0) {
      Object.values(validationErrors).forEach((err) => toast.error(err));
      return;
    }

    setLoading(true);

    try {
      const utilisateur = await login(email, password);

      if (utilisateur.role === "Admin") {
        toast.success("Connexion réussie !");
        navigate("/yobante/admin/selector"); // ← redirige vers la page de sélection
      } else {
        toast.error("Accès refusé. Admin uniquement.");
      }
    } catch (error) {
      toast.error(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Yobante | Connexion Admin</title>
        <link rel="icon" type="image/png" href={LOGO} />
      </Helmet>

      <div className="login-card">
        <div className="login-logo-row">
          <img className="login-logo-img" src={LOGO} alt="Yobante" />
          <div>
            <div className="login-brand-name">Yobante</div>
            <div className="login-brand-sub">Administration</div>
          </div>
        </div>

        <div className="login-divider" />

        <div className="login-form-group">
          <label className="login-label">Email</label>
          <input
            className="login-input"
            type="email"
            placeholder="votre email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="login-form-group">
          <label className="login-label">Mot de passe</label>
          <input
            className="login-input"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login-btn" onClick={handleSubmit} disabled={loading}>
          {loading ? <span className="login-spinner" /> : "Se connecter"}
        </button>

        <p className="login-foot">Accès réservé aux administrateurs</p>
      </div>
    </div>
  );
}