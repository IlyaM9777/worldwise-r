import Message from "./Message";
import Spinner from "./Spinner";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import { useCities } from "../contexts/useCities";

function CountryList() {
  const { cities, isLoading } = useCities();
  const citiesUniqueCountries = cities.reduce((acc, curr) => {
    if (acc.map((city) => city.country).includes(curr.country)) return [...acc];
    else return [...acc, curr];
  }, []);

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );
  return (
    <ul className={styles.cityList}>
      {citiesUniqueCountries.map((city) => (
        <CountryItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CountryList;
