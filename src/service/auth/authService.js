/* Login simulé (sans backend) */
export const login = async (email, mot_de_passe) => {
  // Identifiants fictifs pour tester
  if (email === "admin@yobante.com" && mot_de_passe === "admin123") {
    const utilisateur = {
      nom: "Ndiaye",
      prenom: "Papa Moussa",
      role: "Admin",
      email: "admin@yobante.com",
    };
    localStorage.setItem("token", "fake-token-yobante");
    localStorage.setItem("utilisateur", JSON.stringify(utilisateur));
    return utilisateur;
  } else {
    throw { response: { status: 401 } };
  }
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("utilisateur");
};

export const handleApiError = (error) => {
  if (error.response) {
    switch (error.response.status) {
      case 401: return "Email ou mot de passe incorrect";
      default: return "Erreur serveur";
    }
  }
  return "Email ou mot de passe incorrect";
};

export const validateLoginForm = (email, password) => {
  const errors = {};
  if (!email.trim()) errors.email = "L'email est requis";
  if (!password) errors.password = "Le mot de passe est requis";
  return errors;
};