import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCities } from "../contexts/useCities";
import Spinner from "./Spinner";
import { format } from "date-fns";

const formatDate = (date) => {
  return format(new Date(date), "EEEE, MMMM do, yyyy");
  // Output: "Monday, December 22nd, 2025"
};

function CityItem({ city }) {
  const { currentCity, deleteCity, isLoading } = useCities();
  const { cityName, emoji, date, id, position } = city;

  async function handleDelete(e) {
    e.preventDefault();
    await deleteCity(id);
  }
  if (isLoading) return <Spinner />;
  return (
    <li>
      <Link
        to={`${id}?lat=${position?.lat}&lng=${position?.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>{date ? formatDate(date) : ""}</time>
        <button className={styles.deleteBtn} onClick={handleDelete}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
