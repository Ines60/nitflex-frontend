import { useSelector } from "react-redux";
import styles from "../styles/Header.module.css";

function Header() {
  const { pseudo, avatar } = useSelector((state) => state.user.value);
  console.log("Pseudo: ", pseudo);
  console.log("Avatar dans redux: ", avatar);

  return (
    <div className={styles.body}>
      <span>Bienvenue, {pseudo}!</span>
      <img
        src={`https://api.dicebear.com/6.x/adventurer/svg?seed=${avatar}`}
        alt="Avatar"
      />
    </div>
  );
}

export default Header;
