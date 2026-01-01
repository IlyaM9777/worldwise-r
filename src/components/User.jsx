import { useLogout } from "./useLogout";
import styles from "./User.module.css";
import SpinnerMini from "./SpinnerMini";
import { HiArrowRightOnRectangle } from "react-icons/hi2";

const FAKE_USER = {
  name: "Ilya",

  avatar:
    "https://sspsbllbwsxkhzljwccx.supabase.co/storage/v1/object/public/avatars/IM777.png",
};

function User() {
  const user = FAKE_USER;
  const { logout, isPending } = useLogout();
  return (
    <div className={styles.user}>
      <img src={user.avatar} alt={user.name} />
      <span>Welcome, {user.name}</span>
      <button onClick={logout} disabled={isPending}>
        {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
      </button>
    </div>
  );
}

export default User;

/*
CHALLENGE

1) Add `AuthProvider` to `App.jsx`
2) In the `Login.jsx` page, call `login()` from context
3) Inside an effect, check whether `isAuthenticated === true`. If so, programatically navigate to `/app`
4) In `User.js`, read and display logged in user from context (`user` object). Then include this component in `AppLayout.js`
5) Handle logout button by calling `logout()` and navigating back to `/`
*/
