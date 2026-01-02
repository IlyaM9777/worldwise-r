import PageNav from "../components/PageNav";
import styles from "./Product.module.css";

export default function Product() {
  return (
    <main className={styles.product}>
      <PageNav />
      <section>
        <img
          src="img-1.jpg"
          alt="person with dog overlooking mountain with sunset"
        />
        <div>
          <h2>About World Travel Diary.</h2>
          <p>
            World Travel Diary is an innovative company dedicated to enhancing
            the travel experience of its users through a unique digital
            platform. The core service offered by the company is an online
            travel journal that allows users to document their journeys across
            the globe in a personalized and interactive manner
          </p>
          <p>
            The platform is designed with a user-friendly interface, featuring
            an electronic map that spans the entire world. Users can select any
            city they visit by simply clicking on the map, which then opens a
            dedicated space for notes related to that specific location. This
            feature encourages travelers to keep detailed records of their
            adventures, making their travel diaries both comprehensive and
            visually engaging.
          </p>
        </div>
      </section>
    </main>
  );
}
