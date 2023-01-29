import { APP_NAME } from "../config";
import { IoMdTrophy } from "react-icons/io";
import "./Logotype.scss";

export default function Logotype(props) {
  return (
    <div class="logotype-container">
      <IoMdTrophy />
      <span class="logotype-name">{APP_NAME}</span>
    </div>
  );
}
