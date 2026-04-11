import { createContext, useContext, useState } from "react";

const LangueContext = createContext();

export const useLangue = () => useContext(LangueContext);

export function LangueProvider({ children }) {
  const [langue, setLangue] = useState("fr");
  const toggle = () => setLangue((l) => l === "fr" ? "ar" : "fr");
  return (
    <LangueContext.Provider value={{ langue, toggle, isAr: langue === "ar" }}>
      {children}
    </LangueContext.Provider>
  );
}