import Container from "react-bootstrap/esm/Container";
import "./MainContainer.scss";

export default function MainContainer({ children }) {
  return <Container className="main-container">{children}</Container>;
}
