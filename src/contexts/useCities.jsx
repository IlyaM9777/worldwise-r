import { useContext } from "react";
import { CitiesContext } from "./createCitiesContext";

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("You used CitiesContext outside CitiesProvider");
  return context;
}

export { useCities };
