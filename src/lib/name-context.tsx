import { createContext, useContext } from "react";

interface NameContextType {
  boy: string;
  girl: string;
}

export const NameContext = createContext<NameContextType>({
  boy: "Someone",
  girl: "Someone",
});

export const useNames = () => useContext(NameContext);
