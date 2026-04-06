/* eslint-disable react-refresh/only-export-components */
import LOGO from "../assets/images/logo.png"; // adapte l'extension si besoin

export { LOGO };

// Pages du Dashboard Colis (Yobante Expédition)
export const PAGES_COLIS = {
  overview:    { t: "Vue d'ensemble",       s: "Tableau de bord Colis" },
  demandes:    { t: "Demandes d'expédition", s: "Gestion des demandes" },
  conteneurs:  { t: "Conteneurs",           s: "Gestion des conteneurs" },
  clients:     { t: "Clients",              s: "Gestion des clients" },
  tarifs:      { t: "Tarifs",               s: "Gestion des tarifs" },
  admins:      { t: "Administrateurs",      s: "Gestion des accès" },
};

// Pages du Dashboard Boutique (Yobante Boutique)
export const PAGES_BOUTIQUE = {
  overview:    { t: "Vue d'ensemble",   s: "Tableau de bord Boutique" },
  produits:    { t: "Produits",         s: "Validation et gestion des produits" },
  commandes:   { t: "Commandes",        s: "Gestion des commandes" },
  clients:     { t: "Clients",          s: "Gestion des clients boutique" },
  admins:      { t: "Administrateurs",  s: "Gestion des accès" },
};