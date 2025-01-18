import { useSelector } from "react-redux";
import styles from "../styles/Header.module.css";
import { Popover, Button } from "antd";
import "antd/dist/antd.css";

function Header() {
  const { pseudo, avatar } = useSelector((state) => state.user.value);
  console.log("Pseudo: ", pseudo);
  console.log("Avatar dans redux: ", avatar);

  const popoverContent = (
    <div>
      <span>test</span>
      <span>test</span>
    </div>
  );

  return (
    <div className={styles.body}>
      <img
        src={`https://api.dicebear.com/9.x/adventurer-neutral/svg?seed=${avatar}`}
        alt="Avatar"
      />
      <Popover
        content={popoverContent}
        title="titre"
        trigger="hover"
        placement="bottom"
      >
        <Button>Bienvenue, {pseudo}!</Button>
      </Popover>
    </div>
  );
}

export default Header;
