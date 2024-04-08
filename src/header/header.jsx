import { useTelegram } from "../hooks/useTelegram";
import "./Header.css";
const Header = () => {
  const { tid } = useTelegram();
  return (
    <div className={"header"}>
      <span className={"username"}>{tid}</span>
    </div>
  );
};

export default Header;
