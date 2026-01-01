import { useCallback, useEffect, useReducer } from "react";

import { CitiesContext } from "./createCitiesContext";
import supabase from "../services/supabase";
import toast from "react-hot-toast";

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return { ...state, isLoading: true };
    case "cities/loaded":
      return { ...state, cities: action.payload, isLoading: false };

    case "city/loaded":
      return { ...state, currentCity: action.payload, isLoading: false };

    case "city/created":
      return {
        ...state,
        cities: [...state.cities, action.payload],
        isLoading: false,
        currentCity: action.payload,
      };

    case "city/deleted":
      return {
        ...state,
        cities: state.cities.filter((city) => city.id !== action.payload),
        isLoading: false,
      };

    case "rejected":
      return { ...state, error: action.payload, isLoading: false };
    default:
      throw new Error("Unknown action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [currentCity, setCurrentCity] = useState({});

  useEffect(function () {
    async function fetchCities() {
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        let { data, error } = await supabase.from("worldwise").select("*");
        if (error) throw new Error(error.message);
        // setCities(data);
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        toast.error("There was an error loading cities data...");
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities data...",
        });
      } finally {
        // setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;
      try {
        // setIsLoading(true);
        dispatch({ type: "loading" });
        let { data, error } = await supabase
          .from("worldwise")
          .select("*")

          // Filters
          .eq("id", id);
        if (error) throw new Error(error.message);
        // setCurrentCity(data);
        dispatch({ type: "city/loaded", payload: data.at(0) });
      } catch {
        toast.error("There was an error loading city data...");
        dispatch({
          type: "rejected",
          payload: "There was an error loading city data...",
        });
      } finally {
        // setIsLoading(false);
      }
    },
    [currentCity.id]
  );

  async function createCity(newCity) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const { data, error } = await supabase
        .from("worldwise")
        .insert([{ ...newCity }])
        .select();

      if (data.length)
        toast.success(
          `Entry about your visit to ${data.at(0).cityName} (${
            data.at(0).country
          }) was created and a mark was placed on the map`
        );
      if (error) throw new Error(error.message);
      // setCities((curr) => [...curr, data]);
      dispatch({ type: "city/created", payload: data.at(0) });
    } catch {
      toast.error("There was an error creating city...");
      dispatch({
        type: "rejected",
        payload: "There was an error creating city...",
      });
    } finally {
      // setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      // setIsLoading(true);
      dispatch({ type: "loading" });
      const { error } = await supabase.from("worldwise").delete().eq("id", id);
      if (error) throw new Error(error.message);
      // setCities((curr) => curr.filter((city) => city.id !== id));
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      toast.error("There was an error deleting data...");
      dispatch({
        type: "rejected",
        payload: "There was an error deleting data...",
      });
    } finally {
      // setIsLoading(false);
    }
  }
  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesProvider };
